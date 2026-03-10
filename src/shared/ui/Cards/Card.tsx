interface CardProps {
  title?: string;
  border?: string;
  borderColor?: string;
  rounded?: string;
  maxWidth?: string;
  maxHeight?: string;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  title,
  borderColor = "currentColor",
  border = "0px",
  rounded = "16px",
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
          border: `${border} solid ${borderColor}`,
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
