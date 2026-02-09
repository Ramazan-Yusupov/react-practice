interface TitleProps {
  title?: string;
  className?: string;
  text?: React.ReactNode;
  align?: "left" | "center" | "right";
}

export function Title({ text, title, className, align = "left" }: TitleProps) {
  return (
    <div className={`${className} text-${align}`}>
      <div>{text}</div>
      <div className="font-bold text-2xl">{title}</div>
    </div>
  );
}
