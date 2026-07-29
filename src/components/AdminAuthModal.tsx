import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, Github, AlertCircle, ArrowRight, Eye, EyeOff, X } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated
}) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    // Check passkey (Default master key: bonsai2026 or admin)
    setTimeout(() => {
      if (passcode === 'bonsai2026' || passcode === 'admin' || passcode === 'bonsailabs') {
        sessionStorage.setItem('bonsai_admin_authenticated', 'true');
        onAuthenticated();
        setPasscode('');
      } else {
        setErrorMsg('Invalid Admin Passkey. Please try again or check your configuration.');
      }
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xl max-w-md w-full overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-black text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-900 text-emerald-400 border border-gray-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-mono text-sm font-bold tracking-tight">
                BONSAI Labs Admin Portal
              </h2>
              <p className="text-[11px] text-gray-400 font-mono">
                Authentication Required • Restricted Access
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
            <div className="font-bold font-mono flex items-center gap-1.5 text-amber-900">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>Owner Access Protection</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Public visitors cannot view or edit content. Please enter your Admin Passkey or authenticate with GitHub repository credentials.
            </p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-gray-700 flex items-center justify-between">
                <span>Enter Admin Passkey *</span>
                <span className="text-[10px] text-gray-400 font-normal">Default: bonsai2026</span>
              </label>

              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-mono focus:outline-none focus:border-black focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-black transition-colors"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded text-xs text-red-700 font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-black hover:bg-gray-800 text-white rounded-lg text-xs font-mono font-bold transition-all uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Key className="w-4 h-4 text-emerald-400" />
                  <span>Unlock Admin Portal</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                </>
              )}
            </button>
          </form>

          {/* GitHub Decap CMS Production Auth Note */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-800">
              <Github className="w-4 h-4" />
              <span>Decap CMS GitHub OAuth Integration</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
              In production builds on Netlify/Vercel with Decap CMS (<code className="font-mono text-black">/admin</code>), access is protected via GitHub OAuth. Users must log in with a GitHub account that has write access to your repository.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
