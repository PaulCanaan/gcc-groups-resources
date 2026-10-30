import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contentSource, parseResources, printablePdfUrl } from '../src/lib/resource.ts';
import { renderResourceBody } from '../src/lib/markdown.ts';
import { samples } from '../src/lib/samples.ts';

test('production cannot accidentally ship sample resources', () => {
  assert.equal(contentSource(undefined, 'production'), 'sanity');
  assert.throws(() => contentSource('demo', 'production'), /cannot be deployed/);
  assert.equal(contentSource('demo', 'preview'), 'demo');
});

test('CMS boundary rejects uncleared documents, unsafe destinations, and conflicting routes', () => {
  const first = samples[0];
  assert.throws(() => parseResources([{ ...first, publicDistribution: false }]));
  assert.throws(() => parseResources([{ ...first, externalUrl: 'javascript:alert(1)' }]));
  assert.throws(() => parseResources([{ ...first, slug: '../draft' }]));
  assert.throws(() => parseResources([first, first]), /Duplicate resource slug/);
  assert.equal(parseResources(samples).length, 5);
  assert.equal(parseResources([{ ...first, category: 'cojourner' }])[0].category, 'others');
  assert.equal(parseResources([{ ...first, scripture: null, series: null, session: null, fileUrl: null, externalUrl: null }]).length, 1);
});

test('full resources preserve Markdown structure without allowing executable HTML or links', () => {
  const html = renderResourceBody('## Discuss\n\n1. Read **Galatians 1**.\n2. Share a response.\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert%281%29)');
  assert.match(html, /<h2>Discuss<\/h2>/);
  assert.match(html, /<ol>/);
  assert.match(html, /<strong>Galatians 1<\/strong>/);
  assert.doesNotMatch(html, /<script>|href="javascript:/);
});

test('resource bodies render Markdown tables as HTML tables', () => {
  const html = renderResourceBody('| If… | First step | Agreement |\n|---|---|---|\n| Someone speaks of suicide or self-harm | Stay with them; share 988 | Policy 3 |');
  assert.match(html, /<table>/);
  assert.match(html, /<th>Agreement<\/th>/);
  assert.match(html, /<td>Policy 3<\/td>/);
  assert.doesNotMatch(html, /\|---\|/);
});

test('printable PDF links request a named download from the Sanity asset CDN', () => {
  const url = new URL(printablePdfUrl({slug: 'weekly-recap-2026-10-04-love', fileUrl: 'https://cdn.sanity.io/files/project/production/asset.pdf'})!);
  assert.equal(url.searchParams.get('dl'), 'weekly-recap-2026-10-04-love.pdf');
  assert.equal(printablePdfUrl({slug: 'reading-guide'}), undefined);
});
