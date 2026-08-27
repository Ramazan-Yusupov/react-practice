import { cn } from '@/shared/lib';
import { Badge } from '../Badge/Badge';

interface CardProps {
  title?: string;
  border?: string;
  rounded?: string;
  maxWidth?: string;
  maxHeight?: string;
  className?: string;
  borderColor?: string;
  classNameChild?: string;
  children: React.ReactNode;
}

export function Card({
  title,
  children,
  maxWidth,
  maxHeight,
  className,
  classNameChild,
  border = '0px',
  rounded = '16px',
  borderColor = 'currentColor',
}: CardProps) {
  const maxWidthClass: { [key: string]: string } = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  };

  return (
    <div className={`${maxWidth ? `${maxWidthClass[maxWidth]}` : ''}`}>
      <div
        className={cn('flex flex-col gap-4 p-5', className)}
        style={{
          border: `${border} solid ${borderColor}`,
          borderRadius: rounded,
          maxHeight: maxHeight,
        }}
      >
        {title && <Badge text={title} />}
        <div
          className={cn(
            'flex flex-col gap-4 overflow-hidden overflow-y-auto scrollbar-none',
            classNameChild,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
