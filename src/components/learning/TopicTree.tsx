import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, FolderTree, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { Topic, Concept } from '../../types/content';
import { getCompletedConcepts } from '../../lib/contentLoader';

interface TopicTreeProps {
  topics: Topic[];
  subjectId: string;
  concepts: Concept[];
}

export const TopicTree: React.FC<TopicTreeProps> = ({
  topics,
  subjectId,
  concepts
}) => {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    topics.forEach((t, i) => {
      init[t.id] = i === 0; // expand first topic by default
    });
    return init;
  });

  const completed = getCompletedConcepts();
  const conceptMap = new Map(concepts.map(c => [c.id, c]));

  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-xl border border-[#C70234]/30 bg-white overflow-hidden shadow-xs my-3">
      {/* Header */}
      <div className="px-3.5 py-2.5 bg-[#FEF7E0] border-b border-[#FBBC05]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderTree className="w-4 h-4 text-[#C70234]" />
          <h3 className="font-serif text-sm font-bold text-[#202124]">
            Topic Structure & Concept Hierarchy
          </h3>
        </div>
        <span className="text-[11px] font-sans font-medium text-[#92400E] bg-white px-2 py-0.5 rounded border border-[#FBBC05]/50">
          {topics.length} Syllabus Modules
        </span>
      </div>

      {/* Tree Content */}
      <div className="p-3 space-y-2">
        {topics.map((topic, idx) => {
          const isExpanded = !!expandedTopics[topic.id];
          const topicConcepts = topic.conceptIds
            .map(id => conceptMap.get(id))
            .filter((c): c is Concept => !!c);

          const doneCount = topicConcepts.filter(c => completed.includes(c.id)).length;

          return (
            <div
              key={topic.id}
              className="rounded-lg border border-[#DADCE0] hover:border-[#FBBC05] transition-colors overflow-hidden"
            >
              {/* Topic Header Toggle */}
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full px-3 py-2 bg-[#FAF9F5] hover:bg-[#FEF7E0]/40 flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#C70234]/10 text-[#C70234] font-bold text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-sans font-semibold text-xs text-[#202124]">
                    {topic.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#5F6368] bg-white px-1.5 py-0.5 rounded border border-[#DADCE0]">
                    {doneCount}/{topicConcepts.length} Done
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#5F6368]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#5F6368]" />
                  )}
                </div>
              </button>

              {/* Concepts List */}
              {isExpanded && (
                <div className="p-2.5 bg-white border-t border-[#DADCE0]/60 space-y-1.5">
                  {topicConcepts.map(c => {
                    const isDone = completed.includes(c.id);
                    return (
                      <div
                        key={c.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-[#FAF9F5] hover:bg-[#FCE8EF]/40 border border-[#FBBC05]/30 hover:border-[#C70234]/40 transition-colors gap-2"
                      >
                        <div className="flex items-start gap-2">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-[#188038] shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-[#BDC1C6] shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h4 className="text-xs font-semibold text-[#202124] line-clamp-1">
                              {c.title}
                            </h4>
                            <p className="text-[11px] text-[#5F6368] line-clamp-1 mt-0.5">
                              {c.understanding.definition}
                            </p>
                          </div>
                        </div>

                        <Link
                          to={`/${subjectId}/concepts/${c.id}`}
                          className="self-end sm:self-auto inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white text-[#C70234] hover:bg-[#C70234] hover:text-white border border-[#C70234]/30 text-[11px] font-semibold transition-colors shrink-0"
                        >
                          <span>Deep Dive</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
