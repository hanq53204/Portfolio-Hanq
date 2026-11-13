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

const categoryBadgeClassMap: Record<ProjectItem['category'], string> = {
  'Monitoring & DevOps':
    'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  'Security & ML':
    'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  'System Admin':
    'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
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
      className="bento-card group flex flex-col justify-between p-6 sm:p-7"
    >
      <div className="space-y-4">
        {/* Top Meta Row: Semantic Category Badge + Status */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-medium border ${categoryBadgeClassMap[project.category]}`}
          >
            {categoryIconMap[project.category]}
            <span>{project.category}</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium bg-[#F6F8FA] dark:bg-[#0D1117] text-[#57606A] dark:text-[#8B949E] border border-[#D0D7DE] dark:border-[#30363D]">
            {project.statusLabel}
          </span>
        </div>

        {/* Title & Summary */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#1F2328] dark:text-[#F0F6FC] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-[#57606A] dark:text-[#8B949E] leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <ul className="flex flex-wrap gap-2 pt-1">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="px-2.5 py-1 rounded-md font-mono text-xs font-medium bg-blue-500/[0.07] dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer CTA */}
      <div className="mt-6 pt-4 border-t border-[#D0D7DE] dark:border-[#30363D] flex items-center justify-end">
        <button
          type="button"
          onClick={(e) => onSelect(project, e.currentTarget)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <span>{viewDetailsLabel}</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
};
