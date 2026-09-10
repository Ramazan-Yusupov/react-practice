export type UserData = {
  id: number;
  name: string;
  email: string;
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export async function fetchUserData(): Promise<UserData[]> {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }
  const json = await res.json();
  return json;
}
