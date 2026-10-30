import { cn } from '@/shared/lib';
import { AiFillCloseCircle } from 'react-icons/ai';

type colors = 'gray' | 'white' | 'red' | 'green' | 'blue' | 'yellow';

type BadgeProps = {
  text?: string | number;
  count?: number;
  color?: colors;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onDelete?: () => void;
};

export function Badge({ text, count, className, onDelete, color, size }: BadgeProps) {
  const colors = {
    white: 'text-white border-white',
    red: 'text-red-600 border-red-600',
    blue: 'text-blue-600 border-blue-600',
    gray: 'text-gray-500 border-gray-500',
    green: 'text-green-600 border-green-600',
    yellow: 'text-yellow-600 border-yellow-600',
  };
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  };
  const classNames = `
                      text-sm font-medium w-fit border-2 rounded-lg px-3 py-1 h-min 
                      ${colors[color || 'gray']} 
                      ${sizes[size || 'md']} 
                      ${className || ''}
                    `;

  return onDelete ? (
    <div className={cn('flex items-center gap-2', classNames)}>
      {text}
      <button className="hover:opacity-80" onClick={onDelete}>
        <AiFillCloseCircle />
      </button>
    </div>
  ) : (
    <span className={cn(classNames)}>
      {text} {count}
    </span>
  );
}
