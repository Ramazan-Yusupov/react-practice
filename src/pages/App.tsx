import { Route, Routes } from 'react-router-dom';
import { PAGES } from '@/shared/config';
import { Layout } from '@/Layout';
import { Home } from './Home/Home';
import { ReactQuery } from './ReactQuery/ReactQuery';
import { TypeScriptPage } from './TypeScriptPage/TypeScriptPage';
import { JSPage } from './JSPage/JSPage';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PAGES.HOME} element={<Home />} />
        <Route path={PAGES.JSPAGE} element={<JSPage />} />
        <Route path={PAGES.REACT_QUERY} element={<ReactQuery />} />
        <Route path={PAGES.TYPESCRIPT_PAGE} element={<TypeScriptPage />} />
      </Routes>
    </Layout>
  );
}
