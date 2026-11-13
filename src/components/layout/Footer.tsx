import React from 'react';
import { Github, Linkedin, Mail, MapPin, ShieldCheck } from 'lucide-react';
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
    <footer className="border-t border-[#D0D7DE] dark:border-[#30363D] bg-white dark:bg-[#0D1117]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#D0D7DE] dark:border-[#30363D]">
          {/* Brand & Live System Status */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 dark:bg-blue-500/10 border border-blue-600/20 dark:border-blue-500/25 text-blue-600 dark:text-blue-400">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-base font-bold text-[#1F2328] dark:text-[#F0F6FC]">
                  {footer.brandName}
                </p>
                <p className="text-xs font-mono text-blue-600 dark:text-blue-400">
                  {nav.brandTag}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#57606A] dark:text-[#8B949E] leading-relaxed">
              {footer.tagline}
            </p>

            {/* Tinted Emerald Online Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span
                className="h-2 w-2 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              <span className="font-mono text-xs font-medium text-emerald-700 dark:text-emerald-400">
                {footer.systemStatusLabel}: {footer.systemStatusValue}
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1F2328] dark:text-[#F0F6FC]">
              {footer.quickLinksTitle}
            </h2>
            <ul className="space-y-2">
              {nav.links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="inline-block text-sm text-[#57606A] dark:text-[#8B949E] hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Location */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1F2328] dark:text-[#F0F6FC]">
              {footer.connectTitle}
            </h2>
            <p className="flex items-start gap-2 text-sm text-[#57606A] dark:text-[#8B949E]">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
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
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F6F8FA] dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D] text-xs font-medium text-[#57606A] dark:text-[#8B949E] hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {socialIconMap[item.id]}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#57606A] dark:text-[#8B949E]">
          <p>{footer.copyright}</p>
          <p className="font-mono">{footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
};
