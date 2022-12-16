import { Component } from 'spa-vanilla';
import { baseURL } from '../../constants';
import { Context } from '../../main';
import { css } from '../../stitches.config';

const taskListCss = css({
  '.list__container': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

    '& > ul': {
      '& li': {
        marginBottom: '10px',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',

        '& .actions': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',

          '[route]': {
            color: 'blue',
          },
        },

        '&.done p': {
          textDecoration: 'line-through',
        },
      },
    },
  },
});

export class TaskList extends Component<Context> {
  events(): void {
    document.querySelectorAll('.delete_task').forEach((button) => {
      button.addEventListener('click', this.deleteTask.bind(this, button));
    });
  }

  deleteTask(button: Element) {
    if (!button.getAttribute('task')) return;

    const taskId = Number(button.getAttribute('task'));

    const currentState = (this.getState() ?? {}) as Context;
    const newTasks = currentState?.tasks.filter((_, i) => i !== taskId);

    this.setState({ ...currentState, tasks: newTasks ?? [] });
  }

  render(): string {
    return String.raw`
        <main class='content ${taskListCss}'>
            <div class='list__container'>
                <ul>
                    ${this.getState()
                      ?.tasks.map(
                        (task, index) =>
                          String.raw`
                            <li class='${task.status === 'done' ? 'done' : ''}'>
                                <p>${task.name}</p>
                                <div class='actions'>
                                    <a href='${baseURL}task/${index}' route>edit</a>
                                    <button class="delete_task" task='${index}'>delete</button>
                                </div>
                            </li>
                        `,
                      )
                      .join('')}
                </ul>        
            </div>
        </main>
    `;
  }
}
