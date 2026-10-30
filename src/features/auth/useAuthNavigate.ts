import type { useSignIn } from '@clerk/react';
import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { safeRedirect } from '@/shared/lib/safeRedirect';
import { PAGES } from '@/shared/config';

type FinalizeParams = NonNullable<
  Parameters<ReturnType<typeof useSignIn>['signIn']['finalize']>[0]
>;
type NavigateAfterAuth = NonNullable<FinalizeParams['navigate']>;

export function useAuthNavigate(onPendingTask: () => void) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const target = safeRedirect(params.get('redirect'), PAGES.PROFILE);

  return useCallback<NavigateAfterAuth>(
    ({ session, decorateUrl }) => {
      if (session.currentTask) {
        onPendingTask();
        return;
      }
      const url = decorateUrl(target);
      if (url.startsWith('http')) {
        window.location.href = url;
      } else {
        void navigate(url, { replace: true });
      }
    },
    [navigate, onPendingTask, target],
  );
}
