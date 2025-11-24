import { Input } from "@/shared/ui/input";
import { CardBlock } from "./CardBlock";
import { useEffect, useRef, useState } from "react";

export function UseRef() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <CardBlock title={`InputValueUseRef: ${inputValue} `}>
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </CardBlock>
  );
}
