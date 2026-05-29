import { FaTrash } from "react-icons/fa6";
import { Button } from "../Buttons/Button";

interface CodeProps {
  border?: string;
  rounded?: string;
  borderColor?: string;
  onEdit?: () => void;
  onClick?: () => void;
  onDelete?: () => void;
  title: React.ReactNode;
  codeL?: React.ReactNode;
  codeR?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  colorL?: "white" | "green" | "red" | "yellow";
  colorR?: "white" | "green" | "red" | "yellow";
  colorTitle?: "white" | "green" | "red" | "yellow";
}

export function CodeBlock({
  codeL,
  codeR,
  onEdit,
  onClick,
  onDelete,
  title,
  border = "0px",
  rounded = "16px",
  colorL = "green",
  colorR = "green",
  colorTitle = "white",
  borderColor = "currentColor",
}: CodeProps) {
  const colorsL = {
    red: "text-red-300",
    white: "text-white",
    green: "text-green-300",
    yellow: "text-yellow-300",
  };

  const colorsR = {
    red: "text-red-300",
    white: "text-white",
    green: "text-green-300",
    yellow: "text-yellow-300",
  };

  const colorsTitle = {
    red: "text-red-300",
    white: "text-white",
    green: "text-green-300",
    yellow: "text-yellow-300",
  };

  return (
    <div
      onClick={onClick}
      className={`flex-between gap-10 p-3 ${onClick ? "cursor-pointer outline-none" : ""}`}
      style={{
        border: `${border} solid ${borderColor}`,
        borderRadius: rounded,
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className={colorsTitle[colorTitle]}>{title}</div>

      <div className="flex items-center gap-3">
        {codeL && (
          <code className={`${colorsL[colorL]} flex-center`}>{codeL}</code>
        )}
        {codeR && (
          <code className={`${colorsR[colorR]} flex-center`}>{codeR}</code>
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
