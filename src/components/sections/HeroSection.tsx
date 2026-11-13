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
              <p className="font-mono text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">
                {hero.greeting}
              </p>
              <h1 className="text-4xl sm:text-5xl xl:text-[3.4rem] font-extrabold tracking-tight text-[#1F2328] dark:text-[#F0F6FC] leading-[1.12]">
                {hero.name}
                <span className="block mt-3 text-2xl sm:text-3xl xl:text-[2rem] font-bold leading-snug text-blue-600 dark:text-blue-400">
                  {hero.role}
                </span>
              </h1>
            </motion.div>

            {/* Summary */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-[#57606A] dark:text-[#8B949E] leading-relaxed sm:leading-[1.75] max-w-xl"
            >
              {hero.summary}
            </motion.p>

            {/* Call-to-Action Buttons */}
            <motion.div variants={itemVariants} className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-base bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-sm cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F8FA] dark:focus-visible:ring-offset-[#0D1117]"
                >
                  <span>{hero.ctaProjects}</span>
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>

                <a
                  href={hero.cvUrl}
                  download={!isPlaceholderCv ? true : undefined}
                  onClick={handleCvClick}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-base bg-white dark:bg-[#161B22] text-[#1F2328] dark:text-[#F0F6FC] border border-[#D0D7DE] dark:border-[#30363D] dark:border-t-white/10 hover:bg-[#F6F8FA] dark:hover:bg-[#1C2128] hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  <span>{hero.ctaCv}</span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold text-base text-[#57606A] dark:text-[#8B949E] hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/10 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  <span>{hero.ctaContact}</span>
                </a>
              </div>

              {showCvNotice && (
                <div
                  aria-live="polite"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-700 dark:text-blue-300"
                >
                  <ShieldCheck className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span>{hero.cvNotice}</span>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Ubuntu Terminal + Subtle Blue/Cyan Ambient Glow */}
          <div className="lg:col-span-6 relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),rgba(6,182,212,0.09)_45%,transparent_72%)] blur-2xl opacity-75 dark:opacity-100"
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

