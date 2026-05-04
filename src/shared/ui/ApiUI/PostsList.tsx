import { useGetPostsQuery } from "@/store/api/api";
import { Card } from "../Cards/Card";
import { CodeBlock } from "../Cards/CodeBlock";
import { LoadingUI } from "../LoadErr/LoadingUI";
import { ErrorUI } from "../LoadErr/ErrorUI";

export function PostsList() {
  const { data, error, isLoading } = useGetPostsQuery();

  if (isLoading) return <LoadingUI />;
  if (error) return <ErrorUI text="Failed to load posts." />;

  return (
    <Card border="1px" borderColor="green">
      {data?.slice(0, 5).map((post) => (
        <CodeBlock
          key={post.id}
          border="1px"
          borderColor="green"
          title={post.title.slice(0, 20) + "..."}
          codeL={post.body.slice(0, 20) + "..."}
        />
      ))}
    </Card>
  );
}
