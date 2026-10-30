import { Route, Routes } from 'react-router-dom';
import { GuestOnly, RequireAuth } from '@/features/auth/guards';
import { PAGES } from '@/shared/config';
import { Layout } from '@/Layout';
import { ForgotPassword } from './ForgotPassword/ForgotPassword';
import { Home } from './Home/Home';
import { Profile } from './Profile/Profile';
import { PublicProfile } from './PublicProfile/PublicProfile';
import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignUp/SignUp';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PAGES.HOME} element={<Home />} />
        <Route path={PAGES.PUBLIC_PROFILE} element={<PublicProfile />} />

        <Route
          path={PAGES.PROFILE}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route
          path={PAGES.SIGN_IN}
          element={
            <GuestOnly>
              <SignIn />
            </GuestOnly>
          }
        />
        <Route
          path={PAGES.SIGN_UP}
          element={
            <GuestOnly>
              <SignUp />
            </GuestOnly>
          }
        />
        <Route
          path={PAGES.FORGOT_PASSWORD}
          element={
            <GuestOnly>
              <ForgotPassword />
            </GuestOnly>
          }
        />
      </Routes>
    </Layout>
  );
}
