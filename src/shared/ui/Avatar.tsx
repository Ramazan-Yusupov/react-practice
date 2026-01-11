import { getAvatarUrl } from "@/lib/avatarUtils";

interface AvatarProps {
  img?: string;
  avatarSeed?: string;
  isAnonymous?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

// Анонимная аватарка (для неавторизованных пользователей)
const AnonymousAvatar = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-2 border-gray-400 bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}
    >
      <svg
        className="w-1/2 h-1/2 text-gray-500 dark:text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export function Avatar({
  img,
  avatarSeed,
  isAnonymous = false,
  onClick,
  size = "md",
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  if (isAnonymous) {
    return (
      <button onClick={onClick} className="cursor-pointer">
        <AnonymousAvatar size={size} />
      </button>
    );
  }

  // Если есть кастомная картинка, используем её
  if (img) {
    return (
      <button onClick={onClick} className="cursor-pointer">
        <img
          src={img}
          alt="Avatar"
          className={`${sizeClasses[size]} rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover`}
        />
      </button>
    );
  }

  // Если есть seed, генерируем рандомную аватарку (как в GitHub)
  if (avatarSeed) {
    return (
      <button onClick={onClick} className="cursor-pointer">
        <img
          src={getAvatarUrl(avatarSeed)}
          alt="Avatar"
          className={`${sizeClasses[size]} rounded-full border-2 border-gray-300 dark:border-gray-600`}
        />
      </button>
    );
  }

  // По умолчанию - анонимная
  return (
    <button onClick={onClick} className="cursor-pointer">
      <AnonymousAvatar size={size} />
    </button>
  );
}
