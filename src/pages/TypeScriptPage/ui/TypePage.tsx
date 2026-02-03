import { CodeBlock } from "@/shared/ui/CodeBlock";

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
      <CodeBlock codeL={data} codeTitle={text} isBordered />
      <CodeBlock codeL={data} codeTitle={age} isBordered />
      <CodeBlock codeL={role} codeTitle="Role" isBordered />
      <CodeBlock codeL={otherRole} codeTitle="Other Role" isBordered />
      <CodeBlock codeL={excludedRole} codeTitle="Excluded Role" isBordered />
      <CodeBlock
        codeL={`${user.age} - ${getUser("123", 23).name}`}
        codeTitle="User"
        isBordered
      />
      <CodeBlock codeL={userParams[0]} codeTitle="User Params" isBordered />
      <CodeBlock codeL={fetchD.name} codeTitle={fetchData.name} isBordered />
      <CodeBlock codeL={strL} codeTitle="Lowercase String" isBordered />
      <CodeBlock codeL={strU} codeTitle="Uppercase String" isBordered />
      <CodeBlock codeL={strC} codeTitle="Capitalized String" isBordered />
      <CodeBlock codeL={strUC} codeTitle="Uncapitalized String" isBordered />
    </div>
  );
}
