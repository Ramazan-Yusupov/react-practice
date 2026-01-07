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

  return {
    myFn,
    user,
    count,
    result,
    message,
    setCount,
    checkAge,
    myFunction,
    fnWithCallback,
  };
}
