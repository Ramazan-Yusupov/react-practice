import { FaTrash } from 'react-icons/fa6';
import { CONFIG } from '@/shared/config';
import { cn } from '@/shared/lib';
import { Button } from '../Buttons/Button';
import { Badge } from '../Badge/Badge';

const C = CONFIG.codeBlock;

type CodeBlockColor = keyof typeof C.colors;
type ButtonType = 'button' | 'submit' | 'reset';

interface CodeProps {
  badge?: string | number;
  border?: string;
  rounded?: string;
  borderColor?: string;
  onEdit?: () => void;
  onClick?: () => void;
  onDelete?: () => void;
  type?: ButtonType;
  title?: React.ReactNode;
  codeL?: React.ReactNode;
  codeR?: React.ReactNode;
  colorL?: CodeBlockColor;
  colorR?: CodeBlockColor;
  colorTitle?: CodeBlockColor;
}

const renderCodeValue = (value?: React.ReactNode) => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return value.toLocaleString(C.locale);
  return value;
};

export function CodeBlock({
  title,
  codeL,
  codeR,
  badge,
  onEdit,
  onClick,
  onDelete,
  border = C.defaults.border,
  rounded = C.defaults.rounded,
  colorL = C.defaults.colorL,
  colorR = C.defaults.colorR,
  colorTitle = C.defaults.colorTitle,
  borderColor = C.defaults.borderColor,
}: CodeProps) {
  const leftValue = renderCodeValue(codeL);
  const rightValue = renderCodeValue(codeR);
  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      className={cn(C.classes.root, isClickable && C.classes.clickable)}
      style={{ border: `${border} solid ${borderColor}`, borderRadius: rounded }}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      <div className={C.classes.left}>
        {title && <div className={C.colors[colorTitle]}>{title}</div>}
        {badge && <Badge text={badge} />}
      </div>

      <div className={C.classes.right}>
        {leftValue !== null && (
          <code className={cn(C.colors[colorL], C.classes.code)}>{leftValue}</code>
        )}
        {rightValue !== null && (
          <code className={cn(C.colors[colorR], C.classes.code)}>{rightValue}</code>
        )}

        {onDelete && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            size="md"
            variant="danger"
            icon={<FaTrash />}
          />
        )}

        {onEdit && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            size="sm"
            variant="secondary"
            title={C.editTitle}
          />
        )}
      </div>
    </div>
  );
}
