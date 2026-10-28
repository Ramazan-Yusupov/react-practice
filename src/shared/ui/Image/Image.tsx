import { cn } from '@/shared/lib';
import { type ImgHTMLAttributes, forwardRef } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, containerClassName, alt = '', ...props }, ref) => {
    return (
      <div className={cn('overflow-hidden', containerClassName)}>
        <img
          ref={ref}
          alt={alt}
          sizes="auto"
          className={cn(
            'w-full h-full object-cover transition-transform hover:scale-105',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
