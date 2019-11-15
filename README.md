# react-read

Utility that enables [Suspense for Data Fetching](https://reactjs.org/docs/concurrent-mode-suspense.html).

## Usage

### Install

```bash
yarn add react react-dom react-read
# or with NPM
npm install react react-dom react-read
```

### createReadable(promise)

`createReadable(promise)` returns an `object` with a `read` method. Calling `object.read()` in your render function will suspend rendering until the promise is resolved. If the promise rejects, the rejection is thrown.

https://codesandbox.io/s/snowy-framework-vuvp8

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createReadable } from 'react-read';
import { fetchUser } from './api';

const promise = fetchUser(1);
const readable = createReadable(promise);

function App() {
  const user = readable.read();
  return <h1>Hello {user.name}!</h1>;
}

function AppLoading() {
  return <h1>Loading...</h1>;
}

ReactDOM.render(
  <React.Suspense fallback={<AppLoading />}>
    <App />
  </React.Suspense>,
  document.getElementById('root'),
);
```

### read(promise)

Same as `createReadable(promise).read()`.
