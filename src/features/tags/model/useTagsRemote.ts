import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { tagsApi } from '../api/tags.api';
import type { CardSize, Tag, TagSort, TagsViewSettings } from './tags.types';
import {
  clampColumns,
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

export function useTagsRemote() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [settings, setSettings] = useLocalStorage<TagsViewSettings>(
    'tags-view-settings',
    DEFAULT_SETTINGS,
  );
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadTags = async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await tagsApi.getTags();
      setTags(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить теги');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadTags();
  }, []);

  const recurringTag = useMemo(() => hasDuplicateTag(tags, tagInput), [tags, tagInput]);

  const visibleTags = useMemo(() => {
    return sortTags(filterTags(tags, settings.search), settings.sort);
  }, [tags, settings.search, settings.sort]);

  const createTag = async () => {
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

    setIsLoading(true);
    setError('');

    try {
      const createdTag = await tagsApi.createTag({ label });
      setTags((prev) => [...prev, createdTag]);
      setTagInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось создать тег');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTag = async (id: string) => {
    const previousTags = tags;

    setTags((prev) => normalizePositions(prev.filter((tag) => tag.id !== id)));

    try {
      await tagsApi.deleteTag(id);
    } catch (err) {
      setTags(previousTags);
      setError(err instanceof Error ? err.message : 'Не удалось удалить тег');
    }
  };

  const clearTags = async () => {
    for (const tag of tags) {
      await deleteTag(tag.id);
    }
  };

  const reorderTags = async (ids: string[]) => {
    const previousTags = tags;
    const nextTags = reorderByIds(tags, ids);

    setTags(nextTags);

    try {
      const savedTags = await tagsApi.reorderTags({ ids });
      setTags(savedTags);
    } catch (err) {
      setTags(previousTags);
      setError(err instanceof Error ? err.message : 'Не удалось сохранить порядок');
    }
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
    isLoading,
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
    reloadTags: loadTags,
  };
}
