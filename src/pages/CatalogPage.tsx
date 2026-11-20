import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ShieldCheck, CheckCircle2, Award, Clock } from 'lucide-react';
import { getCatalog, getCompletedConcepts } from '../lib/contentLoader';

export const CatalogPage: React.FC = () => {
  const catalog = getCatalog();
  const completedCount = getCompletedConcepts().length;

  return (
    <div className="space-y-4 py-1">
      {/* Editorial Banner */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#FCE8EF] to-transparent opacity-60 pointer-events-none" />

        <div className="max-w-2xl relative z-10 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FEF7E0] text-[#92400E] text-xs font-semibold tracking-wide border border-[#FBBC05]/50">
            <Award className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Academic Excellence & Industry Readiness</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight leading-tight">
            Learn with rigour. Understand with code. Excel in assessments.
          </h1>

          <p className="text-xs sm:text-sm text-[#5F6368] font-sans leading-relaxed">
            SubjectLab provides a concept-first, zero-fluff learning companion designed for university students. 
            Direct official syllabus alignment, practical industry scenarios, visual mindmaps, and verified study notes.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-sans text-[#5F6368]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#188038]" />
              <span className="font-medium">{completedCount} Concepts Mastered</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C70234]" />
              <span className="font-medium">Offline Ready on GitHub Pages</span>
            </span>
          </div>
        </div>
      </div>

      {/* Program & Subject Catalog */}
      <div className="space-y-3">
        <div>
          <h2 className="font-serif text-lg font-bold text-[#202124]">
            Enrolled Academic Disciplines
          </h2>
          <p className="text-xs text-[#5F6368] font-sans">
            Select an official course to access comprehensive unit notes, architecture diagrams, and revision codes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.values(catalog.subjects).map(subject => (
            <Link
              key={subject.id}
              to={`/${subject.id}`}
              className="group block bg-white rounded-xl p-4 border border-[#C70234]/25 hover:border-[#C70234]/70 shadow-2xs hover:shadow-xs transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/40">
                    {subject.code}
                  </span>
                  <span className="text-[11px] font-sans font-medium text-[#5F6368]">
                    Master Curriculum
                  </span>
                </div>
                <span className="p-1 rounded-full text-[#5F6368] group-hover:text-[#C70234] group-hover:bg-[#FCE8EF] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-[#202124] mt-2 group-hover:text-[#C70234] transition-colors">
                {subject.name}
              </h3>

              <p className="mt-1 text-xs text-[#5F6368] font-sans line-clamp-2 leading-relaxed">
                {subject.description}
              </p>

              <div className="mt-3 pt-2 border-t border-[#FBBC05]/30 flex items-center justify-between text-[11px] text-[#5F6368]">
                <span className="font-medium text-[#202124]">
                  5 Official Units • Full Notes & Verified Code
                </span>
                <span className="text-[#C70234] font-semibold flex items-center gap-1">
                  <span>Open Subject</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
