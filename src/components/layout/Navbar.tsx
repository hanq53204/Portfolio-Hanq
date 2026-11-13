import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, Moon, ShieldCheck, Sun, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { portfolioData } from '../../data/portfolioData';
import type { SectionId } from '../../types';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage } = useApp();
  const content = portfolioData[language];
  const { nav } = content;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sectionIds: SectionId[] = ['home', 'about', 'projects', 'experience', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 16);

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 40) {
        setActiveSection('contact');
        return;
      }

      const triggerOffset = 180;
      let current: SectionId = 'home';

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= triggerOffset) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: SectionId,
    href: string
  ) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
    }
  };

  return (
    <header className="fixed top-4 left-4 right-4 z-50 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <nav
          aria-label={nav.brandName}
          className={`relative overflow-hidden rounded-2xl px-4 sm:px-6 py-3 backdrop-blur-md border transition-colors duration-200 ${
            scrolled
              ? 'bg-white/95 dark:bg-[#161B22]/95 border-[#D0D7DE] dark:border-[#30363D] dark:border-t-white/10 shadow-sm dark:shadow-lg dark:shadow-black/20'
              : 'bg-white/90 dark:bg-[#161B22]/90 border-[#D0D7DE] dark:border-[#30363D] dark:border-t-white/10'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Brand Identity */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home', '#home')}
              className="group flex items-center gap-2.5 cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 dark:bg-blue-500/10 border border-blue-600/20 dark:border-blue-500/25 text-blue-600 dark:text-blue-400 transition-colors duration-200 group-hover:border-blue-600/40 dark:group-hover:border-blue-400/50">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm sm:text-base font-bold tracking-tight text-[#1F2328] dark:text-[#F0F6FC]">
                  {nav.brandName}
                </span>
                <span className="font-mono text-[11px] font-medium text-blue-600 dark:text-blue-400">
                  {nav.brandTag}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center gap-1">
              {nav.links.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id, link.href)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative px-3.5 py-2 rounded-xl text-sm font-medium border cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        isActive
                          ? 'text-blue-700 dark:text-blue-400 bg-blue-600/10 dark:bg-blue-500/10 border-blue-600/20 dark:border-blue-500/25'
                          : 'text-[#57606A] dark:text-[#8B949E] border-transparent hover:text-[#1F2328] dark:hover:text-[#F0F6FC] hover:bg-[#F6F8FA] dark:hover:bg-[#1C2128]'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Global Controls: Language Switcher + Theme Toggle + Mobile Menu Button */}
            <div className="flex items-center gap-2">
              {/* Bilingual Segmented Switcher (VI | EN) */}
              <div
                role="group"
                aria-label={nav.languageAriaLabel}
                className="inline-flex items-center rounded-xl p-1 bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D]"
              >
                <button
                  type="button"
                  onClick={() => setLanguage('vi')}
                  aria-pressed={language === 'vi'}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    language === 'vi'
                      ? 'bg-white dark:bg-[#161B22] text-blue-600 dark:text-blue-400 shadow-sm border border-[#D0D7DE] dark:border-[#30363D]'
                      : 'text-[#57606A] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-[#F0F6FC] border border-transparent'
                  }`}
                >
                  VI
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    language === 'en'
                      ? 'bg-white dark:bg-[#161B22] text-blue-600 dark:text-blue-400 shadow-sm border border-[#D0D7DE] dark:border-[#30363D]'
                      : 'text-[#57606A] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-[#F0F6FC] border border-transparent'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Theme Switcher (Dark / Light) */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? nav.themeToLightLabel : nav.themeToDarkLabel}
                title={theme === 'dark' ? nav.themeToLightLabel : nav.themeToDarkLabel}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D] text-[#57606A] dark:text-[#8B949E] hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? nav.menuCloseLabel : nav.menuOpenLabel}
                className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D] text-[#57606A] dark:text-[#8B949E] hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Menu className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="overflow-hidden md:hidden"
              >
                <ul className="mt-3 pt-3 border-t border-[#D0D7DE] dark:border-[#30363D] flex flex-col gap-1">
                  {nav.links.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <li key={link.id}>
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.id, link.href)}
                          aria-current={isActive ? 'location' : undefined}
                          className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium border cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                            isActive
                              ? 'text-blue-700 dark:text-blue-400 bg-blue-600/10 dark:bg-blue-500/10 border-blue-600/20 dark:border-blue-500/25'
                              : 'text-[#57606A] dark:text-[#8B949E] border-transparent hover:text-[#1F2328] dark:hover:text-[#F0F6FC] hover:bg-[#F6F8FA] dark:hover:bg-[#1C2128]'
                          }`}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom-Edge Scroll Progress Bar */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D0D7DE]/45 dark:bg-[#30363D]/60"
          >
            <motion.div
              style={{ scaleX, transformOrigin: '0% 50%' }}
              className="h-full w-full bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#06B6D4]"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};
