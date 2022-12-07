import { Header } from './components/Header/Header';
import { State } from './lib/State/State';

const cp1 = new Header(
  document.getElementById('app'),
  new State<{ data: string[] }>({
    data: ['user 1', 'user 2', 'user 3'],
  }),
);

const cp2 = new Header(
  document.getElementById('app'),
  new State<{ data: string[] }>({
    data: ['user 1', 'user 2', 'user 3'],
  }),
);

const cp3 = new Header(
  document.getElementById('app'),
  new State<{ data: string[] }>({
    data: ['user 1', 'user 2', 'user 3'],
  }),
);

const buttons = document.querySelectorAll('button');

buttons[0]?.addEventListener('click', () => {
  alert('update state');

  cp1.setState({ data: ['user 5'] });
});

buttons[1]?.addEventListener('click', () => {
  alert('update state');

  cp2.setState({ data: ['user 5'] });
});

buttons[2]?.addEventListener('click', () => {
  alert('update state');

  cp3.setState({ data: ['user 5', 'user 6', 'user 5'] });
});
