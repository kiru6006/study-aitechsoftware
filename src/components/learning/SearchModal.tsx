import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Layers, ShieldAlert, ChevronRight, Hash } from 'lucide-react';
import { getCatalog, getSubjectUnits, getSubjectConcepts, getSubjectUseCases } from '../../lib/contentLoader';

interface SearchResult {
  type: 'unit' | 'concept' | 'topic' | 'use-case';
  title: string;
  snippet: string;
  url: string;
  badge: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle if needed
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Index all content locally
  const allIndex = useMemo(() => {
    const results: SearchResult[] = [];
    const catalog = getCatalog();
    const subjectId = 'ai-cyber-security';
    const units = getSubjectUnits(subjectId);
    const concepts = getSubjectConcepts(subjectId);
    const useCases = getSubjectUseCases(subjectId);

    // Index units
    units.forEach(u => {
      results.push({
        type: 'unit',
        title: `Unit ${u.unitNumber}: ${u.title}`,
        snippet: u.summary,
        url: `/${subjectId}/units/${u.id}`,
        badge: `Unit ${u.unitNumber}`
      });

      // Index topics
      u.topics.forEach(t => {
        results.push({
          type: 'topic',
          title: t.title,
          snippet: `Part of Unit ${u.unitNumber}: ${u.title}`,
          url: `/${subjectId}/units/${u.id}`,
          badge: `U${u.unitNumber} Topic`
        });
      });
    });

    // Index concepts
    concepts.forEach(c => {
      results.push({
        type: 'concept',
        title: c.title,
        snippet: c.understanding.definition,
        url: `/${subjectId}/concepts/${c.id}`,
        badge: 'Concept'
      });
    });

    // Index use cases
    useCases.forEach(uc => {
      results.push({
        type: 'use-case',
        title: uc.title,
        snippet: uc.businessProblem,
        url: `/${subjectId}/case-studies`,
        badge: 'Industry Case'
      });
    });

    return results;
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allIndex
      .filter(item => item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q))
      .slice(0, 10);
  }, [allIndex, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/40 backdrop-blur-xs">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border-2 border-[#FBBC05] overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 bg-[#FEF7E0] border-b border-[#FBBC05]/50 flex items-center gap-2.5">
          <Search className="w-5 h-5 text-[#C70234]" />
          <input
            type="text"
            placeholder="Search subjects, units, topics, concepts, code..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none text-sm text-[#202124] placeholder-[#80868B] focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-black/5 text-[#5F6368] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#DADCE0]/50">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-xs text-[#5F6368]">
              Type a concept, unit, or technology (e.g., <code className="bg-[#FEF7E0] px-1.5 py-0.5 rounded text-[#92400E]">Perceptron</code>, <code className="bg-[#FEF7E0] px-1.5 py-0.5 rounded text-[#92400E]">Keystroke</code>, <code className="bg-[#FEF7E0] px-1.5 py-0.5 rounded text-[#92400E]">Bagging</code>)
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#80868B]">
              No matches found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate(item.url);
                  onClose();
                }}
                className="w-full text-left p-3 hover:bg-[#FEF7E0]/40 rounded-xl transition-colors flex items-start justify-between gap-3 cursor-pointer group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/30 font-semibold">
                      {item.badge}
                    </span>
                    <h4 className="text-xs font-bold text-[#202124] group-hover:text-[#C70234] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-[#5F6368] line-clamp-1">
                    {item.snippet}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#80868B] group-hover:text-[#C70234] shrink-0 mt-1" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-[#FAF9F5] border-t border-[#DADCE0] text-[11px] text-[#5F6368] flex items-center justify-between px-4">
          <span>Search SubjectLab offline index</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-[#DADCE0] rounded text-[10px] font-mono">
            ESC to close
          </kbd>
        </div>
      </div>
    </div>
  );
};
