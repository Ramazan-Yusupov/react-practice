import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/shared/ui/Button";

export function HookPage() {
  const [theme, toggleTheme] = useTheme();
  return (
    <div className="flex flex-col gap-5">
      <Button onClick={toggleTheme}>Toggle Theme</Button>
      <div
        className={`w-100 h-52 rounded-2xl flex items-center justify-center ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        Current theme: {theme}
      </div>
    </div>
  );
}
