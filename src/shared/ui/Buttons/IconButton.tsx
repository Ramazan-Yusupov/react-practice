import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { CONFIG } from '@/shared/config';
import { cn } from '@/shared/lib';

const C = CONFIG.iconButton;

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: keyof typeof C.sizes;
  variant?: keyof typeof C.variants;
  ariaLabel: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      size = C.defaults.size,
      variant = C.defaults.variant,
      className,
      ariaLabel,
      disabled,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      className={cn(C.base, C.sizes[size], C.variants[variant], className)}
      {...props}
    >
      {icon}
    </button>
  ),
);
