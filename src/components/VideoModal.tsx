import React from 'react';
import { VideoItem, ResourceItem } from '../types';
import { X, Play, Clock, Eye, Copy, Check, ArrowRight, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
  onOpenResourceById?: (id: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  onClose,
  onOpenResourceById
}) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-3xl w-full overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-600">
            <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-bold">
              {video.duration} (&lt;180s)
            </span>
            <span>{video.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Embed Simulator */}
        <div className="relative aspect-video bg-neutral-950 w-full overflow-hidden">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-neutral-400" />
              {video.views} views
            </span>
            <span>Published {video.publishedAt}</span>
          </div>

          <h3 className="text-xl font-bold text-neutral-900 leading-snug">
            {video.title}
          </h3>

          <p className="text-sm text-neutral-600 leading-relaxed">
            {video.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {video.toolStack.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 text-xs font-mono bg-neutral-100 text-neutral-800 rounded border border-neutral-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 underline"
          >
            <span>Open on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {video.associatedResourceId && onOpenResourceById && (
            <button
              onClick={() => {
                onClose();
                onOpenResourceById(video.associatedResourceId!);
              }}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg flex items-center gap-1.5 transition-colors font-sans text-xs font-medium"
            >
              <span>Get Workflow JSON &amp; Code Snippet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
