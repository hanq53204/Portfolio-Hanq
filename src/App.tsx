import React, { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';

const AppShell: React.FC = () => {
  const { language } = useApp();
  const content = portfolioData[language];

  useEffect(() => {
    document.title = content.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', content.metaDescription);
    }
  }, [content.metaTitle, content.metaDescription]);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-[#F0F6FC] transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-blue-600 focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {content.nav.skipToContentLabel}
      </a>

      {/* Subtle Technical Dot-Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-dot-grid"
      />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 focus:outline-none">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <AppShell />
      </AppProvider>
    </MotionConfig>
  );
}

export default App;
