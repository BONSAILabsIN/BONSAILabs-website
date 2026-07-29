import React from 'react';
import { Logo } from './Logo';
import { Youtube, Github, Twitter, Instagram, Code2, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Brand Header */}
        <div className="space-y-4 text-center">
          <Logo variant="hero" subtext={true} className="justify-center" />
          
          <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight pt-4">
            Zero Fluff. Pure Execution.
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            BONSAI Labs (<strong className="text-black">bonsailabs.in</strong>) was founded with one goal: eliminate tedious video intro fluff and deliver instant, copy-paste ready technical solutions in under 180 seconds.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-lg bg-gray-50 border border-gray-200 space-y-2">
            <div className="text-base font-bold text-black">⏱ &lt; 180 Seconds</div>
            <p className="text-gray-600 font-sans text-xs leading-relaxed">
              Every tutorial gets straight to the point without filler commentary or long intros.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-gray-50 border border-gray-200 space-y-2">
            <div className="text-base font-bold text-black">💻 Verified Code</div>
            <p className="text-gray-600 font-sans text-xs leading-relaxed">
              All code snippets and n8n JSON templates are tested in production before publication.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-gray-50 border border-gray-200 space-y-2">
            <div className="text-base font-bold text-black">📂 Open Library</div>
            <p className="text-gray-600 font-sans text-xs leading-relaxed">
              Search, view, and copy all workflows anytime at bonsailabs.in/resources.
            </p>
          </div>
        </div>

        {/* Mission Statement Box */}
        <div className="bg-black text-white p-6 sm:p-8 rounded-lg border border-gray-800 space-y-4">
          <h2 className="text-xl font-bold tracking-tight">The Philosophy Behind BONSAI Labs</h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Software engineers, DevOps leads, and automation builders spend hours searching through bloated videos and outdated forum threads just to fix signature mismatches, rate-limiting bugs, or OAuth flows.
          </p>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            BONSAI Labs packages every solution into a 180-second high-density video blueprint with matching downloadable JSON templates, architecture diagrams, and copy-paste code snippets.
          </p>
        </div>

        {/* Content Management Strategy (Content-as-Code) */}
        <div className="p-6 rounded-lg border border-gray-200 bg-gray-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-black text-sm uppercase font-mono">
              Content-as-Code Publishing
            </h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Content is managed via Git-based markdown (<code className="bg-white px-1 py-0.5 rounded border border-gray-200 font-mono text-black">content/tutorials/*.mdx</code>) or Decap CMS (<code className="bg-white px-1 py-0.5 rounded border border-gray-200 font-mono text-black">/admin</code>).
          </p>
        </div>

        {/* Links & Socials */}
        <div className="p-6 rounded-lg border border-gray-200 bg-white space-y-4 text-center">
          <h3 className="font-bold text-black text-base">Connect &amp; Follow BONSAI Labs</h3>
          
          <div className="flex flex-wrap justify-center gap-3 pt-2 text-xs font-mono">
            <a
              href="https://youtube.com/@BONSAILabsIN"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded flex items-center gap-2 transition-colors font-sans font-medium"
            >
              <Youtube className="w-4 h-4 text-red-500 fill-current" />
              <span>YouTube Channel</span>
            </a>

            <a
              href="https://instagram.com/BONSAILabsIN"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded flex items-center gap-2 transition-colors font-sans font-medium"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Instagram</span>
            </a>

            <a
              href="https://x.com/BONSAILabsIN"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded flex items-center gap-2 transition-colors font-sans font-medium"
            >
              <Twitter className="w-4 h-4 text-black" />
              <span>X / Twitter</span>
            </a>

            <a
              href="https://github.com/BONSAILabsIN"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded flex items-center gap-2 transition-colors font-sans font-medium"
            >
              <Github className="w-4 h-4 text-black" />
              <span>GitHub Repos</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
