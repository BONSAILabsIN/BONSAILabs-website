import React from 'react';
import { ResourceItem } from '../types';
import { BookOpen, Copy, Clock, ArrowRight, Check } from 'lucide-react';

interface PopularResourcesProps {
  resources: ResourceItem[];
  onSelectResource: (resource: ResourceItem) => void;
  onViewAllResources: () => void;
}

export const PopularResources: React.FC<PopularResourcesProps> = ({
  resources,
  onSelectResource,
  onViewAllResources
}) => {
  const featuredOnly = resources.filter(r => r.isFeatured || r.isPopular).slice(0, 3);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleQuickCopySnippet = (e: React.MouseEvent, resource: ResourceItem) => {
    e.stopPropagation();
    let textToCopy = '';
    if (resource.codeBlocks && resource.codeBlocks.length > 0) {
      textToCopy = resource.codeBlocks[0].code;
    } else if (resource.workflowJson) {
      textToCopy = resource.workflowJson;
    }
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedId(resource.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section className="py-16 md:py-20 border-b border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-mono text-gray-800 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-black" />
              <span>FEATURED TUTORIAL WRITE-UPS &amp; TEMPLATES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black">
              Check out my most popular resources
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              Production-tested workflow templates, code snippets, and architecture step-by-step guides.
            </p>
          </div>

          <button
            onClick={onViewAllResources}
            className="inline-flex items-center gap-2 text-xs font-semibold text-black hover:text-gray-600 uppercase tracking-wider font-mono shrink-0"
          >
            <span>Explore full library</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Popular Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredOnly.map((resource) => (
            <div
              key={resource.id}
              onClick={() => onSelectResource(resource)}
              className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-black transition-all cursor-pointer shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Header Badge Row */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-black text-white font-semibold uppercase text-[10px]">
                    {resource.contentType}
                  </span>

                  <span className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{Math.floor(resource.durationSeconds / 60)}m {resource.durationSeconds % 60}s</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-black group-hover:text-gray-600 transition-colors leading-snug">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {resource.description}
                </p>

                {/* Tool Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {resource.toolStack.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 text-[10px] font-mono bg-gray-50 text-gray-700 rounded border border-gray-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Actions Row */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-black font-semibold group-hover:underline">
                  <span>Read Article &amp; Code</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>

                <button
                  type="button"
                  onClick={(e) => handleQuickCopySnippet(e, resource)}
                  className="px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 text-[11px] font-mono flex items-center gap-1 transition-colors"
                  title="Copy snippet directly"
                >
                  {copiedId === resource.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
