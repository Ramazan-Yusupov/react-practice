import { useEffect, useLayoutEffect, useState } from "react";
import { CardBlock } from "./CardBlock";

export function UseLayoutEffect() {
  const [effectValue, setEffectValue] = useState("initial");
  const [layoutEffectValue, setLayoutEffectValue] = useState("initial");

  useEffect(() => {
    setEffectValue("updated");
  }, []);

  useLayoutEffect(() => {
    setLayoutEffectValue("updated");
  }, []);

  return (
    <CardBlock title="UseLayoutEffect">
      <div>Effect Value: {effectValue}</div>
      <div>Layout Effect Value: {layoutEffectValue}</div>
    </CardBlock>
  );
}
