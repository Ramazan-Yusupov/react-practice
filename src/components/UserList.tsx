import type { UserProps } from "@/store/userSlice";
import { CodeBlock } from "../shared/ui/CodeBlock";

export function UserList({ users }: { users: UserProps[] | unknown }) {
  const list: UserProps[] = Array.isArray(users) ? users : [];

  return (
    <div className="border-t-3 mt-5 pt-5 space-y-5">
      {list.map((user) => (
        <CodeBlock
          isBordered
          key={user.id}
          codeL={user.email}
          codeTitle={user.name}
        />
      ))}
    </div>
  );
}
