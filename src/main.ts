import { Example } from './components/Example/Example';
import { baseURL } from './constants';
import { Router } from './lib/Router/Router';
import { State } from './lib/State/State';
import { createContainer } from './lib/utils/createContainer';
import { globalStyles } from './styles';

globalStyles();

const app = document.getElementById('app');

const Page1: Page = () => {
  createContainer('div', app, (container) => {
    new Example(container, new State({ count: 0 }));
  });
};

const Page2: Page = () => {
  createContainer('div', app, (container) => {
    new Example(container);
    new Example(container, new State({ count: 0 }));
  });
};

const Page3: Page = () => {
  createContainer('main', app, (container) => {
    new Example(container);
    new Example(container, new State({ count: 0 }));
    new Example(container);
  });
};

new Router(
  {
    [`${baseURL}`]: Page1,
    [`${baseURL}page/:id`]: Page2,
    [`${baseURL}page/:id/:id`]: Page3,
  },
  app,
);
