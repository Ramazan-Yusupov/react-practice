interface CardProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export function Card({ children, className, title }: CardProps) {
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div
        className={`border-2 rounded-2xl p-5 flex flex-col gap-4 overflow-hidden overflow-y-auto scrollHidden ${
          className || ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
