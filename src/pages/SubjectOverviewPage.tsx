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
  KeyRound,
  Terminal,
  Network
} from 'lucide-react';
import { getSubjectMetadata, getSubjectUnits } from '../lib/contentLoader';

export const SubjectOverviewPage: React.FC = () => {
  const { subjectId = 'cyber-forensics' } = useParams<{ subjectId?: string }>();
  const subject = getSubjectMetadata(subjectId);
  const units = getSubjectUnits(subjectId);

  if (!subject) {
    return (
      <div className="bg-white rounded-lg p-4 text-center border border-[#C70234]">
        <h2 className="font-serif text-sm font-bold text-black">Subject Not Found</h2>
        <p className="text-xs text-gray-600 mt-1">The requested academic subject does not exist in the catalog.</p>
        <Link to="/" className="inline-block mt-2 text-xs font-bold text-[#C70234] hover:underline">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const isCF = subject.id === 'cyber-forensics';

  return (
    <div className="space-y-2.5 py-1 text-black font-sans">
      {/* Subject Header Card - Compact Yellow/Red/Black */}
      <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#C70234]/30 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] text-[10px] font-mono font-bold">
              {subject.code}
            </span>
            <span className="px-1.5 py-0.2 rounded bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/30 text-[10px] font-mono font-bold">
              3 Credits • 60 Hours • 100 Marks
            </span>
            <span className="text-[10px] text-gray-500 font-mono font-medium">
              Semester {subject.semester} • {subject.program}
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold text-[#188038] bg-[#E6F4EA] px-2 py-0.5 rounded border border-[#34A853]/30">
            5 Academic Units
          </span>
        </div>

        <h1 className="font-serif text-lg sm:text-2xl font-bold text-black tracking-tight leading-snug">
          {subject.name}
        </h1>

        <p className="text-xs text-gray-700 leading-relaxed max-w-4xl">
          {subject.description}
        </p>

        {/* Action Shortcuts Toolbar */}
        <div className="pt-2 border-t border-[#DADCE0] flex flex-wrap gap-1.5 text-xs">
          <Link
            to={`/${subject.id}/investigation`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black text-[#FEF08A] font-bold hover:bg-gray-800 transition-colors shadow-2xs font-mono"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Interactive Investigation</span>
          </Link>

          <Link
            to={`/${subject.id}/case-studies`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#C70234] text-white font-bold hover:bg-[#A00028] transition-colors shadow-2xs"
          >
            <span>Master Case Study</span>
          </Link>

          <Link
            to={`/${subject.id}/mindmaps`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] font-bold hover:bg-[#FEF08A] transition-colors"
          >
            <Network className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Unit Mindmaps</span>
          </Link>

          <Link
            to={`/${subject.id}/labs`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF9F5] text-black border border-[#DADCE0] font-bold hover:border-[#FBBC05] transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Practical Labs</span>
          </Link>

          <Link
            to={`/${subject.id}/exam-prep`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF9F5] text-black border border-[#DADCE0] font-bold hover:border-[#FBBC05] transition-colors"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Exam Prep & MCQs</span>
          </Link>

          <Link
            to={`/${subject.id}/revision`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF9F5] text-black border border-[#DADCE0] font-bold hover:border-[#FBBC05] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Quick Revision</span>
          </Link>
        </div>
      </div>

      {/* Official Syllabus Units Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-sm font-bold text-black">
            Official Curriculum Units ({units.length} Units • 12 Hours / Unit)
          </h2>
          <span className="text-[10px] font-mono text-gray-500">
            Click unit to explore concepts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {units.map(unit => (
            <Link
              key={unit.id}
              to={`/${subject.id}/units/${unit.id}`}
              className="p-3 rounded-lg bg-white border border-[#DADCE0] hover:border-[#C70234] transition-all shadow-2xs space-y-1.5 group block"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded text-[10px] font-mono font-bold bg-[#C70234] text-white flex items-center justify-center">
                    U{unit.unitNumber}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05]">
                    {unit.memoryCode}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gray-500 font-semibold">
                  12 Hours
                </span>
              </div>

              <h3 className="font-serif text-xs sm:text-sm font-bold text-black group-hover:text-[#C70234] transition-colors leading-snug">
                {unit.title}
              </h3>

              <p className="text-xs text-gray-700 leading-snug line-clamp-2">
                {unit.summary}
              </p>

              <div className="pt-1.5 border-t border-[#DADCE0] flex items-center justify-between text-[11px] text-gray-600">
                <span className="font-mono text-[10px]">
                  {unit.topics.length} Syllabus Topics
                </span>
                <span className="text-[#C70234] font-bold flex items-center gap-0.5 text-xs">
                  <span>Enter Unit</span>
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