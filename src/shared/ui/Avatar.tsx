import { useState } from "react";
import { getAvatarUrl } from "@/Folders/lib/avatarUtils";

type UserI = {
  name: string;
  email: string;
  avatar: string;
};

interface AvatarProps {
  img?: string;
  avatarSeed?: string;
  isAnonymous?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  userInfo?: UserI;
}

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
  userInfo,
}: AvatarProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  const avatarElement = (() => {
    if (isAnonymous) {
      return <AnonymousAvatar size={size} />;
    }
    if (img) {
      return (
        <img
          src={img}
          alt="Avatar"
          className={`${sizeClasses[size]} rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover`}
        />
      );
    }
    if (avatarSeed) {
      return (
        <img
          src={getAvatarUrl(avatarSeed)}
          alt="Avatar"
          className={`${sizeClasses[size]} rounded-full border-2 border-gray-300`}
        />
      );
    }
    return <AnonymousAvatar size={size} />;
  })();

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button onClick={onClick} className="cursor-pointer">
        {avatarElement}
      </button>

      {showTooltip && userInfo && (
        <div className="absolute z-1000 top-full mt-2 transform -translate-x-1 p-3 w-70 bg-black border-2 rounded-xl text-sm flex gap-3 items-center">
          <img
            src={userInfo.avatar || ""}
            className="w-8 h-8 rounded-full border-2 border-gray-300"
          />
          <div className="flex flex-col overflow-hidden">
            <div className="font-semibold">{userInfo.name}</div>
            <div className="">{userInfo.email}</div>
          </div>
        </div>
      )}
    </div>
  );
}
