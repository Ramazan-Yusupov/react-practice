import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import { postsApi } from "./api/api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
