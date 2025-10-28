import { ItemUI } from "@/shared/shadcn/ui/ItemUI";
import { SliderUI } from "@/shared/shadcn/ui/SliderUI";

export function CustomPage() {
  return (
    <div className="max-w-3xl flex flex-col gap-10">
      <SliderUI />
      <ItemUI />
    </div>
  );
}
