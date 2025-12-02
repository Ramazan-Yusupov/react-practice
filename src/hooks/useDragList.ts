import { useState, useCallback, useRef } from "react";

interface DragItem {
  id: string;
  index: number;
}

interface UseDragListOptions<T> {
  items: T[];
  onReorder: (reorderedItems: T[]) => void;
  getId: (item: T) => string;
  updateId?: (item: T, newId: string) => T; // Функция для обновления ID
}

export function useDragList<T>({
  items,
  onReorder,
  getId,
  updateId,
}: UseDragListOptions<T>) {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragItemRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      const item = items[index];
      setDraggedItem({ id: getId(item), index });
      e.dataTransfer.effectAllowed = "move";

      if (dragItemRef.current) {
        dragItemRef.current.style.opacity = "0.5";
      }
    },
    [items, getId]
  );

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault();

      if (!draggedItem) return;

      const sourceIndex = draggedItem.index;

      if (sourceIndex === targetIndex) {
        setDragOverIndex(null);
        return;
      }

      // Создаем новый порядок элементов
      const newItems = [...items];
      const [movedItem] = newItems.splice(sourceIndex, 1);
      newItems.splice(targetIndex, 0, movedItem);

      // Обновляем ID элементов в соответствии с их новой позицией
      const updatedItems = newItems.map((item, index) => {
        if (updateId) {
          return updateId(item, (index + 1).toString());
        }
        return item;
      });

      onReorder(updatedItems);
      setDragOverIndex(null);
    },
    [draggedItem, items, onReorder, updateId]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverIndex(null);

    if (dragItemRef.current) {
      dragItemRef.current.style.opacity = "1";
    }
  }, []);

  return {
    draggedItem,
    dragOverIndex,
    dragItemRef,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
}
