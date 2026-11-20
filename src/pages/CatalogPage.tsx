import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { getCatalog, getCompletedConcepts } from '../lib/contentLoader';

export const CatalogPage: React.FC = () => {
  const catalog = getCatalog();
  const completedCount = getCompletedConcepts().length;

  return (
    <div className="space-y-6 pb-16">
      {/* Editorial Hero */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="max-w-2xl space-y-2.5">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
            Academic Curriculum Platform
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
            Learn with rigour. Understand with code. Master cybersecurity.
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            SubjectLab is an industry-oriented academic companion engineered for university learners. 
            Direct syllabus alignment, visual concept architectures, hands-on code examples, and structured revision.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-sans text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{completedCount} concepts mastered</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>GitHub Pages offline-ready</span>
            </span>
          </div>
        </div>
      </div>

      {/* Program & Subject Catalog */}
      <div className="space-y-3">
        <div>
          <h2 className="font-serif text-lg font-semibold text-slate-900">
            Enrolled Academic Disciplines
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Select an official course to access comprehensive unit notes, architecture diagrams, and verified code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(catalog.subjects).map(subject => (
            <Link
              key={subject.id}
              to={`/${subject.id}`}
              className="group block bg-white rounded-xl p-5 border border-slate-200/80 hover:border-slate-300 shadow-2xs transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-700">
                    {subject.code}
                  </span>
                  <span className="text-xs text-slate-500">
                    Semester {subject.semester}
                  </span>
                </div>
                <span className="p-1 rounded text-slate-400 group-hover:text-slate-900 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-serif text-base font-semibold text-slate-900 mt-2.5 group-hover:text-[#9F1239] transition-colors">
                {subject.name}
              </h3>

              <p className="mt-1 text-xs text-slate-600 font-sans line-clamp-2 leading-relaxed">
                {subject.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">
                  5 Syllabus Units • Verified Code & Mindmaps
                </span>
                <span className="text-slate-900 font-medium inline-flex items-center gap-1">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
