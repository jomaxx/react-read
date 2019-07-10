const key = Symbol("record");

export function read<T>(promise: Promise<T>): T {
  const record = promise[key] || (promise[key] = {});

  if (record.status === undefined) {
    record.status = 0;

    promise.then(
      value => {
        record.status = 1;
        record.value = value;
      },
      error => {
        record.status = 2;
        record.error = error;
      }
    );
  }

  switch (record.status) {
    case 0:
      throw promise;
    case 1:
      return record.value;
    case 2:
      throw record.error;
    default:
      throw new TypeError("error reading promise");
  }
}
