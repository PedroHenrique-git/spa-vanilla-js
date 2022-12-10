import { EditTask } from '../../components/EditTask/EditTask';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Heade';
import { app, Context, tasksState } from '../../main';

export const EditTaskPage: Page = (routeData) => {
  const [id] = routeData?.params ?? [];

  const currentState = (tasksState.getState() ?? {}) as Context;

  tasksState.setState({
    ...currentState,
    selectedTask: {
      task: currentState?.tasks?.find((_, i) => i === Number(id)),
      id: Number(id),
    },
  });

  new Header(app, undefined, { title: 'My Header' });
  new EditTask(app, tasksState);
  new Footer(app, undefined, { title: 'My Footer' });
};
