import React from 'react';
import { createReadable } from './createReadable';

export function useReadable<T>(
  factory: () => PromiseLike<T> | T,
  deps: any[] = [],
) {
  const init = React.useMemo(factory, deps);

  const [readable, put] = React.useReducer(
    (_prev, next: PromiseLike<T> | T) => createReadable(next),
    init,
    createReadable,
  );

  React.useMemo(() => {
    put(init);
  }, [init]);

  return React.useMemo(() => [readable, put], [readable]);
}
