import React, { useState, useEffect } from 'react';
import { ResourceItem, VideoItem, Category, ToolStack, ContentType } from '../types';
import { CATEGORY_LIST, TOOL_STACK_LIST } from '../data/mockData';
import {
  X, Plus, Edit2, Trash2, Download, Upload, RefreshCw, Check,
  FileCode2, Play, BookOpen, Layers, Sparkles, Youtube, CheckCircle2, ShieldCheck, Lock
} from 'lucide-react';

interface OwnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: ResourceItem[];
  videos: VideoItem[];
  onSaveResource: (resource: ResourceItem) => void;
  onDeleteResource: (id: string) => void;
  onSaveVideo: (video: VideoItem) => void;
  onDeleteVideo: (id: string) => void;
  onResetToSeedData: () => void;
  editingResourceItem?: ResourceItem | null;
  editingVideoItem?: VideoItem | null;
}

export const OwnerPortalModal: React.FC<OwnerPortalModalProps> = ({
  isOpen,
  onClose,
  resources,
  videos,
  onSaveResource,
  onDeleteResource,
  onSaveVideo,
  onDeleteVideo,
  onResetToSeedData,
  editingResourceItem,
  editingVideoItem
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'backup' | 'decap'>('create');
  const [itemKind, setItemKind] = useState<'resource' | 'video'>('resource');
  const [successMsg, setSuccessMsg] = useState('');

  // Resource Form State
  const [resId, setResId] = useState('');
  const [resTitle, setResTitle] = useState('');
  const [resCategory, setResCategory] = useState<Category>('API & Webhooks');
  const [resContentType, setResContentType] = useState<ContentType>('tutorial');
  const [resToolStack, setResToolStack] = useState<ToolStack[]>(['Python', 'FastAPI']);
  const [resDuration, setResDuration] = useState<number>(140);
  const [resDescription, setResDescription] = useState('');
  const [resYoutubeUrl, setResYoutubeUrl] = useState('');
  const [resArticleText, setResArticleText] = useState('');
  const [resCodeFilename, setResCodeFilename] = useState('main.py');
  const [resCodeLanguage, setResCodeLanguage] = useState('python');
  const [resCodeContent, setResCodeContent] = useState('');
  const [resWorkflowJson, setResWorkflowJson] = useState('');
  const [resPrereqs, setResPrereqs] = useState('');
  const [resTakeaways, setResTakeaways] = useState('');

  // Video Form State
  const [vidId, setVidId] = useState('');
  const [vidTitle, setVidTitle] = useState('');
  const [vidYoutubeUrl, setVidYoutubeUrl] = useState('');
  const [vidDuration, setVidDuration] = useState('2:30');
  const [vidCategory, setVidCategory] = useState<Category>('API & Webhooks');
  const [vidToolStack, setVidToolStack] = useState<ToolStack[]>(['n8n', 'Webhooks']);
  const [vidDescription, setVidDescription] = useState('');
  const [vidAssociatedResId, setVidAssociatedResId] = useState('');

  // Manage Tab Search State
  const [manageSearch, setManageSearch] = useState('');

  // MDX Export & Import Handlers
  const handleExportCurrentMdx = () => {
    if (!resTitle.trim()) {
      alert('Please enter a tutorial title before exporting MDX.');
      return;
    }
    const slug = resTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const mdxContent = `---
title: "${resTitle.replace(/"/g, '\\"')}"
slug: "${slug}"
category: "${resCategory}"
contentType: "${resContentType}"
durationSeconds: ${resDuration}
youtubeUrl: "${resYoutubeUrl}"
toolStack:
${resToolStack.map(t => `  - "${t}"`).join('\n')}
publishedDate: "${new Date().toISOString().split('T')[0]}"
prerequisites:
${resPrereqs ? resPrereqs.split(',').map(p => `  - "${p.trim()}"`).join('\n') : ''}
takeaways:
${resTakeaways ? resTakeaways.split(',').map(t => `  - "${t.trim()}"`).join('\n') : ''}
---

# ${resTitle}

${resDescription}

${resArticleText}

${resCodeContent ? `\n## Code Snippet (${resCodeFilename})\n\`\`\`${resCodeLanguage}\n${resCodeContent}\n\`\`\`` : ''}

${resWorkflowJson ? `\n## Automation Workflow JSON\n\`\`\`json\n${resWorkflowJson}\n\`\`\`` : ''}
`;

    const blob = new Blob([mdxContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.mdx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportMdxFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (text.startsWith('---')) {
          const parts = text.split('---');
          if (parts.length >= 3) {
            const frontmatter = parts[1];
            const body = parts.slice(2).join('---').trim();

            const titleMatch = frontmatter.match(/title:\s*"(.*?)"|title:\s*(.*)/);
            if (titleMatch) setResTitle((titleMatch[1] || titleMatch[2] || '').trim());

            const catMatch = frontmatter.match(/category:\s*"(.*?)"|category:\s*(.*)/);
            if (catMatch) {
              const cat = (catMatch[1] || catMatch[2] || '').trim();
              if (CATEGORY_LIST.includes(cat as Category)) setResCategory(cat as Category);
            }

            const ytMatch = frontmatter.match(/youtubeUrl:\s*"(.*?)"|youtubeUrl:\s*(.*)/);
            if (ytMatch) setResYoutubeUrl((ytMatch[1] || ytMatch[2] || '').trim());

            setResArticleText(body);
            setSuccessMsg('✅ Imported MDX file into form!');
            setTimeout(() => setSuccessMsg(''), 3000);
            return;
          }
        }
        setResArticleText(text);
        setSuccessMsg('✅ Imported Markdown into form!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } catch (err) {
        alert('Could not parse MDX file.');
      }
    };
    reader.readAsText(file);
  };

  // Auto populate form when editingResourceItem or editingVideoItem changes
  useEffect(() => {
    if (editingResourceItem) {
      setActiveTab('create');
      setItemKind('resource');
      setResId(editingResourceItem.id);
      setResTitle(editingResourceItem.title);
      setResCategory(editingResourceItem.category);
      setResContentType(editingResourceItem.contentType);
      setResToolStack(editingResourceItem.toolStack || []);
      setResDuration(editingResourceItem.durationSeconds || 140);
      setResDescription(editingResourceItem.description);
      setResYoutubeUrl(editingResourceItem.youtubeUrl || (editingResourceItem.youtubeId ? `https://youtube.com/watch?v=${editingResourceItem.youtubeId}` : ''));
      setResArticleText(editingResourceItem.fullArticleText || '');
      
      if (editingResourceItem.codeBlocks && editingResourceItem.codeBlocks.length > 0) {
        setResCodeFilename(editingResourceItem.codeBlocks[0].filename);
        setResCodeLanguage(editingResourceItem.codeBlocks[0].language);
        setResCodeContent(editingResourceItem.codeBlocks[0].code);
      } else {
        setResCodeFilename('main.py');
        setResCodeLanguage('python');
        setResCodeContent('');
      }

      setResWorkflowJson(editingResourceItem.workflowJson || '');
      setResPrereqs(editingResourceItem.prerequisites ? editingResourceItem.prerequisites.join(', ') : '');
      setResTakeaways(editingResourceItem.takeaways ? editingResourceItem.takeaways.join(', ') : '');
    }
  }, [editingResourceItem]);

  useEffect(() => {
    if (editingVideoItem) {
      setActiveTab('create');
      setItemKind('video');
      setVidId(editingVideoItem.id);
      setVidTitle(editingVideoItem.title);
      setVidYoutubeUrl(editingVideoItem.youtubeUrl || `https://youtube.com/watch?v=${editingVideoItem.youtubeId}`);
      setVidDuration(editingVideoItem.duration || '2:30');
      setVidCategory(editingVideoItem.category);
      setVidToolStack(editingVideoItem.toolStack || []);
      setVidDescription(editingVideoItem.description);
      setVidAssociatedResId(editingVideoItem.associatedResourceId || '');
    }
  }, [editingVideoItem]);

  if (!isOpen) return null;

  const extractYoutubeId = (urlOrId: string) => {
    if (!urlOrId) return '';
    if (!urlOrId.includes('/') && !urlOrId.includes('?')) return urlOrId.trim();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlOrId.match(regExp);
    return (match && match[2].length === 11) ? match[2] : urlOrId.trim();
  };

  const resetResourceForm = () => {
    setResId('');
    setResTitle('');
    setResDescription('');
    setResYoutubeUrl('');
    setResArticleText('');
    setResCodeContent('');
    setResWorkflowJson('');
    setResPrereqs('');
    setResTakeaways('');
  };

  const resetVideoForm = () => {
    setVidId('');
    setVidTitle('');
    setVidYoutubeUrl('');
    setVidDuration('2:30');
    setVidDescription('');
    setVidAssociatedResId('');
  };

  const handleSaveResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim()) return;

    const ytId = extractYoutubeId(resYoutubeUrl);
    const newSlug = resTitle.toLowerCase().replace(/[^a-z0-0]/g, '-').replace(/-+/g, '-');

    const resourceObj: ResourceItem = {
      id: resId || `res-custom-${Date.now()}`,
      title: resTitle.trim(),
      slug: newSlug,
      description: resDescription.trim(),
      contentType: resContentType,
      category: resCategory,
      toolStack: resToolStack.length > 0 ? resToolStack : ['Python'],
      durationSeconds: Number(resDuration) || 140,
      viewsCount: 1,
      downloadCount: 0,
      publishedDate: new Date().toISOString().split('T')[0],
      isPopular: false,
      isFeatured: true,
      youtubeId: ytId || undefined,
      youtubeUrl: resYoutubeUrl.trim() || undefined,
      diagramType: resContentType === 'workflow' ? 'pipeline' : 'webhook-flow',
      fullArticleText: resArticleText.trim() || undefined,
      prerequisites: resPrereqs ? resPrereqs.split(',').map(s => s.trim()).filter(Boolean) : undefined,
      takeaways: resTakeaways ? resTakeaways.split(',').map(s => s.trim()).filter(Boolean) : undefined,
      codeBlocks: resCodeContent.trim() ? [
        {
          filename: resCodeFilename.trim() || 'main.py',
          language: resCodeLanguage.trim() || 'python',
          code: resCodeContent.trim()
        }
      ] : undefined,
      workflowJson: resWorkflowJson.trim() || undefined
    };

    onSaveResource(resourceObj);
    setSuccessMsg('✅ Tutorial / Blueprint successfully published!');
    setTimeout(() => setSuccessMsg(''), 3000);
    resetResourceForm();
  };

  const handleSaveVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vidTitle.trim()) return;

    const ytId = extractYoutubeId(vidYoutubeUrl);
    const durationParts = vidDuration.split(':');
    let durSecs = 150;
    if (durationParts.length === 2) {
      durSecs = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
    }

    const videoObj: VideoItem = {
      id: vidId || `vid-custom-${Date.now()}`,
      title: vidTitle.trim(),
      youtubeId: ytId || 'dQw4w9WgXcQ',
      youtubeUrl: vidYoutubeUrl.trim() || `https://youtube.com/watch?v=${ytId}`,
      thumbnailUrl: ytId 
        ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
        : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      duration: vidDuration || '2:30',
      durationSeconds: durSecs,
      views: '1',
      publishedAt: 'Just published',
      category: vidCategory,
      toolStack: vidToolStack.length > 0 ? vidToolStack : ['n8n'],
      description: vidDescription.trim(),
      associatedResourceId: vidAssociatedResId || undefined,
      isPopular: true
    };

    onSaveVideo(videoObj);
    setSuccessMsg('✅ YouTube Video successfully added to catalog!');
    setTimeout(() => setSuccessMsg(''), 3000);
    resetVideoForm();
  };

  const toggleToolStackInResource = (tool: ToolStack) => {
    if (resToolStack.includes(tool)) {
      setResToolStack(resToolStack.filter(t => t !== tool));
    } else {
      setResToolStack([...resToolStack, tool]);
    }
  };

  const toggleToolStackInVideo = (tool: ToolStack) => {
    if (vidToolStack.includes(tool)) {
      setVidToolStack(vidToolStack.filter(t => t !== tool));
    } else {
      setVidToolStack([...vidToolStack, tool]);
    }
  };

  const handleExportBackup = () => {
    const backupData = {
      resources,
      videos,
      exportedAt: new Date().toISOString(),
      platform: 'bonsailabs.in'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bonsai_library_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.resources && Array.isArray(parsed.resources)) {
          parsed.resources.forEach((r: ResourceItem) => onSaveResource(r));
        }
        if (parsed.videos && Array.isArray(parsed.videos)) {
          parsed.videos.forEach((v: VideoItem) => onSaveVideo(v));
        }
        setSuccessMsg('✅ Backup file imported successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } catch (err) {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xl max-w-4xl w-full overflow-hidden max-h-[92vh] flex flex-col font-sans">
        
        {/* Top Header */}
        <div className="p-4 bg-black text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="font-mono text-sm font-bold tracking-wide">
                Owner Publishing Portal
              </h2>
              <p className="text-[11px] text-gray-400 font-mono">
                bonsailabs.in • Upload &amp; manage tutorials, code, and videos with 0 code changes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sessionStorage.removeItem('bonsai_admin_authenticated');
                onClose();
              }}
              className="px-2.5 py-1.5 bg-gray-900 hover:bg-gray-800 text-amber-400 rounded text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 border border-gray-800"
              title="Lock Admin Portal & Sign Out"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Admin Portal</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-gray-900 text-gray-400 hover:text-white transition-colors"
              title="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-2 font-mono text-xs shrink-0">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-3.5 py-2 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'create'
                ? 'bg-white text-black shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>+ Add New Content</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`px-3.5 py-2 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'manage'
                ? 'bg-white text-black shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Layers className="w-4 h-4 text-black" />
            <span>Manage Published ({resources.length + videos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('decap')}
            className={`px-3.5 py-2 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'decap'
                ? 'bg-white text-black shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <FileCode2 className="w-4 h-4 text-amber-600" />
            <span>Decap CMS &amp; Git Spec</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3.5 py-2 rounded-md font-semibold flex items-center gap-1.5 transition-colors ml-auto ${
              activeTab === 'backup'
                ? 'bg-white text-black shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Download className="w-4 h-4 text-gray-700" />
            <span>Backup &amp; Sync</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="bg-emerald-500 text-white px-4 py-2 text-xs font-mono font-bold flex items-center justify-between shrink-0">
            <span>{successMsg}</span>
            <button onClick={() => setSuccessMsg('')}>✕</button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          
          {/* TAB 1: CREATE / PUBLISH CONTENT */}
          {activeTab === 'create' && (
            <div className="space-y-6">
              
              {/* Select Content Kind Toggle */}
              <div className="flex items-center gap-3 p-1.5 bg-gray-100 rounded-lg w-fit text-xs font-mono border border-gray-200">
                <button
                  type="button"
                  onClick={() => { setItemKind('resource'); resetResourceForm(); }}
                  className={`px-3.5 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
                    itemKind === 'resource'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Tutorial / Workflow / Snippet Blueprint</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setItemKind('video'); resetVideoForm(); }}
                  className={`px-3.5 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
                    itemKind === 'video'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>YouTube Video Entry (&lt;180s)</span>
                </button>
              </div>

              {/* FORM: RESOURCE BLUEPRINT */}
              {itemKind === 'resource' && (
                <form onSubmit={handleSaveResourceSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-mono font-bold text-gray-700">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={resTitle}
                        onChange={(e) => setResTitle(e.target.value)}
                        placeholder="e.g., Stripe Webhooks Signature Verification in FastAPI"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-gray-700">
                        Category *
                      </label>
                      <select
                        value={resCategory}
                        onChange={(e) => setResCategory(e.target.value as Category)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans focus:outline-none focus:border-black"
                      >
                        {CATEGORY_LIST.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-gray-700">
                        Content Type *
                      </label>
                      <select
                        value={resContentType}
                        onChange={(e) => setResContentType(e.target.value as ContentType)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans focus:outline-none focus:border-black"
                      >
                        <option value="tutorial">Tutorial</option>
                        <option value="workflow">Workflow Template (n8n / JSON)</option>
                        <option value="snippet">Code Snippet</option>
                        <option value="guide">Guide / Architecture</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-gray-700">
                        Duration in Seconds (e.g. 140 = 2m 20s)
                      </label>
                      <input
                        type="number"
                        value={resDuration}
                        onChange={(e) => setResDuration(Number(e.target.value))}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-mono focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-gray-700">
                        YouTube Video Link or Video ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={resYoutubeUrl}
                        onChange={(e) => setResYoutubeUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=XXXX or Video ID"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-mono focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Tool Stack Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-gray-700">
                      Select Tool Stack Tags
                    </label>
                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {TOOL_STACK_LIST.map((tool) => {
                        const isSelected = resToolStack.includes(tool as ToolStack);
                        return (
                          <button
                            key={tool}
                            type="button"
                            onClick={() => toggleToolStackInResource(tool as ToolStack)}
                            className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                              isSelected
                                ? 'bg-black text-white border-black font-semibold'
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {tool} {isSelected && '✓'}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Short Description */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-gray-700">
                      Short Overview / Bottleneck Description *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={resDescription}
                      onChange={(e) => setResDescription(e.target.value)}
                      placeholder="Briefly state the bottleneck solved (under 2 sentences)..."
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Full Article Text */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-gray-700">
                      Full Article Write-up &amp; Explanation
                    </label>
                    <textarea
                      rows={4}
                      value={resArticleText}
                      onChange={(e) => setResArticleText(e.target.value)}
                      placeholder="Detailed resolution analysis, steps, or explanation..."
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Code Snippet Box */}
                  <div className="p-4 bg-gray-900 text-white rounded-lg space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-gray-300 border-b border-gray-800 pb-2">
                      <span className="font-bold text-emerald-400">Primary Code Snippet</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={resCodeFilename}
                          onChange={(e) => setResCodeFilename(e.target.value)}
                          placeholder="filename (e.g. main.py)"
                          className="px-2 py-1 bg-gray-800 text-white border border-gray-700 rounded text-[11px]"
                        />
                        <input
                          type="text"
                          value={resCodeLanguage}
                          onChange={(e) => setResCodeLanguage(e.target.value)}
                          placeholder="language (python, ts, dockerfile)"
                          className="px-2 py-1 bg-gray-800 text-white border border-gray-700 rounded text-[11px]"
                        />
                      </div>
                    </div>
                    <textarea
                      rows={5}
                      value={resCodeContent}
                      onChange={(e) => setResCodeContent(e.target.value)}
                      placeholder="# Paste Python, TypeScript, Docker, or SQL code here..."
                      className="w-full p-3 bg-gray-950 text-gray-200 border border-gray-800 rounded font-mono text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Workflow JSON Box */}
                  <div className="p-4 bg-gray-900 text-white rounded-lg space-y-2 font-mono text-xs">
                    <label className="font-bold text-amber-400 block border-b border-gray-800 pb-2">
                      n8n / Automation Workflow JSON (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={resWorkflowJson}
                      onChange={(e) => setResWorkflowJson(e.target.value)}
                      placeholder='Paste JSON template (e.g. {"name": "My n8n Workflow", "nodes": [...]})'
                      className="w-full p-3 bg-gray-950 text-gray-200 border border-gray-800 rounded font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Prerequisites & Takeaways */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-700">
                        Prerequisites (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={resPrereqs}
                        onChange={(e) => setResPrereqs(e.target.value)}
                        placeholder="Python 3.10+, FastAPI, Stripe Keys"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-gray-700">
                        Key Takeaways (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={resTakeaways}
                        onChange={(e) => setResTakeaways(e.target.value)}
                        placeholder="Extract raw bytes with request.body(), Return clean HTTP 400"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <label className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-xs font-mono font-semibold cursor-pointer transition-colors flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-gray-600" />
                        <span>Import .md / .mdx</span>
                        <input
                          type="file"
                          accept=".md,.mdx,.txt"
                          onChange={handleImportMdxFile}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={handleExportCurrentMdx}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-xs font-mono font-semibold transition-colors flex items-center gap-1.5"
                        title="Export tutorial as MDX with Decap CMS frontmatter"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Export .mdx</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={resetResourceForm}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-xs font-mono font-medium hover:bg-gray-200"
                      >
                        Clear Form
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-black text-white rounded text-xs font-mono font-bold hover:bg-gray-800 transition-colors uppercase tracking-wider flex items-center gap-2 shadow-sm"
                      >
                        <Plus className="w-4 h-4 text-emerald-400" />
                        <span>{resId ? 'Update Resource' : 'Publish Resource Live'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* FORM: YOUTUBE VIDEO ENTRY */}
              {itemKind === 'video' && (
                <form onSubmit={handleSaveVideoSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-mono font-bold text-gray-700">
                        Video Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={vidTitle}
                        onChange={(e) => setVidTitle(e.target.value)}
                        placeholder="e.g., Stripe Webhooks Signature Verification in FastAPI in 140 Seconds"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-gray-700">
                        YouTube Video URL or Video ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={vidYoutubeUrl}
                        onChange={(e) => setVidYoutubeUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-mono focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-gray-700">
                        Duration (MM:SS) *
                      </label>
                      <input
                        type="text"
                        required
                        value={vidDuration}
                        onChange={(e) => setVidDuration(e.target.value)}
                        placeholder="2:20"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-mono focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-gray-700">
                        Category *
                      </label>
                      <select
                        value={vidCategory}
                        onChange={(e) => setVidCategory(e.target.value as Category)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans focus:outline-none focus:border-black"
                      >
                        {CATEGORY_LIST.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-gray-700">
                        Associated Tutorial / Workflow ID (Optional)
                      </label>
                      <select
                        value={vidAssociatedResId}
                        onChange={(e) => setVidAssociatedResId(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans focus:outline-none focus:border-black"
                      >
                        <option value="">None (Standalone Video)</option>
                        {resources.map(res => (
                          <option key={res.id} value={res.id}>{res.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Tool Stack Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-gray-700">
                      Select Tool Stack Tags
                    </label>
                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {TOOL_STACK_LIST.map((tool) => {
                        const isSelected = vidToolStack.includes(tool as ToolStack);
                        return (
                          <button
                            key={tool}
                            type="button"
                            onClick={() => toggleToolStackInVideo(tool as ToolStack)}
                            className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                              isSelected
                                ? 'bg-black text-white border-black font-semibold'
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {tool} {isSelected && '✓'}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Video Description */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-gray-700">
                      Video Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={vidDescription}
                      onChange={(e) => setVidDescription(e.target.value)}
                      placeholder="High-density video summary describing what is covered in under 180 seconds..."
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-sans focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={resetVideoForm}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-xs font-mono font-medium hover:bg-gray-200"
                    >
                      Clear Form
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-red-600 text-white rounded text-xs font-mono font-bold hover:bg-red-700 transition-colors uppercase tracking-wider flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-white" />
                      <span>{vidId ? 'Update Video Entry' : 'Add Video to Catalog'}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* TAB 2: MANAGE PUBLISHED ITEMS */}
          {activeTab === 'manage' && (
            <div className="space-y-5 font-sans">
              
              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  value={manageSearch}
                  onChange={(e) => setManageSearch(e.target.value)}
                  placeholder="Filter published items by title..."
                  className="w-full max-w-md p-2 bg-gray-50 border border-gray-200 rounded text-xs"
                />
                <span className="text-xs font-mono text-gray-500">
                  Showing {resources.length} tutorials &amp; {videos.length} videos
                </span>
              </div>

              {/* Resources Table */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                  Tutorials &amp; Workflow Blueprints ({resources.length})
                </h3>

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white text-xs">
                  {resources.filter(r => !manageSearch || r.title.toLowerCase().includes(manageSearch.toLowerCase())).map((res) => (
                    <div
                      key={res.id}
                      className="p-3 border-b border-gray-100 last:border-0 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 font-mono text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-black text-white font-semibold uppercase">
                            {res.contentType}
                          </span>
                          <span className="text-gray-500">{res.category}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-emerald-700 font-semibold">{Math.floor(res.durationSeconds / 60)}m {res.durationSeconds % 60}s</span>
                        </div>
                        <h4 className="font-bold text-black text-xs leading-tight">
                          {res.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('create');
                            setItemKind('resource');
                            setResId(res.id);
                            setResTitle(res.title);
                            setResCategory(res.category);
                            setResContentType(res.contentType);
                            setResToolStack(res.toolStack || []);
                            setResDuration(res.durationSeconds || 140);
                            setResDescription(res.description);
                            setResYoutubeUrl(res.youtubeUrl || (res.youtubeId ? `https://youtube.com/watch?v=${res.youtubeId}` : ''));
                            setResArticleText(res.fullArticleText || '');
                            if (res.codeBlocks && res.codeBlocks.length > 0) {
                              setResCodeFilename(res.codeBlocks[0].filename);
                              setResCodeLanguage(res.codeBlocks[0].language);
                              setResCodeContent(res.codeBlocks[0].code);
                            }
                            setResWorkflowJson(res.workflowJson || '');
                            setResPrereqs(res.prerequisites ? res.prerequisites.join(', ') : '');
                            setResTakeaways(res.takeaways ? res.takeaways.join(', ') : '');
                          }}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-mono text-[11px] flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete resource "${res.title}"?`)) {
                              onDeleteResource(res.id);
                            }
                          }}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-mono text-[11px] flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Videos Table */}
              <div className="space-y-3 pt-3">
                <h3 className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                  YouTube Videos ({videos.length})
                </h3>

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white text-xs">
                  {videos.filter(v => !manageSearch || v.title.toLowerCase().includes(manageSearch.toLowerCase())).map((vid) => (
                    <div
                      key={vid.id}
                      className="p-3 border-b border-gray-100 last:border-0 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 font-mono text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-semibold uppercase">
                            Video ({vid.duration})
                          </span>
                          <span className="text-gray-500">{vid.category}</span>
                        </div>
                        <h4 className="font-bold text-black text-xs leading-tight">
                          {vid.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('create');
                            setItemKind('video');
                            setVidId(vid.id);
                            setVidTitle(vid.title);
                            setVidYoutubeUrl(vid.youtubeUrl || `https://youtube.com/watch?v=${vid.youtubeId}`);
                            setVidDuration(vid.duration || '2:30');
                            setVidCategory(vid.category);
                            setVidToolStack(vid.toolStack || []);
                            setVidDescription(vid.description);
                            setVidAssociatedResId(vid.associatedResourceId || '');
                          }}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-mono text-[11px] flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete video "${vid.title}"?`)) {
                              onDeleteVideo(vid.id);
                            }
                          }}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-mono text-[11px] flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: DECAP CMS & GIT SPEC */}
          {activeTab === 'decap' && (
            <div className="space-y-6 font-sans text-xs">
              
              <div className="p-5 rounded-lg bg-gray-900 text-white space-y-3 font-mono">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <FileCode2 className="w-5 h-5" />
                  <h3>Decap CMS (Git-Based CMS) Architecture for BONSAI Labs</h3>
                </div>
                <p className="text-gray-300 leading-relaxed font-sans text-xs">
                  Decap CMS allows you to manage content at <code className="text-emerald-400 bg-gray-800 px-1 py-0.5 rounded">/admin</code> using GitHub OAuth. Whenever you edit or create a tutorial in Decap, it creates a Git commit with an <code className="text-emerald-400 bg-gray-800 px-1 py-0.5 rounded">.mdx</code> file directly in your repository without requiring a database.
                </p>
                <div className="bg-gray-950 p-3 rounded border border-gray-800 text-[11px] text-gray-400 space-y-1">
                  <div>📁 repository-root/</div>
                  <div className="pl-4">├── 📁 content/tutorials/*.mdx (Tutorial markdown files)</div>
                  <div className="pl-4">├── 📁 content/videos/*.json (Video catalog files)</div>
                  <div className="pl-4">└── 📁 public/admin/config.yml (Decap CMS schema configuration)</div>
                </div>
              </div>

              {/* Decap config.yml Generator */}
              <div className="p-5 rounded-lg bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono font-bold text-black text-xs uppercase">
                    📄 Generated Decap CMS config.yml
                  </h3>
                  <button
                    onClick={() => {
                      const decapConfig = `backend:
  name: github
  repo: your-github-user/bonsai-labs
  branch: main

media_folder: "public/images"
public_folder: "/images"

collections:
  - name: "tutorials"
    label: "Tutorials & Blueprints"
    folder: "content/tutorials"
    create: true
    slug: "{{slug}}"
    extension: "mdx"
    format: "yaml-frontmatter"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Slug", name: "slug", widget: "string" }
      - { label: "Category", name: "category", widget: "select", options: ["API & Webhooks", "Automation & n8n", "AI & LLMs", "DevOps & Docker", "Backend & Databases", "Auth & Security"] }
      - { label: "Content Type", name: "contentType", widget: "select", options: ["tutorial", "workflow", "snippet", "guide"] }
      - { label: "Duration in Seconds", name: "durationSeconds", widget: "number", value_type: "int", default: 140 }
      - { label: "YouTube URL", name: "youtubeUrl", widget: "string", required: false }
      - { label: "Tool Stack Tags", name: "toolStack", widget: "list" }
      - { label: "Body Article", name: "body", widget: "markdown" }
`;
                      const blob = new Blob([decapConfig], { type: 'text/yaml' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'config.yml';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white rounded font-mono text-[11px] font-bold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Download config.yml</span>
                  </button>
                </div>

                <div className="bg-gray-950 text-gray-200 p-3 rounded font-mono text-[11px] overflow-x-auto max-h-48 border border-gray-800">
                  <pre><code>{`backend:
  name: github
  repo: owner/bonsailabs
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "tutorials"
    label: "Tutorials & Blueprints"
    folder: "content/tutorials"
    create: true
    slug: "{{slug}}"
    extension: "mdx"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Category", name: "category", widget: "select" }
      - { label: "YouTube URL", name: "youtubeUrl", widget: "string" }
      - { label: "Article Body", name: "body", widget: "markdown" }`}</code></pre>
                </div>
              </div>

              {/* Batch MDX Exporter */}
              <div className="p-5 rounded-lg bg-gray-50 border border-gray-200 space-y-3">
                <h3 className="font-mono font-bold text-black text-xs uppercase">
                  ⚡ Batch Export All ({resources.length}) Tutorials as Individual .mdx Files
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Download every tutorial currently live in your catalog as individual Decap-compatible <code className="font-mono text-black">.mdx</code> files with full YAML frontmatter.
                </p>
                <button
                  onClick={() => {
                    resources.forEach(res => {
                      const mdxContent = `---
title: "${res.title.replace(/"/g, '\\"')}"
slug: "${res.slug}"
category: "${res.category}"
contentType: "${res.contentType}"
durationSeconds: ${res.durationSeconds}
youtubeUrl: "${res.youtubeUrl || ''}"
toolStack:
${res.toolStack.map(t => `  - "${t}"`).join('\n')}
publishedDate: "${res.publishedDate}"
---

# ${res.title}

${res.description}

${res.fullArticleText || ''}
`;
                      const blob = new Blob([mdxContent], { type: 'text/markdown' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${res.slug}.mdx`;
                      a.click();
                      URL.revokeObjectURL(url);
                    });
                    setSuccessMsg(`✅ Exported ${resources.length} .mdx files!`);
                    setTimeout(() => setSuccessMsg(''), 3000);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-mono text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download All {resources.length} Tutorials (.mdx)</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 4: BACKUP & SYNC */}
          {activeTab === 'backup' && (
            <div className="space-y-6 font-sans text-xs">
              
              <div className="p-5 rounded-lg bg-gray-50 border border-gray-200 space-y-3">
                <h3 className="font-mono font-bold text-black text-sm uppercase">
                  📦 Export Full Library (JSON Backup)
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Download a single `.json` backup file containing all your custom published tutorials, code blocks, workflow JSONs, and video entries.
                </p>
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="px-4 py-2.5 bg-black text-white rounded font-mono text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download Library Backup (.json)</span>
                </button>
              </div>

              <div className="p-5 rounded-lg bg-gray-50 border border-gray-200 space-y-3">
                <h3 className="font-mono font-bold text-black text-sm uppercase">
                  📥 Import Library Backup
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Restore or sync content across devices by uploading a previously exported `bonsai_library_backup.json` file.
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded text-black font-mono text-xs font-bold cursor-pointer hover:bg-gray-100 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Select JSON File to Restore</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackupFile}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="p-5 rounded-lg bg-red-50 border border-red-200 space-y-3 text-red-900">
                <h3 className="font-mono font-bold text-red-900 text-sm uppercase">
                  ⚠️ Reset to Original Seed Library
                </h3>
                <p className="text-red-700 leading-relaxed">
                  Clear custom local browser storage and restore the default curated demo tutorials and videos.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all content to seed defaults?')) {
                      onResetToSeedData();
                      setSuccessMsg('Restored seed demo content!');
                      setTimeout(() => setSuccessMsg(''), 3000);
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded font-mono text-xs font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset to Default Demo Library</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-100 border-t border-gray-200 flex items-center justify-between text-xs font-mono shrink-0">
          <span className="text-gray-500">Changes take effect immediately on live site</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded font-sans font-medium hover:bg-gray-800 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
