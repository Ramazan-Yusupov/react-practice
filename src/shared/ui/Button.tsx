interface ButtonProps {
  title?: string;
  maxWidth?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  title,
  active,
  onClick,
  maxWidth,
  children,
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  const baseStyles = "font-semibold rounded-lg transition-colors";

  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-300 hover:bg-gray-400 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const activeButtonStyles = active ? "bg-green-500 hover:bg-green-600" : "";

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${activeButtonStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      style={{
        maxWidth: maxWidth,
      }}
    >
      {title}
      {children}
    </button>
  );
}
