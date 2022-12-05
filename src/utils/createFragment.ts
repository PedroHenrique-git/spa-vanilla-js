export function createFragment(element: string) {
  return document.createRange().createContextualFragment(element);
}
