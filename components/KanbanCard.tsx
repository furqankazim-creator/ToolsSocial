'use client';

import React from 'react';
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { PostItem } from '../lib/types';

interface KanbanCardProps {
  post: PostItem;
  onSelect: (post: PostItem) => void;
  onApprove: (postId: string, e: React.MouseEvent) => void;
}

export default function KanbanCard({ post, onSelect, onApprove }: KanbanCardProps) {
  const hookPreview =
    post.linkedin?.body?.split('\n\n')[0] ||
    post.x?.thread?.[0] ||
    post.instagram?.caption?.split('\n\n')[0] ||
    post.core_thesis ||
    post.coreThesis ||
    '';

  const isApproved = post.status === 'approved' || post.status === 'scheduled' || post.status === 'published';

  return (
    <article
      tabIndex={0}
      aria-label={`Open post: ${post.angle_type}`}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onSelect(post);
        }
      }}
      onClick={() => onSelect(post)}
      className="studio-card group relative flex min-w-0 cursor-pointer flex-col justify-between rounded-xl border p-3.5"
    >
      <div>
        {/* Top Header: Day Badge & Time */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
            {post.dayName} • {post.recommended_post_time_utc || '14:00'} UTC
          </span>

          {/* Platform icons */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            {(!post.platforms || post.platforms.includes('linkedin')) && (
              <span className="w-4 h-4 rounded bg-[#0a66c2]/15 text-[#0a66c2] flex items-center justify-center font-bold text-[9px] border border-[#0a66c2]/30">
              in
            </span>
            )}
            {(!post.platforms || post.platforms.includes('x')) && (
              <span className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-[9px] border border-slate-300 dark:border-slate-700">
              𝕏
            </span>
            )}
            {(!post.platforms || post.platforms.includes('instagram')) && (
              <span className="w-4 h-4 rounded bg-gradient-to-tr from-amber-500/20 to-rose-500/20 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold text-[9px] border border-rose-500/30">
              IG
            </span>
            )}
          </div>
        </div>

        {/* Angle Type Badge */}
        <div className="mb-2">
          <span className="studio-display line-clamp-2 text-sm font-extrabold leading-snug">
            {post.angle_type}
          </span>
        </div>

        {/* Hook Preview */}
        <p className="studio-muted mb-3 line-clamp-3 text-sm leading-relaxed">
          {hookPreview}
        </p>

        {/* Media Thumbnail or Carousel Banner */}
        {post.media_urls && post.media_urls.length > 0 ? (
          <div className="relative mb-3 aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
            <img
              src={post.media_urls[0]}
              alt="Post visual"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/75 backdrop-blur rounded text-[9px] font-mono text-white border border-white/10">
              {post.generatedVisual ? 'Generated artwork' : 'Reference photo'}
            </div>
          </div>
        ) : post.generate_carousel && post.carousel_slides?.length > 0 ? (
          <div className="relative mb-3 p-2.5 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/70 dark:bg-gradient-to-r dark:from-purple-950/40 dark:to-slate-900/60 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <Layers className="h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-purple-800 dark:text-purple-200">
                  {post.carousel_slides.length} Slides Carousel
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                  {post.carousel_slides[0]?.headline}
                </div>
              </div>
            </div>
            <span className="shrink-0 text-[9px] font-mono bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded font-bold">
              1080x1350
            </span>
          </div>
        ) : null}
      </div>

      {/* Footer Details: Quality Score & 1-Click Approve */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-bold">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            {post.quality_score.toFixed(1)}/10
          </span>
          {Boolean(post.linkedin?.delay_min && (!post.platforms || post.platforms.includes('linkedin'))) && (
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-0.5">
              <Clock className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              +2m
            </span>
          )}
        </div>

        {/* 1-Click Approve Button */}
        {post.status !== 'published' ? (
          <button
            onClick={(e) => onApprove(post.id, e)}
            title={isApproved ? 'Approved' : '1-Click Approve'}
            className={`min-h-8 rounded-lg px-2 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer ${
              isApproved
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
                : 'bg-violet-100 text-violet-800 hover:bg-violet-200 dark:bg-violet-500/20 dark:text-violet-200 dark:hover:bg-violet-500/30'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isApproved ? 'Approved' : 'Approve'}</span>
          </button>
        ) : (
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Live</span>
          </span>
        )}
      </div>
    </article>
  );
}
