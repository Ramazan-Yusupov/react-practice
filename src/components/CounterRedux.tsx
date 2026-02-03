import { Button } from "@/shared/ui/Button";
import { CodeBlock } from "../shared/ui/CodeBlock";
import {
  increment,
  decrement,
  selectCounter,
  type CounterId,
} from "@/store/counterSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useCounterReduce";

export function CounterRedux({
  title,
  counterId,
}: {
  title?: string;
  counterId: CounterId;
}) {
  const dispatch = useAppDispatch();
  const counterState = useAppSelector((state) =>
    selectCounter(state, counterId),
  );

  return (
    <>
      <CodeBlock
        isBordered
        codeTitle={title || "Counter"}
        codeL="Count:"
        codeR={counterState?.counter ?? "0"}
      />
      <div className="flex-between">
        <Button
          title="Decrement"
          onClick={() => dispatch(decrement({ counterId }))}
        />
        <Button
          title="Increment"
          onClick={() => dispatch(increment({ counterId }))}
        />
      </div>
    </>
  );
}
