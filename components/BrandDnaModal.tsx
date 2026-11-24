'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Plus, Trash2, Fingerprint, Sparkles, Flame } from 'lucide-react';
import { BrandDnaData } from '../lib/types';

interface BrandDnaModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandDna: BrandDnaData;
  onSave: (updated: BrandDnaData) => void;
}

export default function BrandDnaModal({
  isOpen,
  onClose,
  brandDna,
  onSave,
}: BrandDnaModalProps) {
  const [data, setData] = useState<BrandDnaData>(brandDna);
  const [newBannedWord, setNewBannedWord] = useState('');
  const [newExamplePost, setNewExamplePost] = useState('');

  if (!isOpen) return null;

  const handleAddBannedWord = () => {
    if (newBannedWord.trim() && !data.bannedWords.includes(newBannedWord.trim().toLowerCase())) {
      setData((prev) => ({
        ...prev,
        bannedWords: [...prev.bannedWords, newBannedWord.trim().toLowerCase()],
      }));
      setNewBannedWord('');
    }
  };

  const handleRemoveBannedWord = (word: string) => {
    setData((prev) => ({
      ...prev,
      bannedWords: prev.bannedWords.filter((w) => w !== word),
    }));
  };

  const handleAddExample = () => {
    if (newExamplePost.trim()) {
      setData((prev) => ({
        ...prev,
        examplePosts: [...prev.examplePosts, newExamplePost.trim()],
      }));
      setNewExamplePost('');
    }
  };

  const handleRemoveExample = (index: number) => {
    setData((prev) => ({
      ...prev,
      examplePosts: prev.examplePosts.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-poppins">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-colors duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#070A12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
              <Fingerprint className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                Brand Voice DNA & Anti-Slop Settings
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Enforce founder sentence rhythm & eliminate robotic AI buzzwords
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Voice Tone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 font-mono">
              Voice Profile & Tone
            </label>
            <input
              type="text"
              value={data.voiceTone}
              onChange={(e) => setData({ ...data, voiceTone: e.target.value })}
              className="w-full bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-slate-800 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Banned Slop Words Tags */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Banned Buzzwords & AI Slop Tokens</span>
              </label>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-bold">
                {data.bannedWords.length} Words Enforced
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-slate-800 min-h-[80px]">
              {data.bannedWords.map((word) => (
                <span
                  key={word}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/20 text-xs font-mono font-bold"
                >
                  <span>"{word}"</span>
                  <button
                    onClick={() => handleRemoveBannedWord(word)}
                    className="hover:text-red-900 dark:hover:text-red-100 p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Add banned buzzword (e.g. paradigm-shift)..."
                value={newBannedWord}
                onChange={(e) => setNewBannedWord(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddBannedWord()}
                className="flex-1 bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAddBannedWord}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Tag
              </button>
            </div>
          </div>

          {/* Past High-Performing Posts Examples */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 font-mono">
              Past High-Performing Examples (AI Mimics This Sentence Rhythm)
            </label>
            <div className="space-y-2 mb-3">
              {data.examplePosts.map((post, index) => (
                <div
                  key={index}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-sans"
                >
                  <p className="line-clamp-2">"{post}"</p>
                  <button
                    onClick={() => handleRemoveExample(index)}
                    className="text-slate-400 hover:text-red-500 p-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Paste an excerpt of your best authentic post..."
                value={newExamplePost}
                onChange={(e) => setNewExamplePost(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddExample()}
                className="flex-1 bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAddExample}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Example
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070A12] flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Passed to Groq Llama 3.3 in Agent 2
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(data);
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-sm"
            >
              Save Brand DNA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
