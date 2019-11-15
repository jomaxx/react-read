const key = Symbol('read');

interface Suspender<T> extends Promise<T> {
  [key]: () => T;
}

export function createReadable<T>(promise: Promise<T>) {
  const suspender = promise as Suspender<T>;

  if (!suspender[key]) {
    suspender[key] = () => {
      throw suspender;
    };

    suspender.then(
      result => {
        suspender[key] = () => result;
      },
      error => {
        suspender[key] = () => {
          throw error;
        };
      },
    );
  }

  return {
    get read() {
      return suspender[key];
    },
  };
}
