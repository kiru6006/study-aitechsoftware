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
      <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
        <h2 className="font-serif text-lg font-semibold text-slate-900">Concept not found</h2>
        <p className="text-xs text-slate-500 mt-1">
          The concept '{conceptId}' could not be loaded for subject '{subjectId}'.
        </p>
        <Link to={`/${subjectId}`} className="inline-block mt-3 text-xs font-medium text-slate-900 underline">
          Return to subject overview
        </Link>
      </div>
    );
  }

  const parentUnit = units.find(u => u.id === concept.unitId);

  const currentIndex = allConcepts.findIndex(c => c.id === conceptId);
  const prevConcept = currentIndex > 0 ? allConcepts[currentIndex - 1] : null;
  const nextConcept = currentIndex < allConcepts.length - 1 ? allConcepts[currentIndex + 1] : null;

  return (
    <div className="space-y-6 pb-16">
      {/* Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
          <Link to={`/${subjectId}`} className="hover:text-slate-900 transition-colors">
            AI for Cyber Security
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          {parentUnit && (
            <Link
              to={`/${subjectId}/units/${parentUnit.id}`}
              className="hover:text-slate-900 transition-colors"
            >
              Unit {parentUnit.unitNumber}
            </Link>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-xs">
            {concept.title}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleBookmark}
            className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark concept'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-600' : 'text-slate-400'}`} />
            <span className="hidden sm:inline text-xs">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleToggleComplete}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-2xs'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completed' : 'Mark done'}</span>
          </button>
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-3.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            {parentUnit ? `Unit ${parentUnit.unitNumber}` : 'Module'}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {concept.id}
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
          {concept.title}
        </h1>

        {/* Definition Box */}
        <div className="p-4 rounded-xl bg-slate-50 border-l-2 border-[#9F1239] space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-medium">
            Core Definition
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
            {concept.understanding.definition}
          </p>
        </div>

        {concept.understanding.rationale && (
          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            <strong className="text-slate-900 font-medium">Why it matters:</strong> {concept.understanding.rationale}
          </p>
        )}
      </div>

      {/* Theory & Terminology */}
      <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <BookOpen className="w-4 h-4 text-slate-500" />
          <h2 className="font-serif text-base font-semibold text-slate-900">
            Theoretical Foundation & Terminology
          </h2>
        </div>

        {/* Terminology Grid */}
        {concept.understanding.terminology && concept.understanding.terminology.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-900 block">
              Essential Terminology:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {concept.understanding.terminology.map((t, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                  <span className="text-xs font-semibold text-slate-900 block">{t.term}</span>
                  <span className="text-xs text-slate-600 mt-0.5 block leading-relaxed">
                    {t.explanation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="prose prose-slate max-w-none text-xs leading-relaxed border-t border-slate-100 pt-3 text-slate-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {concept.understanding.markdownContent}
          </ReactMarkdown>
        </div>
      </section>

      {/* Visual Workflow */}
      {concept.visualization && (
        <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-3.5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Eye className="w-4 h-4 text-slate-500" />
            <h2 className="font-serif text-base font-semibold text-slate-900">
              Visual Architecture
            </h2>
          </div>

          {concept.visualization.diagramTitle && (
            <h3 className="text-xs font-semibold text-slate-800">
              {concept.visualization.diagramTitle}
            </h3>
          )}

          {concept.visualization.diagramSource && (
            <div className="p-4 rounded-xl bg-[#18181B] text-[#E4E4E7] font-mono text-xs overflow-x-auto border border-slate-800">
              <pre className="whitespace-pre m-0">{concept.visualization.diagramSource}</pre>
            </div>
          )}

          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            {concept.visualization.explanation}
          </p>
        </section>
      )}

      {/* Real-World Application & Code */}
      {concept.application && (
        <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase className="w-4 h-4 text-slate-500" />
            <h2 className="font-serif text-base font-semibold text-slate-900">
              Industry Application & Code
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-medium">
              {concept.application.industry} Scenario
            </span>
            <p className="text-xs text-slate-800 font-medium leading-relaxed mt-1">
              {concept.application.scenario}
            </p>
          </div>

          {/* Process Steps */}
          {concept.application.processSteps.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold text-slate-900 block">
                Algorithmic Process Flow:
              </span>
              <div className="space-y-1.5">
                {concept.application.processSteps.map((step, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded bg-slate-200/70 text-slate-700 font-mono text-[10px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Block */}
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
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2 text-xs">
              <span className="font-semibold text-slate-900 block">Worked Numerical Problem:</span>
              <p className="text-slate-600">{concept.application.numericalExample.problem}</p>
              <div className="p-2.5 rounded-lg bg-white font-mono text-[11px] text-slate-800 border border-slate-200">
                {concept.application.numericalExample.formula}
              </div>
              <p className="text-emerald-700 font-mono text-[11px]">
                {concept.application.numericalExample.solution}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Comparison */}
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

      {/* Study Notes */}
      <StudyNotes
        shortContent={concept.exam?.shortDefinition}
        mediumContent={concept.exam?.fiveMarkAnswer}
        detailedContent={concept.exam?.tenMarkAnswer || concept.exam?.sixteenMarkAnswer}
        keywords={concept.memory?.keywords}
        keyFormulas={concept.exam?.keyFormulas}
      />

      {/* Memory Tricks & Pitfalls */}
      {concept.memory && (
        <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Lightbulb className="w-4 h-4 text-slate-500" />
            <h2 className="font-serif text-base font-semibold text-slate-900">
              Memory Tricks & Exam Pitfalls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {concept.memory.mnemonic && (
              <div className="p-3.5 rounded-lg bg-amber-50/50 border border-amber-200/60 space-y-1">
                <span className="text-[11px] font-semibold text-amber-800 block">
                  Mnemonic Memory Anchor:
                </span>
                <p className="text-xs font-medium text-slate-800">{concept.memory.mnemonic}</p>
              </div>
            )}

            {concept.memory.commonMistakes && concept.memory.commonMistakes.length > 0 && (
              <div className="p-3.5 rounded-lg bg-rose-50/50 border border-rose-200/60 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-800">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Common Pitfalls to Avoid:</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {concept.memory.commonMistakes.map((m, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Knowledge Check */}
      {concept.quiz && concept.quiz.length > 0 && (
        <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <h2 className="font-serif text-base font-semibold text-slate-900">
                Concept Knowledge Check
              </h2>
            </div>
            <span className="text-xs font-sans text-slate-500">
              {concept.quiz.length} Questions
            </span>
          </div>

          <div className="space-y-3">
            {concept.quiz.map((q, idx) => {
              const selectedOpt = selectedQuizAnswers[q.id];
              const hasAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2.5">
                  <span className="text-xs font-medium text-slate-900 block">
                    {idx + 1}. {q.question}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300';
                      if (hasAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-medium';
                        } else if (optIdx === selectedOpt) {
                          btnStyle = 'bg-rose-50 border-rose-300 text-rose-800 font-medium';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={hasAnswered}
                          onClick={() => handleQuizSelect(q.id, optIdx)}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {hasAnswered && (
                    <div className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                      isCorrect ? 'bg-emerald-50/70 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      <strong>{isCorrect ? 'Correct. ' : 'Explanation: '}</strong>
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[150px] sm:max-w-none">{prevConcept.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextConcept && (
          <Link
            to={`/${subjectId}/concepts/${nextConcept.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-white transition-colors shadow-2xs"
          >
            <span className="truncate max-w-[150px] sm:max-w-none">{nextConcept.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
