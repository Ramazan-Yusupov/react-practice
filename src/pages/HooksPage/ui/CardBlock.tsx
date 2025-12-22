interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function CardBlock({ className, children }: CardProps) {
  return (
    <div
      className={`${className} flex items-center gap-5 border-2 p-4 rounded-2xl`}
    >
      {children}
    </div>
  );
}
