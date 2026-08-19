import { Badge, Button, Card, Input } from '@/shared/ui';
import { TagFilters } from './TagFilters';
import { TagGrid } from './TagGrid';
import { useTagsRemote } from '../model/useTagsRemote';

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
  } = useTagsRemote();

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
          {error && (
            <div className="flex-center">
              <Badge text={error} color="red" />
            </div>
          )}
          {tags.length > 0 && (
            <Button title="Clear All" size="sm" variant="danger" onClick={() => void clearTags()} />
          )}
        </div>

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
