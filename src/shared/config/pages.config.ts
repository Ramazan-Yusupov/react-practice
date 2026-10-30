export const PAGES = {
  HOME: '/',
  PROFILE: '/profile',
  PUBLIC_PROFILE: '/u/:username',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

export const profilePath = (username: string) => `/u/${username}`;
