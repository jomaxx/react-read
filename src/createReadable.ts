export function createReadable<T>(data: PromiseLike<T> | T) {
  let read: () => T;

  if (isPromiseLike<T>(data)) {
    read = () => {
      throw data;
    };

    Promise.resolve(data).then(
      result => {
        read = () => result;
      },
      error => {
        read = () => {
          throw error;
        };
      },
    );
  } else {
    read = () => data;
  }

  return {
    read() {
      return read();
    },
  } as const;
}

function isPromiseLike<T>(obj: any): obj is PromiseLike<T> {
  return obj && typeof obj.then === 'function';
}
