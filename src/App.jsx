import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Layout from './components/Layout';

const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const CaseStudies = React.lazy(() => import('./pages/CaseStudies'));
const Contact = React.lazy(() => import('./pages/Contact'));
const About = React.lazy(() => import('./pages/About'));
const Industries = React.lazy(() => import('./pages/Industries'));
const TeamMember = React.lazy(() => import('./pages/TeamMember'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const FreeAudit = React.lazy(() => import('./pages/FreeAudit'));
const CaseStudyMaatritva = React.lazy(() => import('./pages/CaseStudyMaatritva'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

const AnalyticsTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
  
  return null;
};

function App() {
  return (
    <Router>
      <AnalyticsTracker />
      <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white/50 text-xs tracking-widest uppercase">Loading Core...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="about" element={<About />} />
            <Route path="industries" element={<Industries />} />
            <Route path="contact" element={<Contact />} />
            <Route path="team/:slug" element={<TeamMember />} />
            <Route path="free-audit" element={<FreeAudit />} />
            <Route path="case-studies/maatritva" element={<CaseStudyMaatritva />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
