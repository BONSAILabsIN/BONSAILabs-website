export type ContentType = 'tutorial' | 'workflow' | 'snippet' | 'video' | 'guide';

export type Category = 
  | 'API & Webhooks'
  | 'Automation & n8n'
  | 'AI & LLMs'
  | 'DevOps & Docker'
  | 'Backend & Databases'
  | 'Auth & Security';

export type ToolStack = 
  | 'Python'
  | 'FastAPI'
  | 'Node.js'
  | 'TypeScript'
  | 'n8n'
  | 'Docker'
  | 'Stripe'
  | 'Supabase'
  | 'PostgreSQL'
  | 'Redis'
  | 'OAuth2'
  | 'OpenAI'
  | 'Gemini'
  | 'Webhooks'
  | 'LangChain';

export interface CodeBlock {
  filename: string;
  language: string;
  code: string;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  codeSnippet?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  contentType: ContentType;
  category: Category;
  toolStack: ToolStack[];
  durationSeconds: number; // e.g. 165 = 2m 45s (< 180s read time)
  viewsCount: number;
  downloadCount?: number;
  publishedDate: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  youtubeId?: string;
  youtubeUrl?: string;
  diagramType?: 'architecture' | 'webhook-flow' | 'pipeline' | 'rls-tree';
  fullArticleText?: string;
  steps?: WorkflowStep[];
  codeBlocks?: CodeBlock[];
  workflowJson?: string; // downloadable / copyable JSON for n8n/Zapier/Make/Postman
  prerequisites?: string[];
  takeaways?: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  duration: string; // "2:45"
  durationSeconds: number;
  views: string; // "14.2K"
  publishedAt: string;
  category: Category;
  toolStack: ToolStack[];
  description: string;
  associatedResourceId?: string;
  isPopular?: boolean;
}

export type ViewTab = 'home' | 'resources' | 'videos' | 'about';

export type LegalModalType = 'terms' | 'privacy' | 'creator-guide' | null;
