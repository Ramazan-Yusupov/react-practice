import { fetchTasks } from '@/shared/lib/tasksApi';
import { Button, Card, ErrorUI, LoadingUI } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function Practice() {
  const [isDone, setIsDone] = useState(false);
  const { data, refetch, isPending, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  return (
    <Card
      border="2px"
      maxWidth="2xl"
      className="overflow-y-scroll scrollbar-none h-[calc(100vh-200px)]"
    >
      {isPending && <LoadingUI />}
      {isError && <ErrorUI text={error.message} />}
      <Button onClick={() => refetch()} disabled={isPending} title="Refetch" className="mb-4" />
      {data &&
        data.map((task) => (
          <div key={task.id} className="p-4 border-b flex justify-between">
            <div className={`${task.done ? 'line-through text-green-500' : ''}`}>{task.title}</div>
            <button onClick={() => setIsDone(!isDone)}>
              {task.done ? 'Mark as Undone' : 'Mark as Done'}
            </button>
          </div>
        ))}
    </Card>
  );
}
