import { globalCss } from '../../stitches.config';
import { Route } from '../../typings';
import { getMatchRoute } from '../../utils/getMatchRoute';
import { removeAllNodes } from '../../utils/removeAllNodes';
import { Context } from '../Context/Context';

type OnRouteChange = { url: URL };

interface IApp<T> {
  routes: Route<T>;
  context: Context<T>;
}

globalCss({
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
})();

export class App<T> {
  private app: HTMLElement | null = null;
  private rootFragment: DocumentFragment = new DocumentFragment();
  private routes: Route<T> = {};
  private context: Context<T> | undefined = undefined;
  private route: string | undefined = '/';

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
    this.rerenderListener();
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

    this.route = routesPaths.find((route) =>
      getMatchRoute(route, url.pathname),
    );

    this.rerender();
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

  private rerender() {
    removeAllNodes(this.app);
    removeAllNodes(this.rootFragment);

    if (this.route) {
      this.routes[this.route].forEach((Component) => {
        new Component(this.rootFragment, this.context);
      });
    }

    this.app?.append(this.rootFragment);
  }

  private rerenderListener() {
    window.addEventListener('rerender', this.rerender.bind(this));
  }
}
