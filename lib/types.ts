export type PlatformKey = 'linkedin' | 'x' | 'instagram';

export type PostStatus = 'draft' | 'needs_review' | 'approved' | 'scheduled' | 'published';

export interface CarouselSlideData {
  slide_number: number;
  headline: string;
  subtext: string;
  theme?: 'dark-purple' | 'midnight-cyan' | 'monochrome' | 'emerald';
}

export interface PostItem {
  id: string;
  day: number;
  dayName: string;
  angle_type: string;
  core_thesis?: string;
  coreThesis?: string;
  status: PostStatus;
  scheduled_time: string; // e.g. "Mon, Nov 24 • 09:00 AM"
  scheduled_time_utc: string;
  recommended_post_time_utc: string;
  use_uploaded_image_index: number | null;
  generate_carousel: boolean;
  media_urls: string[];
  generatedVisual?: boolean;
  sources?: Array<{ title: string; url: string }>;
  platforms?: PlatformKey[];
  quality_score: number;
  critique_notes?: string;
  linkedin: {
    body: string;
    first_comment: string;
    delay_min: number;
  };
  x: {
    thread: string[];
    is_thread: boolean;
  };
  instagram: {
    caption: string;
    hashtags: string[];
  };
  carousel_slides: CarouselSlideData[];
}

export interface VisualAnalysis {
  detected_subject: string;
  brand_vibe: string;
  key_visual_hooks: string[];
}

export interface CampaignDay {
  day: number;
  angle_type: string;
  core_thesis: string;
  recommended_post_time_utc: string;
}

export interface CampaignInput {
  goal: string;
  images: string[];
  platforms: Record<PlatformKey, boolean>;
  creativeDirection: string;
  styleReferences: string[];
  brandDna: BrandDnaData;
}

export interface CampaignRetryContext {
  plan: CampaignDay[];
  sources: Array<{ title: string; url: string; excerpt: string }>;
}

export interface CampaignData {
  id: string;
  title: string;
  goal: string;
  created_at: string;
  visual_analysis: VisualAnalysis;
  search_queries: string[];
  researchSources?: Array<{ title: string; url: string }>;
  uploaded_images: string[];
  retryContext?: CampaignRetryContext;
  failedDays?: Array<{ day: number; message: string }>;
  posts: PostItem[];
}

export interface BrandDnaData {
  voiceTone: string;
  targetAudience: string;
  bannedWords: string[];
  examplePosts: string[];
}

export interface ConnectedAccountData {
  platform: 'linkedin' | 'x' | 'instagram' | 'bluesky';
  name: string;
  handle: string;
  avatar: string;
  connected: boolean;
  tier: string;
}

export interface CampaignSuggestion {
  objective: string;
  visualDirection: string;
  references: Array<{ title: string; description: string; image: string | null }>;
  sources: Array<{ title: string; url: string }>;
}
