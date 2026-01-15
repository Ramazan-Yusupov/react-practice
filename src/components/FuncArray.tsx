import { useJsHook } from "@/hooks/useJsHook";
import { Card } from "./Card";
import { CodeBlock } from "./CodeBlock";
import { useArrHook } from "@/hooks/useArrayHook";

export function FuncArray() {
  const { ...hook } = useJsHook();
  const { ...hookArr } = useArrHook();

  return (
    <div className="flex flex-col gap-5">
      {/* Function */}
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
      {/* Array */}
      <Card className="max-w-150 h-63 *:border-b-2 *:pb-5">
        <CodeBlock code="myArray[]" color="yellow">
          <p>[{hookArr.myArray.join(", ")}]</p>
          <p>[{hookArr.myArray[0]}]</p>
          <p>[{hookArr.myArray[1]}]</p>
          <p>[{hookArr.myArray[2]}]</p>
          <p>[{hookArr.myArray[3]}]</p>
          <p>[{hookArr.myArray[4] ? "True" : "False"}]</p>
        </CodeBlock>
        <CodeBlock code="arr[]" color="yellow">
          {hookArr.arr ? "True" : "False"}
        </CodeBlock>
        <CodeBlock code="arr2[]" color="yellow">
          {hookArr.arr2 ? "True" : "False"}
        </CodeBlock>
        <CodeBlock code="arrayLength[]" color="yellow">
          {hookArr.arrayLength}
        </CodeBlock>
        <CodeBlock code="arrPush[]" color="yellow">
          [{hookArr.arrPush.join(", ")}]
        </CodeBlock>
        <CodeBlock code="arrPop[] / removedElementPop" color="yellow">
          [{hookArr.arrPop}], {hookArr.removedElementPop}
        </CodeBlock>
        <CodeBlock code="arrUnshift[]" color="yellow">
          [{hookArr.arrUnshift.join(", ")}]
        </CodeBlock>
        <CodeBlock code="arrShift[] / removedElementShift" color="yellow">
          [{hookArr.arrShift}], {hookArr.removedElementShift}
        </CodeBlock>
        <CodeBlock code="arrForEach[]" color="yellow">
          [{hookArr.arrForEach.join(", ")}]
        </CodeBlock>
        <CodeBlock code="arrFeStrRes[]" color="yellow">
          [{hookArr.arrFeStrRes.join(", ")}]
        </CodeBlock>
        <CodeBlock code="mappedArray[] / mapArrPush[]" color="yellow">
          [{hookArr.mappedArray.join(", ")}]
        </CodeBlock>
        <CodeBlock code="arrSplice[]" color="yellow">
          [{hookArr.arrSplice.join(", ")}]
        </CodeBlock>
        <CodeBlock code="arrSliceRes[]" color="yellow">
          [{hookArr.arrSliceRes.join(", ")}]
        </CodeBlock>
        <CodeBlock code="arrConcatRes[]" color="yellow">
          [{hookArr.arrConcatRes.join(", ")}]
        </CodeBlock>
        <CodeBlock code="arrIndexOf[]" color="yellow">
          [{hookArr.arrIndexOf}]
        </CodeBlock>
        <CodeBlock code="arrInclude[]" color="yellow">
          [{hookArr.arrInclude && "true"}]
        </CodeBlock>
        <CodeBlock code="arrFind[]" color="yellow">
          [{hookArr.arrFind?.name}]
        </CodeBlock>
        <CodeBlock code="arrFindIndex[]" color="yellow">
          [{hookArr.arrFindIndex}]
        </CodeBlock>
        <CodeBlock code="arrFilter[]" color="yellow">
          [{hookArr.arrFilter.length}], [
          {hookArr.soldiers.map((s) => s.name).join(", ")}]
        </CodeBlock>
        <CodeBlock code="mappedArrayObj[]" color="yellow">
          [{hookArr.mappedArrayObj.join(", ")}]
        </CodeBlock>
        <CodeBlock code="arrSort[]" color="yellow">
          [{hookArr.arrSort.join(", ")}]
        </CodeBlock>
        <CodeBlock code="arrReverse[] / arrReverse2[]" color="yellow">
          [{hookArr.arrReverse.join(", ")}], [{hookArr.arrReverse2.join(", ")}]
        </CodeBlock>
        <CodeBlock code="arrSplit[] / arrSplitStr[]" color="yellow">
          [{hookArr.arrSplit}], [{hookArr.arrSplitStr}]
        </CodeBlock>
        <CodeBlock code="arrJoin[]" color="yellow">
          [{hookArr.arrJoin}]
        </CodeBlock>
        <CodeBlock code="resultReduce[] / resultReduceRight[]" color="yellow">
          [{hookArr.resultReduce}], [{hookArr.resultReduceRight}]
        </CodeBlock>
        <CodeBlock code="arrIsArray[] / arrIsArray2[]" color="yellow">
          [{hookArr.arrIsArray ? "true" : "false"}], [
          {hookArr.arrIsArray2 ? "true" : "false"}]
        </CodeBlock>
      </Card>
    </div>
  );
}
