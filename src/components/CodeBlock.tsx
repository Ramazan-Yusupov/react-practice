import { IconButton } from "@/shared/ui/Iconbutton";
import { FaTrash } from "react-icons/fa6";

interface CodeProps {
  onClick?: () => void;
  onDelete?: () => void;
  isBordered?: boolean;
  codeL?: React.ReactNode;
  codeR?: React.ReactNode;
  codeTitle: React.ReactNode;
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
  isBordered,
  colorL = "green",
  colorR = "green",
  colorTitle = "white",
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
      onClick={onClick}
      className={`flex-between gap-10 ${isBordered ? "border-2 rounded-2xl p-3" : ""}`}
    >
      <div className={`${colorsTitle[colorTitle]}`}>{codeTitle}</div>
      <div className="flex gap-3">
        {codeL && <code className={`${colorsL[colorL]}`}>{codeL}</code>}
        {codeR && <code className={`${colorsR[colorR]}`}>{codeR}</code>}
      </div>
    </button>
  ) : (
    <div
      className={`flex-between gap-10 ${isBordered ? "border-2 rounded-2xl p-3" : ""}`}
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
