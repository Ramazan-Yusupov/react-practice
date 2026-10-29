import { useParams } from 'react-router-dom';
import { ProfileCard } from '@/entities/profile/ProfileCard';
import { usePublicProfile } from '@/entities/profile/useProfile';
import { ApiError } from '@/shared/api/http';
import { ErrorUI, LoadingUI } from '@/shared/ui';

export function PublicProfile() {
  const { username = '' } = useParams<{ username: string }>();
  const { data: profile, isPending, isError, error } = usePublicProfile(username);

  if (isPending) return <LoadingUI isLoading />;

  if (isError) {
    if (error instanceof ApiError && error.status === 404) {
      return <p className="text-gray-400">Профиль @{username} не найден</p>;
    }
    return <ErrorUI isError text={error.message} />;
  }

  return <ProfileCard profile={profile} />;
}
