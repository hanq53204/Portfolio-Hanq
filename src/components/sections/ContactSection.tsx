import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Radio,
  RotateCcw,
  Send,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { portfolioData } from '../../data/portfolioData';
import { SectionHeading } from '../ui/SectionHeading';
import type { SocialLinkItem } from '../../types';

const socialIconMap: Record<SocialLinkItem['id'], React.ReactNode> = {
  email: <Mail className="h-5 w-5" aria-hidden="true" />,
  github: <Github className="h-5 w-5" aria-hidden="true" />,
  linkedin: <Linkedin className="h-5 w-5" aria-hidden="true" />,
};

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const ContactSection: React.FC = () => {
  const { language } = useApp();
  const { contact } = portfolioData[language];

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyTimerRef = useRef<number | null>(null);
  const submitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      if (submitTimerRef.current) window.clearTimeout(submitTimerRef.current);
    };
  }, []);

  const handleCopy = async (id: string, value: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedId(id);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch {
      // Ignore clipboard failures in restricted environments
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    submitTimerRef.current = window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormValues(initialFormValues);
    }, 450);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-28 py-16 sm:py-24 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionHeading
          eyebrow={contact.eyebrow}
          title={contact.title}
          subtitle={contact.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Quick Connect Cards (Email, GitHub, LinkedIn, Location) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Location & Availability Bento Card */}
            <div className="bento-card p-5 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600/10 dark:bg-cyan-500/15 border border-cyan-600/25 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 shrink-0">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="space-y-0.5">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {contact.locationLabel}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                      {contact.locationValue}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('location', contact.locationValue)}
                  aria-label={
                    copiedId === 'location'
                      ? contact.copiedLabel
                      : `${contact.copyLabel} ${contact.locationLabel}`
                  }
                  title={
                    copiedId === 'location'
                      ? contact.copiedLabel
                      : `${contact.copyLabel} ${contact.locationLabel}`
                  }
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shrink-0 ${
                    copiedId === 'location'
                      ? 'bg-emerald-600/10 dark:bg-emerald-500/15 border-emerald-600/40 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-600/50 dark:hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-300'
                  }`}
                >
                  {copiedId === 'location' ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2.5">
                <Radio
                  className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0"
                  aria-hidden="true"
                />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                    {contact.availabilityLabel}:
                  </span>{' '}
                  {contact.availabilityValue}
                </p>
              </div>
            </div>

            {/* Social Channel Cards */}
            <div className="space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 px-1">
                {contact.socialTitle}
              </p>

              {contact.socialLinks.map((item) => {
                const isCopied = copiedId === item.id;
                return (
                  <div
                    key={item.id}
                    className="bento-card p-4 sm:p-5 flex items-center justify-between gap-3"
                  >
                    <a
                      href={item.href}
                      target={item.id === 'email' ? undefined : '_blank'}
                      rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
                      aria-label={`${contact.openLinkLabel}: ${item.label}`}
                      className="group flex items-center gap-3.5 min-w-0 flex-1 cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/10 dark:bg-emerald-500/15 border border-emerald-600/25 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 shrink-0 transition-colors duration-200 group-hover:border-emerald-500/60">
                        {socialIconMap[item.id]}
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <span>{item.label}</span>
                          <ExternalLink
                            className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            aria-hidden="true"
                          />
                        </p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200">
                          {item.value}
                        </p>
                      </div>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.value)}
                      aria-label={isCopied ? contact.copiedLabel : `${contact.copyLabel} ${item.label}`}
                      title={isCopied ? contact.copiedLabel : `${contact.copyLabel} ${item.label}`}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shrink-0 ${
                        isCopied
                          ? 'bg-emerald-600/10 dark:bg-emerald-500/15 border-emerald-600/40 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-600/50 dark:hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-300'
                      }`}
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Direct Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
            className="lg:col-span-7 bento-card p-6 sm:p-8"
          >
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              {contact.form.title}
            </h3>

            <div aria-live="polite">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/10 border border-emerald-600/25 dark:border-emerald-500/30 p-6 sm:p-8 text-center space-y-4"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {contact.form.successMessage}
                    </p>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:border-emerald-600/50 dark:hover:border-emerald-500/50 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      <span>{contact.form.sendAnotherLabel}</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                        >
                          {contact.form.nameLabel}
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={formValues.name}
                          onChange={handleChange}
                          placeholder={contact.form.namePlaceholder}
                          className="w-full rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-colors duration-200"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                        >
                          {contact.form.emailLabel}
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={formValues.email}
                          onChange={handleChange}
                          placeholder={contact.form.emailPlaceholder}
                          className="w-full rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                      >
                        {contact.form.subjectLabel}
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        value={formValues.subject}
                        onChange={handleChange}
                        placeholder={contact.form.subjectPlaceholder}
                        className="w-full rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-colors duration-200"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                      >
                        {contact.form.messageLabel}
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        value={formValues.message}
                        onChange={handleChange}
                        placeholder={contact.form.messagePlaceholder}
                        className="w-full rounded-xl px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/70 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-colors duration-200 resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 shadow-sm dark:shadow-glow-emerald disabled:opacity-60 disabled:cursor-wait cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>
                        {isSubmitting ? contact.form.submittingLabel : contact.form.submitLabel}
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

