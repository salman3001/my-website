import { EventEmitter } from "node:events";

export type IBaseEventHandlers = Record<string, (...args: any[]) => void>;

export abstract class BaseEvent<T extends IBaseEventHandlers> {
  private eventEmitter: EventEmitter;
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  emit<EventKey extends keyof T>(
    event: EventKey,
    ...payload: Parameters<T[EventKey]>
  ) {
    this.eventEmitter.emit(event as string, ...payload);
  }

  on<EventKey extends keyof T>(event: EventKey, cb: T[EventKey]) {
    this.eventEmitter.on(event as string, cb);
  }
}
