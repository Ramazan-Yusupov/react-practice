import { useLocalStorage } from "@/hooks";
import { Card, CodeBlock, ErrorUI, LoadingUI } from "@/shared";
import { useEffect } from "react";

interface UserProps {
  id: number;
  name: string;
  email: string;
}

export function UseEffect() {
  const [user, setUser] = useLocalStorage<UserProps | null>("user", null);
  const [loading, setLoading] = useLocalStorage<boolean>("loading", true);
  const [error, setError] = useLocalStorage<string | null>("error", null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        if (isMounted) {
          setUser(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <LoadingUI isLoading />;
  if (error) return <ErrorUI isError />;
  if (!user) return null;

  return (
    <Card border="2px" maxWidth="xl">
      <CodeBlock border="2px" title={user.name} codeL={`${user?.id ?? 0}`} />
    </Card>
  );
}
