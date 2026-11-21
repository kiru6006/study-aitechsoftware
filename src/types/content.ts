export interface Program {
  id: string;
  name: string;
  semesters: Semester[];
}

export interface Semester {
  id: string;
  number: number;
  subjectIds: string[];
}

export interface LearningResource {
  title: string;
  type: 'Textbook' | 'Syllabus' | 'Reference' | 'Paper';
  authorOrSource: string;
  url?: string;
}

export interface SubjectMetadata {
  id: string;
  name: string;
  code: string;
  university: string;
  program: string;
  semester: number;
  credits?: number;
  totalHours?: number;
  unitsCount?: number;
  teachingHoursPerUnit?: number;
  maximumMarks?: number;
  description: string;
  learningObjectives: string[];
  courseOutcomes: string[];
  unitIds: string[];
  primaryCaseStudyId: string;
  resources: LearningResource[];
}

export interface Topic {
  id: string;
  unitId: string;
  title: string;
  conceptIds: string[];
}

export interface Unit {
  id: string;
  subjectId: string;
  unitNumber: number;
  title: string;
  officialTitle: string;
  hours?: number;
  summary: string;
  memoryCode?: string;
  memoryCodeMeaning?: string;
  topics: Topic[];
}

export interface ConceptUnderstanding {
  definition: string;
  rationale: string;
  terminology: { term: string; explanation: string }[];
  markdownContent: string;
}

export interface ConceptVisualization {
  diagramType?: 'architecture' | 'flowchart' | 'sequence' | 'formula';
  diagramTitle?: string;
  diagramSource?: string;
  explanation: string;
}

export interface ConceptApplication {
  industry: string;
  scenario: string;
  inputExample?: string;
  processSteps: string[];
  outputExample?: string;
  codeSnippet?: { language: string; code: string; caption?: string };
  numericalExample?: { problem: string; formula: string; solution: string };
}

export interface ConceptMemory {
  mnemonic?: string;
  keywords: string[];
  comparison?: { otherConcept: string; difference: string }[];
  commonMistakes: string[];
}

export type NoteDepth = 'short' | 'medium' | 'detailed';

export interface StudyNotes {
  short: string;
  medium: string;
  detailed: string;
}

export interface ConceptExamAnswers {
  shortDefinition: string;
  fiveMarkAnswer?: string;
  tenMarkAnswer?: string;
  sixteenMarkAnswer?: string;
  keyFormulas?: string[];
  notes?: StudyNotes;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Concept {
  id: string;
  subjectId: string;
  unitId: string;
  title: string;
  understanding: ConceptUnderstanding;
  visualization?: ConceptVisualization;
  application?: ConceptApplication;
  memory?: ConceptMemory;
  exam?: ConceptExamAnswers;
  quiz?: QuizQuestion[];
}

export interface IndustryUseCase {
  id: string;
  title: string;
  industry: 'Banking' | 'Healthcare' | 'Manufacturing' | 'Government' | 'Telecom';
  businessProblem: string;
  relevantConceptIds: string[];
  unitMapping: { unitNumber: number; roleInSolution: string }[];
  inputData: string;
  stepByStepProcess: string[];
  expectedOutput: string;
  practicalApplication: string;
  limitations: string[];
  relatedExamQuestions: string[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  unitId: string;
  marks: 1 | 2 | 5 | 10 | 16;
  relatedConceptIds: string[];
  importantKeywords: string[];
  answerOutline: string[];
  modelAnswer: string;
  diagramOrFormula?: string;
  practicalExample?: string;
}

export interface Flashcard {
  id: string;
  unitId: string;
  front: string;
  back: string;
  tag: string;
}

export interface RevisionItem {
  id: string;
  unitId: string;
  title: string;
  category: 'Keyword' | 'Formula' | 'Algorithm' | 'Core Concept';
  summary: string;
}

export interface RevisionPack {
  subjectId: string;
  masterMemorySequence: string[];
  unitMemoryCodes: {
    unitNumber: number;
    code: string;
    meaning: string;
    breakdown: { letter: string; concept: string }[];
  }[];
  flashcards: Flashcard[];
  checklist: RevisionItem[];
  formulaSheet: { name: string; formula: string; description: string; unitId: string }[];
}

export interface CatalogData {
  programs: Program[];
  subjects: Record<string, SubjectMetadata>;
}

export interface LearningActivityOption {
  id: string;
  label: string;
  feedback: string;
  isCorrect: boolean;
}

export interface LearningActivity {
  id: string;
  title: string;
  instruction: string;
  type: 'select' | 'sequence' | 'examine' | 'quiz' | 'decision';
  prompt: string;
  options?: LearningActivityOption[];
  correctSequence?: string[];
  explanation: string;
}

export interface InvestigationStage {
  id: string;
  unitId: string;
  unitNumber: number;
  title: string;
  subtitle: string;
  objective: string;
  conceptIds: string[];
  evidenceIds: string[];
  activities: LearningActivity[];
}

export interface EvidenceItem {
  id: string;
  name: string;
  source: string;
  evidenceType: string;
  simulated: boolean;
  hash?: string;
  status: 'Identified' | 'Acquired' | 'Examined' | 'Analyzed' | 'Reported';
  findings: string[];
  limitations: string[];
  details?: Record<string, string>;
}

export interface LearningCase {
  id: string;
  title: string;
  organization: string;
  suspectedImpact: string;
  description?: string;
  subjectId: string;
  isSimulated: boolean;
  stages: InvestigationStage[];
  evidenceSources: EvidenceItem[];
  evidence?: EvidenceItem[];
}
