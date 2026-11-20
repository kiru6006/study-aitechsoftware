import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Sparkles,
  KeyRound,
  CheckSquare,
  Square,
  Repeat,
  FileSpreadsheet,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import {
  getSubjectRevision,
  getRevisionChecklistState,
  toggleChecklistItem
} from '../lib/contentLoader';

export const RevisionPage: React.FC = () => {
  const { subjectId = 'ai-cyber-security' } = useParams<{ subjectId?: string }>();
  const revision = getSubjectRevision(subjectId);

  // Active Flashcard index and flip state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Persistent Checklist
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(() =>
    getRevisionChecklistState()
  );

  const handleToggleChecklist = (id: string) => {
    const updated = toggleChecklistItem(id);
    setChecklistState(updated);
  };

  if (!revision) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-[#DADCE0]">
        <p className="text-xs text-[#5F6368]">No revision pack available for this subject.</p>
      </div>
    );
  }

  const currentFlashcard = revision.flashcards[currentCardIndex];

  return (
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded bg-[#F3E8FD] text-[#A142F4] text-xs font-semibold">
            Rapid Revision & Memory Retention
          </span>
          <span className="text-xs text-[#5F6368] font-sans">
            Mnemonics, Formula Sheets & Flashcards
          </span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-[#202124] tracking-tight">
          Quick Revision Hub & Memory Codes
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-[#5F6368] leading-relaxed max-w-3xl">
          Retain core concepts through official unit mnemonics, formula references, and interactive flashcards. Designed for rapid revision before university examinations.
        </p>

        {/* Master Memory Sequence */}
        <div className="mt-6 pt-5 border-t border-[#DADCE0]/60">
          <span className="text-[10px] font-bold text-[#80868B] uppercase tracking-wider block mb-2">
            Master Cognitive Progression:
          </span>
          <div className="flex flex-wrap gap-2">
            {revision.masterMemorySequence.map((seq, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#DADCE0] text-xs font-semibold text-[#202124] flex items-center gap-1.5"
              >
                <span className="w-4 h-4 rounded-full bg-[#A142F4] text-white text-[10px] flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <span>{seq}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Unit Memory Codes */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-[#202124] flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#C70234]" />
          <span>Official Unit Memory Codes</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {revision.unitMemoryCodes.map(codeItem => (
            <div
              key={codeItem.unitNumber}
              className="bg-white rounded-2xl p-5 border border-[#DADCE0] mat-elevation-1 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#C70234]/10 text-[#C70234]">
                  Unit {codeItem.unitNumber}
                </span>
                <span className="font-mono text-sm font-bold px-2.5 py-0.5 rounded bg-[#FEF7E0] text-[#B06000] border border-[#FBBC05]/40 tracking-wider">
                  {codeItem.code}
                </span>
              </div>

              <p className="text-xs text-[#5F6368] font-medium">
                {codeItem.meaning}
              </p>

              <div className="pt-2 border-t border-[#DADCE0]/50 space-y-1.5">
                {codeItem.breakdown.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <span className="font-mono font-bold text-[#C70234] w-4 shrink-0">
                      {b.letter}:
                    </span>
                    <span className="text-[#202124]">{b.concept}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Flashcards */}
      {revision.flashcards.length > 0 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-[#202124] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#A142F4]" />
              <span>Interactive Flashcard Deck</span>
            </h2>
            <span className="text-xs font-sans text-[#5F6368]">
              Card {currentCardIndex + 1} of {revision.flashcards.length}
            </span>
          </div>

          <div
            onClick={() => setIsFlipped(prev => !prev)}
            className="cursor-pointer min-h-[180px] p-8 rounded-2xl bg-radial from-[#F8FAFC] to-[#F1F3F4] border-2 border-dashed border-[#DADCE0] hover:border-[#1A73E8] transition-all flex flex-col items-center justify-center text-center group"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] mb-2 px-2.5 py-0.5 rounded-full bg-[#E8F0FE]">
              {currentFlashcard.tag} • {isFlipped ? 'Answer (Click to flip)' : 'Question (Click to reveal)'}
            </span>

            <p className="font-serif text-base sm:text-lg font-bold text-[#202124] max-w-xl leading-relaxed">
              {isFlipped ? currentFlashcard.back : currentFlashcard.front}
            </p>
          </div>

          {/* Flashcard Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(prev => (prev > 0 ? prev - 1 : revision.flashcards.length - 1));
              }}
              className="px-3 py-1.5 rounded-lg bg-[#F1F3F4] text-xs font-semibold text-[#5F6368] hover:bg-[#DADCE0]"
            >
              Previous Card
            </button>

            <button
              onClick={() => setIsFlipped(prev => !prev)}
              className="px-4 py-1.5 rounded-lg bg-[#1A73E8] text-xs font-semibold text-white hover:bg-[#185ABC]"
            >
              Flip Card
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(prev => (prev < revision.flashcards.length - 1 ? prev + 1 : 0));
              }}
              className="px-3 py-1.5 rounded-lg bg-[#F1F3F4] text-xs font-semibold text-[#5F6368] hover:bg-[#DADCE0]"
            >
              Next Card
            </button>
          </div>
        </div>
      )}

      {/* Formula Reference Sheet */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-4">
        <h2 className="font-serif text-xl font-bold text-[#202124] flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-[#188038]" />
          <span>Core Formula Revision Sheet</span>
        </h2>

        <div className="divide-y divide-[#DADCE0] border border-[#DADCE0] rounded-xl overflow-hidden bg-white">
          {revision.formulaSheet.map((f, i) => (
            <div key={i} className="p-4 sm:p-5 space-y-1.5 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#202124]">{f.name}</span>
                <span className="text-[10px] font-mono text-[#5F6368] bg-[#F1F3F4] px-2 py-0.5 rounded">
                  {f.unitId.toUpperCase()}
                </span>
              </div>
              <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#DADCE0]/60 font-mono text-xs text-[#1A73E8]">
                {f.formula}
              </div>
              <p className="text-[11px] text-[#5F6368]">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Self-Assessment Checklist */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-4">
        <h2 className="font-serif text-xl font-bold text-[#202124] flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-[#C70234]" />
          <span>Exam Readiness Checklist</span>
        </h2>
        <p className="text-xs text-[#5F6368]">
          Track your personal revision confidence. State persists automatically in local browser storage.
        </p>

        <div className="space-y-2">
          {revision.checklist.map(item => {
            const isDone = !!checklistState[item.id];
            return (
              <div
                key={item.id}
                onClick={() => handleToggleChecklist(item.id)}
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer flex items-start gap-3 ${
                  isDone
                    ? 'bg-[#E6F4EA]/50 border-[#34A853]/40'
                    : 'bg-white border-[#DADCE0] hover:bg-[#F8FAFC]'
                }`}
              >
                <button className="mt-0.5 text-[#188038]">
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-[#188038]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#80868B]" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isDone ? 'line-through text-[#5F6368]' : 'text-[#202124]'}`}>
                      {item.title}
                    </span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#F1F3F4] text-[#5F6368]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5F6368] mt-0.5">
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
