import { GoogleOneTap, useSignIn } from '@clerk/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { pickError } from '@/features/auth/authErrors';
import { signInSchema, type SignInValues } from '@/features/auth/schemas';
import { useAuthNavigate } from '@/features/auth/useAuthNavigate';
import { AuthCard } from '@/features/auth/ui/AuthCard';
import { CodeForm } from '@/features/auth/ui/CodeForm';
import { PasswordInput } from '@/features/auth/ui/PasswordInput';
import { PAGES } from '@/shared/config';
import { Button, Input } from '@/shared/ui';

type SecondFactor = 'totp' | 'email_code' | 'phone_code' | 'backup_code';

const FACTOR_TEXT: Record<SecondFactor, string> = {
  totp: 'Введите код из приложения-аутентификатора',
  email_code: 'Мы отправили код на вашу почту',
  phone_code: 'Мы отправили код по SMS',
  backup_code: 'Введите один из резервных кодов',
};

function chooseFactor(strategies: string[]): SecondFactor | null {
  if (strategies.includes('totp')) return 'totp';
  if (strategies.includes('email_code')) return 'email_code';
  if (strategies.includes('phone_code')) return 'phone_code';
  return null;
}

export function SignIn() {
  const { signIn, errors: clerkErrors, fetchStatus } = useSignIn();
  const [step, setStep] = useState<'credentials' | 'code'>('credentials');
  const [factor, setFactor] = useState<SecondFactor>('email_code');
  const [notice, setNotice] = useState<string>();

  const onPendingTask = useCallback(
    () => setNotice('Для входа нужен дополнительный шаг безопасности. Он пока не поддерживается'),
    [],
  );
  const navigateAfterAuth = useAuthNavigate(onPendingTask);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const isLoading = fetchStatus === 'fetching';
  const formError = pickError(
    clerkErrors.fields.identifier,
    clerkErrors.fields.password,
    clerkErrors.fields.code,
    clerkErrors.global?.[0],
  );

  async function finish() {
    await signIn.finalize({ navigate: navigateAfterAuth });
  }

  async function afterFirstFactor() {
    if (signIn.status === 'complete') {
      await finish();
      return;
    }

    // needs_client_trust: вход с нового устройства, needs_second_factor: включена 2FA
    if (signIn.status === 'needs_client_trust' || signIn.status === 'needs_second_factor') {
      const next = chooseFactor(signIn.supportedSecondFactors.map((f) => f.strategy));
      if (!next) {
        setNotice('Этот способ подтверждения пока не поддерживается');
        return;
      }
      setFactor(next);
      if (next === 'email_code' && (await signIn.mfa.sendEmailCode()).error) return;
      if (next === 'phone_code' && (await signIn.mfa.sendPhoneCode()).error) return;
      setStep('code');
      return;
    }

    setNotice(`Вход не завершён (статус: ${signIn.status})`);
  }

  const onCredentials = handleSubmit(async ({ email, password }) => {
    setNotice(undefined);
    const { error } = await signIn.password({ emailAddress: email, password });
    if (error) return; // текст ошибки приходит в clerkErrors
    await afterFirstFactor();
  });

  async function onCode(code: string) {
    setNotice(undefined);
    const result =
      factor === 'totp'
        ? await signIn.mfa.verifyTOTP({ code })
        : factor === 'backup_code'
          ? await signIn.mfa.verifyBackupCode({ code })
          : factor === 'phone_code'
            ? await signIn.mfa.verifyPhoneCode({ code })
            : await signIn.mfa.verifyEmailCode({ code });
    if (result.error) return;
    if (signIn.status === 'complete') await finish();
  }

  async function onResend() {
    if (factor === 'email_code') await signIn.mfa.sendEmailCode();
    if (factor === 'phone_code') await signIn.mfa.sendPhoneCode();
  }

  async function onBack() {
    await signIn.reset();
    setNotice(undefined);
    setStep('credentials');
  }

  if (step === 'code') {
    const canUseBackup = signIn.supportedSecondFactors.some((f) => f.strategy === 'backup_code');

    return (
      <CodeForm
        title="Подтвердите вход"
        description={FACTOR_TEXT[factor]}
        inputMode={factor === 'backup_code' ? 'text' : 'numeric'}
        isLoading={isLoading}
        error={formError}
        notice={notice}
        onSubmit={onCode}
        onResend={factor === 'email_code' || factor === 'phone_code' ? onResend : undefined}
        onBack={() => void onBack()}
        extra={
          canUseBackup && factor !== 'backup_code' ? (
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
              onClick={() => setFactor('backup_code')}
            >
              Использовать резервный код
            </button>
          ) : null
        }
      />
    );
  }

  return (
    <AuthCard
      title="Вход"
      error={formError}
      notice={notice}
      onSubmit={(e) => void onCredentials(e)}
      footer={
        <>
          Нет аккаунта?{' '}
          <Link to={PAGES.SIGN_UP} className="text-blue-500 hover:underline">
            Зарегистрироваться
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
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Link to={PAGES.FORGOT_PASSWORD} className="text-sm text-blue-500 hover:underline">
        Забыли пароль?
      </Link>
      <GoogleOneTap />

      <Button type="submit" variant="primary" title="Войти" isLoading={isLoading} />
    </AuthCard>
  );
}
