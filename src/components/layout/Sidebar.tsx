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
  Terminal,
  Network,
  Activity,
  Award
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
  const currentSubjectId = pathParts[0] || 'cyber-forensics';
  const currentUnitId = pathParts[1] === 'units' ? pathParts[2] : null;
  const currentConceptId = pathParts[1] === 'concepts' ? pathParts[2] : null;

  const currentSubject = catalog.subjects[currentSubjectId] || Object.values(catalog.subjects)[0];
  const units = getSubjectUnits(currentSubject?.id || 'cyber-forensics');

  // Track expanded units for showing topic bullet points
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { 'unit-1': true };
  });

  const [isSemesterMenuOpen, setIsSemesterMenuOpen] = useState(false);

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

      {/* Subject-First Compact Sidebar */}
      <aside
        className={`fixed top-11 bottom-0 left-0 z-40 w-72 bg-white border-r border-[#C70234]/30 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Semester & Subject Selection Header */}
        <div className="p-2 bg-[#FAF9F5] border-b border-[#DADCE0] space-y-1.5">
          {/* Semester Dropdown / Indicator */}
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-gray-700">
            <button
              onClick={() => setIsSemesterMenuOpen(prev => !prev)}
              className="flex items-center gap-1 hover:text-[#C70234] cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#188038]" />
              <span>SEMESTER 3 (Active)</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <span className="px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]">
              {currentSubject?.code || 'MAI-OL507B-3'}
            </span>
          </div>

          {isSemesterMenuOpen && (
            <div className="p-1.5 rounded bg-white border border-[#DADCE0] text-[10px] font-mono space-y-1">
              <div className="text-gray-400">Available Semesters:</div>
              <div className="text-gray-400 pl-1">• Semester 1 (Prerequisites)</div>
              <div className="text-gray-400 pl-1">• Semester 2 (Core Fundamentals)</div>
              <div className="text-[#C70234] font-bold pl-1">• Semester 3 (2 Subjects Active)</div>
              <div className="text-gray-400 pl-1">• Semester 4 (Capstone Research)</div>
            </div>
          )}

          {/* Subject Switcher Cards (Cyber Forensics & AI Cyber Security) */}
          <div className="space-y-1">
            {allSubjects.map(subj => {
              const isActive = subj.id === currentSubject?.id;
              const isCF = subj.id === 'cyber-forensics';
              return (
                <button
                  key={subj.id}
                  onClick={() => {
                    navigate(`/${subj.id}`);
                    onClose();
                  }}
                  className={`w-full text-left p-1.5 rounded border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-white border-[#C70234] shadow-2xs text-[#C70234]'
                      : 'bg-white border-[#DADCE0] text-gray-800 hover:border-[#FBBC05] hover:bg-[#FEF7E0]/30'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] shrink-0 font-mono ${
                        isActive
                          ? 'bg-[#C70234] text-white'
                          : 'bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]'
                      }`}
                    >
                      {isCF ? 'CF' : 'AI'}
                    </div>
                    <div className="truncate">
                      <div className="font-serif text-xs font-bold leading-tight truncate">
                        {subj.name}
                      </div>
                      <div className="text-[9px] font-mono text-gray-500">
                        {isCF ? '₹5Cr Bank Case • 5 Units' : 'AI Security • 5 Units'}
                      </div>
                    </div>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C70234] shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>

          {/* Subject-Level Modules Grid (Compact 2x4 pills) */}
          <div className="grid grid-cols-4 gap-1 pt-0.5">
            <NavLink
              to={`/${currentSubject.id}`}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `text-[10px] py-1 text-center rounded font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#C70234] text-white shadow-2xs font-bold'
                    : 'bg-white text-gray-700 hover:bg-[#FEF7E0] hover:text-[#C70234] border border-[#DADCE0]'
                }`
              }
              title="Course Overview"
            >
              Overview
            </NavLink>

            <NavLink
              to={`/${currentSubject.id}/case-studies`}
              onClick={onClose}
              className={({ isActive }) =>
                `text-[10px] py-1 text-center rounded font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#C70234] text-white shadow-2xs font-bold'
                    : 'bg-white text-gray-700 hover:bg-[#FEF7E0] hover:text-[#C70234] border border-[#DADCE0]'
                }`
              }
              title="Master Case Study"
            >
              Case
            </NavLink>

            <NavLink
              to={`/${currentSubject.id}/investigation`}
              onClick={onClose}
              className={({ isActive }) =>
                `text-[10px] py-1 text-center rounded font-semibold transition-colors ${
                  isActive
                    ? 'bg-black text-[#FEF08A] shadow-2xs font-bold'
                    : 'bg-[#FEF7E0] text-[#92400E] hover:bg-[#FEF08A] border border-[#FBBC05]'
                }`
              }
              title="Interactive Investigation"
            >
              Investigate
            </NavLink>

            <NavLink
              to={`/${currentSubject.id}/mindmaps`}
              onClick={onClose}
              className={({ isActive }) =>
                `text-[10px] py-1 text-center rounded font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#C70234] text-white shadow-2xs font-bold'
                    : 'bg-white text-gray-700 hover:bg-[#FEF7E0] hover:text-[#C70234] border border-[#DADCE0]'
                }`
              }
              title="Unit Mindmaps"
            >
              Mindmaps
            </NavLink>

            <NavLink
              to={`/${currentSubject.id}/labs`}
              onClick={onClose}
              className={({ isActive }) =>
                `text-[10px] py-1 text-center rounded font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#C70234] text-white shadow-2xs font-bold'
                    : 'bg-white text-gray-700 hover:bg-[#FEF7E0] hover:text-[#C70234] border border-[#DADCE0]'
                }`
              }
              title="Practical Labs & Simulators"
            >
              Labs
            </NavLink>

            <NavLink
              to={`/${currentSubject.id}/revision`}
              onClick={onClose}
              className={({ isActive }) =>
                `text-[10px] py-1 text-center rounded font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#C70234] text-white shadow-2xs font-bold'
                    : 'bg-white text-gray-700 hover:bg-[#FEF7E0] hover:text-[#C70234] border border-[#DADCE0]'
                }`
              }
              title="Quick Revision"
            >
              Revision
            </NavLink>

            <NavLink
              to={`/${currentSubject.id}/exam-prep`}
              onClick={onClose}
              className={({ isActive }) =>
                `text-[10px] py-1 text-center rounded font-semibold transition-colors col-span-2 ${
                  isActive
                    ? 'bg-[#C70234] text-white shadow-2xs font-bold'
                    : 'bg-white text-gray-700 hover:bg-[#FEF7E0] hover:text-[#C70234] border border-[#DADCE0]'
                }`
              }
              title="Mock Examination & 10-Mark Notes"
            >
              Mock Exam (20 MCQs + 5 Long)
            </NavLink>
          </div>
        </div>

        {/* Academic Syllabus Units Header */}
        <div className="px-2.5 pt-1.5 pb-0.5 flex items-center justify-between text-[10px] font-mono font-bold uppercase text-[#92400E]">
          <span>Academic Units ({units.length})</span>
          <span className="text-gray-500 font-normal">Click to browse topics</span>
        </div>

        {/* Units List */}
        <nav className="flex-1 overflow-y-auto p-1.5 space-y-1 text-xs">
          {units.map(unit => {
            const isUnitActive = currentUnitId === unit.id;
            const isExpanded = !!expandedUnits[unit.id];

            return (
              <div
                key={unit.id}
                className={`rounded border transition-all overflow-hidden ${
                  isUnitActive
                    ? 'border-[#C70234] bg-white shadow-2xs'
                    : 'border-[#DADCE0] bg-[#FAF9F5] hover:border-[#FBBC05]'
                }`}
              >
                {/* Unit Header Row */}
                <div
                  className={`flex items-center justify-between p-1.5 cursor-pointer transition-colors ${
                    isUnitActive ? 'bg-[#FEF7E0]/60' : 'hover:bg-[#FEF7E0]/30'
                  }`}
                >
                  <NavLink
                    to={`/${currentSubject.id}/units/${unit.id}`}
                    onClick={onClose}
                    className="flex-1 flex items-center gap-1.5 pr-1 truncate"
                  >
                    <span
                      className={`w-4 h-4 rounded text-[9px] flex items-center justify-center font-bold font-mono shrink-0 ${
                        isUnitActive
                          ? 'bg-[#C70234] text-white'
                          : 'bg-white border border-[#FBBC05] text-[#92400E]'
                      }`}
                    >
                      U{unit.unitNumber}
                    </span>
                    <span
                      className={`text-xs leading-tight truncate ${
                        isUnitActive ? 'font-bold text-[#C70234]' : 'font-medium text-black'
                      }`}
                    >
                      {unit.title}
                    </span>
                  </NavLink>

                  <button
                    onClick={e => toggleUnit(unit.id, e)}
                    className="p-0.5 rounded text-gray-500 hover:text-[#C70234] shrink-0 cursor-pointer"
                    aria-label="Toggle unit topics"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-[#C70234]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Topics & Concepts when expanded */}
                {isExpanded && (
                  <div className="p-1.5 bg-white border-t border-[#DADCE0] space-y-1 pl-2.5">
                    {unit.topics.map(topic => (
                      <div key={topic.id} className="space-y-0.5">
                        <div className="flex items-start gap-1 text-[10px] text-gray-700">
                          <span className="text-[#C70234] font-bold leading-none mt-0.5">•</span>
                          <span className="font-semibold text-black truncate">
                            {topic.title}
                          </span>
                        </div>

                        {/* Concept Bullets */}
                        <div className="pl-2 space-y-0.5">
                          {topic.conceptIds.map(cId => {
                            const isDone = completedIds.includes(cId);
                            const isConceptActive = currentConceptId === cId;

                            return (
                              <NavLink
                                key={cId}
                                to={`/${currentSubject.id}/concepts/${cId}`}
                                onClick={onClose}
                                className={`flex items-center justify-between px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                                  isConceptActive
                                    ? 'bg-[#FCE8EF] text-[#C70234] font-bold'
                                    : 'text-gray-600 hover:text-[#C70234] hover:bg-[#FAF9F5]'
                                }`}
                              >
                                <span className="truncate">
                                  {cId.replace(/^(c\d+-|cf\d+-)/, '').replace(/-/g, ' ')}
                                </span>
                                {isDone && (
                                  <CheckCircle2 className="w-2.5 h-2.5 text-[#188038] shrink-0 ml-1" />
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

        {/* Compact Footer */}
        <div className="p-2 border-t border-[#DADCE0] bg-[#FAF9F5] text-[10px] font-mono text-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#92400E] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#188038]" />
            <span>SubjectLab v1.2</span>
          </div>
          <span className="text-[#C70234] font-semibold">GitHub Pages</span>
        </div>
      </aside>
    </>
  );
};