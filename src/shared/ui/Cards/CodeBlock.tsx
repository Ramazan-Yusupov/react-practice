import { FaTrash } from "react-icons/fa6";
import { Button } from "../Buttons/Button";

type CodeBlockColor = "white" | "green" | "red" | "yellow";
type ButtonType = "button" | "submit" | "reset";

interface CodeProps {
  border?: string;
  rounded?: string;
  borderColor?: string;
  onEdit?: () => void;
  onClick?: () => void;
  onDelete?: () => void;
  type?: ButtonType;
  title: React.ReactNode;
  codeL?: React.ReactNode;
  codeR?: React.ReactNode;
  colorL?: CodeBlockColor;
  colorR?: CodeBlockColor;
  colorTitle?: CodeBlockColor;
}

const colorClasses: Record<CodeBlockColor, string> = {
  red: "text-red-300",
  white: "text-white",
  green: "text-green-300",
  yellow: "text-yellow-300",
};

const formatNumber = (value: number) => value.toLocaleString("en-US");

const renderCodeValue = (value?: React.ReactNode) => {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return formatNumber(value);
  return value;
};

export function CodeBlock({
  title,
  codeL,
  codeR,
  onEdit,
  onClick,
  onDelete,
  border = "2px",
  rounded = "16px",
  colorL = "green",
  colorR = "green",
  colorTitle = "white",
  borderColor = "currentColor",
}: CodeProps) {
  const leftValue = renderCodeValue(codeL);
  const rightValue = renderCodeValue(codeR);
  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      className={`flex-between gap-10 p-3 ${isClickable ? "cursor-pointer outline-none" : ""}`}
      style={{
        border: `${border} solid ${borderColor}`,
        borderRadius: rounded,
      }}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      <div className={colorClasses[colorTitle]}>{title}</div>

      <div className="flex items-center gap-3">
        {leftValue !== null && (
          <code className={`${colorClasses[colorL]} flex-center`}>
            {leftValue}
          </code>
        )}
        {rightValue !== null && (
          <code className={`${colorClasses[colorR]} flex-center`}>
            {rightValue}
          </code>
        )}

        {onDelete && (
          <Button
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            size="md"
            variant="danger"
            icon={<FaTrash />}
          />
        )}

        {onEdit && (
          <Button
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
            size="sm"
            variant="secondary"
            title="Edit"
          />
        )}
      </div>
    </div>
  );
}
