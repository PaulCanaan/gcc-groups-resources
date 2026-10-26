// Standalone AI Gateway smoke test — not part of the site build.
// Streams one response from Vercel AI Gateway (OpenAI-compatible Chat Completions).
// Usage: AI_GATEWAY_API_KEY=... node scripts/ai-gateway-stream.mjs "your prompt"
// No dependencies: uses Node 22's built-in fetch.

const apiKey = process.env.AI_GATEWAY_API_KEY;
if (!apiKey) {
  console.error('AI_GATEWAY_API_KEY is not set.');
  process.exit(1);
}

const model = process.env.AI_GATEWAY_MODEL ?? 'openai/gpt-oss-20b';
const prompt = process.argv.slice(2).join(' ') || 'In two sentences, say what a small group Bible study is for.';

const res = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
  method: 'POST',
  headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ model, stream: true, messages: [{ role: 'user', content: prompt }] }),
});

if (!res.ok || !res.body) {
  // Print status and the gateway's error message only — never request headers.
  const detail = await res.text().catch(() => '');
  console.error(`AI Gateway request failed: ${res.status} ${res.statusText}\n${detail.slice(0, 500)}`);
  process.exit(1);
}

const decoder = new TextDecoder();
let buffer = '';
for await (const chunk of res.body) {
  buffer += decoder.decode(chunk, { stream: true });
  const lines = buffer.split('\n');
  buffer = lines.pop() ?? '';
  for (const line of lines) {
    const data = line.trim();
    if (!data.startsWith('data:')) continue;
    const payload = data.slice(5).trim();
    if (payload === '[DONE]') continue;
    try {
      const delta = JSON.parse(payload).choices?.[0]?.delta?.content;
      if (delta) process.stdout.write(delta);
    } catch { /* ignore keep-alive or partial lines */ }
  }
}
process.stdout.write('\n');
