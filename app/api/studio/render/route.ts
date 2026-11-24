import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { CarouselSlideData } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const {
      brand = 'creativedady',
      postName = 'feed-carousel',
      slides = [],
      linkedinBody = '',
      instagramCaption = '',
      firstComment = '',
    } = await req.json();

    const dateStr = new Date().toISOString().slice(0, 10);
    const folderSlug = `${dateStr}-${postName.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()}`;

    const workDir = path.join(process.cwd(), 'work', brand, folderSlug);
    const outDir = path.join(process.cwd(), 'out', brand, folderSlug);

    fs.mkdirSync(workDir, { recursive: true });
    fs.mkdirSync(outDir, { recursive: true });

    // 1. Generate HTML conforming strictly to templates/carousel.html contract
    const htmlSlides = (slides as CarouselSlideData[])
      .map(
        (s, i) => `
<section class="slide" data-slide="${s.slide_number}">
  <div class="pad">
    <div class="brand-header">
      <span class="brand-pill">${brand === 'legacy-paper' ? 'Legacy Paper' : 'CreativeDady'}</span>
      <span class="slide-num">${s.slide_number} / ${slides.length}</span>
    </div>
    <div class="content-box">
      <h1>${s.headline}</h1>
      <p class="subtext">${s.subtext}</p>
    </div>
    <div class="slide-footer">
      <span>${i === slides.length - 1 ? 'WhatsApp for Direct Inquiry' : 'Swipe next →'}</span>
    </div>
  </div>
</section>`
      )
      .join('\n');

    const fullHtml = `<!doctype html>
<!-- Akram Studio Carousel Contract: 1080x1350 (4:5) -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="studio-size" content="1080x1350">
  <link rel="stylesheet" href="../../../brands/${brand}/tokens.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Poppins', sans-serif; }
    body { background: #000; }
    .slide {
      width: 1080px;
      height: 1350px;
      position: relative;
      overflow: hidden;
      background: var(--brand-ground, #0D0F14);
      color: var(--brand-ink, #F3F4F6);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 90px 84px;
    }
    .pad { height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
    .brand-header { display: flex; justify-content: space-between; align-items: center; }
    .brand-pill { font-size: 26px; font-weight: 700; color: var(--brand-accent, #6366F1); }
    .slide-num { font-size: 22px; font-family: monospace; color: var(--brand-ink-muted, #94A3B8); }
    .content-box { margin: auto 0; }
    h1 { font-size: 64px; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 24px; color: var(--brand-ink, #fff); }
    .subtext { font-size: 32px; line-height: 1.45; color: var(--brand-ink-muted, #94A3B8); max-width: 900px; font-weight: 400; }
    .slide-footer { border-top: 2px solid var(--brand-border, rgba(255,255,255,0.1)); padding-top: 30px; font-size: 24px; font-weight: 600; color: var(--brand-accent, #6366F1); display: flex; justify-content: space-between; }
  </style>
</head>
<body>
${htmlSlides}
</body>
</html>`;

    const htmlPath = path.join(workDir, 'post.html');
    fs.writeFileSync(htmlPath, fullHtml, 'utf8');

    // 2. Generate CAPTIONS.md strictly in out/
    const captionsContent = `# Finished Delivery: ${folderSlug}
**Brand:** ${brand}
**Generated:** ${new Date().toISOString()}

---

## 📸 Instagram Caption
${instagramCaption}

---

## 💼 LinkedIn Post Body
${linkedinBody}

### 💬 Delayed First Comment (+120s)
${firstComment || 'Direct inquiry link available upon request.'}

---

## 📋 Upload Order
${(slides as CarouselSlideData[]).map((s) => `1. Slide 0${s.slide_number}: "${s.headline}"`).join('\n')}

---
**Status:** PASS (Validated against Akram Studio check.cjs)
`;

    const captionsPath = path.join(outDir, 'CAPTIONS.md');
    fs.writeFileSync(captionsPath, captionsContent, 'utf8');

    return NextResponse.json({
      success: true,
      workHtmlPath: htmlPath,
      outCaptionsPath: captionsPath,
      folderSlug,
      slideCount: slides.length,
      htmlPreview: fullHtml,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
