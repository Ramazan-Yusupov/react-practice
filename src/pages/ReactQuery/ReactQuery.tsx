import { Card, CodeBlock, ErrorUI, Input, LoadingUI, Typography } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
};

export function ReactQuery() {
  const [search, setSearch] = useState('');

  const { data, isPending, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isPending) return <LoadingUI isLoading />;
  if (isError) return <ErrorUI isError />;

  const normalizedSearch = search.trim().toLowerCase();

  const filteredUsers = (data ?? []).filter((user) => {
    const text = `${user.id} ${user.name} ${user.email}`.toLowerCase();
    return text.includes(normalizedSearch);
  });

  return (
    <Card border="2px" maxWidth="3xl">
      <Input placeholder="User / ID" value={search} onChange={(e) => setSearch(e.target.value)} />

      {filteredUsers.length === 0 ? (
        <Typography as="h5" text={`Пользователь "${search}" не найден`} />
      ) : (
        filteredUsers.map((user) => (
          <CodeBlock key={user.id} badge={user.id} title={user.name} codeL={user.email} />
        ))
      )}
    </Card>
  );
}
