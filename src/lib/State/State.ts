export class State<T = Record<string, unknown>> implements Observable {
  private observers: Observer[] = [];
  private _state: T | null = null;

  constructor(state?: T | null) {
    this._state = state ? state : null;
  }

  getState() {
    return this._state;
  }

  setState(state: T) {
    this._state = state;
    this.notify();
  }

  subscribe(...observers: Observer[]): void {
    observers.forEach((observer) => {
      if (!this.observers.includes(observer)) this.observers.push(observer);
    });
  }

  unsubscribe(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex !== -1) {
      const newObservers = this.observers.filter((_, i) => i !== observerIndex);
      this.observers = newObservers;
    }
  }

  notify(): void {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}
