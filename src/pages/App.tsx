import { Route, Routes } from 'react-router-dom';
import { PAGES } from '@/shared/config';
import { Layout } from '@/Layout';
import { Gsap } from './Gsap/Gsap';
import { HookForm } from './HookForm/HookForm';
import { JsPractice } from './JsPractice/JsPractice';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PAGES.GSAP} element={<Gsap />} />
        <Route path={PAGES.HOOK_FORM} element={<HookForm />} />
        <Route path={PAGES.JS_PRACTICE} element={<JsPractice />} />
      </Routes>
    </Layout>
  );
}
