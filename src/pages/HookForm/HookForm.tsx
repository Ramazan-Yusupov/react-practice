import { Button, Form, Input } from '@/shared/ui';
import { useState } from 'react';
import { useForm, type FieldErrors, type SubmitHandler } from 'react-hook-form';

type Role = 'frontend' | 'backend' | 'fullstack';

interface ProfileValues {
  name: string;
  email: string;
  role: Role;
  city: string;
}

const DEFAULT_VALUES: ProfileValues = {
  name: '',
  email: '',
  city: '',
  role: 'frontend',
};

export function HookForm() {
  const [submittedValues, setSubmittedValues] = useState<ProfileValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, submitCount },
  } = useForm<ProfileValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const onValid: SubmitHandler<ProfileValues> = (data) => {
    setSubmittedValues(data);
  };

  const onInvalid = (formErrors: FieldErrors<ProfileValues>) => {
    console.log('Validation errors:', formErrors);
  };

  function handleReset() {
    reset(DEFAULT_VALUES);
    setSubmittedValues(null);
  }
  return (
    <Form onSubmit={handleSubmit(onValid, onInvalid)} className="max-w-4xl flex">
      <div className="space-y-4 flex-1">
        <Input
          id="profile-name"
          placeholder="Например, Alex"
          {...register('name', {
            required: 'Имя обязательно.',
            minLength: {
              value: 2,
              message: 'Минимум 2 символа.',
            },
          })}
          error={errors.name?.message}
        />

        <Input
          id="profile-email"
          type="email"
          placeholder="alex@example.com"
          {...register('email', {
            required: 'Email обязателен.',
            pattern: {
              value: /^\S+@\S+\.\S+$/i,
              message: 'Введи корректный email.',
            },
          })}
          error={errors.email?.message}
        />

        <Input
          id="profile-city"
          placeholder="Город"
          {...register('city', {
            required: 'Город обязателен.',
            minLength: {
              value: 2,
              message: 'Минимум 2 символа.',
            },
          })}
          error={errors.city?.message}
        />

        <select
          id="profile-role"
          {...register('role')}
          className="w-full rounded-xl border-2 border-white/10 bg-transparent px-4 py-2.5 text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="frontend" className="bg-neutral-900">
            Frontend
          </option>
          <option value="backend" className="bg-neutral-900">
            Backend
          </option>
          <option value="design" className="bg-neutral-900">
            Design
          </option>
        </select>
        <Button type="submit" variant="primary" title="Submit" disabled={!isDirty} />
        <Button
          type="button"
          variant="outline"
          title="Сбросить"
          onClick={handleReset}
          disabled={!isDirty}
        />
      </div>
      <div className="space-y-4 ml-8 flex-1">
        <aside className="space-y-4 rounded-xl border-2 border-white/10 bg-white/3 p-5">
          <div>
            <p className="text-xs text-white/45">isDirty</p>
            <p className="mt-1 font-mono text-lg">{String(isDirty)}</p>
          </div>

          <div>
            <p className="text-xs text-white/45">isValid</p>
            <p className="mt-1 font-mono text-lg">{String(isValid)}</p>
          </div>

          <div>
            <p className="text-xs text-white/45">submitCount</p>
            <p className="mt-1 font-mono text-lg">{submitCount}</p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-xs text-white/45">Последний успешный submit</p>

            <pre className="mt-2 overflow-auto rounded-lg bg-black/25 p-3 text-xs leading-6 text-blue-100/80">
              {submittedValues ? JSON.stringify(submittedValues, null, 2) : 'Пока нет данных'}
            </pre>
          </div>
        </aside>
      </div>
    </Form>
  );
}
