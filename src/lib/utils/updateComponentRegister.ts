import { Component } from '../Component/Component';

export function updateComponentRegister<T extends Record<string, unknown>>(
  component: Component<T>,
) {
  if (!window.componentRegistry) {
    window.componentRegistry = {};
  }

  if (!window.nextId) {
    window.nextId = 0;
  }

  window.componentRegistry[++window.nextId] = component;
}
