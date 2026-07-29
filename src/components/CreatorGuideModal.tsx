import React, { useState } from 'react';
import { X, Code2, Youtube, Copy, Check, FileText, Sparkles, Plus, BookOpen } from 'lucide-react';
import { Category, ContentType, ToolStack } from '../types';

interface CreatorGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorGuideModal: React.FC<CreatorGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'howItWorks' | 'composer'>('howItWorks');

  // Generator form state
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [category, setCategory] = useState<Category>('API & Webhooks');
  const [contentType, setContentType] = useState<ContentType>('tutorial');
  const [toolStackInput, setToolStackInput] = useState('FastAPI, Python, Stripe');
  const [description, setDescription] = useState('');
  const [articleText, setArticleText] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  // Extract youtubeId from URL helper
  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : 'dQw4w9WgXcQ';
  };

  const parsedToolStack = toolStackInput.split(',').map(s => s.trim()).filter(Boolean);

  const generatedTsObject = `{
  id: 'res-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24) || 'custom-post'}',
  title: '${title || 'My New 180s Tutorial Title'}',
  slug: '${title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'my-new-tutorial'}',
  description: '${description || 'A concise 180-second write-up resolving developer bottlenecks.'}',
  contentType: '${contentType}',
  category: '${category}',
  toolStack: ${JSON.stringify(parsedToolStack)},
  durationSeconds: 165,
  viewsCount: 1,
  publishedDate: '${new Date().toISOString().split('T')[0]}',
  isPopular: true,
  isFeatured: true,
  ${youtubeUrl ? `youtubeId: '${getYoutubeId(youtubeUrl)}',` : ''}
  ${youtubeUrl ? `youtubeUrl: '${youtubeUrl}',` : ''}
  fullArticleText: \`${articleText || 'Step 1: Introduction\\nExplain the problem and root cause.\\n\\nStep 2: Execution\\nApply the solution with direct code.'}\`,
  codeBlocks: [
    {
      filename: 'example.ts',
      language: 'typescript',
      code: \`${codeSnippet || '// Paste your snippet here'}\`
    }
  ]
}`;

  const handleCopyObject = () => {
    navigator.clipboard.writeText(generatedTsObject);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-3xl w-full overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-900">
            <Code2 className="w-4 h-4 text-neutral-900" />
            <span>BONSAI Labs Creator Guide &amp; Content Manager</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-neutral-200 bg-neutral-100/50 text-xs font-mono shrink-0">
          <button
            onClick={() => setActiveTab('howItWorks')}
            className={`flex-1 py-2.5 px-4 text-center font-medium border-b-2 transition-colors ${
              activeTab === 'howItWorks'
                ? 'border-neutral-900 bg-white text-neutral-900 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            1. How to Add Content (No Login Needed)
          </button>
          <button
            onClick={() => setActiveTab('composer')}
            className={`flex-1 py-2.5 px-4 text-center font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'composer'
                ? 'border-neutral-900 bg-white text-neutral-900 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>2. Interactive Tutorial Generator</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-neutral-700 font-sans">
          
          {activeTab === 'howItWorks' ? (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <h3 className="font-bold text-neutral-900 text-base">
                  How content management works on bonsailabs.in
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  Because this site is built for high speed, zero fluff, and static deployment, it uses a <strong>Content-as-Code (Git-based)</strong> architecture. You do not need an admin login or external database.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 font-mono font-bold text-neutral-900 text-xs">
                    <BookOpen className="w-4 h-4 text-neutral-900" />
                    <span>Adding Blog Posts &amp; Code</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Open <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-900 font-mono">src/data/mockData.ts</code> in your code editor or GitHub repo. Add an item object into the <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono">ALL_RESOURCES</code> array containing your title, writeup, code snippet, and category.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-2">
                  <div className="flex items-center gap-2 font-mono font-bold text-neutral-900 text-xs">
                    <Youtube className="w-4 h-4 text-red-600" />
                    <span>Linking YouTube Videos</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    When you upload a 180s YouTube video, copy its video ID (e.g., <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono">dQw4w9WgXcQ</code>). Add it to <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono">POPULAR_VIDEOS</code> or set <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono">youtubeId</code> on a resource item!
                  </p>
                </div>

              </div>

              <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Quick 3-Step Workflow for Creator</span>
                </div>
                <ol className="space-y-2 text-neutral-300 font-sans text-xs list-decimal pl-4">
                  <li>Use Tab 2 above ("Interactive Tutorial Generator") to draft your tutorial title, writeup, code, and YouTube link.</li>
                  <li>Click <strong>"Copy TS Object"</strong> to copy the ready code block.</li>
                  <li>Paste it into <code className="text-white font-mono">src/data/mockData.ts</code> and commit/push to GitHub!</li>
                </ol>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-neutral-500">
                Draft a new tutorial or video write-up below. Copy the generated TypeScript object directly into <code className="font-mono text-neutral-900">src/data/mockData.ts</code>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-mono font-semibold text-neutral-700 mb-1">Tutorial Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Stripe Webhooks in FastAPI"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block font-mono font-semibold text-neutral-700 mb-1">YouTube Video URL (Optional)</label>
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block font-mono font-semibold text-neutral-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
                  >
                    <option value="API & Webhooks">API &amp; Webhooks</option>
                    <option value="Automation & n8n">Automation &amp; n8n</option>
                    <option value="AI & LLMs">AI &amp; LLMs</option>
                    <option value="DevOps & Docker">DevOps &amp; Docker</option>
                    <option value="Backend & Databases">Backend &amp; Databases</option>
                    <option value="Auth & Security">Auth &amp; Security</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono font-semibold text-neutral-700 mb-1">Tool Stack (Comma Separated)</label>
                  <input
                    type="text"
                    value={toolStackInput}
                    onChange={(e) => setToolStackInput(e.target.value)}
                    placeholder="FastAPI, Python, Stripe"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono font-semibold text-neutral-700 mb-1 text-xs">Short Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Concise 1-sentence summary of the bottleneck & solution"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold text-neutral-700 mb-1 text-xs">Blog Article Write-Up Text</label>
                <textarea
                  rows={3}
                  value={articleText}
                  onChange={(e) => setArticleText(e.target.value)}
                  placeholder="Write step-by-step resolution paragraphs..."
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block font-mono font-semibold text-neutral-700 mb-1 text-xs">Code Snippet</label>
                <textarea
                  rows={3}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="Paste Python, TypeScript, SQL, or Dockerfile snippet..."
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono focus:outline-none focus:border-neutral-900"
                />
              </div>

              {/* Preview Code Box */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-neutral-900">Generated TS Object:</span>
                  <button
                    onClick={handleCopyObject}
                    className="px-3 py-1 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied Object!' : 'Copy TS Object'}</span>
                  </button>
                </div>

                <div className="bg-neutral-950 text-neutral-200 rounded-xl p-3.5 font-mono text-[11px] max-h-48 overflow-y-auto border border-neutral-800">
                  <pre><code>{generatedTsObject}</code></pre>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs font-mono shrink-0">
          <span className="text-neutral-500">BONSAI Labs • Content-as-Code</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-sans font-medium"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
