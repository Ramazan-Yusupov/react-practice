import { useMemo, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface ITag {
  id: string;
  label: string;
  position: number;
  createdAt?: string;
  updatedAt?: string;
}

export function useTags() {
  const [tags, setTags] = useLocalStorage<ITag[]>('tags', []);
  const [tagInput, setTagInput] = useState('');

  const handleDelete = (id: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const recurringTag = useMemo(
    () => tags.some((tag) => tag.label.toLowerCase() === tagInput.trim().toLowerCase()),
    [tags, tagInput],
  );

  const handleAdd = () => {
    const value = tagInput.trim();
    if (!value) return;
    if (recurringTag) return;

    setTags((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: value,
        position: tags.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
    setTagInput('');
  };

  const handleEdit = (id: string, newLabel: string) => {
    const value = newLabel.trim();
    if (!value) return;
    setTags((prev) =>
      prev.map((tag) =>
        tag.id === id ? { ...tag, label: value, updatedAt: new Date().toISOString() } : tag,
      ),
    );
  };

  const handleClearAll = () => setTags([]);

  return {
    tags,
    tagInput,
    recurringTag,
    handleAdd,
    handleDelete,
    handleEdit,
    handleClearAll,
    setTagInput,
  };
}
