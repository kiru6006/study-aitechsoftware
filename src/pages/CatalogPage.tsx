import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ShieldCheck, CheckCircle2, Award, Clock, ShieldAlert } from 'lucide-react';
import { getCatalog, getCompletedConcepts } from '../lib/contentLoader';

export const CatalogPage: React.FC = () => {
  const catalog = getCatalog();
  const completedCount = getCompletedConcepts().length;

  return (
    <div className="space-y-2.5 py-1 text-black font-sans">
      {/* Editorial Banner - Compact */}
      <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#C70234]/30 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] text-[10px] font-mono font-bold border border-[#FBBC05]">
            <Award className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Academic Curriculum Series • Semester III Active</span>
          </div>

          <h1 className="font-serif text-lg sm:text-2xl font-bold text-black tracking-tight leading-snug">
            SubjectLab: Academic Rigour & High-Assurance Digital Learning
          </h1>

          <p className="text-xs text-gray-700 font-sans leading-relaxed">
            University syllabus alignment, interactive case-based investigation engines, visual concept mindmaps, and court-admissible forensic reporting.
          </p>

          <div className="pt-0.5 flex flex-wrap items-center gap-3 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#188038]" />
              <span className="font-bold">{completedCount} Concepts Mastered</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C70234]" />
              <span>Offline Ready on GitHub Pages</span>
            </span>
          </div>
        </div>
      </div>

      {/* Program & Enrolled Subjects Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-sm font-bold text-black">
            Enrolled Academic Disciplines (Semester III)
          </h2>
          <span className="text-[10px] font-mono font-bold text-gray-500">
            MSc AI & ML Series
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {Object.values(catalog.subjects).map(subject => {
            const isCF = subject.id === 'cyber-forensics';
            return (
              <Link
                key={subject.id}
                to={`/${subject.id}`}
                className="group block bg-white rounded-lg p-3 border border-[#DADCE0] hover:border-[#C70234] shadow-2xs hover:shadow-xs transition-all space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]">
                      {subject.code}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 font-semibold">
                      Semester {subject.semester} • 3 Credits
                    </span>
                  </div>
                  <span className="p-1 rounded text-gray-400 group-hover:text-[#C70234] group-hover:bg-[#FCE8EF] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-sm font-bold text-black group-hover:text-[#C70234] transition-colors">
                    {subject.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-700 font-sans line-clamp-2 leading-relaxed">
                    {subject.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#DADCE0] flex items-center justify-between text-[11px]">
                  <span className="font-mono text-gray-600 text-[10px]">
                    {isCF ? '₹5Cr Bank Case • 5 Units • Labs' : '5 Units • Threat Detection • Fraud ML'}
                  </span>
                  <span className="text-[#C70234] font-bold flex items-center gap-0.5 text-xs">
                    <span>Open Subject</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};