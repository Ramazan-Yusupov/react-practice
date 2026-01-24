import { Card } from "@/components/Card";
import { CodeBlock } from "@/components/CodeBlock";
import { TypePage } from "./ui/TypePage";

type User = {
  id: number;
  name: string;
  age: number;
  text: string;
  readonly read: string;
  address: {
    street: string;
    city: string;
  };
};

/*  T - Введите псевдоним для подмножества свойств пользователя. */
type T = Pick<User, "id" | "name" | "age">;
/* R - Строковые ключи сопоставления типов записей с объектами User */
type R = Record<"admin" | "user", { text: string }>;

const userRecord: R = {
  admin: { text: "Admin User" },
  user: { text: "Regular User" },
};
/* Pick - Выбирает определенные свойства из типа */
const itemsPick: T[] = [
  {
    id: 1,
    name: "Frontend",
    age: 23,
  },
  {
    id: 2,
    name: "Backend",
    age: 25,
  },
  {
    id: 3,
    name: "Full Stack",
    age: 28,
  },
];
/* Pick - выбирает определенные свойства из типа. */
const itemsAddressPick: Pick<User, "id" | "address" | "text">[] = [
  {
    id: 1,
    address: {
      street: "123 Main St",
      city: "New York",
    },
    text: "Frontend Developer",
  },
  {
    id: 2,
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
    },
    text: "Backend Developer",
  },
  {
    id: 3,
    address: {
      street: " 789 Pine Rd",
      city: "Chicago",
    },
    text: "Full Stack Developer",
  },
];
/* Omit - Исключает определенные свойства из типа */
const itemsOmit: Omit<User, "read" | "address" | "text">[] = [
  {
    id: 1,
    name: "Frontend",
    age: 23,
  },
  {
    id: 2,
    name: "Backend",
    age: 25,
  },
  {
    id: 3,
    name: "Full Stack",
    age: 28,
  },
];
/* Partial - Делает все свойства необязательными */
const itemsPartial: Partial<User>[] = [
  {
    id: 1,
    name: "Frontend",
  },
  {
    id: 2,
    name: "Backend",
  },
  {
    id: 3,
    name: "Full Stack",
  },
];
/* Required - Делает все свойства обязательными */
const itemsRequired: Required<User>[] = [
  {
    id: 1,
    name: "Frontend",
    age: 23,
    text: "Frontend Developer",
    read: "ReadOnly",
    address: {
      street: "123 Main St",
      city: "New York",
    },
  },
  {
    id: 2,
    name: "Backend",
    age: 25,
    text: "Backend Developer",
    read: "ReadOnly",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
    },
  },
  {
    id: 3,
    name: "Full Stack",
    age: 28,
    text: "Full Stack Developer",
    read: "ReadOnly",
    address: {
      street: " 789 Pine Rd",
      city: "Chicago",
    },
  },
];

export function TypeScriptPage() {
  return (
    <div>
      <Card
        avatar
        isOnline
        isErrorOnOff
        maxWidth="xl"
        maxHeight="2xl"
        title="TypeScript Example"
      >
        {userRecord && (
          <div className="space-border">
            <CodeBlock
              isBordered
              codeTitle={`Record - ${userRecord.admin.text}`}
              code={userRecord.user.text}
            />
          </div>
        )}
        <TypePage
          user={{ name: "Frontend", id: "123", age: 23 }}
          age={23}
          data={1}
          role="admin"
          name="Unknown"
          text="Frontend"
          otherRole="moderator"
          excludedRole="admin"
          fetchD={{ name: "Frontend" }}
          userParams={["Frontend", 23]}
        />
        <div className="space-border">
          {itemsPick.map((user) => (
            <CodeBlock
              key={`user-${user.id}`}
              isBordered
              codeTitle={`${user.name} - user-${user.id}`}
              code={user.age}
            />
          ))}
        </div>
        <div className="space-border">
          {itemsAddressPick.map((user) => (
            <CodeBlock
              key={`address-${user.id}`}
              isBordered
              codeTitle={`${user.text} - address-${user.id}`}
              code={`${user.address.street}, ${user.address.city}`}
            />
          ))}
        </div>
        <div className="space-border">
          {itemsOmit.map((user) => (
            <CodeBlock
              key={`user-${user.id}`}
              isBordered
              codeTitle={`${user.name} - user-${user.id}`}
              code={user.age}
            />
          ))}
        </div>
        <div className="space-border">
          {itemsPartial.map((user) => (
            <CodeBlock
              key={`user-${user.id}`}
              isBordered
              codeTitle={`${user.name}`}
              code={user.id}
            />
          ))}
        </div>
        <div className="space-border">
          {itemsRequired.map((user) => (
            <CodeBlock
              key={`user-${user.id}`}
              isBordered
              codeTitle={`${user.name}`}
              code={`${user.age} - ${user.text} - ${user.address.street}, ${user.address.city} ${user.read}`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
