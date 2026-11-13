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

const skillThemeMap: Record<
  SkillIconKey,
  { iconBox: string; tag: string }
> = {
  server: {
    iconBox: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    tag: 'bg-blue-500/[0.07] dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20 hover:border-blue-500/45',
  },
  activity: {
    iconBox: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400',
    tag: 'bg-amber-500/[0.07] dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20 hover:border-amber-500/45',
  },
  shield: {
    iconBox: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400',
    tag: 'bg-emerald-500/[0.07] dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20 hover:border-emerald-500/45',
  },
  terminal: {
    iconBox: 'bg-sky-500/10 border-sky-500/20 text-sky-700 dark:text-sky-400',
    tag: 'bg-sky-500/[0.07] dark:bg-sky-500/10 text-sky-800 dark:text-sky-300 border-sky-500/20 hover:border-sky-500/45',
  },
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
            className="lg:col-span-7 bento-card p-6 sm:p-8 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#1F2328] dark:text-[#F0F6FC]">
                  {about.storyTitle}
                </h3>
              </div>

              <div className="space-y-3">
                {about.storyParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base text-[#57606A] dark:text-[#8B949E] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Compact Bento Stat Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#D0D7DE] dark:border-[#30363D]">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D] px-4 py-3"
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
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
            className="lg:col-span-5 bento-card p-6 sm:p-8 flex flex-col justify-between gap-6"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 shrink-0">
                  <Terminal className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#1F2328] dark:text-[#F0F6FC]">
                  {about.methodologyTitle}
                </h3>
              </div>

              <ul className="space-y-4">
                {about.methodologyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      className="h-5 w-5 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    <span className="text-sm sm:text-base text-[#57606A] dark:text-[#8B949E] leading-relaxed">
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
            <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1F2328] dark:text-[#F0F6FC]">
              {about.skillsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {about.skillGroups.map((group, index) => {
              const theme = skillThemeMap[group.icon];
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
                  className="bento-card p-6 sm:p-7 space-y-5"
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border shrink-0 ${theme.iconBox}`}
                    >
                      {skillIconMap[group.icon]}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-base sm:text-lg font-bold text-[#1F2328] dark:text-[#F0F6FC]">
                        {group.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#57606A] dark:text-[#8B949E]">
                        {group.subtitle}
                      </p>
                    </div>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium border transition-colors duration-200 ${theme.tag}`}
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

