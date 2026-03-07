import {
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";

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

const STORAGE_KEY = "counter_value";

// Безопасное чтение из localStorage
const getStoredCount = (): number => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : 0;
  } catch {
    return 0;
  }
};

export const CountProvider = ({ children }: CountProviderProps) => {
  const [count, setCount] = useState<number>(getStoredCount);

  // Сохраняем в localStorage при изменении count
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(count));
    } catch (error) {
      console.warn("localStorage недоступен:", error);
    }
  }, [count]);

  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  const decrement = useCallback(() => setCount((prev) => prev - 1), []);
  const reset = useCallback(() => setCount(0), []);

  const value = useMemo(
    () => ({ count, increment, decrement, reset }),
    [count, increment, decrement, reset],
  );

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
};

export { CountContext };
