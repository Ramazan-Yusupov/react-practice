import { Button } from "@/shared/ui/Button";

const e = "2 + 5 + 4";
const f = eval(e);

export const JsPage = () => {
  return (
    <div className="inline-block max-w-2xl w-full border-2 p-4 rounded-xl">
      <Button>Click me</Button>
      <div className="mt-4">Result of eval("2 + 5 + 4"): {f}</div>
    </div>
  );
};
