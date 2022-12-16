import { changeRoute, Component } from 'spa-vanilla';
import { baseURL } from '../../constants';
import { Context, Task, TaskStatus } from '../../main';
import { css } from '../../stitches.config';

/*
    outline: 'none',
      border: '1px solid #cecece',
      borderRadius: '20px',
      padding: '10px d20px',
*/

const editTaskCss = css({
  '.edit-task__container': {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',

    marginTop: '25px',
  },

  '.form': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '30px',

    '.input_container': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',

      'input[type="text"]': {
        outline: 'none',
        border: '1px solid #cecece',
        borderRadius: '20px',
        padding: '10px 20px',
      },

      'input[type="checkbox"]': {
        width: '15px',
        height: '15px',
      },
    },
  },
});

export class EditTask extends Component<Context> {
  private statusSelect: HTMLSelectElement | null = null;
  private saveButton: HTMLButtonElement | null = null;
  private taskName: HTMLInputElement | null = null;

  selectors(): void {
    this.statusSelect = this.root.querySelector<HTMLSelectElement>('#status');
    this.taskName = this.root.querySelector<HTMLInputElement>('#task_name');
    this.saveButton = this.root.querySelector<HTMLButtonElement>('#save_task');
  }

  events(): void {
    this.saveButton?.addEventListener('click', this.saveEdition.bind(this));
  }

  saveEdition() {
    this.selectors();

    const currentState = (this.getState() ?? {}) as Context;

    const newTask: Task[] = currentState.tasks.map((task, i) => {
      if (i === currentState.selectedTask?.id) {
        return {
          name: this.taskName?.value ?? '',
          status: (this.statusSelect?.value ?? '') as TaskStatus,
        };
      }

      return task;
    });

    this.setState({
      ...currentState,
      tasks: newTask,
    });

    changeRoute(baseURL);
  }

  render(): string {
    return String.raw`
        <main class='content ${editTaskCss()}'>
            <div class='edit-task__container'>
                <div class="form">
                    <div class="input_container">
                        <input type='text' value='${
                          this.getState()?.selectedTask?.task?.name
                        }' id="task_name"/>
                    </div>
                    <div class="input_container">
                        <label for="status">Status</label>
                        <select id="status">
                            <option value="done" ${
                              this.getState()?.selectedTask?.task?.status ===
                              'done'
                                ? 'selected'
                                : ''
                            }>Done</option>
                            <option value="In progress" ${
                              this.getState()?.selectedTask?.task?.status ===
                              'In progress'
                                ? 'selected'
                                : ''
                            }>In progress</option>
                        </select>
                    </div>
                    <button id="save_task">Save</button>
                </div>
            </div>
        </main>
    `;
  }
}
