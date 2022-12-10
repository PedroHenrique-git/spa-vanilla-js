import { State } from '../State/State';
import { createApp } from '../utils/createApp';
import { createFragment } from '../utils/createFragment';
import { updateComponentRegister } from '../utils/updateComponentRegister';

export interface Component {
  events?(): void;
  selectors?(): void;
}
export abstract class Component<
  T extends Record<string, unknown> = Record<string, unknown>,
  U extends Record<string, unknown> = Record<string, unknown>,
> implements Observer
{
  private _state: State<T> | null = null;
  private _props: Props<U> = null;
  private template: DocumentFragment = new DocumentFragment();
  private reference: Element | null = null;
  private childrenReference: Component[] = [];
  protected root: HTMLElement | Element | DocumentFragment;
  protected key: number;

  constructor(
    root: HTMLElement | Element | DocumentFragment | null,
    state?: State<T>,
    props?: Props<U>,
    private children?: Children,
  ) {
    updateComponentRegister<T>(this);

    if (!root) {
      this.root = createApp();
    } else {
      this.root = root;
    }

    this.key = window.nextId;

    this.updateReference();

    if (props) {
      this._props = props;
    }

    if (children) {
      this.children = children;
    }

    if (state) {
      this.initializeWithState(state);
    } else {
      this.initializeWithoutState();
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

  getProps() {
    return this._props;
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
      const [Component, State, Props] = child;

      if (this.reference) {
        const component = new Component(this.reference, State, Props);
        this.childrenReference.push(component);
      }
    }
  }

  private rerenderChildren() {
    if (!this.children) return;

    this.children.forEach((child, index) => {
      const [Component, DefaultState, Props] = child;

      const oldState = this.childrenReference[index]?.getState();
      const newState = oldState ? new State(oldState) : DefaultState;

      if (this.reference) {
        const component = new Component(this.reference, newState, Props);
        this.childrenReference.push(component);
      }
    });
  }

  private firstRender() {
    this.updateTemplate();

    this.root.append(this.template);
    this.updateReference();

    this.initializeEventsAndSelectors();
    this.mountChildren();
  }

  private updateTemplate() {
    this.template = createFragment(this.render());

    if (this.template.children.length > 1) {
      throw new Error('a component must have a parent element');
    }

    this.template.children.item(0)?.setAttribute('key', String(this.key));
  }

  private rerender() {
    this.updateTemplate();

    // REFERENCE BEFORE RERENDER
    this.updateReference();

    if (this.root.children.length && this.reference)
      this.root.replaceChild(this.template, this.reference);

    // REFERENCE AFTER RERENDER
    this.updateReference();

    this.mountChildren(true);
    this.initializeEventsAndSelectors();
  }

  private clearOldChildren() {
    if (!this.children) return;

    while (this.childrenReference.length !== this.children.length)
      this.childrenReference.shift();
  }

  private updateReference() {
    this.reference = this.root.querySelector(`[key='${this.key}']`);
  }

  abstract render(): string;
}
