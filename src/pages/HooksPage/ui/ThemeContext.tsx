import { createContext } from "react";

interface Props {
  value: string;
  children: React.ReactNode;
}

const ThemeContext = createContext("light");

export const ThemeProvider = ({ children, value }: Props) => {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
