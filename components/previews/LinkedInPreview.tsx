'use client';

import React, { useState } from 'react';
import {
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  Globe,
  MoreHorizontal,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CarouselSlideData } from '../../lib/types';

interface LinkedInPreviewProps {
  authorName?: string;
  authorTitle?: string;
  avatarUrl?: string;
  body: string;
  firstComment?: string;
  delayMin?: number;
  mediaUrls?: string[];
  carouselSlides?: CarouselSlideData[];
}

export default function LinkedInPreview({
  authorName = 'Sarah Chen',
  authorTitle = 'Founder & AI Systems Architect • Building Autonomous Social Tech',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  body,
  firstComment,
  delayMin = 2,
  mediaUrls = [],
  carouselSlides = [],
}: LinkedInPreviewProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const lines = body ? body.split('\n') : [''];
  const hasLongText = body && body.length > 280;

  return (
    <div className="w-full max-w-[540px] mx-auto bg-[#1b1f23] text-slate-100 rounded-xl border border-slate-700/80 shadow-2xl overflow-hidden font-sans select-none">
      {/* Top Header */}
      <div className="p-3.5 pb-2 flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <img src={avatarUrl} alt={authorName} className="w-11 h-11 rounded-full object-cover ring-1 ring-slate-600" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white hover:underline cursor-pointer">{authorName}</span>
              <span className="text-[10px] text-slate-400 font-normal">• 1st</span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 max-w-[340px]">{authorTitle}</p>
            <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
              <span>3h</span>
              <span>•</span>
              <Globe className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-white p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Post Text */}
      <div className="px-3.5 py-2 text-xs text-slate-200 leading-relaxed whitespace-pre-line">
        {hasLongText && !isExpanded ? (
          <>
            {body.slice(0, 240)}...{' '}
            <span
              onClick={() => setIsExpanded(true)}
              className="text-slate-400 hover:text-white cursor-pointer font-semibold"
            >
              see more
            </span>
          </>
        ) : (
          body
        )}
      </div>

      {/* Media Attachment or Carousel Document */}
      {carouselSlides && carouselSlides.length > 0 ? (
        <div className="mt-2 bg-[#0d0a1a] border-y border-slate-700/60 relative flex flex-col items-center justify-between p-6 min-h-[340px]">
          {/* Document Top Bar */}
          <div className="w-full flex items-center justify-between text-[11px] text-purple-300 font-mono mb-4">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              Document Carousel ({slideIndex + 1}/{carouselSlides.length})
            </span>
            <span className="bg-purple-900/40 px-2 py-0.5 rounded text-[10px]">PDF Viewer</span>
          </div>

          {/* Current Slide Display */}
          <div className="my-auto text-center px-4 max-w-sm">
            <h4 className="text-lg font-extrabold text-white leading-snug mb-2">
              {carouselSlides[slideIndex]?.headline}
            </h4>
            <p className="text-xs text-purple-200/80 leading-relaxed">
              {carouselSlides[slideIndex]?.subtext}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="w-full flex items-center justify-between pt-4 border-t border-white/10 mt-4">
            <button
              onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
              disabled={slideIndex === 0}
              className="p-1 rounded bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              {carouselSlides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === slideIndex ? 'w-4 bg-purple-500' : 'w-1.5 bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setSlideIndex((i) => Math.min(carouselSlides.length - 1, i + 1))}
              disabled={slideIndex === carouselSlides.length - 1}
              className="p-1 rounded bg-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-700 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : mediaUrls && mediaUrls.length > 0 ? (
        <div className="mt-2 w-full max-h-[380px] overflow-hidden bg-black flex items-center justify-center border-y border-slate-700">
          <img src={mediaUrls[0]} alt="Post attachment" className="w-full h-auto object-cover" />
        </div>
      ) : null}

      {/* Engagement Counter */}
      <div className="px-3.5 py-2 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="flex -space-x-1">
            <span className="w-4 h-4 rounded-full bg-[#0a66c2] flex items-center justify-center text-[9px] text-white">👍</span>
            <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[9px] text-white">❤️</span>
          </span>
          <span>142</span>
        </div>
        <div className="flex items-center gap-2">
          <span>38 comments</span>
          <span>•</span>
          <span>14 reposts</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-1 flex items-center justify-around text-slate-400 border-b border-slate-800">
        <button className="flex items-center gap-1.5 py-2 px-3 hover:bg-slate-800 rounded text-xs font-semibold hover:text-slate-200">
          <ThumbsUp className="w-4 h-4" />
          <span>Like</span>
        </button>
        <button className="flex items-center gap-1.5 py-2 px-3 hover:bg-slate-800 rounded text-xs font-semibold hover:text-slate-200">
          <MessageSquare className="w-4 h-4" />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-1.5 py-2 px-3 hover:bg-slate-800 rounded text-xs font-semibold hover:text-slate-200">
          <Repeat2 className="w-4 h-4" />
          <span>Repost</span>
        </button>
        <button className="flex items-center gap-1.5 py-2 px-3 hover:bg-slate-800 rounded text-xs font-semibold hover:text-slate-200">
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </div>

      {/* Delayed First Comment Section */}
      {firstComment && (
        <div className="p-3 bg-slate-900/90 border-t border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-purple-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Delayed First Comment (+{delayMin}m Queue)</span>
            </div>
            <span className="text-[9px] font-mono bg-cyan-500/10 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-500/20">
              Avoids Link Penalty
            </span>
          </div>

          <div className="flex items-start gap-2 bg-[#1b1f23] p-2.5 rounded-lg border border-slate-800">
            <img src={avatarUrl} alt={authorName} className="w-7 h-7 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white">{authorName}</span>
                <span className="text-[10px] text-purple-400 font-mono">(Author)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 break-words">{firstComment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
