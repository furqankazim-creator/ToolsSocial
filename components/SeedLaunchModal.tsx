'use client';

import React, { useState } from 'react';
import { X, Upload, Loader2, Flame, CheckCircle2 } from 'lucide-react';
import { PlatformKey } from '../lib/types';

interface SeedLaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunBrain: (goal: string, images: string[], platforms: Record<PlatformKey, boolean>, creativeDirection: string, styleReferences: string[]) => Promise<void>;
  isGenerating: boolean;
  error: string;
}

export default function SeedLaunchModal({
  isOpen,
  onClose,
  onRunBrain,
  isGenerating,
  error,
}: SeedLaunchModalProps) {
  const [goal, setGoal] = useState('');
  const [creativeDirection, setCreativeDirection] = useState('');
  const [platforms, setPlatforms] = useState({ linkedin: true, x: true, instagram: true });
  const [images, setImages] = useState<string[]>([]);
  const [styleReferences, setStyleReferences] = useState<string[]>([]);
  const [imageError, setImageError] = useState('');
  const [readingImages, setReadingImages] = useState(false);

  if (!isOpen) return null;

  const attachImages = async (files: FileList | null, kind: 'product' | 'style') => {
    if (!files?.length) return;
    const currentImages = kind === 'product' ? images : styleReferences;
    const setCurrentImages = kind === 'product' ? setImages : setStyleReferences;
    if (files.length + currentImages.length > 2 || Array.from(files).some((file) =>
      !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 4 * 1024 * 1024
    )) {
      setImageError('Each section accepts up to two JPEG, PNG, or WebP images up to 4 MB each.');
      return;
    }

    setReadingImages(true);
    setImageError('');
    try {
      const added = await Promise.all(Array.from(files, (file) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject();
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })));
      const encodedSize = [...images, ...styleReferences, ...added].reduce((size, image) => size + image.length, 0);
      if (encodedSize > 19_000_000) {
        setImageError('The combined upload is too large. Choose smaller images.');
        return;
      }
      setCurrentImages([...currentImages, ...added]);
    } catch {
      setImageError('An image could not be read. Please select the files again.');
    } finally {
      setReadingImages(false);
    }
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Campaign setup" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-poppins">
      <div className="studio-panel relative flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between bg-slate-50 dark:bg-[#070A12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/10 dark:bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
              <Flame className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="studio-display text-lg font-extrabold tracking-tight">
                New campaign
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Product photos to seven days of social drafts
              </p>
            </div>
          </div>
          {!isGenerating && (
            <button
              aria-label="Close campaign setup"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto min-h-0">
          {isGenerating ? (
            <div role="status" className="py-10 flex flex-col items-center text-center">
              <Loader2 className="w-8 h-8 mb-4 text-purple-500 animate-spin" />
              <h4 className="text-base font-extrabold">Building your campaign</h4>
              <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                We’re analyzing your product photos, researching the campaign, and creating seven days of copy and visuals. This can take a few minutes.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                {([
                  { kind: 'product', title: 'Product photos', description: 'Required · 1–2 images', items: images, setItems: setImages },
                  { kind: 'style', title: 'Style references', description: 'Optional · up to 2 images', items: styleReferences, setItems: setStyleReferences },
                ] as const).map(({ kind, title, description, items, setItems }) => (
                  <section key={kind} className="rounded-xl border border-dashed border-slate-300 p-3 dark:border-slate-700"
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      if (!readingImages) void attachImages(event.dataTransfer.files, kind);
                    }}>
                    <h4 className="text-sm font-bold">{title}</h4>
                    <p className="studio-muted mt-0.5 text-xs">{description}</p>
                    {items.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-3">
                        {items.map((img, index) => (
                          <div key={index} className="relative h-14 w-16">
                            <img src={img} alt={`${title} ${index + 1}`}
                              className="h-full w-full rounded-lg border border-slate-300 object-cover dark:border-slate-700" />
                            <button type="button" aria-label={`Remove ${kind} image ${index + 1}`}
                              disabled={readingImages}
                              onClick={() => {
                                setItems((current) => current.filter((_, i) => i !== index));
                                setImageError('');
                              }}
                              className="absolute -right-1.5 -top-1.5 grid h-7 w-7 place-items-center rounded-full border border-white/40 bg-slate-950 text-white shadow-sm hover:bg-rose-700 disabled:opacity-50">
                              <X aria-hidden="true" className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {items.length < 2 && (
                      <label className="mt-3 flex cursor-pointer items-center gap-2 rounded-lg text-xs font-semibold text-violet-700 focus-within:ring-2 focus-within:ring-violet-500 dark:text-violet-300">
                        <input type="file" aria-label={`Upload ${title.toLowerCase()}`} className="sr-only" accept="image/jpeg,image/png,image/webp"
                          multiple={items.length === 0} disabled={readingImages} onChange={(event) => {
                            void attachImages(event.target.files, kind);
                            event.target.value = '';
                          }} />
                        <Upload aria-hidden="true" className="h-4 w-4" />
                        {readingImages ? 'Reading images…' : 'Add or drop images'}
                      </label>
                    )}
                  </section>
                ))}
              </div>
              <p className="studio-muted text-xs">JPEG, PNG, or WebP · Up to 4 MB each</p>
              {imageError && <p role="alert" className="text-xs text-rose-500">{imageError}</p>}

              {/* Campaign Goal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 font-mono">
                  Campaign objective
                </label>
                <textarea
                  aria-label="Campaign objective"
                  maxLength={2000}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-purple-500 transition leading-relaxed font-sans"
                  placeholder="What are you promoting, who is it for, and what should people do next?"
                />
              </div>

              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">
                Visual direction (optional)
                <input value={creativeDirection} maxLength={500} onChange={(event) => setCreativeDirection(event.target.value)}
                  placeholder="e.g. forest green and cream, soft studio lighting"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent p-3 dark:border-slate-800" />
              </label>

              {error && <p role="alert" className="text-sm text-rose-500">{error}</p>}

              {/* Platform Toggles */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 font-mono">
                  Publishing platforms
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'linkedin', label: 'LinkedIn', desc: 'Punchy post + 2m comment' },
                    { key: 'x', label: 'X (Twitter)', desc: 'Thread or sharp update' },
                    { key: 'instagram', label: 'Instagram', desc: 'Caption + 4:5 Carousel' },
                  ].map((p) => {
                    const active = platforms[p.key as keyof typeof platforms];
                    return (
                      <button
                        type="button"
                        aria-pressed={active}
                        key={p.key}
                        onClick={() =>
                          setPlatforms((prev) => ({
                            ...prev,
                            [p.key]: !prev[p.key as keyof typeof platforms],
                          }))
                        }
                        className={`p-3 rounded-2xl border transition cursor-pointer select-none text-left ${
                          active
                            ? 'border-purple-500/50 bg-purple-50 dark:bg-purple-600/10'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{p.label}</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              active ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-400 dark:border-slate-700'
                            }`}
                          >
                            {active && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono leading-tight">{p.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!isGenerating && (
          <div className="studio-lane flex flex-wrap items-center justify-end gap-2 border-t p-4 sm:justify-between">
            <span className="studio-muted text-xs">
              Instagram carousel on Day 4 · Image API charges may apply
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="studio-secondary"
              >
                Cancel
              </button>
              <button
                disabled={readingImages || !goal.trim() || !images.length || !Object.values(platforms).some(Boolean)}
                onClick={() => onRunBrain(goal, images, platforms, creativeDirection, styleReferences)}
                className="studio-primary"
              >
                <Flame className="w-4 h-4 text-white" />
                <span>Run Autonomous Brain (7-Days)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
