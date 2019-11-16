# react-read

Utility that enables [Suspense for Data Fetching](https://reactjs.org/docs/concurrent-mode-suspense.html).

## Usage

### Install

```bash
yarn add react react-dom react-read
# or with NPM
npm install react react-dom react-read
```

### Readable.create(object) => readable

If `object` is a promise, calling `readable.read()` in your render function will suspend rendering until the promise is resolved. The same is true for `readable.value`.

https://codesandbox.io/s/snowy-framework-vuvp8

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Readable } from 'react-read';
import { fetchUser } from './api';

const readable = Readable.create(fetchUser(1));

function App(props) {
  const user = readable.read(); // or readable.value
  return <h1>Hello {user.name}!</h1>;
}

function AppLoading() {
  return <h1>Loading...</h1>;
}

ReactDOM.render(
  <React.Suspense fallback={<AppLoading />}>
    <App userId={1} />
  </React.Suspense>,
  document.getElementById('root'),
);
```

### createReadable(data) => readable

Create a `readable` object.

### read(promise) => value

Read a `promise` object.
