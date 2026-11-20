import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Bookmark, CheckCircle2 } from 'lucide-react';
import { getCompletedConcepts, getBookmarkedConcepts } from '../../lib/contentLoader';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const completedCount = getCompletedConcepts().length;
  const bookmarkCount = getBookmarkedConcepts().length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#DADCE0] mat-elevation-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-md text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] lg:hidden"
            aria-label="Toggle navigation"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#C70234] flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-sm group-hover:bg-[#B6263A] transition-colors">
              SL
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#202124] tracking-tight group-hover:text-[#C70234] transition-colors">
                SubjectLab
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-sans font-medium px-2 py-0.5 rounded bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/20">
                AI for Cyber Security
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-sans text-[#5F6368]">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E6F4EA] text-[#188038] font-medium border border-[#34A853]/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{completedCount} Done</span>
            </span>

            {bookmarkCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF7E0] text-[#B06000] font-medium border border-[#FBBC05]/30">
                <Bookmark className="w-3.5 h-3.5" />
                <span>{bookmarkCount} Saved</span>
              </span>
            )}
          </div>

          <Link
            to="/ai-cyber-security"
            className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
              location.pathname.startsWith('/ai-cyber-security')
                ? 'bg-[#1A73E8] text-white'
                : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
            }`}
          >
            MAI-OL506A-3
          </Link>
        </div>
      </div>
    </header>
  );
};
