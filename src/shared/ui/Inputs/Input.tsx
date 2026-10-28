import { type InputHTMLAttributes, forwardRef } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { CONFIG } from '@/shared/config';
import { cn } from '@/shared/lib';

const C = CONFIG.input;

interface CustomInputProps {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  onClear?: () => void;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, CustomInputProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = C.defaults.type,
      iconLeft,
      iconRight,
      error,
      onClear,
      onChange,
      value,
      ...props
    },
    ref,
  ) => {
    const hasValue = value !== undefined && value !== null && String(value).length > 0;
    const isClearable = !!onClear && hasValue && type !== 'checkbox' && type !== 'range';

    return (
      <div className={C.classes.wrapper}>
        <div className={C.classes.inner}>
          {iconLeft && <span className={C.classes.iconLeft}>{iconLeft}</span>}

          <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            {...props}
            className={cn(
              C.classes.input,
              error ? C.classes.inputError : C.classes.inputOk,
              iconLeft && C.classes.withIconLeft,
              (iconRight || isClearable) && C.classes.withIconRight,
              type === 'range' && C.classes.range,
              type === 'checkbox' && C.classes.checkbox,
              className,
            )}
          />

          {isClearable && (
            <button
              type="button"
              onClick={onClear}
              className={C.classes.clearButton}
              aria-label={C.clearLabel}
            >
              <RiCloseCircleFill size={C.clearIconSize} />
            </button>
          )}

          {!isClearable && iconRight && <span className={C.classes.iconRight}>{iconRight}</span>}
        </div>
        {error && <span className={C.classes.error}>{error}</span>}
      </div>
    );
  },
);
