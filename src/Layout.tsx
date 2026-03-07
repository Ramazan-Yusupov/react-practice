import { CountProvider } from "./context";
import { Header } from "./widgets";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CountProvider>
        <Header />
        <div className="px-10 pt-15">{children}</div>
      </CountProvider>
    </div>
  );
}
