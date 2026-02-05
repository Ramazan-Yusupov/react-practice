import { Card } from "@/shared/ui/Card";
import { UserList } from "@/Folders/components/UserList";
import { CodeBlock } from "@/shared/ui/CodeBlock";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { fetchUsers, selectSortedUsers, setSortBy } from "@/store/userSlice";
import { LoadingUI } from "@/shared/ui/LoadingUI";
import { ErrorUI } from "@/shared/ui/ErrorUI";
import { FlexContainer } from "@/shared/ui/FlexContainer";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useFilteredUsers } from "@/Folders/hooks/useFilteredUsers";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectSortedUsers);
  const { loading, error, sortBy } = useSelector(
    (state: RootState) => state.users,
  );

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useFilteredUsers(users, searchTerm);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSortChange = (newSort: "name" | "email" | "username") => {
    dispatch(setSortBy(newSort));
  };
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
        <Input
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FlexContainer justify="between">
          <Button
            title="Sort by Name"
            disabled={sortBy === "name"}
            onClick={() => handleSortChange("name")}
          />
          <Button
            title="Sort by Email"
            disabled={sortBy === "email"}
            onClick={() => handleSortChange("email")}
          />
          <Button
            title="Sort by Username"
            disabled={sortBy === "username"}
            onClick={() => handleSortChange("username")}
          />
        </FlexContainer>

        {loading && <LoadingUI isLoading={loading} />}
        {error && <ErrorUI isError={error} />}

        <UserList users={filteredUsers} />
      </Card>
    </div>
  );
}
