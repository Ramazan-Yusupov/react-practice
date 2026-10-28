import { AiFillCloseCircle } from 'react-icons/ai';
import { CONFIG } from '@/shared/config';
import { cn } from '@/shared/lib';

const C = CONFIG.badge;

type BadgeProps = {
  text?: string | number;
  count?: number;
  color?: keyof typeof C.colors;
  className?: string;
  onDelete?: () => void;
};

export function Badge({ text, count, className, onDelete, color = C.defaults.color }: BadgeProps) {
  const classNames = cn(C.base, C.colors[color], className);

  return onDelete ? (
    <div className={cn(C.deleteWrapper, classNames)}>
      {text}
      <button className={C.deleteButton} onClick={onDelete}>
        <AiFillCloseCircle />
      </button>
    </div>
  ) : (
    <span className={classNames}>
      {text} {count}
    </span>
  );
}
