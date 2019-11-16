import { Readable } from './Readable';

export function read<T>(data: PromiseLike<T> | T) {
  return Readable.create(data).read();
}
