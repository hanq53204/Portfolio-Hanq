import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

  useEffect(() => {
    const sectionIds: SectionId[] = ['home', 'about', 'projects', 'experience', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 16);

      // Highlight the last section if the user reached the bottom of the page
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
          className={`rounded-2xl px-4 sm:px-6 py-3 backdrop-blur-xl border transition-all duration-200 ${
            scrolled
              ? 'bg-white/90 dark:bg-slate-900/85 border-slate-200 dark:border-slate-800/90 shadow-glass-light dark:shadow-glass-dark'
              : 'bg-white/80 dark:bg-slate-900/65 border-slate-200/80 dark:border-slate-800/70 shadow-sm dark:shadow-none'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Brand Identity */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home', '#home')}
              className="group flex items-center gap-2.5 cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600/10 dark:bg-emerald-500/15 border border-emerald-600/25 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 transition-colors duration-200 group-hover:border-emerald-500/60">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  {nav.brandName}
                </span>
                <span className="font-mono text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
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
                      className={`relative px-3.5 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        isActive
                          ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-600/10 dark:bg-emerald-500/10'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
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
                className="inline-flex items-center rounded-xl p-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70"
              >
                <button
                  type="button"
                  onClick={() => setLanguage('vi')}
                  aria-pressed={language === 'vi'}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    language === 'vi'
                      ? 'bg-white dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 shadow-sm border border-slate-200/80 dark:border-emerald-500/40'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent'
                  }`}
                >
                  VI
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    language === 'en'
                      ? 'bg-white dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 shadow-sm border border-slate-200/80 dark:border-emerald-500/40'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent'
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
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 text-slate-700 dark:text-slate-200 hover:border-emerald-600/50 dark:hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
                className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 text-slate-700 dark:text-slate-200 hover:border-emerald-600/50 dark:hover:border-emerald-500/50 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
                <ul className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                  {nav.links.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <li key={link.id}>
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.id, link.href)}
                          aria-current={isActive ? 'location' : undefined}
                          className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                            isActive
                              ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-600/10 dark:bg-emerald-500/10'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
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
        </nav>
      </div>
    </header>
  );
};

