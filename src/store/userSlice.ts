import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  sortBy: "name" | "email" | "username";
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  sortBy: "name",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return (await response.json()) as User[];
});

export const selectSortedUsers = createSelector(
  (state: RootState) => state.users.users,
  (state: RootState) => state.users.sortBy,
  (users, sortBy) => {
    return [...users].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<"name" | "email" | "username">) {
      state.sortBy = action.payload;
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    addUser(state, action: PayloadAction<User>) {
      const newUser: User = {
        ...action.payload,
        id:
          state.users.length > 0
            ? Math.max(...state.users.map((u) => u.id)) + 1
            : 1,
      };
      state.users.push(newUser);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;
export const { setSortBy, deleteUser, addUser } = userSlice.actions;
