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
    <div className="space-y-8 py-2">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded bg-[#FCE8EF] text-[#C70234] text-xs font-semibold">
            Industry Case Studies
          </span>
          <span className="text-xs text-[#5F6368] font-sans">
            Bridging Academic Theory with Production Enterprise Architectures
          </span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-[#202124] tracking-tight">
          AI-Powered Banking Cybersecurity Intelligence
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-[#5F6368] leading-relaxed max-w-3xl">
          Learn how financial institutions synthesize telemetry across all five syllabus units to detect credential stuffing, thwart Business Email Compromise, isolate lateral attackers, and stop high-velocity payment fraud.
        </p>
      </div>

      {useCases.map(cs => (
        <div key={cs.id} className="space-y-6">
          {/* Business Problem */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#202124] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#C70234]" />
              <span>Executive Problem Statement</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#202124] leading-relaxed font-sans bg-[#F8FAFC] p-4 rounded-xl border border-[#DADCE0]">
              {cs.businessProblem}
            </p>
          </div>

          {/* Unit Mapping Flow */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#202124] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#1A73E8]" />
              <span>Cross-Unit Curriculum Integration</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cs.unitMapping.map(m => (
                <div key={m.unitNumber} className="p-4 rounded-xl border border-[#DADCE0] bg-[#F8FAFC]">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1A73E8] text-white">
                    Unit {m.unitNumber}
                  </span>
                  <p className="text-xs text-[#202124] mt-2 leading-relaxed">
                    {m.roleInSolution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Steps & Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Telemetry */}
            <div className="bg-white rounded-2xl p-6 border border-[#DADCE0] mat-elevation-1 space-y-3">
              <h3 className="font-serif text-base font-bold text-[#202124] flex items-center gap-2">
                <Database className="w-4 h-4 text-[#00ACC1]" />
                <span>Ingested Telemetry Feeds</span>
              </h3>
              <div className="p-4 rounded-xl bg-[#202124] text-slate-100 font-mono text-xs whitespace-pre-line leading-relaxed">
                {cs.inputData}
              </div>
            </div>

            {/* Pipeline Workflow */}
            <div className="bg-white rounded-2xl p-6 border border-[#DADCE0] mat-elevation-1 space-y-3">
              <h3 className="font-serif text-base font-bold text-[#202124] flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#188038]" />
                <span>6-Stage Defense Workflow</span>
              </h3>
              <div className="space-y-2">
                {cs.stepByStepProcess.map((step, i) => (
                  <div key={i} className="text-xs text-[#5F6368] p-2.5 rounded-lg bg-[#F8FAFC] border border-[#DADCE0]/60 leading-relaxed">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Practical Metrics & Real-World Impact */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#202124] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#188038]" />
              <span>Production Impact & Expected Output</span>
            </h3>

            <div className="p-4 rounded-xl bg-[#E6F4EA] border border-[#34A853]/30 text-xs text-[#188038] font-medium leading-relaxed">
              {cs.practicalApplication}
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DADCE0] text-xs font-mono text-[#202124] whitespace-pre-line">
              {cs.expectedOutput}
            </div>
          </div>

          {/* Operational Limitations */}
          <div className="bg-white rounded-2xl p-6 border border-[#DADCE0] mat-elevation-1 space-y-3">
            <h3 className="font-serif text-base font-bold text-[#202124] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#EA4335]" />
              <span>Operational Limitations & Regulatory Constraints</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#5F6368] pl-4 list-disc">
              {cs.limitations.map((lim, i) => (
                <li key={i} className="leading-relaxed">{lim}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
