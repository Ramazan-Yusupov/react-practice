import { useState } from "react";

export function useJsHook() {
  const [count, setCount] = useState(0);

  const user = (n: string, a: number) => {
    const name = n;
    const age = a;
    const nameAge = name + " " + age;

    return nameAge;
  };

  const message = (m?: string) => {
    m = m || "unknown";
    return m;
  };

  const checkAge = (age: number) => {
    if (age >= 18) {
      return "Access Received";
    } else {
      return "Access Denied";
    }
  };

  const result = () => {
    const isBool = true;
    if (isBool) {
      return "True";
    } else {
      return "False";
    }
  };

  const fnWithCallback = (callbackFn: () => void) => {
    callbackFn();
    return "Callback executed";
  };

  const name = "MyName";

  // Global function
  const myFn = () => {
    // Local function
    const innerFn = () => {
      return name;
    };
    return innerFn();
  };

  const myFunction = (a: boolean) => {
    a = true;
    const b = a === true ? "Yes" : "No";

    return b;
  };

  const anotherFn = () => {
    return "Another Function";
  };

  const buttonInfo = {
    width: 200,
    text: "Buy",
  };

  const redButton = {
    color: "red",
  };

  const button = {
    ...buttonInfo,
    ...redButton,
  };

  const multiFn = (value: number, multi = 2): number => {
    return value * multi;
  };

  const isError = true;

  const fnWithError = () => {
    if (isError) {
      return "True";
    } else {
      throw new Error("Some Error");
    }
  };

  try {
    fnWithError();
  } catch (error) {
    console.error(error);
  }

  const isFn = false;

  return {
    myFn,
    user,
    isFn,
    count,
    button,
    result,
    multiFn,
    message,
    setCount,
    checkAge,
    anotherFn,
    myFunction,
    fnWithError,
    fnWithCallback,
  };
}
