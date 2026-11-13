import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}) => {
  const alignmentClasses =
    align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`flex flex-col space-y-2.5 max-w-3xl ${alignmentClasses}`}
    >
      <span className="inline-flex items-center px-2.5 py-1 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
        {eyebrow}
      </span>
      <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1F2328] dark:text-[#F0F6FC] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-[#57606A] dark:text-[#8B949E] leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
