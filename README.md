# CRAZZE.AI — Autonomous Social OS
### Akram Studio Engine · 100% Free-Tier · Poppins · Dark/Light

> Upload 2 images. Type your goal. Press one button.  
> CRAZZE's 3 AI agents write, illustrate, quality-check, and schedule **7 days of posts** across LinkedIn, Instagram, and X — in under 60 seconds, for **$0.00/month**.

---

## ⚡ Zero-Cost Architecture Matrix

| Role | Provider & Model | Free Tier | Why |
|------|-----------------|-----------|-----|
| Vision + Strategy Brain | Google Gemini 2.5 Flash | 15 RPM, 1M ctx | Native multimodal image analysis |
| Copywriter + Critic | Groq Cloud Llama 3.3 70B | 14,400 req/day | 300+ tok/s, anti-slop enforced |
| Live Web Research | Tavily API | 1,000 searches/mo | Verified facts, no hallucinations |
| Carousel Renderer | Playwright (local) | Unlimited | 1080×1350 PNG from HTML/CSS |
| Database + Storage | Supabase | 500MB DB, 1GB Storage | PostgreSQL + pgvector + file bucket |
| Job Queue + Cron | Upstash Redis | 10,000 cmds/day | 120s delayed first-comment trick |
| Publishing | LinkedIn, X v2, Meta, Bluesky | Official free tiers | No paid middleman |

**Monthly cost: $0.00**

---

## 🚀 Quick Start

```bash
# 1. Copy env template
cp .env.example .env.local
# 2. Fill in your free API keys (links in .env.example)
# 3. Install and run
npm install
npm run dev
# 4. Open http://localhost:3000
```

---

## 🎨 Brands Pre-loaded

| Brand | Niche | Voice |
|-------|-------|-------|
| **CreativeDady** | Founder / AI methodology | Direct, LinkedIn-native, no fluff |
| **Legacy Paper PK** | Pakistan school stationery | Urdu warmth + B2B pricing, Instagram carousels |

Switch brands via the **sidebar dropdown** — posts, DNA, and accounts update instantly.

---

## 🔄 The 9-Step AI Pipeline

```
1. 📸 You drop 1–2 images + type goal
2. 👁️  Agent 1 (Gemini): Visual analysis → 7-day angle calendar
3. 🌐  Tavily: 4 live web searches → verified 2026 facts
4. ✍️  Agent 2 (Groq): Platform-native copy (LinkedIn / Instagram / X)
5. 🔴  Agent 3 (Groq): Editorial gate — rewrites if score < 8.5/10
6. 🖼️  Playwright: Renders branded carousel PNGs (1080×1350)
7. ✅  Boss check.cjs: 24-point QA (font size, contrast, word count, colors)
8. 📋  Kanban: Boss reviews & approves each post
9. ⏱️  Publish: Post → 120s delay → First Comment with link
```

> **Boss rule:** CRAZZE never auto-publishes. Every post needs approval.

---

## 🏗 Tech Stack

```
Next.js 14 App Router · TypeScript · Tailwind CSS · Poppins font
Prisma ORM · PostgreSQL (Supabase) · BullMQ worker
Google Gemini API · Groq Cloud API · Tavily API
Playwright · Supabase Storage · Upstash Redis
LinkedIn OAuth v2 · X API v2 · Meta Graph API · Bluesky AT Protocol
```

---

## 📁 Key Directories

```
app/api/campaign/generate/   ← 3-agent AI pipeline
app/api/studio/check/        ← Boss check.cjs QA gate
app/api/studio/render/       ← Carousel HTML→PNG
boss-skills/Akram-Claude-Studio/  ← All 36 original studio files
brands/creativedady/         ← Brand DNA, tokens, voice rules
brands/legacy-paper/         ← Brand DNA, tokens, voice rules
out/                         ← Generated carousel PNGs
.env.example                 ← All 7 free API key slots
```

---

## 📋 Boss Studio Rules (Hard-coded)

- Max **40 words** per feed slide · **14 words** per story/reel frame
- Font ≥ **26px** (feed) · ≥ **34px** (story/reel)
- Color contrast ≥ **4.5:1** (WCAG AA)
- Banned words: `delve` `game-changer` `tapestry` `elevate` `magical` `symphony`
- **1 idea per slide** — picture explains, words label
- `check.cjs` must PASS before any asset is delivered
- Links only in **First Comment**, never in post body

---

*CRAZZE.AI // Autonomous Social OS — built for Akram Studio. Zero subscriptions. Zero compromise.*
