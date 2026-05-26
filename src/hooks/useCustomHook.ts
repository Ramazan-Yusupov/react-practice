import { useEffect, useState } from "react";

export function useCustomHook() {
  const [value, setValue] = useState<string>("");
  const [timer, setTimer] = useState(0);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timerFn = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerFn);
    };
  }, []);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };
  const handleReset = () => {
    setCount(0);
  };

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    value,
    count,
    timer,
    isOpen,
    setValue,
    handleReset,
    handleDecrement,
    handleIncrement,
    handleIsOpen,
  };
}
