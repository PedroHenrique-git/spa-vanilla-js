import { Observable, Observer, State } from '../State/State';
import { createFragment } from '../utils/createFragment';
import { updateComponentRegister } from '../utils/updateComponentRegister';

export interface Component {
  events?(): void;
  selectors?(): void;
}
export abstract class Component<
  T extends Record<string, unknown> = Record<string, unknown>,
> implements Observer
{
  private _state: State<T> | null = null;
  private template: DocumentFragment = new DocumentFragment();
  protected key: number;

  constructor(protected root: HTMLElement | null, state?: State<T>) {
    updateComponentRegister<T>(this);

    this.root = root;
    this.key = window.nextId;

    if (state) {
      this.initializeWithState(state);
    } else {
      this.initializeWithoutState();
    }
  }

  private initializeWithState(state: State<T>) {
    this._state = state;
    this._state.subscribe(this);
    this._state.notify();
  }

  private initializeWithoutState() {
    this.template = createFragment(this.render());
    this.root?.append(this.template);

    this.initializeEventsAndSelectors();
  }

  initializeEventsAndSelectors() {
    if (this.selectors) this.selectors();
    if (this.events) this.events();
  }

  setState(state: T) {
    if (!this._state) {
      const newState = new State<T>(state);

      this._state = newState;
      this._state.subscribe(this);
      this._state.notify();
    }

    this._state?.setState(state);
  }

  getState(): T | null | undefined {
    return this._state?.getState();
  }

  update(observable: Observable): void {
    if (observable instanceof State) {
      this.rerender();
    }
  }

  private rerender() {
    this.template = createFragment(this.render());
    const oldComponent = this.root?.children[this.key - 1];

    if (!this?.root) return;

    if (this.root.children.length && oldComponent)
      this.root.replaceChild(this.template, oldComponent);
    else this.root.append(this.template);

    this.initializeEventsAndSelectors();
  }

  abstract render(): string;
}
