'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import KanbanBoard from '../components/KanbanBoard';
import CalendarView from '../components/CalendarView';
import PostInspectorDrawer from '../components/PostInspectorDrawer';
import SeedLaunchModal from '../components/SeedLaunchModal';
import BrandDnaModal from '../components/BrandDnaModal';
import {
  CampaignData,
  CampaignInput,
  PostItem,
  BrandDnaData,
  ConnectedAccountData,
  PlatformKey,
} from '../lib/types';
import {
  sampleCampaign,
  initialBrandDna,
  initialConnectedAccounts,
} from '../lib/sampleData';
import { loadCampaign, saveCampaign } from '../lib/campaign-storage';
import { BRANDS_CATALOG } from '../lib/brandsData';
import { Layers, Download, Sparkles, Zap, ShieldCheck, Flame } from 'lucide-react';

export default function DashboardPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedBrand, setSelectedBrand] = useState<string>('creativedady');
  const [activeTab, setActiveTab] = useState<'kanban' | 'calendar' | 'assets' | 'brand_dna'>('kanban');
  const [viewMode, setViewMode] = useState<'kanban' | 'calendar'>('kanban');
  const [campaign, setCampaign] = useState<CampaignData>(BRANDS_CATALOG.creativedady.campaign);
  const [brandDna, setBrandDna] = useState<BrandDnaData>(BRANDS_CATALOG.creativedady.brandDna);
  const [accounts, setAccounts] = useState<ConnectedAccountData[]>(BRANDS_CATALOG.creativedady.accounts);

  const handleSelectBrand = (slug: string) => {
    setSelectedBrand(slug);
    if (slug === selectedBrand) return;
    setStoredRun(null);
    setSelectedPost(null);
    setRetryError('');
    setCampaignWarnings([]);
    if (slug === 'legacy-paper' && BRANDS_CATALOG['legacy-paper']) {
      setCampaign(BRANDS_CATALOG['legacy-paper'].campaign);
      setBrandDna(BRANDS_CATALOG['legacy-paper'].brandDna);
      setAccounts(BRANDS_CATALOG['legacy-paper'].accounts);
    } else if (slug === 'creativedady' && BRANDS_CATALOG.creativedady) {
      setCampaign(BRANDS_CATALOG.creativedady.campaign);
      setBrandDna(BRANDS_CATALOG.creativedady.brandDna);
      setAccounts(BRANDS_CATALOG.creativedady.accounts);
    } else {
      setCampaign(sampleCampaign);
      setBrandDna(initialBrandDna);
      setAccounts(initialConnectedAccounts);
    }
  };

  // Modal & Drawer States
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [isSeedModalOpen, setIsSeedModalOpen] = useState(false);
  const [isBrandDnaOpen, setIsBrandDnaOpen] = useState(false);

  // Sync theme with HTML root class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('crazze-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('crazze-theme', nextTheme);
  };

  // Generation tracker state
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaignError, setCampaignError] = useState('');
  const [campaignWarnings, setCampaignWarnings] = useState<string[]>([]);

  const [storedRun, setStoredRun] = useState<{ brand: string; campaignId: string; input: CampaignInput } | null>(null);
  const [storageError, setStorageError] = useState('');
  const [retryDay, setRetryDay] = useState<number | null>(null);
  const [retryError, setRetryError] = useState('');

  useEffect(() => {
    let active = true;
    loadCampaign(selectedBrand).then((saved) => {
      if (!active || !saved) return;
      setCampaign(saved.campaign);
      setCampaignWarnings(saved.warnings);
      setStoredRun({ brand: selectedBrand, campaignId: saved.campaign.id, input: saved.input });
    }).catch(() => {
      if (active) setStorageError('Saved campaigns could not be loaded from this browser.');
    });
    return () => { active = false; };
  }, [selectedBrand]);

  useEffect(() => {
    if (storedRun?.brand !== selectedBrand || storedRun.campaignId !== campaign.id) return;
    let active = true;
    saveCampaign(selectedBrand, { campaign, input: storedRun.input, warnings: campaignWarnings })
      .then(() => { if (active) setStorageError(''); })
      .catch(() => { if (active) setStorageError('This browser could not save your campaign. Download the assets before refreshing.'); });
    return () => { active = false; };
  }, [campaign, campaignWarnings, selectedBrand, storedRun]);

  // Calculate review counters
  const needsReviewCount = campaign.posts.filter((p) => p.status === 'needs_review').length;

  // 1-Click Approve Post handler
  const handleApprovePost = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCampaign((prev) => ({
      ...prev,
      posts: prev.posts.map((p) =>
        p.id === postId ? { ...p, status: 'approved' as const } : p
      ),
    }));
  };

  // Save Post edits from Drawer
  const handleSavePost = (updatedPost: PostItem) => {
    setCampaign((prev) => ({
      ...prev,
      posts: prev.posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)),
    }));
    setSelectedPost(updatedPost);
  };

  const handleRunBrain = async (
    goal: string,
    images: string[],
    platforms: Record<PlatformKey, boolean>,
    creativeDirection: string,
    styleReferences: string[]
  ) => {
    setIsGenerating(true);
    setCampaignError('');
    setRetryError('');
    const input = { goal, images, platforms, brandDna, creativeDirection, styleReferences };

    try {
      const response = await fetch('/api/campaign/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'Campaign generation failed.');

      setCampaign(result.campaign);
      setStoredRun({ brand: selectedBrand, campaignId: result.campaign.id, input });
      setCampaignWarnings(result.warnings || []);
      setSelectedPost(null);
      setActiveTab('kanban');
      setViewMode('kanban');
      setIsSeedModalOpen(false);
    } catch (error) {
      setCampaignError(error instanceof Error ? error.message : 'Campaign generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetryDay = async (day: number, imageOnly: boolean) => {
    const planDay = campaign.retryContext?.plan.find((entry) => entry.day === day);
    if (!storedRun || !planDay || !campaign.retryContext || retryDay !== null) return;
    setRetryDay(day);
    setRetryError('');
    setSelectedPost(null);
    try {
      const response = await fetch('/api/campaign/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...storedRun.input,
          retry: {
            day: planDay, imageOnly, campaignId: campaign.id, createdAt: campaign.created_at,
            vision: campaign.visual_analysis, sources: campaign.retryContext.sources,
          },
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'The retry failed.');
      setCampaign((current) => {
        if (current.id !== campaign.id) return current;
        return {
          ...current,
          posts: imageOnly
            ? current.posts.map((post) => post.day === day
              ? { ...post, media_urls: [result.image], generatedVisual: true, use_uploaded_image_index: null }
              : post)
            : [...current.posts.filter((post) => post.day !== day), result.post].sort((a, b) => a.day - b.day),
          failedDays: current.failedDays?.filter((entry) => entry.day !== day),
        };
      });
      setCampaignWarnings((current) => [
        ...current.filter((warning) => !warning.startsWith(`Day ${day} image:`)),
        ...(result.warnings || []),
      ]);
    } catch (error) {
      setRetryError(error instanceof Error ? error.message : 'The retry failed.');
    } finally {
      setRetryDay(null);
    }
  };

  return (
    <div className="studio-workspace flex min-h-screen flex-col text-slate-900 dark:text-slate-100 lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'kanban') setViewMode('kanban');
          if (tab === 'calendar') setViewMode('calendar');
        }}
        accounts={accounts}
        brandDna={brandDna}
        onOpenBrandDna={() => setIsBrandDnaOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        selectedBrand={selectedBrand}
        onSelectBrand={(slug) => { if (retryDay === null && !isGenerating) handleSelectBrand(slug); }}
        onTriggerSkill={(skillId) => {
          if (skillId === 'social-post' || skillId === 'social-reel' || skillId === 'social-story') {
            setIsSeedModalOpen(true);
          } else if (skillId === 'content-calendar') {
            setViewMode('calendar');
            setActiveTab('calendar');
          } else {
            setIsSeedModalOpen(true);
          }
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          viewMode={viewMode}
          setViewMode={(mode) => {
            setViewMode(mode);
            setActiveTab(mode);
          }}
          onOpenSeedModal={() => { if (retryDay === null) setIsSeedModalOpen(true); }}
          needsReviewCount={needsReviewCount}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {(activeTab === 'kanban' || activeTab === 'calendar') && (
          <section className="studio-hero relative mx-4 mt-5 overflow-hidden rounded-2xl px-5 py-6 sm:mx-7 sm:px-7 sm:py-8">
            <div className="relative max-w-3xl">
              <h1 className="studio-display text-2xl font-extrabold tracking-tight sm:text-3xl">{campaign.title}</h1>
              {campaign.goal && campaign.goal !== campaign.title && (
                <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-purple-100">{campaign.goal}</p>
              )}
            </div>
          </section>
        )}

        {storageError && <p role="alert" className="mx-4 mt-4 text-sm text-amber-600 dark:text-amber-300">{storageError}</p>}
        {retryError && <p role="alert" className="mx-4 mt-4 text-sm text-rose-600 dark:text-rose-300">{retryError}</p>}
        {Boolean(campaign.failedDays?.length) && (
          <ul className="mx-4 mt-4 space-y-2 rounded-xl border border-amber-500/40 p-3 text-sm">
            {campaign.failedDays?.map(({ day, message }) => (
              <li key={day} className="flex flex-wrap items-center justify-between gap-2">
                <span>Day {day} · {message}</span>
                <button className="studio-secondary" disabled={retryDay !== null} onClick={() => void handleRetryDay(day, false)}>
                  {retryDay === day ? 'Retrying…' : `Retry Day ${day}`}
                </button>
              </li>
            ))}
          </ul>
        )}
        {(campaign.researchSources?.length || campaignWarnings.length) ? (
          <div className="mx-4 mt-4 space-y-2 text-sm">
            {campaignWarnings.length > 0 && (
              <details className="rounded-xl border border-amber-500/40 p-3">
                <summary>{campaignWarnings.length} visuals used the original photo because image generation failed</summary>
                <ul className="mt-2 space-y-2">{campaignWarnings.map((warning) => {
                  const day = Number(warning.match(/^Day (\d+) image:/)?.[1]);
                  return <li key={warning} className="flex flex-wrap items-center justify-between gap-2">
                    <span>{warning}</span>
                    {storedRun && day > 0 && (
                      <button className="studio-secondary" disabled={retryDay !== null} onClick={() => void handleRetryDay(day, true)}>
                        {retryDay === day ? 'Retrying…' : `Retry Day ${day} image`}
                      </button>
                    )}
                  </li>;
                })}</ul>
              </details>
            )}
            {campaign.researchSources?.length ? (
              <details className="rounded-xl border border-slate-300 p-3 dark:border-slate-800">
                <summary>Campaign research sources ({campaign.researchSources.length})</summary>
                <ul className="mt-2 space-y-1">
                  {campaign.researchSources.map((source) => (
                    <li key={source.url}><a className="underline" href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>
                  ))}
                </ul>
              </details>
            ) : null}
          </div>
        ) : null}

        {/* View Toggle Controller */}
        {activeTab === 'kanban' && (
          <KanbanBoard
            posts={campaign.posts}
            onSelectPost={(post) => setSelectedPost(post)}
            onApprovePost={handleApprovePost}
            onOpenSeedModal={() => { if (retryDay === null) setIsSeedModalOpen(true); }}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            posts={campaign.posts}
            campaignStart={campaign.retryContext ? campaign.created_at : undefined}
            onSelectPost={(post) => setSelectedPost(post)}
          />
        )}

        {/* Asset & Carousel Hub View */}
        {activeTab === 'assets' && (
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-7">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span>Carousel assets</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                    Review and edit your campaign’s carousel slides.
                  </p>
                </div>
              </div>

              {/* Grid of Carousels */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaign.posts
                  .filter((p) => p.generate_carousel && p.carousel_slides?.length > 0)
                  .map((post) => (
                    <div
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 rounded-3xl p-5 cursor-pointer transition shadow-sm hover:shadow-glow-purple group"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-purple-700 dark:text-purple-300 mb-3">
                        <span className="font-bold">{post.dayName} Carousel</span>
                        <span className="bg-purple-100 dark:bg-purple-900/40 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          {post.carousel_slides.length} Slides
                        </span>
                      </div>

                      <div className="aspect-[4/5] rounded-2xl bg-[#0d0a1a] p-6 flex flex-col justify-between border border-white/5 mb-4 group-hover:scale-[1.02] transition duration-300">
                        <div className="text-[10px] font-mono text-purple-400">Slide 1 Headline</div>
                        <h4 className="text-base font-extrabold text-white leading-snug">
                          {post.carousel_slides[0]?.headline}
                        </h4>
                        <div className="text-[10px] text-slate-400 font-mono">1080 x 1350 • PNG</div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-mono">
                        <span className="truncate max-w-[180px]">{post.angle_type}</span>
                        <span className="text-purple-600 dark:text-purple-400 font-bold group-hover:underline">Open Drawer →</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Split-Screen Post Inspector Drawer */}
      {selectedPost && <PostInspectorDrawer
        key={selectedPost.id}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onSavePost={handleSavePost}
        brand={selectedBrand === 'legacy-paper' ? 'Legacy Paper' : selectedBrand === 'creativedady' ? 'CreativeDady' : 'Crazze Studio'}
      />}

      {/* Multimodal Campaign Studio Seed & Launch Modal */}
      <SeedLaunchModal
        isOpen={isSeedModalOpen}
        onClose={() => setIsSeedModalOpen(false)}
        onRunBrain={handleRunBrain}
        isGenerating={isGenerating}
        error={campaignError}
      />

      {/* Brand Voice DNA & Anti-Slop Settings Modal */}
      <BrandDnaModal
        isOpen={isBrandDnaOpen}
        onClose={() => setIsBrandDnaOpen(false)}
        brandDna={brandDna}
        onSave={(updated) => setBrandDna(updated)}
      />
    </div>
  );
}
