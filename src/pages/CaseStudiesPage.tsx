import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Database,
  Workflow
} from 'lucide-react';
import { getSubjectUseCases } from '../lib/contentLoader';

export const CaseStudiesPage: React.FC = () => {
  const { subjectId = 'ai-cyber-security' } = useParams<{ subjectId?: string }>();
  const useCases = getSubjectUseCases(subjectId);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium">
            Industry Case Studies
          </span>
          <span className="text-xs text-slate-500 font-sans">
            Enterprise Production Architectures
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
          AI-Powered Banking Cybersecurity Intelligence
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Learn how financial institutions synthesize telemetry across all five syllabus units to detect credential stuffing, thwart Business Email Compromise, isolate lateral attackers, and stop high-velocity payment fraud.
        </p>
      </div>

      {useCases.map(cs => (
        <div key={cs.id} className="space-y-4">
          {/* Business Problem */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-3">
            <h2 className="font-serif text-base font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <ShieldAlert className="w-4 h-4 text-slate-500" />
              <span>Executive Problem Statement</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans bg-slate-50 p-4 rounded-lg border border-slate-200/60">
              {cs.businessProblem}
            </p>
          </div>

          {/* Unit Mapping Flow */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-3">
            <h2 className="font-serif text-base font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Cross-Unit Curriculum Integration</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cs.unitMapping.map(m => (
                <div key={m.unitNumber} className="p-3.5 rounded-lg border border-slate-200/60 bg-slate-50 space-y-1">
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    Unit {m.unitNumber}
                  </span>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    {m.roleInSolution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Steps & Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Telemetry */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Database className="w-4 h-4 text-slate-500" />
                <span>Ingested Telemetry Feeds</span>
              </h3>
              <div className="p-3.5 rounded-lg bg-[#18181B] text-[#E4E4E7] font-mono text-[11px] whitespace-pre-line leading-relaxed overflow-x-auto border border-slate-800">
                {cs.inputData}
              </div>
            </div>

            {/* Pipeline Workflow */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Workflow className="w-4 h-4 text-slate-500" />
                <span>6-Stage Defense Workflow</span>
              </h3>
              <div className="space-y-1.5">
                {cs.stepByStepProcess.map((step, i) => (
                  <div key={i} className="text-xs text-slate-600 p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 leading-relaxed flex items-start gap-2">
                    <span className="font-mono text-slate-400 shrink-0 font-medium">{i + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Practical Metrics & Impact */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-serif text-base font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Production Impact & Expected Output</span>
            </h3>

            <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-800 leading-relaxed">
              {cs.practicalApplication}
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/60 text-xs font-mono text-slate-800 whitespace-pre-line overflow-x-auto">
              {cs.expectedOutput}
            </div>
          </div>

          {/* Operational Limitations */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
            <h3 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <AlertTriangle className="w-4 h-4 text-slate-500" />
              <span>Operational Limitations & Regulatory Constraints</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {cs.limitations.map((lim, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-slate-400 mt-0.5 shrink-0">•</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
