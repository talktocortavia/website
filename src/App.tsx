import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import UseCases from './pages/UseCases';
import UseCaseDetail from './pages/UseCaseDetail';
import Services from './pages/Services';
import About from './pages/About';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import { policies } from './content/policies';

export default function App() {
  const location = useLocation();
  // The location is passed explicitly so a page keeps its own content while it fades out.
  return (
    <Layout>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/use-cases/:slug" element={<UseCaseDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        {policies.map((p) => (
          <Route key={p.slug} path={`/${p.slug}/privacy`} element={<Privacy slug={p.slug} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
