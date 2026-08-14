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

export function TagBadge({ tag, size, dragAttributes, dragListeners, onDelete }: TagBadgeProps) {
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
