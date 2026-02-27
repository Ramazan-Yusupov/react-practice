interface CardProps {
  title?: string;
  border?: number;
  borderC?: string;
  rounded?: number;
  maxWidth?: string;
  maxHeight?: number;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  title,
  borderC = "currentColor",
  border = 0,
  rounded = 16,
  children,
  maxWidth,
  maxHeight,
  className,
}: CardProps) {
  const maxWidthClass: { [key: string]: string } = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className={`${maxWidth ? `${maxWidthClass[maxWidth]}` : ""}`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div
        className={`p-5 flex flex-col gap-4 ${className || ""}`}
        style={{
          border: `${border}px solid ${borderC}`,
          borderRadius: rounded,
          maxHeight: maxHeight,
        }}
      >
        <div className="flex flex-col gap-4 overflow-hidden overflow-y-auto scrollHidden">
          {children}
        </div>
      </div>
    </div>
  );
}
