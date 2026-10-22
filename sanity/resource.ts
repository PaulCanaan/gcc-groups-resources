import { defineField, defineType } from 'sanity';
import { categories } from '../src/lib/resource';

export const resource = defineType({
  name: 'resource', title: 'Resource', type: 'document',
  description: 'Public resources only. A leader audience does not require private access. Ordinary dataset files have public CDN URLs.',
  fields: [
    defineField({ name: 'title', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: rule => rule.required() }),
    defineField({ name: 'summary', type: 'text', rows: 3, validation: rule => rule.required().max(240) }),
    defineField({ name: 'category', type: 'string', options: { list: categories.map(c => ({ title: c.title, value: c.id })) }, validation: rule => rule.required() }),
    defineField({ name: 'date', title: 'Resource date', type: 'date', validation: rule => rule.required() }),
    defineField({ name: 'kind', title: 'Resource type', type: 'string', options: { list: ['Reading guide', 'Discussion guide', 'Leader training', 'Leader agreement', 'External resource'] }, validation: rule => rule.required() }),
    defineField({ name: 'audience', type: 'string', initialValue: 'everyone', options: { list: [{ title: 'Everyone', value: 'everyone' }, { title: 'Group leaders', value: 'leaders' }] }, validation: rule => rule.required() }),
    defineField({ name: 'scripture', type: 'string' }),
    defineField({ name: 'series', type: 'string' }),
    defineField({ name: 'session', type: 'number', validation: rule => rule.integer().positive() }),
    defineField({ name: 'body', title: 'Resource text', type: 'text', rows: 12, description: 'Separate paragraphs with a blank line. Plain text keeps resources readable and easy to print.', validation: rule => rule.required() }),
    defineField({ name: 'file', title: 'Public download', type: 'file', options: { accept: '.pdf' }, description: 'Upload only an edition cleared for public distribution. Files are public on the asset CDN.' }),
    defineField({ name: 'externalUrl', title: 'External source', type: 'url', validation: rule => rule.uri({ scheme: ['https'] }) }),
    defineField({ name: 'publicDistribution', title: 'Cleared for public distribution', type: 'boolean', initialValue: false, description: 'Confirm review, privacy, and any required permission before publishing. A website filter does not make CMS content private.' }),
  ],
  preview: { select: { title: 'title', subtitle: 'kind' } },
});
