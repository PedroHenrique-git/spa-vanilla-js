export function dispatchRerenderEvent(componentName: string) {
  dispatchEvent(new CustomEvent('rerender', { detail: { componentName } }));
}
