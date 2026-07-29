import React from 'react';
import { LegalModalType } from '../types';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isTerms = type === 'terms';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-2xl w-full overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-900">
            {isTerms ? <FileText className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4 text-emerald-600" />}
            <span>{isTerms ? 'Terms of Service — bonsailabs.in' : 'Privacy Policy — bonsailabs.in'}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-neutral-600 space-y-4 leading-relaxed font-sans">
          {isTerms ? (
            <>
              <p className="font-semibold text-neutral-900">Effective Date: July 29, 2026</p>
              
              <h4 className="font-bold text-neutral-900 text-sm">1. Acceptance of Terms</h4>
              <p>
                By accessing and using BONSAI Labs (<strong className="text-neutral-900">bonsailabs.in</strong>), you agree to be bound by these Terms of Service. All content, video tutorials, code snippets, and workflow templates provided on this platform are for educational and workflow productivity purposes.
              </p>

              <h4 className="font-bold text-neutral-900 text-sm">2. Use of Code Snippets &amp; Templates</h4>
              <p>
                All code snippets, Dockerfiles, Python scripts, and n8n JSON workflow templates published on bonsailabs.in are provided under the MIT License unless stated otherwise. You are free to modify and integrate them into personal or commercial projects.
              </p>

              <h4 className="font-bold text-neutral-900 text-sm">3. Disclaimer of Liability</h4>
              <p>
                While all tutorials are thoroughly tested, BONSAI Labs provides resources on an "AS IS" basis. Always test webhook endpoints, authentication logic, and infrastructure configurations in staging environments before deploying to production.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-neutral-900">Effective Date: July 29, 2026</p>

              <h4 className="font-bold text-neutral-900 text-sm">1. Data Minimization</h4>
              <p>
                At BONSAI Labs (<strong className="text-neutral-900">bonsailabs.in</strong>), we respect developer privacy. We do not track personal identities or sell browsing data to third parties.
              </p>

              <h4 className="font-bold text-neutral-900 text-sm">2. Newsletter Subscriptions</h4>
              <p>
                If you opt-in to our weekly 180-second workflow dispatch, we store your email securely solely to deliver weekly tutorials and workflow updates. You can unsubscribe at any time via the single-click link in every email.
              </p>

              <h4 className="font-bold text-neutral-900 text-sm">3. Local Storage Usage</h4>
              <p>
                We use standard client-side browser localStorage to save your bookmarked resources locally on your device. No cookies or cross-site tracking scripts are deployed.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-500">BONSAI Labs • bonsailabs.in</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-sans font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
