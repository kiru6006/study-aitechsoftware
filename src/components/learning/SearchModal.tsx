import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const allIndex = useMemo(() => {
    const results: SearchResult[] = [];
    const subjectId = 'ai-cyber-security';
    const units = getSubjectUnits(subjectId);
    const concepts = getSubjectConcepts(subjectId);
    const useCases = getSubjectUseCases(subjectId);

    units.forEach(u => {
      results.push({
        type: 'unit',
        title: `Unit ${u.unitNumber}: ${u.title}`,
        snippet: u.summary,
        url: `/${subjectId}/units/${u.id}`,
        badge: `Unit ${u.unitNumber}`
      });

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

    concepts.forEach(c => {
      results.push({
        type: 'concept',
        title: c.title,
        snippet: c.understanding.definition,
        url: `/${subjectId}/concepts/${c.id}`,
        badge: 'Concept'
      });
    });

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
      .slice(0, 8);
  }, [allIndex, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-xs">
      <div
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden transition-all animate-in fade-in duration-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3 bg-white border-b border-slate-100 flex items-center gap-2.5">
          <Search className="w-4 h-4 text-slate-400 ml-1" />
          <input
            type="text"
            placeholder="Search subjects, units, topics, concepts, code..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-xs text-slate-500">
              Type a concept, unit, or technology (e.g. <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">Perceptron</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">Keystroke</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">Ensemble</code>)
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
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
                className="w-full text-left p-2.5 hover:bg-slate-50 rounded-lg transition-colors flex items-start justify-between gap-3 cursor-pointer group"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      {item.badge}
                    </span>
                    <h4 className="text-xs font-medium text-slate-900 group-hover:text-slate-950 truncate">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {item.snippet}
                  </p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 shrink-0 mt-1" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between px-4">
          <span>Search index ready</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>
      </div>
    </div>
  );
};
