import React from 'react';
import { Activity, Github, Linkedin, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { portfolioData } from '../../data/portfolioData';
import type { SocialLinkItem } from '../../types';

const socialIconMap: Record<SocialLinkItem['id'], React.ReactNode> = {
  email: <Mail className="h-4 w-4" aria-hidden="true" />,
  github: <Github className="h-4 w-4" aria-hidden="true" />,
  linkedin: <Linkedin className="h-4 w-4" aria-hidden="true" />,
};

export const Footer: React.FC = () => {
  const { language } = useApp();
  const content = portfolioData[language];
  const { footer, nav, contact } = content;

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/75 dark:bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-200 dark:border-slate-800/80">
          {/* Brand & Live System Status */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600/10 dark:bg-emerald-500/15 border border-emerald-600/25 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-slate-50">
                  {footer.brandName}
                </p>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {nav.brandTag}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {footer.tagline}
            </p>

            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/10 border border-emerald-600/25 dark:border-emerald-500/25">
              <span
                className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.75)]"
                aria-hidden="true"
              />
              <Activity className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
              <span className="font-mono text-xs font-medium text-emerald-800 dark:text-emerald-300">
                {footer.systemStatusLabel}: {footer.systemStatusValue}
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              {footer.quickLinksTitle}
            </h2>
            <ul className="space-y-2">
              {nav.links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="inline-block text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Location */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              {footer.connectTitle}
            </h2>
            <p className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-cyan-700 dark:text-cyan-400" aria-hidden="true" />
              <span>{footer.location}</span>
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {contact.socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.id === 'email' ? undefined : '_blank'}
                  rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
                  aria-label={item.label}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-600/50 dark:hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {socialIconMap[item.id]}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <p>{footer.copyright}</p>
          <p className="font-mono">{footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
};

