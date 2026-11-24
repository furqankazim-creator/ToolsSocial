'use client';

import React from 'react';
import { Sparkles, AlertCircle, Clock, CheckCircle2, Send, Plus, Flame } from 'lucide-react';
import { PostItem, PostStatus } from '../lib/types';
import KanbanCard from './KanbanCard';

interface KanbanBoardProps {
  posts: PostItem[];
  onSelectPost: (post: PostItem) => void;
  onApprovePost: (postId: string, e: React.MouseEvent) => void;
  onOpenSeedModal: () => void;
}

interface ColumnConfig {
  id: PostStatus;
  title: string;
  icon: React.ReactNode;
  badgeBg: string;
  badgeText: string;
}

const COLUMNS: ColumnConfig[] = [
  {
    id: 'draft',
    title: 'Drafts',
    icon: <Flame className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
    badgeBg: 'bg-purple-100 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
    badgeText: 'text-purple-700 dark:text-purple-300',
  },
  {
    id: 'needs_review',
    title: 'Needs review',
    icon: <AlertCircle className="w-4 h-4 text-amber-500" />,
    badgeBg: 'bg-amber-100 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
    badgeText: 'text-amber-800 dark:text-amber-300',
  },
  {
    id: 'approved',
    title: 'Approved',
    icon: <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
    badgeBg: 'bg-cyan-100 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
  },
  {
    id: 'published',
    title: 'Published',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    badgeBg: 'bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
  },
];

export default function KanbanBoard({
  posts,
  onSelectPost,
  onApprovePost,
  onOpenSeedModal,
}: KanbanBoardProps) {
  return (
    <div className="flex-1 px-4 py-5 sm:px-7">
      <div className="grid min-w-0 grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => {
          const colPosts = posts.filter((p) => p.status === col.id || (col.id === 'approved' && p.status === 'scheduled'));

          return (
            <div
              key={col.id}
              className="studio-lane flex min-w-0 flex-col rounded-2xl border p-3 sm:p-3.5 xl:min-h-[540px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="studio-panel rounded-lg border p-1.5">
                    {col.icon}
                  </div>
                  <div>
                    <h3 className="studio-display text-sm font-extrabold tracking-tight">
                      {col.title}
                    </h3>
                  </div>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${col.badgeBg} ${col.badgeText}`}
                >
                  {colPosts.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="flex flex-col gap-3 flex-1">
                {colPosts.length === 0 ? (
                  <div className="min-h-28 rounded-xl border border-dashed border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-center text-center p-4">
                    <p className="text-xs text-slate-500 font-medium">No posts in this stage</p>
                    {col.id === 'draft' && (
                      <button
                        onClick={onOpenSeedModal}
                        className="mt-2 text-[11px] text-purple-600 dark:text-purple-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Create a campaign
                      </button>
                    )}
                  </div>
                ) : (
                  colPosts.map((post) => (
                    <KanbanCard
                      key={post.id}
                      post={post}
                      onSelect={onSelectPost}
                      onApprove={onApprovePost}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
