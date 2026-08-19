import { Route, Routes } from 'react-router-dom';
import { PAGES } from '@/shared/config';
import { Layout } from '@/Layout';
import { Home } from './Home/Home';
import { CourseReact } from './CourseReact/CourseReact';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PAGES.HOME} element={<Home />} />
        <Route path={PAGES.COURSE_REACT} element={<CourseReact />} />
      </Routes>
    </Layout>
  );
}
