import { cn } from "@/lib";

interface IconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function IconButton({
  icon,
  onClick,
  className,
  type = "button",
  disabled = false,
  ...rest
}: IconProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        " rounded-xl bg-gray-800 flex-i-j-center w-fit px-5 h-10",
        className,
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:bg-gray-700 cursor-pointer",
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
