import { Card, CodeBlock, LoadingUI } from "@/shared/ui";
import { useEffect, useState } from "react";

type Users = {
  id: number;
  name: string;
  email: string;
};

export function Users() {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <LoadingUI />;

  return (
    <Card maxHeight="300px">
      {users.map((user) => (
        <CodeBlock
          border="1px"
          key={user.id}
          title={user.name}
          codeL={user.email}
        />
      ))}
    </Card>
  );
}
