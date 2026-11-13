import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, Server, Shield } from 'lucide-react';
import type { ProjectItem } from '../../types';

interface ProjectCardProps {
  project: ProjectItem;
  viewDetailsLabel: string;
  onSelect: (project: ProjectItem, triggerEl: HTMLButtonElement | null) => void;
}

const categoryIconMap: Record<ProjectItem['category'], React.ReactNode> = {
  'Monitoring & DevOps': <Activity className="h-4 w-4" aria-hidden="true" />,
  'Security & ML': <Shield className="h-4 w-4" aria-hidden="true" />,
  'System Admin': <Server className="h-4 w-4" aria-hidden="true" />,
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  viewDetailsLabel,
  onSelect,
}) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-white dark:bg-slate-900/60 dark:backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:shadow-md dark:hover:shadow-glow-emerald transition-all duration-200 p-6 sm:p-7"
    >
      {/* Subtle Hover Glow Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="relative space-y-4">
        {/* Top Meta Row: Category + Status */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-medium bg-cyan-600/10 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-600/20 dark:border-cyan-500/25">
            {categoryIconMap[project.category]}
            <span>{project.category}</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80">
            {project.statusLabel}
          </span>
        </div>

        {/* Title & Summary */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <ul className="flex flex-wrap gap-2 pt-1">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="px-2.5 py-1 rounded-md font-mono text-xs font-medium bg-slate-100 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer CTA */}
      <div className="relative mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-end">
        <button
          type="button"
          onClick={(e) => onSelect(project, e.currentTarget)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600/10 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-600/25 dark:border-emerald-500/30 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-slate-950 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <span>{viewDetailsLabel}</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
};

