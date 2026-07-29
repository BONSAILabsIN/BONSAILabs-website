import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ResourceItem } from '../types';
import { X, Copy, Check, Download, Clock, Star, FileCode2, CheckCircle2, Network, BookOpen, ExternalLink } from 'lucide-react';

interface ResourceModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  resource,
  onClose,
  isSaved,
  onToggleSave
}) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  if (!resource) return null;

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleCopyWorkflowJson = () => {
    if (resource.workflowJson) {
      navigator.clipboard.writeText(resource.workflowJson);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  const handleDownloadWorkflowJson = () => {
    if (!resource.workflowJson) return;
    const blob = new Blob([resource.workflowJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.slug}-n8n-workflow.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xl max-w-4xl w-full overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/80 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-0.5 rounded bg-black text-white font-semibold text-[10px] uppercase">
              {resource.contentType}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{resource.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(resource.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved ? 'bg-amber-50 border-amber-300 text-amber-600' : 'bg-white border-gray-200 text-gray-500 hover:text-black'
              }`}
              title={isSaved ? 'Bookmarked' : 'Bookmark resource'}
            >
              <Star className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto font-sans">
          
          {/* Article Header & Duration */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-500">
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>⏱ {Math.floor(resource.durationSeconds / 60)}m {resource.durationSeconds % 60}s Read &amp; Execute</span>
              </span>
              <span>Published {resource.publishedDate}</span>
              <span>•</span>
              <span>bonsailabs.in</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-black leading-snug">
              {resource.title}
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {resource.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {resource.toolStack.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 text-xs font-mono bg-gray-100 text-gray-800 rounded border border-gray-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* YouTube Video Link / Embed if present */}
          {resource.youtubeId && (
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
                180-Second Video Walkthrough
              </h3>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-gray-200 shadow-inner">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${resource.youtubeId}`}
                  title={resource.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Full Article Text / Blog Write-up */}
          {resource.fullArticleText && (
            <div className="space-y-3 p-5 rounded-lg bg-gray-50/80 border border-gray-200 text-xs sm:text-sm text-gray-800 leading-relaxed">
              <h3 className="text-xs font-mono font-bold text-black uppercase tracking-wider border-b border-gray-200 pb-2 flex items-center justify-between">
                <span>Technical Write-Up &amp; Resolution Analysis</span>
                <span className="text-[10px] text-gray-500 font-normal">MDX / Markdown Rendered</span>
              </h3>
              <div className="prose prose-sm max-w-none space-y-2 text-gray-800">
                <ReactMarkdown>{resource.fullArticleText}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Architecture / Flow Diagram Box */}
          <div className="p-4 rounded-lg bg-white border border-gray-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-black uppercase tracking-wider border-b border-gray-100 pb-2">
              <span className="flex items-center gap-1.5">
                <Network className="w-4 h-4 text-black" />
                <span>System Architecture Blueprint</span>
              </span>
              <span className="text-gray-400 text-[10px]">Zero Fluff</span>
            </div>

            <div className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded border border-gray-200 text-center font-mono text-xs text-black">
              <div className="flex-1 p-2 bg-white rounded border border-gray-200 font-bold">
                Client / Webhook Event
              </div>
              <div className="text-gray-400 font-bold">➔</div>
              <div className="flex-1 p-2 bg-emerald-50 text-emerald-800 rounded border border-emerald-300 font-bold">
                Raw Byte Stream Verification
              </div>
              <div className="text-gray-400 font-bold">➔</div>
              <div className="flex-1 p-2 bg-white rounded border border-gray-200 font-bold">
                Target Backend Service
              </div>
            </div>
          </div>

          {/* Prerequisites & Takeaways */}
          {(resource.prerequisites || resource.takeaways) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resource.prerequisites && (
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-2 text-xs">
                  <h4 className="font-mono font-bold text-black uppercase">Prerequisites</h4>
                  <ul className="space-y-1 text-gray-600">
                    {resource.prerequisites.map((req, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {resource.takeaways && (
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-2 text-xs">
                  <h4 className="font-mono font-bold text-black uppercase">Key Takeaways</h4>
                  <ul className="space-y-1 text-gray-600">
                    {resource.takeaways.map((take, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{take}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Step-by-Step Execution Plan */}
          {resource.steps && resource.steps.length > 0 && (
            <div className="space-y-5">
              <h3 className="text-xs font-mono font-bold text-black uppercase tracking-wider border-b border-gray-200 pb-2">
                Step-by-Step Execution Plan
              </h3>

              <div className="space-y-5">
                {resource.steps.map((step) => (
                  <div key={step.stepNumber} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-mono text-xs flex items-center justify-center font-bold shrink-0">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-bold text-sm text-black">
                        {step.title}
                      </h4>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed pl-8">
                      {step.description}
                    </p>

                    {step.codeSnippet && (
                      <div className="pl-8 pt-1">
                        <div className="bg-gray-950 text-gray-200 rounded-lg p-3 font-mono text-xs border border-gray-800 overflow-x-auto">
                          <pre><code>{step.codeSnippet}</code></pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Code Blocks */}
          {resource.codeBlocks && resource.codeBlocks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-black uppercase tracking-wider border-b border-gray-200 pb-2">
                Production Code Snippets
              </h3>

              {resource.codeBlocks.map((block, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden border border-gray-800 bg-gray-950 text-gray-100 font-mono text-xs">
                  
                  {/* File Header Bar */}
                  <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-300 font-mono text-xs">
                      <FileCode2 className="w-4 h-4 text-emerald-400" />
                      <span>{block.filename}</span>
                    </div>

                    <button
                      onClick={() => handleCopyCode(block.code, idx)}
                      className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 text-[11px] font-mono flex items-center gap-1 transition-colors"
                    >
                      {copiedCodeIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied Code</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Body */}
                  <div className="p-4 overflow-x-auto">
                    <pre><code>{block.code}</code></pre>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Downloadable / Copyable Workflow JSON */}
          {resource.workflowJson && (
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2">
                <h3 className="text-xs font-mono font-bold text-black uppercase tracking-wider">
                  n8n / Automation Workflow JSON
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyWorkflowJson}
                    className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied JSON!' : 'Copy Workflow JSON'}</span>
                  </button>

                  <button
                    onClick={handleDownloadWorkflowJson}
                    className="px-3 py-1.5 rounded bg-black hover:bg-gray-800 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .json</span>
                  </button>
                </div>
              </div>

              <div className="bg-gray-950 text-gray-300 rounded-lg p-4 font-mono text-[11px] border border-gray-800 overflow-x-auto max-h-60">
                <pre><code>{resource.workflowJson}</code></pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs font-mono shrink-0">
          <span className="text-gray-500">bonsailabs.in • Zero-fluff execution</span>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded font-sans font-medium text-xs hover:bg-gray-800 transition-colors"
          >
            Close Reader
          </button>
        </div>

      </div>
    </div>
  );
};
