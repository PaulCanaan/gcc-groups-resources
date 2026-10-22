import { isDemo } from '../lib/resources';
export function GET() {
  const disallow = isDemo || process.env.VERCEL_ENV === 'preview';
  return new Response(`User-agent: *\n${disallow ? 'Disallow: /' : 'Allow: /'}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
