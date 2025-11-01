import { useStoreApp } from "@/store/useStoreApp";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CardApp } from "./ui/CardApp";

export function Application() {
  const { counter, increment, decrement } = useStoreApp();
  return (
    <div className="inline-flex flex-col gap-5">
      <CardApp
        counter={counter}
        onClick={decrement}
        onClick2={increment}
        children={<AiOutlineMinus />}
        children2={<AiOutlinePlus />}
      />
    </div>
  );
}
