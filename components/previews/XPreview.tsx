'use client';

import React from 'react';
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  BadgeCheck,
  MoreHorizontal,
} from 'lucide-react';

interface XPreviewProps {
  authorName?: string;
  handle?: string;
  avatarUrl?: string;
  thread: string[];
  mediaUrls?: string[];
}

export default function XPreview({
  authorName = 'Sarah Chen ⚡',
  handle = '@sarahcodes',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  thread = [],
  mediaUrls = [],
}: XPreviewProps) {
  const tweets = thread.length > 0 ? thread : ['Drafting your tweet...'];

  return (
    <div className="w-full max-w-[540px] mx-auto bg-black text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-sans select-none">
      <div className="divide-y divide-slate-800">
        {tweets.map((tweetText, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === tweets.length - 1;

          return (
            <div key={idx} className="p-4 relative flex gap-3 hover:bg-white/[0.02] transition">
              {/* Avatar + Thread vertical connector */}
              <div className="flex flex-col items-center">
                <img
                  src={avatarUrl}
                  alt={authorName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-800 shrink-0"
                />
                {!isLast && (
                  <div className="w-0.5 bg-slate-800 flex-1 my-1" />
                )}
              </div>

              {/* Tweet Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-sm font-bold text-white hover:underline cursor-pointer">
                      {authorName}
                    </span>
                    <BadgeCheck className="w-4 h-4 text-cyan-400 fill-cyan-400 shrink-0" />
                    <span className="text-xs text-slate-500 font-mono">{handle}</span>
                    <span className="text-xs text-slate-500 font-mono">· 2h</span>
                  </div>
                  <button className="text-slate-500 hover:text-slate-300 p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Tweet Body */}
                <div className="text-[13px] text-slate-100 whitespace-pre-line leading-relaxed mb-3">
                  {tweetText}
                </div>

                {/* Attached Image for First Tweet */}
                {isFirst && mediaUrls && mediaUrls.length > 0 && (
                  <div className="mb-3 rounded-2xl overflow-hidden border border-slate-800 max-h-72">
                    <img src={mediaUrls[0]} alt="Tweet media" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Engagement Icons */}
                <div className="flex items-center justify-between text-slate-500 max-w-sm pt-1">
                  <div className="flex items-center gap-1.5 text-xs hover:text-cyan-400 transition cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    <span>24</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs hover:text-emerald-400 transition cursor-pointer">
                    <Repeat2 className="w-4 h-4" />
                    <span>8</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs hover:text-rose-500 transition cursor-pointer">
                    <Heart className="w-4 h-4" />
                    <span>118</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs hover:text-cyan-400 transition cursor-pointer">
                    <Bookmark className="w-4 h-4" />
                    <span>42</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs hover:text-cyan-400 transition cursor-pointer">
                    <Share className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
