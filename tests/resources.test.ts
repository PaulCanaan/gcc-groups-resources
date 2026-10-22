import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contentSource, parseResources } from '../src/lib/resource.ts';
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
  assert.equal(parseResources([{ ...first, scripture: null, series: null, session: null, fileUrl: null, externalUrl: null }]).length, 1);
});
