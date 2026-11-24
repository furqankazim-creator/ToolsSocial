'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PostItem } from '../lib/types';

interface CalendarViewProps {
  posts: PostItem[];
  campaignStart?: string;
  onSelectPost: (post: PostItem) => void;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function CalendarView({ posts, onSelectPost, campaignStart }: CalendarViewProps) {
  return (
    <div className="min-w-0 flex-1 px-4 py-5 sm:px-7">
      {/* Calendar Header Notice */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Campaign calendar</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            Suggested times shown in UTC
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Live
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Approved
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Review
          </span>
        </div>
      </div>

      {/* Grid: 7 Columns for Days */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
        {DAYS_OF_WEEK.map((weekday, idx) => {
          const dayNumber = idx + 1;
          const dayPost = posts.find((p) => p.day === dayNumber);
          const date = campaignStart ? new Date(campaignStart) : null;
          if (date) date.setUTCDate(date.getUTCDate() + dayNumber);
          const dayName = date
            ? date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })
            : dayPost?.dayName || weekday;

          return (
            <div
              key={dayName}
              className="studio-lane flex min-w-0 flex-col rounded-2xl border p-3.5 sm:min-h-56"
            >
              {/* Day Header */}
              <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{dayName}</div>
                  <div className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-semibold">Day {dayNumber}</div>
                </div>
                {dayPost && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold shadow-xs">
                    {dayPost.recommended_post_time_utc || '14:00'} UTC
                  </span>
                )}
              </div>

              {/* Day Content Card */}
              {dayPost ? (
                <div
                  onClick={() => onSelectPost(dayPost)}
                  className="studio-card group flex flex-1 cursor-pointer flex-col justify-between rounded-xl border p-3.5"
                >
                  <div>
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded border ${
                          dayPost.status === 'published'
                            ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30'
                            : ['scheduled', 'approved'].includes(dayPost.status)
                            ? 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30'
                            : 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30'
                        }`}
                      >
                        {dayPost.status.replace('_', ' ')}
                      </span>

                      <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
                        <span>in</span>
                        <span>𝕏</span>
                        <span>IG</span>
                      </div>
                    </div>

                    {/* Angle */}
                    <div className="text-[10px] font-bold text-purple-700 dark:text-purple-300 mb-1.5 line-clamp-1">
                      {dayPost.angle_type}
                    </div>

                    {/* Hook Text */}
                    <p className="text-xs text-slate-700 dark:text-slate-200 line-clamp-4 leading-relaxed group-hover:text-purple-700 dark:group-hover:text-white transition">
                      {dayPost.linkedin?.body?.split('\n\n')[0] || dayPost.core_thesis || dayPost.coreThesis}
                    </p>

                    {/* Thumbnail if present */}
                    {dayPost.media_urls?.[0] ? (
                      <div className="mt-2.5 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <img
                          src={dayPost.media_urls[0]}
                          alt="Post asset"
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                    ) : dayPost.generate_carousel ? (
                      <div className="mt-2.5 p-2 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/20 flex items-center gap-1.5 text-[10px] text-purple-700 dark:text-purple-300 font-mono font-semibold">
                        <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        <span>{dayPost.carousel_slides?.length || 6} Slide Carousel</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 mt-3 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      {dayPost.quality_score}
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold group-hover:underline">Edit →</span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center p-3 text-slate-400 dark:text-slate-600 text-xs">
                  <span>Empty Slot</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
