import catalogData from '../content/catalog.json';
import unitsDataACS from '../content/msc-ai-ml/semester-3/ai-cyber-security/units.json';
import conceptsDataACS from '../content/msc-ai-ml/semester-3/ai-cyber-security/concepts.json';
import useCasesDataACS from '../content/msc-ai-ml/semester-3/ai-cyber-security/use-cases.json';
import questionsDataACS from '../content/msc-ai-ml/semester-3/ai-cyber-security/questions.json';
import revisionDataACS from '../content/msc-ai-ml/semester-3/ai-cyber-security/revision.json';

import unitsDataCF from '../content/msc-ai-ml/semester-3/cyber-forensics/units.json';
import conceptsDataCF from '../content/msc-ai-ml/semester-3/cyber-forensics/concepts.json';
import useCasesDataCF from '../content/msc-ai-ml/semester-3/cyber-forensics/use-cases.json';
import questionsDataCF from '../content/msc-ai-ml/semester-3/cyber-forensics/questions.json';
import revisionDataCF from '../content/msc-ai-ml/semester-3/cyber-forensics/revision.json';
import investigationDataCF from '../content/msc-ai-ml/semester-3/cyber-forensics/investigation.json';

import {
  CatalogData,
  SubjectMetadata,
  Unit,
  Concept,
  IndustryUseCase,
  ExamQuestion,
  RevisionPack,
  LearningCase
} from '../types/content';

// Static registry mapping subject IDs to their respective content sets
const subjectsContent: Record<string, {
  units: Unit[];
  concepts: Concept[];
  useCases: IndustryUseCase[];
  questions: ExamQuestion[];
  revision: RevisionPack;
  investigation?: LearningCase;
}> = {
  'ai-cyber-security': {
    units: unitsDataACS as Unit[],
    concepts: conceptsDataACS as Concept[],
    useCases: useCasesDataACS as IndustryUseCase[],
    questions: questionsDataACS as ExamQuestion[],
    revision: revisionDataACS as RevisionPack
  },
  'cyber-forensics': {
    units: unitsDataCF as Unit[],
    concepts: conceptsDataCF as Concept[],
    useCases: useCasesDataCF as IndustryUseCase[],
    questions: questionsDataCF as ExamQuestion[],
    revision: revisionDataCF as RevisionPack,
    investigation: investigationDataCF as unknown as LearningCase
  }
};

export function getCatalog(): CatalogData {
  return catalogData as unknown as CatalogData;
}

export function getSubjectMetadata(subjectId: string): SubjectMetadata | undefined {
  const catalog = getCatalog();
  return catalog.subjects[subjectId];
}

export function getSubjectUnits(subjectId: string): Unit[] {
  return subjectsContent[subjectId]?.units || [];
}

export function getSubjectConcepts(subjectId: string): Concept[] {
  return subjectsContent[subjectId]?.concepts || [];
}

export function getConceptById(subjectId: string, conceptId: string): Concept | undefined {
  const concepts = getSubjectConcepts(subjectId);
  return concepts.find(c => c.id === conceptId);
}

export function getSubjectUseCases(subjectId: string): IndustryUseCase[] {
  return subjectsContent[subjectId]?.useCases || [];
}

export function getSubjectExamQuestions(subjectId: string): ExamQuestion[] {
  return subjectsContent[subjectId]?.questions || [];
}

export function getSubjectRevision(subjectId: string): RevisionPack | undefined {
  return subjectsContent[subjectId]?.revision;
}

export function getSubjectInvestigation(subjectId: string): LearningCase | undefined {
  return subjectsContent[subjectId]?.investigation;
}

// LocalStorage helpers for persistence
const STORAGE_PREFIX = 'subjectlab_';

export function getCompletedConcepts(): string[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}completed_concepts`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleConceptCompleted(conceptId: string): boolean {
  try {
    const current = getCompletedConcepts();
    const index = current.indexOf(conceptId);
    let next: string[];
    let isCompleted = false;
    if (index >= 0) {
      next = current.filter(id => id !== conceptId);
      isCompleted = false;
    } else {
      next = [...current, conceptId];
      isCompleted = true;
    }
    localStorage.setItem(`${STORAGE_PREFIX}completed_concepts`, JSON.stringify(next));
    return isCompleted;
  } catch {
    return false;
  }
}

export function getBookmarkedConcepts(): string[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}bookmarked_concepts`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleConceptBookmark(conceptId: string): boolean {
  try {
    const current = getBookmarkedConcepts();
    const index = current.indexOf(conceptId);
    let next: string[];
    let isBookmarked = false;
    if (index >= 0) {
      next = current.filter(id => id !== conceptId);
      isBookmarked = false;
    } else {
      next = [...current, conceptId];
      isBookmarked = true;
    }
    localStorage.setItem(`${STORAGE_PREFIX}bookmarked_concepts`, JSON.stringify(next));
    return isBookmarked;
  } catch {
    return false;
  }
}

export function getRevisionChecklistState(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}checklist_state`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function toggleChecklistItem(itemId: string): Record<string, boolean> {
  try {
    const current = getRevisionChecklistState();
    const next = { ...current, [itemId]: !current[itemId] };
    localStorage.setItem(`${STORAGE_PREFIX}checklist_state`, JSON.stringify(next));
    return next;
  } catch {
    return {};
  }
}

export interface InvestigationProgress {
  completedActivities: Record<string, boolean>;
  score: number;
  totalAttempts: number;
  lastUpdated: string;
}

export function getInvestigationProgress(subjectId: string): InvestigationProgress {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}inv_progress_${subjectId}`);
    return raw ? JSON.parse(raw) : { completedActivities: {}, score: 0, totalAttempts: 0, lastUpdated: new Date().toISOString() };
  } catch {
    return { completedActivities: {}, score: 0, totalAttempts: 0, lastUpdated: new Date().toISOString() };
  }
}

export function recordInvestigationActivity(
  subjectId: string,
  activityId: string,
  isCorrect: boolean
): InvestigationProgress {
  try {
    const prev = getInvestigationProgress(subjectId);
    const completed = { ...prev.completedActivities, [activityId]: isCorrect };
    const score = Object.values(completed).filter(Boolean).length * 10;
    const next: InvestigationProgress = {
      completedActivities: completed,
      score,
      totalAttempts: prev.totalAttempts + 1,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(`${STORAGE_PREFIX}inv_progress_${subjectId}`, JSON.stringify(next));
    return next;
  } catch {
    return { completedActivities: {}, score: 0, totalAttempts: 0, lastUpdated: new Date().toISOString() };
  }
}

export function resetInvestigationProgress(subjectId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}inv_progress_${subjectId}`);
  } catch {}
}