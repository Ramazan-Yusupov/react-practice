import { ClerkProvider } from '@clerk/react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '@/shared/config';

export function ClerkWithRouter({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      routerPush={(to) => void navigate(to)}
      routerReplace={(to) => void navigate(to, { replace: true })}
      signInUrl={PAGES.SIGN_IN}
      signUpUrl={PAGES.SIGN_UP}
      afterSignOutUrl={PAGES.HOME}
    >
      {children}
    </ClerkProvider>
  );
}
