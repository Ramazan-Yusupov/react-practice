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
