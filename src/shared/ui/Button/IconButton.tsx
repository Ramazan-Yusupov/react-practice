interface IconProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

export function IconButton({ icon, onClick }: IconProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer rounded-xl bg-gray-800 flex-i-j-center w-full h-10"
    >
      {icon}
    </button>
  );
}
