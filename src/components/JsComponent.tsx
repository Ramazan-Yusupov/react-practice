import { useJsHook } from "@/hooks/useJsHook";
import { Card } from "./Card";
import { CodeBlock } from "./CodeBlock";

export function JsComponent() {
  const { ...hook } = useJsHook();

  const anotherFn = () => {
    return "Another Function";
  };

  return (
    <Card className="max-w-150 *:border-b-2 *:pb-5">
      <CodeBlock code="user('Frontend', 23)">
        {hook.user("Frontend", 23)}
      </CodeBlock>
      <CodeBlock code="message()" color="red" colorTitle="red">
        {hook.message()}
      </CodeBlock>
      <CodeBlock code="checkAge(23)" color="yellow" colorTitle="yellow">
        {hook.checkAge(23)}
      </CodeBlock>
      <CodeBlock
        code="setCount(count + 1)"
        onClick={() => hook.setCount(hook.count + 1)}
      >
        Click: {hook.count}
      </CodeBlock>
      <CodeBlock code="result()">{hook.result()}</CodeBlock>
      <CodeBlock code="fnWithCallback(anotherFn)">
        {hook.fnWithCallback(anotherFn)}
      </CodeBlock>
      <CodeBlock code="myFn()">{hook.myFn()}</CodeBlock>
      <CodeBlock code="myFunction()">{hook.myFunction(false)}</CodeBlock>
    </Card>
  );
}
