interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`border-2 rounded-2xl p-5 flex flex-col gap-4 overflow-hidden overflow-y-auto scrollHidden ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}
