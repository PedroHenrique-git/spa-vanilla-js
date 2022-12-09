interface Window extends Window {
  componentRegistry: Record<
    number,
    import('../lib/Component/Component').Component
  >;
  nextId: number;
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

type Children = Array<[Child, ChildState, Children?]>;

type ChildState = import('../lib/State/State').State<T> | undefined;

type Child = new (
  protected _root: HTMLElement | Element | DocumentFragment,
  _state?: import('../lib/State/State').State<T>,
  private _children?: Children,
) => import('../lib/Component/Component').Component;
