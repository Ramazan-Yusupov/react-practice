import { Button } from "@/shared/ui/Button";

interface CardProps {
  counter: number;
  onClick: () => void;
  onClick2: () => void;
  children: React.ReactNode;
  children2: React.ReactNode;
}

export function CardApp({
  counter,
  onClick,
  onClick2,
  children,
  children2,
}: CardProps) {
  return (
    <div className="border-2 p-3 rounded-2xl">
      <div className="flex items-center gap-5">
        <Button onClick={onClick}>{children}</Button>
        <div>Counter: {counter}</div>
        <Button onClick={onClick2}>{children2}</Button>
      </div>
    </div>
  );
}
