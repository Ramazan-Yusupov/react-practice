import { cn } from "@/lib";
import { Badge } from "../Badge/Badge";

interface CardProps {
  title?: string;
  border?: string;
  rounded?: string;
  maxWidth?: string;
  maxHeight?: string;
  className?: string;
  borderColor?: string;
  children: React.ReactNode;
}

export function Card({
  title,
  children,
  maxWidth,
  maxHeight,
  className,
  border = "0px",
  rounded = "16px",
  borderColor = "currentColor",
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
      <div
        className={cn("flex flex-col gap-4 p-5", className)}
        style={{
          border: `${border} solid ${borderColor}`,
          borderRadius: rounded,
          maxHeight: maxHeight,
        }}
      >
        {title && <Badge text={title} />}
        <div className="flex flex-col gap-4 overflow-hidden overflow-y-auto scrollHidden">
          {children}
        </div>
      </div>
    </div>
  );
}
