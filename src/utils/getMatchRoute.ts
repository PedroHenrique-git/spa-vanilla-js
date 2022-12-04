import { pathToRegexp } from 'path-to-regexp';

export function getMatchRoute(route: string, path: string) {
  return path.match(pathToRegexp(route));
}
