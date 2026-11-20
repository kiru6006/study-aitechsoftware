import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Network, Sparkles, ChevronRight, Eye } from 'lucide-react';
import { Topic, Concept } from '../../types/content';

interface MindmapNode {
  id: string;
  title: string;
  concepts: { id: string; title: string }[];
}

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
    <div className="rounded-xl border border-[#C70234]/30 bg-white overflow-hidden shadow-xs my-3">
      {/* Header */}
      <div className="px-3.5 py-2.5 bg-[#FEF7E0] border-b border-[#FBBC05]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-[#C70234]" />
          <h3 className="font-serif text-sm font-bold text-[#202124]">
            Visual Concept Mindmap • Unit {unitNumber}
          </h3>
        </div>
        <span className="text-[11px] font-sans font-medium text-[#92400E] bg-white px-2 py-0.5 rounded border border-[#FBBC05]/50">
          Interactive Diagram
        </span>
      </div>

      {/* Mindmap Container */}
      <div className="p-4 bg-[#FAF9F5] border-b border-[#DADCE0]/60">
        {/* Mindmap Graph Layout */}
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Central Root Node */}
          <div className="w-full md:w-1/4 flex justify-center">
            <div className="w-full max-w-[220px] p-3 rounded-xl bg-gradient-to-br from-[#C70234] to-[#9E0027] text-white shadow-sm border-2 border-[#FBBC05] text-center">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#FEF7E0] block font-semibold">
                Unit {unitNumber} Core
              </span>
              <h4 className="font-serif text-xs font-bold leading-tight mt-0.5">
                {unitTitle}
              </h4>
            </div>
          </div>

          {/* SVG Connector Indicator (Horizontal on desktop, vertical on mobile) */}
          <div className="hidden md:flex items-center text-[#FBBC05] font-bold">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M0 12H35M35 12L25 6M35 12L25 18" stroke="#D97706" strokeWidth="2" strokeDasharray="3 3"/>
            </svg>
          </div>

          {/* Topics Cluster */}
          <div className="w-full md:w-2/5 space-y-2">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#92400E] block px-1">
              Select Topic Branch:
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {topics.map((topic, idx) => {
                const isSelected = topic.id === selectedTopicId;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`text-left p-2 rounded-lg text-xs font-sans font-medium transition-all flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? 'bg-[#FEF7E0] border-[#FBBC05] text-[#7C2D12] shadow-xs font-semibold'
                        : 'bg-white border-[#DADCE0] text-[#202124] hover:border-[#FBBC05] hover:bg-[#FEF7E0]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded text-[10px] flex items-center justify-center font-bold ${
                        isSelected ? 'bg-[#C70234] text-white' : 'bg-[#F1F3F4] text-[#5F6368]'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="line-clamp-1">{topic.title}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C70234]' : 'text-[#80868B]'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* SVG Connector Indicator */}
          <div className="hidden md:flex items-center text-[#FBBC05] font-bold">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M0 12H35M35 12L25 6M35 12L25 18" stroke="#C70234" strokeWidth="2" strokeDasharray="3 3"/>
            </svg>
          </div>

          {/* Leaf Concepts of Selected Topic */}
          <div className="w-full md:w-1/3 p-3 rounded-xl bg-white border border-[#C70234]/30 shadow-xs space-y-2">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C70234] block">
              Active Concepts in Branch:
            </span>
            {activeTopic && (
              <div className="space-y-1.5">
                {activeTopic.conceptIds.map(cId => {
                  const title = conceptMap.get(cId) || cId.replace(/^c\d+-/, '').replace(/-/g, ' ');
                  return (
                    <Link
                      key={cId}
                      to={`/${subjectId}/concepts/${cId}`}
                      className="group flex items-center justify-between p-2 rounded-lg bg-[#FAF9F5] hover:bg-[#FCE8EF] border border-[#FBBC05]/40 hover:border-[#C70234]/40 transition-colors"
                    >
                      <span className="text-[11px] font-sans text-[#202124] font-medium group-hover:text-[#C70234] line-clamp-1">
                        {title}
                      </span>
                      <Eye className="w-3.5 h-3.5 text-[#5F6368] group-hover:text-[#C70234] shrink-0 ml-1" />
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
