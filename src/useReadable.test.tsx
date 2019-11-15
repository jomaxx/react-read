import React from 'react';
import ReactDOM from 'react-dom';
import { useReadable } from './useReadable';

test('resolves', done => {
  const expected = {};
  const promise = Promise.resolve(expected);

  function Test() {
    const [data] = useReadable(() => promise);
    const received = data.read();

    React.useEffect(() => {
      expect(received).toBe(expected);
      done();
    }, []);

    return null;
  }

  ReactDOM.render(
    <React.Suspense fallback={null}>
      <Test />
    </React.Suspense>,
    document.createElement('div'),
  );
});
