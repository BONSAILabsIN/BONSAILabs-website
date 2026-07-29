import React, { useState } from 'react';
import { Mail, Check, Sparkles, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 md:py-20 border-t border-gray-200 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-xs font-mono text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WEEKLY ZERO-FLUFF DISPATCH</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          One 180-second workflow blueprint. Every week.
        </h2>

        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Get direct production code snippets, architecture flow diagrams, and n8n JSON templates delivered to your inbox.
        </p>

        {submitted ? (
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-mono flex items-center justify-center gap-2 max-w-md mx-auto">
            <Check className="w-5 h-5 text-emerald-400" />
            <span>You're subscribed! Welcome to BONSAI Labs.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <div className="relative w-full">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 text-white rounded text-xs placeholder-gray-500 focus:outline-none focus:border-white"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-white text-black font-semibold text-xs rounded hover:bg-gray-100 transition-colors shrink-0 flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] font-mono text-gray-500">
          No spam. Unsubscribe anytime in 1 click.
        </p>

      </div>
    </section>
  );
};
