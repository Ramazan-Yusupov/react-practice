import React from "react";

interface InputProps {
  name?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type = "text",
  name,
  value,
  onChange,
  className,
  placeholder,
}: InputProps) {
  const classTypeInput =
    "px-4 py-2 border border-gray-300 rounded-lg placeholder:text-gray-400";
  const classTypeRange = "w-full cursor-pointer";

  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${
          type === "range" ? classTypeRange : classTypeInput
        } ${className || ""}`}
      />
    </>
  );
}
