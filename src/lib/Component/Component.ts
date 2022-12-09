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
  private reference: Element | null = null;
  private childrenReference: Component[] = [];
  protected key: number;

  constructor(
    protected root: HTMLElement | Element | DocumentFragment,
    state?: State<T>,
    private children?: Children,
  ) {
    updateComponentRegister<T>(this);

    if (!root) {
      throw new Error('root was not provided');
    }

    this.root = root;
    this.key = this.root.children.length;

    if (state) {
      this.initializeWithState(state);
    } else {
      this.initializeWithoutState();
    }

    this.reference = this.root.children.item(this.key);

    if (children) {
      this.children = children;
    }
  }

  private initializeWithState(state: State<T>) {
    this.firstRender();

    this._state = state;
    this._state.subscribe(this);
    this._state.notify();
  }

  private initializeWithoutState() {
    this.firstRender();
    this.initializeEventsAndSelectors();
  }

  private mountChildren(isRerender = false) {
    if (!this.children) return;

    if (isRerender) {
      this.rerenderChildren();
      this.clearOldChildren();

      return;
    }

    this.renderChildren();
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

  private renderChildren() {
    if (!this.children) return;

    for (const child of this.children) {
      const [Component, State] = child;

      if (this.reference) {
        const component = new Component(this.reference, State);
        this.childrenReference.push(component);
      }
    }
  }

  private rerenderChildren() {
    if (!this.children) return;

    this.children.forEach((child, index) => {
      const [Component, DefaultState] = child;

      const oldState = this.childrenReference[index]?.getState();
      const newState = oldState ? new State(oldState) : DefaultState;

      if (this.reference) {
        const component = new Component(this.reference, newState);
        this.childrenReference.push(component);
      }
    });
  }

  private firstRender() {
    this.template = createFragment(this.render());
    this.root.append(this.template);
    this.reference = this.root.children.item(this.key);

    this.initializeEventsAndSelectors();
    this.mountChildren();
  }

  private rerender() {
    this.template = createFragment(this.render());

    // REFERENCE BEFORE RERENDER
    this.reference = this.root.children.item(this.key);

    if (this.root.children.length && this.reference)
      this.root.replaceChild(this.template, this.reference);

    // REFERENCE AFTER RERENDER
    this.reference = this.root.children.item(this.key);

    this.mountChildren(true);
    this.initializeEventsAndSelectors();
  }

  private clearOldChildren() {
    if (!this.children) return;

    while (this.childrenReference.length !== this.children.length)
      this.childrenReference.shift();
  }

  abstract render(): string;
}
