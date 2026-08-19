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
        <div
          className="grid gap-2 max-h-50 pe-2 overflow-y-auto scrollbar-thin scrollbar-gutter-auto scrollbar-thumb-amber-600 scrollbar-track-amber-950/20"
          style={gridStyle}
        >
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
