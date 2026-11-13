import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CornerDownLeft, Terminal as TerminalIcon, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { portfolioData } from '../../data/portfolioData';

type KnownCommandKey = 'help' | 'whoami' | 'skills' | 'projects' | 'status';

type TerminalEntry =
  | { id: number; kind: 'welcome' }
  | { id: number; kind: 'cleared' }
  | {
      id: number;
      kind: 'command';
      rawInput: string;
      resolvedKey?: KnownCommandKey;
      isUnknown?: boolean;
    };

const QUICK_COMMANDS: KnownCommandKey[] = ['help', 'whoami', 'skills', 'projects', 'status'];

function getEntryLines(
  entry: TerminalEntry,
  terminal: (typeof portfolioData)['vi']['terminal']
): string[] {
  if (entry.kind === 'welcome') {
    return terminal.welcomeLines;
  }
  if (entry.kind === 'cleared') {
    return [terminal.clearedNotice];
  }
  if (entry.resolvedKey && terminal.commands[entry.resolvedKey]) {
    return terminal.commands[entry.resolvedKey].output;
  }
  if (entry.isUnknown) {
    return [`${terminal.unknownCommandPrefix} ${entry.rawInput}`, terminal.helpHint];
  }
  return [];
}

function sliceLinesByChars(lines: string[], visibleChars: number): { lines: string[]; activeLineIndex: number } {
  let remaining = visibleChars;
  const sliced: string[] = [];
  let activeLineIndex = -1;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (remaining <= 0) {
      break;
    }
    if (remaining >= line.length) {
      sliced.push(line);
      remaining -= line.length + 1;
      activeLineIndex = i;
    } else {
      sliced.push(line.slice(0, remaining));
      remaining = 0;
      activeLineIndex = i;
    }
  }

  return { lines: sliced, activeLineIndex };
}

export const InteractiveTerminal: React.FC = () => {
  const { language } = useApp();
  const { terminal } = portfolioData[language];

  const [entries, setEntries] = useState<TerminalEntry[]>([{ id: 1, kind: 'welcome' }]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyCursor, setHistoryCursor] = useState<number>(-1);
  const [streaming, setStreaming] = useState<{ entryId: number; visibleChars: number } | null>(
    null
  );

  const nextIdRef = useRef<number>(2);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allCommandNames = useMemo(
    () => [...QUICK_COMMANDS, terminal.clearLabel],
    [terminal.clearLabel]
  );

  // Smooth typewriter stream for the latest entry
  useEffect(() => {
    if (!streaming) return;

    const targetEntry = entries.find((item) => item.id === streaming.entryId);
    if (!targetEntry) {
      setStreaming(null);
      return;
    }

    const lines = getEntryLines(targetEntry, terminal);
    const totalChars = lines.reduce((acc, line) => acc + line.length + 1, 0);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || streaming.visibleChars >= totalChars) {
      setStreaming(null);
      return;
    }

    const timer = window.setTimeout(() => {
      setStreaming((prev) => {
        if (!prev || prev.entryId !== targetEntry.id) return prev;
        const nextChars = prev.visibleChars + 4;
        if (nextChars >= totalChars) {
          return null;
        }
        return { entryId: prev.entryId, visibleChars: nextChars };
      });
    }, 14);

    return () => window.clearTimeout(timer);
  }, [streaming, entries, terminal]);

  // Keep terminal viewport scrolled to latest output without jumping the page
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [entries, streaming?.visibleChars]);

  const executeCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase();

    setCommandHistory((prev) => [trimmed, ...prev].slice(0, 30));
    setHistoryCursor(-1);
    setInputValue('');

    if (normalized === 'clear' || normalized === terminal.clearLabel.toLowerCase()) {
      const id = nextIdRef.current++;
      setStreaming(null);
      setEntries([{ id, kind: 'cleared' }]);
      return;
    }

    const isKnown = QUICK_COMMANDS.includes(normalized as KnownCommandKey);
    const id = nextIdRef.current++;
    const nextEntry: TerminalEntry = {
      id,
      kind: 'command',
      rawInput: trimmed,
      resolvedKey: isKnown ? (normalized as KnownCommandKey) : undefined,
      isUnknown: !isKnown,
    };

    setEntries((prev) => [...prev, nextEntry]);
    setStreaming({ entryId: id, visibleChars: 0 });
  };

  const handleChipClick = (cmd: string) => {
    executeCommand(cmd);
    inputRef.current?.focus({ preventScroll: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = Math.min(historyCursor + 1, commandHistory.length - 1);
      setHistoryCursor(nextIndex);
      setInputValue(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyCursor <= 0) {
        setHistoryCursor(-1);
        setInputValue('');
      } else {
        const nextIndex = historyCursor - 1;
        setHistoryCursor(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = inputValue.trim().toLowerCase();
      if (!partial) return;
      const match = allCommandNames.find((cmd) => cmd.startsWith(partial));
      if (match) {
        setInputValue(match);
      }
    }
  };

  const handleTerminalSurfaceClick = () => {
    const selection = window.getSelection()?.toString();
    if (!selection) {
      inputRef.current?.focus({ preventScroll: true });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12, ease: 'easeOut' }}
      className="relative rounded-2xl overflow-hidden bg-[#0F172A] text-slate-100 border border-slate-800/90 shadow-2xl shadow-slate-900/20 dark:shadow-glow-emerald"
    >
      {/* Subtle top border accent line */}
      <div
        aria-hidden="true"
        className="h-0.5 w-full bg-gradient-to-r from-emerald-500/80 via-cyan-400/70 to-emerald-500/40"
      />

      {/* Ubuntu/macOS Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1E293B]/90 border-b border-slate-800">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-rose-500/90" />
            <span className="h-3 w-3 rounded-full bg-amber-400/90" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <TerminalIcon className="h-3.5 w-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
            <span className="font-mono text-xs font-medium text-slate-200 truncate">
              {terminal.title}
            </span>
          </div>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/80 shrink-0">
          {terminal.shellBadge}
        </span>
      </div>

      {/* Clickable Quick Command Chips */}
      <div className="px-4 py-2.5 bg-[#0B1220] border-b border-slate-800/80 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] text-slate-400 mr-1">
          {terminal.quickChipsLabel}
        </span>
        {QUICK_COMMANDS.map((cmdKey) => (
          <button
            key={cmdKey}
            type="button"
            onClick={() => handleChipClick(cmdKey)}
            title={terminal.commands[cmdKey]?.description}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-xs font-medium bg-slate-800/80 text-emerald-300 border border-slate-700/80 hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-200 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>{cmdKey}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleChipClick(terminal.clearLabel)}
          title={terminal.clearDescription}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700/80 hover:border-rose-400/60 hover:bg-rose-500/10 hover:text-rose-300 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
        >
          <Trash2 className="h-3 w-3" aria-hidden="true" />
          <span>{terminal.clearLabel}</span>
        </button>
      </div>

      {/* Terminal Output & Active Prompt */}
      <div
        ref={scrollContainerRef}
        onClick={handleTerminalSurfaceClick}
        aria-live="polite"
        className="h-[340px] sm:h-[370px] overflow-y-auto p-4 font-mono text-xs sm:text-[13px] leading-relaxed space-y-3 cursor-text"
      >
        {entries.map((entry) => {
          const fullLines = getEntryLines(entry, terminal);
          const isStreamingEntry = streaming?.entryId === entry.id;
          const display = isStreamingEntry
            ? sliceLinesByChars(fullLines, streaming.visibleChars)
            : { lines: fullLines, activeLineIndex: -1 };

          return (
            <div key={entry.id} className="space-y-1">
              {entry.kind === 'command' && (
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-emerald-400 font-semibold select-none">
                    {terminal.promptUser}
                  </span>
                  <span className="text-slate-100 font-medium break-all">{entry.rawInput}</span>
                </div>
              )}

              <div className="space-y-0.5 pl-0 sm:pl-1">
                {display.lines.map((line, index) => {
                  const isError = entry.kind === 'command' && entry.isUnknown && index === 0;
                  const isHeader =
                    entry.kind === 'welcome' && index === 0;
                  const isCursorLine = isStreamingEntry && index === display.activeLineIndex;

                  return (
                    <div
                      key={`${entry.id}-${index}`}
                      className={`whitespace-pre-wrap break-words ${
                        isError
                          ? 'text-rose-400'
                          : isHeader
                          ? 'text-cyan-300 font-medium'
                          : entry.kind === 'cleared'
                          ? 'text-slate-400 italic'
                          : 'text-slate-300'
                      }`}
                    >
                      {line}
                      {isCursorLine && (
                        <span
                          aria-hidden="true"
                          className="inline-block w-2 h-3.5 ml-0.5 align-middle bg-emerald-400"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Interactive Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
          <label htmlFor="terminal-command-input" className="sr-only">
            {terminal.inputLabel}
          </label>
          <span className="text-emerald-400 font-semibold shrink-0 select-none">
            {terminal.promptUser}
          </span>
          <input
            ref={inputRef}
            id="terminal-command-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={terminal.inputPlaceholder}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            className="flex-1 min-w-0 bg-transparent text-slate-100 placeholder:text-slate-500 focus:outline-none font-mono text-xs sm:text-[13px]"
          />
          <button
            type="submit"
            aria-label={terminal.inputLabel}
            className="inline-flex items-center justify-center p-1.5 rounded-md text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <CornerDownLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* Footer Hint Bar */}
      <div className="px-4 py-2 bg-[#0B1220] border-t border-slate-800/80 flex items-center justify-between gap-2">
        <p className="font-mono text-[11px] text-slate-400 truncate">
          {terminal.historyHint}
        </p>
      </div>
    </motion.div>
  );
};

