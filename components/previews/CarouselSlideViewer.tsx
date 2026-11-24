'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Sparkles, Layers } from 'lucide-react';
import { CarouselSlideData } from '../../lib/types';
import { exportCarouselSlide } from '../../lib/carousel-png';
import { CAROUSEL_THEMES } from '../../lib/ai/carousel-generator';

interface CarouselSlideViewerProps {
  slides: CarouselSlideData[];
  onUpdateSlides?: (slides: CarouselSlideData[]) => void;
  brand: string;
  cover?: string;
}

export default function CarouselSlideViewer({
  slides,
  brand,
  cover,
}: CarouselSlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [themeKey, setThemeKey] = useState<string>('dark-purple');
  const [exportError, setExportError] = useState('');
  const [downloading, setDownloading] = useState(false);

  if (!slides || slides.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
        <Layers className="w-6 h-6 mb-2 text-slate-600" />
        <span>No carousel slides generated for this day</span>
      </div>
    );
  }

  const slide = slides[currentSlide] || slides[0];
  const theme = CAROUSEL_THEMES[themeKey] || CAROUSEL_THEMES['dark-purple'];

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Theme Picker */}
      <div className="w-full flex items-center justify-between mb-3 text-xs">
        <span className="text-slate-400 font-mono text-[11px]">Slide Theme:</span>
        <div className="flex items-center gap-1.5">
          {Object.keys(CAROUSEL_THEMES).map((key) => (
            <button
              key={key}
              onClick={() => setThemeKey(key)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize transition ${
                themeKey === key
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {key.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Slide Container (Aspect Ratio 4:5 - 1080x1350) */}
      <div
        style={{ background: theme.background }}
        className="w-full max-w-[380px] aspect-[4/5] rounded-2xl p-7 flex flex-col justify-between border border-white/10 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle radial glow */}
        <div
          className="absolute -top-24 -right-24 w-60 h-60 rounded-full pointer-events-none opacity-20 filter blur-3xl"
          style={{ background: theme.accent }}
        />

        {/* Top Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: theme.accent }} />
            <span>{brand}</span>
          </div>
          <span
            className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border"
            style={{
              color: theme.accent,
              background: theme.badgeBg,
              borderColor: `${theme.accent}40`,
            }}
          >
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {currentSlide === 0 && cover && (
          <img src={cover} alt="Campaign carousel cover" className="z-10 mt-3 h-1/3 w-full rounded-lg object-contain" />
        )}

        {/* Body */}
        <div className="my-auto py-3 z-10">
          <h2 className="text-2xl font-black text-white leading-tight tracking-tight mb-3">
            {slide.headline}
          </h2>
          <p
            className="text-xs leading-relaxed font-normal"
            style={{ color: theme.textSecondary }}
          >
            {slide.subtext}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono z-10">
          <span style={{ color: theme.textSecondary }}>{brand}</span>
          <span style={{ color: theme.accent }} className="font-semibold">
            {currentSlide === slides.length - 1 ? 'Save & Share 🔖' : 'Swipe next →'}
          </span>
        </div>
      </div>

      <button type="button" className="studio-secondary mt-3" disabled={downloading} onClick={async () => {
        setDownloading(true);
        setExportError('');
        try {
          await exportCarouselSlide(slide, slides.length, theme, brand, cover);
        } catch (error) {
          setExportError(error instanceof Error ? error.message : 'Could not export this slide.');
        } finally {
          setDownloading(false);
        }
      }}>
        <Download className="h-4 w-4" />
        {downloading ? 'Preparing PNG…' : `Download slide ${currentSlide + 1} PNG`}
      </button>
      {exportError && <p role="alert" className="mt-2 text-sm text-rose-500">{exportError}</p>}

      {/* Navigation Controls */}
      <div className="w-full max-w-[380px] flex items-center justify-between mt-3 px-2">
        <button
          onClick={() => setCurrentSlide((i) => Math.max(0, i - 1))}
          disabled={currentSlide === 0}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold text-slate-200 flex items-center gap-1 transition"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Prev</span>
        </button>

        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentSlide ? 'w-5 bg-purple-500' : 'w-1.5 bg-slate-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((i) => Math.min(slides.length - 1, i + 1))}
          disabled={currentSlide === slides.length - 1}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold text-slate-200 flex items-center gap-1 transition"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
