/**
 * Auto-Carousel Generation Engine
 * Aspect Ratio: 1080x1350 (4:5 Portrait Optimized for LinkedIn & Instagram)
 * Provides HTML/CSS templates, SVG rendering, and Cloudflare/Playwright export hooks
 */

import { CarouselSlideData } from '../types';

export interface CarouselThemeConfig {
  background: string;
  cardBg: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  badgeBg: string;
}

export const CAROUSEL_THEMES: Record<string, CarouselThemeConfig> = {
  'dark-purple': {
    background: 'linear-gradient(145deg, #0d0a1a 0%, #17112d 50%, #090514 100%)',
    cardBg: 'rgba(255, 255, 255, 0.04)',
    accent: '#8b5cf6',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
  },
  'midnight-cyan': {
    background: 'linear-gradient(145deg, #05131e 0%, #082438 50%, #030c14 100%)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    accent: '#06b6d4',
    textPrimary: '#ffffff',
    textSecondary: '#a5f3fc',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
  },
  'monochrome': {
    background: 'linear-gradient(145deg, #121212 0%, #1e1e1e 100%)',
    cardBg: 'rgba(255, 255, 255, 0.06)',
    accent: '#f8fafc',
    textPrimary: '#ffffff',
    textSecondary: '#cbd5e1',
    badgeBg: 'rgba(255, 255, 255, 0.12)',
  },
};

export function generateSlideHtml(
  slide: CarouselSlideData,
  totalSlides: number,
  brandName = 'Sarah Chen | @sarahcodes',
  themeKey = 'dark-purple'
): string {
  const theme = CAROUSEL_THEMES[themeKey] || CAROUSEL_THEMES['dark-purple'];
  const isFirst = slide.slide_number === 1;
  const isLast = slide.slide_number === totalSlides;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1350px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: ${theme.background};
      color: ${theme.textPrimary};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 90px;
      position: relative;
      overflow: hidden;
    }
    .watermark {
      position: absolute;
      top: -100px;
      right: -100px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, ${theme.accent} 0%, transparent 70%);
      opacity: 0.15;
      filter: blur(60px);
      pointer-events: none;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
    }
    .brand-pill {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: ${theme.textPrimary};
    }
    .brand-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: ${theme.accent};
    }
    .slide-counter {
      font-size: 24px;
      font-weight: 600;
      color: ${theme.accent};
      background: ${theme.badgeBg};
      padding: 8px 20px;
      border-radius: 9999px;
      border: 1px solid ${theme.accent}40;
    }
    .content-box {
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 36px;
      margin-top: auto;
      margin-bottom: auto;
    }
    .headline {
      font-size: ${isFirst ? '68px' : '56px'};
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -1.5px;
      color: ${theme.textPrimary};
    }
    .subtext {
      font-size: 32px;
      line-height: 1.45;
      color: ${theme.textSecondary};
      max-width: 900px;
      font-weight: 400;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 40px;
      border-top: 2px solid rgba(255, 255, 255, 0.08);
      z-index: 10;
    }
    .footer-action {
      font-size: 24px;
      font-weight: 600;
      color: ${theme.textSecondary};
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .swipe-pill {
      font-size: 22px;
      font-weight: 700;
      color: ${theme.accent};
      display: flex;
      align-items: center;
      gap: 8px;
    }
  </style>
</head>
<body>
  <div class="watermark"></div>
  <div class="header">
    <div class="brand-pill">
      <div class="brand-dot"></div>
      ${brandName}
    </div>
    <div class="slide-counter">${slide.slide_number} / ${totalSlides}</div>
  </div>

  <div class="content-box">
    <h1 class="headline">${slide.headline}</h1>
    <p class="subtext">${slide.subtext}</p>
  </div>

  <div class="footer">
    <div class="footer-action">
      ${isLast ? '🔖 Save & Share' : '⚡ 100% Free API Stack'}
    </div>
    <div class="swipe-pill">
      ${isLast ? 'Follow for more' : 'Swipe next →'}
    </div>
  </div>
</body>
</html>
  `.trim();
}
