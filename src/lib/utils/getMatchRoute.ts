import { getRegexRoute } from './getRegexRoute';

export function getMatchRoute(route: string, path: string) {
  return path.match(getRegexRoute(route));
}
