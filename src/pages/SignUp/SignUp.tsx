import { useSignUp } from '@clerk/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { pickError } from '@/features/auth/authErrors';
import { signUpSchema, type SignUpValues } from '@/features/auth/schemas';
import { useAuthNavigate } from '@/features/auth/useAuthNavigate';
import { AuthCard } from '@/features/auth/ui/AuthCard';
import { CodeForm } from '@/features/auth/ui/CodeForm';
import { PasswordInput } from '@/features/auth/ui/PasswordInput';
import { PAGES } from '@/shared/config';
import { Button, Input } from '@/shared/ui';

export function SignUp() {
  const { signUp, errors: clerkErrors, fetchStatus } = useSignUp();
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [notice, setNotice] = useState<string>();

  const onPendingTask = useCallback(
    () =>
      setNotice('Для завершения нужен дополнительный шаг безопасности. Он пока не поддерживается'),
    [],
  );
  const navigateAfterAuth = useAuthNavigate(onPendingTask);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const isLoading = fetchStatus === 'fetching';
  const formError = pickError(
    clerkErrors.fields.emailAddress,
    clerkErrors.fields.password,
    clerkErrors.fields.code,
    clerkErrors.fields.captcha,
    clerkErrors.fields.legalAccepted,
    clerkErrors.global?.[0],
  );

  async function finish() {
    await signUp.finalize({ navigate: navigateAfterAuth });
  }

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setNotice(undefined);
    const { error } = await signUp.password({ emailAddress: email, password });
    if (error) return;

    // Если в Clerk не требуется подтверждение email, регистрация завершится сразу
    if (signUp.status === 'complete') {
      await finish();
      return;
    }

    const sent = await signUp.verifications.sendEmailCode();
    if (!sent.error) setStep('verify');
  });

  async function onCode(code: string) {
    setNotice(undefined);
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) return;

    if (signUp.status === 'complete') {
      await finish();
    } else {
      setNotice(`Регистрация не завершена. Не хватает: ${signUp.missingFields.join(', ')}`);
    }
  }

  async function onBack() {
    await signUp.reset();
    setNotice(undefined);
    setStep('form');
  }

  if (step === 'verify') {
    return (
      <CodeForm
        title="Подтвердите email"
        description="Мы отправили код на вашу почту. Введите его, чтобы завершить регистрацию"
        isLoading={isLoading}
        error={formError}
        notice={notice}
        onSubmit={onCode}
        onResend={async () => {
          await signUp.verifications.sendEmailCode();
        }}
        onBack={() => void onBack()}
      />
    );
  }

  return (
    <AuthCard
      title="Регистрация"
      description="Пароль: минимум 10 символов, буквы и цифры"
      error={formError}
      notice={notice}
      onSubmit={(e) => void onSubmit(e)}
      footer={
        <>
          Уже есть аккаунт?{' '}
          <Link to={PAGES.SIGN_IN} className="text-blue-500 hover:underline">
            Войти
          </Link>
        </>
      }
    >
      <Input
        type="email"
        placeholder="Email"
        autoComplete="email"
        autoFocus
        error={errors.email?.message}
        {...register('email')}
      />
      <PasswordInput
        placeholder="Пароль"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <PasswordInput
        placeholder="Повторите пароль"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      {/* Место для проверки на бота (CAPTCHA), если она включена в Clerk */}
      <div id="clerk-captcha" />
      <Button type="submit" variant="primary" title="Создать аккаунт" isLoading={isLoading} />
    </AuthCard>
  );
}
