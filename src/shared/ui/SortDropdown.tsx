import { useState, useRef, useEffect } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  onSort: (value: string) => void;
  currentSort: string;
  options: SortOption[];
}

export function SortDropdown({
  onSort,
  currentSort,
  options,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-xl border transition-all duration-200 ${
          currentSort !== "default"
            ? "bg-white text-black border-white"
            : "bg-gray-800/50 text-gray-400 border-gray-700 hover:text-white hover:border-gray-600"
        }`}
        title="Сортировка"
      >
        <HiOutlineAdjustmentsHorizontal size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-800 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="p-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSort(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                  currentSort === option.value
                    ? "bg-white/10 text-white font-bold"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
