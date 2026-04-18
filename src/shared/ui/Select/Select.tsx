import { cn } from "@/lib";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
  label?: string;
}

export const Select = ({
  options,
  placeholder,
  label,
  className,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm text-gray-400 font-medium">{label}</label>
      )}
      <div className="relative">
        <select
          className={cn(
            "w-full appearance-none bg-black/50 border border-white/10 text-white",
            "rounded-xl px-4 py-2.5 pr-8 outline-none",
            "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            "transition-colors cursor-pointer",
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className="bg-gray-900 text-white"
            >
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          ▼
        </div>
      </div>
    </div>
  );
};
