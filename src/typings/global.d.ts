interface Window extends Window {
  componentRegistry: Record<
    number,
    import('../lib/Component/Component').Component
  >;
  nextId: number;
}

interface Observer {
  update(_observable: Observable): void;
}

interface Observable {
  subscribe(..._observers: Observer[]): void;
  unsubscribe(_observer: Observer): void;
  notify(): void;
}

type Page = (_routeData?: RouteData) => void;

type Route = Record<string, Page>;

type Navigation = { url: URL };

type RouteData = {
  params: string | string[];
  queryParams: URLSearchParams;
};

type DOMElement = HTMLElement | Element | null | undefined;

type Page = (_routeData?: RouteData) => void;

type Children = Array<[Child, ChildState?, Props?]>;

type ChildState = State<T> | undefined;

type Props<U> = U | null;

type State<T> = import('../lib/State/State').State<T>;

type Child = new (
  protected _root: HTMLElement | Element | DocumentFragment,
  _state?: State,
  _props?: Props,
  private _children?: Children,
) => import('../lib/Component/Component').Component;
