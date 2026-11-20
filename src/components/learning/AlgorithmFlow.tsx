import React from 'react';
import { GitFork, ArrowDown, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';

export interface FlowStep {
  stepNumber: number;
  title: string;
  type: 'input' | 'process' | 'decision' | 'output' | 'fallback';
  description: string;
  detail?: string;
}

interface AlgorithmFlowProps {
  title: string;
  subtitle?: string;
  steps: FlowStep[];
}

export const AlgorithmFlow: React.FC<AlgorithmFlowProps> = ({
  title,
  subtitle,
  steps
}) => {
  const getBadgeStyle = (type: FlowStep['type']) => {
    switch (type) {
      case 'input':
        return 'bg-[#FEF7E0] text-[#92400E] border-[#FBBC05]';
      case 'process':
        return 'bg-[#E8F0FE] text-[#1A73E8] border-[#1A73E8]/40';
      case 'decision':
        return 'bg-[#FCE8EF] text-[#C70234] border-[#C70234]/40';
      case 'output':
        return 'bg-[#E6F4EA] text-[#188038] border-[#34A853]/40';
      case 'fallback':
        return 'bg-[#FEE2E2] text-[#B91C1C] border-[#EF4444]/40';
      default:
        return 'bg-[#F1F3F4] text-[#5F6368] border-[#DADCE0]';
    }
  };

  return (
    <div className="rounded-xl border border-[#C70234]/30 bg-white overflow-hidden shadow-xs my-3">
      {/* Header */}
      <div className="px-3.5 py-2.5 bg-[#FEF7E0] border-b border-[#FBBC05]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitFork className="w-4 h-4 text-[#C70234]" />
          <div>
            <h3 className="font-serif text-sm font-bold text-[#202124]">{title}</h3>
            {subtitle && <p className="text-[11px] text-[#92400E]">{subtitle}</p>}
          </div>
        </div>
        <span className="text-[11px] font-sans font-medium text-[#92400E] bg-white px-2 py-0.5 rounded border border-[#FBBC05]/50">
          Algorithm Flow
        </span>
      </div>

      {/* Flow Sequence */}
      <div className="p-4 bg-[#FAF9F5] space-y-3">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="p-3 rounded-xl bg-white border border-[#FBBC05]/40 shadow-xs hover:border-[#C70234]/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FEF7E0] text-[#C70234] font-bold text-xs flex items-center justify-center border border-[#FBBC05] shrink-0 mt-0.5">
                  {step.stepNumber}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#202124]">
                      {step.title}
                    </span>
                    <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded border font-semibold ${getBadgeStyle(step.type)}`}>
                      {step.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5F6368] mt-0.5 leading-snug">
                    {step.description}
                  </p>
                  {step.detail && (
                    <div className="mt-1.5 p-1.5 rounded bg-[#F8FAFC] border border-[#DADCE0]/50 font-mono text-[10px] text-[#202124]">
                      {step.detail}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div className="flex justify-center my-0.5">
                <div className="flex items-center gap-1 text-[#FBBC05]">
                  <ArrowDown className="w-4 h-4 text-[#D97706]" />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
