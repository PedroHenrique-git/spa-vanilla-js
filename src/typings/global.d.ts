interface Window extends Window {
  componentRegistry: Record<
    number,
    import('../lib/Component/Component').Component
  >;
  nextId: number;
}
