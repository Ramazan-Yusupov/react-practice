import { cn } from "@/lib";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { LoadingUI } from "../LoadErr/LoadingUI";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  title?: string;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "outline",
      size = "md",
      className,
      title,
      disabled,
      isLoading,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg",
      secondary: "bg-gray-300 hover:bg-gray-400 text-gray-900",
      danger: "bg-red-500 hover:bg-red-600 text-white",
      outline:
        "border-2 hover:border-white/50 border-white text-white bg-transparent",
      ghost: "hover:bg-white/10 text-white",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <LoadingUI />}
        {title || children}
      </button>
    );
  },
);
