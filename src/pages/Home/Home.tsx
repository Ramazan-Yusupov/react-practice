import { Card } from "@/components/Card";
import { CodeBlock } from "@/components/CodeBlock";
import {
  decrement,
  increment,
  incrementByAmount,
} from "@/features/Counter/counter";
import { Button } from "@/shared/ui/Button";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <Card
        avatar
        isOnline
        isErrorOnOff
        maxWidth="xl"
        title="Frontend"
        maxHeight={636}
      >
        <Button variant="primary" onClick={() => dispatch(increment())}>
          Increment +
        </Button>
        <Button variant="primary" onClick={() => dispatch(decrement())}>
          Decrement -
        </Button>
        <Button
          variant="primary"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Increment +5
        </Button>
        <CodeBlock
          isBordered
          codeTitle="Frontend"
          codeL={count}
          codeR={count * 2}
        />
      </Card>
    </div>
  );
}
