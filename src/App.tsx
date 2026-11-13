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
  }, [content.metaTitle]);

  return (
    <div className="relative min-h-screen flex flex-col bg-secops-lightBg dark:bg-secops-bg text-slate-900 dark:text-slate-50 transition-colors duration-200">
      {/* Subtle Technical Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-tech-grid opacity-80 dark:opacity-100"
      />

      <Navbar />

      <main className="relative z-10 flex-1">
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
