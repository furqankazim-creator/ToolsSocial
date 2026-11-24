export const MAX_REFERENCE_IMAGE_BYTES = 4 * 1024 * 1024;

export function readImageDataUrl(value: string) {
  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if (!match || match[2].length % 4 !== 0) return null;
  return { mime_type: match[1], data: match[2] };
}

export async function generateCampaignImage(references: string[], styleReferences: string[], direction: string, key: string) {
  return requestGeminiImage([
    { text: 'The following photos show the actual product to preserve.' },
    ...references.map((reference) => ({ inline_data: readImageDataUrl(reference) })),
    ...(styleReferences.length ? [
      { text: 'The following photos are style inspiration only. Borrow palette, lighting or composition. Do not show their products, branding or text.' },
      ...styleReferences.map((reference) => ({ inline_data: readImageDataUrl(reference) })),
    ] : []),
    { text: `Art-direct a polished 4:5 social campaign image around the exact product in the product photos.
Keep its shape, proportions, packaging and recognizable brand details faithful. Use a coordinated, restrained color palette,
professional lighting and clean composition. Vary the setting to suit this day's angle. Keep the subject clear on mobile.
Avoid added text, fake logos, charts, prices or product claims. Use the campaign details as creative context:
${direction}` },
  ], key);
}

export async function requestGeminiImage(
  parts: Array<{ text: string } | { inline_data: ReturnType<typeof readImageDataUrl> }>,
  key: string
) {
  const model = process.env.GEMINI_IMAGE_MODEL || 'gemini-3.1-flash-image';
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      signal: AbortSignal.timeout(90_000),
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: { aspectRatio: '4:5' },
        },
      }),
    }
  );

  if (!response.ok) throw new Error(`Gemini image generation returned HTTP ${response.status}.`);
  const result = await response.json();
  const outputParts = result.candidates?.flatMap((candidate: { content?: { parts?: unknown[] } }) => candidate.content?.parts ?? []) ?? [];
  for (const part of outputParts) {
    const image = part.inlineData;
    if (typeof image?.data !== 'string') continue;
    const url = `data:${image.mimeType};base64,${image.data}`;
    if (readImageDataUrl(url)) return url;
  }
  throw new Error('Gemini did not return a usable image.');
}
