import { Card } from "@/components/Card";

export function Tailwind() {
  return (
    <div className="flex flex-col gap-8">
      <Card className="max-w-125">
        <span className="inline-grid grid-cols-3 gap-4 *:bg-blue-600 *:text-white *:p-4 *:rounded-lg *:text-center">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
          <span>05</span>
          <span>06</span>
        </span>
        <span className="inline-grid grid-cols-3 gap-4 *:bg-blue-600 *:text-white *:p-4 *:rounded-lg *:text-center">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
          <span>05</span>
          <span>06</span>
        </span>
      </Card>
    </div>
  );
}
