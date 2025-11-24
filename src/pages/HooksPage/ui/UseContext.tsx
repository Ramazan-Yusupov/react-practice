import { CardBlock } from "./CardBlock";

interface UseContextProps {
  state: React.ReactNode;
}

export function UseContext({ state }: UseContextProps) {
  return (
    <CardBlock title={`UseContext: ${state}`}>
      <div>{state}</div>
    </CardBlock>
  );
}
