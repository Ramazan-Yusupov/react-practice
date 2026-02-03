import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface UserProps {
  id: number;
  name: string;
  email: string;
}

interface UsersState {
  users: UserProps[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// Async thunk для загрузки пользователей
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users?_limit=5",
  );

  if (!response.ok) {
    // Генерируем ошибку, чтобы thunk перешёл в rejected
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: UserProps[] = await response.json();
  return data;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserProps[]>) => {
          state.loading = false;
          state.users = action.payload;
        },
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;
