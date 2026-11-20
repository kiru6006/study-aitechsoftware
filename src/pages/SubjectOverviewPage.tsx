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
      <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
        <h2 className="font-serif text-lg font-semibold text-slate-900">Subject not found</h2>
        <p className="text-xs text-slate-500 mt-1">The requested academic subject does not exist in the catalog.</p>
        <Link to="/" className="inline-block mt-3 text-xs font-medium text-slate-900 underline">
          Return to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Subject Header Card */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium">
            {subject.code}
          </span>
          <span className="text-xs text-slate-500 font-sans">
            Semester {subject.semester} • {subject.program}
          </span>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            {subject.name}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
            {subject.description}
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2.5">
          <Link
            to={`/${subject.id}/case-studies`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-slate-300" />
            <span>Banking Case Study</span>
          </Link>

          <Link
            to={`/${subject.id}/exam-prep`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
            <span>Study Notes & Answers</span>
          </Link>

          <Link
            to={`/${subject.id}/revision`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>Memory Codes & Cards</span>
          </Link>
        </div>
      </div>

      {/* Official Syllabus Units */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-semibold text-slate-900">
              Official Syllabus Units
            </h2>
            <p className="text-xs text-slate-500">
              5 curriculum units mapped with visual mindmaps, coding examples, and progressive study notes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {units.map(unit => (
            <div
              key={unit.id}
              className="bg-white rounded-xl p-5 border border-slate-200/80 hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-mono text-xs font-semibold flex items-center justify-center">
                    U{unit.unitNumber}
                  </span>
                  <div className="flex items-center gap-2">
                    {unit.hours && (
                      <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{unit.hours} hours</span>
                      </span>
                    )}
                    {unit.memoryCode && (
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-mono font-medium border border-amber-200/60">
                        {unit.memoryCode}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-serif text-base font-semibold text-slate-900 mt-2.5">
                  {unit.title}
                </h3>

                <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {unit.summary}
                </p>

                {/* Topics List */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                  <div className="text-[11px] font-medium text-slate-400">
                    Topics & Modules:
                  </div>
                  {unit.topics.map(topic => (
                    <div key={topic.id} className="text-xs text-slate-700 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="truncate">{topic.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <Link
                  to={`/${subject.id}/units/${unit.id}`}
                  className="text-xs font-medium text-slate-900 hover:text-[#9F1239] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Open unit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Objectives & Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
          <h3 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Award className="w-4 h-4 text-slate-500" />
            <span>Learning Objectives</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            {subject.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
          <h3 className="font-serif text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Layers className="w-4 h-4 text-slate-500" />
            <span>Course Outcomes (COs)</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            {subject.courseOutcomes.map((co, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 font-mono">✓</span>
                <span>{co}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Academic References */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <BookOpen className="w-4 h-4 text-slate-500" />
          <h3 className="font-serif text-sm font-semibold text-slate-900">
            Recommended Textbooks & References
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {subject.resources.map((res, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-400 block font-medium">
                {res.type}
              </span>
              <h4 className="text-xs font-medium text-slate-900 leading-snug line-clamp-2">
                {res.title}
              </h4>
              <p className="text-[11px] text-slate-500">{res.authorOrSource}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
