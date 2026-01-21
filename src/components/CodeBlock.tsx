interface CodeProps {
  onClick?: () => void;
  isBordered?: boolean;
  code?: React.ReactNode;
  codeTitle: React.ReactNode;
  color?: "white" | "green" | "red" | "yellow";
  colorTitle?: "white" | "green" | "red" | "yellow";
}

export function CodeBlock({
  code,
  onClick,
  codeTitle,
  isBordered,
  color = "green",
  colorTitle = "white",
}: CodeProps) {
  const colors = {
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
      className={`flex-between gap-10 ${isBordered ? "border-2 rounded-2xl p-3" : ""}`}
    >
      <div onClick={onClick} className={`${colorsTitle[colorTitle]}`}>
        {codeTitle}
      </div>
      <code className={`${colors[color]}`}>{code}</code>
    </div>
  );
}
