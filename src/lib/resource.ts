import { z } from 'zod';

export const categories = [
  { id: 'city-groups', title: 'City Groups Resources', description: 'Weekly Recaps for Scripture, conversation, and prayer.' },
  { id: 'collectives', title: 'Collectives Resources', description: 'Galatians Study handouts for Men’s and Women’s Collectives.' },
  { id: 'others', title: 'Other Resources', description: 'Leader agreements, training, and shared tools.' },
] as const;

const secureUrl = z.url().refine((url) => new URL(url).protocol === 'https:', 'Use an HTTPS URL.');
export const resourceSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().trim().min(1),
  category: z.enum(['city-groups', 'collectives', 'cojourner', 'others']).transform(category => category === 'cojourner' ? 'others' : category),
  date: z.iso.date(),
  kind: z.enum(['Reading guide', 'Discussion guide', 'Leader training', 'Leader agreement', 'External resource']),
  audience: z.enum(['everyone', 'leaders']),
  scripture: z.string().nullish(),
  series: z.string().nullish(),
  session: z.number().int().positive().nullish(),
  body: z.string().trim().min(1),
  fileUrl: secureUrl.nullish(),
  externalUrl: secureUrl.nullish(),
  publicDistribution: z.literal(true),
});
export type Resource = z.infer<typeof resourceSchema>;

export function parseResources(input: unknown): Resource[] {
  const resources = z.array(resourceSchema).parse(input);
  const slugs = new Set<string>();
  for (const resource of resources) {
    if (slugs.has(resource.slug)) throw new Error(`Duplicate resource slug: ${resource.slug}`);
    slugs.add(resource.slug);
  }
  return resources;
}

export function contentSource(source: string | undefined, vercelEnv: string | undefined) {
  const resolved = source || (vercelEnv ? 'sanity' : 'demo');
  if (resolved !== 'sanity' && resolved !== 'demo') throw new Error('CONTENT_SOURCE must be sanity or demo.');
  if (resolved === 'demo' && vercelEnv === 'production') throw new Error('Sample resources cannot be deployed to production.');
  return resolved;
}

export const resourceQuery = `*[_type == "resource" && publicDistribution == true] | order(date desc, title asc) {
  title, "slug": slug.current, summary, category, date, kind, audience,
  scripture, series, session, body, publicDistribution,
  "fileUrl": file.asset->url, externalUrl
}`;

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
}

export function printablePdfUrl(resource: Pick<Resource, 'fileUrl' | 'slug'>) {
  if (!resource.fileUrl) return undefined;
  const url = new URL(resource.fileUrl);
  if (url.hostname === 'cdn.sanity.io') url.searchParams.set('dl', `${resource.slug}.pdf`);
  return url.href;
}
