export function removeAllNodes(element: HTMLElement | DocumentFragment | null) {
  if (!element) return;
  while (element.firstChild) element.removeChild(element.firstChild);
}
