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
  ChevronDown,
  BookOpen,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import {
  getSubjectRevision,
  getRevisionChecklistState,
  toggleChecklistItem,
  getSubjectMetadata
} from '../lib/contentLoader';

export const RevisionPage: React.FC = () => {
  const { subjectId = 'cyber-forensics' } = useParams<{ subjectId?: string }>();
  const subject = getSubjectMetadata(subjectId);
  const revision = getSubjectRevision(subjectId);

  // Active Flashcard index and flip state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Expandable Memory Codes
  const [expandedCodes, setExpandedCodes] = useState<Record<number, boolean>>({ 1: true });
  const [userRecallAnswers, setUserRecallAnswers] = useState<Record<number, string>>({});
  const [showRecallFeedback, setShowRecallFeedback] = useState<Record<number, boolean>>({});

  // Persistent Checklist
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(() =>
    getRevisionChecklistState()
  );

  const handleToggleChecklist = (id: string) => {
    const updated = toggleChecklistItem(id);
    setChecklistState(updated);
  };

  const toggleCodeExpand = (uNum: number) => {
    setExpandedCodes(prev => ({ ...prev, [uNum]: !prev[uNum] }));
  };

  if (!revision) {
    return (
      <div className="bg-white rounded-lg p-4 text-center border border-[#C70234]">
        <p className="text-xs text-gray-700">No revision pack available for this subject.</p>
      </div>
    );
  }

  const currentFlashcard = revision.flashcards[currentCardIndex];

  // Specific recall questions for each unit memory code
  const recallQuestions: Record<number, { q: string; a: string; ex: string }> = {
    1: {
      q: "What does the first 'P' stand for in I-P-C-E-A-D-P-R, and what is its primary real-world tool?",
      a: "Preservation (isolating scene, applying hardware write-blockers and Faraday bags).",
      ex: "ABC Bank: Attaching Tableau T8u to employee laptop to prevent host write signals."
    },
    2: {
      q: "What does the 'W' stand for in F-D-C-W-T, and which artifact proves execution count?",
      a: "Windows Artifacts (Prefetch, LNK, Jump Lists, Registry). Prefetch (.pf) proves execution count.",
      ex: "ABC Bank: INVOICE_UPDATE.EXE-B2C4E1A0.pf confirmed 3 executions starting at 08:42:15 UTC."
    },
    3: {
      q: "What does the 'M' stand for in L-M-T-A-N, and what Volatility plugin finds unlinked rootkits?",
      a: "Memory Forensics. Volatility windows.psscan discovers unlinked processes by scanning pool tags.",
      ex: "ABC Bank: Uncovered unlinked rogue process PID 1220 (unknown.exe) in switch memory."
    },
    4: {
      q: "What does the 'A' stand for in M-A-D-I-L, and what are its three extraction levels?",
      a: "Acquisition Methods: Logical (backup API), File System (app private data), and Physical (raw flash).",
      ex: "ABC Bank: Extracted employee Samsung phone via File System acquisition to parse mmssms.db-wal."
    },
    5: {
      q: "What does the 'V' stand for in C-R-E-V, and which NIST project benchmarks tool reliability?",
      a: "Validation (NIST Computer Forensic Tool Testing - CFTT and Biometric FAR/FRR).",
      ex: "ABC Bank: Validated forensic disk imaging and write-blocking error rates against NIST CFTT."
    }
  };

  return (
    <div className="space-y-2.5 py-1 text-black font-sans">
      {/* Header Banner - Compact Yellow/Red/Black */}
      <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#C70234]/30 shadow-xs space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] text-[10px] font-mono font-bold">
              Rapid Revision & Memory Retention
            </span>
            <span className="text-[10px] font-mono text-gray-500 font-semibold">
              Unit Acronyms • Flashcards • Cheat Sheets
            </span>
          </div>
          <span className="px-1.5 py-0.2 rounded bg-black text-[#FEF08A] text-[10px] font-mono font-bold">
            {subject?.code || 'MAI-OL507B-3'}
          </span>
        </div>

        <h1 className="font-serif text-lg sm:text-xl font-bold text-black tracking-tight leading-snug">
          Quick Revision Hub & High-Yield Recall Codes
        </h1>

        <p className="text-xs text-gray-700 leading-snug max-w-3xl">
          Retain core principles using unit memory acronyms (I-P-C-E-A-D-P-R, F-D-C-W-T, L-M-T-A-N, M-A-D-I-L, C-R-E-V), interactive recall questions, self-flipping flashcards, and syllabus checklists.
        </p>
      </div>

      {/* Master Sequence Banner */}
      <div className="bg-white rounded-lg p-2.5 border border-[#FBBC05] shadow-2xs">
        <span className="text-[10px] font-mono font-bold text-[#92400E] uppercase block mb-1">
          Master 5-Stage Curricular Sequence
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-1.5">
          {revision.masterMemorySequence.map((seq, idx) => (
            <div
              key={idx}
              className="p-1.5 rounded bg-[#FAF9F5] border border-[#DADCE0] text-[10.5px] font-mono leading-tight"
            >
              <span className="font-bold text-[#C70234] block">Stage {idx + 1}</span>
              <span className="text-gray-800">{seq}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Unit Memory Codes & Expandable Details */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-bold uppercase text-[#92400E] flex items-center justify-between">
          <span>Unit Memory Acronyms & Active Recall</span>
          <span className="text-gray-500 font-normal">Click code to inspect breakdown & quiz</span>
        </div>

        <div className="space-y-1.5">
          {revision.unitMemoryCodes.map(codeItem => {
            const isExpanded = expandedCodes[codeItem.unitNumber];
            const recall = recallQuestions[codeItem.unitNumber];

            return (
              <div
                key={codeItem.unitNumber}
                className="bg-white rounded-lg border border-[#DADCE0] overflow-hidden shadow-2xs transition-all hover:border-[#FBBC05]"
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleCodeExpand(codeItem.unitNumber)}
                  className="p-2.5 cursor-pointer bg-[#FAF9F5] hover:bg-[#FEF7E0]/40 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded text-[10px] font-mono font-bold bg-[#C70234] text-white flex items-center justify-center shrink-0">
                      U{codeItem.unitNumber}
                    </span>
                    <span className="font-mono text-xs font-bold text-black px-1.5 py-0.2 bg-white rounded border border-[#DADCE0]">
                      {codeItem.code}
                    </span>
                    <span className="text-xs text-gray-700 truncate font-medium">
                      {codeItem.meaning}
                    </span>
                  </div>
                  <button className="text-gray-500 p-0.5">
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-[#C70234]" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-3 bg-white border-t border-[#DADCE0] space-y-2.5 text-xs">
                    {/* Letter Breakdown */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#92400E] uppercase block">
                        Letter-By-Letter Concept Breakdown:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
                        {codeItem.breakdown.map((item, bIdx) => (
                          <div key={bIdx} className="p-1.5 rounded bg-[#FAF9F5] border border-[#DADCE0] flex items-start gap-1.5">
                            <span className="w-4 h-4 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {item.letter}
                            </span>
                            <span className="text-gray-800 leading-snug">{item.concept}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Real-World Bank Example */}
                    {recall && (
                      <div className="p-2 bg-[#FEF7E0] border border-[#FBBC05] rounded text-[11px] space-y-0.5">
                        <span className="font-bold text-[#92400E] block">Real-World Case Example:</span>
                        <p className="text-gray-800 leading-snug">{recall.ex}</p>
                      </div>
                    )}

                    {/* Recall Question */}
                    {recall && (
                      <div className="p-2.5 bg-[#FAF9F5] border border-[#DADCE0] rounded space-y-1.5">
                        <span className="font-serif font-bold text-black flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-[#C70234]" />
                          Quick Recall Question:
                        </span>
                        <p className="text-gray-800 text-xs font-medium">{recall.q}</p>

                        <button
                          onClick={() => setShowRecallFeedback(prev => ({ ...prev, [codeItem.unitNumber]: !prev[codeItem.unitNumber] }))}
                          className="px-2 py-0.5 bg-white border border-[#DADCE0] hover:border-[#C70234] text-[10.5px] font-bold text-[#C70234] rounded transition-colors cursor-pointer"
                        >
                          {showRecallFeedback[codeItem.unitNumber] ? 'Hide Answer' : 'Check Model Answer'}
                        </button>

                        {showRecallFeedback[codeItem.unitNumber] && (
                          <div className="p-2 bg-white rounded border border-[#188038] text-[11px] text-[#188038] font-medium leading-snug">
                            <strong>Answer: </strong>{recall.a}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Flashcards & Syllabus Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {/* Interactive Flashcard Deck */}
        <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
          <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
            <span className="text-xs font-serif font-bold text-black flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C70234]" />
              Active Recall Flashcards ({currentCardIndex + 1}/{revision.flashcards.length})
            </span>
            <span className="text-[10px] font-mono text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05]">
              {currentFlashcard?.tag}
            </span>
          </div>

          {currentFlashcard && (
            <div
              onClick={() => setIsFlipped(prev => !prev)}
              className="min-h-36 p-3 rounded-lg border-2 border-[#FBBC05] bg-[#FAF9F5] hover:bg-[#FEF7E0]/30 cursor-pointer flex flex-col justify-between transition-all"
            >
              <div className="text-[10px] font-mono text-gray-500 uppercase font-bold">
                {isFlipped ? 'Answer (Click to flip)' : 'Prompt (Click to reveal answer)'}
              </div>
              <div className="font-serif text-xs sm:text-sm font-bold text-black py-2 leading-relaxed">
                {isFlipped ? currentFlashcard.back : currentFlashcard.front}
              </div>
              <div className="text-[10px] font-mono text-[#C70234] font-bold text-right">
                {isFlipped ? '↺ Flip back' : '↷ Reveal definition'}
              </div>
            </div>
          )}

          {/* Flashcard Controller */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                setCurrentCardIndex(prev => Math.max(0, prev - 1));
                setIsFlipped(false);
              }}
              disabled={currentCardIndex === 0}
              className="px-2 py-1 rounded bg-[#FAF9F5] border border-[#DADCE0] text-xs font-mono font-bold disabled:opacity-40 cursor-pointer"
            >
              ← Previous
            </button>
            <span className="text-[11px] font-mono text-gray-600">
              Card {currentCardIndex + 1} of {revision.flashcards.length}
            </span>
            <button
              onClick={() => {
                setCurrentCardIndex(prev => Math.min(revision.flashcards.length - 1, prev + 1));
                setIsFlipped(false);
              }}
              disabled={currentCardIndex === revision.flashcards.length - 1}
              className="px-2 py-1 rounded bg-[#C70234] text-white text-xs font-mono font-bold disabled:opacity-40 cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Syllabus Revision Checklist */}
        <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
          <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
            <span className="text-xs font-serif font-bold text-black flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-[#188038]" />
              High-Yield Revision Checklist
            </span>
            <span className="text-[10px] font-mono text-gray-500">
              {Object.values(checklistState).filter(Boolean).length}/{revision.checklist.length} Complete
            </span>
          </div>

          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 text-xs">
            {revision.checklist.map(item => {
              const isChecked = !!checklistState[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => handleToggleChecklist(item.id)}
                  className={`p-2 rounded border transition-all cursor-pointer flex items-start gap-2 ${
                    isChecked
                      ? 'bg-[#E6F4EA]/30 border-[#188038]'
                      : 'bg-[#FAF9F5] border-[#DADCE0] hover:border-[#FBBC05]'
                  }`}
                >
                  <button className="mt-0.5 text-[#188038] shrink-0">
                    {isChecked ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5 text-gray-400" />}
                  </button>
                  <div className="space-y-0.5 flex-1">
                    <div className={`font-bold leading-tight ${isChecked ? 'line-through text-gray-500' : 'text-black'}`}>
                      {item.title}
                    </div>
                    <div className="text-[10px] text-gray-600 leading-snug">{item.summary}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Formula & Reference Sheet */}
      {revision.formulaSheet && revision.formulaSheet.length > 0 && (
        <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
          <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5 border-b border-[#DADCE0] pb-1.5">
            <FileSpreadsheet className="w-4 h-4 text-[#C70234]" />
            Formula & Quantitative Reference Cheat Sheet
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {revision.formulaSheet.map((f, i) => (
              <div key={i} className="p-2.5 rounded bg-[#FAF9F5] border border-[#DADCE0] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-black">{f.name}</span>
                  <span className="text-[9px] font-mono text-[#92400E] bg-[#FEF7E0] px-1 rounded border border-[#FBBC05]">
                    Unit {f.unitId.replace('unit-', '')}
                  </span>
                </div>
                <div className="p-1.5 bg-black text-[#FEF08A] font-mono text-[10px] rounded break-all">
                  {f.formula}
                </div>
                <p className="text-[10.5px] text-gray-700 leading-snug">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};