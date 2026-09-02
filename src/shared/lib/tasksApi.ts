export type Task = {
  id: number;
  userId: number;
  title: string;
  done: boolean;
};

const BASE_URL = 'http://localhost:4000/api';

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks`);
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const json = await res.json();
  return json.data;
}
