import { CodeBlock } from "@/shared/ui/CodeBlock";

// type Any = any;
// type Never = never;

type Void = void;
type Bool = boolean;
type Identify<T> = T;
type String = string;
type Number = number;
type Pair<T> = [T, T];
type Unknown = unknown;
type Or = string | number;
type And = string & number;
type Undefined = undefined;
type Box<T> = { value: T };
type ArrTypes = [boolean, string, number];
type KeyValue<K, V> = { key: K; value: V };
type keyOf = keyof { a: string; b: number };
type MappedType<T> = { [K in keyof T]: T[K] };
type MappedType2 = { [K in "x" | "y"]: string };
type ObjValues = { [key: string]: string | number };
type Direction = "top" | "right" | "bottom" | "left";
type ExtendsString<T> = T extends string ? "Yes" : "No";

// const neverValue: Never = (() => {
//   throw new Error("This value can never be assigned");
// })();
// const anyValue: Any = ["string", 42, { key: "value" }];

const isOnline: Bool = true;
const maxWidth: Number = 400;
const typeOfStr = "Frontend";
const keyOfValue: keyOf = "a";
const pair: Pair<number> = [1, 2];
const voidValue: Void = undefined;
const direction: Direction = "top";
const str: String = "Hello, TypeScript!";
const andValue: And = "Impossible" as And;
const undefinedValue: Undefined = undefined;
const asConst = ["first", "second"] as const;
const arrTypes: ArrTypes = [true, "Hello", 42];
const extendsString: ExtendsString<number> = "No";
const objV: ObjValues = { key1: "value1", key2: 42 };
const orValue: Or = "This can be a string or a number";
const box: Box<string> = { value: "This is a boxed string" };
const mappedTypeValue: MappedType<{ a: string; b: number }> = {
  a: "Mapped String",
  b: 123,
};
const keyValue: KeyValue<string, number> = { key: "key1", value: 42 };
const mappedTypeValue2: MappedType2 = { x: "Mapped X", y: "Mapped Y" };
const identifyValue: Identify<string> = "This is an identified string";
const unknown: Unknown = "This can be any type, but we don't know it yet.";

export function TypeScriptTypes() {
  return (
    <>
      {/* <CodeBlock isBordered codeR={neverValue} codeTitle="Never Value" /> */}
      {/* <CodeBlock isBordered codeR={anyValue[0]} codeTitle="Any Value" /> */}

      <CodeBlock isBordered codeR={orValue} codeTitle="Or Value" />
      <CodeBlock isBordered codeR={str} codeTitle="String Value" />
      <CodeBlock isBordered codeR={andValue} codeTitle="And Value" />
      <CodeBlock isBordered codeR={box.value} codeTitle="Box Value" />
      <CodeBlock isBordered codeR={keyValue.key} codeTitle="Key Value" />
      <CodeBlock isBordered codeR={keyOfValue} codeTitle="KeyOf Value" />
      <CodeBlock isBordered codeR={pair[0]} codeTitle="Pair First Value" />
      <CodeBlock isBordered codeR={pair[1]} codeTitle="Pair Second Value" />
      <CodeBlock isBordered codeR={direction} codeTitle="Direction Value" />
      <CodeBlock isBordered codeR={keyValue.value} codeTitle="Value Value" />
      <CodeBlock isBordered codeR={identifyValue} codeTitle="Identify Value" />
      <CodeBlock isBordered codeR={objV.key1} codeTitle="Object Values Key1" />
      <CodeBlock isBordered codeR={objV.key2} codeTitle="Object Values Key2" />
      <CodeBlock isBordered codeR={typeof typeOfStr} codeTitle="TypeOf Type" />
      <CodeBlock isBordered codeTitle="Max Width" codeR={maxWidth.toString()} />
      <CodeBlock isBordered codeR={String(unknown)} codeTitle="Unknown Value" />
      <CodeBlock
        isBordered
        codeR={mappedTypeValue2.x}
        codeTitle="Mapped Type Value 2"
      />
      <CodeBlock
        isBordered
        codeR={mappedTypeValue2.y}
        codeTitle="Mapped Type Value 2"
      />
      <CodeBlock
        isBordered
        codeR={mappedTypeValue.a}
        codeTitle="Mapped Type Value"
      />
      <CodeBlock
        isBordered
        codeR={asConst.join(", ")}
        codeTitle="As Const Value"
      />
      <CodeBlock
        isBordered
        codeTitle="Array Types Value"
        codeR={arrTypes.map((item) => JSON.stringify(item)).join(", ")}
      />
      <CodeBlock
        isBordered
        codeR={extendsString}
        codeTitle="Extends String Value"
      />
      <CodeBlock
        isBordered
        codeTitle="Bool Value"
        codeR={isOnline.toString()}
      />
      <CodeBlock
        isBordered
        codeTitle="Undefined Value"
        codeR={String(undefinedValue)}
      />
      <CodeBlock
        isBordered
        codeTitle="Void Value"
        codeR={String(voidValue)}
        onClick={() => voidValue}
      />
    </>
  );
}
