import React, { useState } from 'react';
import { VideoItem } from '../types';
import { Play, Eye, Clock, Search, ArrowRight } from 'lucide-react';

interface VideoLibraryProps {
  videos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  onSelectResourceById: (id: string) => void;
}

export const VideoLibrary: React.FC<VideoLibraryProps> = ({
  videos,
  onSelectVideo,
  onSelectResourceById
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'API & Webhooks', 'Automation & n8n', 'DevOps & Docker', 'Backend & Databases', 'Auth & Security'];

  const filteredVideos = videos.filter(v => {
    const matchesSearch = !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || v.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-mono text-gray-800">
            <Play className="w-3.5 h-3.5 text-red-600 fill-current" />
            <span>Under 180 Seconds Video Catalog</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
                Short, Step-by-Step Technical Tutorials
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-1">
                Watch our YouTube videos resolving API, automation, and DevOps bottlenecks. Every video is accompanied by ready-to-copy code and workflow JSON templates.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search video tutorials by tool, API, or bottleneck..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded text-xs font-sans placeholder-gray-400 focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors border ${
                  selectedCat === cat
                    ? 'bg-black text-white border-black font-semibold'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-black transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div 
                  onClick={() => onSelectVideo(video)}
                  className="relative aspect-video bg-gray-900 cursor-pointer overflow-hidden group-hover:opacity-95 transition-opacity"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{video.duration}</span>
                  </div>

                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white text-black text-[10px] font-mono font-semibold">
                    {video.category}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current text-black ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-gray-400" />
                      {video.views} views
                    </span>
                    <span>{video.publishedAt}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectVideo(video)}
                    className="font-bold text-base text-black group-hover:text-gray-600 cursor-pointer transition-colors leading-snug"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {video.toolStack.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 text-[10px] font-mono bg-gray-100 text-gray-700 rounded border border-gray-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onSelectVideo(video)}
                    className="text-black font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Watch video</span>
                    <Play className="w-3 h-3 fill-current" />
                  </button>

                  {video.associatedResourceId && (
                    <button
                      onClick={() => onSelectResourceById(video.associatedResourceId!)}
                      className="text-gray-600 hover:text-black font-mono text-xs flex items-center gap-1"
                    >
                      <span>Workflow &amp; Code</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
