import { createReadable } from './createReadable';

export function read<T>(data: PromiseLike<T> | T) {
  return createReadable(data).read();
}
