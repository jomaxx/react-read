import { createReadable } from './createReadable';

export function read<T>(promise: Promise<T>) {
  return createReadable(promise).read();
}
