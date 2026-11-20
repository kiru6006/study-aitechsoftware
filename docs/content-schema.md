# SubjectLab Content Schema Specification

## 1. Directory Layout Conventions
```text
content/
├── catalog.json
└── msc-ai-ml/
    └── semester-3/
        └── ai-cyber-security/
            ├── subject.json
            ├── syllabus.json
            ├── units.json
            ├── concepts/
            │   ├── sec-data-types.md
            │   ├── anomaly-detection.md
            │   └── ...
            ├── use-cases.json
            ├── questions.json
            └── revision.json
```

## 2. TypeScript Data Models

### Catalog & Subject
```typescript
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

export interface SubjectMetadata {
  id: string;
  name: string;
  code: string;
  university: string;
  program: string;
  semester: number;
  description: string;
  unitIds: string[];
  primaryCaseStudy: string;
  resources: LearningResource[];
}
```

### Unit & Topic
```typescript
export interface Unit {
  id: string;
  subjectId: string;
  unitNumber: number;
  title: string;
  officialTitle: string;
  hours?: number;
  topics: Topic[];
  memoryCode?: string;
  summary: string;
}

export interface Topic {
  id: string;
  unitId: string;
  title: string;
  conceptIds: string[];
}
```

### Concept (Unified Learning Structure)
```typescript
export interface ConceptUnderstanding {
  definition: string;
  rationale: string;
  terminology: { term: string; explanation: string }[];
  markdownContent: string;
}

export interface ConceptVisualization {
  diagramType?: 'architecture' | 'flowchart' | 'sequence' | 'formula';
  diagramSource?: string;
  explanation: string;
}

export interface ConceptApplication {
  industry: string;
  scenario: string;
  inputExample?: string;
  processSteps: string[];
  outputExample?: string;
  codeSnippet?: { language: string; code: string };
  numericalExample?: { problem: string; solution: string };
}

export interface ConceptMemory {
  mnemonic?: string;
  keywords: string[];
  comparison?: { otherConcept: string; difference: string }[];
  commonMistakes: string[];
}

export interface ConceptExamAnswers {
  shortDefinition: string;
  fiveMarkAnswer?: string;
  tenMarkAnswer?: string;
  sixteenMarkAnswer?: string;
  keyFormulas?: string[];
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
```

### Industry Use Case & Exam Questions
```typescript
export interface IndustryUseCase {
  id: string;
  title: string;
  industry: 'Banking' | 'Healthcare' | 'Manufacturing' | 'Government' | 'Other';
  businessProblem: string;
  relevantConceptIds: string[];
  inputData: string;
  processWorkflow: string[];
  expectedOutput: string;
  practicalValue: string;
  limitations: string[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  unitId: string;
  marks: 2 | 5 | 10 | 16;
  relatedConceptIds: string[];
  keywords: string[];
  outline: string[];
  modelAnswer: string;
}
```
