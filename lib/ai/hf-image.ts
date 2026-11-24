import 'server-only';

export async function generateImage(prompt: string): Promise<string> {
  const token = process.env.HF_API_KEY;
  if (!token) throw new Error('HF_API_KEY not set');
  const model = process.env.HF_IMAGE_MODEL || 'black-forest-labs/FLUX.1-schnell';
  const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: prompt }),
  });
  if (!res.ok) throw new Error(`HF image failed: ${res.status} ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return `data:image/png;base64,${buf.toString('base64')}`;
}
