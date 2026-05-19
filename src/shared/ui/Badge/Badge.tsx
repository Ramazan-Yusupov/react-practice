type BadgeProps = {
  text: string;
  count?: number;
};

export function Badge({ text, count }: BadgeProps) {
  return (
    <span className="text-sm text-gray-400 font-medium w-fit border-2 border-gray-600 rounded-lg px-3 py-1">
      {text} {count}
    </span>
  );
}
