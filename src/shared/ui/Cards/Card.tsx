import { cn } from "@/lib";
import { Button } from "../Buttons/Button";
import { Input } from "../Inputs/Input";

interface CardProps {
  title?: string;
  value?: string;
  border?: string;
  rounded?: string;
  isInput?: boolean;
  isBtnAdd?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  className?: string;
  borderColor?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Card({
  title,
  value,
  onClick,
  children,
  maxWidth,
  onChange,
  maxHeight,
  className,
  border = "0px",
  rounded = "16px",
  isInput = false,
  isBtnAdd = false,
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
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <div
        className={cn("flex flex-col gap-4 p-5", className)}
        style={{
          border: `${border} solid ${borderColor}`,
          borderRadius: rounded,
          maxHeight: maxHeight,
        }}
      >
        {(isInput || isBtnAdd) && (
          <div className="flex justify-end gap-2 sticky z-10 bg-black">
            {isInput && (
              <div className="w-full">
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder="Search..."
                />
              </div>
            )}
            {isBtnAdd && <Button title="Add" onClick={onClick} />}
          </div>
        )}
        <div className="flex flex-col gap-4 overflow-hidden overflow-y-auto scrollHidden">
          {children}
        </div>
      </div>
    </div>
  );
}
