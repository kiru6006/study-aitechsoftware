import React from 'react';
import { GitFork, ArrowDown } from 'lucide-react';

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
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'process':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'decision':
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
      case 'output':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'fallback':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs my-4">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitFork className="w-4 h-4 text-slate-500" />
          <div>
            <h3 className="font-serif text-sm font-semibold text-slate-900">{title}</h3>
            {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
          </div>
        </div>
        <span className="text-[11px] font-sans text-slate-500 font-medium">
          Sequential Pipeline
        </span>
      </div>

      {/* Steps List */}
      <div className="p-4 sm:p-5 bg-slate-50/50 space-y-2.5">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {step.stepNumber}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">
                      {step.title}
                    </span>
                    <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded border font-medium ${getBadgeStyle(step.type)}`}>
                      {step.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                  {step.detail && (
                    <div className="mt-1.5 px-2 py-1 rounded bg-slate-50 border border-slate-200/60 font-mono text-[10px] text-slate-600 inline-block">
                      {step.detail}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div className="flex justify-center my-0.5">
                <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
