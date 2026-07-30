import React from 'react';
import { Logo } from './Logo';
import { LegalModalType, ViewTab } from '../types';
import { Github, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: LegalModalType) => void;
  onSelectTab: (tab: ViewTab) => void;
  onOpenAdmin?: () => void;
}

const XIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YouTubeIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      fill="#FF0000"
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
    />
    <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onSelectTab, onOpenAdmin }) => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 font-sans text-xs pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* PROMINENT SOCIAL MEDIA SECTION */}
        <div className="bg-gray-950 text-white rounded-2xl p-8 md:p-10 text-center space-y-6 border border-gray-800 shadow-xl">
          <div className="space-y-2">
            <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Find BONSAI Labs on
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed">
              Join our growing community of developers across all official social media channels.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 max-w-3xl mx-auto font-sans">
            {/* YouTube */}
            <a
              href="https://youtube.com/@BONSAILabsIN"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 hover:bg-gray-800/90 transition-all group"
            >
              <YouTubeIcon className="w-8 h-8 mb-2.5 group-hover:scale-110 transition-transform" />
              <span className="font-sans font-bold text-xs sm:text-sm text-gray-200 group-hover:text-white">YouTube</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/BONSAILabsIN"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 hover:bg-gray-800/90 transition-all group"
            >
              <Instagram className="w-8 h-8 text-pink-500 mb-2.5 group-hover:scale-110 transition-transform" />
              <span className="font-sans font-bold text-xs sm:text-sm text-gray-200 group-hover:text-white">Instagram</span>
            </a>

            {/* X (Formerly Twitter) */}
            <a
              href="https://x.com/BONSAILabsIN"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 hover:bg-gray-800/90 transition-all group"
            >
              <XIcon className="w-8 h-8 text-white mb-2.5 group-hover:scale-110 transition-transform" />
              <span className="font-sans font-bold text-xs sm:text-sm text-gray-200 group-hover:text-white">X</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/BONSAILabsIN"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 hover:bg-gray-800/90 transition-all group"
            >
              <Github className="w-8 h-8 text-emerald-400 mb-2.5 group-hover:scale-110 transition-transform" />
              <span className="font-sans font-bold text-xs sm:text-sm text-gray-200 group-hover:text-white">GitHub</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4 font-sans">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <button onClick={() => onSelectTab('home')} className="text-left focus:outline-none">
              <Logo variant="full" subtext={true} />
            </button>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed pt-1 font-sans">
              Zero fluff. Pure execution. Short, step-by-step tutorials solving software, API, and automation bottlenecks in under 180 seconds.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-sans font-bold text-black text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-600 font-sans">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-black transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('resources')} className="hover:text-black transition-colors">
                  Tutorials &amp; Workflow Templates
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('videos')} className="hover:text-black transition-colors">
                  Popular 180s Videos
                </button>
              </li>
              <li className="pt-1">
                <button 
                  onClick={() => onOpenAdmin ? onOpenAdmin() : (window.location.href = '/admin')} 
                  className="px-2 py-0.5 rounded bg-gray-900 text-emerald-400 font-mono text-[11px] font-semibold hover:bg-black transition-colors inline-flex items-center gap-1"
                >
                  <span>🔒 Owner Publishing Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Policies */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-sans font-bold text-black text-xs uppercase tracking-wider">
              Legal &amp; Policies
            </h4>
            <div className="flex flex-col space-y-1.5 text-xs font-sans text-gray-600">
              <button
                onClick={() => onOpenLegal('terms')}
                className="hover:text-black text-left"
              >
                Terms of Service
              </button>
              <button
                onClick={() => onOpenLegal('privacy')}
                className="hover:text-black text-left"
              >
                Privacy Policy
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} <strong>BONSAI Labs</strong> — The zero-fluff B2B technical encyclopedia. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built for execution</span>
            <span>⚡</span>
            <span>Under 180s</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

