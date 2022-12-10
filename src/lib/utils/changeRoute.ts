import { dispatchNavigationEvent } from './dispatchNavigationEvent';

export function changeRoute(path: string) {
  window.history.pushState({}, '', path);
  dispatchNavigationEvent();
}
