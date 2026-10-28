import { CONFIG } from '@/shared/config';
import { cn } from '@/shared/lib';
import { Badge } from '../Badge/Badge';

const C = CONFIG.card;

type CardMaxWidth = keyof typeof C.maxWidth;

interface CardProps {
  title?: string;
  border?: string;
  rounded?: string;
  maxWidth?: CardMaxWidth;
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
  border = C.defaults.border,
  rounded = C.defaults.rounded,
  borderColor = C.defaults.borderColor,
}: CardProps) {
  return (
    <div className={cn(C.classes.wrapper, maxWidth && C.maxWidth[maxWidth])}>
      <div
        className={cn(C.classes.root, className)}
        style={{ border: `${border} solid ${borderColor}`, borderRadius: rounded, maxHeight }}
      >
        {title && <Badge text={title} />}
        <div className={cn(C.classes.content, classNameChild)}>{children}</div>
      </div>
    </div>
  );
}
