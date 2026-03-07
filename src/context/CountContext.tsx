import { createContext, useMemo, useState } from "react";

interface CountProps {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  count: number;
}

interface CountProviderProps {
  children: React.ReactNode;
}

const CountContext = createContext<CountProps | undefined>(undefined);

export const CountProvider = ({ children }: CountProviderProps) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  const value = useMemo(
    () => ({ count, increment, decrement, reset }),
    [count],
  );

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
};

export { CountContext };
