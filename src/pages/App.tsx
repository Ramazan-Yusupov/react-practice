import { Route, Routes } from 'react-router-dom';
import { PAGES } from '@/shared/config';
import { Layout } from '@/Layout';
import { Gsap } from './Gsap/Gsap';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PAGES.GSAP} element={<Gsap />} />
      </Routes>
    </Layout>
  );
}
