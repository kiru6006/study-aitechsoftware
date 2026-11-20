import React from 'react';
import { Columns3, CheckCircle2, XCircle } from 'lucide-react';

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
    <div className="rounded-xl border border-[#C70234]/30 bg-white overflow-hidden shadow-xs my-3">
      {/* Header */}
      <div className="px-3.5 py-2.5 bg-[#FEF7E0] border-b border-[#FBBC05]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Columns3 className="w-4 h-4 text-[#C70234]" />
          <div>
            <h3 className="font-serif text-sm font-bold text-[#202124]">{title}</h3>
            {subtitle && <p className="text-[11px] text-[#92400E]">{subtitle}</p>}
          </div>
        </div>
        <span className="text-[11px] font-sans font-medium text-[#92400E] bg-white px-2 py-0.5 rounded border border-[#FBBC05]/50">
          Comparative Analysis
        </span>
      </div>

      {/* Table Container with scroll for mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#FFFBEB] border-b-2 border-[#FBBC05] text-[#92400E]">
              <th className="p-2.5 font-semibold text-[11px] uppercase tracking-wider w-1/4">
                Evaluation Dimension
              </th>
              <th className="p-2.5 font-semibold text-[11px] uppercase tracking-wider w-3/8 text-[#C70234]">
                {itemAName}
              </th>
              <th className="p-2.5 font-semibold text-[11px] uppercase tracking-wider w-3/8 text-[#1A73E8]">
                {itemBName}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#FBBC05]/20">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? 'bg-white hover:bg-[#FEF7E0]/30' : 'bg-[#FAF9F5] hover:bg-[#FEF7E0]/30'}
              >
                <td className="p-2.5 font-semibold text-[#202124] text-[11px]">
                  {row.dimension}
                </td>
                <td className="p-2.5 text-[#374151] leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    {row.advantage === 'A' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#188038] shrink-0 mt-0.5" />
                    )}
                    <span>{row.itemA}</span>
                  </div>
                </td>
                <td className="p-2.5 text-[#374151] leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    {row.advantage === 'B' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#188038] shrink-0 mt-0.5" />
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
