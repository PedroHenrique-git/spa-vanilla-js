import { Header } from './components/Header/Header';
import { State } from './lib/State/State';

const cp1 = new Header(
  document.getElementById('app'),
  new State<{ data: string[] }>({
    data: ['user 1', 'user 2', 'user 3'],
  }),
);

document.querySelector('button')?.addEventListener('click', () => {
  alert('update state');

  cp1.setState({ data: ['user 5'] });
});
