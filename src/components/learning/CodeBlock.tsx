import React, { useState } from 'react';
import { Copy, Check, Terminal, Play, FileCode2 } from 'lucide-react';

interface CodeBlockProps {
  language?: string;
  caption?: string;
  code: string;
  sampleInput?: string;
  expectedOutput?: string;
  explanation?: string[];
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  language = 'python',
  caption,
  code,
  sampleInput,
  expectedOutput,
  explanation
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[#C70234]/30 bg-white overflow-hidden shadow-xs my-3 transition-all hover:border-[#C70234]/60">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#FEF7E0] border-b border-[#FBBC05]/40 text-xs font-sans">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C70234]" />
          <span className="font-mono font-semibold uppercase text-[11px] tracking-wider text-[#92400E] px-1.5 py-0.5 rounded bg-white/80 border border-[#FBBC05]/60">
            {language}
          </span>
          {caption && (
            <span className="font-medium text-[#202124] text-xs line-clamp-1">
              {caption}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/30 text-[11px] font-medium transition-colors cursor-pointer"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#188038]" />
              <span className="text-[#188038]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="relative bg-[#1E1E2E] text-[#CDD6F4] p-3.5 font-mono text-xs overflow-x-auto leading-relaxed">
        <pre className="m-0 font-mono select-all">
          <code>{code}</code>
        </pre>
      </div>

      {/* Sample Input & Expected Output Panels */}
      {(sampleInput || expectedOutput) && (
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#FBBC05]/30 border-t border-[#FBBC05]/30 bg-[#FDFBF7]">
          {sampleInput && (
            <div className="p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#92400E]">
                <FileCode2 className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Sample Input:</span>
              </div>
              <pre className="m-0 p-2 rounded bg-white border border-[#FBBC05]/40 text-[#202124] font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                {sampleInput}
              </pre>
            </div>
          )}

          {expectedOutput && (
            <div className="p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#188038]">
                <Terminal className="w-3.5 h-3.5 text-[#188038]" />
                <span>Expected Output:</span>
              </div>
              <pre className="m-0 p-2 rounded bg-[#0F172A] border border-[#188038]/40 text-[#34D399] font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                {expectedOutput}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Code Explanation list */}
      {explanation && explanation.length > 0 && (
        <div className="p-3 bg-white border-t border-[#DADCE0]/60 space-y-1.5 text-xs text-[#5F6368]">
          <span className="font-semibold text-[#202124] text-[11px] uppercase tracking-wider block">
            Implementation Walkthrough:
          </span>
          <ul className="space-y-1.5 text-xs">
            {explanation.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-snug">
                <span className="w-4 h-4 rounded-full bg-[#FEF7E0] border border-[#FBBC05] text-[#92400E] text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-[#202124]">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
