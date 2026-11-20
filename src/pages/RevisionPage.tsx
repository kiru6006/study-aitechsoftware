import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Sparkles,
  KeyRound,
  CheckSquare,
  Square,
  FileSpreadsheet
} from 'lucide-react';
import {
  getSubjectRevision,
  getRevisionChecklistState,
  toggleChecklistItem
} from '../lib/contentLoader';

export const RevisionPage: React.FC = () => {
  const { subjectId = 'ai-cyber-security' } = useParams<{ subjectId?: string }>();
  const revision = getSubjectRevision(subjectId);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(() =>
    getRevisionChecklistState()
  );

  const handleToggleChecklist = (id: string) => {
    const updated = toggleChecklistItem(id);
    setChecklistState(updated);
  };

  if (!revision) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
        <p className="text-xs text-slate-500">No revision pack available for this subject.</p>
      </div>
    );
  }

  const currentFlashcard = revision.flashcards[currentCardIndex];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium">
            Rapid Revision
          </span>
          <span className="text-xs text-slate-500 font-sans">
            Mnemonics, Formulas & Flashcards
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
          Quick Revision Hub & Memory Codes
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Retain core concepts through unit mnemonics, formula references, and interactive flashcards. Designed for rapid review before academic assessments.
        </p>

        {/* Master Memory Sequence */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Cognitive Progression:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {revision.masterMemorySequence.map((seq, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60 text-xs font-medium text-slate-700 flex items-center gap-1.5"
              >
                <span className="w-4 h-4 rounded bg-slate-200/80 text-slate-700 font-mono text-[10px] flex items-center justify-center font-semibold">
                  {i + 1}
                </span>
                <span>{seq}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Unit Memory Codes */}
      <div className="space-y-3">
        <h2 className="font-serif text-base font-semibold text-slate-900 flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-slate-500" />
          <span>Official Unit Memory Codes</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {revision.unitMemoryCodes.map(codeItem => (
            <div
              key={codeItem.unitNumber}
              className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  Unit {codeItem.unitNumber}
                </span>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60 tracking-wider">
                  {codeItem.code}
                </span>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                {codeItem.meaning}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-1">
                {codeItem.breakdown.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <span className="font-mono font-medium text-slate-500 w-4 shrink-0">
                      {b.letter}:
                    </span>
                    <span className="text-slate-700">{b.concept}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Flashcards */}
      {revision.flashcards.length > 0 && (
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-serif text-base font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-500" />
              <span>Interactive Flashcards</span>
            </h2>
            <span className="text-xs font-sans text-slate-500">
              Card {currentCardIndex + 1} of {revision.flashcards.length}
            </span>
          </div>

          <div
            onClick={() => setIsFlipped(prev => !prev)}
            className="cursor-pointer min-h-[160px] p-6 sm:p-8 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col items-center justify-center text-center group"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2.5 px-2 py-0.5 rounded bg-white border border-slate-200">
              {currentFlashcard.tag} • {isFlipped ? 'Answer (Click to flip)' : 'Question (Click to reveal)'}
            </span>

            <p className="font-serif text-sm sm:text-base font-semibold text-slate-900 max-w-xl leading-relaxed">
              {isFlipped ? currentFlashcard.back : currentFlashcard.front}
            </p>
          </div>

          {/* Flashcard Controls */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(prev => (prev > 0 ? prev - 1 : revision.flashcards.length - 1));
              }}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors shadow-2xs"
            >
              Previous
            </button>

            <button
              onClick={() => setIsFlipped(prev => !prev)}
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-white shadow-2xs cursor-pointer transition-colors"
            >
              Flip card
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(prev => (prev < revision.flashcards.length - 1 ? prev + 1 : 0));
              }}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors shadow-2xs"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Formula Reference Sheet */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <h2 className="font-serif text-base font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileSpreadsheet className="w-4 h-4 text-slate-500" />
          <span>Core Formula Sheet</span>
        </h2>

        <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-xl overflow-hidden bg-white">
          {revision.formulaSheet.map((f, i) => (
            <div key={i} className="p-3.5 space-y-1.5 bg-white hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-900">{f.name}</span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {f.unitId.toUpperCase()}
                </span>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200/60 font-mono text-xs text-slate-800">
                {f.formula}
              </div>
              <p className="text-[11px] text-slate-500">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Self-Assessment Checklist */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <h2 className="font-serif text-base font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <CheckSquare className="w-4 h-4 text-slate-500" />
          <span>Readiness Checklist</span>
        </h2>
        <p className="text-xs text-slate-500">
          Track revision confidence. State persists automatically in local storage.
        </p>

        <div className="space-y-1.5">
          {revision.checklist.map(item => {
            const isDone = !!checklistState[item.id];
            return (
              <div
                key={item.id}
                onClick={() => handleToggleChecklist(item.id)}
                className={`p-3 rounded-lg border transition-colors cursor-pointer flex items-start gap-2.5 ${
                  isDone
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button className="mt-0.5 text-emerald-600">
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {item.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
