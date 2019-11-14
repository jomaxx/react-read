const key = Symbol('read');

interface Readable<T> extends PromiseLike<T> {
  [key]: () => T;
}

export function read<T>(promise: PromiseLike<T>): T {
  const readable = promise as Readable<T>;

  if (!readable[key]) {
    readable[key] = () => {
      throw readable;
    };

    Promise.resolve(readable).then(
      result => {
        readable[key] = () => result;
      },
      error => {
        readable[key] = () => {
          throw error;
        };
      },
    );
  }

  return readable[key]();
}
