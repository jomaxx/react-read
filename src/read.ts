import { createReadable } from './createReadable';

const key = Symbol('readable');

interface Suspender<T> extends PromiseLike<T> {
  [key]: {
    read: () => T;
  };
}

export function read<T>(data: PromiseLike<T>) {
  const suspender = data as Suspender<T>;
  if (!suspender[key]) suspender[key] = createReadable(data);
  return suspender[key].read();
}
