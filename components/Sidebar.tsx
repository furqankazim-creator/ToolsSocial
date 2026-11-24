'use client';

import React from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Calendar,
  Layers,
  Fingerprint,
  Radio,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  Sun,
  Moon,
  Flame,
  ChevronDown,
  Building2,
  Video,
  FileText,
  MapPin,
  Search,
  CheckSquare,
} from 'lucide-react';
import { ConnectedAccountData, BrandDnaData } from '../lib/types';
import { BOSS_STUDIO_SKILLS, BRANDS_CATALOG } from '../lib/brandsData';

interface SidebarProps {
  activeTab: 'kanban' | 'calendar' | 'assets' | 'brand_dna';
  setActiveTab: (tab: 'kanban' | 'calendar' | 'assets' | 'brand_dna') => void;
  accounts: ConnectedAccountData[];
  brandDna: BrandDnaData;
  onOpenBrandDna: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  selectedBrand: string;
  onSelectBrand: (brandSlug: string) => void;
  onTriggerSkill?: (skillId: string) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  accounts,
  brandDna,
  onOpenBrandDna,
  theme,
  onToggleTheme,
  selectedBrand,
  onSelectBrand,
  onTriggerSkill,
}: SidebarProps) {
  return (
    <aside className="studio-panel z-20 flex flex-col border-b lg:sticky lg:top-0 lg:h-dvh lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r xl:w-64">
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
            <Flame className="h-5 w-5" />
          </div>
          <div className="studio-display text-[17px] font-extrabold tracking-tight">Crazze Studio</div>
        </div>

        {/* Theme Toggle Button */}
        <button
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          className="studio-secondary h-10 w-10 !px-0 lg:hidden"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>
      </div>

      {/* Brand Selector Dropdown */}
      <div className="px-4 pb-2 pt-3">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono block mb-1.5 px-1">
          Brand
        </label>
        <div className="relative">
          <select
            aria-label="Brand"
            value={selectedBrand}
            onChange={(e) => onSelectBrand(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 transition cursor-pointer appearance-none shadow-xs"
          >
            <option value="creativedady">CreativeDady (Studio • Karachi)</option>
            <option value="legacy-paper">Legacy Paper PK (Stationery)</option>
            <option value="crazze">CRAZZE Tech (Autonomous Stack)</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="grid grid-cols-3 gap-1 p-3 text-sm lg:flex lg:flex-col">


        <button
          aria-pressed={activeTab === 'kanban'}
          onClick={() => setActiveTab('kanban')}
          className={`flex items-center justify-between px-2.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'kanban'
              ? 'bg-purple-600/10 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Review board</span>
          </div>

        </button>

        <button
          aria-pressed={activeTab === 'calendar'}
          onClick={() => setActiveTab('calendar')}
          className={`flex items-center justify-between px-2.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'calendar'
              ? 'bg-purple-600/10 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Calendar</span>
          </div>

        </button>

        <button
          aria-pressed={activeTab === 'assets'}
          onClick={() => setActiveTab('assets')}
          className={`flex items-center justify-between px-2.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'assets'
              ? 'bg-purple-600/10 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Assets</span>
          </div>

        </button>
      </div>

      {/* Studio shortcuts Quick Launch */}
      <div className="space-y-2 border-t border-slate-200 px-3 py-3 dark:border-slate-800 lg:flex-1 lg:overflow-y-auto">
        <div className="hidden items-center px-2 py-1 lg:flex">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
            Studio shortcuts
          </span>

        </div>

        <div className="hidden grid-cols-2 gap-1.5 lg:grid">
          {BOSS_STUDIO_SKILLS.slice(0, 6).map((skill) => (
            <button
              key={skill.id}
              onClick={() => onTriggerSkill && onTriggerSkill(skill.id)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 hover:bg-purple-50 dark:hover:bg-purple-950/20 hover:border-purple-400 text-left transition flex flex-col justify-between group"
            >
              <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-300 leading-snug">
                {skill.name}
              </div>
              <div className="text-[9px] font-mono text-slate-400 truncate">
                {skill.badge}
              </div>
            </button>
          ))}
        </div>

        {/* Brand DNA Card */}
        <div className="mt-2.5 p-3 rounded-2xl border border-purple-200 dark:border-purple-500/20 bg-purple-50 dark:bg-purple-950/20">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-300">
              <Fingerprint className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Brand DNA</span>
            </div>
            <button
              onClick={onOpenBrandDna}
              className="text-[10px] text-purple-600 dark:text-purple-400 font-bold hover:underline font-mono cursor-pointer"
            >
              Edit
            </button>
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {brandDna.voiceTone}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{brandDna.bannedWords.length} Banned Slop Words</span>
          </div>
        </div>
      </div>

    </aside>
  );
}
