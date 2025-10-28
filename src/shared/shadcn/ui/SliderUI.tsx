import { cn } from "@/lib/utils";
import { Slider } from "@/shared/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderUI({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn(className)}
      {...props}
    />
  );
}
