import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bookmark, CheckCircle2 } from 'lucide-react';
import { getCompletedConcepts, getBookmarkedConcepts } from '../../lib/contentLoader';
import { SearchModal } from '../learning/SearchModal';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const completedCount = getCompletedConcepts().length;
  const bookmarkCount = getBookmarkedConcepts().length;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Brand & Drawer Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden cursor-pointer transition-colors"
              aria-label="Toggle navigation"
            >
              {isSidebarOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-md bg-[#9F1239] text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs">
                SL
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-lg font-semibold text-slate-900 tracking-tight">
                  SubjectLab
                </span>
                <span className="hidden sm:inline-block text-xs text-slate-500 font-sans">
                  AI for Cyber Security
                </span>
              </div>
            </Link>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline text-xs font-normal">Search topics...</span>
              <kbd className="hidden md:inline px-1 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            <div className="h-4 w-px bg-slate-200 mx-0.5 hidden sm:block" />

            {/* Counters */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-medium border border-emerald-200/60">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{completedCount}</span>
              </span>

              {bookmarkCount > 0 && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-medium border border-amber-200/60">
                  <Bookmark className="w-3 h-3 text-amber-600 fill-amber-500" />
                  <span>{bookmarkCount}</span>
                </span>
              )}
            </div>

            <Link
              to="/ai-cyber-security"
              className="text-[11px] font-mono text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
            >
              MAI-OL506A-3
            </Link>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
