import { Readable } from './Readable';

export function createReadable<T>(value: PromiseLike<T> | T) {
  return Readable.create(value);
}
