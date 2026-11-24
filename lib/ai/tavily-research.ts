export interface ResearchSource {
  title: string;
  url: string;
  excerpt: string;
}

export async function runTavilyResearch(queries: string[], key: string): Promise<ResearchSource[]> {
  const results = await Promise.allSettled(queries.map(async (query) => {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(25_000),
      body: JSON.stringify({ query, search_depth: 'basic', max_results: 3 }),
    });

    if (!response.ok) throw new Error(`Tavily research returned HTTP ${response.status}.`);
    const data = await response.json();
    return (data.results || []).flatMap((result: { title?: string; url?: string; content?: string }) => {
      if (!result.url?.startsWith('https://') || !result.content) return [];
      return [{ title: result.title || result.url, url: result.url, excerpt: result.content.slice(0, 600) }];
    }) as ResearchSource[];
  }));

  const sources = results.flatMap((result) => result.status === 'fulfilled' ? result.value : []);
  if (!sources.length) {
    const error = results.find((result) => result.status === 'rejected');
    throw new Error(error?.reason instanceof Error ? error.reason.message : 'Tavily returned no usable sources for this campaign.');
  }

  return Array.from(new Map(sources.map((source) => [source.url, source])).values());
}
