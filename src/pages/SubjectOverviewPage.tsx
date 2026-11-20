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
      <div className="bg-white rounded-xl p-8 text-center border border-[#DADCE0]">
        <h2 className="font-serif text-xl font-bold text-[#202124]">Subject Not Found</h2>
        <p className="text-xs text-[#5F6368] mt-2">The requested academic subject does not exist in the catalog.</p>
        <Link to="/" className="inline-block mt-4 text-xs font-medium text-[#1A73E8] hover:underline">
          Return to Home Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2">
      {/* Subject Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DADCE0] mat-elevation-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded bg-[#E8F0FE] text-[#1A73E8] text-xs font-mono font-bold">
            {subject.code}
          </span>
          <span className="px-2.5 py-1 rounded bg-[#FCE8EF] text-[#C70234] text-xs font-sans font-semibold">
            {subject.university}
          </span>
          <span className="text-xs text-[#5F6368] font-sans font-medium">
            Semester {subject.semester} • {subject.program}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#202124] tracking-tight">
          {subject.name}
        </h1>

        <p className="mt-3 text-sm text-[#5F6368] font-sans leading-relaxed max-w-3xl">
          {subject.description}
        </p>

        {/* Action Shortcuts */}
        <div className="mt-6 pt-5 border-t border-[#DADCE0]/60 flex flex-wrap gap-3">
          <Link
            to={`/${subject.id}/case-studies`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C70234] text-white text-xs font-semibold hover:bg-[#B6263A] transition-colors shadow-sm"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Banking Case Study</span>
          </Link>

          <Link
            to={`/${subject.id}/exam-prep`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#188038] text-white text-xs font-semibold hover:bg-[#136C30] transition-colors shadow-sm"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Model Exam Answers</span>
          </Link>

          <Link
            to={`/${subject.id}/revision`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F1F3F4] text-[#202124] text-xs font-semibold hover:bg-[#DADCE0] transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#A142F4]" />
            <span>Memory Codes & Cards</span>
          </Link>
        </div>
      </div>

      {/* Official Syllabus Units */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#202124]">
              Official Syllabus Units
            </h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              5 core curriculum units, each mapped with specific memory shortcuts and concept modules.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {units.map(unit => (
            <div
              key={unit.id}
              className="bg-white rounded-xl p-5 border border-[#DADCE0] mat-elevation-1 hover:border-[#1A73E8] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-[#C70234]/10 text-[#C70234] font-bold text-xs flex items-center justify-center font-mono">
                    U{unit.unitNumber}
                  </span>
                  <div className="flex items-center gap-2">
                    {unit.hours && (
                      <span className="flex items-center gap-1 text-[11px] text-[#5F6368]">
                        <Clock className="w-3 h-3" />
                        <span>{unit.hours} Hours</span>
                      </span>
                    )}
                    {unit.memoryCode && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#FEF7E0] text-[#B06000] text-[10px] font-mono font-bold border border-[#FBBC05]/30">
                        <KeyRound className="w-3 h-3" />
                        <span>{unit.memoryCode}</span>
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-serif text-base font-bold text-[#202124] mt-2">
                  {unit.title}
                </h3>

                <p className="mt-1.5 text-xs text-[#5F6368] leading-relaxed">
                  {unit.summary}
                </p>

                {/* Topics List */}
                <div className="mt-3 pt-3 border-t border-[#DADCE0]/50 space-y-1.5">
                  <div className="text-[10px] font-semibold text-[#80868B] uppercase tracking-wider">
                    Topics & Concepts
                  </div>
                  {unit.topics.map(topic => (
                    <div key={topic.id} className="text-xs text-[#202124] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]" />
                      <span>{topic.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DADCE0]/40 flex justify-end">
                {unit.topics[0]?.conceptIds[0] ? (
                  <Link
                    to={`/${subject.id}/concepts/${unit.topics[0].conceptIds[0]}`}
                    className="text-xs font-semibold text-[#1A73E8] hover:text-[#185ABC] inline-flex items-center gap-1"
                  >
                    <span>Start Learning Unit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-[11px] text-[#80868B]">In Progress</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Objectives & Course Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 border border-[#DADCE0] mat-elevation-1">
          <h3 className="font-serif text-base font-bold text-[#202124] flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-[#C70234]" />
            <span>Learning Objectives</span>
          </h3>
          <ul className="space-y-2 text-xs text-[#5F6368] leading-relaxed">
            {subject.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#C70234] font-bold">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#DADCE0] mat-elevation-1">
          <h3 className="font-serif text-base font-bold text-[#202124] flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-[#188038]" />
            <span>Course Outcomes (CO)</span>
          </h3>
          <ul className="space-y-2 text-xs text-[#5F6368] leading-relaxed">
            {subject.courseOutcomes.map((co, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#188038] font-bold">✓</span>
                <span>{co}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Academic Resources */}
      <div className="bg-white rounded-xl p-6 border border-[#DADCE0] mat-elevation-1">
        <h3 className="font-serif text-lg font-bold text-[#202124] mb-4">
          Authoritative Reference Material
        </h3>
        <div className="divide-y divide-[#DADCE0]">
          {subject.resources.map((res, i) => (
            <div key={i} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F1F3F4] text-[#5F6368] uppercase">
                  {res.type}
                </span>
                <h4 className="text-xs font-semibold text-[#202124] mt-1">{res.title}</h4>
                <p className="text-[11px] text-[#5F6368]">{res.authorOrSource}</p>
              </div>
              {res.url && (
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE]"
                  title="View External Source"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
