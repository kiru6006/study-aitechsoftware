import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  BookOpen,
  Eye,
  Briefcase,
  Lightbulb,
  GraduationCap,
  HelpCircle,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Code2,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import {
  getConceptById,
  getSubjectUnits,
  getSubjectConcepts,
  getCompletedConcepts,
  toggleConceptCompleted,
  getBookmarkedConcepts,
  toggleConceptBookmark
} from '../lib/contentLoader';

export const ConceptPage: React.FC = () => {
  const { subjectId = 'ai-cyber-security', conceptId = '' } = useParams<{
    subjectId?: string;
    conceptId?: string;
  }>();

  const concept = getConceptById(subjectId, conceptId);
  const units = getSubjectUnits(subjectId);
  const allConcepts = getSubjectConcepts(subjectId);

  const [activeExamTab, setActiveExamTab] = useState<'short' | '5m' | '10m' | '16m'>('5m');
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [copiedCode, setCopiedCode] = useState(false);

  // Persistence local states
  const [isCompleted, setIsCompleted] = useState<boolean>(() =>
    getCompletedConcepts().includes(conceptId)
  );
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() =>
    getBookmarkedConcepts().includes(conceptId)
  );

  const handleToggleComplete = () => {
    const updated = toggleConceptCompleted(conceptId);
    setIsCompleted(updated);
  };

  const handleToggleBookmark = () => {
    const updated = toggleConceptBookmark(conceptId);
    setIsBookmarked(updated);
  };

  const handleQuizSelect = (questionId: string, optionIndex: number) => {
    setSelectedQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!concept) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-[#DADCE0]">
        <h2 className="font-serif text-xl font-bold text-[#202124]">Concept Not Found</h2>
        <p className="text-xs text-[#5F6368] mt-2">
          The concept '{conceptId}' could not be loaded for subject '{subjectId}'.
        </p>
        <Link to={`/${subjectId}`} className="inline-block mt-4 text-xs font-semibold text-[#1A73E8]">
          Back to Subject
        </Link>
      </div>
    );
  }

  // Find parent unit
  const parentUnit = units.find(u => u.id === concept.unitId);

  // Pagination next / prev
  const currentIndex = allConcepts.findIndex(c => c.id === conceptId);
  const prevConcept = currentIndex > 0 ? allConcepts[currentIndex - 1] : null;
  const nextConcept = currentIndex < allConcepts.length - 1 ? allConcepts[currentIndex + 1] : null;

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#DADCE0] mat-elevation-1">
        <div className="flex items-center gap-2 text-xs font-sans text-[#5F6368]">
          <Link to={`/${subjectId}`} className="hover:text-[#1A73E8]">
            AI for Cyber Security
          </Link>
          <ChevronRight className="w-3 h-3 text-[#DADCE0]" />
          <span className="font-medium text-[#202124]">
            {parentUnit ? `Unit ${parentUnit.unitNumber}` : 'Concepts'}
          </span>
          <ChevronRight className="w-3 h-3 text-[#DADCE0]" />
          <span className="text-[#C70234] font-semibold truncate max-w-[200px]">
            {concept.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleBookmark}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
              isBookmarked
                ? 'bg-[#FEF7E0] text-[#B06000] border border-[#FBBC05]'
                : 'bg-[#F1F3F4] text-[#5F6368] hover:bg-[#DADCE0]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleToggleComplete}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
              isCompleted
                ? 'bg-[#E6F4EA] text-[#188038] border border-[#34A853]'
                : 'bg-[#188038] text-white hover:bg-[#136C30]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
          </button>
        </div>
      </div>

      {/* Concept Title Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C70234]/10 text-[#C70234]">
            {parentUnit?.officialTitle || 'CORE CONCEPT'}
          </span>
          {parentUnit?.memoryCode && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FEF7E0] text-[#B06000]">
              Code: {parentUnit.memoryCode}
            </span>
          )}
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
          {concept.title}
        </h1>

        {/* Section Jump Pills */}
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-sans">
          <a
            href="#understand"
            className="px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1A73E8] font-medium hover:bg-[#1A73E8] hover:text-white transition-colors"
          >
            A. Understand
          </a>
          {concept.visualization && (
            <a
              href="#visualize"
              className="px-3 py-1 rounded-full bg-[#F3E8FD] text-[#A142F4] font-medium hover:bg-[#A142F4] hover:text-white transition-colors"
            >
              B. Visualize
            </a>
          )}
          {concept.application && (
            <a
              href="#apply"
              className="px-3 py-1 rounded-full bg-[#E0F7FA] text-[#00838F] font-medium hover:bg-[#00838F] hover:text-white transition-colors"
            >
              C. Apply
            </a>
          )}
          {concept.memory && (
            <a
              href="#remember"
              className="px-3 py-1 rounded-full bg-[#FEF7E0] text-[#B06000] font-medium hover:bg-[#B06000] hover:text-white transition-colors"
            >
              D. Remember
            </a>
          )}
          {concept.exam && (
            <a
              href="#exam"
              className="px-3 py-1 rounded-full bg-[#FCE8EF] text-[#C70234] font-medium hover:bg-[#C70234] hover:text-white transition-colors"
            >
              E. Exam Prep
            </a>
          )}
          {concept.quiz && concept.quiz.length > 0 && (
            <a
              href="#quiz"
              className="px-3 py-1 rounded-full bg-[#E6F4EA] text-[#188038] font-medium hover:bg-[#188038] hover:text-white transition-colors"
            >
              F. Check Understanding
            </a>
          )}
        </div>
      </div>

      {/* SECTION A: UNDERSTAND */}
      <section id="understand" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-6">
        <div className="flex items-center gap-2 border-b border-[#DADCE0]/60 pb-3">
          <BookOpen className="w-5 h-5 text-[#1A73E8]" />
          <h2 className="font-serif text-xl font-bold text-[#202124]">
            A. Understand the Concept
          </h2>
        </div>

        {/* Definition Highlight Box */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border-l-4 border-[#1A73E8]">
          <h3 className="text-xs font-semibold text-[#1A73E8] uppercase tracking-wider">
            Canonical Academic Definition
          </h3>
          <p className="mt-1 text-sm font-sans text-[#202124] leading-relaxed font-medium">
            {concept.understanding.definition}
          </p>
        </div>

        {/* Why it exists */}
        <div>
          <h3 className="font-serif text-base font-bold text-[#202124] mb-1">
            Why Does This Concept Exist?
          </h3>
          <p className="text-xs text-[#5F6368] font-sans leading-relaxed">
            {concept.understanding.rationale}
          </p>
        </div>

        {/* Essential Terminology */}
        {concept.understanding.terminology.length > 0 && (
          <div>
            <h3 className="font-serif text-base font-bold text-[#202124] mb-3">
              Essential Terminology
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {concept.understanding.terminology.map((t, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#F1F3F4]/60 border border-[#DADCE0]/60">
                  <span className="text-xs font-bold text-[#202124] block">{t.term}</span>
                  <span className="text-[11px] text-[#5F6368] mt-0.5 block leading-normal">
                    {t.explanation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Theory Markdown */}
        <div className="prose prose-slate max-w-none text-xs leading-relaxed border-t border-[#DADCE0]/60 pt-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {concept.understanding.markdownContent}
          </ReactMarkdown>
        </div>
      </section>

      {/* SECTION B: VISUALIZE */}
      {concept.visualization && (
        <section id="visualize" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#DADCE0]/60 pb-3">
            <Eye className="w-5 h-5 text-[#A142F4]" />
            <h2 className="font-serif text-xl font-bold text-[#202124]">
              B. Visualize the Workflow
            </h2>
          </div>

          {concept.visualization.diagramTitle && (
            <h3 className="text-sm font-bold text-[#202124]">
              {concept.visualization.diagramTitle}
            </h3>
          )}

          {concept.visualization.diagramSource && (
            <div className="p-4 rounded-xl bg-[#202124] text-slate-100 font-mono text-xs overflow-x-auto">
              <pre className="whitespace-pre">{concept.visualization.diagramSource}</pre>
            </div>
          )}

          <p className="text-xs text-[#5F6368] font-sans leading-relaxed pt-1">
            {concept.visualization.explanation}
          </p>
        </section>
      )}

      {/* SECTION C: APPLY */}
      {concept.application && (
        <section id="apply" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-5">
          <div className="flex items-center gap-2 border-b border-[#DADCE0]/60 pb-3">
            <Briefcase className="w-5 h-5 text-[#00ACC1]" />
            <h2 className="font-serif text-xl font-bold text-[#202124]">
              C. Apply in the Real World
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-[#E0F7FA]/40 border border-[#00ACC1]/30">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00ACC1] text-white uppercase">
                {concept.application.industry} Case
              </span>
            </div>
            <p className="mt-2 text-xs text-[#202124] font-medium leading-relaxed">
              {concept.application.scenario}
            </p>
          </div>

          {concept.application.inputExample && (
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#202124] block">Input Telemetry Example:</span>
              <div className="p-3 bg-[#F1F3F4] rounded-lg font-mono text-[11px] text-[#202124] overflow-x-auto">
                {concept.application.inputExample}
              </div>
            </div>
          )}

          {/* Process Steps */}
          {concept.application.processSteps.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#202124] block">Algorithmic Process Steps:</span>
              <ol className="space-y-1.5 pl-4 list-decimal text-xs text-[#5F6368]">
                {concept.application.processSteps.map((step, i) => (
                  <li key={i} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Code Snippet */}
          {concept.application.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#202124] flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#1A73E8]" />
                  <span>{concept.application.codeSnippet.caption || 'Implementation Script'}</span>
                </span>
                <button
                  onClick={() => copyCodeToClipboard(concept.application!.codeSnippet!.code)}
                  className="text-[11px] text-[#5F6368] hover:text-[#202124] flex items-center gap-1"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-[#188038]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#202124] text-slate-100 font-mono text-xs overflow-x-auto">
                <pre>{concept.application.codeSnippet.code}</pre>
              </div>
            </div>
          )}

          {/* Worked Numerical Problem */}
          {concept.application.numericalExample && (
            <div className="p-4 rounded-xl bg-[#FEF7E0]/40 border border-[#FBBC05]/40 space-y-2">
              <span className="text-xs font-bold text-[#B06000] block uppercase tracking-wider">
                Worked Numerical Problem
              </span>
              <p className="text-xs text-[#202124] font-medium">
                {concept.application.numericalExample.problem}
              </p>
              <div className="text-[11px] font-mono text-[#5F6368] bg-white p-2 rounded border border-[#DADCE0]">
                Formula: {concept.application.numericalExample.formula}
              </div>
              <p className="text-xs text-[#188038] font-mono font-medium whitespace-pre-line">
                Solution: {concept.application.numericalExample.solution}
              </p>
            </div>
          )}
        </section>
      )}

      {/* SECTION D: REMEMBER */}
      {concept.memory && (
        <section id="remember" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-5">
          <div className="flex items-center gap-2 border-b border-[#DADCE0]/60 pb-3">
            <Lightbulb className="w-5 h-5 text-[#FBBC05]" />
            <h2 className="font-serif text-xl font-bold text-[#202124]">
              D. Remember & Retain
            </h2>
          </div>

          {concept.memory.mnemonic && (
            <div className="p-4 rounded-xl bg-[#FEF7E0] border border-[#FBBC05]/50 flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-[#FBBC05] text-[#202124] font-bold text-sm flex items-center justify-center shrink-0">
                Key
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#B06000]">Unit Memory Shortcut</span>
                <p className="text-sm font-bold text-[#202124]">{concept.memory.mnemonic}</p>
              </div>
            </div>
          )}

          {/* Keyword Badges */}
          <div>
            <span className="text-xs font-bold text-[#202124] block mb-2">Crucial Exam Keywords:</span>
            <div className="flex flex-wrap gap-1.5">
              {concept.memory.keywords.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-[#F1F3F4] text-[#202124] text-xs font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Common Exam Mistakes */}
          {concept.memory.commonMistakes.length > 0 && (
            <div className="p-4 rounded-xl bg-[#FCE8E6] border border-[#EA4335]/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D93025]">
                <AlertCircle className="w-4 h-4" />
                <span>Common Examination Pitfalls to Avoid:</span>
              </div>
              <ul className="mt-2 space-y-1 pl-4 list-disc text-xs text-[#202124]">
                {concept.memory.commonMistakes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* SECTION E: EXAM PREPARATION */}
      {concept.exam && (
        <section id="exam" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-5">
          <div className="flex items-center gap-2 border-b border-[#DADCE0]/60 pb-3">
            <GraduationCap className="w-5 h-5 text-[#C70234]" />
            <h2 className="font-serif text-xl font-bold text-[#202124]">
              E. Examination Model Answers
            </h2>
          </div>

          {/* Marks Selector Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#DADCE0] pb-2">
            {[
              { id: 'short', label: 'Short Definition (2M)' },
              { id: '5m', label: '5-Mark Answer' },
              { id: '10m', label: '10-Mark Answer' },
              { id: '16m', label: '16-Mark Master Answer' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveExamTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-colors ${
                  activeExamTab === tab.id
                    ? 'bg-[#C70234] text-white shadow-xs'
                    : 'bg-[#F1F3F4] text-[#5F6368] hover:bg-[#DADCE0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="prose prose-slate max-w-none text-xs leading-relaxed bg-[#F8FAFC] p-5 rounded-xl border border-[#DADCE0]">
            {activeExamTab === 'short' && (
              <p className="font-medium text-[#202124]">{concept.exam.shortDefinition}</p>
            )}

            {activeExamTab === '5m' && concept.exam.fiveMarkAnswer && (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {concept.exam.fiveMarkAnswer}
              </ReactMarkdown>
            )}

            {activeExamTab === '10m' && concept.exam.tenMarkAnswer && (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {concept.exam.tenMarkAnswer}
              </ReactMarkdown>
            )}

            {activeExamTab === '16m' && concept.exam.sixteenMarkAnswer && (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {concept.exam.sixteenMarkAnswer}
              </ReactMarkdown>
            )}
          </div>
        </section>
      )}

      {/* SECTION F: CHECK UNDERSTANDING */}
      {concept.quiz && concept.quiz.length > 0 && (
        <section id="quiz" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#DADCE0]/60 pb-3">
            <HelpCircle className="w-5 h-5 text-[#188038]" />
            <h2 className="font-serif text-xl font-bold text-[#202124]">
              F. Check Your Understanding
            </h2>
          </div>

          <div className="space-y-6">
            {concept.quiz.map((q, qIndex) => {
              const selected = selectedQuizAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correctIndex;

              return (
                <div key={q.id} className="p-4 rounded-xl border border-[#DADCE0] bg-[#F8FAFC] space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#188038] text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {qIndex + 1}
                    </span>
                    <h3 className="text-xs font-bold text-[#202124]">{q.question}</h3>
                  </div>

                  <div className="space-y-1.5 pl-7">
                    {q.options.map((opt, optIndex) => {
                      const isOptionSelected = selected === optIndex;
                      let optionStyle = 'border-[#DADCE0] bg-white hover:border-[#1A73E8]';

                      if (isAnswered) {
                        if (optIndex === q.correctIndex) {
                          optionStyle = 'border-[#34A853] bg-[#E6F4EA] font-semibold text-[#188038]';
                        } else if (isOptionSelected) {
                          optionStyle = 'border-[#EA4335] bg-[#FCE8E6] text-[#D93025]';
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleQuizSelect(q.id, optIndex)}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && optIndex === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-[#188038] shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`mt-2 p-3 rounded-lg text-xs font-sans ${isCorrect ? 'bg-[#E6F4EA] text-[#188038]' : 'bg-[#FCE8E6] text-[#D93025]'}`}>
                      <span className="font-bold block">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                      <span className="text-[11px] mt-0.5 block">{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Concept Navigation Prev / Next */}
      <div className="flex items-center justify-between pt-4 border-t border-[#DADCE0]">
        {prevConcept ? (
          <Link
            to={`/${subjectId}/concepts/${prevConcept.id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1A73E8] hover:text-[#185ABC]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="line-clamp-1">Prev: {prevConcept.title}</span>
          </Link>
        ) : <div />}

        {nextConcept ? (
          <Link
            to={`/${subjectId}/concepts/${nextConcept.id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1A73E8] hover:text-[#185ABC]"
          >
            <span className="line-clamp-1">Next: {nextConcept.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};
