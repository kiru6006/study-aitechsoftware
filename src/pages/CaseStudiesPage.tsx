import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Database,
  Cpu,
  Lock,
  Workflow
} from 'lucide-react';
import { getSubjectUseCases } from '../lib/contentLoader';

export const CaseStudiesPage: React.FC = () => {
  const { subjectId = 'ai-cyber-security' } = useParams<{ subjectId?: string }>();
  const useCases = getSubjectUseCases(subjectId);

  return (
    <div className="space-y-4 py-1">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/50 text-xs font-semibold">
            Industry Case Studies
          </span>
          <span className="text-xs text-[#5F6368] font-sans">
            Enterprise Production Architectures
          </span>
        </div>

        <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#202124] tracking-tight">
          AI-Powered Banking Cybersecurity Intelligence
        </h1>

        <p className="text-xs text-[#5F6368] leading-relaxed max-w-3xl">
          Learn how financial institutions synthesize telemetry across all five syllabus units to detect credential stuffing, thwart Business Email Compromise, isolate lateral attackers, and stop high-velocity payment fraud.
        </p>
      </div>

      {useCases.map(cs => (
        <div key={cs.id} className="space-y-3.5">
          {/* Business Problem */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-2.5">
            <h2 className="font-serif text-base font-bold text-[#202124] flex items-center gap-2 border-b border-[#FBBC05]/40 pb-2">
              <ShieldAlert className="w-4 h-4 text-[#C70234]" />
              <span>Executive Problem Statement</span>
            </h2>
            <p className="text-xs text-[#202124] leading-relaxed font-sans bg-[#FAF9F5] p-3 rounded-lg border border-[#FBBC05]/40">
              {cs.businessProblem}
            </p>
          </div>

          {/* Unit Mapping Flow */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-2.5">
            <h2 className="font-serif text-base font-bold text-[#202124] flex items-center gap-2 border-b border-[#FBBC05]/40 pb-2">
              <Layers className="w-4 h-4 text-[#C70234]" />
              <span>Cross-Unit Curriculum Integration</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {cs.unitMapping.map(m => (
                <div key={m.unitNumber} className="p-3 rounded-lg border border-[#FBBC05]/40 bg-[#FAF9F5]">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/50">
                    Unit {m.unitNumber}
                  </span>
                  <p className="text-xs text-[#202124] mt-1.5 leading-relaxed">
                    {m.roleInSolution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Steps & Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Telemetry */}
            <div className="bg-white rounded-xl p-4 border border-[#C70234]/30 shadow-xs space-y-2">
              <h3 className="font-serif text-sm font-bold text-[#202124] flex items-center gap-2 border-b border-[#FBBC05]/40 pb-1.5">
                <Database className="w-4 h-4 text-[#D97706]" />
                <span>Ingested Telemetry Feeds</span>
              </h3>
              <div className="p-3 rounded-lg bg-[#1E1E2E] text-[#CDD6F4] font-mono text-[11px] whitespace-pre-line leading-relaxed overflow-x-auto border border-[#FBBC05]/40">
                {cs.inputData}
              </div>
            </div>

            {/* Pipeline Workflow */}
            <div className="bg-white rounded-xl p-4 border border-[#C70234]/30 shadow-xs space-y-2">
              <h3 className="font-serif text-sm font-bold text-[#202124] flex items-center gap-2 border-b border-[#FBBC05]/40 pb-1.5">
                <Workflow className="w-4 h-4 text-[#C70234]" />
                <span>6-Stage Defense Workflow</span>
              </h3>
              <div className="space-y-1.5">
                {cs.stepByStepProcess.map((step, i) => (
                  <div key={i} className="text-xs text-[#5F6368] p-2 rounded-lg bg-[#FAF9F5] border border-[#DADCE0]/60 leading-snug">
                    <span className="font-bold text-[#C70234] mr-1">{i + 1}.</span> {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Practical Metrics & Real-World Impact */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-2.5">
            <h3 className="font-serif text-base font-bold text-[#202124] flex items-center gap-2 border-b border-[#FBBC05]/40 pb-2">
              <CheckCircle2 className="w-4 h-4 text-[#188038]" />
              <span>Production Impact & Expected Output</span>
            </h3>

            <div className="p-3 rounded-lg bg-[#E6F4EA] border border-[#34A853]/40 text-xs text-[#188038] font-medium leading-relaxed">
              {cs.practicalApplication}
            </div>

            <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#FBBC05]/40 text-xs font-mono text-[#202124] whitespace-pre-line overflow-x-auto">
              {cs.expectedOutput}
            </div>
          </div>

          {/* Operational Limitations */}
          <div className="bg-white rounded-xl p-4 border border-[#C70234]/30 shadow-xs space-y-2">
            <h3 className="font-serif text-sm font-bold text-[#202124] flex items-center gap-2 border-b border-[#FBBC05]/40 pb-1.5">
              <AlertTriangle className="w-4 h-4 text-[#C70234]" />
              <span>Operational Limitations & Regulatory Constraints</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-[#5F6368]">
              {cs.limitations.map((lim, i) => (
                <li key={i} className="flex items-start gap-2 leading-snug">
                  <span className="text-[#C70234] font-bold mt-0.5 shrink-0">•</span>
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
