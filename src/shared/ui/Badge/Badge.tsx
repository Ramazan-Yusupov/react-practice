type BadgeProps = {
  text?: string;
  count?: number;
  color?: 'gray' | 'white' | 'red' | 'green' | 'blue' | 'yellow';
};

export function Badge({ text, count, color = 'gray' }: BadgeProps) {
  const colors = {
    gray: 'text-gray-400 border-gray-500',
    white: 'text-white border-white',
    red: 'text-red-500 border-red-500',
    green: 'text-green-500 border-green-500',
    blue: 'text-blue-500 border-blue-500',
    yellow: 'text-yellow-500 border-yellow-500',
  };

  return (
    <span
      className={`text-sm font-medium w-fit border-2 rounded-lg px-3 py-1 ${colors[color || 'gray']}`}
    >
      {text} {count}
    </span>
  );
}
