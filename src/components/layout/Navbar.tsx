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
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-[#C70234]/30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-13 flex items-center justify-between">
          {/* Left section: Sidebar toggle & Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg text-[#5F6368] hover:text-[#202124] hover:bg-[#FEF7E0] lg:hidden cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isSidebarOpen ? <X className="w-5 h-5 text-[#C70234]" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#C70234] to-[#9E0027] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-xs border border-[#FBBC05] group-hover:scale-105 transition-transform">
                SL
              </div>
              <div>
                <span className="font-serif text-base sm:text-lg font-bold text-[#202124] tracking-tight group-hover:text-[#C70234] transition-colors">
                  SubjectLab
                </span>
                <span className="hidden md:inline-block ml-2 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/50">
                  AI for Cyber Security
                </span>
              </div>
            </Link>
          </div>

          {/* Middle/Right: Quick Search & Progress Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#FEF7E0] border border-[#FBBC05]/50 text-xs text-[#5F6368] hover:text-[#92400E] transition-colors cursor-pointer"
              title="Search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#C70234]" />
              <span className="hidden sm:inline text-[11px] font-sans">Search...</span>
              <kbd className="hidden md:inline text-[9px] font-mono px-1 bg-white border border-[#DADCE0] rounded text-[#80868B]">
                ⌘K
              </kbd>
            </button>

            {/* Progress indicators */}
            <div className="flex items-center gap-1.5 text-xs font-sans">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#188038] text-[11px] font-semibold border border-[#34A853]/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>{completedCount}</span>
              </span>

              {bookmarkCount > 0 && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF7E0] text-[#92400E] text-[11px] font-semibold border border-[#FBBC05]/40">
                  <Bookmark className="w-3 h-3" />
                  <span>{bookmarkCount}</span>
                </span>
              )}
            </div>

            {/* Course Code Badge */}
            <Link
              to="/ai-cyber-security"
              className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/30 hover:bg-[#C70234] hover:text-white transition-colors"
            >
              MAI-OL506A-3
            </Link>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
