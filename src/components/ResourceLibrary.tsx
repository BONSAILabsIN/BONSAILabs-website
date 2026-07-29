import React, { useState, useMemo } from 'react';
import { ResourceItem, ToolStack } from '../types';
import { CATEGORY_LIST, TOOL_STACK_LIST } from '../data/mockData';
import { Search, Filter, BookOpen, Clock, Copy, Star, Check, X, ArrowUpRight } from 'lucide-react';

interface ResourceLibraryProps {
  resources: ResourceItem[];
  onSelectResource: (resource: ResourceItem) => void;
  initialSearchQuery?: string;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const ResourceLibrary: React.FC<ResourceLibraryProps> = ({
  resources,
  onSelectResource,
  initialSearchQuery = '',
  savedIds,
  onToggleSave
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedContentType, setSelectedContentType] = useState<string>('All');
  const [selectedToolStack, setSelectedToolStack] = useState<string[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'fastest'>('popular');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const toggleToolStackFilter = (tool: string) => {
    if (selectedToolStack.includes(tool)) {
      setSelectedToolStack(selectedToolStack.filter(t => t !== tool));
    } else {
      setSelectedToolStack([...selectedToolStack, tool]);
    }
  };

  const handleQuickCopy = (e: React.MouseEvent, resource: ResourceItem) => {
    e.stopPropagation();
    let text = '';
    if (resource.codeBlocks && resource.codeBlocks.length > 0) {
      text = resource.codeBlocks[0].code;
    } else if (resource.workflowJson) {
      text = resource.workflowJson;
    }
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedId(resource.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.toolStack.some((t) => t.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesContentType =
        selectedContentType === 'All' || item.contentType === selectedContentType.toLowerCase().replace('templates', '').trim();

      const matchesToolStack =
        selectedToolStack.length === 0 ||
        selectedToolStack.every((tool) => item.toolStack.includes(tool as ToolStack));

      const matchesSaved = !onlySaved || savedIds.includes(item.id);

      return matchesSearch && matchesCategory && matchesContentType && matchesToolStack && matchesSaved;
    }).sort((a, b) => {
      if (sortBy === 'popular') return (b.viewsCount || 0) - (a.viewsCount || 0);
      if (sortBy === 'newest') return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      if (sortBy === 'fastest') return a.durationSeconds - b.durationSeconds;
      return 0;
    });
  }, [resources, searchQuery, selectedCategory, selectedContentType, selectedToolStack, onlySaved, savedIds, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedContentType('All');
    setSelectedToolStack([]);
    setOnlySaved(false);
  };

  return (
    <section id="library" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-mono text-gray-800">
            <span>bonsailabs.in/resources</span>
            <span className="text-gray-400">•</span>
            <span className="font-semibold">{filteredResources.length} Blueprints Available</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
                Tutorials &amp; Workflow Templates Library
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-1">
                Searchable, copy-paste ready technical encyclopedia solving API, automation, and software bottlenecks in under 180 seconds.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Main Filter Controls Bar */}
        <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 space-y-4">
          
          {/* Search input + Sort + Bookmarks toggle */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 w-4 h-4 text-gray-400 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, or tool (e.g. Stripe, n8n)..."
                className="w-full pl-10 pr-10 py-2.5 bg-white text-black border border-gray-200 rounded text-xs font-sans placeholder-gray-400 focus:outline-none focus:border-black transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 p-1 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 font-mono text-xs">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 bg-white border border-gray-200 rounded text-gray-800 font-mono focus:outline-none focus:border-black text-xs"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="newest">Sort: Newest First</option>
                <option value="fastest">Sort: Fastest (&lt;180s)</option>
              </select>

              <button
                onClick={() => setOnlySaved(!onlySaved)}
                className={`px-3 py-2.5 rounded border text-xs flex items-center gap-1.5 transition-colors ${
                  onlySaved
                    ? 'bg-amber-500 text-white border-amber-600 font-semibold'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${onlySaved ? 'fill-current' : ''}`} />
                <span>Saved ({savedIds.length})</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-black text-white border-black font-semibold'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tool Stack Filter Chips */}
          <div className="pt-2 border-t border-gray-200 flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <span className="text-gray-500 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Tool Stack:
            </span>
            {TOOL_STACK_LIST.map((tool) => {
              const active = selectedToolStack.includes(tool);
              return (
                <button
                  key={tool}
                  onClick={() => toggleToolStackFilter(tool)}
                  className={`px-2.5 py-1 rounded text-[11px] transition-colors border ${
                    active
                      ? 'bg-gray-900 text-white border-gray-900 font-semibold'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {tool} {active && '✕'}
                </button>
              );
            })}

            {(searchQuery || selectedCategory !== 'All' || selectedToolStack.length > 0 || onlySaved) && (
              <button
                onClick={clearAllFilters}
                className="ml-auto text-gray-500 hover:text-black underline text-[11px]"
              >
                Reset filters
              </button>
            )}
          </div>

        </div>

        {/* Results Cards Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const isSaved = savedIds.includes(resource.id);
              return (
                <div
                  key={resource.id}
                  onClick={() => onSelectResource(resource)}
                  className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-black transition-all cursor-pointer shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    
                    {/* Card Top Meta */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded bg-black text-white uppercase font-semibold text-[10px]">
                        {resource.contentType}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{Math.floor(resource.durationSeconds / 60)}m {resource.durationSeconds % 60}s</span>
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(resource.id);
                          }}
                          className="p-1 text-gray-400 hover:text-amber-500 transition-colors"
                          title={isSaved ? 'Remove bookmark' : 'Bookmark resource'}
                        >
                          <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base text-black group-hover:text-gray-600 transition-colors leading-snug">
                      {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {resource.description}
                    </p>

                    {/* Tool Stack Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
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

                  {/* Card Footer Actions */}
                  <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-black group-hover:underline flex items-center gap-1">
                      <span>Read Article &amp; Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleQuickCopy(e, resource)}
                      className="px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 text-[11px] font-mono flex items-center gap-1 transition-colors"
                    >
                      {copiedId === resource.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
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
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
            <BookOpen className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-lg font-bold text-black">No resources found matching your search</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your topic filter or clearing your search term to view all 180-second blueprints.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-black text-white rounded text-xs font-mono font-medium hover:bg-gray-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
