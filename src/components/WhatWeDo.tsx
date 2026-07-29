import React from 'react';
import { Zap, Code2, Play, BookOpen, CheckCircle2, ShieldCheck, FileCode } from 'lucide-react';

export const WhatWeDo: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-mono text-gray-800">
            <Zap className="w-3.5 h-3.5 text-black" />
            <span>WHAT BONSAI LABS DOES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-black tracking-tight">
            High-Density Tutorials for Engineers &amp; Automation Builders
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            We systematically break down recurring software, API, and automation bottlenecks into short 180-second videos with matching blog write-ups and ready-to-copy code templates.
          </p>
        </div>

        {/* 3 Core Value Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-lg border border-gray-200 bg-white space-y-4 hover:border-black transition-all">
            <div className="w-10 h-10 rounded bg-black text-white flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-bold text-black">
              Under 180 Seconds
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              No 10-minute intro commentary, no channel promos, and no fluff. Every tutorial goes straight to the code and resolution in under 3 minutes.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 bg-white space-y-4 hover:border-black transition-all">
            <div className="w-10 h-10 rounded bg-black text-white flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-black">
              Verified Code &amp; Diagrams
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Accompanied by clear system flow diagrams, tested Python/TypeScript snippets, and downloadable n8n workflow JSON blueprints.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 bg-white space-y-4 hover:border-black transition-all">
            <div className="w-10 h-10 rounded bg-black text-white flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-bold text-black">
              Searchable Tech Stack Library
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Filter content by tool stack—FastAPI, Stripe, n8n, Supabase, Redis, Docker, and Python. Instantly copy code blocks with one click.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
