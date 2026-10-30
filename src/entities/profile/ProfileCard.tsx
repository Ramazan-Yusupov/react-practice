import type { ReactNode } from 'react';
import type { Profile } from '@/shared/api/profile.schemas';
import { Avatar, Card } from '@/shared/ui';

interface ProfileCardProps {
  profile: Profile;
  actions?: ReactNode;
}

export function ProfileCard({ profile, actions }: ProfileCardProps) {
  const joined = new Date(profile.createdAt).toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Card border="2px" maxWidth="3xl">
      <div className="h-32" style={{ backgroundColor: profile.bannerColor }} />

      <div className="px-5 pb-5">
        <div className="-mt-12 flex items-end justify-between">
          <Avatar
            src={profile.avatarUrl}
            alt={profile.displayName}
            initials={profile.displayName.charAt(0).toUpperCase()}
            size="xl"
            className="h-24 w-24 border-4 border-[#0a0a0a] text-3xl"
          />
          {actions}
        </div>

        <h2 className="mt-3 text-xl font-bold">{profile.displayName}</h2>
        <p className="text-gray-500">@{profile.username}</p>

        {profile.bio && <p className="mt-3 whitespace-pre-wrap">{profile.bio}</p>}

        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
          {profile.location && <li>{profile.location}</li>}
          {profile.website && (
            <li>
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {profile.website.replace(/^https?:\/\//, '')}
              </a>
            </li>
          )}
          <li>На платформе с {joined}</li>
        </ul>
      </div>
    </Card>
  );
}
