import { Observable, Observer, State } from '../State/State';
import { createFragment } from '../utils/createFragment';
import { updateComponentRegister } from '../utils/updateComponentRegister';

export abstract class Component<
  T extends Record<string, unknown> = Record<string, unknown>,
> implements Observer
{
  private _state: State<T> | null = null;
  private template: DocumentFragment = new DocumentFragment();
  protected key: number;

  constructor(private root: HTMLElement | null, state?: State<T>) {
    updateComponentRegister<T>(this);

    this.root = root;
    this.key = window.nextId;

    if (state) this.initializeState(state);
  }

  initializeState(state: State<T>) {
    this._state = state;
    this._state.subscribe(this);
    this._state.notify();
  }

  setState(state: T) {
    this._state?.setState(state);
  }

  getState(): T | null | undefined {
    return this._state?.getState();
  }

  update(observable: Observable): void {
    if (observable instanceof State) {
      this.template = createFragment(this.render());
      const currentVersion = document.querySelector(`[key='${this.key}']`);

      if (this.root?.children.length && currentVersion) {
        this.root.replaceChild(this.template, currentVersion);
      } else {
        this.root?.append(this.template);
      }
    }
  }

  abstract render(): string;
}
