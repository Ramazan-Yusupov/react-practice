import { forwardRef, useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { Input, type InputProps } from '@/shared/ui/Inputs/Input';
import { Button } from '@/shared/ui';

export const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type' | 'iconRight'>>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <Input
        ref={ref}
        type={visible ? 'text' : 'password'}
        iconRight={
          <Button
            type="button"
            variant="ghost"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {visible ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
          </Button>
        }
        {...props}
      />
    );
  },
);
