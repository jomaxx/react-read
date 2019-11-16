import React from 'react';
import ReactDOM from 'react-dom';
import { Readable } from './Readable';

beforeEach(() => {
  jest.restoreAllMocks();
});

test('returns', done => {
  const expected = {};
  const readable = Readable.create(expected);

  function Test() {
    const { value: received } = readable;

    React.useEffect(() => {
      expect(received).toBe(expected);
      done();
    }, []);

    return null;
  }

  ReactDOM.render(<Test />, document.createElement('div'));
});

test('resolves', done => {
  const expected = {};
  const readable = Readable.create(Promise.resolve(expected));

  function Test() {
    const received = readable.read();

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

test('rejects', done => {
  jest.spyOn(console, 'error').mockReturnValue(undefined);

  const expected = new Error('error');
  const readable = Readable.create(Promise.reject(expected));

  class ErrorBoundary extends React.Component {
    componentDidCatch(received: Error) {
      expect(received).toBe(expected);
      done();
    }

    render() {
      return this.props.children;
    }
  }

  function Test() {
    readable.read();
    return null;
  }

  ReactDOM.render(
    <ErrorBoundary>
      <React.Suspense fallback={null}>
        <Test />
      </React.Suspense>
    </ErrorBoundary>,
    document.createElement('div'),
  );
});
