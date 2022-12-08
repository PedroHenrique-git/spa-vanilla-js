import { pathToRegexp } from 'path-to-regexp';

export function getRegexRoute(route: string) {
  return pathToRegexp(route);
}
