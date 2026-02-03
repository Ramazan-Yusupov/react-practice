import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { counterReducer } from "./counterSlice";

const rootReducer = combineReducers({
  users: userReducer,
  counterState: counterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
