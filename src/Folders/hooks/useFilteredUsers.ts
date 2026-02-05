import type { User } from "@/store/userSlice";
import { useMemo } from "react";

export function useFilteredUsers(users: User[], searchTerm: string) {
  return useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return users.filter((user) =>
      [user.name, user.email, user.username].some((field) =>
        String(field).toLowerCase().includes(lowerSearch),
      ),
    );
  }, [users, searchTerm]);
}
