import type { CarouselThemeConfig } from './ai/carousel-generator';
import type { CarouselSlideData } from './types';

export async function exportCarouselSlide(
  slide: CarouselSlideData,
  total: number,
  theme: CarouselThemeConfig,
  brand: string,
  cover?: string
) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Image export is unavailable in this browser.');

  const colors = theme.background.match(/#[0-9a-f]{6}/gi) || ['#0d0a1a', '#090514'];
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  colors.forEach((color, index) => gradient.addColorStop(index / Math.max(1, colors.length - 1), color));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = theme.accent;
  ctx.fillRect(84, 95, 20, 20);
  ctx.font = '700 30px system-ui';
  ctx.fillStyle = theme.textPrimary;
  ctx.fillText(brand, 126, 114, 710);
  ctx.textAlign = 'right';
  ctx.fillText(`${slide.slide_number} / ${total}`, 996, 114);
  ctx.textAlign = 'start';

  let top = 300;
  if (cover && slide.slide_number === 1) {
    const image = new Image();
    image.src = cover;
    await image.decode();
    const width = 912;
    const height = 410;
    const scale = Math.min(width / image.width, height / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    ctx.fillStyle = theme.cardBg;
    ctx.fillRect(84, 169, width, height);
    ctx.drawImage(image, 84 + (width - drawWidth) / 2, 169 + (height - drawHeight) / 2, drawWidth, drawHeight);
    top = 628;
  }

  const measureLines = (value: string, maxWidth: number) => {
    const words = value.trim().split(/\s+/);
    const lines: string[] = [];
    let line = '';
    for (const word of words) {
      if (line && ctx.measureText(`${line} ${word}`).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = line ? `${line} ${word}` : word;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  const drawText = (value: string, size: number, weight: number, color: string, maxHeight: number) => {
    let lines: string[];
    let lineHeight: number;
    do {
      ctx.font = `${weight} ${size}px system-ui`;
      lines = measureLines(value, 912);
      lineHeight = size * 1.25;
      if (lines.length * lineHeight <= maxHeight) break;
      size -= 2;
    } while (size >= 26);
    if (lines.length * lineHeight > maxHeight) throw new Error('Shorten the slide text before downloading.');
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';
    for (const line of lines) {
      ctx.fillText(line, 84, top, 912);
      top += lineHeight;
    }
  };
  drawText(slide.headline, 72, 800, theme.textPrimary, 260);
  top += 24;
  drawText(slide.subtext, 42, 500, theme.textSecondary, 1180 - top);

  const png = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!png) throw new Error('Could not create the PNG.');
  const url = URL.createObjectURL(png);
  const link = document.createElement('a');
  link.href = url;
  link.download = `carousel-slide-${String(slide.slide_number).padStart(2, '0')}.png`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
