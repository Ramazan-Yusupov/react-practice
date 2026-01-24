import { CodeBlock } from "@/components/CodeBlock";

type Role = "admin" | "user" | "moderator";
type OtherRole = "testing" | "admin" | "user" | "security";

type R = Extract<Role, OtherRole>; // "admin" | "user"

type E = Exclude<Role, "user" | "moderator">; // "admin"
type O = Exclude<Role, OtherRole>; // "moderator"

type G = ReturnType<typeof getUser>; // { name: string; id: string; age: number; }

type P = Parameters<typeof getUser>; // [id: string, age: number]

type A = Awaited<ReturnType<typeof fetchData>>; // { name: string; }

type strL = Lowercase<string>;
type strU = Uppercase<string>;
type strC = Capitalize<string>;
type strUC = Uncapitalize<string>;

interface TypeProps {
  id: number;
  age: number;
  name: string;
  text: string;
  data: number;
  role: R;
  user: G;
  fetchD: A;
  otherRole: O;
  userParams: P;
  excludedRole: E;
}

const strL: strL = "hello world";
const strU: strU = "HELLO WORLD";
const strC: strC = "Hello World";
const strUC: strUC = "hello world";

const getUser = (id: string, age: number) => {
  return { id, name: "Frontend", age };
};

async function fetchData() {
  return Promise.resolve({ name: "Frontend" });
}

export function TypePage({
  text,
  age,
  data,
  role,
  user,
  fetchD,
  otherRole,
  userParams,
  excludedRole,
}: Omit<TypeProps, "id">) {
  return (
    <div className="space-border">
      <CodeBlock code={data} codeTitle={text} isBordered />
      <CodeBlock code={data} codeTitle={age} isBordered />
      <CodeBlock code={role} codeTitle="Role" isBordered />
      <CodeBlock code={otherRole} codeTitle="Other Role" isBordered />
      <CodeBlock code={excludedRole} codeTitle="Excluded Role" isBordered />
      <CodeBlock
        code={`${user.age} - ${getUser("123", 23).name}`}
        codeTitle="User"
        isBordered
      />
      <CodeBlock code={userParams[0]} codeTitle="User Params" isBordered />
      <CodeBlock code={fetchD.name} codeTitle={fetchData.name} isBordered />
      <CodeBlock code={strL} codeTitle="Lowercase String" isBordered />
      <CodeBlock code={strU} codeTitle="Uppercase String" isBordered />
      <CodeBlock code={strC} codeTitle="Capitalized String" isBordered />
      <CodeBlock code={strUC} codeTitle="Uncapitalized String" isBordered />
    </div>
  );
}
