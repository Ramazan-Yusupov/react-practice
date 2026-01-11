interface InputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export function Input({
  type,
  placeholder,
  className,
  value,
  onChange,
  name,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-gray-400 ${
        className || ""
      }`}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
}
