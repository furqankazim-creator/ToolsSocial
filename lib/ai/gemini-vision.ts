import { readImageDataUrl } from './campaign-image';

export interface GeminiVisionResult {
  visual_analysis: {
    detected_subject: string;
    brand_vibe: string;
    key_visual_hooks: string[];
  };
  search_queries: string[];
  weekly_plan: Array<{
    day: number;
    angle_type: string;
    core_thesis: string;
    recommended_post_time_utc: string;
  }>;
}

export const GEMINI_AGENT1_SYSTEM_PROMPT = `You are an Elite Brand Strategist & Visual Analyst. The user has uploaded 1-2 images representing their product, behind-the-scenes work, or campaign focus, along with their niche context.

YOUR TASK:
1. Analyze the uploaded image(s) in detail: identify the core subject, visual mood, text/UI elements, value proposition, and emotional hook.
2. Formulate 4 targeted web search queries relevant to the product, audience and campaign objective. Search for buyer needs, credible industry sources and practical context. Keep private details out of search queries.
3. Architect a cohesive 7-Day Multi-Platform Content Plan anchored around these images.

STRICT RULES:
- Do NOT write generic marketing fluff. Every day must represent a distinct content angle:
  Day 1: Contrarian Hook/Problem
  Day 2: Behind-the-Scenes Breakdown of the Image
  Day 3: Data/Trend Insight
  Day 4: Actionable Framework/Carousel
  Day 5: Case Study/Proof
  Day 6: Community Debate/Question
  Day 7: Weekly Synthesis & Soft CTA
- Output ONLY valid JSON matching the schema below.

OUTPUT JSON SCHEMA:
{
  "visual_analysis": {
    "detected_subject": "string",
    "brand_vibe": "string",
    "key_visual_hooks": ["string"]
  },
  "search_queries": ["string"],
  "weekly_plan": [
    {
      "day": 1,
      "angle_type": "string",
      "core_thesis": "string",
      "recommended_post_time_utc": "14:00"
    }
  ]
}`;

export async function runGeminiVisionStrategist(
  imagesBase64: string[],
  campaignGoal: string,
  key: string,
  styleReferences: string[] = []
): Promise<GeminiVisionResult> {
  return requestGeminiJson<GeminiVisionResult>([
    { text: 'Product photos follow. Use these to identify the actual product.' },
    ...imagesBase64.map((image) => ({ inline_data: readImageDataUrl(image) })),
    ...(styleReferences.length ? [
      { text: 'The following are style references only. Describe useful colors, lighting and composition, and do not infer product features from these images.' },
      ...styleReferences.map((image) => ({ inline_data: readImageDataUrl(image) })),
    ] : []),
    { text: `${GEMINI_AGENT1_SYSTEM_PROMPT}\n\nUSER CAMPAIGN GOAL:\n${campaignGoal}` },
  ], key);
}

export async function requestGeminiJson<T>(
  parts: Array<{ text: string } | { inline_data: ReturnType<typeof readImageDataUrl> }>,
  key: string
): Promise<T> {
  const model = process.env.GEMINI_VISION_MODEL || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    signal: AbortSignal.timeout(60_000),
    body: JSON.stringify({
      contents: [{ role: 'user', parts }],
      generationConfig: {
        response_mime_type: 'application/json',
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const json = await response.json();
  const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  return JSON.parse(rawText) as T;
}
