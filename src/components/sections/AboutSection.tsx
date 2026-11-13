import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  BookOpen,
  CheckCircle2,
  Cpu,
  Server,
  Shield,
  Terminal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { portfolioData } from '../../data/portfolioData';
import { SectionHeading } from '../ui/SectionHeading';
import type { SkillIconKey } from '../../types';

const skillIconMap: Record<SkillIconKey, React.ReactNode> = {
  server: <Server className="h-5 w-5" aria-hidden="true" />,
  activity: <Activity className="h-5 w-5" aria-hidden="true" />,
  shield: <Shield className="h-5 w-5" aria-hidden="true" />,
  terminal: <Terminal className="h-5 w-5" aria-hidden="true" />,
};

export const AboutSection: React.FC = () => {
  const { language } = useApp();
  const { about } = portfolioData[language];

  return (
    <section
      id="about"
      className="scroll-mt-28 py-16 sm:py-24 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          subtitle={about.subtitle}
        />

        {/* Top Bento Row: Story & Empirical Troubleshooting + Core Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Story & Key Stats Bento Tile */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="lg:col-span-7 bento-card relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between gap-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl"
            />

            <div className="relative space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/10 dark:bg-emerald-500/15 border border-emerald-600/25 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 shrink-0">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50">
                  {about.storyTitle}
                </h3>
              </div>

              <div className="space-y-3">
                {about.storyParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Compact Bento Stat Row */}
            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 px-4 py-3"
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.article>

          {/* Engineering Principles Bento Tile */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
            className="lg:col-span-5 bento-card relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between gap-6 hover:border-cyan-600/50 dark:hover:border-cyan-500/50"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl"
            />

            <div className="relative space-y-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600/10 dark:bg-cyan-500/15 border border-cyan-600/25 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 shrink-0">
                  <Terminal className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50">
                  {about.methodologyTitle}
                </h3>
              </div>

              <ul className="space-y-4">
                {about.methodologyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      className="h-5 w-5 mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </div>

        {/* Skills Matrix Bento Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Cpu className="h-5 w-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {about.skillsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {about.skillGroups.map((group, index) => {
              const isEmerald = group.accent === 'emerald';
              const hoverBorderClass = isEmerald
                ? 'hover:border-emerald-600/50 dark:hover:border-emerald-500/50'
                : 'hover:border-cyan-600/50 dark:hover:border-cyan-500/50';
              const iconBoxClass = isEmerald
                ? 'bg-emerald-600/10 dark:bg-emerald-500/15 border-emerald-600/25 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                : 'bg-cyan-600/10 dark:bg-cyan-500/15 border-cyan-600/25 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400';
              const tagHoverClass = isEmerald
                ? 'hover:border-emerald-600/40 dark:hover:border-emerald-500/40 hover:text-emerald-800 dark:hover:text-emerald-300'
                : 'hover:border-cyan-600/40 dark:hover:border-cyan-500/40 hover:text-cyan-800 dark:hover:text-cyan-300';

              return (
                <motion.article
                  key={group.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.06,
                    ease: 'easeOut',
                  }}
                  className={`bento-card p-6 sm:p-7 space-y-5 ${hoverBorderClass}`}
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border shrink-0 ${iconBoxClass}`}
                    >
                      {skillIconMap[group.icon]}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50">
                        {group.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        {group.subtitle}
                      </p>
                    </div>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium bg-slate-100 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 transition-colors duration-200 ${tagHoverClass}`}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

