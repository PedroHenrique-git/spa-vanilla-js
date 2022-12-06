import { Context } from '../lib/Context/Context';

export type Route<T> = Record<string, Component<T>[]>;

export interface IComponent {
  readonly rootFragment: DocumentFragment;
  fragment: DocumentFragment;
  events?(): void;
  selectors?(): void;
  render(): string;
  init(): void;
}

export interface Component<T> {
  new (_fragment: DocumentFragment, _context?: Context<T>): IComponent;
}

export interface ContextData {
  count: number;
}
