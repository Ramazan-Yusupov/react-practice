import { FaTrash } from "react-icons/fa6";
import { IconButton } from "../Buttons/IconButton";

interface CodeProps {
  border?: string;
  borderC?: string;
  rounded?: string;
  onClick?: () => void;
  onDelete?: () => void;
  codeL?: React.ReactNode;
  codeR?: React.ReactNode;
  codeTitle: React.ReactNode;
  type?: "button" | "submit" | "reset";
  colorL?: "white" | "green" | "red" | "yellow";
  colorR?: "white" | "green" | "red" | "yellow";
  colorTitle?: "white" | "green" | "red" | "yellow";
}

export function CodeBlock({
  codeL,
  codeR,
  onClick,
  onDelete,
  codeTitle,
  border = "0px",
  rounded = "16px",
  type = "button",
  colorL = "green",
  colorR = "green",
  colorTitle = "white",
  borderC = "currentColor",
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

  return onClick ? (
    <button
      type={type}
      onClick={onClick}
      className={`flex-between gap-10 p-3`}
      style={{
        border: `${border}px solid ${borderC}`,
        borderRadius: rounded,
      }}
    >
      <div className={`${colorsTitle[colorTitle]}`}>{codeTitle}</div>
      <div className="flex gap-3">
        {codeL && <code className={`${colorsL[colorL]}`}>{codeL}</code>}
        {codeR && <code className={`${colorsR[colorR]}`}>{codeR}</code>}
      </div>
    </button>
  ) : (
    <div
      className={`flex-between gap-10 p-3`}
      style={{
        border: `${border} solid ${borderC}`,
        borderRadius: rounded,
      }}
    >
      <div className={`${colorsTitle[colorTitle]}`}>{codeTitle}</div>

      <div className="flex gap-3">
        {codeL && <code className={`${colorsL[colorL]}`}>{codeL}</code>}
        {codeR && <code className={`${colorsR[colorR]}`}>{codeR}</code>}

        {onDelete && (
          <IconButton
            onClick={onDelete}
            icon={<FaTrash size={13} color="red" />}
          />
        )}
      </div>
    </div>
  );
}
