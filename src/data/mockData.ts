import { ResourceItem, VideoItem } from '../types';

export const POPULAR_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Stripe Webhooks Signature Verification in FastAPI in 140 Seconds',
    youtubeId: 'placeholder-stripe-webhook-fastapi',
    youtubeUrl: 'https://youtube.com/@BONSAILabsIN',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    duration: '2:20',
    durationSeconds: 140,
    views: '1.2K',
    publishedAt: 'Recently published',
    category: 'API & Webhooks',
    toolStack: ['FastAPI', 'Python', 'Stripe', 'Webhooks'],
    description: 'Stop guessing raw request body bytes. Here is the bulletproof Stripe webhook signature verifier pattern in Python FastAPI.',
    associatedResourceId: 'res-stripe-fastapi',
    isPopular: true
  },
  {
    id: 'vid-2',
    title: 'Self-Hosted n8n AI Webhook Pipeline with Gemini in 165 Seconds',
    youtubeId: 'placeholder-n8n-gemini-pipeline',
    youtubeUrl: 'https://youtube.com/@BONSAILabsIN',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    duration: '2:45',
    durationSeconds: 165,
    views: '950',
    publishedAt: 'Recently published',
    category: 'Automation & n8n',
    toolStack: ['n8n', 'Gemini', 'Webhooks', 'TypeScript'],
    description: 'Build an automated incoming email & webhook triage agent using n8n and Gemini Flash with fallback nodes.',
    associatedResourceId: 'res-n8n-ai-pipeline',
    isPopular: true
  },
  {
    id: 'vid-3',
    title: 'Production Docker Multi-Stage Build (Node.js 45MB Image) in 110 Seconds',
    youtubeId: 'placeholder-docker-node-multistage',
    youtubeUrl: 'https://youtube.com/@BONSAILabsIN',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop',
    duration: '1:50',
    durationSeconds: 110,
    views: '1.8K',
    publishedAt: 'Recently published',
    category: 'DevOps & Docker',
    toolStack: ['Docker', 'Node.js', 'TypeScript'],
    description: 'Slash Node.js container size from 1.2GB to 45MB while dropping root privileges and adding non-root security headers.',
    associatedResourceId: 'res-docker-multistage',
    isPopular: true
  },
  {
    id: 'vid-4',
    title: 'Redis Sliding Window Rate Limiter Middleware in 155 Seconds',
    youtubeId: 'placeholder-redis-rate-limiter',
    youtubeUrl: 'https://youtube.com/@BONSAILabsIN',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    duration: '2:35',
    durationSeconds: 155,
    views: '820',
    publishedAt: 'Recently published',
    category: 'Backend & Databases',
    toolStack: ['Redis', 'Node.js', 'TypeScript'],
    description: 'Prevent API abuse across distributed Node clusters using Redis ZSET sliding window counter.',
    associatedResourceId: 'res-redis-ratelimit',
    isPopular: true
  }
];

export const ALL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-stripe-fastapi',
    title: 'Bulletproof Stripe Webhooks Signature Verification in FastAPI',
    slug: 'stripe-webhooks-signature-fastapi',
    description: 'How to reliably capture raw request bytes in FastAPI to verify Stripe cryptographic signatures without triggering 400 Bad Request signature mismatches.',
    contentType: 'tutorial',
    category: 'API & Webhooks',
    toolStack: ['FastAPI', 'Python', 'Stripe', 'Webhooks'],
    durationSeconds: 140,
    viewsCount: 1240,
    downloadCount: 180,
    publishedDate: '2026-07-20',
    isPopular: true,
    isFeatured: true,
    youtubeId: 'placeholder-stripe-webhook-fastapi',
    youtubeUrl: 'https://youtube.com/@BONSAILabsIN',
    diagramType: 'webhook-flow',
    fullArticleText: `When handling Stripe webhooks in FastAPI, a frequent trap developers run into is signature verification failure (400 Bad Request / SignatureVerificationError).

### The Root Cause
FastAPI automatically parses request bodies into Python dicts or Pydantic models. Re-serializing a dict back to string or JSON alters key spacing and byte ordering, rendering the cryptographic HMAC signature invalid.

### The 180-Second Fix
1. Read the raw byte array directly using \`await request.body()\` before invoking any JSON parser.
2. Pass the exact, unmodified bytes to \`stripe.Webhook.construct_event(payload, stripe_signature, endpoint_secret)\`.
3. Wrap verification in explicit \`try/except\` blocks to return clean HTTP status codes.`,
    prerequisites: ['Python 3.10+', 'FastAPI', 'Stripe Secret Keys'],
    takeaways: [
      'Extract raw request payload with await request.body() before JSON parsing',
      'Handle stripe.SignatureVerificationError cleanly with HTTP 400 response',
      'Ensure idempotent endpoint processing using Redis idempotency key'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Capture Raw Bytes from FastAPI Request',
        description: 'Bypass default dict parsing by requesting raw Request object in your route signature.',
        codeSnippet: `from fastapi import FastAPI, Request, HTTPException, Header
import stripe

app = FastAPI()
stripe.api_key = "sk_test_..."
STRIPE_WEBHOOK_SECRET = "whsec_..."`
      },
      {
        stepNumber: 2,
        title: 'Verify Cryptographic Signature',
        description: 'Construct event using raw byte payload and stripe-signature header.',
        codeSnippet: `@app.post("/api/webhooks/stripe")
async def stripe_webhook(
    request: Request,
    stripe_signature: str = Header(None, alias="stripe-signature")
):
    if not stripe_signature:
        raise HTTPException(status_code=400, detail="Missing signature header")
    
    payload = await request.body()
    
    try:
        event = stripe.Webhook.construct_event(
            payload=payload,
            sig_header=stripe_signature,
            secret=STRIPE_WEBHOOK_SECRET
        )
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    if event["type"] == "payment_intent.succeeded":
        intent = event["data"]["object"]
        print(f"Payment intent succeeded: {intent['id']}")

    return {"status": "success"}`
      }
    ],
    codeBlocks: [
      {
        filename: 'webhook_handler.py',
        language: 'python',
        code: `import os
from fastapi import FastAPI, Request, HTTPException, Header
import stripe

app = FastAPI()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
ENDPOINT_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")

@app.post("/webhooks/stripe")
async def handle_stripe_webhook(
    request: Request,
    stripe_signature: str = Header(..., alias="stripe-signature")
):
    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, ENDPOINT_SECRET
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    event_type = event.get("type")
    data_object = event["data"]["object"]

    if event_type == "checkout.session.completed":
        customer_email = data_object.get("customer_details", {}).get("email")
        print(f"Provisioning access for {customer_email}")
        
    return {"status": "ok"}`
      }
    ]
  },
  {
    id: 'res-n8n-ai-pipeline',
    title: 'Self-Hosted n8n AI Webhook Pipeline with Gemini 2.5',
    slug: 'n8n-ai-webhook-gemini-pipeline',
    description: 'Complete n8n workflow template to ingest incoming webhooks, structure raw unstructured text via Gemini Flash, and push clean JSON to PostgreSQL.',
    contentType: 'workflow',
    category: 'Automation & n8n',
    toolStack: ['n8n', 'Gemini', 'Webhooks', 'PostgreSQL'],
    durationSeconds: 165,
    viewsCount: 980,
    downloadCount: 310,
    publishedDate: '2026-07-18',
    isPopular: true,
    isFeatured: true,
    youtubeId: 'placeholder-n8n-gemini-pipeline',
    youtubeUrl: 'https://youtube.com/@BONSAILabsIN',
    diagramType: 'pipeline',
    fullArticleText: `Automating support triage or payload normalization often requires processing messy, unstructured customer inputs.

### Architecture Blueprint
1. **Webhook Ingress**: Listens for HTTP POST events from forms or third-party webhooks.
2. **AI Extractor (Gemini Flash)**: Parses payload with a strict JSON schema prompt.
3. **Database Sink**: Inserts validated fields directly into PostgreSQL.`,
    prerequisites: ['Self-hosted or Cloud n8n instance', 'Gemini API Key'],
    takeaways: [
      'Webhook node setup with POST listener and CORS headers',
      'Structured JSON extraction prompt for Gemini AI model',
      'Postgres insertion query with positional parameters'
    ],
    workflowJson: `{
  "name": "BONSAI Labs - Gemini Webhook Triage",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "ai-triage-webhook",
        "options": {}
      },
      "name": "Webhook Receiver",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "modelName": "gemini-2.5-flash",
        "prompt": "Extract company_name, sentiment, urgency_score (1-10) and primary_issue from raw payload: {{$json.body}}",
        "jsonOutput": true
      },
      "name": "Gemini AI Node",
      "type": "n8n-nodes-base.googleGemini",
      "typeVersion": 1,
      "position": [480, 300]
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "INSERT INTO customer_signals (company_name, sentiment, urgency, issue) VALUES ($1, $2, $3, $4);"
      },
      "name": "Postgres Insert",
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 1,
      "position": [710, 300]
    }
  ],
  "connections": {
    "Webhook Receiver": {
      "main": [[{"node": "Gemini AI Node", "type": "main", "index": 0}]]
    },
    "Gemini AI Node": {
      "main": [[{"node": "Postgres Insert", "type": "main", "index": 0}]]
    }
  }
}`
  },
  {
    id: 'res-docker-multistage',
    title: 'Production Docker Multi-Stage Build (45MB Node.js Image)',
    slug: 'production-docker-multistage-node',
    description: 'Drop 95% of your Docker image bloat. Multi-stage Dockerfile that builds TypeScript, purges devDependencies, and runs under a non-root user.',
    contentType: 'snippet',
    category: 'DevOps & Docker',
    toolStack: ['Docker', 'Node.js', 'TypeScript'],
    durationSeconds: 110,
    viewsCount: 1850,
    downloadCount: 420,
    publishedDate: '2026-07-12',
    isPopular: true,
    isFeatured: true,
    youtubeId: 'placeholder-docker-node-multistage',
    youtubeUrl: 'https://youtube.com/@BONSAILabsIN',
    diagramType: 'architecture',
    fullArticleText: `Standard Node.js Docker containers often swell to 1.2GB due to build tools, TypeScript compilers, and devDependencies.

### Multi-Stage Strategy
- **Stage 1 (Builder)**: Install full npm modules, compile TypeScript to JavaScript, then discard.
- **Stage 2 (Runner)**: Copy only \`dist/\` compiled output and production node_modules into a clean Alpine image.
- **Security Hardening**: Drop root access by launching Node as non-root \`appuser\`.`,
    codeBlocks: [
      {
        filename: 'Dockerfile',
        language: 'dockerfile',
        code: `# Stage 1: Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production runtime stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Security: Create isolated non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist

USER appuser
EXPOSE 3000

CMD ["node", "dist/server.js"]`
      }
    ]
  },
  {
    id: 'res-redis-ratelimit',
    title: 'Redis Sliding Window Counter Rate Limiter Middleware',
    slug: 'redis-sliding-window-rate-limiter',
    description: 'Implement atomic sliding-window log or counter in Redis ZSET to prevent DDoS & endpoint scraping without memory leaks.',
    contentType: 'tutorial',
    category: 'Backend & Databases',
    toolStack: ['Redis', 'Node.js', 'TypeScript'],
    durationSeconds: 155,
    viewsCount: 820,
    downloadCount: 140,
    publishedDate: '2026-07-05',
    isPopular: true,
    isFeatured: false,
    youtubeId: 'placeholder-redis-rate-limiter',
    youtubeUrl: 'https://youtube.com/@BONSAILabsIN',
    diagramType: 'architecture',
    fullArticleText: `Fixed window rate limiters suffer from burst attacks at window boundaries. A Redis ZSET sliding window keeps track of exact request timestamps per IP.`,
    codeBlocks: [
      {
        filename: 'rateLimiter.ts',
        language: 'typescript',
        code: `import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export function createSlidingWindowLimiter(limit: number, windowSeconds: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const key = \`ratelimit:\${ip}\`;
    const now = Date.now();
    const windowStart = now - windowSeconds * 1000;

    const pipeline = redis.pipeline();
    pipeline.zremrangebyscore(key, 0, windowStart);
    pipeline.zadd(key, now, now.toString());
    pipeline.zcard(key);
    pipeline.expire(key, windowSeconds);

    const results = await pipeline.exec();
    const requestCount = results?.[2]?.[1] as number || 0;

    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - requestCount));

    if (requestCount > limit) {
      return res.status(429).json({
        error: 'Too Many Requests',
        retryAfterSeconds: windowSeconds
      });
    }

    next();
  };
}`
      }
    ]
  },
  {
    id: 'res-supabase-rls',
    title: 'Supabase Multi-Tenant RLS Policy Blueprint for SaaS',
    slug: 'supabase-multi-tenant-rls-policy',
    description: 'PostgreSQL Row Level Security policies enforcing workspace tenant separation based on app_metadata organization IDs.',
    contentType: 'guide',
    category: 'Auth & Security',
    toolStack: ['Supabase', 'PostgreSQL', 'OAuth2'],
    durationSeconds: 170,
    viewsCount: 910,
    downloadCount: 210,
    publishedDate: '2026-06-28',
    isPopular: false,
    isFeatured: false,
    youtubeId: 'placeholder-supabase-rls-saas',
    youtubeUrl: 'https://youtube.com/@BONSAILabsIN',
    diagramType: 'rls-tree',
    codeBlocks: [
      {
        filename: 'schema_rls.sql',
        language: 'sql',
        code: `-- Enable RLS on core tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Helper function to extract workspace_id from JWT
CREATE OR REPLACE FUNCTION current_workspace_id()
RETURNS uuid AS $$
  SELECT NULLIF(current_setting('request.jwt.claims', true)::jsonb->'app_metadata'->>'workspace_id', '')::uuid;
$$ LANGUAGE sql STABLE;

-- Tenant Isolation Policy
CREATE POLICY "Workspace isolation for projects"
ON projects FOR SELECT
USING (
  workspace_id = current_workspace_id()
);`
      }
    ]
  }
];

export const TOOL_STACK_LIST = [
  'Python', 'FastAPI', 'Node.js', 'TypeScript', 'n8n', 
  'Docker', 'Stripe', 'Supabase', 'PostgreSQL', 'Redis', 
  'OAuth2', 'Gemini', 'Webhooks'
] as const;

export const CATEGORY_LIST = [
  'All',
  'API & Webhooks',
  'Automation & n8n',
  'AI & LLMs',
  'DevOps & Docker',
  'Backend & Databases',
  'Auth & Security'
] as const;
