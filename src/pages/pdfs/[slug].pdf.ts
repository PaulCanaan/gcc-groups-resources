import type { APIRoute } from 'astro';
import { resources } from '../../lib/resources';

export async function getStaticPaths() {
  return (await resources).filter(resource => resource.fileUrl).map(resource => ({
    params: { slug: resource.slug }, props: { fileUrl: resource.fileUrl },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const response = await fetch(props.fileUrl);
  if (!response.ok) throw new Error(`Unable to build PDF preview: ${response.status}`);
  const data = await response.arrayBuffer();
  if (new TextDecoder().decode(data.slice(0, 5)) !== '%PDF-') throw new Error('Invalid PDF preview source');
  return new Response(data, { headers: { 'Content-Type': 'application/pdf' } });
};
