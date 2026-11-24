import { CampaignData, BrandDnaData, ConnectedAccountData } from './types';

export const initialBrandDna: BrandDnaData = {
  voiceTone: 'Direct, technical founder, contrarian, zero corporate jargon, data-backed',
  targetAudience: 'Software founders, AI engineers, indie hackers, product builders',
  bannedWords: [
    'delve',
    'game-changer',
    'unlock',
    "in today's fast-paced world",
    'tapestry',
    'elevate',
    'revolutionize',
    "let's dive in",
    'synergy',
    'supercharge',
  ],
  examplePosts: [
    'We spent $0 on paid ads and grew to $42k MRR. Here is the unvarnished breakdown of what worked (and 3 things that wasted 4 months):',
    '90% of AI wrappers will die in 2026. Not because foundation models got smarter, but because their UX is just a chat box with a submit button.',
    'If your product needs a 12-step onboarding video, you do not have an adoption problem. You have an architecture problem.',
  ],
};

export const initialConnectedAccounts: ConnectedAccountData[] = [
  {
    platform: 'linkedin',
    name: 'Sarah Chen',
    handle: 'sarahchen-founder',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    connected: true,
    tier: 'Official API v2 (Free Tier)',
  },
  {
    platform: 'x',
    name: 'Sarah Chen ⚡',
    handle: '@sarahcodes',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    connected: true,
    tier: 'Twitter v2 Free (500 posts/mo)',
  },
  {
    platform: 'instagram',
    name: 'Sarah Chen | Building in Public',
    handle: '@sarah.builds',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    connected: true,
    tier: 'Meta Graph Free Business API',
  },
  {
    platform: 'bluesky',
    name: 'sarahchen.bsky.social',
    handle: 'sarahchen.bsky.social',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    connected: false,
    tier: 'AT Protocol (Unlimited Free)',
  },
];

export const sampleCampaign: CampaignData = {
  id: 'camp-7d-autonomous-01',
  title: 'Next-Gen Autonomous AI Architecture Launch',
  goal: 'Position our agentic platform as the anti-bloat alternative to enterprise social tools, highlighting zero-cost free-tier APIs and multimodal execution.',
  created_at: '2026-11-21T10:00:00Z',
  visual_analysis: {
    detected_subject: 'Modern dark-mode dashboard showcasing multi-agent swarm telemetry and real-time inference latency logs',
    brand_vibe: 'Hyper-minimalist, developer-first, obsidian dark mode with violet & cyan telemetry accents',
    key_visual_hooks: [
      'Sub-250ms latency badge displayed alongside Groq Cloud inference meter',
      'Zero-credit card warning banner removed showing pure 100% free-tier architecture',
      'Multi-agent sequential handoff visualization (Gemini -> Tavily -> Groq -> Playwright)',
    ],
  },
  search_queries: [
    'social media scheduling API pricing changes 2026',
    'enterprise SaaS subscription fatigue statistics founders',
    'multimodal agentic workflow benchmarks Groq Gemini',
    'organic LinkedIn reach algorithms carousel vs single image 2026',
  ],
  uploaded_images: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
  ],
  posts: [
    {
      id: 'post-day-1',
      day: 1,
      dayName: 'Monday',
      angle_type: 'Contrarian Hook & The $3,000/yr SaaS Lie',
      coreThesis: 'Social media management tools charging $120/mo are just thin UI shells over free-tier developer APIs. Here is why the middleman tax is dying in 2026.',
      status: 'published',
      scheduled_time: 'Mon, Nov 24 • 09:00 AM',
      scheduled_time_utc: '2026-11-24T09:00:00Z',
      recommended_post_time_utc: '14:00',
      use_uploaded_image_index: 0,
      generate_carousel: false,
      media_urls: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'],
      quality_score: 9.4,
      critique_notes: 'Exceptional hook. Cites concrete dollar figures and direct API realities. Zero banned words detected.',
      linkedin: {
        body: `Most social media management platforms are charging founders $120 to $300 every month for something that costs less than $0.00 to run.

Here is the dirty secret of modern SaaS:

Official APIs for LinkedIn, X (Twitter), Meta Graph, and Bluesky have generous developer tiers that cost literally $0.

When you add Gemini 2.5 Flash for multimodal visual analysis and Groq Cloud for sub-second copy refinement, the entire agentic pipeline runs on zero credit cards.

We stopped paying the middleman tax. 

Instead, we wired up an autonomous 3-agent pipeline:
1. Gemini Vision analyzes screenshot context & extracts core value propositions
2. Tavily queries real-time web trends
3. Groq writes platform-native copy with strict anti-slop rules

Result: 7 days of verified content generated in 4.2 seconds.

Are you still paying monthly subscriptions for basic scheduling schedulers?

Link to open-source architecture in the first comment.`,
        first_comment: 'Here is the full architecture blueprint and API setup guide (100% free tier): https://github.com/developer/autonomous-social-agent',
        delay_min: 2,
      },
      x: {
        thread: [
          'Most social media platforms charge $100+/mo for what costs $0.00 in raw APIs.\n\nHere is how we built a Postiz-style autonomous social engine running 100% on free-tier developer keys: 🧵',
          '1/ The Planning Brain:\nGoogle Gemini 2.5 Flash via AI Studio.\n\nNo credit card required. Gives 1M token context + native multimodal vision to ingest screenshots directly and output structured 7-day JSON calendars.',
          '2/ The Copywriter & Critic:\nGroq Cloud (Llama 3.3 70B & Qwen 2.5).\n\n300+ tokens/sec. It runs a 2-pass loop (Writer -> Adversarial Critic) in under 3.1 seconds to kill generic corporate platitudes.',
          '3/ Live Fact Grounding:\nTavily API (1,000 free searches/mo).\n\nInstead of letting the LLM hallucinate 2026 industry stats, Tavily fetches raw verified metrics before a single sentence is typed.',
          'The entire stack runs serverless with Supabase PostgreSQL and Upstash Redis for $0/mo.\n\nStop paying the middleman markup.',
        ],
        is_thread: true,
      },
      instagram: {
        caption: `Stop paying $100+/month for social media tools that are just wrappers over free APIs.\n\nWe switched our entire content workflow to an autonomous multi-agent pipeline:\n• Gemini Flash for visual screenshot breakdown\n• Tavily for real-time fact checking\n• Groq for zero-slop copy\n\nFull architecture breakdown in bio.\n\n#buildinpublic #solofounder #indiehackers #aiagents #fullstackdeveloper`,
        hashtags: ['#buildinpublic', '#solofounder', '#indiehackers', '#aiagents', '#fullstackdeveloper'],
      },
      carousel_slides: [],
    },
    {
      id: 'post-day-2',
      day: 2,
      dayName: 'Tuesday',
      angle_type: 'Behind-The-Scenes Architecture Teardown',
      coreThesis: 'Show the exact terminal logs and multimodal handoff when Gemini Vision ingests raw UI screenshots.',
      status: 'scheduled',
      scheduled_time: 'Tue, Nov 25 • 11:30 AM',
      scheduled_time_utc: '2026-11-25T11:30:00Z',
      recommended_post_time_utc: '15:30',
      use_uploaded_image_index: 1,
      generate_carousel: false,
      media_urls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'],
      quality_score: 9.1,
      critique_notes: 'Strong technical credibility. High engagement potential for developers and technical founders.',
      linkedin: {
        body: `What actually happens when you feed a screenshot into a multimodal LLM for content planning?

Most people dump an image and ask: "Write a post about this."
The result is guaranteed slop.

Here is the exact 3-step prompt architecture we use instead:

1. Visual Extraction Layer:
Force the vision model to output strict telemetry:
- Dominant UI elements & typography
- Brand color palette hex codes
- Emotional friction point depicted

2. Query Synthesis:
Instead of writing copy immediately, generate 4 search queries to find current benchmark data related to the visual subject.

3. Angle Matrix:
Map the image against 7 distinct psychological angles (Contrarian, BTS, Data Insight, Actionable Framework, Proof, Debate, Synthesis).

When the copywriter finally runs, it has real visual grounded context rather than generic assumptions.

The full system prompt is available below.`,
        first_comment: 'System prompt template and schema definition: https://github.com/developer/autonomous-social-agent/blob/main/prompts/agent1-vision.md',
        delay_min: 2,
      },
      x: {
        thread: [
          'Dumping a screenshot into an LLM and saying "write a post" generates pure slop.\n\nHere is how to properly structure a multimodal agent pipeline for high-signal content: 👇',
          'Step 1: Extract visual telemetry first.\n\nBefore writing a single word, have Gemini Flash isolate subject, UI focal point, and the underlying emotional friction point.',
          'Step 2: Generate search vectors.\n\nUse visual data to trigger Tavily web search queries. Ground the post in real 2026 numbers, not LLM guesses.',
          'Step 3: Run the Adversarial Critic.\n\nGroq scores the draft against banned buzzwords (delve, revolutionize, game-changer). If score < 8.5, it rewrites automatically.',
        ],
        is_thread: true,
      },
      instagram: {
        caption: `Behind the scenes of our autonomous social agent.\n\nNotice how the terminal shows zero hallucination—every claim is grounded in live Tavily search results before Groq formats it for each platform.\n\nBuilding in public day 42.\n\n#softwareengineer #devlife #python #typescript #buildinpublic`,
        hashtags: ['#softwareengineer', '#devlife', '#python', '#typescript', '#buildinpublic'],
      },
      carousel_slides: [],
    },
    {
      id: 'post-day-3',
      day: 3,
      dayName: 'Wednesday',
      angle_type: 'Data/Trend Insight: The 2026 Zero-Click Reality',
      coreThesis: 'Social algorithms now penalize external links by up to 60%. Why first-comment delayed automation is mandatory.',
      status: 'needs_review',
      scheduled_time: 'Wed, Nov 26 • 02:00 PM',
      scheduled_time_utc: '2026-11-26T14:00:00Z',
      recommended_post_time_utc: '14:00',
      use_uploaded_image_index: null,
      generate_carousel: true,
      media_urls: [],
      quality_score: 9.6,
      critique_notes: 'Data-packed thesis with direct actionable workflow. Highly defensible.',
      linkedin: {
        body: `Putting links in your main LinkedIn post reduces reach by 40% to 65%.

Social networks want users to stay inside their walled garden. If your post directs traffic off-platform, the algorithm demotes it.

The workaround top creators use:
Drop links in the first comment.

But there is a catch:
If you post the first comment instantly (in 0.1 seconds via an API), LinkedIn flags the behavior as automated bot activity.

The solution:
An asynchronous queue worker that delays the first comment by exactly 120 seconds after the main post is indexed.

We automated this with Upstash Redis and a lightweight cron.

Here is the exact data on how this impacted our impressions over 30 days:
• Link in post body: 840 avg impressions
• Link in instant comment: 1,920 avg impressions
• Link in 2-min delayed comment: 6,450 avg impressions

The data speaks for itself.`,
        first_comment: 'Check out the Redis delayed worker implementation here: https://github.com/developer/autonomous-social-agent/tree/main/workers',
        delay_min: 2,
      },
      x: {
        thread: [
          'External links kill organic reach on X and LinkedIn by 50%+.\n\nHere is how to automate the "delayed first comment" trick without triggering bot flags: 🧵',
          '1/ The problem:\nAlgorithms want dwell time. The moment you link to an external domain in your main text, your distribution is throttled.',
          '2/ The naive fix:\nPosting the link immediately in the first reply.\n\nProblem: Instant automated replies trigger platform spam heuristics.',
          '3/ The engineering fix:\nWhen the post webhook confirms publication, schedule a Redis task with a 120-second TTL.\n\nWhen the TTL fires, the worker posts your link naturally.',
          'Our data: 3.3x higher average impressions compared to main-post links.\n\nSimple mechanics. Massive leverage.',
        ],
        is_thread: true,
      },
      instagram: {
        caption: `Why you should never put links in your primary captions.\n\nSwipe through the data breakdown on how delayed first-commenting boosts distribution across all major networks.\n\n#socialmediatips #growthhacking #founderlife #saasgrowth #techfounder`,
        hashtags: ['#socialmediatips', '#growthhacking', '#founderlife', '#saasgrowth', '#techfounder'],
      },
      carousel_slides: [
        {
          slide_number: 1,
          headline: 'The Zero-Click Social Penalty in 2026',
          subtext: 'Why your links are quietly killing 60% of your reach (and the 2-minute fix).',
          theme: 'dark-purple',
        },
        {
          slide_number: 2,
          headline: '1. The Algorithm Penalty',
          subtext: 'Platforms optimize for dwell time. External URLs trigger immediate algorithmic distribution throttles.',
          theme: 'dark-purple',
        },
        {
          slide_number: 3,
          headline: '2. The Instant Bot Trap',
          subtext: 'Posting links within 1 second of publishing flags your account under anti-automation spam heuristics.',
          theme: 'dark-purple',
        },
        {
          slide_number: 4,
          headline: '3. The 120-Second Buffer',
          subtext: 'Delaying your first comment by 2 minutes allows the primary post to index cleanly before dropping outbound links.',
          theme: 'dark-purple',
        },
        {
          slide_number: 5,
          headline: '4. The 3.3x Distribution Lift',
          subtext: 'A/B testing across 100 posts revealed 6,450 avg impressions vs 840 for direct-link posts.',
          theme: 'dark-purple',
        },
        {
          slide_number: 6,
          headline: 'Automate It For Free',
          subtext: 'Set up an Upstash Redis queue with official free-tier APIs. Swipe back to save for your next launch.',
          theme: 'dark-purple',
        },
      ],
    },
    {
      id: 'post-day-4',
      day: 4,
      dayName: 'Thursday',
      angle_type: 'Actionable Framework: The 5-Step Anti-Slop Filter',
      coreThesis: 'How to write LLM system prompts that ruthlessly ban LinkedIn cringe words and enforce founder authenticity.',
      status: 'needs_review',
      scheduled_time: 'Thu, Nov 27 • 10:00 AM',
      scheduled_time_utc: '2026-11-27T10:00:00Z',
      recommended_post_time_utc: '15:00',
      use_uploaded_image_index: null,
      generate_carousel: true,
      media_urls: [],
      quality_score: 9.2,
      critique_notes: 'Includes explicit list of banned tokens and structured adversarial prompts.',
      linkedin: {
        body: `If your AI copywriting sounds like an enthusiastic intern on day one, you are missing an adversarial critic.

Here is the exact "Anti-Slop" filter we programmed into our Groq pipeline:

1. Banned Vocab List:
"Delve", "tapestry", "game-changer", "elevate", "in today's fast-paced world", "revolutionize". Any draft containing these is automatically rejected.

2. Pattern-Interrupt Opener:
Line 1 must contain either:
- A verifiable dollar amount or percentage
- A contrarian rejection of common advice
- A direct observation of user friction

3. Whitespace Discipline:
No paragraph exceeds 2 sentences. High readability for mobile feeds.

4. The Adversarial Critic Pass:
Before saving to the database, Agent 3 rates the copy from 1-10 on Hook Strength, Specificity, and Human Cadence.
Anything below 8.5 gets rewritten with stricter temperature settings.

Steal this architecture for your own workflows.`,
        first_comment: 'Grab our complete Groq system prompt repository: https://github.com/developer/autonomous-social-agent/blob/main/prompts/agent2-copywriter.md',
        delay_min: 2,
      },
      x: {
        thread: [
          'If your AI content uses words like "delve", "game-changer", or "tapestry", your audience stops reading instantly.\n\nHere is our 5-rule Anti-Slop filter running on Groq: 🧵',
          'Rule 1: Hard negative token constraints.\n\nExplicitly forbid: delve, elevate, revolutionize, unlock, in today\'s fast-paced world.\n\nPenalize them in the system prompt with zero tolerance.',
          'Rule 2: Hook must contain data.\n\nLine 1 cannot be abstract. It must cite a timestamp, a dollar figure, or an engineering reality.',
          'Rule 3: Run an Adversarial Critic Agent.\n\nAgent 2 writes the copy. Agent 3 is an aggressive editor that rewrites anything scoring under 8.5/10.',
          'Result: Clean, founder-grade writing at 300+ tokens/sec for $0.00 API cost.',
        ],
        is_thread: true,
      },
      instagram: {
        caption: `How to train AI to write without sounding like a robot.\n\nSwipe through our 5-step framework for eliminating AI clichés and crafting founder-grade copy.\n\n#copywriting #contentstrategy #marketingtips #aiwriting #solopreneur`,
        hashtags: ['#copywriting', '#contentstrategy', '#marketingtips', '#aiwriting', '#solopreneur'],
      },
      carousel_slides: [
        {
          slide_number: 1,
          headline: 'How to Kill AI Slop in 2026',
          subtext: 'The 5-step framework that turns robotic AI drafts into founder-grade writing.',
          theme: 'midnight-cyan',
        },
        {
          slide_number: 2,
          headline: '1. Ban The "AI Clichés"',
          subtext: 'Eliminate "delve", "game-changer", "tapestry", and "elevate" at the system prompt layer.',
          theme: 'midnight-cyan',
        },
        {
          slide_number: 3,
          headline: '2. Enforce Pattern-Interrupts',
          subtext: 'Line 1 must deliver concrete metrics or contrarian observations. No rhetorical questions.',
          theme: 'midnight-cyan',
        },
        {
          slide_number: 4,
          headline: '3. Max 2 Lines Per Paragraph',
          subtext: 'Mobile readers scan. High whitespace and single-line anchors maximize completion rates.',
          theme: 'midnight-cyan',
        },
        {
          slide_number: 5,
          headline: '4. The Adversarial Critic Gate',
          subtext: 'Use a second fast model to grade readability and rewrite any paragraph scoring under 8.5.',
          theme: 'midnight-cyan',
        },
        {
          slide_number: 6,
          headline: 'Implement It Today',
          subtext: 'Free on Groq Cloud with Llama 3.3 70B. Save this post to upgrade your prompt library.',
          theme: 'midnight-cyan',
        },
      ],
    },
    {
      id: 'post-day-5',
      day: 5,
      dayName: 'Friday',
      angle_type: 'Case Study & Benchmark Proof',
      coreThesis: 'Side-by-side speed and cost comparison: Traditional SaaS scheduler stack ($149/mo) vs 100% Free API Agent ($0/mo).',
      status: 'draft',
      scheduled_time: 'Fri, Nov 28 • 01:15 PM',
      scheduled_time_utc: '2026-11-28T13:15:00Z',
      recommended_post_time_utc: '13:15',
      use_uploaded_image_index: 0,
      generate_carousel: false,
      media_urls: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'],
      quality_score: 8.9,
      critique_notes: 'High-contrast benchmark comparison table. Very strong founder resonance.',
      linkedin: {
        body: `We benchmarked our autonomous agent against standard social media management SaaS tools.

The numbers:

Commercial Tool Stack:
- Buffer / Hootsuite Team: $120/mo
- Copy AI / Jasper subscription: $49/mo
- Stock asset subscription: $29/mo
Total: $198/mo ($2,376/year)
Content generation time: 45 minutes of manual clicking

Our Autonomous Agent Stack:
- Gemini 2.5 Flash: $0.00 (Google AI Studio Free Tier)
- Groq Cloud (Llama 3.3): $0.00 (30 RPM Free Tier)
- Tavily Web Search: $0.00 (1,000 searches/mo Free Tier)
- Supabase + Upstash: $0.00 (Free DB + Redis)
- Official Platform APIs: $0.00
Total: $0.00/mo ($0/year)
Content generation time: 4.8 seconds

You do not need outside funding to build enterprise-grade automation.
You just need to connect the free developer tiers that already exist.`,
        first_comment: 'All API signup links and free-tier limits documented here: https://github.com/developer/autonomous-social-agent#free-tier-setup',
        delay_min: 2,
      },
      x: {
        thread: [
          'Commercial Social Stack: $198/mo.\nOur Free API Agent Stack: $0/mo.\n\nHere is the exact cost and speed breakdown: 👇',
          'Gemini 2.5 Flash: $0 (Vision & multimodal strategy)\nGroq Cloud: $0 (300 tok/sec copywriting)\nTavily: $0 (1k live web searches/mo)\nSupabase: $0 (500MB DB & vector storage)\nUpstash: $0 (10k Redis commands/day)',
          'Stop buying middleman SaaS for basic API calls.\n\nBuild the agent once, own your data forever.',
        ],
        is_thread: false,
      },
      instagram: {
        caption: `$198/month vs $0/month.\n\nWhy pay subscriptions for tools that just wrap public developer APIs?\n\nBuild the autonomous agent yourself and run your entire weekly social calendar on free tiers.\n\n#saas #bootstrapped #coding #developer #startuplife`,
        hashtags: ['#saas', '#bootstrapped', '#coding', '#developer', '#startuplife'],
      },
      carousel_slides: [],
    },
    {
      id: 'post-day-6',
      day: 6,
      dayName: 'Saturday',
      angle_type: 'Community Debate: Carousels vs Short Posts',
      coreThesis: 'What performs better on LinkedIn in 2026: multi-slide HTML carousels or short 4-line contrarian text posts?',
      status: 'draft',
      scheduled_time: 'Sat, Nov 29 • 11:00 AM',
      scheduled_time_utc: '2026-11-29T11:00:00Z',
      recommended_post_time_utc: '11:00',
      use_uploaded_image_index: null,
      generate_carousel: false,
      media_urls: [],
      quality_score: 8.8,
      critique_notes: 'Sparks natural community comments and discussions without feeling gimmicky.',
      linkedin: {
        body: `Honest question for founders and content creators:

What gets you better engagement right now?

Option A: A 6-slide carousel with high-density frameworks
Option B: A 4-line punchy observation with zero images

We analyzed 250 posts from our testing accounts:
- Carousels averaged 4.2x more saves and reposts.
- Short text posts averaged 2.8x more comments and direct discussions.

Which format are you betting on for the rest of 2026?`,
        first_comment: 'Drop your answer below. I will share our full engagement analytics spreadsheet on Monday.',
        delay_min: 2,
      },
      x: {
        thread: [
          'What performs better on your timeline:\n\nA) 6-slide carousel breakdown\nB) 1-sentence punchy contrarian tweet\n\nOur data shows carousels drive bookmarks, but short text drives replies.\n\nWhat are you seeing?',
        ],
        is_thread: false,
      },
      instagram: {
        caption: `Carousels vs Short posts: which one wins in 2026?\n\nLet us know in the comments below!\n\n#socialmediaexperiment #contentcreation #buildinpublic #foundercommunity`,
        hashtags: ['#socialmediaexperiment', '#contentcreation', '#buildinpublic', '#foundercommunity'],
      },
      carousel_slides: [],
    },
    {
      id: 'post-day-7',
      day: 7,
      dayName: 'Sunday',
      angle_type: 'Weekly Synthesis & Autonomous Launch CTA',
      coreThesis: 'Summary of the 7-day autonomous pipeline build. One-click deploy button for the community.',
      status: 'draft',
      scheduled_time: 'Sun, Nov 30 • 03:00 PM',
      scheduled_time_utc: '2026-11-30T15:00:00Z',
      recommended_post_time_utc: '15:00',
      use_uploaded_image_index: null,
      generate_carousel: true,
      media_urls: [],
      quality_score: 9.3,
      critique_notes: 'Strong weekly wrap-up. Ties all 7 days together with a natural value-add CTA.',
      linkedin: {
        body: `7 days ago, we set out to build a Postiz-style autonomous social media platform using 100% free-tier APIs.

Here is what is now running in production:

✓ Multimodal Vision: Gemini analyzes uploaded screenshots and drafts a 7-day angle strategy.
✓ Live Research: Tavily pulls real-time facts to prevent hallucinations.
✓ Anti-Slop Writing: Groq filters out corporate buzzwords and writes platform-native copy.
✓ Editorial Critic: Automated quality gate rejects anything under 8.5/10.
✓ Delayed First Comment: Redis worker triggers outbound links 2 minutes post-publish.

Total monthly API bill: $0.00.

If you want the complete Next.js + Tailwind + BullMQ starter kit, drop a comment or check the link below.`,
        first_comment: 'Get the full repository with 1-click Supabase & Vercel deployment: https://github.com/developer/autonomous-social-agent',
        delay_min: 2,
      },
      x: {
        thread: [
          '7 days ago, we built an autonomous social platform running on 100% free-tier APIs.\n\nHere is the recap and full code release: 🧵',
          'Gemini 2.5 Flash for multimodal vision\nTavily for live web research\nGroq for 300 tok/sec anti-slop copy\nSupabase for PostgreSQL\nUpstash for Redis cron scheduling',
          'API cost: $0.00/mo.\nSetup time: Under 10 minutes.\n\nRepo link in the reply below 👇',
        ],
        is_thread: true,
      },
      instagram: {
        caption: `Weekly recap: How we built an autonomous social media agent running 100% on free-tier APIs.\n\nSwipe through the summary slides to see how the multi-agent pipeline works end-to-end.\n\n#buildinpublic #solofounder #aiagent #nextjs #fullstack`,
        hashtags: ['#buildinpublic', '#solofounder', '#aiagent', '#nextjs', '#fullstack'],
      },
      carousel_slides: [
        {
          slide_number: 1,
          headline: 'The 100% Free Social Agent Stack',
          subtext: 'How to build and launch an autonomous content engine without paying SaaS subscriptions.',
          theme: 'dark-purple',
        },
        {
          slide_number: 2,
          headline: '1. Multimodal Brain',
          subtext: 'Gemini 2.5 Flash ingests screenshots, maps brand vibe, and architects 7-day angle plans.',
          theme: 'dark-purple',
        },
        {
          slide_number: 3,
          headline: '2. Live Fact Grounding',
          subtext: 'Tavily API executes real-time web research to cite verified 2026 statistics.',
          theme: 'dark-purple',
        },
        {
          slide_number: 4,
          headline: '3. Anti-Slop Copywriting',
          subtext: 'Groq Cloud generates native LinkedIn, X threads, and Instagram carousels in under 3 seconds.',
          theme: 'dark-purple',
        },
        {
          slide_number: 5,
          headline: '4. Delayed Comment Worker',
          subtext: 'Upstash Redis queue posts links 120 seconds later to bypass the zero-click penalty.',
          theme: 'dark-purple',
        },
        {
          slide_number: 6,
          headline: 'Clone The Repository',
          subtext: 'Full Next.js + Tailwind codebase ready to deploy. Link in bio!',
          theme: 'dark-purple',
        },
      ],
    },
  ],
};
