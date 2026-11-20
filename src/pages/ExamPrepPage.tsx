import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCircle2,
  BookOpen,
  Layers,
  Sparkles
} from 'lucide-react';
import { getSubjectExamQuestions, getSubjectUnits } from '../lib/contentLoader';

export const ExamPrepPage: React.FC = () => {
  const { subjectId = 'ai-cyber-security' } = useParams<{ subjectId?: string }>();
  const questions = getSubjectExamQuestions(subjectId);
  const units = getSubjectUnits(subjectId);

  // Depth filter: all | short | medium | detailed
  const [selectedDepth, setSelectedDepth] = useState<'all' | 'short' | 'medium' | 'detailed'>('all');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});

  const toggleAnswer = (qId: string) => {
    setExpandedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const getQuestionDepth = (marks: number): 'short' | 'medium' | 'detailed' => {
    if (marks <= 2) return 'short';
    if (marks <= 5) return 'medium';
    return 'detailed';
  };

  const filteredQuestions = questions.filter(q => {
    const depth = getQuestionDepth(q.marks);
    if (selectedDepth !== 'all' && depth !== selectedDepth) return false;
    if (selectedUnit !== 'all' && q.unitId !== selectedUnit) return false;
    return true;
  });

  return (
    <div className="space-y-4 py-1">
      {/* Header with Red & Yellow Theme */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/50 text-[11px] font-bold">
              Study & Revision Notes
            </span>
            <span className="text-[11px] text-[#5F6368] font-sans">
              Progressive Academic Depth
            </span>
          </div>

          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/30">
            {filteredQuestions.length} Notes Available
          </span>
        </div>

        <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#202124] tracking-tight">
          Subject Study Notes & Answer Bank
        </h1>

        <p className="text-xs text-[#5F6368] leading-relaxed max-w-3xl">
          Progressive technical summaries structured into <strong>Short Notes</strong> (quick understanding), <strong>Medium Notes</strong> (working principles & algorithms), and <strong>Detailed Notes</strong> (comprehensive architecture & mathematics).
        </p>

        {/* Compact Filters Bar */}
        <div className="pt-3 border-t border-[#FBBC05]/40 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-semibold text-[#92400E]">
            <Filter className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Note Depth:</span>
          </div>

          {[
            { id: 'all', label: 'All Notes' },
            { id: 'short', label: 'Short Notes (100–150w)' },
            { id: 'medium', label: 'Medium Notes (250–350w)' },
            { id: 'detailed', label: 'Detailed Notes (500–700w)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedDepth(tab.id as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedDepth === tab.id
                  ? 'bg-[#C70234] text-white shadow-2xs font-semibold'
                  : 'bg-[#FAF9F5] text-[#5F6368] border border-[#DADCE0] hover:border-[#FBBC05] hover:text-[#202124]'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <div className="h-4 w-px bg-[#DADCE0] mx-1 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5F6368]">
            <span>Unit:</span>
          </div>
          <select
            value={selectedUnit}
            onChange={e => setSelectedUnit(e.target.value)}
            className="text-xs bg-white border border-[#FBBC05]/60 rounded-lg px-2.5 py-1 text-[#202124] focus:outline-none"
          >
            <option value="all">All Units (I - V)</option>
            {units.map(u => (
              <option key={u.id} value={u.id}>
                Unit {u.unitNumber}: {u.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Question / Note List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center border border-[#DADCE0]">
            <p className="text-xs text-[#5F6368]">No study notes match the selected filter criteria.</p>
          </div>
        ) : (
          filteredQuestions.map(q => {
            const isExpanded = !!expandedAnswers[q.id];
            const unit = units.find(u => u.id === q.unitId);
            const depth = getQuestionDepth(q.marks);

            const getDepthBadge = () => {
              switch (depth) {
                case 'short':
                  return (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/50">
                      Short Note
                    </span>
                  );
                case 'medium':
                  return (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/30">
                      Medium Note
                    </span>
                  );
                case 'detailed':
                default:
                  return (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8]/30">
                      Detailed Note
                    </span>
                  );
              }
            };

            return (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-[#C70234]/25 hover:border-[#C70234]/60 shadow-2xs overflow-hidden transition-all"
              >
                <div className="p-3.5 sm:p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getDepthBadge()}
                      <span className="text-[11px] text-[#5F6368] font-medium">
                        {unit ? `Unit ${unit.unitNumber}: ${unit.title}` : ''}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleAnswer(q.id)}
                      className="text-xs font-semibold text-[#C70234] hover:text-[#9E0027] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Notes' : 'Read Notes'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#202124] leading-snug">
                    {q.question}
                  </h3>

                  {/* Keywords */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-[10px] font-semibold text-[#80868B] uppercase">Keywords:</span>
                    {q.importantKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded bg-[#FAF9F5] border border-[#FBBC05]/40 text-[10px] text-[#92400E] font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Outline Pills */}
                  {q.answerOutline && (
                    <div className="pt-1.5 border-t border-[#FBBC05]/30">
                      <span className="text-[10px] font-semibold text-[#80868B] uppercase block mb-1">
                        Logical Flow:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {q.answerOutline.map((step, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-[#FEF7E0]/60 text-[#7C2D12] border border-[#FBBC05]/40 font-medium"
                          >
                            {idx + 1}. {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible Model Answer */}
                {isExpanded && (
                  <div className="p-3.5 sm:p-4 bg-[#FAF9F5] border-t border-[#FBBC05]/40 space-y-3">
                    <div className="prose prose-sm max-w-none text-xs leading-relaxed text-[#202124]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {q.modelAnswer}
                      </ReactMarkdown>
                    </div>

                    {q.practicalExample && (
                      <div className="p-2.5 bg-[#E6F4EA] border border-[#34A853]/40 rounded-lg text-xs text-[#188038] font-medium">
                        <strong>Practical Application:</strong> {q.practicalExample}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
