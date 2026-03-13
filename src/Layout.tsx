import { Header } from "./widgets";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="px-10 pt-20">{children}</div>
    </div>
  );
}
