import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Layers,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  FileText,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { getCatalog, getSubjectUnits, getCompletedConcepts } from '../../lib/contentLoader';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'subjectlab_nav_state';

interface SavedNavState {
  expandedSemester: string | null;
  expandedSubject: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const catalog = getCatalog();
  const location = useLocation();
  const navigate = useNavigate();
  const completedIds = getCompletedConcepts();

  // Extract params from pathname: /:subjectId/... or /:subjectId/units/:unitId
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSubjectId = pathParts[0] || 'ai-cyber-security';
  const currentUnitId = pathParts[1] === 'units' ? pathParts[2] : null;
  const currentConceptId = pathParts[1] === 'concepts' ? pathParts[2] : null;

  // Find semester containing currentSubjectId
  const currentSemester = catalog.programs[0]?.semesters.find(s =>
    s.subjectIds.includes(currentSubjectId)
  );

  // Persistent navigation state
  const [expandedSemester, setExpandedSemester] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedNavState = JSON.parse(saved);
        if (parsed.expandedSemester) return parsed.expandedSemester;
      }
    } catch {}
    return currentSemester ? currentSemester.id : 'sem-3';
  });

  const [expandedSubject, setExpandedSubject] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedNavState = JSON.parse(saved);
        if (parsed.expandedSubject) return parsed.expandedSubject;
      }
    } catch {}
    return currentSubjectId || 'ai-cyber-security';
  });

  // Save navigation state
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          expandedSemester,
          expandedSubject
        })
      );
    } catch {}
  }, [expandedSemester, expandedSubject]);

  // Keep expanded state aligned when route changes
  useEffect(() => {
    if (currentSemester && expandedSemester !== currentSemester.id) {
      setExpandedSemester(currentSemester.id);
    }
    if (currentSubjectId && expandedSubject !== currentSubjectId) {
      setExpandedSubject(currentSubjectId);
    }
  }, [currentSubjectId, currentSemester]);

  const toggleSemester = (semId: string) => {
    setExpandedSemester(prev => (prev === semId ? null : semId));
  };

  const toggleSubject = (subId: string) => {
    setExpandedSubject(prev => (prev === subId ? null : subId));
  };

  const handleSubjectClick = (subId: string) => {
    setExpandedSubject(subId);
    navigate(`/${subId}`);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* 3-Level Sidebar Container */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-72 bg-white border-r border-[#C70234]/30 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header Badge */}
        <div className="p-3 bg-[#FEF7E0] border-b border-[#FBBC05]/40 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C70234]" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#92400E]">
              Academic Curriculum
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-[#C70234] border border-[#C70234]/30 font-semibold">
            {catalog.programs[0]?.name.split(' ')[0] || 'MSc'}
          </span>
        </div>

        {/* Dynamic 3-Level Hierarchy Tree */}
        <nav className="flex-1 overflow-y-auto p-2.5 space-y-1.5 text-xs font-sans">
          {catalog.programs[0]?.semesters.map(semester => {
            const isSemExpanded = expandedSemester === semester.id;
            const hasSubjects = semester.subjectIds && semester.subjectIds.length > 0;

            return (
              <div
                key={semester.id}
                className="rounded-lg border border-[#FBBC05]/40 overflow-hidden bg-white shadow-2xs"
              >
                {/* Level 1: Semester Header */}
                <button
                  onClick={() => toggleSemester(semester.id)}
                  className={`w-full px-2.5 py-2 text-left flex items-center justify-between transition-colors cursor-pointer ${
                    isSemExpanded
                      ? 'bg-[#FEF7E0] text-[#92400E] font-bold border-b border-[#FBBC05]/40'
                      : 'bg-[#FAF9F5] text-[#202124] hover:bg-[#FEF7E0]/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded text-[10px] flex items-center justify-center font-bold font-mono ${
                        isSemExpanded
                          ? 'bg-[#C70234] text-white'
                          : 'bg-white border border-[#FBBC05] text-[#92400E]'
                      }`}
                    >
                      S{semester.number}
                    </span>
                    <span className="text-xs font-semibold">
                      Semester {semester.number}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {hasSubjects ? (
                      <span className="text-[10px] font-mono text-[#5F6368] px-1 bg-white rounded border border-[#DADCE0]">
                        {semester.subjectIds.length} sub
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#80868B] italic">Upcoming</span>
                    )}
                    {isSemExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-[#5F6368]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-[#5F6368]" />
                    )}
                  </div>
                </button>

                {/* Level 2: Subjects under Semester */}
                {isSemExpanded && (
                  <div className="p-1.5 space-y-1 bg-white">
                    {!hasSubjects ? (
                      <div className="px-2 py-2 text-[11px] text-[#80868B] italic text-center">
                        Curriculum modules upcoming
                      </div>
                    ) : (
                      semester.subjectIds.map(subId => {
                        const subjectMeta = catalog.subjects[subId];
                        const isSubExpanded = expandedSubject === subId;
                        const subjectUnits = getSubjectUnits(subId);
                        const isSubActive = currentSubjectId === subId;

                        return (
                          <div
                            key={subId}
                            className="rounded-md border border-[#DADCE0]/70 overflow-hidden"
                          >
                            {/* Subject Header */}
                            <div
                              className={`flex items-center justify-between p-2 cursor-pointer transition-colors ${
                                isSubActive
                                  ? 'bg-[#FCE8EF]/70 text-[#C70234]'
                                  : 'bg-white text-[#202124] hover:bg-[#FAF9F5]'
                              }`}
                            >
                              <button
                                onClick={() => handleSubjectClick(subId)}
                                className="flex-1 text-left pr-1"
                              >
                                <div className="text-[11px] font-bold line-clamp-1">
                                  {subjectMeta?.name || subId}
                                </div>
                                <div className="text-[10px] font-mono text-[#5F6368]">
                                  {subjectMeta?.code}
                                </div>
                              </button>

                              <button
                                onClick={() => toggleSubject(subId)}
                                className="p-1 rounded hover:bg-black/5 text-[#5F6368]"
                                aria-label="Toggle units"
                              >
                                {isSubExpanded ? (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>

                            {/* Level 3: Units under Subject */}
                            {isSubExpanded && (
                              <div className="p-1 bg-[#FAF9F5] border-t border-[#DADCE0]/60 space-y-0.5 pl-2">
                                {/* Quick Navigation for the Subject */}
                                <div className="py-1 border-b border-[#DADCE0]/40 flex flex-wrap gap-1 mb-1">
                                  <NavLink
                                    to={`/${subId}`}
                                    end
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                      `text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                        isActive
                                          ? 'bg-[#C70234] text-white'
                                          : 'bg-white text-[#5F6368] hover:text-[#202124] border border-[#DADCE0]'
                                      }`
                                    }
                                  >
                                    Overview
                                  </NavLink>
                                  <NavLink
                                    to={`/${subId}/case-studies`}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                      `text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                        isActive
                                          ? 'bg-[#C70234] text-white'
                                          : 'bg-white text-[#5F6368] hover:text-[#202124] border border-[#DADCE0]'
                                      }`
                                    }
                                  >
                                    Cases
                                  </NavLink>
                                  <NavLink
                                    to={`/${subId}/exam-prep`}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                      `text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                        isActive
                                          ? 'bg-[#C70234] text-white'
                                          : 'bg-white text-[#5F6368] hover:text-[#202124] border border-[#DADCE0]'
                                      }`
                                    }
                                  >
                                    Study Notes
                                  </NavLink>
                                  <NavLink
                                    to={`/${subId}/revision`}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                      `text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                        isActive
                                          ? 'bg-[#C70234] text-white'
                                          : 'bg-white text-[#5F6368] hover:text-[#202124] border border-[#DADCE0]'
                                      }`
                                    }
                                  >
                                    Revision
                                  </NavLink>
                                </div>

                                {/* Units List */}
                                <div className="space-y-0.5">
                                  {subjectUnits.map(unit => {
                                    const isUnitActive = currentUnitId === unit.id;
                                    return (
                                      <NavLink
                                        key={unit.id}
                                        to={`/${subId}/units/${unit.id}`}
                                        onClick={onClose}
                                        className={`flex items-center justify-between px-2 py-1.5 rounded text-[11px] font-sans transition-all cursor-pointer ${
                                          isUnitActive
                                            ? 'bg-[#FEF7E0] text-[#92400E] font-bold border-l-3 border-[#C70234] shadow-2xs'
                                            : 'text-[#202124] hover:bg-[#FCE8EF]/50 hover:text-[#C70234]'
                                        }`}
                                      >
                                        <div className="flex items-center gap-1.5">
                                          <span className="w-4 h-4 rounded-full bg-white border border-[#FBBC05] text-[9px] font-bold text-[#92400E] flex items-center justify-center shrink-0">
                                            {unit.unitNumber}
                                          </span>
                                          <span className="line-clamp-1">{unit.title}</span>
                                        </div>
                                        <ChevronRight className="w-3 h-3 text-[#BDC1C6] shrink-0" />
                                      </NavLink>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer info with red & yellow accent */}
        <div className="p-2.5 border-t border-[#FBBC05]/40 bg-[#FAF9F5] text-[10px] text-[#5F6368] flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#92400E] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#188038]" />
            <span>SubjectLab Active</span>
          </div>
          <span className="font-mono text-[#C70234] font-semibold">GitHub Pages Ready</span>
        </div>
      </aside>
    </>
  );
};
