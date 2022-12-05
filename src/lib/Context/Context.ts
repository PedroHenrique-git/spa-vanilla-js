import { dispatchRerenderEvent } from '../../utils/dispatchRerenderEvent';

export interface Context<T = Record<string, unknown>> {
  set(_prop: string, _value: any, _componentName: string): void;
  get(_prop: string): T[keyof T];
}

export function createContext<T extends object>(initialState: T): Context<T> {
  const context = new Proxy(initialState, {
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
    deleteProperty(target, prop) {
      delete target[prop as keyof typeof target];
      return true;
    },
  });

  return {
    set(prop: string, value: any, componentName: string) {
      context[prop as keyof typeof context] = value;
      dispatchRerenderEvent(componentName);
    },
    get(prop: string) {
      return context[prop as keyof typeof context];
    },
  };
}
