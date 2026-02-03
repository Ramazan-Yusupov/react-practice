import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/userSlice";
import { type RootState, type AppDispatch } from "@/store/store";
import { Card } from "@/shared/ui/Card";
import { UserList } from "@/components/UserList";
import { Button } from "@/shared/ui/Button";
import { CodeBlock } from "@/shared/ui/CodeBlock";
import { FlexContainer } from "@/shared/ui/FlexContainer";
import { LoadingUI } from "@/shared/ui/LoadingUI";
import { ErrorUI } from "@/shared/ui/ErrorUI";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const error = useSelector((state: RootState) => state.users.error);
  const loading = useSelector((state: RootState) => state.users.loading);

  const [count, setCount] = useState(0);

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
        <CodeBlock
          isBordered
          codeL="Value:"
          codeR={count || "0"}
          codeTitle="Current Count"
        />
        <FlexContainer flex gap={10} items="center" justify="between">
          <Button title="Decrement" onClick={() => setCount(count - 1)} />
          <Button title="Increment" onClick={() => setCount(count + 1)} />
        </FlexContainer>

        {loading && <LoadingUI isLoading={loading} />}
        {error && <ErrorUI isError={!!error} />}

        <UserList users={users} />
      </Card>
    </div>
  );
}
