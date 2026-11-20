import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Layers,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Clock,
  KeyRound
} from 'lucide-react';
import { getSubjectMetadata, getSubjectUnits } from '../lib/contentLoader';

export const SubjectOverviewPage: React.FC = () => {
  const { subjectId = 'ai-cyber-security' } = useParams<{ subjectId?: string }>();
  const subject = getSubjectMetadata(subjectId);
  const units = getSubjectUnits(subjectId);

  if (!subject) {
    return (
      <div className="bg-white rounded-xl p-6 text-center border border-[#C70234]/30">
        <h2 className="font-serif text-lg font-bold text-[#202124]">Subject Not Found</h2>
        <p className="text-xs text-[#5F6368] mt-1">The requested academic subject does not exist in the catalog.</p>
        <Link to="/" className="inline-block mt-3 text-xs font-semibold text-[#C70234] hover:underline">
          Return to Home Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-1">
      {/* Subject Header Card */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/50 text-xs font-mono font-bold">
            {subject.code}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/30 text-xs font-sans font-semibold">
            Core Master Curriculum
          </span>
          <span className="text-xs text-[#5F6368] font-sans font-medium">
            Semester {subject.semester} • {subject.program}
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
          {subject.name}
        </h1>

        <p className="text-xs sm:text-sm text-[#5F6368] font-sans leading-relaxed max-w-3xl">
          {subject.description}
        </p>

        {/* Action Shortcuts */}
        <div className="pt-3 border-t border-[#FBBC05]/40 flex flex-wrap gap-2">
          <Link
            to={`/${subject.id}/case-studies`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C70234] text-white text-xs font-semibold hover:bg-[#B6263A] transition-colors shadow-2xs"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Banking Case Study</span>
          </Link>

          <Link
            to={`/${subject.id}/exam-prep`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/60 text-xs font-semibold hover:bg-[#FDE68A] transition-colors"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Study Notes & Answers</span>
          </Link>

          <Link
            to={`/${subject.id}/revision`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F5] text-[#202124] border border-[#DADCE0] text-xs font-semibold hover:border-[#FBBC05] hover:text-[#C70234] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Memory Codes & Cards</span>
          </Link>
        </div>
      </div>

      {/* Official Syllabus Units */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#202124]">
              Official Syllabus Units
            </h2>
            <p className="text-xs text-[#5F6368]">
              5 core curriculum units, each mapped with visual mindmaps, coding examples, and progressive study notes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {units.map(unit => (
            <div
              key={unit.id}
              className="bg-white rounded-xl p-4 border border-[#C70234]/25 hover:border-[#C70234]/60 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#C70234] to-[#9E0027] text-white font-bold text-xs flex items-center justify-center font-mono">
                    U{unit.unitNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {unit.hours && (
                      <span className="flex items-center gap-1 text-[11px] text-[#5F6368]">
                        <Clock className="w-3 h-3 text-[#C70234]" />
                        <span>{unit.hours} Hours</span>
                      </span>
                    )}
                    {unit.memoryCode && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] text-[10px] font-mono font-bold border border-[#FBBC05]/40">
                        <KeyRound className="w-3 h-3 text-[#D97706]" />
                        <span>{unit.memoryCode}</span>
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-serif text-base font-bold text-[#202124] mt-2">
                  {unit.title}
                </h3>

                <p className="mt-1 text-xs text-[#5F6368] leading-relaxed line-clamp-2">
                  {unit.summary}
                </p>

                {/* Topics List */}
                <div className="mt-2.5 pt-2 border-t border-[#FBBC05]/30 space-y-1">
                  <div className="text-[10px] font-semibold text-[#92400E] uppercase tracking-wider">
                    Topics & Modules:
                  </div>
                  {unit.topics.map(topic => (
                    <div key={topic.id} className="text-xs text-[#202124] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C70234]" />
                      <span className="line-clamp-1">{topic.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#DADCE0]/50 flex justify-end">
                <Link
                  to={`/${subject.id}/units/${unit.id}`}
                  className="text-xs font-semibold text-[#C70234] hover:text-[#9E0027] inline-flex items-center gap-1"
                >
                  <span>Open Complete Unit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Objectives & Course Outcomes with Red & Yellow Border */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 border border-[#C70234]/25 shadow-2xs space-y-2">
          <h3 className="font-serif text-sm font-bold text-[#202124] flex items-center gap-2 border-b border-[#FBBC05]/40 pb-1.5">
            <Award className="w-4 h-4 text-[#C70234]" />
            <span>Learning Objectives</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-[#5F6368] leading-relaxed">
            {subject.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#C70234] font-bold">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#C70234]/25 shadow-2xs space-y-2">
          <h3 className="font-serif text-sm font-bold text-[#202124] flex items-center gap-2 border-b border-[#FBBC05]/40 pb-1.5">
            <Layers className="w-4 h-4 text-[#D97706]" />
            <span>Course Outcomes (COs)</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-[#5F6368] leading-relaxed">
            {subject.courseOutcomes.map((co, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#FBBC05] font-bold font-mono">✓</span>
                <span>{co}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Academic Textbooks */}
      <div className="bg-white rounded-xl p-4 border border-[#C70234]/25 shadow-2xs space-y-2.5">
        <div className="flex items-center gap-2 border-b border-[#FBBC05]/40 pb-1.5">
          <BookOpen className="w-4 h-4 text-[#C70234]" />
          <h3 className="font-serif text-sm font-bold text-[#202124]">
            Recommended Textbooks & Academic References
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {subject.resources.map((res, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-[#FAF9F5] border border-[#FBBC05]/40 space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#92400E] block">
                {res.type}
              </span>
              <h4 className="text-xs font-semibold text-[#202124] leading-snug line-clamp-2">
                {res.title}
              </h4>
              <p className="text-[11px] text-[#5F6368]">{res.authorOrSource}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
