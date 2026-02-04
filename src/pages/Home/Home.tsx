import { Card } from "@/shared/ui/Card";
import { UserList } from "@/Folders/components/UserList";
import { CodeBlock } from "@/shared/ui/CodeBlock";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchUsers } from "@/store/userSlice";
import { LoadingUI } from "@/shared/ui/LoadingUI";
import { ErrorUI } from "@/shared/ui/ErrorUI";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      <Card
        avatar
        isOnline
        isErrorOnOff
        maxWidth="xl"
        title="Frontend"
        maxHeight={636}
      >
        <CodeBlock isBordered codeL="tsx" codeTitle="Frontend" />

        {loading && <LoadingUI isLoading={loading} />}
        {error && <ErrorUI isError={error} />}

        <UserList users={users} />
      </Card>
    </div>
  );
}
