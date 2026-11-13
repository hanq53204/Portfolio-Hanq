import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
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

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getWeb3FormsAccessKey = (): string => {
  const rawAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  return typeof rawAccessKey === 'string' ? rawAccessKey.trim() : '';
};

export const ContactSection: React.FC = () => {
  const { language } = useApp();
  const { contact } = portfolioData[language];

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [botcheck, setBotcheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!getWeb3FormsAccessKey()) {
      console.warn(
        '[ContactSection] VITE_WEB3FORMS_ACCESS_KEY is missing or empty. Configure it in Vercel Environment Variables and trigger a Redeploy.'
      );
    }

    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
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
    if (hasError) setHasError(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Honeypot spam trap
    if (botcheck) {
      setIsSubmitted(true);
      setFormValues(initialFormValues);
      return;
    }

    const accessKey = getWeb3FormsAccessKey();
    if (!accessKey) {
      console.error(
        '[ContactSection] Cannot submit form: VITE_WEB3FORMS_ACCESS_KEY is undefined or empty in this build.'
      );
      setHasError(true);
      return;
    }

    const trimmedName = formValues.name.trim();
    const trimmedEmail = formValues.email.trim();
    const trimmedSubject = formValues.subject.trim();
    const trimmedMessage = formValues.message.trim();

    const isValidPayload =
      trimmedName.length >= 2 &&
      trimmedName.length <= 100 &&
      trimmedEmail.length <= 150 &&
      EMAIL_PATTERN.test(trimmedEmail) &&
      trimmedSubject.length >= 2 &&
      trimmedSubject.length <= 150 &&
      trimmedMessage.length >= 10 &&
      trimmedMessage.length <= 2000;

    if (!isValidPayload) {
      console.warn('[ContactSection] Form submission blocked by client validation.');
      setHasError(true);
      return;
    }

    setHasError(false);
    setIsSubmitting(true);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          botcheck: false,
          subject: `[Portfolio Contact] Tin nhắn mới từ ${trimmedName}`,
          from_name: trimmedName,
          name: trimmedName,
          email: trimmedEmail,
          topic: trimmedSubject,
          message: trimmedSubject
            ? `[${trimmedSubject}]\n\n${trimmedMessage}`
            : trimmedMessage,
        }),
      });

      let data: { success?: boolean; message?: string } | null = null;
      try {
        data = (await response.json()) as { success?: boolean; message?: string };
      } catch (parseError) {
        console.error('[ContactSection] Failed to parse Web3Forms JSON response:', {
          status: response.status,
          statusText: response.statusText,
          parseError,
        });
      }

      if (response.ok && data?.success) {
        setIsSubmitted(true);
        setFormValues(initialFormValues);
      } else {
        console.error('[ContactSection] Web3Forms API error:', {
          status: response.status,
          statusText: response.statusText,
          message: data?.message ?? 'No error message returned by server',
        });
        setHasError(true);
      }
    } catch (error) {
      console.error('[ContactSection] Web3Forms request failed:', error);
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setHasError(false);
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
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="space-y-0.5">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#57606A] dark:text-[#8B949E]">
                      {contact.locationLabel}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
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
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0 ${
                    copiedId === 'location'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-[#F6F8FA] dark:bg-[#0D1117] text-[#57606A] dark:text-[#8B949E] border-[#D0D7DE] dark:border-[#30363D] hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {copiedId === 'location' ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div className="pt-3 border-t border-[#D0D7DE] dark:border-[#30363D] flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"
                />
                <p className="text-xs sm:text-sm text-[#57606A] dark:text-[#8B949E]">
                  <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                    {contact.availabilityLabel}:
                  </span>{' '}
                  {contact.availabilityValue}
                </p>
              </div>
            </div>

            {/* Social Channel Cards */}
            <div className="space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#57606A] dark:text-[#8B949E] px-1">
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
                      className="group flex items-center gap-3.5 min-w-0 flex-1 cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0 transition-colors duration-200 group-hover:border-blue-500/40">
                        {socialIconMap[item.id]}
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-[#57606A] dark:text-[#8B949E] flex items-center gap-1">
                          <span>{item.label}</span>
                          <ExternalLink
                            className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-600 dark:text-blue-400"
                            aria-hidden="true"
                          />
                        </p>
                        <p className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC] group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate transition-colors duration-200">
                          {item.value}
                        </p>
                      </div>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.value)}
                      aria-label={isCopied ? contact.copiedLabel : `${contact.copyLabel} ${item.label}`}
                      title={isCopied ? contact.copiedLabel : `${contact.copyLabel} ${item.label}`}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0 ${
                        isCopied
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                          : 'bg-[#F6F8FA] dark:bg-[#0D1117] text-[#57606A] dark:text-[#8B949E] border-[#D0D7DE] dark:border-[#30363D] hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400'
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
            <h3 className="text-lg sm:text-xl font-bold text-[#1F2328] dark:text-[#F0F6FC] mb-6">
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
                    className="rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/25 p-6 sm:p-8 text-center space-y-4"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="text-base sm:text-lg font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                      {contact.form.successMessage}
                    </p>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white dark:bg-[#0D1117] text-[#1F2328] dark:text-[#F0F6FC] border border-[#D0D7DE] dark:border-[#30363D] hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
                    {/* Web3Forms Honeypot Anti-Spam Trap */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      checked={botcheck}
                      onChange={(e) => setBotcheck(e.target.checked)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#1F2328] dark:text-slate-300"
                        >
                          {contact.form.nameLabel}
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          minLength={2}
                          maxLength={100}
                          value={formValues.name}
                          onChange={handleChange}
                          placeholder={contact.form.namePlaceholder}
                          className="w-full rounded-xl px-4 py-2.5 text-sm bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-[#F0F6FC] placeholder:text-[#57606A]/70 dark:placeholder:text-[#8B949E]/70 border border-[#D0D7DE] dark:border-[#30363D] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-colors duration-200"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#1F2328] dark:text-slate-300"
                        >
                          {contact.form.emailLabel}
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          maxLength={150}
                          value={formValues.email}
                          onChange={handleChange}
                          placeholder={contact.form.emailPlaceholder}
                          className="w-full rounded-xl px-4 py-2.5 text-sm bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-[#F0F6FC] placeholder:text-[#57606A]/70 dark:placeholder:text-[#8B949E]/70 border border-[#D0D7DE] dark:border-[#30363D] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#1F2328] dark:text-slate-300"
                      >
                        {contact.form.subjectLabel}
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        minLength={2}
                        maxLength={150}
                        value={formValues.subject}
                        onChange={handleChange}
                        placeholder={contact.form.subjectPlaceholder}
                        className="w-full rounded-xl px-4 py-2.5 text-sm bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-[#F0F6FC] placeholder:text-[#57606A]/70 dark:placeholder:text-[#8B949E]/70 border border-[#D0D7DE] dark:border-[#30363D] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-colors duration-200"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#1F2328] dark:text-slate-300"
                      >
                        {contact.form.messageLabel}
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        minLength={10}
                        maxLength={2000}
                        value={formValues.message}
                        onChange={handleChange}
                        placeholder={contact.form.messagePlaceholder}
                        className="w-full rounded-xl px-4 py-2.5 text-sm bg-[#F6F8FA] dark:bg-[#0D1117] text-[#1F2328] dark:text-[#F0F6FC] placeholder:text-[#57606A]/70 dark:placeholder:text-[#8B949E]/70 border border-[#D0D7DE] dark:border-[#30363D] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-colors duration-200 resize-y"
                      />
                    </div>

                    {hasError && (
                      <div
                        role="alert"
                        className="flex items-start gap-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 px-4 py-3 text-xs sm:text-sm text-rose-700 dark:text-rose-400"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{contact.form.errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F8FA] dark:focus-visible:ring-offset-[#0D1117]"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <Send className="h-4 w-4" aria-hidden="true" />
                      )}
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

