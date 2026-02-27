import { useRef } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  border?: number;
  rounded?: number;
  className?: string;
  borderColor?: string;
  isCloseIcon?: boolean;
}

const classTypeInput = "px-4 py-2 placeholder:text-gray-400 outline-none";
const classTypeRange = "w-full cursor-pointer";
const classTypeCheckbox = "w-5 h-5 cursor-pointer accent-blue-500";

export function Input({
  type = "text",
  className,
  border = 2,
  isCloseIcon,
  rounded = 10,
  borderColor = "#ffffff",
  ...props
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();

      // Trigger onChange event if provided
      if (props.onChange) {
        const event = new Event("input", { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type={type}
        className={`w-full ${
          type === "range"
            ? classTypeRange
            : type === "checkbox"
              ? classTypeCheckbox
              : classTypeInput
        } ${className || ""}`}
        style={{
          border: `${border}px solid ${borderColor}`,
          borderRadius: `${rounded}px`,
        }}
        {...props}
      />
      {isCloseIcon && type !== "checkbox" && (
        <div
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${!props.value ? "hidden" : ""}`}
        >
          <RiCloseCircleFill
            className="cursor-pointer"
            onClick={handleClearInput}
          />
        </div>
      )}
    </div>
  );
}
