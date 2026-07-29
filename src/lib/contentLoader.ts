/// <reference types="vite/client" />
import { ResourceItem, VideoItem } from '../types';

// Vite eager raw import of all MDX files in content/
const mdxModules = import.meta.glob('/content/**/*.mdx', {
  eager: true,
  query: '?raw'
}) as Record<string, { default: string } | string>;

interface ParsedMDX {
  data: Record<string, any>;
  body: string;
}

function parseYAMLValue(val: string): any {
  let cleaned = val.trim();
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    return cleaned.slice(1, -1);
  }
  if (cleaned === 'true') return true;
  if (cleaned === 'false') return false;
  if (!isNaN(Number(cleaned)) && cleaned !== '') return Number(cleaned);
  return cleaned;
}

function parseFrontmatter(raw: string): ParsedMDX {
  const normalized = raw.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---')) {
    return { data: {}, body: normalized };
  }

  const parts = normalized.split('\n---');
  if (parts.length < 2) {
    return { data: {}, body: normalized };
  }

  const yamlPart = parts[0].replace(/^---\n?/, '');
  const bodyPart = parts.slice(1).join('\n---').replace(/^\n/, '').trim();

  const data: Record<string, any> = {};
  const lines = yamlPart.split('\n');
  let currentKey = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;

    // Array item
    if (line.trim().startsWith('- ') && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      const val = line.trim().substring(2);
      data[currentKey].push(parseYAMLValue(val));
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      const valueStr = line.slice(colonIdx + 1).trim();
      currentKey = key;

      if (!valueStr) {
        data[key] = [];
      } else {
        data[key] = parseYAMLValue(valueStr);
      }
    }
  }

  return { data, body: bodyPart };
}

export function loadMDXContent() {
  const resources: ResourceItem[] = [];
  const videos: VideoItem[] = [];

  for (const path in mdxModules) {
    const rawModule = mdxModules[path];
    const rawContent = typeof rawModule === 'string' ? rawModule : rawModule.default || '';

    if (!rawContent) continue;

    const { data, body } = parseFrontmatter(rawContent);

    if (path.includes('/content/tutorials/')) {
      const resource: ResourceItem = {
        id: data.id || `res-${data.slug || Math.random().toString(36).substr(2, 6)}`,
        title: data.title || 'Untitled Tutorial',
        slug: data.slug || 'tutorial',
        description: data.description || '',
        contentType: data.contentType || 'tutorial',
        category: data.category || 'API & Webhooks',
        toolStack: Array.isArray(data.toolStack) ? data.toolStack : [],
        durationSeconds: Number(data.durationSeconds) || 180,
        viewsCount: Number(data.viewsCount) || 1200,
        downloadCount: Number(data.downloadCount) || 240,
        publishedDate: data.publishedDate || '2026-07-29',
        isPopular: Boolean(data.isPopular),
        isFeatured: Boolean(data.isFeatured),
        youtubeId: data.youtubeId,
        youtubeUrl: data.youtubeUrl,
        diagramType: data.diagramType,
        fullArticleText: body || data.description,
        prerequisites: Array.isArray(data.prerequisites) ? data.prerequisites : [],
        takeaways: Array.isArray(data.takeaways) ? data.takeaways : [],
        workflowJson: data.workflowJson,
        codeBlocks: data.codeSnippet
          ? [
              {
                filename: data.codeFilename || 'code.ts',
                language: data.codeLanguage || 'typescript',
                code: data.codeSnippet
              }
            ]
          : undefined
      };
      resources.push(resource);
    } else if (path.includes('/content/videos/')) {
      const video: VideoItem = {
        id: data.id || `vid-${Math.random().toString(36).substr(2, 6)}`,
        title: data.title || 'Untitled Video',
        youtubeId: data.youtubeId || 'dQw4w9WgXcQ',
        youtubeUrl: data.youtubeUrl || 'https://youtube.com',
        thumbnailUrl: data.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        duration: data.duration || '2:30',
        durationSeconds: Number(data.durationSeconds) || 150,
        views: data.views || '1K',
        publishedAt: data.publishedAt || 'Recently published',
        category: data.category || 'API & Webhooks',
        toolStack: Array.isArray(data.toolStack) ? data.toolStack : [],
        description: data.description || body || '',
        associatedResourceId: data.associatedResourceId,
        isPopular: data.isPopular !== undefined ? Boolean(data.isPopular) : true
      };
      videos.push(video);
    }
  }

  return { resources, videos };
}
