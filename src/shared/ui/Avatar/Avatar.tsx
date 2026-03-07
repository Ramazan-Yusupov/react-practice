interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  initials?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

export const Avatar = ({
  src,
  alt = "Avatar",
  size = "md",
  initials = "?",
}: AvatarProps) => {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-2 bg-gray-300 flex items-center justify-center font-semibold text-gray-700 overflow-hidden`}
    >
      {src ? (
        <img
          src={src || ""}
          alt={alt}
          loading="eager"
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
