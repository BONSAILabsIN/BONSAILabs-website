import React, { useState } from 'react';
import { Logo } from './Logo';
import { ViewTab } from '../types';
import { Search, Youtube, Menu, X, ArrowUpRight, BookOpen, Code2, PlusCircle, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onOpenSearch: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  savedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: ViewTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNav('home')} 
          className="text-left focus:outline-none shrink-0 group"
        >
          <Logo variant="navbar" subtext={false} />
        </button>

        {/* Center Search Input (Clean Minimalism style) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              onClick={onOpenSearch}
              readOnly
              placeholder="Search tutorials or tools (e.g. Stripe, n8n, Python)..."
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs font-sans placeholder-gray-400 focus:outline-none focus:border-black cursor-pointer transition-colors"
            />
            <div className="absolute right-3 top-2.5 text-gray-400 flex items-center gap-1 font-mono text-[10px]">
              <Search className="w-3.5 h-3.5" />
              <kbd className="hidden lg:inline-block px-1 py-0.5 bg-white border border-gray-200 rounded">⌘K</kbd>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <button
            onClick={() => handleNav('home')}
            className={`transition-colors ${
              currentTab === 'home' ? 'text-black font-bold' : 'text-gray-600 hover:text-black'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNav('resources')}
            className={`transition-colors flex items-center gap-1.5 ${
              currentTab === 'resources' ? 'text-black font-bold' : 'text-gray-600 hover:text-black'
            }`}
          >
            <span>Resources &amp; Blueprints</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] bg-black text-white font-mono rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNav('videos')}
            className={`transition-colors ${
              currentTab === 'videos' ? 'text-black font-bold' : 'text-gray-600 hover:text-black'
            }`}
          >
            YouTube Videos
          </button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenSearch}
            className="p-2 text-gray-600 hover:text-black rounded bg-gray-50 border border-gray-200"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-black rounded border border-gray-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3 font-sans text-sm">
          {/* Mobile Search input */}
          <div className="relative w-full pb-1">
            <input
              type="text"
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              readOnly
              placeholder="Search tutorials or tools..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs font-sans placeholder-gray-400 focus:outline-none focus:border-black cursor-pointer"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
          </div>

          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2 rounded text-sm ${
              currentTab === 'home' ? 'bg-gray-100 text-black font-bold' : 'text-gray-600'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => handleNav('resources')}
            className={`w-full text-left px-3 py-2 rounded text-sm flex items-center justify-between ${
              currentTab === 'resources' ? 'bg-gray-100 text-black font-bold' : 'text-gray-600'
            }`}
          >
            <span>Resources &amp; Blueprints</span>
            <span className="text-xs font-mono text-gray-400">bonsailabs.in</span>
          </button>

          <button
            onClick={() => handleNav('videos')}
            className={`w-full text-left px-3 py-2 rounded text-sm ${
              currentTab === 'videos' ? 'bg-gray-100 text-black font-bold' : 'text-gray-600'
            }`}
          >
            YouTube Videos (&lt;180s)
          </button>
        </div>
      )}
    </header>
  );
};
