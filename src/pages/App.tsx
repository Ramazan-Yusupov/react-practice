import { Route, Routes } from 'react-router-dom';
import { Home } from './Home/Home';
import { PAGES } from '@/config';
import { Layout } from '@/Layout';
import { Zustand } from './Zustand/Zustand';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PAGES.HOME} element={<Home />} />
        <Route path={PAGES.ZUSTAND} element={<Zustand />} />
      </Routes>
    </Layout>
  );
}
