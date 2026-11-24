import { CampaignData, BrandDnaData, ConnectedAccountData, PostItem } from './types';

export interface StudioSkillDefinition {
  id: string;
  name: string;
  command: string;
  description: string;
  category: 'social' | 'seo' | 'setup';
  badge: string;
}

export const BOSS_STUDIO_SKILLS: StudioSkillDefinition[] = [
  {
    id: 'social-post',
    name: 'Feed Carousel / Post',
    command: 'post',
    description: '1080x1350 multi-slide carousels strictly checked with check.cjs & rendered to PNG',
    category: 'social',
    badge: '1080x1350',
  },
  {
    id: 'social-reel',
    name: 'Social Reel (Motion)',
    command: 'reel',
    description: '1080x1920 animated video reel frames compiled with Playwright & ffmpeg',
    category: 'social',
    badge: '1080x1920 MP4',
  },
  {
    id: 'social-story',
    name: 'Social Story',
    command: 'story',
    description: '1080x1920 Instagram & Facebook stories with app safe-zones enforced',
    category: 'social',
    badge: 'Safe Zones',
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar',
    command: 'calendar',
    description: '30-day multi-brand editorial calendar with post hooks & timing',
    category: 'social',
    badge: '30 Days',
  },
  {
    id: 'gbp',
    name: 'Google Business Profile',
    command: 'gbp',
    description: 'Local business posts, updates & review replies (Karachi/Pakistan local SEO)',
    category: 'seo',
    badge: 'Maps & GBP',
  },
  {
    id: 'core30-seo',
    name: 'Core30 SEO Service Pages',
    command: 'core30-seo',
    description: 'High-ranking website service pages with strict intent and schema',
    category: 'seo',
    badge: 'Core30',
  },
  {
    id: 'store-seo',
    name: 'Store & Bulk Order SEO',
    command: 'store-seo',
    description: 'Product descriptions for school registers, wholesale notebooks & bulk ordering',
    category: 'seo',
    badge: 'Bulk SEO',
  },
  {
    id: 'studio-review',
    name: 'Studio Contract QA Review',
    command: 'check',
    description: 'Automated validation: max 40 words, font sizes >= 26px, contrast, brand tokens',
    category: 'setup',
    badge: 'check.cjs',
  },
];

export interface BrandProfile {
  slug: string;
  name: string;
  tagline: string;
  industry: string;
  base: string;
  brandDna: BrandDnaData;
  accounts: ConnectedAccountData[];
  campaign: CampaignData;
}

export const BRANDS_CATALOG: Record<string, BrandProfile> = {
  creativedady: {
    slug: 'creativedady',
    name: 'CreativeDady Studio',
    tagline: 'Design. Art. Development. Yield. (DADY)',
    industry: 'Digital Studio & Product Engineering',
    base: 'Karachi, Pakistan',
    brandDna: {
      voiceTone: 'Direct, confident, Karachi-proud, short sentences, anti-cliché, DADY philosophy (Design, Art, Development, Yield)',
      targetAudience: 'Tech founders, startup CEOs, enterprise leaders who want world-class digital craft',
      bannedWords: [
        'magical',
        'symphony',
        'imaginative playground',
        'unlock potential',
        'transform your business',
        'delve',
        'game-changer',
        'tapestry',
        'elevate',
      ],
      examplePosts: [
        'Every other agency in the world designs and develops. Two things set CreativeDady apart: Art and Yield.',
        'Art is the extra two hours on the hover state. Yield is the conversion that funds the next quarter.',
        'A beautiful site that loads in 4 seconds is a failed site. Fast, stable, and boring to maintain is the goal.',
      ],
    },
    accounts: [
      {
        platform: 'linkedin',
        name: 'CreativeDady Studio',
        handle: 'creativedady',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        connected: true,
        tier: 'Official API v2 (Free)',
      },
      {
        platform: 'x',
        name: 'CreativeDady ⚡',
        handle: '@creativedady',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        connected: true,
        tier: 'Twitter v2 Free',
      },
      {
        platform: 'instagram',
        name: 'CreativeDady | Karachi Studio',
        handle: '@creativedady',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        connected: true,
        tier: 'Meta Graph Free API',
      },
      {
        platform: 'bluesky',
        name: 'creativedady.bsky.social',
        handle: 'creativedady.bsky.social',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        connected: true,
        tier: 'AT Protocol Free',
      },
    ],
    campaign: {
      id: 'camp-cd-01',
      title: 'DADY Methodology: Design, Art, Development, Yield',
      goal: 'Position CreativeDady as the Karachi-based specialist studio for founders who demand Awwwards-level craft with engineering rigor.',
      created_at: '2026-11-21T10:00:00Z',
      visual_analysis: {
        detected_subject: 'Monochrome typographic layout highlighting the 4 pillars of DADY with electric indigo accents',
        brand_vibe: 'Direct, confident, Karachi-proud, rigorous',
        key_visual_hooks: [
          'DADY 4-pillar breakdown card',
          'Zero-fluff Karachi studio positioning',
          'Yield measurement metric',
        ],
      },
      search_queries: [
        'digital agency positioning trends 2026',
        'Karachi tech studio web development performance standards',
        'design development yield agency benchmarks',
      ],
      uploaded_images: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      ],
      posts: [
        {
          id: 'cd-post-1',
          day: 1,
          dayName: 'Monday',
          angle_type: 'The DADY Philosophy (Design, Art, Dev, Yield)',
          core_thesis: 'Every agency designs and develops. Two things set us apart: Art (craft that refuses to settle) and Yield (measuring conversions, not impressions).',
          status: 'published',
          scheduled_time: 'Mon, Nov 24 • 10:00 AM',
          scheduled_time_utc: '2026-11-24T10:00:00Z',
          recommended_post_time_utc: '10:00',
          use_uploaded_image_index: 0,
          generate_carousel: true,
          media_urls: [],
          quality_score: 9.8,
          critique_notes: 'Flawless execution. Follows the DADY philosophy word-for-word. Zero slop.',
          linkedin: {
            body: `Every other digital agency in the world designs and develops.

Two things set CreativeDady apart:

1. Art — the insistence that craft is not decoration, it is the work. The extra two hours on the hover state. The seventh typographic revision.

2. Yield — the insistence that beauty without measurable outcome is a failure. Not impressions. Conversions. Signups. Sales.

DADY is not an acronym we retrofitted. It is a methodology:
Design. Art. Development. Yield.

We work small. We work deep. We measure the yield.

Read the Karachi studio thesis in the first comment.`,
            first_comment: 'Read our complete rebrand strategy and methodology: https://creativedady.com/philosophy',
            delay_min: 2,
          },
          x: {
            thread: [
              'Every agency designs and develops.\n\nTwo things set CreativeDady apart:\n1. Art (craft that refuses to settle)\n2. Yield (measuring business outcomes, not pageviews) 🧵',
              'D — Design: Intention made visible. We do not decorate. We decide.',
              'A — Art: The extra two hours on the hover state. The button that is quietly memorable.',
              'D — Development: Rigor. A site that takes 4s to load is a failed site. Sub-second performance is the standard.',
              'Y — Yield: The revenue and conversions that fund the next quarter. If it doesn\'t yield, it didn\'t work.',
            ],
            is_thread: true,
          },
          instagram: {
            caption: `Design. Art. Development. Yield.\n\nThe four-word philosophy behind CreativeDady.\n\nSwipe through the carousel breakdown.\n\n#creativedady #karachidesign #uidesign #webdevelopment #pakistanstartups`,
            hashtags: ['#creativedady', '#karachidesign', '#uidesign', '#webdevelopment', '#pakistanstartups'],
          },
          carousel_slides: [
            { slide_number: 1, headline: 'Design. Art. Dev. Yield.', subtext: 'The 4-word philosophy behind CreativeDady.', theme: 'dark-purple' },
            { slide_number: 2, headline: 'D — Design', subtext: 'Intention made visible. Every pixel and margin is a decision.', theme: 'dark-purple' },
            { slide_number: 3, headline: 'A — Art', subtext: 'Craft that refuses to settle. Quietly beautiful micro-interactions.', theme: 'dark-purple' },
            { slide_number: 4, headline: 'D — Development', subtext: 'Clean code and honest performance. Fast, stable, and zero bloat.', theme: 'dark-purple' },
            { slide_number: 5, headline: 'Y — Yield', subtext: 'If the work does not yield conversions, the work did not work.', theme: 'dark-purple' },
            { slide_number: 6, headline: 'Work Small. Work Deep.', subtext: 'Talk to the Karachi digital studio. WhatsApp link in bio.', theme: 'dark-purple' },
          ],
        },
        {
          id: 'cd-post-2',
          day: 2,
          dayName: 'Tuesday',
          angle_type: 'Why 4-Second Loading Websites Are Failures',
          core_thesis: 'A website that looks beautiful on Figma but crawls in 4 seconds is an engineering disaster.',
          status: 'scheduled',
          scheduled_time: 'Tue, Nov 25 • 02:00 PM',
          scheduled_time_utc: '2026-11-25T14:00:00Z',
          recommended_post_time_utc: '14:00',
          use_uploaded_image_index: null,
          generate_carousel: false,
          media_urls: [],
          quality_score: 9.5,
          linkedin: {
            body: `A beautiful website that loads in 4 seconds is a failed website.

Here is the truth most creative agencies hide behind glossy mockups:

Every 1-second delay in page load time cuts conversions by 7%.
If your SaaS homepage takes 3.8 seconds on 4G in Karachi or Lahore, you are losing 20%+ of your potential buyers before they even read your headline.

At CreativeDady, Development is rigor.
- Next.js server components
- Zero bloated heavy scripts
- Sub-500ms Core Web Vitals

A well-built site is fast, stable, and boring to maintain.
That is the standard.`,
            first_comment: 'Check our technical audits and performance benchmarks: https://creativedady.com/development',
            delay_min: 2,
          },
          x: {
            thread: [
              'A beautiful website that loads in 4 seconds is a failed website.\n\nEvery second of latency cuts conversion by 7%.\n\nHere is how CreativeDady builds for sub-second yield: 👇',
            ],
            is_thread: false,
          },
          instagram: {
            caption: `Performance is not an afterthought—it is the design.\n\nWhy we engineer websites for sub-second loading speeds.\n\n#webperformance #creativedady #frontenddeveloper`,
            hashtags: ['#webperformance', '#creativedady', '#frontenddeveloper'],
          },
          carousel_slides: [],
        },
      ],
    },
  },

  'legacy-paper': {
    slug: 'legacy-paper',
    name: 'Legacy Paper PK',
    tagline: '70 GSM Bleed-Free School & Bulk Stationery',
    industry: 'Paper & Stationery Manufacturing',
    base: 'Pakistan Nationwide',
    brandDna: {
      voiceTone: 'Tangible, craft-proud, direct, wholesale facts, fountain-pen tested, Pakistani education reality',
      targetAudience: 'School administrators, college principals, stationery shop stockists, corporate procurement',
      bannedWords: ['cheap', 'guaranteed 100%', 'best in the world', 'magical'],
      examplePosts: [
        'Why school registers fall apart by November: 55 GSM paper and stapled spines. We use 70 GSM pulp and thread sewing.',
        'We do not sell paper by weight tricks. We sell registers that survive 3 terms in a student\'s backpack.',
      ],
    },
    accounts: [
      {
        platform: 'linkedin',
        name: 'Legacy Paper Wholesale',
        handle: 'legacypaper-pk',
        avatar: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80',
        connected: true,
        tier: 'Official API v2 (Free)',
      },
      {
        platform: 'x',
        name: 'Legacy Paper PK',
        handle: '@legacypaperpk',
        avatar: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80',
        connected: true,
        tier: 'Twitter v2 Free',
      },
      {
        platform: 'instagram',
        name: 'Legacy Paper Stationery',
        handle: '@legacypaper.pk',
        avatar: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80',
        connected: true,
        tier: 'Meta Graph Free API',
      },
    ],
    campaign: {
      id: 'camp-lp-01',
      title: 'School Bulk Registers & Custom Crest Printing 2026',
      goal: 'Drive early school bulk register orders for the upcoming academic session highlighting 70 GSM bleed-free paper and section-sewn binding.',
      created_at: '2026-11-21T10:00:00Z',
      visual_analysis: {
        detected_subject: 'Stack of section-sewn registers with gold foil school crest embossing and ink swatch test',
        brand_vibe: 'Tactile, authentic, paper-first, durable',
        key_visual_hooks: [
          'Fountain pen zero-bleed test on 70 GSM paper',
          'Thread section-sewn 180-degree flat lay binding',
          'School bulk packaging & custom crest stamping',
        ],
      },
      search_queries: [
        'school stationery bulk supplier Karachi Lahore 2026',
        '70 GSM fountain pen bleed proof school registers Pakistan',
        'custom school diary printing bulk rates',
      ],
      uploaded_images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80',
      ],
      posts: [
        {
          id: 'lp-post-1',
          day: 1,
          dayName: 'Monday',
          angle_type: 'Why School Registers Fall Apart By Term 2',
          core_thesis: 'Most school registers use 55 GSM paper and glued staples that crack by term 2. Legacy Paper uses 70 GSM imported pulp and section-sewn thread.',
          status: 'published',
          scheduled_time: 'Mon, Nov 24 • 09:00 AM',
          scheduled_time_utc: '2026-11-24T09:00:00Z',
          recommended_post_time_utc: '09:00',
          use_uploaded_image_index: 0,
          generate_carousel: true,
          media_urls: [],
          quality_score: 9.7,
          critique_notes: 'Highly tactile, addresses real procurement pain points without exaggerations.',
          linkedin: {
            body: `Why do most school registers fall apart before November?

Every school administrator in Pakistan knows this frustration:

By mid-term, the spine cracks, pages pull out from cheap glue, and fountain-pen ink bleeds through to the next 2 sheets.

The root cause is cost-cutting:
• Standard registers use 55 GSM recycled grey paper.
• Binding is cheap wire staples that rust in monsoon humidity.

At Legacy Paper, we manufacture registers built to survive:
1. 70 GSM smooth white pulp (tested with blue and black fountain pen inks—zero feathering).
2. Section-sewn thread binding (opens completely flat 180 degrees without tearing).
3. Custom school crest embossing for orders above 250 units.

Free sample packs sent to school administrators nationwide.

WhatsApp bulk inquiries link in the first comment.`,
            first_comment: 'WhatsApp +92 321 0000000 for a free school sample pack & 2026 bulk rates: https://legacypaper.pk/bulk',
            delay_min: 2,
          },
          x: {
            thread: [
              'Why school registers fall apart before midterm:\n\n55 GSM paper and rusted wire staples.\n\nHere is how Legacy Paper manufactures registers that last 3 full terms: 🧵',
              '1/ 70 GSM Bleed-Proof Paper:\nSmooth imported pulp. Students can use fountain pens, gel pens, and ballpoints without ghosting.',
              '2/ Section-Sewn Spines:\nThread-bound so the register lies completely flat on the desk. No pages tearing out.',
              '3/ Custom School Branding:\nWe print your school\'s official crest, motto, and custom syllabus pages directly.',
            ],
            is_thread: true,
          },
          instagram: {
            caption: `Built to survive all three terms.\n\nSwipe to see why top schools choose Legacy Paper\'s 70 GSM section-sewn registers.\n\n#legacypaper #stationerypakistan #karachischools #schoolstationery #bulkstationery`,
            hashtags: ['#legacypaper', '#stationerypakistan', '#karachischools', '#schoolstationery', '#bulkstationery'],
          },
          carousel_slides: [
            { slide_number: 1, headline: 'Why School Registers Fall Apart', subtext: 'The difference between 55 GSM glue and 70 GSM thread sewing.', theme: 'monochrome' },
            { slide_number: 2, headline: '1. The Ink Bleed Problem', subtext: 'Cheap paper feathers ink. Our 70 GSM pulp stays crisp on both sides.', theme: 'monochrome' },
            { slide_number: 3, headline: '2. Section-Sewn Binding', subtext: 'Thread-sewn signatures that open 180 degrees completely flat.', theme: 'monochrome' },
            { slide_number: 4, headline: '3. Custom School Crests', subtext: 'Gold foil and multi-color cover embossing for your institution.', theme: 'monochrome' },
            { slide_number: 5, headline: 'Request A Free Sample Pack', subtext: 'WhatsApp +92 321 0000000. Nationwide delivery across Pakistan.', theme: 'monochrome' },
          ],
        },
      ],
    },
  },
};
