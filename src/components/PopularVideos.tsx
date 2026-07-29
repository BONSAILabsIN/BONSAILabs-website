import React from 'react';
import { VideoItem } from '../types';
import { Play, Eye, Clock, ArrowRight } from 'lucide-react';

interface PopularVideosProps {
  videos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  onSelectResourceById: (id: string) => void;
  onViewAllVideos: () => void;
}

export const PopularVideos: React.FC<PopularVideosProps> = ({
  videos,
  onSelectVideo,
  onSelectResourceById,
  onViewAllVideos
}) => {
  const popularOnly = videos.filter(v => v.isPopular).slice(0, 4);

  return (
    <section className="py-16 md:py-20 border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-mono text-gray-800 mb-3">
              <Play className="w-3 h-3 text-red-600 fill-current" />
              <span>YOUTUBE CHANNEL TUTORIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black">
              Watch my most popular videos
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              Every video is engineered under 180 seconds. Zero fluff, pure execution.
            </p>
          </div>

          <button
            onClick={onViewAllVideos}
            className="inline-flex items-center gap-2 text-xs font-semibold text-black hover:text-gray-600 uppercase tracking-wider font-mono shrink-0"
          >
            <span>View all 180s videos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularOnly.map((video) => (
            <div
              key={video.id}
              className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-black transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Container */}
                <div 
                  onClick={() => onSelectVideo(video)}
                  className="relative aspect-video bg-gray-900 cursor-pointer overflow-hidden group-hover:opacity-95 transition-opacity"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  
                  {/* Runtime badge (< 180s) */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-medium flex items-center gap-1 border border-white/10">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Category tag top left */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white text-black text-[10px] font-mono font-semibold">
                    {video.category}
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current text-black ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-gray-400" />
                      {video.views} views
                    </span>
                    <span>{video.publishedAt}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectVideo(video)}
                    className="font-bold text-sm text-black line-clamp-2 hover:text-gray-600 cursor-pointer transition-colors leading-snug"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Tool Stack Tags & Actions */}
              <div className="p-4 pt-0 space-y-3">
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

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
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
                      className="text-gray-500 hover:text-black font-mono text-[11px] flex items-center gap-1"
                    >
                      <span>Code &amp; Workflow</span>
                      <ArrowRight className="w-3 h-3" />
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
