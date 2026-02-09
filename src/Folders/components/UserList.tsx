import type { User } from "@/store/userSlice";
import { CodeBlock } from "../../shared/ui/CodeBlock";

interface UserListProps {
  users?: User[];
  onDeleteUser?: (id: number) => void;
}

export function UserList({ users, onDeleteUser }: UserListProps) {
  const list: User[] = Array.isArray(users) ? users : [];

  return (
    <div className="border-t-3 mt-5 pt-5 space-y-5 overflow-y-auto scrollHidden">
      {list.map((user) => (
        <CodeBlock
          isBordered
          key={user.id}
          codeR={user.email}
          codeL={user.username}
          codeTitle={user.name}
          onDelete={() => onDeleteUser?.(user.id)}
        />
      ))}
    </div>
  );
}
