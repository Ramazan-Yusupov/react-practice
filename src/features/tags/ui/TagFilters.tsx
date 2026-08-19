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
            max={5}
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
