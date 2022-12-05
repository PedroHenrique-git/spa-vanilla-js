export type Route = Record<string, Component[]>;

export interface IComponent {
  readonly fragment: DocumentFragment;
  events?(): void;
  selectors?(): void;
  render(): string;
  init(): void;
}

export interface Component {
  new (_fragment: DocumentFragment, _context?: Context): IComponent;
}

export interface Context {
  data: string[];
}
