import { micromark } from 'micromark';
import { gfmTable, gfmTableHtml } from 'micromark-extension-gfm-table';

export function renderResourceBody(markdown: string) {
  return micromark(markdown, {
    extensions: [gfmTable()],
    htmlExtensions: [gfmTableHtml()],
  });
}
