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
  getSubjectMetadata,
  getCompletedConcepts,
  toggleConceptCompleted,
  getBookmarkedConcepts,
  toggleConceptBookmark
} from '../lib/contentLoader';

import { CodeBlock } from '../components/learning/CodeBlock';
import { StudyNotes } from '../components/learning/StudyNotes';
import { ConceptComparison } from '../components/learning/ConceptComparison';

export const ConceptPage: React.FC = () => {
  const { subjectId = 'cyber-forensics', conceptId = '' } = useParams<{
    subjectId?: string;
    conceptId?: string;
  }>();

  const metadata = getSubjectMetadata(subjectId);
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
      <div className="bg-white rounded-lg p-4 text-center border border-[#C70234]">
        <h2 className="font-serif text-sm font-bold text-black">Concept Not Found</h2>
        <p className="text-xs text-gray-600 mt-1">
          The concept '{conceptId}' could not be loaded for subject '{subjectId}'.
        </p>
        <Link to={`/${subjectId}`} className="inline-block mt-2 text-xs font-bold text-[#C70234]">
          Return to Overview
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
    <div className="space-y-2.5 pb-8 text-black font-sans">
      {/* Breadcrumb Header - Compact */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-3 py-2 rounded-lg border border-[#C70234]/30 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Link to={`/${subjectId}`} className="hover:text-[#C70234] font-medium transition-colors">
            {metadata?.name || 'Subject'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          {parentUnit && (
            <Link
              to={`/${subjectId}/units/${parentUnit.id}`}
              className="hover:text-[#C70234] font-medium transition-colors"
            >
              Unit {parentUnit.unitNumber}
            </Link>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-bold text-[#C70234] truncate max-w-[200px] sm:max-w-xs">
            {concept.title}
          </span>
        </div>

        {/* Action buttons: Mark complete & Bookmark */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToggleBookmark}
            className={`p-1 rounded border text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#FEF7E0] border-[#FBBC05] text-[#92400E]'
                : 'bg-white border-[#DADCE0] text-gray-600 hover:border-[#FBBC05]'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Concept'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#FBBC05]' : ''}`} />
            <span className="hidden sm:inline text-[10px]">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleToggleComplete}
            className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-[#E6F4EA] text-[#188038] border border-[#34A853]/40'
                : 'bg-[#C70234] hover:bg-[#A00028] text-white shadow-2xs'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[10.5px]">{isCompleted ? 'Mastered' : 'Mark Done'}</span>
          </button>
        </div>
      </div>

      {/* Concept Hero Card - Compact */}
      <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#C70234]/30 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase font-bold px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]">
            {parentUnit ? `Unit ${parentUnit.unitNumber}` : 'Module'} Concept
          </span>
          <span className="text-[10px] font-mono text-gray-500">
            ID: {concept.id}
          </span>
        </div>

        <h1 className="font-serif text-lg sm:text-xl font-bold text-black tracking-tight leading-snug">
          {concept.title}
        </h1>

        {/* Definition Box */}
        <div className="p-2.5 rounded bg-[#FAF9F5] border-l-4 border-[#C70234] border-t border-r border-b border-[#DADCE0] space-y-0.5">
          <span className="text-[9px] uppercase font-mono font-bold text-[#C70234] block">
            Core Definition
          </span>
          <p className="text-xs font-medium text-black leading-relaxed">
            {concept.understanding.definition}
          </p>
        </div>

        {concept.understanding.rationale && (
          <div className="text-xs text-gray-700 leading-relaxed pt-0.5">
            <strong className="text-black">Why Crucial: </strong>{concept.understanding.rationale}
          </div>
        )}
      </div>

      {/* Terminology & Markdown Content */}
      <section className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-2.5">
        <div className="flex items-center gap-1.5 border-b border-[#DADCE0] pb-1.5">
          <BookOpen className="w-4 h-4 text-[#C70234]" />
          <h2 className="font-serif text-sm font-bold text-black">
            Theoretical Foundation & Terminology
          </h2>
        </div>

        {concept.understanding.terminology && concept.understanding.terminology.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-[#92400E] uppercase block">
              Key Terminology & Definitions:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {concept.understanding.terminology.map((t, idx) => (
                <div key={idx} className="p-2 rounded bg-[#FAF9F5] border border-[#DADCE0] space-y-0.5">
                  <span className="text-xs font-bold text-[#C70234] block">{t.term}</span>
                  <span className="text-[10.5px] text-gray-700 block leading-snug">
                    {t.explanation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Markdown Extended Notes */}
        <div className="pt-2 border-t border-[#DADCE0] prose prose-xs max-w-none text-black">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {concept.understanding.markdownContent}
          </ReactMarkdown>
        </div>
      </section>

      {/* Practical Application & Code */}
      {concept.application && (
        <section className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-2">
          <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#D97706]" />
              <h2 className="font-serif text-sm font-bold text-black">
                Industry Scenario & Verification
              </h2>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] font-bold">
              {concept.application.industry}
            </span>
          </div>

          <div className="p-2.5 bg-[#FAF9F5] rounded border border-[#DADCE0] text-xs space-y-1">
            <span className="font-bold text-black block">Operational Scenario:</span>
            <p className="text-gray-700 leading-snug">{concept.application.scenario}</p>
          </div>

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

          {concept.application.numericalExample && (
            <div className="p-2.5 bg-[#FEF7E0] border border-[#FBBC05] rounded text-xs space-y-1">
              <span className="font-bold text-[#92400E] block font-serif">Quantitative Numerical Problem:</span>
              <p className="text-gray-800 leading-snug">{concept.application.numericalExample.problem}</p>
              <div className="p-1.5 bg-black text-[#FEF08A] font-mono text-[10px] rounded">
                Formula: {concept.application.numericalExample.formula}
              </div>
              <div className="text-[11px] text-[#188038] font-bold">
                Solution: {concept.application.numericalExample.solution}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Exam Study Notes */}
      {concept.exam && (
        <StudyNotes
          shortContent={concept.exam.shortDefinition}
          mediumContent={concept.exam.fiveMarkAnswer}
          detailedContent={concept.exam.tenMarkAnswer}
          keywords={concept.memory?.keywords}
          keyFormulas={concept.exam.keyFormulas}
        />
      )}

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-1 text-xs font-bold">
        {prevConcept ? (
          <Link
            to={`/${subjectId}/concepts/${prevConcept.id}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-[#DADCE0] hover:border-[#C70234] text-black hover:text-[#C70234] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="truncate max-w-[140px] sm:max-w-none">{prevConcept.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextConcept && (
          <Link
            to={`/${subjectId}/concepts/${nextConcept.id}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#C70234] hover:bg-[#A00028] text-white transition-colors shadow-2xs"
          >
            <span className="truncate max-w-[140px] sm:max-w-none">{nextConcept.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};