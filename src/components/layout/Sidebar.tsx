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
  CheckCircle2,
  FolderOpen,
  Hash,
  Eye
} from 'lucide-react';
import { getCatalog, getSubjectUnits, getCompletedConcepts } from '../../lib/contentLoader';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'subjectlab_expanded_units';

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const catalog = getCatalog();
  const location = useLocation();
  const navigate = useNavigate();
  const completedIds = getCompletedConcepts();

  // Extract params from pathname: /:subjectId/...
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSubjectId = pathParts[0] || 'ai-cyber-security';
  const currentUnitId = pathParts[1] === 'units' ? pathParts[2] : null;
  const currentConceptId = pathParts[1] === 'concepts' ? pathParts[2] : null;

  const currentSubject = catalog.subjects[currentSubjectId] || Object.values(catalog.subjects)[0];
  const units = getSubjectUnits(currentSubject?.id || 'ai-cyber-security');

  // Track expanded units for showing topic bullet points
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { 'unit-1': true };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expandedUnits));
    } catch {}
  }, [expandedUnits]);

  // Auto-expand current active unit
  useEffect(() => {
    if (currentUnitId) {
      setExpandedUnits(prev => ({ ...prev, [currentUnitId]: true }));
    }
  }, [currentUnitId]);

  const toggleUnit = (uId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setExpandedUnits(prev => ({ ...prev, [uId]: !prev[uId] }));
  };

  const allSubjects = Object.values(catalog.subjects);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Subject-First Sidebar Container */}
      <aside
        className={`fixed top-13 bottom-0 left-0 z-40 w-72 bg-white border-r border-[#C70234]/25 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Active Subject Selector Card */}
        <div className="p-3 bg-[#FEF7E0]/60 border-b border-[#FBBC05]/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#92400E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C70234]" />
              Course Curriculum
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-[#C70234] border border-[#C70234]/30 font-semibold">
              {currentSubject?.code || 'MAI-OL506A-3'}
            </span>
          </div>

          {/* If single subject, show subject card; if multiple, list selector */}
          <div className="space-y-1">
            {allSubjects.map(subj => {
              const isActive = subj.id === currentSubject?.id;
              return (
                <button
                  key={subj.id}
                  onClick={() => {
                    navigate(`/${subj.id}`);
                    onClose();
                  }}
                  className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-white border-[#C70234] shadow-2xs text-[#C70234]'
                      : 'bg-[#FAF9F5] border-[#DADCE0] text-[#202124] hover:border-[#FBBC05]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                      isActive ? 'bg-[#C70234] text-white' : 'bg-[#FEF7E0] text-[#92400E]'
                    }`}>
                      AI
                    </div>
                    <div>
                      <h3 className="font-serif text-xs font-bold leading-tight line-clamp-1">
                        {subj.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#5F6368]">
                        5 Syllabus Units
                      </span>
                    </div>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C70234]" />}
                </button>
              );
            })}
          </div>

          {/* Quick Hub Navigation Pills */}
          <div className="grid grid-cols-4 gap-1 pt-1">
            <NavLink
              to={`/${currentSubject.id}`}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `text-[10px] py-1 text-center rounded font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#C70234] text-white shadow-2xs'
                    : 'bg-white text-[#5F6368] hover:bg-[#FCE8EF] hover:text-[#C70234] border border-[#DADCE0]'
                }`
              }
              title="Subject Overview"
            >
              Overview
            </NavLink>
            <NavLink
              to={`/${currentSubject.id}/case-studies`}
              onClick={onClose}
              className={({ isActive }) =>
                `text-[10px] py-1 text-center rounded font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#C70234] text-white shadow-2xs'
                    : 'bg-white text-[#5F6368] hover:bg-[#FCE8EF] hover:text-[#C70234] border border-[#DADCE0]'
                }`
              }
              title="Industry Case Studies"
            >
              Cases
            </NavLink>
            <NavLink
              to={`/${currentSubject.id}/exam-prep`}
              onClick={onClose}
              className={({ isActive }) =>
                `text-[10px] py-1 text-center rounded font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#C70234] text-white shadow-2xs'
                    : 'bg-white text-[#5F6368] hover:bg-[#FCE8EF] hover:text-[#C70234] border border-[#DADCE0]'
                }`
              }
              title="Study Notes & Q&A"
            >
              Notes
            </NavLink>
            <NavLink
              to={`/${currentSubject.id}/revision`}
              onClick={onClose}
              className={({ isActive }) =>
                `text-[10px] py-1 text-center rounded font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#C70234] text-white shadow-2xs'
                    : 'bg-white text-[#5F6368] hover:bg-[#FCE8EF] hover:text-[#C70234] border border-[#DADCE0]'
                }`
              }
              title="Quick Revision & Flashcards"
            >
              Revision
            </NavLink>
          </div>
        </div>

        {/* Units Navigation List */}
        <div className="px-3 pt-2 pb-1 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#92400E]">
          <span>Syllabus Units</span>
          <span className="text-[10px] font-mono text-[#5F6368] font-normal">
            {units.length} Units
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-1.5 text-xs font-sans">
          {units.map(unit => {
            const isUnitActive = currentUnitId === unit.id;
            const isExpanded = !!expandedUnits[unit.id];

            return (
              <div
                key={unit.id}
                className={`rounded-lg border transition-all overflow-hidden ${
                  isUnitActive
                    ? 'border-[#C70234] bg-white shadow-2xs'
                    : 'border-[#FBBC05]/40 bg-[#FAF9F5] hover:border-[#FBBC05]'
                }`}
              >
                {/* Unit Header Row */}
                <div
                  className={`flex items-center justify-between p-2 cursor-pointer transition-colors ${
                    isUnitActive ? 'bg-[#FEF7E0]/60' : 'hover:bg-[#FEF7E0]/30'
                  }`}
                >
                  <NavLink
                    to={`/${currentSubject.id}/units/${unit.id}`}
                    onClick={onClose}
                    className="flex-1 flex items-center gap-2 pr-1"
                  >
                    <span
                      className={`w-5 h-5 rounded text-[10px] flex items-center justify-center font-bold font-mono shrink-0 ${
                        isUnitActive
                          ? 'bg-[#C70234] text-white'
                          : 'bg-white border border-[#FBBC05] text-[#92400E]'
                      }`}
                    >
                      U{unit.unitNumber}
                    </span>
                    <div className="flex-1">
                      <span
                        className={`font-sans text-xs leading-snug line-clamp-1 block ${
                          isUnitActive ? 'font-bold text-[#C70234]' : 'font-medium text-[#202124]'
                        }`}
                      >
                        {unit.title}
                      </span>
                    </div>
                  </NavLink>

                  <button
                    onClick={e => toggleUnit(unit.id, e)}
                    className="p-1 rounded hover:bg-black/5 text-[#5F6368] shrink-0 cursor-pointer"
                    aria-label="Toggle unit topics"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-[#C70234]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Bulleted Topics List when expanded */}
                {isExpanded && (
                  <div className="p-2 bg-white border-t border-[#FBBC05]/30 space-y-1 pl-3">
                    {unit.topics.map((topic, tIdx) => (
                      <div key={topic.id} className="space-y-0.5">
                        <div className="flex items-start gap-1.5 text-[11px] text-[#5F6368]">
                          <span className="text-[#C70234] font-bold leading-none mt-1">•</span>
                          <span className="font-semibold text-[#202124] line-clamp-1">
                            {topic.title}
                          </span>
                        </div>

                        {/* Concept Bullets */}
                        <div className="pl-3 space-y-0.5">
                          {topic.conceptIds.map(cId => {
                            const isDone = completedIds.includes(cId);
                            const isConceptActive = currentConceptId === cId;

                            return (
                              <NavLink
                                key={cId}
                                to={`/${currentSubject.id}/concepts/${cId}`}
                                onClick={onClose}
                                className={`flex items-center justify-between px-1.5 py-0.5 rounded text-[10.5px] transition-colors ${
                                  isConceptActive
                                    ? 'bg-[#FCE8EF] text-[#C70234] font-bold'
                                    : 'text-[#5F6368] hover:text-[#C70234] hover:bg-[#FAF9F5]'
                                }`}
                              >
                                <span className="line-clamp-1">
                                  {cId.replace(/^c\d+-/, '').replace(/-/g, ' ')}
                                </span>
                                {isDone && (
                                  <CheckCircle2 className="w-3 h-3 text-[#188038] shrink-0 ml-1" />
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
        </nav>

        {/* Footer info */}
        <div className="p-2.5 border-t border-[#FBBC05]/40 bg-[#FAF9F5] text-[10px] text-[#5F6368] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#92400E] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#188038]" />
            <span>SubjectLab Active</span>
          </div>
          <span className="font-mono text-[#C70234] font-semibold">GitHub Pages Ready</span>
        </div>
      </aside>
    </>
  );
};
