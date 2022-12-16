import { Router, State } from 'spa-vanilla';
import { baseURL } from './constants';
import { EditTaskPage } from './pages/EditTask/EditTask';
import { Index } from './pages/Index';
import { globalStyles } from './styles';

globalStyles();

export type TaskStatus = 'done' | 'In progress';

export type Task = {
  name: string;
  status: TaskStatus;
};

export type Context = {
  tasks: Task[];
  selectedTask: { task: Task | null | undefined; id: number } | null;
};

const initialState: Context = {
  tasks: [
    {
      name: 'buy rice',
      status: 'In progress',
    },
    {
      name: 'study english',
      status: 'done',
    },
    {
      name: 'go to the gym',
      status: 'In progress',
    },
    {
      name: 'walk the dog',
      status: 'done',
    },
  ],
  selectedTask: null,
};

export const app = document.getElementById('app');

export const tasksState = new State<Context>(initialState);

new Router(
  {
    [`${baseURL}`]: Index,
    [`${baseURL}task/:id`]: EditTaskPage,
  },
  app,
);
