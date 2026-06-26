import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Layout from './components/Layout';
import { captureUtmParams } from './lib/utmTracking';

const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'));
const ServiceLocation = React.lazy(() => import('./pages/ServiceLocation'));
const LocationPage = React.lazy(() => import('./pages/LocationPage'));
const IndustryDetail = React.lazy(() => import('./pages/IndustryDetail'));
const Compare = React.lazy(() => import('./pages/Compare'));
const LearnHub = React.lazy(() => import('./pages/LearnHub'));
const AuthorProfile = React.lazy(() => import('./pages/AuthorProfile'));
const AIAutomation = React.lazy(() => import('./pages/AIAutomation'));
const CaseStudies = React.lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = React.lazy(() => import('./pages/CaseStudyDetail'));
const Contact = React.lazy(() => import('./pages/Contact'));
const About = React.lazy(() => import('./pages/About'));
const Industries = React.lazy(() => import('./pages/Industries'));
const Team = React.lazy(() => import('./pages/Team'));
const TeamMember = React.lazy(() => import('./pages/TeamMember'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const FreeAudit = React.lazy(() => import('./pages/FreeAudit'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Glossary = React.lazy(() => import('./pages/Glossary'));
const FAQHub = React.lazy(() => import('./pages/FAQHub'));
const SeoDashboard = React.lazy(() => import('./pages/SeoDashboard'));
const ReviewUs = React.lazy(() => import('./pages/ReviewUs'));
const ThankYou = React.lazy(() => import('./pages/ThankYou'));
const HtmlSitemap = React.lazy(() => import('./pages/HtmlSitemap'));

const AnalyticsTracker = () => {
  const location = useLocation();

  // Capture first-touch UTM attribution once, on first load (Task 8). Idempotent.
  useEffect(() => {
    captureUtmParams();
  }, []);

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
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="services/:slug/:location" element={<ServiceLocation />} />
            <Route path="locations/:slug" element={<LocationPage />} />
            <Route path="ai-automation" element={<AIAutomation />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="about" element={<About />} />
            <Route path="industries" element={<Industries />} />
            <Route path="industries/:slug" element={<IndustryDetail />} />
            <Route path="compare" element={<Compare />} />
            <Route path="compare/:slug" element={<Compare />} />
            <Route path="learn" element={<LearnHub />} />
            <Route path="learn/:slug" element={<LearnHub />} />
            <Route path="authors/:slug" element={<AuthorProfile />} />
            <Route path="contact" element={<Contact />} />
            <Route path="contact/thank-you" element={<ThankYou />} />
            <Route path="team" element={<Team />} />
            <Route path="team/:slug" element={<TeamMember />} />
            <Route path="free-audit" element={<FreeAudit />} />
            <Route path="free-audit/thank-you" element={<ThankYou />} />
            <Route path="service-inquiry/thank-you" element={<ThankYou />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="review-us" element={<ReviewUs />} />
            <Route path="sitemap" element={<HtmlSitemap />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="glossary" element={<Glossary />} />
            <Route path="faqs" element={<FAQHub />} />
            <Route path="seo-dashboard" element={<SeoDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
