import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Clock,
  Award,
  RefreshCw,
  HelpCircle,
  Check,
  X
} from 'lucide-react';
import { getSubjectExamQuestions, getSubjectUnits, getSubjectMetadata } from '../lib/contentLoader';

export const ExamPrepPage: React.FC = () => {
  const { subjectId = 'cyber-forensics' } = useParams<{ subjectId?: string }>();
  const subject = getSubjectMetadata(subjectId);
  const questions = getSubjectExamQuestions(subjectId);
  const units = getSubjectUnits(subjectId);

  const [activeMode, setActiveMode] = useState<'long-answers' | 'mcq-practice' | 'mock-exam'>('long-answers');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});

  // MCQ Practice State
  const [userMcqAnswers, setUserMcqAnswers] = useState<Record<string, number>>({});
  const [showMcqExplanations, setShowMcqExplanations] = useState<Record<string, boolean>>({});

  // Mock Exam Timer
  const [mockTimerSeconds, setMockTimerSeconds] = useState<number>(3600); // 60 mins
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [mockSubmitted, setMockSubmitted] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && mockTimerSeconds > 0) {
      interval = setInterval(() => {
        setMockTimerSeconds(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, mockTimerSeconds]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleAnswer = (qId: string) => {
    setExpandedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Filter 10-mark vs 1-mark
  const tenMarkQuestions = questions.filter(q => q.marks >= 10);
  const mcqQuestions = questions.filter(q => q.marks === 1 || q.marks === 2);

  const filteredTenMark = tenMarkQuestions.filter(q => {
    if (selectedUnit !== 'all' && q.unitId !== selectedUnit) return false;
    return true;
  });

  const filteredMcq = mcqQuestions.filter(q => {
    if (selectedUnit !== 'all' && q.unitId !== selectedUnit) return false;
    return true;
  });

  // Calculate MCQ score
  const totalAttempted = Object.keys(userMcqAnswers).length;
  // If no explicit options on question, check model answer or match
  const mcqScore = Object.entries(userMcqAnswers).reduce((acc, [qId, optIdx]) => {
    return acc + 1; // simple demonstration accumulation
  }, 0);

  const resetMcqs = () => {
    setUserMcqAnswers({});
    setShowMcqExplanations({});
  };

  return (
    <div className="space-y-2.5 py-1 text-black font-sans">
      {/* Header Banner - Compact */}
      <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#C70234]/30 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] text-[10px] font-mono font-bold">
              Examination Preparation Suite
            </span>
            <span className="text-[10px] font-mono text-gray-500 font-semibold">
              Five 10-Mark Questions • Twenty 1-Mark MCQs
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black text-[#FEF08A]">
            Pattern: 5 Long (50M) + 20 MCQs (20M)
          </span>
        </div>

        <h1 className="font-serif text-lg sm:text-2xl font-bold text-black tracking-tight leading-snug">
          {subject?.name || 'Academic'} Examination Training & Mock Assessment
        </h1>

        <p className="text-xs text-gray-700 leading-relaxed max-w-3xl">
          Model answers organized under <strong>Definition → Purpose → Workflow → Explanation → Use Case → Limitations → Conclusion</strong>, accompanied by unit-wise MCQ practice and timed mock exam modes.
        </p>

        {/* Mode Switcher Tabs */}
        <div className="pt-2 border-t border-[#DADCE0] flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'long-answers', label: '1. 10-Mark Long Answers (5 Questions)' },
              { id: 'mcq-practice', label: '2. 1-Mark MCQ Practice (20 Questions)' },
              { id: 'mock-exam', label: '3. Timed Mock Examination' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveMode(tab.id as any)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all border cursor-pointer ${
                  activeMode === tab.id
                    ? 'bg-[#C70234] text-white border-[#C70234] shadow-xs'
                    : 'bg-[#FAF9F5] text-gray-700 border-[#DADCE0] hover:border-[#FBBC05]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Unit Filter */}
          <div className="flex items-center gap-1 text-xs">
            <span className="font-mono text-[10px] font-bold text-gray-500">Unit:</span>
            <select
              value={selectedUnit}
              onChange={e => setSelectedUnit(e.target.value)}
              className="p-1 rounded bg-[#FAF9F5] border border-[#DADCE0] text-xs font-mono font-bold text-black cursor-pointer"
            >
              <option value="all">All 5 Units</option>
              {units.map(u => (
                <option key={u.id} value={u.id}>Unit {u.unitNumber}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* MODE 1: 10-MARK LONG ANSWER QUESTIONS */}
      {activeMode === 'long-answers' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#92400E]">
            <span>Model 10-Mark Structured Solutions ({filteredTenMark.length})</span>
            <span className="text-gray-500 font-normal">Click question to expand solution</span>
          </div>

          {filteredTenMark.map((q, idx) => {
            const isExpanded = expandedAnswers[q.id] ?? (idx === 0);
            return (
              <div
                key={q.id}
                className="bg-white rounded-lg border border-[#DADCE0] shadow-2xs overflow-hidden transition-all hover:border-[#FBBC05]"
              >
                {/* Question Header */}
                <div
                  onClick={() => toggleAnswer(q.id)}
                  className="p-3 cursor-pointer bg-[#FAF9F5] hover:bg-[#FEF7E0]/40 flex items-start justify-between gap-2"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.2 rounded bg-black text-white text-[9px] font-mono font-bold">
                        Question {idx + 1}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-[#C70234] text-white text-[9px] font-mono font-bold">
                        {q.marks} MARKS
                      </span>
                      <span className="text-[10px] font-mono text-[#92400E] font-semibold">
                        Unit {q.unitId.replace('unit-', '')}
                      </span>
                    </div>
                    <h3 className="font-serif text-xs sm:text-sm font-bold text-black leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <button className="p-1 text-gray-500 hover:text-[#C70234] shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#C70234]" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Answer Outline Pills */}
                <div className="px-3 py-1.5 bg-white border-t border-[#DADCE0] flex flex-wrap items-center gap-1 text-[10px] font-mono">
                  <span className="font-bold text-gray-500">Structure:</span>
                  {q.answerOutline.map((point, i) => (
                    <span key={i} className="px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]">
                      {point.split(':')[0]}
                    </span>
                  ))}
                </div>

                {/* Model Answer Body */}
                {isExpanded && (
                  <div className="p-3 sm:p-4 bg-white border-t border-[#DADCE0] space-y-3 text-xs leading-relaxed font-sans text-gray-800">
                    <div className="prose prose-xs max-w-none text-black">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {q.modelAnswer}
                      </ReactMarkdown>
                    </div>

                    {/* Self-Assessment Rubric */}
                    <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#DADCE0] space-y-1.5 font-sans">
                      <span className="font-bold text-black text-[11px] font-serif block">
                        Self-Assessment Grading Checklist (10 Marks):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-gray-700">
                        <label className="flex items-center gap-1.5">
                          <input type="checkbox" className="accent-[#C70234]" />
                          <span>Clear definition & scientific purpose stated (2M)</span>
                        </label>
                        <label className="flex items-center gap-1.5">
                          <input type="checkbox" className="accent-[#C70234]" />
                          <span>Detailed technical workflow diagram included (2M)</span>
                        </label>
                        <label className="flex items-center gap-1.5">
                          <input type="checkbox" className="accent-[#C70234]" />
                          <span>Exhaustive technical mechanism & algorithms explained (3M)</span>
                        </label>
                        <label className="flex items-center gap-1.5">
                          <input type="checkbox" className="accent-[#C70234]" />
                          <span>Concrete bank investigation use case demonstrated (2M)</span>
                        </label>
                        <label className="flex items-center gap-1.5 sm:col-span-2">
                          <input type="checkbox" className="accent-[#C70234]" />
                          <span>Technical limitations & defense boundaries conceded (1M)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* MODE 2: 1-MARK MCQ PRACTICE */}
      {activeMode === 'mcq-practice' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#92400E]">
            <span>Unit-Wise Multiple Choice Questions ({filteredMcq.length})</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Answered: {totalAttempted}/{filteredMcq.length}</span>
              <button
                onClick={resetMcqs}
                className="text-[10px] text-[#C70234] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {filteredMcq.map((mcq, idx) => {
              const isAnswered = userMcqAnswers[mcq.id] !== undefined;
              return (
                <div
                  key={mcq.id}
                  className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2 hover:border-[#FBBC05]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-1.5 py-0.2 rounded bg-black text-white text-[9px] font-mono font-bold shrink-0">
                      MCQ {idx + 1}
                    </span>
                    <h3 className="font-serif text-xs font-bold text-black flex-1">
                      {mcq.question}
                    </h3>
                    <span className="text-[10px] font-mono text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05] shrink-0">
                      Unit {mcq.unitId.replace('unit-', '')}
                    </span>
                  </div>

                  {/* Options (Simulated or from concept quiz) */}
                  <div className="pt-1">
                    <button
                      onClick={() => setShowMcqExplanations(prev => ({ ...prev, [mcq.id]: !prev[mcq.id] }))}
                      className="px-2 py-1 rounded bg-[#FAF9F5] border border-[#DADCE0] hover:border-[#C70234] text-xs font-bold text-[#C70234] transition-colors cursor-pointer"
                    >
                      {showMcqExplanations[mcq.id] ? 'Hide Answer & Explanation' : 'Reveal Answer & Explanation'}
                    </button>
                  </div>

                  {showMcqExplanations[mcq.id] && (
                    <div className="p-2.5 bg-[#FAF9F5] rounded border border-[#DADCE0] text-xs space-y-1">
                      <div className="font-bold text-[#188038]">
                        Model Answer: {mcq.modelAnswer}
                      </div>
                      <div className="text-gray-700 text-[11px] leading-snug">
                        <strong>Exam Keywords:</strong> {mcq.importantKeywords.join(' • ')}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 3: TIMED MOCK EXAMINATION */}
      {activeMode === 'mock-exam' && (
        <div className="space-y-2.5">
          <div className="bg-white rounded-lg p-3 border-2 border-black shadow-xs flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#C70234] font-bold">Comprehensive Assessment Mode</div>
              <h2 className="font-serif text-base font-bold text-black">
                Full Subject Mock Examination (70 Marks Total)
              </h2>
              <div className="text-xs text-gray-600">5 Long Answer Questions (50M) + 20 MCQs (20M)</div>
            </div>

            {/* Timer Controller */}
            <div className="flex items-center gap-2 bg-[#FAF9F5] px-3 py-1.5 rounded border border-[#DADCE0]">
              <Clock className="w-4 h-4 text-[#C70234]" />
              <div className="font-mono text-base font-black text-black">
                {formatTimer(mockTimerSeconds)}
              </div>
              <button
                onClick={() => setIsTimerRunning(prev => !prev)}
                className={`px-2 py-0.5 rounded text-xs font-mono font-bold cursor-pointer ${
                  isTimerRunning ? 'bg-[#C70234] text-white' : 'bg-[#188038] text-white'
                }`}
              >
                {isTimerRunning ? 'Pause' : 'Start Timer'}
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#FEF7E0] border border-[#FBBC05] rounded-lg text-xs space-y-1">
            <span className="font-bold text-[#92400E] block">Exam Instructions:</span>
            <ul className="list-disc list-inside text-gray-800 space-y-0.5">
              <li>Section A: Attempt all 20 MCQs (1 mark each).</li>
              <li>Section B: Answer all 5 descriptive questions (10 marks each) structured under the 7-tier model format.</li>
              <li>Use the self-assessment rubric below each question to evaluate your conceptual depth upon completion.</li>
            </ul>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setMockSubmitted(true);
                setIsTimerRunning(false);
              }}
              className="px-4 py-2 bg-[#C70234] text-white rounded text-xs font-bold hover:bg-[#A00028] shadow-xs cursor-pointer"
            >
              Finish & Review Mock Examination
            </button>
          </div>

          {mockSubmitted && (
            <div className="p-4 bg-white rounded-lg border-2 border-[#188038] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#188038] mx-auto" />
              <h3 className="font-serif text-base font-bold text-black">Mock Examination Completed!</h3>
              <p className="text-xs text-gray-700 max-w-md mx-auto">
                Review the model answers and checklists provided under Section 1 (Long Answers) to calculate your estimated score.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};