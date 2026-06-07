import { cn } from '@/lib';
import { type FormHTMLAttributes, forwardRef } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn('space-y-4 border-2 border-white/50 p-4 text-white rounded-xl', className)}
        {...props}
      >
        {children}
      </form>
    );
  },
);
