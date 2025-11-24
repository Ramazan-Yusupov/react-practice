interface CardProps {
  title: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function CardBlock({ title, className, children }: CardProps) {
  return (
    <div
      className={`${className} flex flex-col gap-5 border-2 p-4 rounded-2xl w-70`}
    >
      <div className="text-xl">{title}</div>
      {children}
    </div>
  );
}
