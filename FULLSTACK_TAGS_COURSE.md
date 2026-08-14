# Полный курс Frontend + Backend: теги в React и Node.js

Цель: сделать учебный fullstack-проект на базе текущего React-приложения. Пример - список тегов:

- создать тег;
- удалить тег;
- редактирование не нужно: удалил и создал заново;
- drag за отдельную иконку;
- плавное перемещение остальных тегов;
- фильтр по названию;
- сортировка;
- выбор колонок от 1 до 12;
- выбор размера карточки;
- сначала localStorage;
- потом Express API;
- потом переход на базу данных.

## 1. Общий план курса

1. Подготовить frontend-модель тегов.
2. Вынести теги в feature-модуль.
3. Добавить фильтр, сортировку, размер карточек и колонки.
4. Добавить drag-and-drop.
5. Сделать localStorage-версию.
6. Сделать Express backend.
7. Переключить frontend с localStorage на API.
8. Добавить JSON-хранилище.
9. После этого перейти на Prisma и базу данных.

## 2. Библиотеки для drag

Для текущей задачи лучший рабочий вариант:

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

Почему:

- `@dnd-kit` хорошо подходит для sortable grid;
- можно перетаскивать только за drag-иконку;
- есть мышь, touch и keyboard;
- `motion` уже стоит в проекте и добавит плавность.

`motion` один подойдет для простого списка, но для сетки 1-12 колонок лучше `dnd-kit`.

`gsap` мощнее для ручных анимаций, но тут будет больше кода.

`anime.js` можно добавить для изучения анимаций, но для React sortable grid это менее практичный первый выбор.

## 3. Frontend структура

Создай:

```txt
src/features/tags/
  api/tags.api.ts
  model/tags.types.ts
  model/tags.utils.ts
  model/useTagsLocal.ts
  model/useTagsRemote.ts
  ui/SortableTagItem.tsx
  ui/TagBadge.tsx
  ui/TagFilters.tsx
  ui/TagGrid.tsx
  ui/TagsPage.tsx
  index.ts
```

## 4. Frontend типы

`src/features/tags/model/tags.types.ts`

```ts
export type Tag = {
  id: string;
  label: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type TagSort = 'custom' | 'name-asc' | 'name-desc' | 'created-asc' | 'created-desc';

export type CardSize = 'sm' | 'md' | 'lg' | 'xl';

export type TagsViewSettings = {
  search: string;
  sort: TagSort;
  columns: number;
  cardSize: CardSize;
};

export type CreateTagDto = {
  label: string;
};

export type ReorderTagsDto = {
  ids: string[];
};

export type ApiSuccess<T> = {
  data: T;
};
```

## 5. Frontend утилиты

`src/features/tags/model/tags.utils.ts`

```ts
import type { Tag, TagSort } from './tags.types';

export function normalizeTagLabel(label: string) {
  return label.trim().replace(/\s+/g, ' ');
}

export function hasDuplicateTag(tags: Tag[], label: string) {
  const nextLabel = normalizeTagLabel(label).toLowerCase();
  return tags.some((tag) => tag.label.toLowerCase() === nextLabel);
}

export function createLocalTag(label: string, position: number): Tag {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    label: normalizeTagLabel(label),
    position,
    createdAt: now,
    updatedAt: now,
  };
}

export function normalizePositions(tags: Tag[]) {
  return tags.map((tag, index) => ({
    ...tag,
    position: index,
  }));
}

export function reorderByIds(tags: Tag[], ids: string[]) {
  const tagById = new Map(tags.map((tag) => [tag.id, tag]));

  return ids
    .map((id, index) => {
      const tag = tagById.get(id);
      return tag ? { ...tag, position: index } : null;
    })
    .filter((tag): tag is Tag => Boolean(tag));
}

export function sortTags(tags: Tag[], sort: TagSort) {
  const items = [...tags];

  switch (sort) {
    case 'name-asc':
      return items.sort((a, b) => a.label.localeCompare(b.label));
    case 'name-desc':
      return items.sort((a, b) => b.label.localeCompare(a.label));
    case 'created-asc':
      return items.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    case 'created-desc':
      return items.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    case 'custom':
    default:
      return items.sort((a, b) => a.position - b.position);
  }
}

export function filterTags(tags: Tag[], search: string) {
  const query = search.trim().toLowerCase();
  if (!query) return tags;

  return tags.filter((tag) => tag.label.toLowerCase().includes(query));
}

export function clampColumns(value: number) {
  if (Number.isNaN(value)) return 4;
  return Math.min(12, Math.max(1, value));
}
```

## 6. Local hook

`src/features/tags/model/useTagsLocal.ts`

```ts
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
```

## 7. API client

`src/features/tags/api/tags.api.ts`

```ts
import type { ApiSuccess, CreateTagDto, ReorderTagsDto, Tag } from '../model/tags.types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String(payload.message)
        : 'Ошибка запроса';

    throw new Error(message);
  }

  return payload as T;
}

export const tagsApi = {
  async getTags() {
    const response = await request<ApiSuccess<Tag[]>>('/api/tags');
    return response.data;
  },

  async createTag(dto: CreateTagDto) {
    const response = await request<ApiSuccess<Tag>>('/api/tags', {
      method: 'POST',
      body: JSON.stringify(dto),
    });

    return response.data;
  },

  async deleteTag(id: string) {
    await request<ApiSuccess<{ id: string }>>(`/api/tags/${id}`, {
      method: 'DELETE',
    });
  },

  async reorderTags(dto: ReorderTagsDto) {
    const response = await request<ApiSuccess<Tag[]>>('/api/tags/reorder', {
      method: 'PATCH',
      body: JSON.stringify(dto),
    });

    return response.data;
  },
};
```

## 8. Remote hook

`src/features/tags/model/useTagsRemote.ts`

```ts
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
```

## 9. TagBadge

`src/features/tags/ui/TagBadge.tsx`

```tsx
import { DotsSixVertical, XCircle } from '@phosphor-icons/react';
import { cn } from '@/shared/lib';
import type { CardSize, Tag } from '../model/tags.types';

type TagBadgeProps = {
  tag: Tag;
  size: CardSize;
  dragAttributes?: React.HTMLAttributes<HTMLButtonElement>;
  dragListeners?: React.HTMLAttributes<HTMLButtonElement>;
  onDelete: () => void;
};

const sizeClassName: Record<CardSize, string> = {
  sm: 'min-h-8 px-2 text-xs',
  md: 'min-h-10 px-3 text-sm',
  lg: 'min-h-12 px-4 text-base',
  xl: 'min-h-14 px-5 text-lg',
};

export function TagBadge({
  tag,
  size,
  dragAttributes,
  dragListeners,
  onDelete,
}: TagBadgeProps) {
  return (
    <div
      data-tag-id={tag.id}
      className={cn(
        'flex items-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 text-white',
        'transition-colors hover:border-white/50',
        sizeClassName[size],
      )}
    >
      <button
        type="button"
        aria-label={`Переместить тег ${tag.label}`}
        title="Переместить"
        className="shrink-0 rounded-md p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        {...dragAttributes}
        {...dragListeners}
      >
        <DotsSixVertical size={18} weight="bold" />
      </button>

      <span className="min-w-0 flex-1 truncate">{tag.label}</span>

      <button
        type="button"
        aria-label={`Удалить тег ${tag.label}`}
        title="Удалить"
        className="shrink-0 rounded-md p-1 text-white/60 transition-colors hover:bg-red-500/20 hover:text-red-300"
        onClick={onDelete}
      >
        <XCircle size={18} weight="fill" />
      </button>
    </div>
  );
}
```

## 10. Sortable item

`src/features/tags/ui/SortableTagItem.tsx`

```tsx
import { motion } from 'motion/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { CardSize, Tag } from '../model/tags.types';
import { TagBadge } from './TagBadge';

type SortableTagItemProps = {
  tag: Tag;
  size: CardSize;
  disabled?: boolean;
  onDelete: () => void;
};

export function SortableTagItem({ tag, size, disabled, onDelete }: SortableTagItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: tag.id,
    disabled,
  });

  return (
    <motion.div
      ref={setNodeRef}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: isDragging ? 1.03 : 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.18 }}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 'auto',
      }}
      className={isDragging ? 'opacity-80' : undefined}
    >
      <TagBadge
        tag={tag}
        size={size}
        onDelete={onDelete}
        dragAttributes={attributes}
        dragListeners={disabled ? undefined : listeners}
      />
    </motion.div>
  );
}
```

## 11. TagGrid

`src/features/tags/ui/TagGrid.tsx`

```tsx
import { AnimatePresence } from 'motion/react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Badge } from '@/shared/ui';
import type { CardSize, Tag } from '../model/tags.types';
import { SortableTagItem } from './SortableTagItem';

type TagGridProps = {
  tags: Tag[];
  columns: number;
  cardSize: CardSize;
  dragEnabled: boolean;
  onDelete: (id: string) => void;
  onReorder: (ids: string[]) => void;
};

export function TagGrid({
  tags,
  columns,
  cardSize,
  dragEnabled,
  onDelete,
  onReorder,
}: TagGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 180,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = tags.findIndex((tag) => tag.id === active.id);
    const newIndex = tags.findIndex((tag) => tag.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const nextTags = arrayMove(tags, oldIndex, newIndex);
    onReorder(nextTags.map((tag) => tag.id));
  };

  if (tags.length === 0) {
    return (
      <div className="flex-center min-h-28 rounded-lg border border-dashed border-white/10">
        <Badge text="Тегов пока нет" color="gray" />
      </div>
    );
  }

  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tags.map((tag) => tag.id)} strategy={rectSortingStrategy}>
        <div className="grid gap-2" style={gridStyle}>
          <AnimatePresence>
            {tags.map((tag) => (
              <SortableTagItem
                key={tag.id}
                tag={tag}
                size={cardSize}
                disabled={!dragEnabled}
                onDelete={() => onDelete(tag.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
}
```

## 12. TagFilters

`src/features/tags/ui/TagFilters.tsx`

```tsx
import { Button, Input } from '@/shared/ui';
import type { CardSize, TagSort, TagsViewSettings } from '../model/tags.types';

type TagFiltersProps = {
  settings: TagsViewSettings;
  onSearchChange: (value: string) => void;
  onSortChange: (value: TagSort) => void;
  onColumnsChange: (value: number) => void;
  onCardSizeChange: (value: CardSize) => void;
  onReset: () => void;
};

const sortOptions: Array<{ value: TagSort; label: string }> = [
  { value: 'custom', label: 'Мой порядок' },
  { value: 'name-asc', label: 'A-Z' },
  { value: 'name-desc', label: 'Z-A' },
  { value: 'created-desc', label: 'Новые' },
  { value: 'created-asc', label: 'Старые' },
];

const cardSizeOptions: Array<{ value: CardSize; label: string }> = [
  { value: 'sm', label: 'S' },
  { value: 'md', label: 'M' },
  { value: 'lg', label: 'L' },
  { value: 'xl', label: 'XL' },
];

export function TagFilters({
  settings,
  onSearchChange,
  onSortChange,
  onColumnsChange,
  onCardSizeChange,
  onReset,
}: TagFiltersProps) {
  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
      <Input
        value={settings.search}
        placeholder="Поиск тега"
        onChange={(event) => onSearchChange(event.target.value)}
        onClear={() => onSearchChange('')}
      />

      <div className="grid gap-3 md:grid-cols-[1fr_180px]">
        <label className="grid gap-1 text-sm text-white/70">
          Сортировка
          <select
            value={settings.sort}
            onChange={(event) => onSortChange(event.target.value as TagSort)}
            className="rounded-lg border-2 border-white/10 bg-black px-3 py-2 text-white outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm text-white/70">
          Колонки: {settings.columns}
          <input
            type="range"
            min={1}
            max={12}
            value={settings.columns}
            onChange={(event) => onColumnsChange(Number(event.target.value))}
            className="h-10 accent-white"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {cardSizeOptions.map((option) => (
            <Button
              key={option.value}
              title={option.label}
              size="sm"
              variant={settings.cardSize === option.value ? 'primary' : 'outline'}
              onClick={() => onCardSizeChange(option.value)}
            />
          ))}
        </div>

        <Button title="Reset" size="sm" variant="ghost" onClick={onReset} />
      </div>
    </div>
  );
}
```

## 13. TagsPage

`src/features/tags/ui/TagsPage.tsx`

```tsx
import { Badge, Button, Card, Input } from '@/shared/ui';
import { useTagsLocal } from '../model/useTagsLocal';
import { TagFilters } from './TagFilters';
import { TagGrid } from './TagGrid';

export function TagsPage() {
  const {
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
  } = useTagsLocal();

  const dragEnabled = settings.sort === 'custom' && !settings.search.trim();

  return (
    <Card border="2px" borderColor="#f1b471" maxWidth="2xl">
      <div className="grid gap-4">
        <div className="grid gap-2 md:grid-cols-[1fr_auto]">
          <Input
            value={tagInput}
            placeholder="New Tag"
            maxLength={32}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') void createTag();
            }}
            onClear={() => setTagInput('')}
          />
          <Button
            title="Add"
            onClick={() => void createTag()}
            disabled={recurringTag || !tagInput.trim() || isLoading}
            isLoading={isLoading}
          />
        </div>

        <div className="flex-between gap-3">
          <Badge text={`Всего: ${tags.length}`} />
          {tags.length > 0 && (
            <Button title="Clear All" size="sm" variant="danger" onClick={() => void clearTags()} />
          )}
        </div>

        {error && (
          <div className="flex-center">
            <Badge text={error} color="red" />
          </div>
        )}

        <TagFilters
          settings={settings}
          onSearchChange={setSearch}
          onSortChange={setSort}
          onColumnsChange={setColumns}
          onCardSizeChange={setCardSize}
          onReset={resetSettings}
        />

        {!dragEnabled && tags.length > 0 && (
          <p className="text-xs text-white/50">
            Drag доступен только в режиме "Мой порядок" без активного поиска.
          </p>
        )}

        <TagGrid
          tags={visibleTags}
          columns={settings.columns}
          cardSize={settings.cardSize}
          dragEnabled={dragEnabled}
          onDelete={(id) => void deleteTag(id)}
          onReorder={(ids) => void reorderTags(ids)}
        />
      </div>
    </Card>
  );
}
```

## 14. Экспорт feature

`src/features/tags/index.ts`

```ts
export { TagsPage } from './ui/TagsPage';
```

## 15. Подключение в Home

`src/pages/Home/Home.tsx`

```tsx
import { TagsPage } from '@/features/tags';

export function Home() {
  return <TagsPage />;
}
```

## 16. Проверка frontend

```bash
npm run typecheck
npm run lint
npm run build
```

## 17. Backend структура

Создай:

```txt
server/
  data/tags.json
  src/app.ts
  src/server.ts
  src/controllers/tags.controller.ts
  src/middlewares/error.middleware.ts
  src/repositories/tags.repository.ts
  src/routes/tags.routes.ts
  src/services/tags.service.ts
  src/types/tag.ts
  src/utils/async-handler.ts
  src/utils/http-error.ts
  src/utils/json-file.ts
```

## 18. Backend scripts

В `package.json` добавь:

```json
{
  "server:dev": "tsx watch server/src/server.ts",
  "server:start": "tsx server/src/server.ts"
}
```

Если хочешь одной командой frontend + backend:

```bash
npm install -D concurrently
```

И добавь:

```json
{
  "dev:full": "concurrently \"npm run dev\" \"npm run server:dev\""
}
```

## 19. Backend env

`.env`

```env
VITE_API_URL=http://localhost:4000
```

`server/.env.example`

```env
PORT=4000
CLIENT_URL=http://localhost:5173
```

## 20. JSON данные

`server/data/tags.json`

```json
[]
```

## 21. Backend типы

`server/src/types/tag.ts`

```ts
export type Tag = {
  id: string;
  label: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateTagDto = {
  label: string;
};

export type ReorderTagsDto = {
  ids: string[];
};

export type ApiSuccess<T> = {
  data: T;
};
```

## 22. Backend HttpError

`server/src/utils/http-error.ts`

```ts
export class HttpError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(status: number, message: string, code?: string, details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
```

## 23. Backend JSON helper

`server/src/utils/json-file.ts`

```ts
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function readJsonFile<T>(path: string, fallback: T): Promise<T> {
  try {
    const content = await readFile(path, 'utf-8');
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonFile<T>(path: string, data: T) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
}
```

## 24. Backend repository

`server/src/repositories/tags.repository.ts`

```ts
import { resolve } from 'node:path';
import type { Tag } from '../types/tag';
import { readJsonFile, writeJsonFile } from '../utils/json-file';

const TAGS_FILE = resolve(process.cwd(), 'server/data/tags.json');

export const tagsRepository = {
  async findAll() {
    const tags = await readJsonFile<Tag[]>(TAGS_FILE, []);
    return tags.sort((a, b) => a.position - b.position);
  },

  async saveAll(tags: Tag[]) {
    await writeJsonFile(TAGS_FILE, tags);
    return tags;
  },
};
```

## 25. Backend service

`server/src/services/tags.service.ts`

```ts
import type { CreateTagDto, ReorderTagsDto, Tag } from '../types/tag';
import { tagsRepository } from '../repositories/tags.repository';
import { HttpError } from '../utils/http-error';

function normalizeLabel(label: string) {
  return label.trim().replace(/\s+/g, ' ');
}

function normalizePositions(tags: Tag[]) {
  return tags.map((tag, index) => ({
    ...tag,
    position: index,
  }));
}

function createTagEntity(label: string, position: number): Tag {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    label,
    position,
    createdAt: now,
    updatedAt: now,
  };
}

export const tagsService = {
  async getTags() {
    return tagsRepository.findAll();
  },

  async createTag(dto: CreateTagDto) {
    const label = normalizeLabel(dto.label ?? '');

    if (!label) {
      throw new HttpError(400, 'Введите название тега', 'EMPTY_TAG_LABEL');
    }

    if (label.length > 32) {
      throw new HttpError(400, 'Максимум 32 символа', 'TAG_LABEL_TOO_LONG');
    }

    const tags = await tagsRepository.findAll();
    const duplicate = tags.some((tag) => tag.label.toLowerCase() === label.toLowerCase());

    if (duplicate) {
      throw new HttpError(409, 'Такой тег уже существует', 'DUPLICATE_TAG');
    }

    const tag = createTagEntity(label, tags.length);
    await tagsRepository.saveAll([...tags, tag]);

    return tag;
  },

  async deleteTag(id: string) {
    const tags = await tagsRepository.findAll();
    const exists = tags.some((tag) => tag.id === id);

    if (!exists) {
      throw new HttpError(404, 'Тег не найден', 'TAG_NOT_FOUND');
    }

    const nextTags = normalizePositions(tags.filter((tag) => tag.id !== id));
    await tagsRepository.saveAll(nextTags);

    return { id };
  },

  async reorderTags(dto: ReorderTagsDto) {
    const tags = await tagsRepository.findAll();

    if (!Array.isArray(dto.ids)) {
      throw new HttpError(400, 'ids должен быть массивом', 'INVALID_REORDER_IDS');
    }

    if (dto.ids.length !== tags.length) {
      throw new HttpError(400, 'Передайте все id тегов в новом порядке', 'INVALID_REORDER_LENGTH');
    }

    const tagById = new Map(tags.map((tag) => [tag.id, tag]));
    const hasUnknownId = dto.ids.some((id) => !tagById.has(id));

    if (hasUnknownId) {
      throw new HttpError(400, 'Передан неизвестный id тега', 'UNKNOWN_TAG_ID');
    }

    const now = new Date().toISOString();
    const nextTags = dto.ids.map((id, index) => ({
      ...tagById.get(id)!,
      position: index,
      updatedAt: now,
    }));

    await tagsRepository.saveAll(nextTags);

    return nextTags;
  },
};
```

## 26. Backend async handler

`server/src/utils/async-handler.ts`

```ts
import type { NextFunction, Request, RequestHandler, Response } from 'express';

export function asyncHandler(handler: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
```

## 27. Backend controller

`server/src/controllers/tags.controller.ts`

```ts
import type { Request, Response } from 'express';
import type { CreateTagDto, ReorderTagsDto } from '../types/tag';
import { tagsService } from '../services/tags.service';

export const tagsController = {
  async getTags(_req: Request, res: Response) {
    const tags = await tagsService.getTags();
    res.json({ data: tags });
  },

  async createTag(req: Request<unknown, unknown, CreateTagDto>, res: Response) {
    const tag = await tagsService.createTag(req.body);
    res.status(201).json({ data: tag });
  },

  async deleteTag(req: Request<{ id: string }>, res: Response) {
    const result = await tagsService.deleteTag(req.params.id);
    res.json({ data: result });
  },

  async reorderTags(req: Request<unknown, unknown, ReorderTagsDto>, res: Response) {
    const tags = await tagsService.reorderTags(req.body);
    res.json({ data: tags });
  },
};
```

## 28. Backend routes

`server/src/routes/tags.routes.ts`

```ts
import { Router } from 'express';
import { tagsController } from '../controllers/tags.controller';
import { asyncHandler } from '../utils/async-handler';

export const tagsRouter = Router();

tagsRouter.get('/', asyncHandler(tagsController.getTags));
tagsRouter.post('/', asyncHandler(tagsController.createTag));
tagsRouter.patch('/reorder', asyncHandler(tagsController.reorderTags));
tagsRouter.delete('/:id', asyncHandler(tagsController.deleteTag));
```

## 29. Backend error middleware

`server/src/middlewares/error.middleware.ts`

```ts
import type { ErrorRequestHandler } from 'express';
import { HttpError } from '../utils/http-error';

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({
      message: error.message,
      code: error.code,
      details: error.details,
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: 'Внутренняя ошибка сервера',
    code: 'INTERNAL_SERVER_ERROR',
  });
};
```

## 30. Backend app

`server/src/app.ts`

```ts
import cors from 'cors';
import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { tagsRouter } from './routes/tags.routes';

export const app = express();

const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173';

app.use(
  cors({
    origin: clientUrl,
  }),
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ data: { status: 'ok' } });
});

app.use('/api/tags', tagsRouter);
app.use(errorMiddleware);
```

## 31. Backend server

`server/src/server.ts`

```ts
import { app } from './app';

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
```

## 32. Проверка backend

Запуск:

```bash
npm run server:dev
```

Health:

```bash
curl http://localhost:4000/health
```

Создать тег:

```bash
curl -X POST http://localhost:4000/api/tags -H "Content-Type: application/json" -d "{\"label\":\"React\"}"
```

Получить теги:

```bash
curl http://localhost:4000/api/tags
```

Удалить:

```bash
curl -X DELETE http://localhost:4000/api/tags/TAG_ID
```

Сохранить порядок:

```bash
curl -X PATCH http://localhost:4000/api/tags/reorder -H "Content-Type: application/json" -d "{\"ids\":[\"id-1\",\"id-2\"]}"
```

## 33. Переключение frontend на backend

В `src/features/tags/ui/TagsPage.tsx` замени:

```ts
import { useTagsLocal } from '../model/useTagsLocal';
```

на:

```ts
import { useTagsRemote } from '../model/useTagsRemote';
```

И вызов:

```ts
} = useTagsRemote();
```

Добавь `.env`:

```env
VITE_API_URL=http://localhost:4000
```

Запусти два процесса:

```bash
npm run server:dev
npm run dev
```

## 34. Почему drag отключаем при поиске и сортировке

Drag должен работать, когда пользователь видит реальный порядок всех тегов. Поэтому:

```ts
const dragEnabled = settings.sort === 'custom' && !settings.search.trim();
```

Если включен поиск, пользователь видит только часть тегов. Если включена сортировка `A-Z`, порядок задается сортировкой, а не руками.

## 35. Следующий уровень: Prisma

Когда JSON-хранилище стало понятным, переходи на Prisma + SQLite.

Установка:

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init --datasource-provider sqlite
```

`prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Tag {
  id        String   @id @default(uuid())
  label     String   @unique
  position  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

`.env`

```env
DATABASE_URL="file:./dev.db"
```

Миграция:

```bash
npx prisma migrate dev --name init
```

Prisma repository:

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const tagsRepository = {
  findAll() {
    return prisma.tag.findMany({
      orderBy: {
        position: 'asc',
      },
    });
  },

  create(label: string, position: number) {
    return prisma.tag.create({
      data: {
        label,
        position,
      },
    });
  },

  delete(id: string) {
    return prisma.tag.delete({
      where: {
        id,
      },
    });
  },

  async reorder(ids: string[]) {
    await prisma.$transaction(
      ids.map((id, position) =>
        prisma.tag.update({
          where: {
            id,
          },
          data: {
            position,
          },
        }),
      ),
    );

    return this.findAll();
  },
};
```

## 36. Backend темы, которые надо понять

1. Что такое Node.js runtime.
2. Чем backend отличается от frontend.
3. Что такое HTTP request и response.
4. Что такое REST API.
5. Что такое route, controller, service, repository.
6. Что такое middleware.
7. Что такое CORS.
8. Почему нужна валидация.
9. Почему нельзя доверять frontend.
10. Как хранить данные.
11. Как frontend переключается с localStorage на API.
12. Что такое optimistic update.
13. Что такое rollback при ошибке.
14. Что такое миграции базы данных.
15. Как деплоить frontend и backend отдельно.

## 37. Финальный чеклист

Frontend готов, если:

- тег создается;
- дубликаты запрещены;
- пустой тег запрещен;
- тег удаляется;
- drag работает за иконку;
- соседние теги плавно двигаются;
- поиск работает;
- сортировка работает;
- колонки 1-12 работают;
- размер карточек меняется;
- настройки сохраняются;
- build проходит.

Backend готов, если:

- `/health` отвечает;
- `GET /api/tags` возвращает `{ data: Tag[] }`;
- `POST /api/tags` создает тег;
- duplicate возвращает 409;
- `DELETE /api/tags/:id` удаляет тег;
- `PATCH /api/tags/reorder` сохраняет порядок;
- данные остаются после перезапуска сервера;
- ошибки возвращаются в одном формате.

## 38. Рекомендуемый порядок работы

1. Реализуй frontend localStorage-версию.
2. Поставь `dnd-kit`.
3. Проверь drag, фильтр, колонки, размеры.
4. Создай backend.
5. Проверь backend через curl.
6. Переключи frontend на `useTagsRemote`.
7. Проверь fullstack-сценарий.
8. После этого переходи на Prisma.

Главная идея курса: frontend сначала учится работать с нормальной моделью данных, потом эта модель переезжает на backend почти без переписывания интерфейса.
