import { cn } from "@/lib";
import { useState } from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  initials?: string;
  className?: string;
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
  className,
}: AvatarProps) => {
  const [hasError, setHasError] = useState(false);

  const showImage = src && !hasError;

  return (
    <div
      className={cn(
        "rounded-full border-2 bg-gray-300 flex items-center justify-center font-semibold text-gray-700 overflow-hidden shrink-0",
        sizeClasses[size],
        className,
      )}
      aria-label={alt}
      role="img"
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="eager"
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  );
};
