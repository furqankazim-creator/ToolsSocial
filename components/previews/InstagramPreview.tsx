'use client';

import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { CarouselSlideData } from '../../lib/types';

interface InstagramPreviewProps {
  authorName?: string;
  handle?: string;
  avatarUrl?: string;
  caption: string;
  hashtags?: string[];
  mediaUrls?: string[];
  carouselSlides?: CarouselSlideData[];
}

export default function InstagramPreview({
  authorName = 'Sarah Chen',
  handle = 'sarah.builds',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  caption,
  hashtags = [],
  mediaUrls = [],
  carouselSlides = [],
}: InstagramPreviewProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasCarousel = carouselSlides && carouselSlides.length > 0;
  const totalSlides = hasCarousel ? carouselSlides.length : 1;

  return (
    <div className="w-full max-w-[420px] mx-auto bg-black text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden font-sans select-none">
      {/* Top Bar */}
      <div className="p-3.5 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-2.5">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
            <img
              src={avatarUrl}
              alt={handle}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-black"
            />
          </div>
          <div>
            <span className="text-xs font-bold text-white hover:underline cursor-pointer">
              {handle}
            </span>
            <span className="block text-[10px] text-slate-400">Original audio</span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-white p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Media Display (4:5 Portrait Aspect Ratio 1080x1350) */}
      <div className="relative w-full aspect-[4/5] bg-[#0d0a1a] flex flex-col justify-between overflow-hidden">
        {hasCarousel ? (
          <>
            {/* Slide Index Badge */}
            <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white/90 border border-white/10">
              {activeSlide + 1}/{totalSlides}
            </div>

            {/* Slide Graphic */}
            <div className="flex-1 flex flex-col justify-between p-7 text-center relative z-10">
              <div className="flex items-center justify-between text-[11px] font-mono text-purple-300">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  {authorName}
                </span>
                <span className="bg-purple-900/40 px-2 py-0.5 rounded text-[10px]">
                  Autonomous Agent
                </span>
              </div>

              <div className="my-auto py-4">
                <h3 className="text-xl font-extrabold text-white leading-tight mb-3">
                  {carouselSlides[activeSlide]?.headline}
                </h3>
                <p className="text-xs text-purple-200/80 leading-relaxed max-w-[280px] mx-auto">
                  {carouselSlides[activeSlide]?.subtext}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-3 border-t border-white/10">
                <span>⚡ 100% Free API Stack</span>
                <span className="text-purple-400 font-semibold">Swipe next →</span>
              </div>
            </div>

            {/* Slide Controls */}
            {activeSlide > 0 && (
              <button
                onClick={() => setActiveSlide((i) => i - 1)}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {activeSlide < totalSlides - 1 && (
              <button
                onClick={() => setActiveSlide((i) => i + 1)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </>
        ) : mediaUrls && mediaUrls.length > 0 ? (
          <img src={mediaUrls[0]} alt="Post media" className="w-full h-full object-cover" />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-xs">
            No media attached
          </div>
        )}
      </div>

      {/* Action Row & Pagination Dots */}
      <div className="p-3.5 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="text-white hover:text-rose-500 transition"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
            <button className="text-white hover:text-slate-300">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-slate-300">
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          {hasCarousel && (
            <div className="flex gap-1.5">
              {carouselSlides.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === activeSlide ? 'bg-purple-500 scale-125' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          )}

          <button className="text-white hover:text-slate-300">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Likes Count */}
        <div className="text-xs font-bold text-white mb-1.5">184 likes</div>

        {/* Caption */}
        <div className="text-xs text-slate-200 leading-relaxed">
          <span className="font-bold text-white mr-1.5">{handle}</span>
          {isExpanded || !caption || caption.length <= 110 ? (
            <span className="whitespace-pre-line">{caption}</span>
          ) : (
            <span>
              {caption.slice(0, 110)}...{' '}
              <button
                onClick={() => setIsExpanded(true)}
                className="text-slate-400 hover:text-white font-semibold text-[11px]"
              >
                more
              </button>
            </span>
          )}
        </div>

        {/* Hashtags */}
        {hashtags && hashtags.length > 0 && (
          <div className="mt-2 text-[11px] text-purple-400 font-mono space-x-1">
            {hashtags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        <div className="text-[10px] text-slate-500 uppercase mt-2 font-mono">2 hours ago</div>
      </div>
    </div>
  );
}
