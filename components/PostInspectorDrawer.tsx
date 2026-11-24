'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Zap,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Layers,
  ChevronRight,
  TrendingUp,
  Scissors,
  Flame,
  Loader2,
  Check,
} from 'lucide-react';
import { PostItem, PlatformKey, CarouselSlideData } from '../lib/types';
import LinkedInPreview from './previews/LinkedInPreview';
import XPreview from './previews/XPreview';
import InstagramPreview from './previews/InstagramPreview';
import CarouselSlideViewer from './previews/CarouselSlideViewer';

interface PostInspectorDrawerProps {
  post: PostItem | null;
  onClose: () => void;
  onSavePost: (updatedPost: PostItem) => void;
  brand: string;
}

export default function PostInspectorDrawer({
  post,
  onClose,
  onSavePost,
  brand,
}: PostInspectorDrawerProps) {
  if (!post) return null;

  const [activeTab, setActiveTab] = useState<'linkedin' | 'x' | 'instagram' | 'carousel'>(post.platforms?.[0] || 'linkedin');
  const [editedPost, setEditedPost] = useState<PostItem>(post);
  const [isRewriting, setIsRewriting] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);
  const [qaStatus, setQaStatus] = useState<{ running: boolean; pass?: boolean; message?: string } | null>(null);

  const runBossQa = async () => {
    setQaStatus({ running: true });
    try {
      const res = await fetch('/api/studio/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slides: editedPost.carousel_slides,
          bodyText: editedPost.linkedin.body,
          bannedWords: [],
        }),
      });
      const data = await res.json();
      if (data.result?.pass) {
        setQaStatus({
          running: false,
          pass: true,
          message: `Content checks passed (max words per slide: ${data.result.metrics.maxWordsPerSlide})`,
        });
      } else {
        setQaStatus({
          running: false,
          pass: false,
          message: `Fault: ${data.result?.faults?.[0] || 'Check failed'}`,
        });
      }
    } catch (err) {
      setQaStatus({ running: false, pass: false, message: 'Could not complete the content checks.' });
    }
  };

  const handleAiRewrite = async (instruction: string) => {
    if (activeTab === 'carousel') return;
    setIsRewriting(true);
    try {
      const text = activeTab === 'linkedin' ? editedPost.linkedin.body
        : activeTab === 'instagram' ? editedPost.instagram.caption : editedPost.x.thread[0];
      if (!text?.trim()) return;
      const response = await fetch('/api/posts/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, instruction }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'The edit failed.');
      setEditedPost((post) => ({
        ...post,
        linkedin: activeTab === 'linkedin' ? { ...post.linkedin, body: result.rewritten } : post.linkedin,
        instagram: activeTab === 'instagram' ? { ...post.instagram, caption: result.rewritten } : post.instagram,
        x: activeTab === 'x' ? { ...post.x, thread: [result.rewritten, ...post.x.thread.slice(1)] } : post.x,
      }));
    } catch (error) {
      setQaStatus({ running: false, pass: false, message: error instanceof Error ? error.message : 'The edit failed.' });
    } finally {
      setIsRewriting(false);
    }
  };

  const handleSave = () => {
    onSavePost(editedPost);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  const isApproved = editedPost.status === 'approved' || editedPost.status === 'scheduled' || editedPost.status === 'published';

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 font-poppins">
      <div className="w-full max-w-6xl bg-white dark:bg-[#070A12] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-full overflow-hidden transition-colors duration-200">
        {/* Drawer Top Navigation Bar */}
        <div className="h-16 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between bg-white dark:bg-[#070A12] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
              {editedPost.dayName} • Day {editedPost.day}
            </span>
            <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-800" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight truncate max-w-md">
              {editedPost.angle_type}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {savedNotification && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center gap-1 animate-pulse">
                <Check className="w-3.5 h-3.5" /> Saved
              </span>
            )}

            <button
              disabled={isApproved}
              onClick={() => {
                const approved = { ...editedPost, status: 'approved' as const };
                setEditedPost(approved);
                onSavePost(approved);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isApproved
                  ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-lime'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isApproved ? 'Approved' : 'Approve'}</span>
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition"
            >
              Save Draft
            </button>

            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Master Idea Banner */}
        <div className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <span className="text-[10px] font-mono uppercase font-bold text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-500/30">
              Master Thesis
            </span>
            <span className="font-medium truncate max-w-3xl">
              {editedPost.core_thesis || editedPost.coreThesis}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            <span>Score: {editedPost.quality_score}/10</span>
          </div>
        </div>

        {/* Boss Contract QA Bar */}
        <div className="bg-slate-100 dark:bg-[#0b101d] border-b border-slate-200 dark:border-slate-800 px-6 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
              Studio QA
            </span>
            {qaStatus?.message ? (
              <span className={`text-[11px] font-mono font-bold ${qaStatus.pass ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {qaStatus.message}
              </span>
            ) : (
              <span className="text-[11px] text-slate-500 font-mono">
                Check slide length, wording, and the opening line
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runBossQa}
              disabled={qaStatus?.running}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
            >
              {qaStatus?.running ? 'Checking...' : 'Check content'}
            </button>
            {editedPost.generate_carousel && editedPost.carousel_slides.length > 0 && (
              <button className="studio-secondary" onClick={() => setActiveTab('carousel')}>Export carousel PNGs</button>
            )}
          </div>
        </div>

        {/* Split-Screen Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 overflow-hidden">
          {/* ============================================================== */}
          {/* LEFT PANE: Editor & AI Rewrite Toolbar */}
          {/* ============================================================== */}
          <div className="flex flex-col h-full overflow-y-auto p-6 bg-white dark:bg-[#070A12]">
            {/* AI Rewrite Toolbar */}
            <div className="mb-4 p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-purple-700 dark:text-purple-300 font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Quick edits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={isRewriting || activeTab === 'carousel'}
                  onClick={() => handleAiRewrite('punchier')}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-600/30 text-[11px] text-slate-700 dark:text-slate-300 font-mono font-medium transition flex items-center gap-1 border border-slate-200 dark:border-slate-700/60 shadow-xs"
                >
                  <Zap className="w-3 h-3 text-amber-500" />
                  Add spacing
                </button>

                <button
                  disabled={isRewriting || activeTab === 'carousel'}
                  onClick={() => handleAiRewrite('shorten')}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-600/30 text-[11px] text-slate-700 dark:text-slate-300 font-mono font-medium transition flex items-center gap-1 border border-slate-200 dark:border-slate-700/60 shadow-xs"
                >
                  <Scissors className="w-3 h-3 text-rose-500" />
                  Shorten
                </button>
              </div>
            </div>

            {Boolean(editedPost.sources?.length) && (
              <details className="mb-4 rounded-xl border border-slate-300 p-3 text-xs dark:border-slate-800">
                <summary>Research sources for this post</summary>
                <ul className="mt-2 space-y-1">
                  {editedPost.sources?.map((source) => (
                    <li key={source.url}><a className="underline" href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>
                  ))}
                </ul>
              </details>
            )}

            {/* Platform Selection Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-5">
              {[
                { key: 'linkedin', label: 'LinkedIn', icon: 'in' },
                { key: 'x', label: 'X (Twitter)', icon: '𝕏' },
                { key: 'instagram', label: 'Instagram', icon: 'IG' },
                { key: 'carousel', label: 'Carousel Slides', icon: '▦' },
              ].filter((tab) => tab.key === 'carousel'
                ? !post.platforms || post.generate_carousel
                : !post.platforms || post.platforms.includes(tab.key as PlatformKey)
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs font-bold transition -mb-[1px] ${
                    activeTab === tab.key
                      ? 'border-purple-600 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/10'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <span className="font-mono text-[11px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB CONTENT: LINKEDIN */}
            {activeTab === 'linkedin' && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      LinkedIn Post Body (Punchy, High-Whitespace)
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {editedPost.linkedin.body.length} chars
                    </span>
                  </div>
                  <textarea
                    rows={12}
                    value={editedPost.linkedin.body}
                    onChange={(e) =>
                      setEditedPost({
                        ...editedPost,
                        linkedin: { ...editedPost.linkedin, body: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-xs text-slate-900 dark:text-slate-100 font-sans leading-relaxed focus:outline-none focus:border-purple-500 shadow-inner"
                  />
                </div>

                {/* Delayed First Comment Input */}
                <div className="p-4 rounded-2xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/70 dark:bg-purple-950/20">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>Dedicated Delayed First Comment</span>
                    </label>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                      <span>Delay:</span>
                      <select
                        value={editedPost.linkedin.delay_min}
                        onChange={(e) =>
                          setEditedPost({
                            ...editedPost,
                            linkedin: { ...editedPost.linkedin, delay_min: Number(e.target.value) },
                          })
                        }
                        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 rounded px-2 py-0.5 focus:outline-none"
                      >
                        <option value={1}>1 min</option>
                        <option value={2}>2 mins (Recommended)</option>
                        <option value={5}>5 mins</option>
                      </select>
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Place outbound links and repos here to avoid LinkedIn link demotion..."
                    value={editedPost.linkedin.first_comment}
                    onChange={(e) =>
                      setEditedPost({
                        ...editedPost,
                        linkedin: { ...editedPost.linkedin, first_comment: e.target.value },
                      })
                    }
                    className="w-full bg-white dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1.5">
                    ✓ Upstash Redis queue triggers 120s post-publish to bypass zero-click throttling
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: X (TWITTER) */}
            {activeTab === 'x' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    X Thread Breakdown ({editedPost.x.thread.length} Tweets)
                  </label>
                  <button
                    onClick={() =>
                      setEditedPost({
                        ...editedPost,
                        x: { ...editedPost.x, thread: [...editedPost.x.thread, ''] },
                      })
                    }
                    className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline font-mono font-bold"
                  >
                    + Add Tweet
                  </button>
                </div>

                <div className="space-y-3">
                  {editedPost.x.thread.map((tweet, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1.5">
                        <span>Tweet {idx + 1} of {editedPost.x.thread.length}</span>
                        <span className={tweet.length > 280 ? 'text-red-500 font-bold' : 'text-slate-400'}>
                          {tweet.length}/280 chars
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={tweet}
                        onChange={(e) => {
                          const newThread = [...editedPost.x.thread];
                          newThread[idx] = e.target.value;
                          setEditedPost({
                            ...editedPost,
                            x: { ...editedPost.x, thread: newThread },
                          });
                        }}
                        className="w-full bg-white dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: INSTAGRAM */}
            {activeTab === 'instagram' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    Instagram Caption
                  </label>
                  <textarea
                    rows={8}
                    value={editedPost.instagram.caption}
                    onChange={(e) =>
                      setEditedPost({
                        ...editedPost,
                        instagram: { ...editedPost.instagram, caption: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-slate-200 leading-relaxed focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    Target Hashtags
                  </label>
                  <input
                    type="text"
                    value={editedPost.instagram.hashtags.join(' ')}
                    onChange={(e) =>
                      setEditedPost({
                        ...editedPost,
                        instagram: {
                          ...editedPost.instagram,
                          hashtags: e.target.value.split(' ').filter(Boolean),
                        },
                      })
                    }
                    className="w-full bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-purple-700 dark:text-purple-300 font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            )}

            {/* TAB CONTENT: CAROUSEL SLIDES */}
            {activeTab === 'carousel' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Carousel Slide Editor ({editedPost.carousel_slides.length} Slides)
                  </label>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-bold">1080x1350 (4:5)</span>
                </div>

                <div className="space-y-3">
                  {editedPost.carousel_slides.map((s, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300">
                        Slide {s.slide_number}
                      </div>
                      <input
                        type="text"
                        value={s.headline}
                        onChange={(e) => {
                          const updated = [...editedPost.carousel_slides];
                          updated[idx] = { ...updated[idx], headline: e.target.value };
                          setEditedPost({ ...editedPost, carousel_slides: updated });
                        }}
                        placeholder="Slide Headline..."
                        className="w-full bg-white dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                      <textarea
                        rows={2}
                        value={s.subtext}
                        onChange={(e) => {
                          const updated = [...editedPost.carousel_slides];
                          updated[idx] = { ...updated[idx], subtext: e.target.value };
                          setEditedPost({ ...editedPost, carousel_slides: updated });
                        }}
                        placeholder="Slide explanation (15-20 words max)..."
                        className="w-full bg-white dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ============================================================== */}
          {/* RIGHT PANE: Live Device Preview */}
          {/* ============================================================== */}
          <div className="flex flex-col h-full overflow-y-auto p-6 bg-slate-100 dark:bg-[#05080f] transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                Live Feed Mockup: {activeTab.toUpperCase()}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Pixel-Accurate Device View
              </span>
            </div>

            {editedPost.platforms && editedPost.media_urls[0] && (
              <a href={editedPost.media_urls[0]} download={`campaign-day-${editedPost.day}`}
                className="mb-3 self-start rounded-lg border border-purple-500/40 px-3 py-2 text-xs font-bold text-purple-700 dark:text-purple-300">
                {editedPost.generatedVisual ? 'Download generated image' : 'Download reference image'}
              </a>
            )}
            <div className="flex-1 flex items-start justify-center py-2">
              {activeTab === 'linkedin' && (
                <LinkedInPreview
                  body={editedPost.linkedin.body}
                  firstComment={editedPost.linkedin.first_comment}
                  delayMin={editedPost.linkedin.delay_min}
                  mediaUrls={editedPost.media_urls}
                  carouselSlides={editedPost.generate_carousel && !editedPost.platforms ? editedPost.carousel_slides : []}
                />
              )}

              {activeTab === 'x' && (
                <XPreview
                  thread={editedPost.x.thread}
                  mediaUrls={editedPost.media_urls}
                />
              )}

              {activeTab === 'instagram' && (
                <InstagramPreview
                  caption={editedPost.instagram.caption}
                  hashtags={editedPost.instagram.hashtags}
                  mediaUrls={editedPost.media_urls}
                  carouselSlides={editedPost.generate_carousel && !editedPost.platforms ? editedPost.carousel_slides : []}
                />
              )}

              {activeTab === 'carousel' && (
                <CarouselSlideViewer
                  slides={editedPost.carousel_slides}
                  brand={brand}
                  cover={editedPost.media_urls[0]?.startsWith('data:image/') ? editedPost.media_urls[0] : undefined}
                  onUpdateSlides={(slides) =>
                    setEditedPost({ ...editedPost, carousel_slides: slides })
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
