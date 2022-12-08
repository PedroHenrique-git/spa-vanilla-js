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

type DOMElement = HTMLElement | null | undefined;

type Page = (_routeData?: RouteData) => void;
