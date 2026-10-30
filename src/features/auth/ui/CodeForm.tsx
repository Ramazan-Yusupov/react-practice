import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@/shared/ui';
import { codeSchema, type CodeValues } from '../schemas';
import { AuthCard } from './AuthCard';

interface CodeFormProps {
  title: string;
  description: string;
  submitLabel?: string;
  isLoading: boolean;
  error?: string | undefined;
  notice?: string | undefined;
  inputMode?: 'numeric' | 'text';
  onSubmit: (code: string) => Promise<void>;
  onResend?: () => Promise<void>;
  onBack: () => void;
  extra?: ReactNode;
}

/** Общий шаг «введите код»: для подтверждения email, второго фактора и сброса пароля. */
export function CodeForm({
  title,
  description,
  submitLabel = 'Подтвердить',
  isLoading,
  error,
  notice,
  inputMode = 'numeric',
  onSubmit,
  onResend,
  onBack,
  extra,
}: CodeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeValues>({ resolver: zodResolver(codeSchema), defaultValues: { code: '' } });

  return (
    <AuthCard
      title={title}
      description={description}
      error={error}
      notice={notice}
      onSubmit={(e) => void handleSubmit((v) => onSubmit(v.code))(e)}
    >
      <Input
        placeholder="Код"
        autoComplete="one-time-code"
        inputMode={inputMode}
        autoFocus
        error={errors.code?.message}
        {...register('code')}
      />
      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="primary" title={submitLabel} isLoading={isLoading} />
        {onResend && (
          <Button
            variant="ghost"
            title="Отправить ещё раз"
            disabled={isLoading}
            onClick={() => void onResend()}
          />
        )}
        <Button variant="ghost" title="Назад" disabled={isLoading} onClick={onBack} />
      </div>
      {extra}
    </AuthCard>
  );
}
