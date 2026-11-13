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
              className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] dark:border-t-white/10 shadow-sm dark:shadow-none"
            >
              <span
                aria-hidden="true"
                className="hidden sm:inline-flex items-center justify-center pl-2.5 pr-1 text-blue-600 dark:text-blue-400"
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
                    className={`relative whitespace-nowrap px-3.5 py-2 rounded-xl font-mono text-xs font-semibold cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isActive
                        ? 'text-white'
                        : 'text-[#57606A] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-[#F0F6FC]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="projects-filter-active"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-blue-600 dark:bg-blue-500"
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
          <div className="bento-card p-8 text-center text-sm text-[#57606A] dark:text-[#8B949E]">
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
              className="fixed inset-0 bg-[#0D1117]/75 backdrop-blur-sm"
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
              className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] dark:border-t-white/10 shadow-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#D0D7DE] dark:border-[#30363D]">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg font-mono text-xs font-medium bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                      {selectedProject.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium bg-[#F6F8FA] dark:bg-[#0D1117] text-[#57606A] dark:text-[#8B949E] border border-[#D0D7DE] dark:border-[#30363D]">
                      {selectedProject.statusLabel}
                    </span>
                  </div>
                  <h3
                    id="project-modal-title"
                    className="text-xl sm:text-2xl font-bold text-[#1F2328] dark:text-[#F0F6FC]"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#57606A] dark:text-[#8B949E]">
                    {selectedProject.summary}
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseModal}
                  aria-label={projects.closeModalLabel}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6F8FA] dark:bg-[#0D1117] text-[#57606A] dark:text-[#8B949E] border border-[#D0D7DE] dark:border-[#30363D] hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Modal Body Sections */}
              <div className="space-y-5">
                {/* Problem Statement */}
                <div className="rounded-xl bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    <span>{projects.problemLabel}</span>
                  </div>
                  <p className="text-sm text-[#1F2328] dark:text-slate-300 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                {/* Architecture & Approach */}
                <div className="rounded-xl bg-[#F6F8FA] dark:bg-[#0D1117] border border-[#D0D7DE] dark:border-[#30363D] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    <Layers className="h-4 w-4" aria-hidden="true" />
                    <span>{projects.architectureLabel}</span>
                  </div>
                  <p className="text-sm text-[#1F2328] dark:text-slate-300 leading-relaxed">
                    {selectedProject.architecture}
                  </p>
                </div>

                {/* Implementation Highlights */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#1F2328] dark:text-[#F0F6FC]">
                    <Wrench className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    <span>{projects.highlightsLabel}</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-[#1F2328] dark:text-slate-300"
                      >
                        <CheckCircle2
                          className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div className="rounded-xl bg-emerald-500/[0.06] dark:bg-emerald-500/10 border border-emerald-500/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    <BarChart3 className="h-4 w-4" aria-hidden="true" />
                    <span>{projects.outcomeLabel}</span>
                  </div>
                  <p className="text-sm text-[#1F2328] dark:text-slate-200 leading-relaxed">
                    {selectedProject.outcome}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2.5">
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1F2328] dark:text-[#F0F6FC]">
                    {projects.techStackLabel}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="px-3 py-1 rounded-lg font-mono text-xs font-medium bg-blue-500/[0.07] dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Optional Repo / Demo Links + Close Footer */}
              <div className="pt-4 border-t border-[#D0D7DE] dark:border-[#30363D] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  {selectedProject.repoUrl ? (
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-[#F0F6FC] border border-[#D0D7DE] dark:border-[#30363D] hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>{projects.sourceLabel}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title={selectedProject.statusLabel}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#F6F8FA] dark:bg-[#0D1117] text-[#57606A]/60 dark:text-[#8B949E]/60 border border-[#D0D7DE] dark:border-[#30363D] cursor-not-allowed opacity-75"
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span>{projects.demoLabel}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title={selectedProject.statusLabel}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-500/10 text-blue-600/50 dark:text-blue-400/50 border border-blue-500/20 cursor-not-allowed opacity-75"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span>{projects.demoLabel}</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="ml-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-[#F0F6FC] border border-[#D0D7DE] dark:border-[#30363D] hover:bg-slate-200/70 dark:hover:bg-[#1C2128] cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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

