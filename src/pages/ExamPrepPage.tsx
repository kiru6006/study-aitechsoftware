import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Award,
  KeyRound,
  Filter,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { getSubjectExamQuestions, getSubjectUnits } from '../lib/contentLoader';

export const ExamPrepPage: React.FC = () => {
  const { subjectId = 'ai-cyber-security' } = useParams<{ subjectId?: string }>();
  const questions = getSubjectExamQuestions(subjectId);
  const units = getSubjectUnits(subjectId);

  const [selectedMarks, setSelectedMarks] = useState<number | 'all'>('all');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});

  const toggleAnswer = (qId: string) => {
    setExpandedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const filteredQuestions = questions.filter(q => {
    if (selectedMarks !== 'all' && q.marks !== selectedMarks) return false;
    if (selectedUnit !== 'all' && q.unitId !== selectedUnit) return false;
    return true;
  });

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded bg-[#E6F4EA] text-[#188038] text-xs font-semibold">
            University Examination Preparation
          </span>
          <span className="text-xs text-[#5F6368] font-sans">
            Rigorous, Syllabus-Grounded Model Answers
          </span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-[#202124] tracking-tight">
          Model Examination Answers & Question Bank
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-[#5F6368] leading-relaxed max-w-3xl">
          Structured using university evaluation standards: Definition → Working → Algorithm/Architecture → Worked Example → Benefits & Limitations → Conclusion.
        </p>

        {/* Filters */}
        <div className="mt-6 pt-5 border-t border-[#DADCE0]/60 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5F6368]">
            <Filter className="w-3.5 h-3.5" />
            <span>Marks:</span>
          </div>
          {['all', 2, 5, 10, 16].map(mark => (
            <button
              key={mark}
              onClick={() => setSelectedMarks(mark as any)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedMarks === mark
                  ? 'bg-[#C70234] text-white'
                  : 'bg-[#F1F3F4] text-[#5F6368] hover:bg-[#DADCE0]'
              }`}
            >
              {mark === 'all' ? 'All Questions' : `${mark} Marks`}
            </button>
          ))}

          <div className="h-4 w-px bg-[#DADCE0] mx-1 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5F6368]">
            <span>Unit:</span>
          </div>
          <select
            value={selectedUnit}
            onChange={e => setSelectedUnit(e.target.value)}
            className="text-xs bg-[#F1F3F4] border border-[#DADCE0] rounded-lg px-2.5 py-1 text-[#202124] focus:outline-hidden"
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

      {/* Question List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-[#DADCE0]">
            <p className="text-xs text-[#5F6368]">No questions match the selected filter criteria.</p>
          </div>
        ) : (
          filteredQuestions.map(q => {
            const isExpanded = !!expandedAnswers[q.id];
            const unit = units.find(u => u.id === q.unitId);

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-[#DADCE0] mat-elevation-1 overflow-hidden"
              >
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1A73E8] text-white">
                        {q.marks} Marks
                      </span>
                      <span className="text-[11px] text-[#5F6368] font-medium">
                        {unit ? `Unit ${unit.unitNumber}: ${unit.title}` : ''}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleAnswer(q.id)}
                      className="text-xs font-semibold text-[#1A73E8] hover:text-[#185ABC] inline-flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Hide Answer' : 'View Model Answer'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#202124] leading-snug">
                    {q.question}
                  </h3>

                  {/* Keywords */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-semibold text-[#80868B] uppercase">Keywords:</span>
                    {q.importantKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#F1F3F4] text-[10px] text-[#202124] font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Answer Outline Pills */}
                  {q.answerOutline && (
                    <div className="pt-2 border-t border-[#DADCE0]/50">
                      <span className="text-[10px] font-semibold text-[#80868B] uppercase block mb-1">
                        Recommended Answer Outline:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {q.answerOutline.map((step, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#E8F0FE] text-[#1A73E8] font-medium">
                            {idx + 1}. {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible Model Answer */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-[#F8FAFC] border-t border-[#DADCE0] space-y-4">
                    <div className="prose prose-slate max-w-none text-xs leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {q.modelAnswer}
                      </ReactMarkdown>
                    </div>

                    {q.practicalExample && (
                      <div className="p-3 bg-[#E6F4EA] rounded-lg text-xs text-[#188038] font-medium">
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
