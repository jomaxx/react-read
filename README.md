# react-read

Utility that enables [Suspense for Data Fetching](https://reactjs.org/docs/concurrent-mode-suspense.html).

## Usage

### Install

```bash
yarn add react react-dom react-read
# or with NPM
npm install react react-dom react-read
```

### useReadable(factory, deps?) => [readable, put]

Calling `readable.read()` in your render function will suspend rendering until the promise returned by `factory` is resolved. Calling `put(data)` will trigger an update.

https://codesandbox.io/s/snowy-framework-vuvp8

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { useReadable } from 'react-read';
import { fetchUser } from './api';

function useUserData(userId) {
  return useReadable(() => fetchUser(userId), [userId]);
}

function UserNameInput({ userData, putUser }) {
  const user = userData.read();

  return (
    <input
      type="text"
      value={user.name}
      onChange={e => putUser({ ...user, name: e.target.value })}
    />
  );
}

function App(props) {
  const [userData, putUser] = useUserData(props.userId);
  return <UserNameInput userData={userData} putUser={putUser} />;
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
