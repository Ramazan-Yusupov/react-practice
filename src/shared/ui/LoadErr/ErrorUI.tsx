import { CONFIG } from '@/shared/config';

const C = CONFIG.error;

interface ErrorProps {
  text?: string;
  isError?: string | boolean;
}

export function ErrorUI({ isError, text = C.defaults.text }: ErrorProps) {
  return isError ? (
    <div className={C.classes.wrapper}>
      <div className={C.classes.badge}>{text}</div>
    </div>
  ) : null;
}
