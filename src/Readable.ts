const key = Symbol('read');

interface Suspendable<T> extends PromiseLike<T> {
  [key]: () => T;
}

export class Readable<T> {
  static create<T>(object: PromiseLike<T> | T) {
    return new Readable(object);
  }

  constructor(object: PromiseLike<T> | T) {
    if (!isPromiseLike<T>(object)) {
      this._read = () => object;
      return;
    }

    const promise = object as Suspendable<T>;

    if (!promise[key]) {
      const suspender = Promise.resolve(object);

      promise[key] = () => {
        throw suspender;
      };

      suspender.then(
        result => {
          promise[key] = () => result;
        },
        error => {
          promise[key] = () => {
            throw error;
          };
        },
      );
    }

    this._read = () => promise[key]();
  }

  _read: () => T;

  get value() {
    return this._read();
  }

  get read() {
    return this._read;
  }
}

function isPromiseLike<T>(obj: any): obj is PromiseLike<T> {
  return obj && typeof obj.then === 'function';
}
