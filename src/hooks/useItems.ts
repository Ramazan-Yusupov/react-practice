import { useItemsStore } from '@/store/useItemsStore';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export function useItems() {
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const { items, addItem, removeItem } = useItemsStore(
    useShallow((state) => ({
      items: state.items,
      addItem: state.addItem,
      removeItem: state.removeItem,
    })),
  );

  const handleAddItem = () => {
    if (!text) return;
    addItem({
      id: Date.now(),
      text,
      color,
    });
    setText('');
    setColor('');
  };

  const handleDelete = (id: number) => {
    removeItem(id);
  };

  return {
    items,
    text,
    color,
    setText,
    setColor,
    handleDelete,
    handleAddItem,
  };
}
