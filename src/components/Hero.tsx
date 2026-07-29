import React, { useState } from 'react';
import { Search, Zap, Code2, ArrowRight, Play, CheckCircle2, Copy, Check, FileText, Network, Sparkles } from 'lucide-react';
import { ViewTab } from '../types';

interface HeroProps {
  onSelectTab: (tab: ViewTab) => void;
  onSearchQuery: (query: string) => void;
  onOpenCreatorGuide?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTab, onSearchQuery, onOpenCreatorGuide }) => {
  const [searchInput, setSearchInput] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const heroSnippet = `payload = await request.body()
event = stripe.Webhook.construct_event(
    payload, stripe_signature, ENDPOINT_SECRET
)`;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchQuery(searchInput);
      onSelectTab('resources');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(heroSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section className="relative pt-10 pb-12 md:pt-16 md:pb-20 border-b border-gray-100 bg-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-800 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-gray-900">bonsailabs.in</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Zero-Fluff Code &amp; Diagrams</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-black leading-[1.1]">
              Zero fluff. Pure execution.<br />
              <span className="text-gray-400">Solve bottlenecks in 180 seconds.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              Short, step-by-step write-ups, code snippets, and architecture diagrams for software, API integration, and automation workflows. No intros, no fillers—just the code you need.
            </p>

            {/* Quick Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-3 sm:left-4 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search tutorials, APIs or tools (e.g. Stripe, n8n)..."
                  className="w-full pl-9 sm:pl-11 pr-20 sm:pr-28 py-2.5 sm:py-3 bg-gray-50 hover:bg-gray-100/80 focus:bg-white text-black text-xs sm:text-sm font-sans placeholder-gray-400 border border-gray-200 rounded-md focus:outline-none focus:border-black transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1 sm:right-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-black hover:bg-gray-800 text-white text-[11px] sm:text-xs font-semibold rounded-md transition-colors"
                >
                  Search
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs text-gray-500 font-mono">
                <span>Popular:</span>
                <button 
                  type="button" 
                  onClick={() => { setSearchInput('Stripe'); onSearchQuery('Stripe'); onSelectTab('resources'); }}
                  className="hover:text-black underline underline-offset-2"
                >
                  Stripe Webhook
                </button>
                <span>•</span>
                <button 
                  type="button" 
                  onClick={() => { setSearchInput('n8n'); onSearchQuery('n8n'); onSelectTab('resources'); }}
                  className="hover:text-black underline underline-offset-2"
                >
                  n8n AI Pipeline
                </button>
                <span>•</span>
                <button 
                  type="button" 
                  onClick={() => { setSearchInput('Docker'); onSearchQuery('Docker'); onSelectTab('resources'); }}
                  className="hover:text-black underline underline-offset-2"
                >
                  Docker Multi-Stage
                </button>
              </div>
            </form>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab('resources')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all shadow-sm"
              >
                <span>Explore Blueprints</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSelectTab('videos')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 text-xs font-semibold uppercase tracking-wider rounded-md transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current text-black" />
                <span>180s Videos</span>
              </button>
            </div>

          </div>

          {/* Right Column: Clean Minimalist Blog & Diagram Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4 font-sans text-xs">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-black text-white font-mono text-[10px] font-bold uppercase rounded-sm">
                    TUTORIAL WRITE-UP
                  </span>
                  <span className="text-gray-400 font-mono text-[11px]">3 min read</span>
                </div>
                
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[11px] font-semibold border border-emerald-200">
                  ⏱ 140s SOLVE
                </span>
              </div>

              {/* Title & Write-Up Teaser */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm text-black leading-snug">
                  FastAPI &amp; Stripe Webhook HMAC Verification
                </h3>
                <p className="text-gray-600 leading-relaxed text-xs">
                  Avoid 400 Bad Request signature errors by reading raw byte payloads directly before FastAPI dict conversion.
                </p>
              </div>

              {/* Architecture Diagram Vector Graphic */}
              <div className="p-3 bg-gray-50 rounded border border-gray-100 font-mono text-[10px] text-gray-600 space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-[9px] uppercase font-bold tracking-widest">
                  <span className="flex items-center gap-1"><Network className="w-3 h-3 text-black" /> System Flow Diagram</span>
                  <span>HTTP 200 OK</span>
                </div>

                <div className="flex items-center justify-between gap-2 py-1.5 px-2 bg-white rounded border border-gray-200 text-center text-black">
                  <div className="flex-1 font-bold">Stripe Event</div>
                  <div className="text-gray-400 font-bold">➔</div>
                  <div className="flex-1 font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">
                    raw payload
                  </div>
                  <div className="text-gray-400 font-bold">➔</div>
                  <div className="flex-1 font-bold">FastAPI Verify</div>
                </div>
              </div>

              {/* Code Snippet Block */}
              <div className="relative bg-gray-900 text-gray-100 p-3 rounded border border-gray-800 space-y-1.5 font-mono text-[11px] overflow-x-auto">
                <div className="flex items-center justify-between text-[10px] text-gray-400 border-b border-gray-800 pb-1 mb-1">
                  <span>webhook_handler.py</span>
                  <button
                    onClick={handleCopy}
                    className="p-1 hover:text-white transition-colors"
                    title="Copy code"
                  >
                    {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <pre><code>{heroSnippet}</code></pre>
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-500">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Code &amp; Flow</span>
                </span>
                <button
                  onClick={() => onSelectTab('resources')}
                  className="text-black font-bold hover:underline flex items-center gap-1"
                >
                  <span>Read full write-up</span>
                  <span>→</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
