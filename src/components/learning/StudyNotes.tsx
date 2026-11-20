import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookOpen, Copy, Check, FileText, Layers } from 'lucide-react';

interface StudyNotesProps {
  shortContent?: string;
  mediumContent?: string;
  detailedContent?: string;
  keywords?: string[];
  keyFormulas?: string[];
}

export const StudyNotes: React.FC<StudyNotesProps> = ({
  shortContent,
  mediumContent,
  detailedContent,
  keywords,
  keyFormulas
}) => {
  const [activeTab, setActiveTab] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [copied, setCopied] = useState(false);

  const getCurrentText = () => {
    switch (activeTab) {
      case 'short':
        return shortContent || '';
      case 'medium':
        return mediumContent || '';
      case 'detailed':
        return detailedContent || '';
      default:
        return '';
    }
  };

  const handleCopyNote = () => {
    const text = getCurrentText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getWordCount = (text?: string) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs my-4">
      {/* Header bar */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-500" />
          <h3 className="font-serif text-sm font-semibold text-slate-900">
            Study Notes & Progressive Revision
          </h3>
          <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
            {getWordCount(getCurrentText())} words
          </span>
        </div>

        <button
          onClick={handleCopyNote}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy note</span>
            </>
          )}
        </button>
      </div>

      {/* Segmented Control */}
      <div className="p-2 border-b border-slate-100 bg-slate-50/60 flex">
        <div className="grid grid-cols-3 gap-1 w-full max-w-md bg-slate-200/70 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('short')}
            className={`py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'short'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Short notes</span>
            <span className="text-[10px] text-slate-400 font-mono">100–150w</span>
          </button>

          <button
            onClick={() => setActiveTab('medium')}
            className={`py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'medium'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Medium notes</span>
            <span className="text-[10px] text-slate-400 font-mono">250–350w</span>
          </button>

          <button
            onClick={() => setActiveTab('detailed')}
            className={`py-1.5 px-2 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'detailed'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Detailed notes</span>
            <span className="text-[10px] text-slate-400 font-mono">500–700w</span>
          </button>
        </div>
      </div>

      {/* Note Content Area */}
      <div className="p-4 sm:p-5 bg-white text-xs leading-relaxed text-slate-700">
        {activeTab === 'short' && (
          <div className="space-y-3">
            <div className="p-2.5 rounded-lg bg-slate-50 border-l-2 border-slate-400 text-xs text-slate-600">
              <strong className="text-slate-900">Focus:</strong> Rapid definition, core mechanism, keywords, and practical summary.
            </div>
            <div className="prose prose-slate max-w-none text-xs leading-relaxed">
              {shortContent ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{shortContent}</ReactMarkdown>
              ) : (
                <p className="text-slate-400 italic">Short notes not yet compiled for this section.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'medium' && (
          <div className="space-y-3">
            <div className="p-2.5 rounded-lg bg-slate-50 border-l-2 border-[#9F1239] text-xs text-slate-600">
              <strong className="text-slate-900">Focus:</strong> Working principles, algorithm logic, real-world example, and tradeoffs.
            </div>
            <div className="prose prose-slate max-w-none text-xs leading-relaxed">
              {mediumContent ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{mediumContent}</ReactMarkdown>
              ) : (
                <p className="text-slate-400 italic">Medium notes not yet compiled for this section.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-3">
            <div className="p-2.5 rounded-lg bg-slate-50 border-l-2 border-blue-500 text-xs text-slate-600">
              <strong className="text-slate-900">Focus:</strong> Comprehensive architecture, mathematical grounding, workflow, edge cases, and industry application.
            </div>
            <div className="prose prose-slate max-w-none text-xs leading-relaxed">
              {detailedContent ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{detailedContent}</ReactMarkdown>
              ) : (
                <p className="text-slate-400 italic">Detailed notes not yet compiled for this section.</p>
              )}
            </div>
          </div>
        )}

        {/* Formulas & Keywords Footer */}
        {((keyFormulas && keyFormulas.length > 0) || (keywords && keywords.length > 0)) && (
          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {keyFormulas && keyFormulas.length > 0 && (
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="font-semibold text-slate-900 block mb-1.5">
                  Formula & Mathematical Formulation:
                </span>
                <ul className="space-y-1 text-slate-700">
                  {keyFormulas.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 font-mono text-[11px]">
                      <span className="text-slate-400 shrink-0">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {keywords && keywords.length > 0 && (
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="font-semibold text-slate-900 block mb-1.5">
                  Core Keywords for Review:
                </span>
                <div className="flex flex-wrap gap-1">
                  {keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[11px] font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
