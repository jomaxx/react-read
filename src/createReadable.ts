const key = Symbol('read');

interface Suspendable<T> extends PromiseLike<T> {
  [key]: () => T;
}

export function createReadable<T>(value: PromiseLike<T> | T) {
  let _read: () => T;

  if (isPromiseLike<T>(value)) {
    const promise = value as Suspendable<T>;

    if (!promise[key]) {
      const suspender = Promise.resolve(value);

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

    _read = () => promise[key]();
  } else {
    _read = () => value;
  }

  return {
    get value() {
      return _read();
    },

    read() {
      return _read();
    },
  } as const;
}

function isPromiseLike<T>(obj: any): obj is PromiseLike<T> {
  return obj && typeof obj.then === 'function';
}
