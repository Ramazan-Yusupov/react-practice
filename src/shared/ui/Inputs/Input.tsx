import { cn } from "@/lib";
import { useRef, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  border?: number;
  rounded?: number;
  className?: string;
  borderColor?: string;
  isCloseIcon?: boolean;
  onClear?: () => void;
}

const classTypeInput = "px-4 py-2 placeholder:text-gray-400 outline-none";
const classTypeRange = "w-full cursor-pointer";
const classTypeCheckbox = "w-5 h-5 cursor-pointer accent-blue-500";

export function Input({
  type = "text",
  className,
  border = 2,
  rounded = 10,
  borderColor = "#ffffff",
  isCloseIcon = false,
  onClear,
  onChange,
  value,
  defaultValue,
  ...props
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    String(defaultValue ?? ""),
  );

  const currentValue = isControlled ? String(value ?? "") : uncontrolledValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(event.target.value);
    }

    onChange?.(event);
  };

  const handleClear = () => {
    if (isControlled) {
      onClear?.();
      inputRef.current?.focus();
      return;
    }

    setUncontrolledValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    onClear?.();
  };

  const inputClassName =
    type === "range"
      ? classTypeRange
      : type === "checkbox"
        ? classTypeCheckbox
        : classTypeInput;

  return (
    <div className="relative w-full">
      <input
        {...props}
        ref={inputRef}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={cn("w-full", inputClassName, className)}
        style={{
          border: `${border}px solid ${borderColor}`,
          borderRadius: `${rounded}px`,
        }}
      />

      {isCloseIcon && type !== "checkbox" && currentValue.length > 0 && (
        <button
          type="button"
          aria-label="Clear input"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <RiCloseCircleFill className="cursor-pointer" />
        </button>
      )}
    </div>
  );
}
