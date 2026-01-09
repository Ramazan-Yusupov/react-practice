interface CodeProps {
  code: string;
  color?: "white" | "green" | "red" | "yellow";
  colorTitle?: "white" | "green" | "red" | "yellow";
  onClick?: () => void;
  children: React.ReactNode;
}

export function CodeBlock({
  code,
  onClick,
  children,
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
    <div className="flex-between">
      <div onClick={onClick} className={`${colorsTitle[colorTitle]}`}>
        {children}
      </div>
      <code className={`${colors[color]}`}>{code}</code>
    </div>
  );
}
