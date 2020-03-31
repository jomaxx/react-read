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
            throw rethrown(error);
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

function rethrown(old: Error) {
  if (!(old instanceof Error)) return old;
  const error = new Error(old.message);
  error.name = old.name;
  error.message = old.message;
  if (!error.stack || !old.stack) return old;
  const stack = error.stack.split('\n');
  stack.splice(1, 1);
  stack.push('    rethrown:');
  stack.push(...old.stack.split('\n').slice(1));
  error.stack = stack.join('\n');
  return error;
}
