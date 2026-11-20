import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, BookOpen, Layers, Check, Copy, Sparkles } from 'lucide-react';

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
    <div className="rounded-xl border border-[#C70234]/30 bg-white overflow-hidden shadow-xs my-3">
      {/* Header bar */}
      <div className="p-3 bg-[#FEF7E0] border-b border-[#FBBC05]/40 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#C70234]" />
          <h3 className="font-serif text-sm font-bold text-[#202124]">
            Study Notes & Progressive Revision
          </h3>
          <span className="text-[11px] font-mono text-[#92400E] bg-white px-2 py-0.5 rounded border border-[#FBBC05]/50">
            {getWordCount(getCurrentText())} words
          </span>
        </div>

        <button
          onClick={handleCopyNote}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/30 text-[11px] font-medium transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#188038]" />
              <span className="text-[#188038]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Note</span>
            </>
          )}
        </button>
      </div>

      {/* Progressive Disclosure Tabs */}
      <div className="flex border-b border-[#DADCE0] bg-[#FDFBF7] p-1.5 gap-1.5">
        <button
          onClick={() => setActiveTab('short')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'short'
              ? 'bg-[#C70234] text-white shadow-xs'
              : 'text-[#5F6368] hover:bg-[#FCE8EF]/50 hover:text-[#C70234]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Short Notes</span>
          <span className={`text-[10px] px-1 py-0.2 rounded ${activeTab === 'short' ? 'bg-white/20' : 'bg-[#FEF7E0] text-[#92400E]'}`}>
            100–150w
          </span>
        </button>

        <button
          onClick={() => setActiveTab('medium')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'medium'
              ? 'bg-[#C70234] text-white shadow-xs'
              : 'text-[#5F6368] hover:bg-[#FCE8EF]/50 hover:text-[#C70234]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Medium Notes</span>
          <span className={`text-[10px] px-1 py-0.2 rounded ${activeTab === 'medium' ? 'bg-white/20' : 'bg-[#FEF7E0] text-[#92400E]'}`}>
            250–350w
          </span>
        </button>

        <button
          onClick={() => setActiveTab('detailed')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'detailed'
              ? 'bg-[#C70234] text-white shadow-xs'
              : 'text-[#5F6368] hover:bg-[#FCE8EF]/50 hover:text-[#C70234]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Detailed Notes</span>
          <span className={`text-[10px] px-1 py-0.2 rounded ${activeTab === 'detailed' ? 'bg-white/20' : 'bg-[#FEF7E0] text-[#92400E]'}`}>
            500–700w
          </span>
        </button>
      </div>

      {/* Note Content Area */}
      <div className="p-4 bg-white text-xs leading-relaxed text-[#202124]">
        {activeTab === 'short' && (
          <div className="space-y-3">
            <div className="p-2.5 rounded-lg bg-[#FEF7E0]/50 border-l-4 border-[#FBBC05] text-[11px] text-[#92400E]">
              <strong>Focus:</strong> Fast definition, core mechanism, keywords, and practical summary.
            </div>
            <div className="prose prose-sm max-w-none text-xs text-[#202124]">
              {shortContent ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{shortContent}</ReactMarkdown>
              ) : (
                <p className="text-[#80868B] italic">Short notes not yet compiled for this section.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'medium' && (
          <div className="space-y-3">
            <div className="p-2.5 rounded-lg bg-[#FCE8EF]/50 border-l-4 border-[#C70234] text-[11px] text-[#C70234]">
              <strong>Focus:</strong> Working principles, algorithm logic, real-world example, and tradeoffs.
            </div>
            <div className="prose prose-sm max-w-none text-xs text-[#202124]">
              {mediumContent ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{mediumContent}</ReactMarkdown>
              ) : (
                <p className="text-[#80868B] italic">Medium notes not yet compiled for this section.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-3">
            <div className="p-2.5 rounded-lg bg-[#E8F0FE]/60 border-l-4 border-[#1A73E8] text-[11px] text-[#1A73E8]">
              <strong>Focus:</strong> Comprehensive architecture, mathematical grounding, workflow, edge cases, and industry application.
            </div>
            <div className="prose prose-sm max-w-none text-xs text-[#202124]">
              {detailedContent ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{detailedContent}</ReactMarkdown>
              ) : (
                <p className="text-[#80868B] italic">Detailed notes not yet compiled for this section.</p>
              )}
            </div>
          </div>
        )}

        {/* Formulas & Keywords Footer */}
        {(keyFormulas && keyFormulas.length > 0 || keywords && keywords.length > 0) && (
          <div className="mt-4 pt-3 border-t border-[#FBBC05]/40 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
            {keyFormulas && keyFormulas.length > 0 && (
              <div className="p-2 rounded bg-[#FEF7E0]/60 border border-[#FBBC05]/40">
                <span className="font-semibold text-[#92400E] block mb-1">
                  Formula & Mathematical Formulation:
                </span>
                <ul className="space-y-1 text-[#202124]">
                  {keyFormulas.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 font-mono text-[10.5px]">
                      <span className="text-[#D97706] font-bold shrink-0">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {keywords && keywords.length > 0 && (
              <div className="p-2 rounded bg-[#FCE8EF]/40 border border-[#C70234]/20">
                <span className="font-semibold text-[#C70234] block mb-1">
                  Core Keywords for Review:
                </span>
                <div className="flex flex-wrap gap-1">
                  {keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-white text-[#C70234] border border-[#C70234]/30 text-[10px] font-medium"
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
