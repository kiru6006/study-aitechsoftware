import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  BookOpen
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

  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSubjectId = pathParts[0] || 'ai-cyber-security';
  const currentUnitId = pathParts[1] === 'units' ? pathParts[2] : null;
  const currentConceptId = pathParts[1] === 'concepts' ? pathParts[2] : null;

  const currentSubject = catalog.subjects[currentSubjectId] || Object.values(catalog.subjects)[0];
  const units = getSubjectUnits(currentSubject?.id || 'ai-cyber-security');

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

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors text-center ${
      isActive
        ? 'bg-slate-900 text-white font-semibold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-72 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Course Card Header */}
        <div className="p-4 border-b border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-sans font-medium text-slate-500">
              Active Curriculum
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
              {currentSubject?.code || 'MAI-OL506A-3'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60">
            <h2 className="font-serif text-sm font-semibold text-slate-900 leading-snug">
              {currentSubject?.name || 'AI for Cyber Security'}
            </h2>
            <p className="text-[11px] text-slate-500 font-sans mt-0.5">
              5 syllabus units • Comprehensive study pack
            </p>
          </div>

          {/* Quick Segment Links */}
          <div className="grid grid-cols-4 gap-1 p-0.5 bg-slate-100 rounded-lg">
            <NavLink to={`/${currentSubject.id}`} end onClick={onClose} className={navItemClass}>
              Overview
            </NavLink>
            <NavLink to={`/${currentSubject.id}/case-studies`} onClick={onClose} className={navItemClass}>
              Cases
            </NavLink>
            <NavLink to={`/${currentSubject.id}/exam-prep`} onClick={onClose} className={navItemClass}>
              Notes
            </NavLink>
            <NavLink to={`/${currentSubject.id}/revision`} onClick={onClose} className={navItemClass}>
              Revision
            </NavLink>
          </div>
        </div>

        {/* Units Navigation List */}
        <div className="px-4 pt-3 pb-1.5 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>Syllabus Units</span>
          <span className="text-[10px] font-mono text-slate-400">
            {units.length} Modules
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-1 space-y-1 text-xs">
          {units.map(unit => {
            const isUnitActive = currentUnitId === unit.id;
            const isExpanded = !!expandedUnits[unit.id];

            return (
              <div
                key={unit.id}
                className={`rounded-lg border transition-all overflow-hidden ${
                  isUnitActive
                    ? 'border-slate-300 bg-white shadow-2xs'
                    : 'border-transparent hover:border-slate-200 bg-transparent hover:bg-slate-50'
                }`}
              >
                {/* Unit Header */}
                <div className="flex items-center justify-between p-2">
                  <NavLink
                    to={`/${currentSubject.id}/units/${unit.id}`}
                    onClick={onClose}
                    className="flex-1 flex items-center gap-2.5 pr-1 min-w-0"
                  >
                    <span
                      className={`w-5 h-5 rounded text-[10px] flex items-center justify-center font-mono font-semibold shrink-0 ${
                        isUnitActive
                          ? 'bg-[#9F1239] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      U{unit.unitNumber}
                    </span>
                    <span
                      className={`truncate text-xs ${
                        isUnitActive ? 'font-semibold text-slate-900' : 'text-slate-700'
                      }`}
                    >
                      {unit.title}
                    </span>
                  </NavLink>

                  <button
                    onClick={e => toggleUnit(unit.id, e)}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer transition-colors shrink-0"
                    aria-label="Toggle unit topics"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Sub-topics */}
                {isExpanded && (
                  <div className="px-3 pb-2.5 pt-1 space-y-1.5 border-t border-slate-100 bg-slate-50/50">
                    {unit.topics.map(topic => (
                      <div key={topic.id} className="space-y-0.5">
                        <div className="text-[11px] font-medium text-slate-500 truncate flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>{topic.title}</span>
                        </div>

                        <div className="pl-2 space-y-0.5">
                          {topic.conceptIds.map(cId => {
                            const isDone = completedIds.includes(cId);
                            const isConceptActive = currentConceptId === cId;

                            return (
                              <NavLink
                                key={cId}
                                to={`/${currentSubject.id}/concepts/${cId}`}
                                onClick={onClose}
                                className={`flex items-center justify-between px-2 py-1 rounded text-[11px] transition-colors ${
                                  isConceptActive
                                    ? 'bg-rose-50 text-[#9F1239] font-medium'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                              >
                                <span className="truncate">
                                  {cId.replace(/^c\d+-/, '').replace(/-/g, ' ')}
                                </span>
                                {isDone && (
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 ml-1.5" />
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

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-white text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>SubjectLab v1.0</span>
          </div>
          <span className="font-mono text-slate-400">Offline ready</span>
        </div>
      </aside>
    </>
  );
};
