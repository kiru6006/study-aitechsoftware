import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  HardDrive,
  Cpu,
  Smartphone,
  Radio,
  FileCheck2,
  RefreshCw,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  Award,
  Terminal,
  Printer
} from 'lucide-react';
import {
  getSubjectMetadata,
  getSubjectInvestigation,
  getInvestigationProgress,
  recordInvestigationActivity,
  resetInvestigationProgress
} from '../lib/contentLoader';

export const InvestigationPage: React.FC = () => {
  const { subjectId = 'cyber-forensics' } = useParams<{ subjectId?: string }>();
  const subject = getSubjectMetadata(subjectId);
  const investigation = getSubjectInvestigation(subjectId);

  const [activeStageId, setActiveStageId] = useState<string>('stage-1');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>('E-01');
  const [progress, setProgress] = useState(() => getInvestigationProgress(subjectId));
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});

  if (!investigation) {
    return (
      <div className="bg-white rounded-lg p-4 border border-[#C70234] text-center space-y-2">
        <ShieldAlert className="w-8 h-8 text-[#C70234] mx-auto" />
        <h2 className="font-serif text-base font-bold text-black">Investigation Workspace Not Available</h2>
        <p className="text-xs text-gray-700">
          Case investigation mode is currently tailored for Cyber Forensics. Select Cyber Forensics from Semester 3.
        </p>
        <Link
          to="/cyber-forensics/investigation"
          className="inline-block px-3 py-1 bg-[#C70234] text-white text-xs font-bold rounded hover:bg-[#A00028]"
        >
          Open Cyber Forensics Investigation
        </Link>
      </div>
    );
  }

  const activeStage = investigation.stages.find(s => s.id === activeStageId) || investigation.stages[0];
  const selectedEvidence = investigation.evidenceSources.find(e => e.id === selectedEvidenceId) || investigation.evidenceSources[0];

  const totalActivities = investigation.stages.reduce((acc, s) => acc + s.activities.length, 0);
  const completedCount = Object.values(progress.completedActivities).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalActivities) * 100);

  const handleSelectOption = (activityId: string, optionId: string, isCorrect: boolean) => {
    setUserAnswers(prev => ({ ...prev, [activityId]: optionId }));
    setShowFeedback(prev => ({ ...prev, [activityId]: true }));
    const updated = recordInvestigationActivity(subjectId, activityId, isCorrect);
    setProgress(updated);
  };

  const handleReset = () => {
    if (window.confirm('Reset investigation progress and answer attempts?')) {
      resetInvestigationProgress(subjectId);
      setProgress(getInvestigationProgress(subjectId));
      setUserAnswers({});
      setShowFeedback({});
    }
  };

  return (
    <div className="space-y-2.5 py-1 text-black font-sans">
      {/* Simulation Banner - Compact Yellow/Red/Black/White */}
      <div className="bg-white rounded-lg p-2.5 sm:p-3 border-2 border-[#FBBC05] shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C70234] animate-pulse shrink-0" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] rounded">
                Simulated Case
              </span>
              <span className="text-xs font-bold font-serif text-black">
                {investigation.organization}
              </span>
            </div>
            <p className="text-[11px] text-gray-700 leading-tight mt-0.5">
              {investigation.title} • Suspected Impact: <strong className="text-[#C70234]">{investigation.suspectedImpact}</strong>
            </p>
          </div>
        </div>

        {/* Live Progress Pill & Score */}
        <div className="flex items-center gap-2 bg-[#FAF9F5] px-2.5 py-1 rounded border border-[#DADCE0]">
          <div className="text-right">
            <div className="text-[10px] font-mono font-bold text-gray-600">
              Progress: {completedCount}/{totalActivities} ({progressPercent}%)
            </div>
            <div className="text-xs font-black text-[#C70234] font-mono">
              Score: {progress.score} Pts
            </div>
          </div>
          <button
            onClick={handleReset}
            title="Reset progress"
            className="p-1 text-gray-500 hover:text-[#C70234] hover:bg-white rounded border border-transparent hover:border-gray-300 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Five-Unit Investigation Stepper - Compact Horizontal Bar */}
      <div className="bg-white rounded-lg p-2 border border-[#DADCE0] shadow-2xs">
        <div className="text-[10px] font-mono font-bold text-[#92400E] uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>5-Unit Investigation Workflow</span>
          <span className="text-gray-500 font-normal">Click a stage to examine artifacts</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {investigation.stages.map(stage => {
            const isActive = stage.id === activeStageId;
            const stageDone = stage.activities.every(a => progress.completedActivities[a.id]);

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-1.5 rounded text-left transition-all border cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#C70234] text-white border-[#C70234] shadow-xs'
                    : stageDone
                    ? 'bg-[#FEF7E0] border-[#FBBC05] text-black hover:bg-[#FEF08A]'
                    : 'bg-[#FAF9F5] border-[#DADCE0] text-gray-800 hover:border-[#FBBC05]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className={isActive ? 'text-[#FEF7E0]' : 'text-[#C70234]'}>
                    UNIT {stage.unitNumber}
                  </span>
                  {stageDone && (
                    <CheckCircle2 className={`w-3 h-3 ${isActive ? 'text-white' : 'text-[#188038]'}`} />
                  )}
                </div>
                <div className="text-[11px] font-bold leading-tight line-clamp-1 mt-0.5">
                  {stage.title.split(':')[1] || stage.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Layout: Active Stage Investigation & Evidence Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
        {/* Left Column (2 Cols): Active Stage Activities & Simulation Lab */}
        <div className="lg:col-span-2 space-y-2.5">
          {/* Active Stage Header Card */}
          <div className="bg-white rounded-lg p-3 border border-[#C70234]/40 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]">
                Stage {activeStage.unitNumber} of 5 • {activeStage.subtitle}
              </span>
              <span className="text-[10px] font-mono text-gray-500">
                Unit {activeStage.unitNumber} Syllabus Aligned
              </span>
            </div>

            <h2 className="font-serif text-base sm:text-lg font-bold text-black leading-snug">
              {activeStage.title}
            </h2>

            <p className="text-xs text-gray-700 leading-relaxed bg-[#FAF9F5] p-2 rounded border border-[#DADCE0]">
              <strong className="text-black">Objective:</strong> {activeStage.objective}
            </p>

            {/* Relevant Evidence Badges for this stage */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              <span className="text-[10px] font-mono text-gray-600 font-semibold">Priority Sources:</span>
              {activeStage.evidenceIds.map(eId => {
                const item = investigation.evidenceSources.find(e => e.id === eId);
                return (
                  <button
                    key={eId}
                    onClick={() => setSelectedEvidenceId(eId)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
                      selectedEvidenceId === eId
                        ? 'bg-[#C70234] text-white border-[#C70234]'
                        : 'bg-white text-black border-[#DADCE0] hover:border-[#FBBC05]'
                    }`}
                  >
                    {eId}: {item?.name.split('(')[0] || eId}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Activities / Decision Simulation */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono font-bold uppercase text-[#92400E] flex items-center justify-between">
              <span>Interactive Decision Exercises</span>
              <span className="text-[10px] text-gray-500">10 Pts per accurate forensic decision</span>
            </div>

            {activeStage.activities.map((act, idx) => {
              const selectedOpt = userAnswers[act.id];
              const isAnswered = !!selectedOpt;
              const isCorrect = progress.completedActivities[act.id];

              return (
                <div
                  key={act.id}
                  className={`bg-white rounded-lg p-3 border transition-all ${
                    isAnswered
                      ? isCorrect
                        ? 'border-[#188038] bg-[#E6F4EA]/20'
                        : 'border-[#C70234] bg-[#FCE8EF]/20'
                      : 'border-[#DADCE0] hover:border-[#FBBC05]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-black text-white shrink-0">
                      Task {idx + 1}
                    </span>
                    <h3 className="text-xs font-bold text-black font-serif flex-1">
                      {act.title}
                    </h3>
                    {isAnswered && (
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isCorrect ? 'bg-[#188038] text-white' : 'bg-[#C70234] text-white'
                      }`}>
                        {isCorrect ? '+10 Pts' : 'Review'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-800 mt-1.5 font-medium leading-snug">
                    {act.prompt}
                  </p>

                  {/* Options */}
                  <div className="mt-2 space-y-1.5">
                    {act.options?.map(opt => {
                      const isChosen = selectedOpt === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(act.id, opt.id, opt.isCorrect)}
                          className={`w-full text-left p-2 rounded text-xs transition-all border cursor-pointer flex items-start gap-2 ${
                            isChosen
                              ? opt.isCorrect
                                ? 'bg-[#E6F4EA] border-[#188038] text-[#188038] font-bold'
                                : 'bg-[#FCE8EF] border-[#C70234] text-[#C70234] font-bold'
                              : 'bg-white border-[#DADCE0] text-gray-800 hover:border-[#FBBC05] hover:bg-[#FAF9F5]'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full border text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                            isChosen ? 'border-current' : 'border-gray-400'
                          }`}>
                            {isChosen ? (opt.isCorrect ? '✓' : '✗') : '•'}
                          </span>
                          <span className="leading-snug">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {showFeedback[act.id] && (
                    <div className="mt-2 p-2 rounded text-[11px] leading-relaxed bg-[#FAF9F5] border border-[#DADCE0]">
                      <strong className="text-black">Forensic Explanation: </strong>
                      <span className="text-gray-700">{act.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Forensic Integrity Guidance Card */}
          <div className="bg-[#FEF7E0] rounded-lg p-2.5 border border-[#FBBC05] text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#92400E]">
              <AlertTriangle className="w-4 h-4 text-[#C70234]" />
              <span>Evidence-Based Decision Rules (Court Admissibility Standard)</span>
            </div>
            <ul className="text-gray-800 list-disc list-inside space-y-0.5 leading-snug pl-1">
              <li><strong>Confirmed Observation</strong> ≠ <strong>Attribution</strong>: USB insertion proves device mount, not data theft.</li>
              <li><strong>Hash Verification</strong> proves bitstream content integrity, not document authorship.</li>
              <li><strong>Suspicious Process Name</strong> warrants volatile inspection, not immediate classification as malware.</li>
              <li><strong>Biometric Match</strong> proves sensor acceptance, but cannot establish conscious intent or duress.</li>
            </ul>
          </div>
        </div>

        {/* Right Column (1 Col): Evidence Browser & Register */}
        <div className="space-y-2.5">
          {/* Evidence Selector Drawer */}
          <div className="bg-white rounded-lg p-2.5 border border-[#DADCE0] shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
              <span className="text-xs font-serif font-bold text-black flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-[#C70234]" />
                Evidence Repository (8 Sources)
              </span>
              <span className="text-[10px] font-mono font-bold text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05]">
                Simulated
              </span>
            </div>

            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {investigation.evidenceSources.map(item => {
                const isSelected = item.id === selectedEvidenceId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedEvidenceId(item.id)}
                    className={`w-full text-left p-1.5 rounded border transition-all text-xs cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FEF7E0] border-[#C70234] text-black shadow-2xs font-bold'
                        : 'bg-[#FAF9F5] border-[#DADCE0] text-gray-700 hover:border-[#FBBC05]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className={`w-4 h-4 rounded text-[9px] font-mono flex items-center justify-center font-bold shrink-0 ${
                        isSelected ? 'bg-[#C70234] text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {item.id.replace('E-', '')}
                      </span>
                      <span className="truncate">{item.name.split('(')[0]}</span>
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase shrink-0 ml-1">
                      {item.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Evidence Item Details Inspector */}
          <div className="bg-white rounded-lg p-3 border border-[#C70234]/40 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
              <span className="text-xs font-mono font-bold text-[#C70234]">
                {selectedEvidence.id}: Forensic Sheet
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black text-white font-bold">
                {selectedEvidence.status}
              </span>
            </div>

            <h3 className="font-serif text-xs font-bold text-black leading-snug">
              {selectedEvidence.name}
            </h3>

            <div className="text-[11px] text-gray-700 space-y-1">
              <div>
                <span className="font-bold text-black">Source: </span>
                {selectedEvidence.source}
              </div>
              <div>
                <span className="font-bold text-black">Type: </span>
                {selectedEvidence.evidenceType}
              </div>
              {selectedEvidence.hash && (
                <div className="p-1.5 bg-[#FAF9F5] rounded border border-[#DADCE0] font-mono text-[9px] break-all leading-tight">
                  <span className="font-bold text-[#92400E] block">SHA-256 Hash:</span>
                  {selectedEvidence.hash}
                </div>
              )}
            </div>

            {/* Technical Findings */}
            <div className="space-y-1 pt-1 border-t border-[#DADCE0]">
              <span className="text-[10px] font-mono font-bold uppercase text-[#188038] block">
                Confirmed Findings:
              </span>
              <ul className="text-[11px] text-gray-800 space-y-1 list-disc list-inside leading-snug">
                {selectedEvidence.findings.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            {/* Limitations & Uncertainties */}
            <div className="space-y-1 pt-1 border-t border-[#DADCE0] bg-[#FCE8EF]/30 p-2 rounded">
              <span className="text-[10px] font-mono font-bold uppercase text-[#C70234] block flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-[#C70234]" />
                Forensic Limitations:
              </span>
              <ul className="text-[10.5px] text-gray-800 space-y-0.5 list-disc list-inside leading-snug">
                {selectedEvidence.limitations.map((lim, i) => (
                  <li key={i}>{lim}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Links to Subject Hub */}
          <div className="grid grid-cols-2 gap-1.5 pt-1 text-center text-xs font-bold">
            <Link
              to={`/${subjectId}/case-studies`}
              className="p-2 rounded bg-white border border-[#DADCE0] hover:border-[#C70234] text-black hover:text-[#C70234] transition-colors"
            >
              Case Overview
            </Link>
            <Link
              to={`/${subjectId}/labs`}
              className="p-2 rounded bg-[#C70234] text-white hover:bg-[#A00028] transition-colors"
            >
              Practical Labs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};