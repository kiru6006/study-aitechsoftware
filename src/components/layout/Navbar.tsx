import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bookmark, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getCompletedConcepts, getBookmarkedConcepts, getCatalog } from '../../lib/contentLoader';
import { SearchModal } from '../learning/SearchModal';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const catalog = getCatalog();
  const completedCount = getCompletedConcepts().length;
  const bookmarkCount = getBookmarkedConcepts().length;
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSubjectId = pathParts[0] || 'cyber-forensics';
  const currentSubject = catalog.subjects[currentSubjectId] || catalog.subjects['cyber-forensics'] || Object.values(catalog.subjects)[0];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-[#C70234]/30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-4 h-11 flex items-center justify-between">
          {/* Left section: Sidebar toggle & Brand */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSidebar}
              className="p-1 rounded text-gray-700 hover:text-black hover:bg-[#FEF7E0] lg:hidden cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isSidebarOpen ? <X className="w-4 h-4 text-[#C70234]" /> : <Menu className="w-4 h-4" />}
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-[#C70234] to-[#9E0027] flex items-center justify-center text-white font-bold text-[11px] tracking-wider shadow-2xs border border-[#FBBC05] group-hover:scale-105 transition-transform font-mono">
                SL
              </div>
              <div className="flex items-center">
                <span className="font-serif text-base font-bold text-black tracking-tight group-hover:text-[#C70234] transition-colors">
                  SubjectLab
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-mono font-bold px-2 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]">
                  {currentSubject?.name || 'Academic Series'}
                </span>
              </div>
            </Link>
          </div>

          {/* Middle/Right: Quick Search & Progress Badges */}
          <div className="flex items-center gap-2">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#FAF9F5] hover:bg-[#FEF7E0] border border-[#DADCE0] text-xs text-gray-600 hover:text-[#92400E] transition-colors cursor-pointer"
              title="Search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#C70234]" />
              <span className="hidden sm:inline text-[11px] font-sans font-medium">Search...</span>
              <kbd className="hidden md:inline text-[9px] font-mono px-1 bg-white border border-[#DADCE0] rounded text-gray-500">
                ⌘K
              </kbd>
            </button>

            {/* Progress indicators */}
            <div className="flex items-center gap-1.5 text-xs font-sans">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#188038] text-[10.5px] font-bold border border-[#34A853]/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>{completedCount} Mastered</span>
              </span>

              {bookmarkCount > 0 && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF7E0] text-[#92400E] text-[10.5px] font-bold border border-[#FBBC05]">
                  <Bookmark className="w-3 h-3" />
                  <span>{bookmarkCount}</span>
                </span>
              )}
            </div>

            {/* Course Code Badge */}
            <Link
              to={`/${currentSubject?.id || 'cyber-forensics'}`}
              className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/30 hover:bg-[#C70234] hover:text-white transition-colors"
            >
              {currentSubject?.code || 'MAI-OL507B-3'}
            </Link>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};