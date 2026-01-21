interface CardProps {
  title?: string;
  maxWidth?: string;
  className?: string;
  children: React.ReactNode;
}

export function Card({ children, className, title, maxWidth }: CardProps) {
  const maxWidthClass: { [key: string]: string } = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className={maxWidth ? `${maxWidthClass[maxWidth]}` : ""}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div
        className={`border-2 rounded-2xl p-5 flex flex-col gap-4 overflow-hidden overflow-y-auto scrollHidden ${
          className || ""
        } `}
      >
        {children}
      </div>
    </div>
  );
}
