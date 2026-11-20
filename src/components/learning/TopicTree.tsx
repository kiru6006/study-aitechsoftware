import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, FolderTree, CheckCircle2, ArrowRight } from 'lucide-react';
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
      init[t.id] = i === 0;
    });
    return init;
  });

  const completed = getCompletedConcepts();
  const conceptMap = new Map(concepts.map(c => [c.id, c]));

  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs my-4">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderTree className="w-4 h-4 text-slate-500" />
          <h3 className="font-serif text-sm font-semibold text-slate-900">
            Syllabus Modules & Topics
          </h3>
        </div>
        <span className="text-[11px] font-sans text-slate-500 font-medium">
          {topics.length} Modules
        </span>
      </div>

      {/* Tree Content */}
      <div className="p-3.5 space-y-2">
        {topics.map((topic, idx) => {
          const isExpanded = !!expandedTopics[topic.id];
          const topicConcepts = topic.conceptIds
            .map(id => conceptMap.get(id))
            .filter((c): c is Concept => !!c);

          const doneCount = topicConcepts.filter(c => completed.includes(c.id)).length;

          return (
            <div
              key={topic.id}
              className="rounded-lg border border-slate-200/80 hover:border-slate-300 transition-colors overflow-hidden"
            >
              {/* Module Header */}
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full px-3.5 py-2.5 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded bg-slate-200/70 text-slate-700 font-mono text-[10px] font-semibold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-sans font-medium text-xs text-slate-900">
                    {topic.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {doneCount}/{topicConcepts.length} done
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Concepts */}
              {isExpanded && (
                <div className="p-2 bg-white border-t border-slate-100 space-y-1">
                  {topicConcepts.map(c => {
                    const isDone = completed.includes(c.id);
                    return (
                      <div
                        key={c.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-slate-50/40 hover:bg-slate-50 border border-slate-100 transition-colors gap-2"
                      >
                        <div className="flex items-start gap-2.5">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h4 className="text-xs font-medium text-slate-900">
                              {c.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {c.understanding.definition}
                            </p>
                          </div>
                        </div>

                        <Link
                          to={`/${subjectId}/concepts/${c.id}`}
                          className="self-end sm:self-auto inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-[11px] font-medium transition-colors shrink-0 shadow-2xs"
                        >
                          <span>Deep dive</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
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
