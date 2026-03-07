interface IconProps {
  icon: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function IconButton({ icon, onClick, type = "button" }: IconProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="cursor-pointer rounded-xl bg-gray-800 flex-i-j-center w-full h-10"
    >
      {icon}
    </button>
  );
}
