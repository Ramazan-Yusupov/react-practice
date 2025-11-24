import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/input";
import { useState } from "react";
import { CardBlock } from "./CardBlock";

export function UseStatePage() {
  const [count, setCount] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <div className="grid grid-cols-4 w-7xl gap-5">
      <CardBlock title="Count">
        <div className="flex items-center gap-2">
          <Button onClick={() => setCount(count - 1)}>-</Button>
          <span>{count}</span>
          <Button onClick={() => setCount(count + 1)}>+</Button>
        </div>
      </CardBlock>

      <CardBlock title={`InputValue: ${inputValue} `}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </CardBlock>

      <CardBlock title="True/False">
        <div className="flex items-center gap-2">
          <Button onClick={() => setToggle(!toggle)}>Toggle</Button>
          <span>{toggle ? "True" : "False"}</span>
        </div>
      </CardBlock>

      <CardBlock title="Hide/Show">
        <div className="flex items-center gap-2">
          <Button onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </Button>
          <span>{show && "Show"}</span>
        </div>
      </CardBlock>
    </div>
  );
}
