import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Heade';
import { TaskList } from '../../components/TaskList/TaskList';
import { app, tasksState } from '../../main';

export const Index: Page = () => {
  new Header(app, undefined, { title: 'My Header' });
  new TaskList(app, tasksState);
  new Footer(app, undefined, { title: 'My Footer' });
};
