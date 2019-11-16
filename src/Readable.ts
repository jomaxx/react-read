const key = Symbol('read');

interface Suspendable<T> extends PromiseLike<T> {
  [key]?: () => T;
}

export class Readable<T> {
  static create<T>(object: Suspendable<T> | T) {
    return new Readable(object);
  }

  constructor(object: Suspendable<T> | T) {
    if (!isSuspendable<T>(object)) {
      this._read = () => object;
      return;
    }

    if (!object[key]) {
      const suspender = Promise.resolve(object);

      object[key] = () => {
        throw suspender;
      };

      suspender.then(
        result => {
          object[key] = () => result;
        },
        error => {
          object[key] = () => {
            throw error;
          };
        },
      );
    }

    this._read = () => (object[key] as () => T)();
  }

  _read: () => T;

  get value() {
    return this._read();
  }

  get read() {
    return this._read;
  }
}

function isSuspendable<T>(obj: any): obj is Suspendable<T> {
  return obj && typeof obj.then === 'function';
}
