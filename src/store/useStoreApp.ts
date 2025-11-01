import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

export const useStoreApp = create<Store>()(
  persist(
    (set) => ({
      counter: 0,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
    }),
    {
      name: "zustand-demo-storage",
      partialize: (state) => ({ counter: state.counter }),
    }
  )
);
