import { dispatchNavigationEvent } from '../utils/dispatchNavigationEvent';
import { getMatchRoute } from '../utils/getMatchRoute';
import { getRegexRoute } from '../utils/getRegexRoute';
import { resetComponentRegister } from '../utils/updateComponentRegister';

export class Router {
  private _routeData: RouteData = {
    params: [],
    queryParams: new URLSearchParams(),
  };

  constructor(private routes: Route, private root: HTMLElement | null) {
    this.routes = routes;
    this.root = root;

    this.handleRoutes();
    this.handleRoute();
    this.handlePopState();
    this.init();
  }

  private init() {
    this.dispatchNavigationEvent();
  }

  private handlePopState() {
    window.addEventListener(
      'popstate',
      this.dispatchNavigationEvent.bind(this),
    );
  }

  private handleRoutes() {
    document.addEventListener('click', this.onNavigation.bind(this));
  }

  private handleRoute() {
    window.addEventListener('changeRoute', this.onRouteChange.bind(this));
  }

  private onRouteChange(event: Event) {
    const {
      detail: { url },
    } = event as CustomEvent<Navigation>;

    this.root?.replaceChildren();

    const route = Object.keys(this.routes).find((route) =>
      getMatchRoute(route, url.pathname),
    );

    if (route) {
      const params = url.pathname.split(getRegexRoute(route)).filter((s) => s);

      this._routeData = {
        params,
        queryParams: url.searchParams,
      };

      resetComponentRegister();
      this.routes[route](this._routeData);
    }
  }

  private onNavigation(event: MouseEvent) {
    event.preventDefault();

    const target = event.target as HTMLElement;

    if (!target.hasAttribute('route')) return;

    const path = target.getAttribute('href');

    window.history.pushState({}, '', path);

    this.dispatchNavigationEvent();
  }

  private dispatchNavigationEvent() {
    dispatchNavigationEvent();
  }
}
