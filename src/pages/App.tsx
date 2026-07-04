import { Route, Routes } from 'react-router-dom';
import { PAGES } from '@/shared/config';
import { Layout } from '@/Layout';
import { Gsap } from './Gsap/Gsap';
import { HookForm } from './HookForm/HookForm';
import { JsPractice } from './JsPractice/JsPractice';
import { ScrollChoreography } from './ScrollChoreography/ScrollChoreography';
import { AsyncInbox } from './AsyncInbox/AsyncInbox';
import { FocusDeck } from './FocusDeck/FocusDeck';
import { PaletteSniper } from './PaletteSniper/PaletteSniper';
import { RouteMorphing } from './RouteMorphing/RouteMorphing';
import { LocalCodeNotebook } from './LocalCodeNotebook/LocalCodeNotebook';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PAGES.GSAP} element={<Gsap />} />
        <Route path={PAGES.HOOK_FORM} element={<HookForm />} />
        <Route path={PAGES.JS_PRACTICE} element={<JsPractice />} />
        <Route path={PAGES.SCROLL_CHOREOGRAPHY} element={<ScrollChoreography />} />
        <Route path={PAGES.ASYNC_INBOX} element={<AsyncInbox />} />
        <Route path={PAGES.FOCUS_DECK} element={<FocusDeck />} />
        <Route path={PAGES.PALETTE_SNIPER} element={<PaletteSniper />} />
        <Route path={PAGES.ROUTE_MORPHING} element={<RouteMorphing />} />
        <Route path={`${PAGES.ROUTE_MORPHING}/:caseId`} element={<RouteMorphing />} />
        <Route path={PAGES.LOCAL_CODE_NOTEBOOK} element={<LocalCodeNotebook />} />
      </Routes>
    </Layout>
  );
}
