import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode2 } from 'lucide-react';

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
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs my-4">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 text-slate-300 text-xs font-sans">
        <div className="flex items-center gap-2.5">
          <span className="font-mono font-medium text-[11px] text-slate-400 uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800">
            {language}
          </span>
          {caption && (
            <span className="text-slate-200 text-xs font-medium truncate">
              {caption}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="bg-[#18181B] text-[#E4E4E7] p-4 font-mono text-xs overflow-x-auto leading-relaxed">
        <pre className="m-0 font-mono select-all">
          <code>{code}</code>
        </pre>
      </div>

      {/* Sample Input & Expected Output Panels */}
      {(sampleInput || expectedOutput) && (
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-slate-200 bg-slate-50/50">
          {sampleInput && (
            <div className="p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Sample input:</span>
              </div>
              <pre className="m-0 p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                {sampleInput}
              </pre>
            </div>
          )}

          {expectedOutput && (
            <div className="p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                <span>Expected output:</span>
              </div>
              <pre className="m-0 p-2.5 rounded-lg bg-[#0F172A] border border-slate-800 text-emerald-400 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                {expectedOutput}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Walkthrough list */}
      {explanation && explanation.length > 0 && (
        <div className="p-3.5 bg-white border-t border-slate-100 space-y-2 text-xs">
          <span className="font-medium text-slate-700 text-[11px] uppercase tracking-wider block">
            Implementation Walkthrough:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {explanation.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-snug">
                <span className="w-4 h-4 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-slate-700">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
