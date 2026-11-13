import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { portfolioData } from '../../data/portfolioData';
import { InteractiveTerminal } from '../ui/InteractiveTerminal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export const HeroSection: React.FC = () => {
  const { language } = useApp();
  const { hero } = portfolioData[language];
  const [showCvNotice, setShowCvNotice] = useState(false);

  const isPlaceholderCv = hero.cvUrl.startsWith('#');

  const handleCvClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPlaceholderCv) {
      e.preventDefault();
      setShowCvNotice((prev) => !prev);
    }
  };

  return (
    <section
      id="home"
      className="relative pt-32 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden"
    >
      {/* Subtle Spotlight Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 h-[440px] w-[820px] rounded-full bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-transparent blur-[110px]"
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Intro, Value Prop & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-8"
          >
            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="font-mono text-base sm:text-lg font-medium text-cyan-700 dark:text-cyan-400">
                {hero.greeting}
              </p>
              <h1 className="text-4xl sm:text-5xl xl:text-[3.4rem] font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.12]">
                {hero.name}
                <span className="block mt-3 text-2xl sm:text-3xl xl:text-[2rem] font-bold leading-snug bg-gradient-to-r from-emerald-700 via-cyan-700 to-emerald-700 dark:from-emerald-400 dark:via-cyan-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  {hero.role}
                </span>
              </h1>
            </motion.div>

            {/* Summary */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-[1.75] max-w-xl"
            >
              {hero.summary}
            </motion.p>

            {/* Call-to-Action Buttons */}
            <motion.div variants={itemVariants} className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-base bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 shadow-sm dark:shadow-glow-emerald cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                >
                  <span>{hero.ctaProjects}</span>
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>

                <a
                  href={hero.cvUrl}
                  download={!isPlaceholderCv ? true : undefined}
                  onClick={handleCvClick}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-base bg-white/90 dark:bg-slate-900/70 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-600/50 dark:hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-300 shadow-sm dark:shadow-none backdrop-blur-md cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  <span>{hero.ctaCv}</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold text-base text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  <span>{hero.ctaContact}</span>
                </a>
              </div>

              {showCvNotice && (
                <div
                  aria-live="polite"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-600/10 dark:bg-cyan-500/10 border border-cyan-600/25 dark:border-cyan-500/30 text-xs font-medium text-cyan-800 dark:text-cyan-300"
                >
                  <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{hero.cvNotice}</span>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Ubuntu Terminal + Spotlight Backdrop */}
          <div className="lg:col-span-6 relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent blur-2xl opacity-70 dark:opacity-90"
            />
            <div className="relative">
              <InteractiveTerminal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

