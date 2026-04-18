import { cn } from "@/lib";
import { type InputHTMLAttributes, forwardRef } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface CustomInputProps {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  onClear?: () => void;
}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>, CustomInputProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      iconLeft,
      iconRight,
      error,
      onClear,
      onChange,
      value,
      ...props
    },
    ref,
  ) => {
    const hasValue =
      value !== undefined && value !== null && String(value).length > 0;

    const isClearable =
      !!onClear && hasValue && type !== "checkbox" && type !== "range";

    return (
      <div className="relative w-full group">
        <div className="relative flex items-center w-full">
          {iconLeft && (
            <span className="absolute left-3 text-gray-400 pointer-events-none z-10">
              {iconLeft}
            </span>
          )}

          <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            {...props}
            className={cn(
              "w-full bg-transparent text-white placeholder:text-gray-500 outline-none transition-all",
              "border-2 rounded-xl px-4 py-2.5",
              "focus:border-slate-500 focus:ring-2 focus:ring-blue-500/20",
              error
                ? "border-red-500 focus:ring-red-500/20"
                : "border-white/10",
              iconLeft && "pl-10",
              (iconRight || isClearable) && "pr-10",
              type === "range" && "p-0 h-2 accent-slate-500",
              type === "checkbox" && "w-5 h-5 accent-slate-500 cursor-pointer",
              className,
            )}
          />

          {isClearable && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 text-gray-400 hover:text-white transition-colors z-10"
              aria-label="Clear input"
            >
              <RiCloseCircleFill size={18} />
            </button>
          )}

          {!isClearable && iconRight && (
            <span className="absolute right-3 text-gray-400 z-10">
              {iconRight}
            </span>
          )}
        </div>
        {error && (
          <span className="text-xs text-red-400 mt-1 ml-1 block">{error}</span>
        )}
      </div>
    );
  },
);
