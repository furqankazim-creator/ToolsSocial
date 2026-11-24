'use client';

import React from 'react';
import {
  Sparkles,
  Kanban,
  CalendarDays,
  Plus,
  Play,
  CheckCircle,
  Activity,
  Zap,
  Sun,
  Moon,
  Flame,
} from 'lucide-react';

interface HeaderProps {
  viewMode: 'kanban' | 'calendar';
  setViewMode: (mode: 'kanban' | 'calendar') => void;
  onOpenSeedModal: () => void;
  needsReviewCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Header({
  viewMode,
  setViewMode,
  onOpenSeedModal,
  needsReviewCount,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="studio-panel flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-7 lg:sticky lg:top-0 lg:z-10">
      <div className="studio-display text-base font-extrabold">Campaign studio</div>

      {/* Middle: View Mode Switcher */}
      <div className="studio-lane order-last flex items-center gap-0.5 rounded-xl border p-1 sm:order-none">
        <button
          aria-pressed={viewMode === 'kanban'}
          onClick={() => setViewMode('kanban')}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-transparent sm:px-3.5 transition ${
            viewMode === 'kanban'
              ? 'studio-panel border text-purple-800 shadow-sm dark:text-purple-200'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Kanban className="w-3.5 h-3.5" />
          <span>Board</span>
          {needsReviewCount > 0 && (
            <span
              className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] tabular-nums text-violet-800 dark:bg-violet-500/20 dark:text-violet-200"
            >
              {needsReviewCount}
            </span>
          )}
        </button>

        <button
          aria-pressed={viewMode === 'calendar'}
          onClick={() => setViewMode('calendar')}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-transparent sm:px-3.5 transition ${
            viewMode === 'calendar'
              ? 'studio-panel border text-purple-800 shadow-sm dark:text-purple-200'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Calendar</span>
        </button>
      </div>

      {/* Right Action: Seed & Launch CTA */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          className="studio-secondary hidden h-10 w-10 !px-0 lg:inline-flex"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        <button
          onClick={onOpenSeedModal}
          className="studio-primary"
        >
          <Flame className="w-4 h-4 text-white" />
          <span>New campaign</span>
        </button>
      </div>
    </header>
  );
}
