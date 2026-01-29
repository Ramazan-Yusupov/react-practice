import React, { useRef } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isCloseIcon?: boolean;
}

const classTypeInput =
  "px-4 py-2 border-2 border-gray-300 rounded-lg placeholder:text-gray-400 outline-none";
const classTypeRange = "w-full cursor-pointer";

export function Input({
  type = "text",
  className,
  isCloseIcon,
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
          type === "range" ? classTypeRange : classTypeInput
        } ${className || ""}`}
        {...props}
      />
      {isCloseIcon && (
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
