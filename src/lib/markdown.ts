import { micromark } from 'micromark';

export function renderResourceBody(markdown: string) {
  return micromark(markdown);
}
