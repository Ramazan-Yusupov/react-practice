import { Sidebar } from "@/Folders/widget/sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div>
      <Sidebar />
      <main className="pl-30 pe-20 pt-10 pb-10">{children}</main>
    </div>
  );
}
