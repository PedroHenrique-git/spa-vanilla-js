import uuid from 'uuid-browser';
import { Observable, Observer, State } from '../State/State';
import { createFragment } from '../utils/createFragment';

export abstract class Component<T = Record<string, unknown>>
  implements Observer
{
  private _state: State<T> | null = null;
  private template: DocumentFragment = new DocumentFragment();
  protected key: string = uuid();

  constructor(private root: HTMLElement | null, state?: State<T>) {
    this.root = root;

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
