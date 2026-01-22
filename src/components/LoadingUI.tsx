interface LoadingUIProps {
  text?: string;
  isLoading: boolean;
}

export function LoadingUI({ isLoading, text = "Loading..." }: LoadingUIProps) {
  return isLoading ? (
    <div className="flex justify-center">
      <div className="border-2 border-gray-300 p-1 rounded-full text-center w-32 px-4 bg-gray-300 text-gray-600 animate-pulse">
        {text}
      </div>
    </div>
  ) : null;
}
