import { useJsHook } from "@/hooks/useJsHook";
import { Card } from "./Card";
import { CodeBlock } from "./CodeBlock";

export function JsComponent() {
  const { ...hook } = useJsHook();

  return (
    <Card className="max-w-150 h-63 *:border-b-2 *:pb-5">
      <CodeBlock code="user('Frontend', 23)">
        {hook.user("Frontend", 23)}
      </CodeBlock>
      <CodeBlock code="fnWithCallback(anotherFn)">
        {hook.fnWithCallback(hook.anotherFn)}
      </CodeBlock>
      <CodeBlock
        code="setCount(count + 1)"
        onClick={() => hook.setCount(hook.count + 1)}
      >
        Click: {hook.count}
      </CodeBlock>
      <CodeBlock code="result()">{hook.result()}</CodeBlock>
      <CodeBlock code="message()" color="red" colorTitle="red">
        {hook.message()}
      </CodeBlock>
      <CodeBlock code="checkAge(23)" color="yellow" colorTitle="yellow">
        {hook.checkAge(23)}
      </CodeBlock>
      <CodeBlock code="multiFn(23)" color="green" colorTitle="green">
        {hook.multiFn(20, 5)}, {hook.multiFn(25)}
      </CodeBlock>
      <CodeBlock code="fnWithError()" color="green" colorTitle="green">
        {hook.fnWithError()}
      </CodeBlock>
      <CodeBlock code="button{}" color="white" colorTitle="white">
        {hook.button.color}
      </CodeBlock>
      {hook.isFn || <CodeBlock code="myFn(||)">{hook.myFn()}</CodeBlock>}
      {hook.isFn && (
        <CodeBlock code="myFunction()">{hook.myFunction(false)}</CodeBlock>
      )}
    </Card>
  );
}
