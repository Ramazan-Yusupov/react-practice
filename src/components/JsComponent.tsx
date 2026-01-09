import { useJsHook } from "@/hooks/useJsHook";
import { Card } from "./Card";
import { CodeBlock } from "./CodeBlock";

export function JsComponent() {
  const { ...hook } = useJsHook();

  const anotherFn = () => {
    return "Another Function";
  };

  const buttonInfo = {
    width: 200,
    text: "Buy",
  };

  const redButton = {
    color: "red",
  };

  const button = {
    ...buttonInfo,
    ...redButton,
  };

  const multiFn = (value: number, multi = 2): number => {
    return value * multi;
  };

  const isError = true;

  const fnWithError = () => {
    if (isError) {
      return "True";
    } else {
      throw new Error("Some Error");
    }
  };

  try {
    fnWithError();
  } catch (error) {
    console.error(error);
  }

  const isFn = false;

  return (
    <Card className="max-w-150 h-63 *:border-b-2 *:pb-5">
      <CodeBlock code="user('Frontend', 23)">
        {hook.user("Frontend", 23)}
      </CodeBlock>
      <CodeBlock code="fnWithCallback(anotherFn)">
        {hook.fnWithCallback(anotherFn)}
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
        {multiFn(20, 5)}, {multiFn(25)}
      </CodeBlock>
      <CodeBlock code="fnWithError()" color="green" colorTitle="green">
        {fnWithError()}
      </CodeBlock>
      <CodeBlock code="button{}" color="white" colorTitle="white">
        {button.color}
      </CodeBlock>
      {isFn || <CodeBlock code="myFn(||)">{hook.myFn()}</CodeBlock>}
      {isFn && (
        <CodeBlock code="myFunction()">{hook.myFunction(false)}</CodeBlock>
      )}
    </Card>
  );
}
