import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ type = "text", className, ...props }: InputProps) {
  const classTypeInput =
    "px-4 py-2 border border-gray-300 rounded-lg placeholder:text-gray-400";
  const classTypeRange = "w-full cursor-pointer";

  return (
    <>
      <input
        type={type}
        className={`w-full ${
          type === "range" ? classTypeRange : classTypeInput
        } ${className || ""}`}
        {...props}
      />
    </>
  );
}
