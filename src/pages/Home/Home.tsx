import { Card } from "@/shared/ui/Card";
import { UserList } from "@/Folders/components/UserList";
import { CodeBlock } from "@/shared/ui/CodeBlock";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store/store";
import { useEffect, useState } from "react";
import {
  addUser,
  deleteUser,
  fetchUsers,
  selectSortedUsers,
  setSortBy,
} from "@/store/userSlice";
import { LoadingUI } from "@/shared/ui/LoadingUI";
import { ErrorUI } from "@/shared/ui/ErrorUI";
import { FlexContainer } from "@/shared/ui/FlexContainer";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useFilteredUsers } from "@/Folders/hooks/useFilteredUsers";
import { Title } from "@/shared/ui/Title";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectSortedUsers);
  const { loading, error, sortBy } = useSelector(
    (state: RootState) => state.users,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const filteredUsers = useFilteredUsers(users, searchTerm);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSortChange = (newSort: "name" | "email" | "username") => {
    dispatch(setSortBy(newSort));
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleAddUser = () => {
    if (name && email && username) {
      dispatch(addUser({ id: Date.now(), name, username, email }));
      setName("");
      setEmail("");
      setUsername("");
    } else {
      alert("Please fill in all fields");
    }
  };
  return (
    <div>
      <Card
        avatar
        isOnline
        isErrorOnOff
        maxWidth="2xl"
        title="Frontend"
        maxHeight={600}
      >
        <CodeBlock isBordered codeL="React" codeR="tsx" codeTitle="Frontend" />
        <Input
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FlexContainer justify="between" gap={20}>
          <Input
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button title="Add" variant="secondary" onClick={handleAddUser} />
        </FlexContainer>

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

        <UserList users={filteredUsers} onDeleteUser={handleDeleteUser} />
        {loading && <LoadingUI isLoading={loading} />}
        {error && <ErrorUI isError={error} />}
        {filteredUsers.length === 0 && !loading && !error && (
          <Title text="No users found" align="center" />
        )}
      </Card>
    </div>
  );
}
