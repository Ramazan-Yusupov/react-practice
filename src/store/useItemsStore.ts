import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Item {
  id: number;
  text: string;
  color: string;
}

interface ItemState {
  items: Item[];
  removeItem: (id: number) => void;
  addItem: (item: Item) => void;
}

export const useItemsStore = create<ItemState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) => set((state) => ({ items: [...state.items, newItem] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    }),
    {
      name: 'item-storage',
      storage: createJSONStorage(() => localStorage),
      // partialize: (state) => ({ items: state.items }),
    },
  ),
);
