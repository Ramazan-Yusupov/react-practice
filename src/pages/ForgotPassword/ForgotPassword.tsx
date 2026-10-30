import { useSignIn } from '@clerk/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { pickError } from '@/features/auth/authErrors';
import {
  forgotEmailSchema,
  resetPasswordSchema,
  type ForgotEmailValues,
  type ResetPasswordValues,
} from '@/features/auth/schemas';
import { useAuthNavigate } from '@/features/auth/useAuthNavigate';
import { AuthCard } from '@/features/auth/ui/AuthCard';
import { CodeForm } from '@/features/auth/ui/CodeForm';
import { PasswordInput } from '@/features/auth/ui/PasswordInput';
import { PAGES } from '@/shared/config';
import { Button, Input } from '@/shared/ui';

type Step = 'email' | 'code' | 'password';

export function ForgotPassword() {
  const { signIn, errors: clerkErrors, fetchStatus } = useSignIn();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [notice, setNotice] = useState<string>();
  // true, когда email не найден: ошибку скрываем, чтобы не раскрывать, кто зарегистрирован
  const [hideError, setHideError] = useState(false);

  const onPendingTask = useCallback(
    () => setNotice('Нужен дополнительный шаг безопасности. Он пока не поддерживается'),
    [],
  );
  const navigateAfterAuth = useAuthNavigate(onPendingTask);

  const emailForm = useForm<ForgotEmailValues>({
    resolver: zodResolver(forgotEmailSchema),
    defaultValues: { email: '' },
  });
  const passwordForm = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const isLoading = fetchStatus === 'fetching';
  const formError = hideError
    ? undefined
    : pickError(
        clerkErrors.fields.identifier,
        clerkErrors.fields.password,
        clerkErrors.fields.code,
        clerkErrors.global?.[0],
      );

  const onEmail = emailForm.handleSubmit(async ({ email }) => {
    setNotice(undefined);
    setHideError(false);

    const created = await signIn.create({ identifier: email });
    if (created.error) {
      // Нет такого аккаунта: ведём себя так же, как при успехе (переходим к вводу кода)
      if (created.error.code === 'form_identifier_not_found') {
        setHideError(true);
        setStep('code');
      }
      return;
    }

    const sent = await signIn.resetPasswordEmailCode.sendCode();
    if (!sent.error) setStep('code');
  });

  async function onCode(code: string) {
    setHideError(false);
    const { error } = await signIn.resetPasswordEmailCode.verifyCode({ code });
    if (error) return;
    if (signIn.status === 'needs_new_password') setStep('password');
  }

  const onNewPassword = passwordForm.handleSubmit(async ({ password }) => {
    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password,
      signOutOfOtherSessions: true, // выйти на всех остальных устройствах
    });
    if (error) return;

    if (signIn.status === 'complete') {
      await signIn.finalize({ navigate: navigateAfterAuth });
    } else {
      // например, включена 2FA: пусть войдёт обычным способом с новым паролем
      await signIn.reset();
      void navigate(PAGES.SIGN_IN, { replace: true });
    }
  });

  async function onBack() {
    await signIn.reset();
    setNotice(undefined);
    setHideError(false);
    setStep('email');
  }

  if (step === 'code') {
    return (
      <CodeForm
        title="Введите код"
        description="Если такой аккаунт существует, мы отправили код на этот email"
        isLoading={isLoading}
        error={formError}
        notice={notice}
        onSubmit={onCode}
        onBack={() => void onBack()}
      />
    );
  }

  if (step === 'password') {
    return (
      <AuthCard
        title="Новый пароль"
        description="Минимум 10 символов, буквы и цифры"
        error={formError}
        notice={notice}
        onSubmit={(e) => void onNewPassword(e)}
      >
        <PasswordInput
          placeholder="Новый пароль"
          autoComplete="new-password"
          autoFocus
          error={passwordForm.formState.errors.password?.message}
          {...passwordForm.register('password')}
        />
        <PasswordInput
          placeholder="Повторите пароль"
          autoComplete="new-password"
          error={passwordForm.formState.errors.confirmPassword?.message}
          {...passwordForm.register('confirmPassword')}
        />
        <Button type="submit" variant="primary" title="Сохранить пароль" isLoading={isLoading} />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Восстановление пароля"
      description="Отправим код подтверждения на ваш email"
      error={formError}
      notice={notice}
      onSubmit={(e) => void onEmail(e)}
      footer={
        <Link to={PAGES.SIGN_IN} className="text-blue-500 hover:underline">
          Вернуться ко входу
        </Link>
      }
    >
      <Input
        type="email"
        placeholder="Email"
        autoComplete="email"
        autoFocus
        error={emailForm.formState.errors.email?.message}
        {...emailForm.register('email')}
      />
      <Button type="submit" variant="primary" title="Отправить код" isLoading={isLoading} />
    </AuthCard>
  );
}
