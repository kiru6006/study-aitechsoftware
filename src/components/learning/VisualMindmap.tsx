import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Network, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Topic, Concept } from '../../types/content';

interface VisualMindmapProps {
  unitNumber: number;
  unitTitle: string;
  topics: Topic[];
  subjectId: string;
  concepts: Concept[];
}

export const VisualMindmap: React.FC<VisualMindmapProps> = ({
  unitNumber,
  unitTitle,
  topics,
  subjectId,
  concepts
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    topics[0]?.id || ''
  );

  const conceptMap = new Map(concepts.map(c => [c.id, c.title]));
  const activeTopic = topics.find(t => t.id === selectedTopicId) || topics[0];

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs my-4">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-slate-500" />
          <h3 className="font-serif text-sm font-semibold text-slate-900">
            Concept Mindmap • Unit {unitNumber}
          </h3>
        </div>
        <span className="text-[11px] font-sans text-slate-500 font-medium">
          Interactive Architecture
        </span>
      </div>

      {/* Mindmap Graph Layout */}
      <div className="p-4 sm:p-6 bg-slate-50/50">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Central Root Node */}
          <div className="w-full md:w-1/4 flex justify-center">
            <div className="w-full max-w-[220px] p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-center border-t-2 border-t-[#9F1239]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block font-medium">
                Unit {unitNumber} Module
              </span>
              <h4 className="font-serif text-xs font-semibold text-slate-900 leading-snug mt-1">
                {unitTitle}
              </h4>
            </div>
          </div>

          {/* SVG Connector */}
          <div className="hidden md:flex items-center text-slate-300">
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
              <path d="M0 10H28M28 10L20 4M28 10L20 16" stroke="#CBD5E1" strokeWidth="1.5"/>
            </svg>
          </div>

          {/* Topics Cluster */}
          <div className="w-full md:w-2/5 space-y-1.5">
            <span className="text-[11px] font-medium text-slate-500 block px-0.5">
              Select topic branch:
            </span>
            <div className="grid grid-cols-1 gap-1">
              {topics.map((topic, idx) => {
                const isSelected = topic.id === selectedTopicId;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`text-left px-3 py-2 rounded-lg text-xs font-sans transition-all flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? 'bg-white border-slate-300 text-slate-900 shadow-2xs font-semibold border-l-2 border-l-[#9F1239]'
                        : 'bg-white/60 border-slate-200/80 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-4 h-4 rounded text-[10px] flex items-center justify-center font-mono ${
                        isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="truncate">{topic.title}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ml-1 ${isSelected ? 'text-slate-900' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* SVG Connector */}
          <div className="hidden md:flex items-center text-slate-300">
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
              <path d="M0 10H28M28 10L20 4M28 10L20 16" stroke="#CBD5E1" strokeWidth="1.5"/>
            </svg>
          </div>

          {/* Concepts in Selected Branch */}
          <div className="w-full md:w-1/3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-[11px] font-medium text-slate-500 block">
              Concepts in this branch:
            </span>
            {activeTopic && (
              <div className="space-y-1">
                {activeTopic.conceptIds.map(cId => {
                  const title = conceptMap.get(cId) || cId.replace(/^c\d+-/, '').replace(/-/g, ' ');
                  return (
                    <Link
                      key={cId}
                      to={`/${subjectId}/concepts/${cId}`}
                      className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 transition-colors"
                    >
                      <span className="text-xs text-slate-700 font-medium group-hover:text-slate-900 truncate">
                        {title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 shrink-0 ml-1.5" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
