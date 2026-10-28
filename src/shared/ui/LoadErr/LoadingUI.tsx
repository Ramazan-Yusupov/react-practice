interface LoadingUIProps {
  text?: string;
  isLoading?: boolean;
  fullScreen?: boolean;
}

export function LoadingUI({ isLoading, text = 'Loading...', fullScreen = false }: LoadingUIProps) {
  if (!isLoading) return null;

  const content = (
    <div className="flex flex-col items-center justify-center gap-3 animate-pulse">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      {text && <span className="text-sm text-gray-400 font-medium">{text}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}
