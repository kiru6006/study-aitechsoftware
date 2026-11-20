import catalogData from '../content/catalog.json';
import unitsData from '../content/msc-ai-ml/semester-3/ai-cyber-security/units.json';
import conceptsData from '../content/msc-ai-ml/semester-3/ai-cyber-security/concepts.json';
import useCasesData from '../content/msc-ai-ml/semester-3/ai-cyber-security/use-cases.json';
import questionsData from '../content/msc-ai-ml/semester-3/ai-cyber-security/questions.json';
import revisionData from '../content/msc-ai-ml/semester-3/ai-cyber-security/revision.json';

import {
  CatalogData,
  SubjectMetadata,
  Unit,
  Concept,
  IndustryUseCase,
  ExamQuestion,
  RevisionPack
} from '../types/content';

// Static registry mapping subject IDs to their respective content sets
const subjectsContent: Record<string, {
  units: Unit[];
  concepts: Concept[];
  useCases: IndustryUseCase[];
  questions: ExamQuestion[];
  revision: RevisionPack;
}> = {
  'ai-cyber-security': {
    units: unitsData as Unit[],
    concepts: conceptsData as Concept[],
    useCases: useCasesData as IndustryUseCase[],
    questions: questionsData as ExamQuestion[],
    revision: revisionData as RevisionPack
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
