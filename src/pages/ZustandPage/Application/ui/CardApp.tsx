interface CardProps {
  children: React.ReactNode;
}

export function CardApp({ children }: CardProps) {
  return (
    <div className="border-2 p-3 rounded-2xl">
      <div className="">{children}</div>
    </div>
  );
}
