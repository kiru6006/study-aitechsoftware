import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  Layers,
  CheckCircle,
  FileText
} from 'lucide-react';
import { getSubjectUnits, getCompletedConcepts } from '../../lib/contentLoader';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { subjectId = 'ai-cyber-security' } = useParams<{ subjectId?: string }>();
  const units = getSubjectUnits(subjectId);
  const completedIds = getCompletedConcepts();

  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    'unit-1': true,
    'unit-2': false,
    'unit-3': false,
    'unit-4': false,
    'unit-5': false
  });

  const toggleUnit = (uId: string) => {
    setExpandedUnits(prev => ({ ...prev, [uId]: !prev[uId] }));
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-sans font-medium transition-all ${
      isActive
        ? 'bg-[#E8F0FE] text-[#1A73E8] font-semibold border-l-4 border-[#1A73E8]'
        : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-72 bg-white border-r border-[#DADCE0] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-[#DADCE0]/70 bg-[#F5F7FB]/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#188038]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#5F6368]">
              MSc AIML • Semester III
            </span>
          </div>
          <h2 className="font-serif text-sm font-bold text-[#202124] mt-1 leading-snug">
            AI for Cyber Security
          </h2>
          <span className="inline-block mt-1 text-[10px] font-mono text-[#5F6368] bg-[#F1F3F4] px-1.5 py-0.5 rounded">
            MAI-OL506A-3
          </span>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-sans">
          {/* Main sections */}
          <div className="space-y-1">
            <NavLink to={`/${subjectId}`} end className={navLinkClass} onClick={onClose}>
              <Layers className="w-4 h-4 text-[#1A73E8]" />
              <span>Subject Overview</span>
            </NavLink>

            <NavLink to={`/${subjectId}/case-studies`} className={navLinkClass} onClick={onClose}>
              <ShieldAlert className="w-4 h-4 text-[#C70234]" />
              <span>Industry Case Study</span>
            </NavLink>

            <NavLink to={`/${subjectId}/exam-prep`} className={navLinkClass} onClick={onClose}>
              <GraduationCap className="w-4 h-4 text-[#188038]" />
              <span>Exam Preparation</span>
            </NavLink>

            <NavLink to={`/${subjectId}/revision`} className={navLinkClass} onClick={onClose}>
              <Sparkles className="w-4 h-4 text-[#A142F4]" />
              <span>Quick Revision & Codes</span>
            </NavLink>
          </div>

          {/* Unit / Concept Tree */}
          <div className="pt-2">
            <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-[#80868B]">
              Units & Concepts
            </div>

            <div className="space-y-2">
              {units.map(unit => {
                const isExpanded = !!expandedUnits[unit.id];
                return (
                  <div key={unit.id} className="rounded-lg border border-[#DADCE0]/50 overflow-hidden bg-white">
                    <button
                      onClick={() => toggleUnit(unit.id)}
                      className="w-full px-3 py-2 text-left flex items-center justify-between bg-[#F8FAFC] hover:bg-[#F1F3F4] transition-colors"
                    >
                      <div className="flex items-center gap-2 pr-2">
                        <span className="w-5 h-5 rounded bg-[#C70234]/10 text-[#C70234] font-bold text-[10px] flex items-center justify-center shrink-0">
                          U{unit.unitNumber}
                        </span>
                        <span className="font-sans font-semibold text-[11px] text-[#202124] line-clamp-1">
                          {unit.title}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-[#5F6368] shrink-0" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-[#5F6368] shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-2 space-y-2 bg-white">
                        {unit.topics.map(topic => (
                          <div key={topic.id} className="space-y-1">
                            <div className="px-2 pt-1 text-[10px] font-semibold text-[#80868B] flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-[#DADCE0]" />
                              <span className="line-clamp-1">{topic.title}</span>
                            </div>

                            <div className="space-y-0.5 pl-2">
                              {topic.conceptIds.map(conceptId => {
                                const isDone = completedIds.includes(conceptId);
                                return (
                                  <NavLink
                                    key={conceptId}
                                    to={`/${subjectId}/concepts/${conceptId}`}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                      `flex items-center justify-between px-2 py-1.5 rounded text-[11px] font-sans transition-colors ${
                                        isActive
                                          ? 'bg-[#E8F0FE] text-[#1A73E8] font-medium'
                                          : 'text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]'
                                      }`
                                    }
                                  >
                                    <span className="line-clamp-1">
                                      {conceptId.replace(/^c\d+-/, '').replace(/-/g, ' ')}
                                    </span>
                                    {isDone && (
                                      <CheckCircle className="w-3 h-3 text-[#188038] shrink-0 ml-1" />
                                    )}
                                  </NavLink>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer info */}
        <div className="p-3 border-t border-[#DADCE0] bg-[#F8FAFC] text-[10px] text-[#5F6368] flex items-center justify-between">
          <span>SubjectLab v1.0</span>
          <span className="font-mono text-[#188038]">Offline Ready</span>
        </div>
      </aside>
    </>
  );
};
