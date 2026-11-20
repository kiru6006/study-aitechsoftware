import React from 'react';
import { Columns3, CheckCircle2 } from 'lucide-react';

export interface ComparisonRow {
  dimension: string;
  itemA: string;
  itemB: string;
  advantage?: 'A' | 'B' | 'neutral';
}

interface ConceptComparisonProps {
  title: string;
  subtitle?: string;
  itemAName: string;
  itemBName: string;
  rows: ComparisonRow[];
}

export const ConceptComparison: React.FC<ConceptComparisonProps> = ({
  title,
  subtitle,
  itemAName,
  itemBName,
  rows
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs my-4">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Columns3 className="w-4 h-4 text-slate-500" />
          <div>
            <h3 className="font-serif text-sm font-semibold text-slate-900">{title}</h3>
            {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
          </div>
        </div>
        <span className="text-[11px] font-sans text-slate-500 font-medium">
          Comparison Table
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <th className="p-3 font-medium text-[11px] uppercase tracking-wider w-1/4">
                Evaluation dimension
              </th>
              <th className="p-3 font-semibold text-[11px] uppercase tracking-wider w-3/8 text-slate-900">
                {itemAName}
              </th>
              <th className="p-3 font-semibold text-[11px] uppercase tracking-wider w-3/8 text-slate-900">
                {itemBName}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? 'bg-white hover:bg-slate-50/60' : 'bg-slate-50/30 hover:bg-slate-50/60'}
              >
                <td className="p-3 font-medium text-slate-700 text-xs">
                  {row.dimension}
                </td>
                <td className="p-3 text-slate-600 leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    {row.advantage === 'A' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <span>{row.itemA}</span>
                  </div>
                </td>
                <td className="p-3 text-slate-600 leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    {row.advantage === 'B' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <span>{row.itemB}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
