import React from 'react';
import { Logo } from './Logo';
import { LegalModalType, ViewTab } from '../types';
import { Youtube, Github, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: LegalModalType) => void;
  onSelectTab: (tab: ViewTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onSelectTab }) => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 font-sans text-xs pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <button onClick={() => onSelectTab('home')} className="text-left focus:outline-none">
              <Logo variant="full" subtext={true} />
            </button>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed pt-1">
              Zero fluff. Pure execution. Short, step-by-step tutorials solving software, API, and automation bottlenecks in under 180 seconds.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-mono font-bold text-black text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-600">
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
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-black transition-colors">
                  About BONSAI Labs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Social Media Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono font-bold text-black text-xs uppercase tracking-wider">
              Legal &amp; Social Media
            </h4>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://youtube.com/@BONSAILabsIN"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
                title="YouTube Channel (@BONSAILabsIN)"
              >
                <Youtube className="w-4 h-4 text-red-600 fill-current" />
              </a>

              <a
                href="https://instagram.com/BONSAILabsIN"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
                title="Instagram (@BONSAILabsIN)"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
              </a>

              <a
                href="https://x.com/BONSAILabsIN"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
                title="X / Twitter (@BONSAILabsIN)"
              >
                <Twitter className="w-4 h-4 text-black" />
              </a>

              <a
                href="https://github.com/BONSAILabsIN"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
                title="GitHub (@BONSAILabsIN)"
              >
                <Github className="w-4 h-4 text-black" />
              </a>
            </div>

            {/* Legal buttons */}
            <div className="flex items-center gap-3 text-xs font-mono text-gray-500 pt-1">
              <button
                onClick={() => onOpenLegal('terms')}
                className="hover:text-black underline"
              >
                Terms of Service
              </button>
              <span>•</span>
              <button
                onClick={() => onOpenLegal('privacy')}
                className="hover:text-black underline"
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
