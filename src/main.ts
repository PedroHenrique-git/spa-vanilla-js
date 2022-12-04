import { App } from './lib/App/App';
import { Home } from './pages/Home/Home';
import { Page } from './pages/Page/Page';

export interface Context {
  data: string[];
}

(() => {
  new App<Context>({
    routes: {
      '/': Home,
      '/page': Page,
      '/page/:id': Page,
    },
    context: {
      data: ['user 1', 'user 2'],
    },
  });
})();
