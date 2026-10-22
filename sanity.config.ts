import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { resource } from './sanity/resource';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
if (!projectId || !dataset) throw new Error('Set SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET to start Studio.');

export default defineConfig({
  name: 'gcc-groups-resources', title: 'Golden City Groups · Resources',
  projectId, dataset,
  plugins: [structureTool()],
  schema: { types: [resource] },
});
