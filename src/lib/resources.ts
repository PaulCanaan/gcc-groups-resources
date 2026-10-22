import { createClient } from '@sanity/client';
import { contentSource, parseResources, resourceQuery } from './resource.ts';
import { samples } from './samples.ts';

export const source = contentSource(import.meta.env.CONTENT_SOURCE, process.env.VERCEL_ENV);
export const isDemo = source === 'demo';

async function loadResources() {
  if (isDemo) return parseResources(samples);
  const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
  const dataset = import.meta.env.SANITY_STUDIO_DATASET;
  if (!projectId || !dataset) throw new Error('Set SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET before building CMS content.');
  const client = createClient({
    projectId, dataset, apiVersion: '2026-10-22',
    useCdn: false, perspective: 'published',
    token: import.meta.env.SANITY_READ_TOKEN || undefined,
  });
  return parseResources(await client.fetch(resourceQuery));
}

// Share one CMS snapshot across the index and generated detail pages in a build.
export const resources = loadResources();
