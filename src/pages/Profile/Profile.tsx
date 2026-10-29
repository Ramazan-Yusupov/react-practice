import { useAuth } from '@clerk/react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ProfileCard } from '@/entities/profile/ProfileCard';
import { useMyProfile } from '@/entities/profile/useProfile';
import { EditProfileForm } from '@/features/edit-profile/EditProfileForm';
import { PAGES, profilePath } from '@/shared/config';
import { Button, ErrorUI, LoadingUI } from '@/shared/ui';

export function Profile() {
  const { isLoaded, isSignedIn } = useAuth();
  const { data: profile, isPending, isError, error } = useMyProfile();
  const [isEditing, setIsEditing] = useState(false);

  if (!isLoaded) return <LoadingUI isLoading />;
  if (!isSignedIn) return <Navigate to={PAGES.HOME} replace />;
  if (isPending) return <LoadingUI isLoading />;
  if (isError) return <ErrorUI isError text={error.message} />;

  if (isEditing) {
    return <EditProfileForm profile={profile} onDone={() => setIsEditing(false)} />;
  }

  return (
    <div className="flex flex-col gap-3">
      <ProfileCard
        profile={profile}
        actions={<Button size="sm" title="Редактировать" onClick={() => setIsEditing(true)} />}
      />
      <Link to={profilePath(profile.username)} className="text-sm text-blue-500 hover:underline">
        Как видят другие
      </Link>
    </div>
  );
}
