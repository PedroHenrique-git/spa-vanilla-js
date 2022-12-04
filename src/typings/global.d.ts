/* eslint-disable no-unused-vars */

type Route = Record<string, Component>;

interface IComponent<T = Record<string, unknown>> {
  mount?(): void;
  unmount?(): void;
  readonly context?: T;
  private events?(): void;
  private selectors?(): void;
  render(): string;
}

interface Component<T = Record<string, unknown>> {
  new (context?: T): IComponent<T>;
}
