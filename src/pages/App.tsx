import { Route, Routes } from 'react-router-dom';
import { PAGES } from '@/shared/config';
import { Layout } from '@/Layout';
import { Home } from './Home/Home';
import { Profile } from './Profile/Profile';
import { PublicProfile } from './PublicProfile/PublicProfile';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PAGES.HOME} element={<Home />} />
        <Route path={PAGES.PROFILE} element={<Profile />} />
        <Route path={PAGES.PUBLIC_PROFILE} element={<PublicProfile />} />
      </Routes>
    </Layout>
  );
}
