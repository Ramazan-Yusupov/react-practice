import { useAuth } from '@clerk/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError, apiFetch } from '@/shared/api/http';
import { profileSchema, type UpdateProfileInput } from '@/shared/api/profile.schemas';

export const profileKeys = {
  all: ['profile'] as const,
  // userId в ключе: при смене аккаунта кэш предыдущего пользователя не покажется
  me: (userId: string | null | undefined) => [...profileKeys.all, 'me', userId] as const,
  publicAll: () => [...profileKeys.all, 'public'] as const,
  public: (username: string) => [...profileKeys.publicAll(), username] as const,
};

export function useMyProfile() {
  const { getToken, isLoaded, isSignedIn, userId } = useAuth();

  return useQuery({
    queryKey: profileKeys.me(userId),
    queryFn: async () => apiFetch('/me', profileSchema, { token: await getToken() }),
    enabled: isLoaded && isSignedIn === true,
  });
}

export function usePublicProfile(username: string) {
  return useQuery({
    queryKey: profileKeys.public(username),
    queryFn: () =>
      apiFetch(`/profiles/${encodeURIComponent(username)}`, profileSchema, { token: null }),
    // 404 и прочие 4xx повторять бессмысленно
    retry: (failureCount, error) =>
      !(error instanceof ApiError && error.status < 500) && failureCount < 2,
  });
}

export function useUpdateProfile() {
  const { getToken, userId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateProfileInput) =>
      apiFetch('/me', profileSchema, { method: 'PATCH', token: await getToken(), body: input }),
    onSuccess: (profile) => {
      queryClient.setQueryData(profileKeys.me(userId), profile);
      void queryClient.invalidateQueries({ queryKey: profileKeys.publicAll() });
    },
  });
}
