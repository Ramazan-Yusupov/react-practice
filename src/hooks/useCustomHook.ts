import { useState } from "react";

export function useCustomHook() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  const handleReset = () => {
    setCount(0);
  };
  return {
    count,
    handleReset,
    handleIncrement,
    handleDecrement,
  };
}
