import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import { getSubjectExamQuestions, getSubjectUnits } from '../lib/contentLoader';

export const ExamPrepPage: React.FC = () => {
  const { subjectId = 'ai-cyber-security' } = useParams<{ subjectId?: string }>();
  const questions = getSubjectExamQuestions(subjectId);
  const units = getSubjectUnits(subjectId);

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
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-medium">
            Academic Answer Bank
          </span>
          <span className="text-xs font-mono text-slate-500">
            {filteredQuestions.length} notes available
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
          Subject Study Notes & Answer Bank
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Progressive technical summaries structured into <strong>Short Notes</strong> (quick revision), <strong>Medium Notes</strong> (working principles & algorithms), and <strong>Detailed Notes</strong> (comprehensive architecture & math).
        </p>

        {/* Filters */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Note depth:</span>
          </div>

          <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
            {[
              { id: 'all', label: 'All notes' },
              { id: 'short', label: 'Short (100–150w)' },
              { id: 'medium', label: 'Medium (250–350w)' },
              { id: 'detailed', label: 'Detailed (500–700w)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedDepth(tab.id as any)}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  selectedDepth === tab.id
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

          <select
            value={selectedUnit}
            onChange={e => setSelectedUnit(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none"
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

      {/* Note List */}
      <div className="space-y-3.5">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
            <p className="text-xs text-slate-500">No study notes match the selected filter criteria.</p>
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
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                      Short note
                    </span>
                  );
                case 'medium':
                  return (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-rose-50 text-rose-700 border border-rose-200/60">
                      Medium note
                    </span>
                  );
                case 'detailed':
                default:
                  return (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                      Detailed note
                    </span>
                  );
              }
            };

            return (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 shadow-2xs overflow-hidden transition-all"
              >
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getDepthBadge()}
                      <span className="text-[11px] text-slate-500 font-medium">
                        {unit ? `Unit ${unit.unitNumber}: ${unit.title}` : ''}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleAnswer(q.id)}
                      className="text-xs font-medium text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide notes' : 'Read notes'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>

                  <h3 className="font-serif text-base font-semibold text-slate-900 leading-snug">
                    {q.question}
                  </h3>

                  {/* Keywords */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-[11px] font-medium text-slate-400">Keywords:</span>
                    {q.importantKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200/60 text-[11px] text-slate-600"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Outline List */}
                  {q.answerOutline && (
                    <div className="pt-2.5 border-t border-slate-100">
                      <span className="text-[11px] font-medium text-slate-400 block mb-1.5">
                        Structured answer outline:
                      </span>
                      <div className="space-y-1">
                        {q.answerOutline.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="w-4 h-4 rounded bg-slate-100 text-slate-600 font-mono text-[10px] font-medium flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible Model Answer */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100 space-y-3">
                    <div className="prose prose-slate max-w-none text-xs leading-relaxed text-slate-700">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {q.modelAnswer}
                      </ReactMarkdown>
                    </div>

                    {q.practicalExample && (
                      <div className="p-3 bg-emerald-50/60 border border-emerald-200/60 rounded-lg text-xs text-emerald-800">
                        <strong className="font-semibold">Practical Application:</strong> {q.practicalExample}
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
