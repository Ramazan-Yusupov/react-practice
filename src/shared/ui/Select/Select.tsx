import React from "react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
};

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  disabled,
  className = "",
  name,
  placeholder,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      name={name}
      className={`
        border-2 rounded-xl p-2 z-10 bg-black text-white outline-none
        ${className}
      `}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className="border-2 bg-black rounded-xl"
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
};
