interface IconProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

export function IconButton({ icon, onClick }: IconProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer px-2 py-1 rounded-xl bg-gray-800"
    >
      {icon}
    </button>
  );
}
