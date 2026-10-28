import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { CONFIG } from '@/shared/config';
import { cn } from '@/shared/lib';
import { LoadingUI } from '../LoadErr/LoadingUI';

const C = CONFIG.button;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof C.variants;
  size?: keyof typeof C.sizes;
  title?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = C.defaults.variant,
      size = C.defaults.size,
      className,
      title,
      icon,
      isLoading,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={C.defaults.type}
      disabled={isLoading}
      className={cn(C.base, C.variants[variant], C.sizes[size], className)}
      {...props}
    >
      {isLoading && <LoadingUI isLoading />}
      {title || children || icon}
    </button>
  ),
);
