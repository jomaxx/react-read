import React from 'react';
import { createReadable } from './createReadable';

export function useReadable<T>(
  factory: () => PromiseLike<T> | T,
  deps: any[] = [],
) {
  const init = React.useMemo(factory, deps);

  const value = React.useReducer(
    (_prev, next: PromiseLike<T> | T) => createReadable(next),
    init,
    createReadable,
  );

  const [, put] = value;

  React.useMemo(() => {
    put(init);
  }, [init]);

  return value;
}
