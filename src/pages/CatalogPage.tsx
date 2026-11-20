import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, ShieldCheck, CheckCircle2, Award, Clock } from 'lucide-react';
import { getCatalog, getCompletedConcepts } from '../lib/contentLoader';

export const CatalogPage: React.FC = () => {
  const catalog = getCatalog();
  const completedCount = getCompletedConcepts().length;

  return (
    <div className="space-y-8 py-4">
      {/* Editorial Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#FCE8EF] to-transparent opacity-60 pointer-events-none" />
        
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE8EF] text-[#C70234] text-xs font-semibold tracking-wide border border-[#C70234]/20 mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Academic Excellence & Exam Readiness</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#202124] tracking-tight leading-tight">
            Learn with rigour. Understand with code. Excel in examinations.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#5F6368] font-sans leading-relaxed">
            SubjectLab provides a concept-first, zero-fluff learning companion designed for university students. 
            Direct official syllabus alignment, practical industry scenarios, and verified model exam answers.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-sans text-[#5F6368]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#188038]" />
              <span>{completedCount} Concepts Mastered</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#1A73E8]" />
              <span>Offline Ready on GitHub Pages</span>
            </span>
          </div>
        </div>
      </div>

      {/* Program & Subject Catalog */}
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#202124]">
            Enrolled Academic Disciplines
          </h2>
          <p className="text-xs text-[#5F6368] mt-1 font-sans">
            Select an official course to access comprehensive unit notes, architecture diagrams, and revision codes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {catalog.programs.map(program => (
            <div key={program.id} className="space-y-3">
              {program.semesters.map(semester => (
                <div key={semester.id} className="space-y-3">
                  {semester.subjectIds.map(subjectId => {
                    const subject = catalog.subjects[subjectId];
                    if (!subject) return null;

                    return (
                      <Link
                        key={subject.id}
                        to={`/${subject.id}`}
                        className="group block bg-white rounded-xl p-5 border border-[#DADCE0] hover:border-[#1A73E8] hover:mat-elevation-2 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#E8F0FE] text-[#1A73E8]">
                              {subject.code}
                            </span>
                            <span className="text-[11px] font-sans font-medium text-[#5F6368]">
                              Semester {subject.semester}
                            </span>
                          </div>
                          <span className="p-1 rounded-full text-[#5F6368] group-hover:text-[#1A73E8] group-hover:bg-[#E8F0FE] transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-[#202124] mt-2 group-hover:text-[#1A73E8] transition-colors">
                          {subject.name}
                        </h3>

                        <p className="mt-1.5 text-xs text-[#5F6368] font-sans line-clamp-2 leading-relaxed">
                          {subject.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-[#DADCE0]/50 flex items-center justify-between text-[11px] text-[#5F6368]">
                          <span className="font-medium text-[#202124]">
                            Master Academic Curriculum
                          </span>
                          <span className="text-[#C70234] font-semibold flex items-center gap-1">
                            <span>Open Subject</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
