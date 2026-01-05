import { Sidebar } from "@/widget/sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div>
      <Sidebar />
      <main className="pl-30 pt-10">{children}</main>
    </div>
  );
}
