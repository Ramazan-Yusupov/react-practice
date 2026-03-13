import { cn } from "@/lib";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  children: React.ReactNode;
}

export function Form({ className, children }: FormProps) {
  return (
    <form
      className={cn(
        "space-y-4 border border-white/10 p-4 text-white rounded-xl",
        className,
      )}
    >
      {children}
    </form>
  );
}
