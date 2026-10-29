export const PAGES = {
  HOME: '/',
  PROFILE: '/profile',
  PUBLIC_PROFILE: '/u/:username',
} as const;

export const profilePath = (username: string) => `/u/${username}`;
