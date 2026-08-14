import { useMemo, useState } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import type { CardSize, Tag, TagSort, TagsViewSettings } from './tags.types';
import {
  clampColumns,
  createLocalTag,
  filterTags,
  hasDuplicateTag,
  normalizePositions,
  normalizeTagLabel,
  reorderByIds,
  sortTags,
} from './tags.utils';

const DEFAULT_SETTINGS: TagsViewSettings = {
  search: '',
  sort: 'custom',
  columns: 4,
  cardSize: 'md',
};

export function useTagsLocal() {
  const [tags, setTags] = useLocalStorage<Tag[]>('tags', []);
  const [settings, setSettings] = useLocalStorage<TagsViewSettings>(
    'tags-view-settings',
    DEFAULT_SETTINGS,
  );
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');

  const recurringTag = useMemo(() => hasDuplicateTag(tags, tagInput), [tags, tagInput]);

  const visibleTags = useMemo(() => {
    return sortTags(filterTags(tags, settings.search), settings.sort);
  }, [tags, settings.search, settings.sort]);

  const createTag = () => {
    const label = normalizeTagLabel(tagInput);

    if (!label) {
      setError('Введите название тега');
      return;
    }

    if (label.length > 32) {
      setError('Максимум 32 символа');
      return;
    }

    if (hasDuplicateTag(tags, label)) {
      setError(`Такой тег уже есть: ${label}`);
      return;
    }

    setTags((prev) => [...prev, createLocalTag(label, prev.length)]);
    setTagInput('');
    setError('');
  };

  const deleteTag = (id: string) => {
    setTags((prev) => normalizePositions(prev.filter((tag) => tag.id !== id)));
  };

  const clearTags = () => {
    setTags([]);
    setError('');
  };

  const reorderTags = (ids: string[]) => {
    setTags((prev) => reorderByIds(prev, ids));
  };

  const setSearch = (search: string) => {
    setSettings((prev) => ({ ...prev, search }));
  };

  const setSort = (sort: TagSort) => {
    setSettings((prev) => ({ ...prev, sort }));
  };

  const setColumns = (columns: number) => {
    setSettings((prev) => ({ ...prev, columns: clampColumns(columns) }));
  };

  const setCardSize = (cardSize: CardSize) => {
    setSettings((prev) => ({ ...prev, cardSize }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return {
    tags,
    visibleTags,
    settings,
    tagInput,
    error,
    recurringTag,
    isLoading: false,
    createTag,
    deleteTag,
    clearTags,
    reorderTags,
    setTagInput,
    setSearch,
    setSort,
    setColumns,
    setCardSize,
    resetSettings,
  };
}
