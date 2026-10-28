interface ErrorProps {
  text?: string;
  isError?: string | boolean;
}

export function ErrorUI({ isError, text = 'Error' }: ErrorProps) {
  return isError ? (
    <div className="flex justify-center">
      <div className="border-2 border-red-800 p-1 rounded-full text-center w-32 px-4">{text}</div>
    </div>
  ) : null;
}
