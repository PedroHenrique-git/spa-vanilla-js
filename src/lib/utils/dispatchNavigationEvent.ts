export function dispatchNavigationEvent() {
  const navigationEvent = new CustomEvent<Navigation>('changeRoute', {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: {
      url: new URL(window.location.href),
    },
  });

  dispatchEvent(navigationEvent);
}
