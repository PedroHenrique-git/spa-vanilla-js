import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { globalCss } from '../../stitches.config';
import { Route } from '../../typings/global';
import { execIfExists } from '../../utils/execIfExists';
import { getMatchRoute } from '../../utils/getMatchRoute';

type OnRouteChange = { url: URL };

interface IApp<T> {
  routes: Route;
  readonly context?: T;
}

const global = globalCss({
  '*': {
    padding: '0',
    margin: '0',
    boxSizing: 'border-box',

    color: '$black',
    fontFamily: '$principal',
    fontWeight: '$medium',
    fontSize: 'medium',
  },

  html: {
    fontSize: '62.5%',
  },

  '.content': {
    maxWidth: '1440px',
    minHeight: '100vh',
    width: '100%',
    margin: '0 auto',
    padding: '$sp1',
  },
});

export class App<T = Record<string, unknown>> {
  private app: HTMLElement | null = null;
  private routerComponent: IComponent | null = null;
  private routes: Route = {};
  private context: T | undefined = undefined;

  constructor({ routes, context }: IApp<T>) {
    this.routes = routes;
    this.context = context;
    this.init();
  }

  private init() {
    this.createApp();
    this.handleRoute();
    this.handleRoutes();
    this.dispatchNavigationEvent();
  }

  private createApp() {
    this.app = document.getElementById('app');

    if (this.app) return;

    const app = document.createElement('div');
    app.setAttribute('id', 'app');
    this.app = app;

    document.body.appendChild(this.app);
  }

  private handleRoutes() {
    window.addEventListener('changeRoute', (event) =>
      this.onRouteChange(event as CustomEvent<OnRouteChange>),
    );
  }

  private handleRoute() {
    document.addEventListener('click', this.onNavigate.bind(this));
  }

  private onRouteChange(event: CustomEvent<OnRouteChange>) {
    const url = event.detail.url;
    const routesPaths = Object.keys(this.routes);

    const route = routesPaths.find((route) =>
      getMatchRoute(route, url.pathname),
    );

    execIfExists(this.routerComponent?.unmount?.bind(this));

    if (route) {
      this.routerComponent = new this.routes[route](this.context);
    }

    execIfExists(this.routerComponent?.mount?.bind(this));

    if (this.app) {
      this.app.innerHTML = this.render();
    }
  }

  private onNavigate(event: MouseEvent) {
    event.preventDefault();

    const element = event.target as HTMLElement;

    if (!element.hasAttribute('data-route')) return;

    const path = element.getAttribute('href');

    window.history.pushState({}, '', path);

    this.dispatchNavigationEvent();
  }

  private dispatchNavigationEvent() {
    const navigateEvent = new CustomEvent<OnRouteChange>('changeRoute', {
      detail: {
        url: new URL(`${window.location.href}`),
      },
    });

    dispatchEvent(navigateEvent);
  }

  private render() {
    return String.raw`
        ${global()}

        ${new Header().render()}
        ${this.routerComponent?.render()}
        ${new Footer().render()}
    `;
  }
}
