import { CONFIG } from '@/shared/config';

const C = CONFIG.loading;

interface LoadingUIProps {
  text?: string;
  isLoading?: boolean;
  fullScreen?: boolean;
}

export function LoadingUI({
  isLoading,
  text = C.defaults.text,
  fullScreen = C.defaults.fullScreen,
}: LoadingUIProps) {
  if (!isLoading) return null;

  const content = (
    <div className={C.classes.content}>
      <div className={C.classes.spinner} />
      {text && <span className={C.classes.text}>{text}</span>}
    </div>
  );

  return fullScreen ? <div className={C.classes.fullScreen}>{content}</div> : content;
}
