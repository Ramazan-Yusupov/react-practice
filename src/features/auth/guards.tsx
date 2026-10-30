import { useAuth } from '@clerk/react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PAGES } from '@/shared/config';
import { LoadingUI } from '@/shared/ui';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) return <LoadingUI isLoading />;
  if (!isSignedIn) {
    const back = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${PAGES.SIGN_IN}?redirect=${back}`} replace />;
  }
  return children;
}

export function GuestOnly({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <LoadingUI isLoading />;
  if (isSignedIn) return <Navigate to={PAGES.PROFILE} replace />;
  return children;
}
