import { useCount } from "@/hooks";
import { useTheme } from "@/hooks/useTheme";
import { Button, Input } from "@/shared";
import { Card } from "@/shared/ui/Cards/Card";
import { CodeBlock } from "@/shared/ui/Cards/CodeBlock";

export function Home() {
  const { increment, decrement, reset } = useCount();
  const { theme, toggleTheme } = useTheme();
  return (
    <Card border={2} maxWidth="xl">
      <CodeBlock border={3} codeTitle="Frontend" codeL="tsx" />
      <div className="flex shrink-0 gap-3 w-full justify-between">
        <Button title="Increment" onClick={increment} />
        <Button title="Reset" onClick={reset} />
        <Button title="Decrement" onClick={decrement} />
      </div>
      <Input placeholder="Enter your text here..." isCloseIcon />
      <div className="flex shrink-0 gap-3 w-full justify-between">
        <Button title="Toggle Theme" onClick={toggleTheme} />
        <span>Current Theme: {theme === "light" ? "Light" : "Dark"}</span>
      </div>
    </Card>
  );
}
