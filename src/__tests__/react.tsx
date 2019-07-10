import * as React from "react";
import * as ReactDOM from "react-dom";
import { read } from "..";

test("returns", done => {
  const promise = Promise.resolve("Hello World!");

  function Test() {
    const value = read(promise);

    React.useEffect(() => {
      expect(value).toBe("Hello World!");
      done();
    }, []);

    return null;
  }

  ReactDOM.render(
    <React.Suspense fallback={null}>
      <Test />
    </React.Suspense>,
    document.createElement("div")
  );
});

test("throws", done => {
  const promise = Promise.reject("Hello World!");

  function Test() {
    let value: string;

    try {
      read(promise);
    } catch (error) {
      if (typeof error !== "string") throw error;
      value = error;
    }

    React.useEffect(() => {
      expect(value).toBe("Hello World!");
      done();
    }, []);

    return null;
  }

  ReactDOM.render(
    <React.Suspense fallback={null}>
      <Test />
    </React.Suspense>,
    document.createElement("div")
  );
});
