# react-read

Read the value of a promise. Uses React Suspense to "wait" for promise to resolve.

## Usage

```bash
yarn add react react-dom react-read
```

### Basic Example

`react-read` relies on the same promise object being passed to it across renders. A trivial way to ensure the same promise is passed would be to store it in a variable outside of render.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { read } from "react-read";

let promise;

function App() {
  const msg = read(
    promise ||
      (promise = new Promise(resolve => {
        setTimeout(resolve, 1000, "Hello World!");
      }))
  );

  return <h1>{msg}</h1>;
}

ReactDOM.render(
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <App />
  </React.Suspense>,
  document.getElementById("root")
);
```

### Memoize Example

[lodash.memoize](https://lodash.com/docs/#memoize) creates a function that caches the result of a function call. When the memoized function is called with the same cache key then it will return the cached result.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { read } from "react-read";
import memoize from "lodash/memoize";

const getMessage = memoize(
  key =>
    new Promise(resolve => {
      setTimeout(resolve, 1000, "Hello World!");
    })
);

function App() {
  const msg = read(getMessage(1));
  return <h1>{msg}</h1>;
}

ReactDOM.render(
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <App />
  </React.Suspense>,
  document.getElementById("root")
);
```

### DataLoader Example

[DataLoader](https://github.com/graphql/dataloader) is a generic utility to be used as part of your application's data fetching layer to provide a consistent API over various backends and reduce requests to those backends via batching and caching.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { read } from "react-read";
import DataLoader from "dataloader";

const messageLoader = new DataLoader(keys =>
  Promise.all(
    keys.map(
      key =>
        new Promise(resolve => {
          setTimeout(resolve, 1000, "Hello World!");
        })
    )
  )
);

function App() {
  const msg = read(messageLoader.load(1));
  return <h1>{msg}</h1>;
}

ReactDOM.render(
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <App />
  </React.Suspense>,
  document.getElementById("root")
);
```
