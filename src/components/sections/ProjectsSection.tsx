import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Filter,
  Github,
  Layers,
  Target,
  Wrench,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { portfolioData } from '../../data/portfolioData';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from '../ui/ProjectCard';
import type { ProjectCategory, ProjectItem } from '../../types';

export const ProjectsSection: React.FC = () => {
  const { language } = useApp();
  const { projects } = portfolioData[language];

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects.items;
    }
    return projects.items.filter((item) => item.category === activeCategory);
  }, [activeCategory, projects.items]);

  // Keep selected project synced with active language
  const selectedProject = useMemo(
    () => projects.items.find((item) => item.id === selectedProjectId) ?? null,
    [projects.items, selectedProjectId]
  );

  const handleOpenModal = (project: ProjectItem, triggerEl: HTMLButtonElement | null) => {
    lastTriggerRef.current = triggerEl;
    setSelectedProjectId(project.id);
  };

  const handleCloseModal = () => {
    setSelectedProjectId(null);
    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus();
    });
  };

  // Manage body scroll lock, Escape key, and initial focus when modal opens
  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="scroll-mt-28 py-16 sm:py-24 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
        <div className="space-y-6">
          <SectionHeading
            eyebrow={projects.eyebrow}
            title={projects.title}
            subtitle={projects.subtitle}
          />

          {/* Tag Filter Tabs */}
          <div className="flex justify-center">
            <div
              role="group"
              aria-label={projects.filterAriaLabel}
              className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none"
            >
              <span
                aria-hidden="true"
                className="hidden sm:inline-flex items-center justify-center pl-2.5 pr-1 text-slate-500 dark:text-slate-400"
              >
                <Filter className="h-4 w-4" />
              </span>

              {projects.categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`relative whitespace-nowrap px-3.5 py-2 rounded-xl font-mono text-xs font-semibold cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      isActive
                        ? 'text-emerald-800 dark:text-emerald-300'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="projects-filter-active"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-emerald-600/12 dark:bg-emerald-500/15 border border-emerald-600/30 dark:border-emerald-500/35"
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bento-card p-8 text-center text-sm text-slate-600 dark:text-slate-400">
            {projects.emptyCategoryMessage}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  viewDetailsLabel={projects.viewDetailsLabel}
                  onSelect={handleOpenModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Project Architecture Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleCloseModal}
              aria-hidden="true"
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg font-mono text-xs font-medium bg-cyan-600/10 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-600/20 dark:border-cyan-500/25">
                      {selectedProject.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {selectedProject.statusLabel}
                    </span>
                  </div>
                  <h3
                    id="project-modal-title"
                    className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    {selectedProject.summary}
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseModal}
                  aria-label={projects.closeModalLabel}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-600/50 dark:hover:border-emerald-500/50 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shrink-0"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Modal Body Sections */}
              <div className="space-y-5">
                {/* Problem Statement */}
                <div className="rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    <span>{projects.problemLabel}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                {/* Architecture & Approach */}
                <div className="rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    <Layers className="h-4 w-4" aria-hidden="true" />
                    <span>{projects.architectureLabel}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedProject.architecture}
                  </p>
                </div>

                {/* Implementation Highlights */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    <Wrench className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                    <span>{projects.highlightsLabel}</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2
                          className="h-4 w-4 mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div className="rounded-xl bg-emerald-600/5 dark:bg-emerald-500/10 border border-emerald-600/20 dark:border-emerald-500/25 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    <BarChart3 className="h-4 w-4" aria-hidden="true" />
                    <span>{projects.outcomeLabel}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {selectedProject.outcome}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2.5">
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {projects.techStackLabel}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="px-3 py-1 rounded-lg font-mono text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Optional Repo / Demo Links + Close Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  {selectedProject.repoUrl ? (
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:border-emerald-600/50 dark:hover:border-emerald-500/50 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>{projects.sourceLabel}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title={selectedProject.statusLabel}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-75"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>{projects.sourceLabel}</span>
                    </button>
                  )}

                  {selectedProject.demoUrl ? (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span>{projects.demoLabel}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title={selectedProject.statusLabel}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600/10 dark:bg-emerald-500/10 text-emerald-700/50 dark:text-emerald-400/50 border border-emerald-600/20 dark:border-emerald-500/20 cursor-not-allowed opacity-75"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span>{projects.demoLabel}</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="ml-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200/80 dark:hover:bg-slate-700 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {projects.closeModalLabel}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

