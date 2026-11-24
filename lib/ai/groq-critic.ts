/**
 * Agent 3: Adversarial Critic & Quality Gate
 * Provider: Groq Cloud (Free Tier)
 * Function: Ruthless Editorial Director scoring (1-10) and auto-rewriting if < 8.5
 */

import { GroqWriterResult } from './groq-writer';

export interface CriticReviewResult {
  score: number;
  hookStrength: number;
  specificity: number;
  humanTone: number;
  criticNotes: string;
  approvedContent: GroqWriterResult;
}

export const GROQ_AGENT3_CRITIC_PROMPT = `You are a ruthless Editorial Director. Score the generated social posts from 1 to 10 on:
1. Hook Strength (Does line 1 stop a fast scroller?)
2. Specificity (Does it cite concrete facts/visual details rather than vague platitudes?)
3. Human Tone (Zero robotic AI cadence?)

If ANY platform post scores below 8.5, rewrite it immediately to fix the weakness while preserving factual accuracy.
Keep the exact source_urls for research claims retained in the final copy. Preserve empty fields for unselected platforms and preserve verified claims and links. Never add new claims. Return ONLY the final reviewed JSON matching the exact schema below.

OUTPUT JSON SCHEMA:
{
  "score": 9.2,
  "hookStrength": 9.5,
  "specificity": 9.0,
  "humanTone": 9.1,
  "criticNotes": "string detailing feedback",
  "approvedContent": {
    "linkedin": { "body": "string", "first_comment": "string" },
    "x_thread": ["string"],
    "instagram": { "caption": "string" },
    "source_urls": ["exact retained source URL"],
    "carousel_slides": [
      { "slide_number": 1, "headline": "string", "subtext": "string" }
    ]
  }
}`;

export async function runGroqCritic(
  draft: GroqWriterResult,
  key: string
): Promise<CriticReviewResult> {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    signal: AbortSignal.timeout(45_000),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `${GROQ_AGENT3_CRITIC_PROMPT}\n\nDRAFT POST CONTENT TO AUDIT:\n${JSON.stringify(draft, null, 2)}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.1,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq Critic error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '{}';
  return JSON.parse(content) as CriticReviewResult;
}
