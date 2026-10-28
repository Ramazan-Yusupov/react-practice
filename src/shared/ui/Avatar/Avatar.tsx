import { useState } from 'react';
import { CONFIG } from '@/shared/config';
import { cn } from '@/shared/lib';

const C = CONFIG.avatar;

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: keyof typeof C.sizes;
  initials?: string;
  className?: string;
}

export const Avatar = ({
  src,
  alt = C.defaults.alt,
  size = C.defaults.size,
  initials = C.defaults.initials,
  className,
}: AvatarProps) => {
  const [hasError, setHasError] = useState(false);
  const showImage = src && !hasError;

  return (
    <div className={cn(C.base, C.sizes[size], className)} aria-label={alt} role="img">
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="eager"
          className={C.imageClass}
          onError={() => setHasError(true)}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  );
};
