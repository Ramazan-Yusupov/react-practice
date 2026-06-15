import { AiFillCloseCircle } from 'react-icons/ai';
import styles from './BadgeStyles.module.scss';
import clsx from 'clsx';

type colors = 'gray' | 'white' | 'red' | 'green' | 'blue' | 'yellow';

type BadgeStylesProps = {
  text?: string | number;
  count?: number;
  color?: colors;
  className?: string;
  onDelete?: () => void;
};

export function BadgeStyles({ text, count, className, onDelete, color }: BadgeStylesProps) {
  const colors = {
    red: styles.red,
    blue: styles.blue,
    gray: styles.gray,
    green: styles.green,
    white: styles.white,
    yellow: styles.yellow,
  };

  return onDelete ? (
    <div className={clsx(styles.textButton, styles.colors, className, colors[color || 'gray'])}>
      {text}
      <button className={styles.buttonHover} onClick={onDelete}>
        <AiFillCloseCircle />
      </button>
    </div>
  ) : (
    <span className={clsx(styles.textSpan, styles.colors, className, colors[color || 'gray'])}>
      {text} {count}
    </span>
  );
}
