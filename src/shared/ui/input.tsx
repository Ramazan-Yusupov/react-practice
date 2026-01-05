interface InputProps {
  type?: string;
  placeholder?: string;
  className?: string;
}

export function Input({ type, placeholder, className }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-gray-400 ${
        className || ""
      }`}
    />
  );
}
