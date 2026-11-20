import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  BookOpen,
  Eye,
  Briefcase,
  Lightbulb,
  HelpCircle,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Code2,
  AlertCircle
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

import { CodeBlock } from '../components/learning/CodeBlock';
import { StudyNotes } from '../components/learning/StudyNotes';
import { ConceptComparison } from '../components/learning/ConceptComparison';

export const ConceptPage: React.FC = () => {
  const { subjectId = 'ai-cyber-security', conceptId = '' } = useParams<{
    subjectId?: string;
    conceptId?: string;
  }>();

  const concept = getConceptById(subjectId, conceptId);
  const units = getSubjectUnits(subjectId);
  const allConcepts = getSubjectConcepts(subjectId);

  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});

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

  if (!concept) {
    return (
      <div className="bg-white rounded-xl p-6 text-center border border-[#C70234]/30">
        <h2 className="font-serif text-lg font-bold text-[#202124]">Concept Not Found</h2>
        <p className="text-xs text-[#5F6368] mt-1">
          The concept '{conceptId}' could not be loaded for subject '{subjectId}'.
        </p>
        <Link to={`/${subjectId}`} className="inline-block mt-3 text-xs font-semibold text-[#C70234]">
          Return to Subject Overview
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
    <div className="space-y-4 pb-12">
      {/* Breadcrumb Header with Red & Yellow Theme */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-[#C70234]/30 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-sans text-[#5F6368]">
          <Link to={`/${subjectId}`} className="hover:text-[#C70234] font-medium transition-colors">
            AI for Cyber Security
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#BDC1C6]" />
          {parentUnit && (
            <Link
              to={`/${subjectId}/units/${parentUnit.id}`}
              className="hover:text-[#C70234] font-medium transition-colors"
            >
              Unit {parentUnit.unitNumber}
            </Link>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-[#BDC1C6]" />
          <span className="font-semibold text-[#C70234] line-clamp-1 max-w-[200px] sm:max-w-xs">
            {concept.title}
          </span>
        </div>

        {/* Action buttons: Mark complete & Bookmark */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleBookmark}
            className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#FEF7E0] border-[#FBBC05] text-[#92400E]'
                : 'bg-white border-[#DADCE0] text-[#5F6368] hover:border-[#FBBC05]'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Concept'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#FBBC05]' : ''}`} />
            <span className="hidden sm:inline text-[11px]">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleToggleComplete}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-[#E6F4EA] text-[#188038] border border-[#34A853]/40'
                : 'bg-[#C70234] hover:bg-[#B6263A] text-white shadow-xs'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">{isCompleted ? 'Completed' : 'Mark Done'}</span>
          </button>
        </div>
      </div>

      {/* Concept Hero Card */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/40">
            {parentUnit ? `Unit ${parentUnit.unitNumber}` : 'Module'} Concept Deep Dive
          </span>
          <span className="text-[10px] font-mono text-[#80868B]">
            ID: {concept.id}
          </span>
        </div>

        <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#202124] tracking-tight">
          {concept.title}
        </h1>

        {/* Definition Highlight Box */}
        <div className="p-3.5 rounded-xl bg-[#FAF9F5] border-l-4 border-[#C70234] border-t border-r border-b border-[#FBBC05]/40 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#C70234] block">
            Core Definition
          </span>
          <p className="text-xs sm:text-sm font-medium text-[#202124] leading-relaxed">
            {concept.understanding.definition}
          </p>
        </div>

        {/* Why this concept matters */}
        {concept.understanding.rationale && (
          <div className="text-xs text-[#5F6368] leading-relaxed pt-1">
            <strong className="text-[#202124]">Why this concept is crucial:</strong> {concept.understanding.rationale}
          </div>
        )}
      </div>

      {/* SECTION A: THEORY & TERMINOLOGY */}
      <section className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-[#FBBC05]/40 pb-2">
          <BookOpen className="w-4 h-4 text-[#C70234]" />
          <h2 className="font-serif text-base font-bold text-[#202124]">
            Theoretical Foundation & Terminology
          </h2>
        </div>

        {/* Terminology Grid */}
        {concept.understanding.terminology && concept.understanding.terminology.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#92400E] uppercase tracking-wider block">
              Key Terminology & Definitions:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {concept.understanding.terminology.map((t, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#FAF9F5] border border-[#FBBC05]/30">
                  <span className="text-xs font-bold text-[#C70234] block">{t.term}</span>
                  <span className="text-[11px] text-[#5F6368] mt-0.5 block leading-snug">
                    {t.explanation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Theory Markdown */}
        <div className="prose prose-sm max-w-none text-xs leading-relaxed border-t border-[#DADCE0]/60 pt-3 text-[#202124]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {concept.understanding.markdownContent}
          </ReactMarkdown>
        </div>
      </section>

      {/* SECTION B: VISUALIZE */}
      {concept.visualization && (
        <section className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-[#FBBC05]/40 pb-2">
            <Eye className="w-4 h-4 text-[#C70234]" />
            <h2 className="font-serif text-base font-bold text-[#202124]">
              Visual Architecture & Workflow
            </h2>
          </div>

          {concept.visualization.diagramTitle && (
            <h3 className="text-xs font-bold text-[#202124]">
              {concept.visualization.diagramTitle}
            </h3>
          )}

          {concept.visualization.diagramSource && (
            <div className="p-3.5 rounded-xl bg-[#1E1E2E] text-[#CDD6F4] font-mono text-xs overflow-x-auto border border-[#FBBC05]/40">
              <pre className="whitespace-pre m-0">{concept.visualization.diagramSource}</pre>
            </div>
          )}

          <p className="text-xs text-[#5F6368] font-sans leading-relaxed">
            {concept.visualization.explanation}
          </p>
        </section>
      )}

      {/* SECTION C: REAL-WORLD APPLICATION & CODE */}
      {concept.application && (
        <section className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-[#FBBC05]/40 pb-2">
            <Briefcase className="w-4 h-4 text-[#C70234]" />
            <h2 className="font-serif text-base font-bold text-[#202124]">
              Industry Application & Code Example
            </h2>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FEF7E0]/40 border border-[#FBBC05]/40 space-y-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] uppercase border border-[#FBBC05]/50">
              {concept.application.industry} Case Study
            </span>
            <p className="text-xs text-[#202124] font-medium leading-relaxed mt-1">
              {concept.application.scenario}
            </p>
          </div>

          {/* Process Steps */}
          {concept.application.processSteps.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-[#202124] block">Algorithmic Process Steps:</span>
              <ol className="space-y-1 pl-4 list-decimal text-xs text-[#5F6368]">
                {concept.application.processSteps.map((step, i) => (
                  <li key={i} className="leading-snug">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Verified Code Snippet Component */}
          {concept.application.codeSnippet && (
            <CodeBlock
              language={concept.application.codeSnippet.language}
              caption={concept.application.codeSnippet.caption}
              code={concept.application.codeSnippet.code}
              sampleInput={concept.application.inputExample}
              expectedOutput={concept.application.outputExample}
              explanation={concept.application.processSteps}
            />
          )}

          {/* Numerical Worked Example */}
          {concept.application.numericalExample && (
            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#FBBC05]/40 space-y-1.5 text-xs">
              <span className="font-bold text-[#92400E] block">Worked Numerical Problem:</span>
              <p className="text-[#5F6368]">{concept.application.numericalExample.problem}</p>
              <div className="p-2 rounded bg-white font-mono text-[11px] text-[#202124] border border-[#DADCE0]">
                {concept.application.numericalExample.formula}
              </div>
              <p className="text-[#188038] font-medium font-mono text-[11px]">
                {concept.application.numericalExample.solution}
              </p>
            </div>
          )}
        </section>
      )}

      {/* SECTION D: COMPARISON IF AVAILABLE */}
      {concept.memory?.comparison && concept.memory.comparison.length > 0 && (
        <ConceptComparison
          title={`Comparative Contrast: ${concept.title}`}
          itemAName={concept.title}
          itemBName={concept.memory.comparison[0]?.otherConcept || 'Alternative Approach'}
          rows={concept.memory.comparison.map(c => ({
            dimension: 'Contrast Metric',
            itemA: 'Primary mechanism described in syllabus',
            itemB: c.difference,
            advantage: 'A'
          }))}
        />
      )}

      {/* SECTION E: STUDY NOTES (SHORT, MEDIUM, DETAILED) */}
      <StudyNotes
        shortContent={concept.exam?.shortDefinition}
        mediumContent={concept.exam?.fiveMarkAnswer}
        detailedContent={concept.exam?.tenMarkAnswer || concept.exam?.sixteenMarkAnswer}
        keywords={concept.memory?.keywords}
        keyFormulas={concept.exam?.keyFormulas}
      />

      {/* SECTION F: REVISION TRICKS & COMMON PITFALLS */}
      {concept.memory && (
        <section className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-[#FBBC05]/40 pb-2">
            <Lightbulb className="w-4 h-4 text-[#C70234]" />
            <h2 className="font-serif text-base font-bold text-[#202124]">
              Memory Tricks & Exam Pitfalls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {concept.memory.mnemonic && (
              <div className="p-3 rounded-lg bg-[#FEF7E0]/60 border border-[#FBBC05]/40 space-y-1">
                <span className="text-[11px] font-bold text-[#92400E] uppercase block">
                  Mnemonic Memory Anchor:
                </span>
                <p className="text-xs font-semibold text-[#202124]">{concept.memory.mnemonic}</p>
              </div>
            )}

            {concept.memory.commonMistakes && concept.memory.commonMistakes.length > 0 && (
              <div className="p-3 rounded-lg bg-[#FCE8EF]/50 border border-[#C70234]/30 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#C70234]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Common Pitfalls to Avoid:</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-xs text-[#202124]">
                  {concept.memory.commonMistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION G: SELF-ASSESSMENT QUIZ */}
      {concept.quiz && concept.quiz.length > 0 && (
        <section className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#FBBC05]/40 pb-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#C70234]" />
              <h2 className="font-serif text-base font-bold text-[#202124]">
                Concept Knowledge Check
              </h2>
            </div>
            <span className="text-[11px] font-medium text-[#188038]">
              {concept.quiz.length} Questions
            </span>
          </div>

          <div className="space-y-3">
            {concept.quiz.map((q, idx) => {
              const selectedOpt = selectedQuizAnswers[q.id];
              const hasAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-3 rounded-lg bg-[#FAF9F5] border border-[#FBBC05]/40 space-y-2">
                  <span className="text-xs font-semibold text-[#202124] block">
                    {idx + 1}. {q.question}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-white border-[#DADCE0] text-[#202124] hover:border-[#FBBC05]';
                      if (hasAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-[#E6F4EA] border-[#34A853] text-[#188038] font-bold';
                        } else if (optIdx === selectedOpt) {
                          btnStyle = 'bg-[#FCE8EF] border-[#C70234] text-[#C70234] font-bold';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={hasAnswered}
                          onClick={() => handleQuizSelect(q.id, optIdx)}
                          className={`p-2 rounded-lg border text-left text-xs transition-colors cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {hasAnswered && (
                    <div className={`p-2 rounded-lg text-xs leading-relaxed ${
                      isCorrect ? 'bg-[#E6F4EA] text-[#188038] border border-[#34A853]/40' : 'bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/40'
                    }`}>
                      <strong>{isCorrect ? 'Correct! ' : 'Explanation: '}</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2">
        {prevConcept ? (
          <Link
            to={`/${subjectId}/concepts/${prevConcept.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#C70234]/30 hover:border-[#C70234] text-xs font-semibold text-[#202124] hover:text-[#C70234] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="line-clamp-1 max-w-[150px] sm:max-w-none">{prevConcept.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextConcept && (
          <Link
            to={`/${subjectId}/concepts/${nextConcept.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C70234] hover:bg-[#B6263A] text-xs font-semibold text-white transition-colors shadow-xs"
          >
            <span className="line-clamp-1 max-w-[150px] sm:max-w-none">{nextConcept.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
