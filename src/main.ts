import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { App } from './lib/App/App';
import { createContext } from './lib/Context/Context';
import { Home } from './pages/Home/Home';
import { Page } from './pages/Page/Page';
import { ContextData } from './typings';

(() => {
  const context = createContext<ContextData>({
    count: 0,
  });

  new App<ContextData>({
    routes: {
      '/': [Header, Home, Footer],
      '/page': [Header, Page, Footer],
      '/page/:id': [Header, Page, Footer],
    },
    context,
  });
})();
