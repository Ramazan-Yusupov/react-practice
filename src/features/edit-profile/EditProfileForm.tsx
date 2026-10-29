import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUpdateProfile } from '@/entities/profile/useProfile';
import { ApiError } from '@/shared/api/http';
import {
  updateProfileSchema,
  type Profile,
  type UpdateProfileInput,
} from '@/shared/api/profile.schemas';
import { Button, Form, Input } from '@/shared/ui';

interface EditProfileFormProps {
  profile: Profile;
  onDone: () => void;
}

export function EditProfileForm({ profile, onDone }: EditProfileFormProps) {
  const { mutate, isPending, isError, error } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: profile.username,
      displayName: profile.displayName,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      bannerColor: profile.bannerColor,
    },
  });

  const onSubmit = handleSubmit((values) => {
    mutate(values, {
      onSuccess: onDone,
      onError: (err) => {
        // 409: username занят, показываем ошибку прямо под полем
        const message = err instanceof ApiError ? err.fieldErrors?.username?.[0] : undefined;
        if (message) setError('username', { message });
      },
    });
  });

  return (
    <Form onSubmit={onSubmit} className="w-full max-w-xl">
      <Input placeholder="Имя" error={errors.displayName?.message} {...register('displayName')} />
      <Input
        placeholder="username"
        iconLeft="@"
        error={errors.username?.message}
        {...register('username')}
      />

      <div>
        <textarea
          rows={3}
          placeholder="О себе"
          className="w-full rounded-xl border-2 border-white/10 bg-transparent px-4 py-2.5 outline-none placeholder:text-gray-500 focus:border-slate-500"
          {...register('bio')}
        />
        {errors.bio && (
          <span className="ml-1 block text-xs text-red-400">{errors.bio.message}</span>
        )}
      </div>

      <Input placeholder="Город" error={errors.location?.message} {...register('location')} />
      <Input
        placeholder="https://site.com"
        error={errors.website?.message}
        {...register('website')}
      />

      <label className="flex items-center justify-between gap-4 text-sm text-gray-400">
        Цвет шапки
        <input type="color" className="h-10 w-20 cursor-pointer" {...register('bannerColor')} />
      </label>

      {isError && !(error instanceof ApiError && error.fieldErrors) && (
        <p className="text-sm text-red-400">{error.message}</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" variant="primary" title="Сохранить" isLoading={isPending} />
        <Button variant="ghost" title="Отмена" onClick={onDone} />
      </div>
    </Form>
  );
}
