import { type ImgHTMLAttributes, forwardRef } from 'react';
import { CONFIG } from '@/shared/config';
import { cn } from '@/shared/lib';

const C = CONFIG.image;

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, containerClassName, alt = C.defaults.alt, ...props }, ref) => (
    <div className={cn(C.containerClass, containerClassName)}>
      <img
        ref={ref}
        alt={alt}
        sizes={C.defaults.sizes}
        className={cn(C.imageClass, className)}
        {...props}
      />
    </div>
  ),
);
