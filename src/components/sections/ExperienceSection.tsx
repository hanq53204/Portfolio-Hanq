import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, GraduationCap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { portfolioData } from '../../data/portfolioData';
import { SectionHeading } from '../ui/SectionHeading';

export const ExperienceSection: React.FC = () => {
  const { language } = useApp();
  const { experience } = portfolioData[language];

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="scroll-mt-28 py-16 sm:py-24 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionHeading
          eyebrow={experience.eyebrow}
          title={experience.title}
          subtitle={experience.subtitle}
        />

        {/* Vertical Timeline Container */}
        <div ref={timelineRef} className="relative pl-10 sm:pl-14 space-y-8">
          {/* Static Background Track */}
          <div
            aria-hidden="true"
            className="absolute left-4 sm:left-5 top-3 bottom-3 w-0.5 rounded-full bg-[#D0D7DE] dark:bg-[#30363D]"
          />

          {/* Scroll-Linked Cloud Blue-to-Emerald Vertical Axis */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-4 sm:left-5 top-3 bottom-3 w-0.5 rounded-full bg-gradient-to-b from-blue-600 via-sky-500 to-emerald-500 dark:from-blue-500 dark:via-sky-400 dark:to-emerald-400"
          />

          {experience.items.map((item, index) => {
            const isEducation = item.type === 'education';
            const nodeClass = isEducation
              ? 'border-blue-500/40 text-blue-600 dark:text-blue-400'
              : 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400';

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                  ease: 'easeOut',
                }}
                className="relative"
              >
                {/* Timeline Node Marker */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-10 sm:-left-14 top-6 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white dark:bg-[#0D1117] border-2 ${nodeClass}`}
                >
                  {isEducation ? (
                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </span>

                {/* Milestone Card */}
                <div className="bento-card p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-bold text-[#1F2328] dark:text-[#F0F6FC]">
                        {item.role}
                      </h3>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {item.organization}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 shrink-0">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{item.period}</span>
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#57606A] dark:text-[#8B949E] leading-relaxed">
                    {item.description}
                  </p>

                  {item.highlights.length > 0 && (
                    <ul className="space-y-2 pt-1">
                      {item.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-[#1F2328] dark:text-slate-200"
                        >
                          <CheckCircle2
                            className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                            aria-hidden="true"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2 pt-3 border-t border-[#D0D7DE] dark:border-[#30363D]">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="px-2.5 py-1 rounded-md font-mono text-xs font-medium bg-blue-500/[0.07] dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

