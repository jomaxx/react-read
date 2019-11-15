import React from 'react';
import ReactDOM from 'react-dom';
import { useReadable } from './useReadable';

test('resolves', done => {
  const expected = {};

  function Test({ data }: any) {
    const received = data.read();

    React.useEffect(() => {
      expect(received).toBe(expected);
      done();
    }, []);

    return null;
  }

  function App() {
    const [data] = useReadable(async () => expected);
    return <Test data={data} />;
  }

  ReactDOM.render(
    <React.Suspense fallback={null}>
      <App />
    </React.Suspense>,
    document.createElement('div'),
  );
});
