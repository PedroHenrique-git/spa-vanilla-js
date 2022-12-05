export function createContext<T extends object>(initialState: T) {
  return new Proxy(initialState, {
    get(target, prop) {
      if (prop in target) {
        return target[prop as keyof typeof target];
      }

      throw new Error(`${String(prop)} does not exists`);
    },
    set(target, prop, value) {
      target[prop as keyof typeof target] = value;
      return true;
    },
  });
}
