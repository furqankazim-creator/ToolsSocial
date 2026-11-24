import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { generateCampaignImage, MAX_REFERENCE_IMAGE_BYTES, readImageDataUrl } from '@/lib/ai/campaign-image';
import { runGeminiVisionStrategist } from '@/lib/ai/gemini-vision';
import { runTavilyResearch } from '@/lib/ai/tavily-research';
import { runGroqWriter } from '@/lib/ai/groq-writer';
import { runGroqCritic } from '@/lib/ai/groq-critic';
import { CampaignData, CampaignDay, CampaignRetryContext, PlatformKey, PostItem, VisualAnalysis } from '@/lib/types';

export const maxDuration = 360;

function failure(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.goal !== 'string' || !body.goal.trim() || body.goal.length > 2000) {
    return failure('Enter a campaign objective between 1 and 2,000 characters.', 400);
  }

  const { images, brandDna, creativeDirection, styleReferences = [] } = body;
  if (!Array.isArray(images) || images.length < 1 || images.length > 2 ||
      !Array.isArray(styleReferences) || styleReferences.length > 2) {
    return failure('Upload one or two product photos and up to two optional style references.', 400);
  }
  const allImages: unknown[] = images.concat(styleReferences);
  let encodedSize = 0;
  for (const image of allImages) {
    if (typeof image !== 'string' || image.length > Math.ceil(MAX_REFERENCE_IMAGE_BYTES / 3) * 4 + 32) {
      return failure('Upload JPEG, PNG, or WebP images up to 4 MB each.', 400);
    }
    const parsed = readImageDataUrl(image);
    if (!parsed || Buffer.from(parsed.data, 'base64').length > MAX_REFERENCE_IMAGE_BYTES) {
      return failure('Upload JPEG, PNG, or WebP images up to 4 MB each.', 400);
    }
    encodedSize += image.length;
  }
  if (encodedSize > 19_000_000) return failure('The combined upload is too large. Choose smaller images.', 400);
  if (creativeDirection !== undefined && (typeof creativeDirection !== 'string' || creativeDirection.length > 500)) {
    return failure('Keep the visual direction under 500 characters.', 400);
  }

  const availablePlatforms: PlatformKey[] = ['linkedin', 'x', 'instagram'];
  const platforms = availablePlatforms.filter((platform) => body.platforms?.[platform] === true);
  if (!platforms.length) return failure('Select at least one publishing platform.', 400);

  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const imageKey = process.env.GEMINI_IMAGE_API_KEY?.trim() || geminiKey;
  const groqKey = process.env.GROQ_API_KEY?.trim();
  const tavilyKey = process.env.TAVILY_API_KEY?.trim();
  const missing = [
    !geminiKey && 'GEMINI_API_KEY',
    !groqKey && 'GROQ_API_KEY',
    !tavilyKey && 'TAVILY_API_KEY',
  ].filter(Boolean);
  if (!geminiKey || !imageKey || !groqKey || !tavilyKey) {
    return failure(`Add ${missing.join(', ')} to Tool-/.env.local and restart the app.`, 503);
  }

  try {
    const goal = body.goal.trim();
    const brandVoice = typeof brandDna?.voiceTone === 'string' ? brandDna.voiceTone.slice(0, 1000) : '';
    const targetAudience = typeof brandDna?.targetAudience === 'string' ? brandDna.targetAudience.slice(0, 500) : '';
    const bannedWords = Array.isArray(brandDna?.bannedWords)
      ? brandDna.bannedWords.filter((word: unknown) => typeof word === 'string').slice(0, 50)
      : [];
    const examples = Array.isArray(brandDna?.examplePosts)
      ? brandDna.examplePosts.filter((example: unknown) => typeof example === 'string').slice(0, 2)
        .map((example: string) => example.slice(0, 500)).join('\n')
      : '';
    const brief = `Objective: ${goal}\nAudience: ${targetAudience}\nBrand voice: ${brandVoice}\nVisual direction: ${creativeDirection || 'Derive a cohesive palette from the product references.'}`;
    const retry = body.retry;
    let plan: CampaignDay[];
    let sources: CampaignRetryContext['sources'];
    let vision: VisualAnalysis;
    let queries: string[] = [];
    let campaignId = randomUUID();
    let now = new Date();

    if (retry) {
      const day = retry.day;
      const original = new Date(retry.createdAt);
      if (!day || !Number.isInteger(day.day) || day.day < 1 || day.day > 7 ||
          typeof day.angle_type !== 'string' || typeof day.core_thesis !== 'string' ||
          typeof retry.campaignId !== 'string' || !/^[0-9a-f-]{36}$/.test(retry.campaignId) ||
          !Number.isFinite(original.getTime()) ||
          typeof retry.vision?.detected_subject !== 'string' || typeof retry.vision?.brand_vibe !== 'string' ||
          !Array.isArray(retry.sources) || retry.sources.length > 12 ||
          !retry.sources.every((source: CampaignRetryContext['sources'][number]) =>
            typeof source?.title === 'string' && typeof source.url === 'string' && source.url.startsWith('https://') &&
            typeof source.excerpt === 'string' && source.excerpt.length <= 600)) {
        return failure('This day cannot be retried with the saved campaign data.', 400);
      }
      plan = [day];
      sources = retry.sources;
      vision = retry.vision;
      campaignId = retry.campaignId;
      now = original;
    } else {
      const strategy = await runGeminiVisionStrategist(images, brief, geminiKey, styleReferences);
      vision = strategy.visual_analysis;
      if (!vision?.detected_subject || !vision.brand_vibe) {
        throw new Error('Gemini did not return a usable product analysis.');
      }
      plan = Array.isArray(strategy.weekly_plan) ? [...strategy.weekly_plan].sort((a, b) => a.day - b.day) : [];
      if (plan.length !== 7 || plan.some((day, index) => day.day !== index + 1 || typeof day.core_thesis !== 'string' || typeof day.angle_type !== 'string')) {
        throw new Error('Gemini did not return seven distinct campaign days. Run the campaign again.');
      }
      queries = Array.isArray(strategy.search_queries)
        ? Array.from(new Set(strategy.search_queries.filter((query) => typeof query === 'string' && query.trim()).map((query) => query.trim().slice(0, 300)))).slice(0, 4)
        : [];
      if (!queries.length) throw new Error('Gemini did not return campaign research queries.');
      sources = await runTavilyResearch(queries, tavilyKey);
    }
    const research = sources.map((source) => `${source.title} (${source.url}): ${source.excerpt}`);
    const warnings: string[] = [];
    const posts: PostItem[] = [];

    const failedDays: NonNullable<CampaignData['failedDays']> = [];
    const makeArtwork = (day: CampaignDay, visualContext: string) =>
      generateCampaignImage(images, styleReferences, `${visualContext}\nDay ${day.day} — ${day.angle_type}: ${day.core_thesis}`, imageKey)
        .catch((error: Error) => {
          warnings.push(`Day ${day.day} image: ${error.name === 'TimeoutError' ? 'Gemini timed out.' : error.message}`);
          return null;
        });

    if (retry?.imageOnly === true) {
      const image = await makeArtwork(plan[0], `${brief}\nProduct: ${vision.detected_subject}\nMood: ${vision.brand_vibe}`);
      if (!image) return failure(warnings[0] || 'Image generation failed.', 502);
      return NextResponse.json({ success: true, image });
    }

    const makeDay = async (day: typeof plan[number]): Promise<PostItem> => {
      const visualContext = `${brief}\nProduct: ${vision.detected_subject}\nMood: ${vision.brand_vibe}`;
      const carousel = platforms.includes('instagram') && day.day === 4;
      const review = await runGroqWriter(day.core_thesis, `${visualContext}\nBrand voice examples (style only): ${examples}`, research, bannedWords, carousel, groqKey, platforms)
        .then((draft) => runGroqCritic(draft, groqKey));
      const approved = review.approvedContent;
      if (!approved ||
        (platforms.includes('linkedin') && !approved.linkedin?.body?.trim()) ||
        (platforms.includes('x') && !approved.x_thread?.some((entry) => typeof entry === 'string' && entry.trim())) ||
        (platforms.includes('instagram') && !approved.instagram?.caption?.trim())
      ) {
        throw new Error(`Groq did not return all selected platform drafts for day ${day.day}.`);
      }
      const slides = carousel ? approved.carousel_slides : [];
      if (!Array.isArray(slides) || (carousel && (slides.length < 5 || slides.length > 6 || slides.some((slide) =>
        typeof slide?.headline !== 'string' || !slide.headline.trim() || typeof slide.subtext !== 'string' ||
        `${slide.headline} ${slide.subtext}`.trim().split(/\s+/).length > 40)))) {
        throw new Error('Groq did not return five or six usable carousel slides.');
      }
      const image = await makeArtwork(day, visualContext);
      const date = new Date(now);
      date.setUTCDate(now.getUTCDate() + day.day);
      const time = /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(day.recommended_post_time_utc) ? day.recommended_post_time_utc : '14:00';
      const [hours, minutes] = time.split(':').map(Number);
      date.setUTCHours(hours, minutes, 0, 0);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
      return {
        id: `${campaignId}-${day.day}`,
        day: day.day,
        dayName,
        angle_type: day.angle_type,
        core_thesis: day.core_thesis,
        coreThesis: day.core_thesis,
        status: 'needs_review',
        scheduled_time: `${dayName} • ${time} UTC`,
        scheduled_time_utc: date.toISOString(),
        recommended_post_time_utc: time,
        use_uploaded_image_index: image ? null : 0,
        generate_carousel: carousel,
        media_urls: image ? [image] : [images[0]],
        generatedVisual: Boolean(image),
        sources: sources.filter((source) => Array.isArray(approved.source_urls) && approved.source_urls.includes(source.url))
          .map(({ title, url }) => ({ title, url })),
        quality_score: Number.isFinite(review.score) ? Math.max(0, Math.min(10, review.score)) : 0,
        critique_notes: review.criticNotes,
        platforms,
        linkedin: { ...(platforms.includes('linkedin') ? approved.linkedin : { body: '', first_comment: '' }), delay_min: 2 },
        x: { thread: platforms.includes('x') ? approved.x_thread : [], is_thread: platforms.includes('x') && approved.x_thread.length > 1 },
        instagram: { caption: platforms.includes('instagram') ? approved.instagram.caption : '', hashtags: [] },
        carousel_slides: slides.map((slide, index) => ({ ...slide, slide_number: index + 1 })),
      };
    };

    for (let index = 0; index < plan.length; index += 3) {
      const batch = plan.slice(index, index + 3);
      const results = await Promise.allSettled(batch.map(makeDay));
      results.forEach((result, offset) => {
        if (result.status === 'fulfilled') posts.push(result.value);
        else failedDays.push({
          day: batch[offset].day,
          message: result.reason instanceof Error && result.reason.message.startsWith('Groq')
            ? result.reason.message : 'This day did not finish. Retry it to continue.',
        });
      });
    }

    if (retry) {
      if (!posts[0]) return failure(failedDays[0]?.message || 'This day did not finish.', 502);
      return NextResponse.json({ success: true, post: posts[0], warnings });
    }

    const campaign: CampaignData = {
      id: campaignId,
      title: goal.length > 55 ? `${goal.slice(0, 55)}…` : goal,
      goal,
      created_at: now.toISOString(),
      visual_analysis: vision,
      search_queries: queries,
      researchSources: sources.map(({ title, url }) => ({ title, url })),
      uploaded_images: images,
      retryContext: { plan, sources },
      failedDays,
      posts,
    };
    return NextResponse.json({ success: true, campaign, warnings });
  } catch (error) {
    if (error instanceof Error && /^(Gemini|Groq|Tavily)/.test(error.message)) return failure(error.message, 502);
    console.error('[Campaign generation]', error instanceof Error ? error.name : 'Unknown error');
    return failure('Campaign generation failed. Check your provider settings and try again.', 502);
  }
}
