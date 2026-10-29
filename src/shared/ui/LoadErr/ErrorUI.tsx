interface ErrorProps {
  text?: string;
  isError?: string | boolean;
}

export function ErrorUI({ isError, text = 'Error' }: ErrorProps) {
  return isError ? (
    <div className="flex justify-center">
      <div className="border-2 border-red-800 text-red-700 p-1 rounded-full text-center max-w-full px-4 whitespace-nowrap">
        {text}
      </div>
    </div>
  ) : null;
}
