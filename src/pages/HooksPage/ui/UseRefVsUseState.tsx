import { useRef, useState } from "react";
import { CardBlock } from "./CardBlock";
import { Button } from "@/shared/ui/Button";

export function UseRefVsUseState() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const incrementState = () => setCount(count + 1);
  const decrementState = () => setCount(count - 1);

  const incrementRef = () => {
    countRef.current += 1;
    console.log("CountRef:", countRef.current);
  };
  const decrementRef = () => {
    countRef.current -= 1;
    console.log("CountRef:", countRef.current);
  };
  return (
    <CardBlock title="Count">
      <div className="flex items-center gap-2">
        <Button onClick={decrementState}>-</Button>
        <span>{count}</span>
        <Button onClick={incrementState}>+</Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="">Check Console</div>
        <Button onClick={decrementRef}>-</Button>
        <span>{countRef.current}</span>
        <Button onClick={incrementRef}>+</Button>
      </div>
    </CardBlock>
  );
}
