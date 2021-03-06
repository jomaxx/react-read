import React from 'react';
import ReactDOM from 'react-dom';
import { read } from './read';

test('resolves', done => {
  const expected = {};
  const promise = Promise.resolve(expected);

  function Test() {
    const received = read(promise);

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
