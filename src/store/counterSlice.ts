import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type CounterId = string;

type CounterState = {
  counter: number;
};

type State = {
  counters: Record<CounterId, CounterState>;
};

const initialState: State = {
  counters: {},
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state, action: PayloadAction<{ counterId: CounterId }>) {
      const { counterId } = action.payload;
      const current = state.counters[counterId];
      if (current) {
        current.counter += 1;
      } else {
        state.counters[counterId] = { counter: 1 };
      }
    },
    decrement(state, action: PayloadAction<{ counterId: CounterId }>) {
      const { counterId } = action.payload;
      const current = state.counters[counterId];
      if (current) {
        current.counter -= 1;
      } else {
        state.counters[counterId] = { counter: -1 };
      }
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export const counterReducer = counterSlice.reducer;

export const selectCounter = (state: RootState, counterId: CounterId) =>
  state.counterState.counters[counterId];
