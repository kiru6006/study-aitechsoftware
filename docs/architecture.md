# SubjectLab Architecture Specification

## 1. System Overview
SubjectLab is a client-side, content-driven academic learning application designed for university students.
Built for zero-backend static hosting on GitHub Pages, it emphasizes conceptual mastery, practical industry application, and examination readiness.

## 2. Technology Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router (`HashRouter` for GitHub Pages static compatibility)
- **Content Engine**: Markdown (`react-markdown`, `remark-gfm`) + JSON metadata schemas
- **Icons**: Lucide React
- **Local Persistence**: Browser `localStorage` (bookmarks, progress, revision state)
- **Build & CI/CD**: GitHub Actions deploying to GitHub Pages

## 3. Core Architectural Principles
1. **Content-Driven, Zero-Code Onboarding**:
   - Adding a new subject requires only JSON/Markdown files in `content/` and an entry in `content/catalog.json`.
   - No new React page components or routing modifications required for new subjects.
2. **Stable Uniform Resource Identifiers**:
   - Entities (`programId`, `semesterId`, `subjectId`, `unitId`, `topicId`, `conceptId`) follow hierarchical path conventions.
3. **Lazy Dynamic Imports**:
   - Static content bundles loaded dynamically per subject/unit to minimize initial bundle size.
4. **Resilient Fallback**:
   - Optional learning sections (e.g., worked numerical problems or code blocks) hide cleanly when content absent; never render artificial filler.

## 4. Routing Model (`HashRouter`)
- `#/`: Program/Semester/Subject catalog & recent history
- `#/:subjectId`: Subject Overview (Syllabus, outcomes, units, resources)
- `#/:subjectId/syllabus`: Full syllabus & weekly plan
- `#/:subjectId/units/:unitId`: Unit breakdown & topic list
- `#/:subjectId/concepts/:conceptId`: Concept learning page (Understand, Visualize, Apply, Remember, Exam, Quiz)
- `#/:subjectId/case-studies`: Industry case studies (e.g. Banking Security)
- `#/:subjectId/exam-prep`: Unit-wise exam questions (short, 5m, 10m, 16m)
- `#/:subjectId/revision`: Flashcards, memory codes, checklist, formula sheets

## 5. Persistence Strategy (`localStorage`)
- Key `subjectlab_progress`: `{ completedConceptIds: string[], bookmarkedConceptIds: string[] }`
- Key `subjectlab_revision`: `{ checklist: Record<string, boolean>, flashcardMastery: Record<string, boolean> }`
- Key `subjectlab_recent`: `string[]` (Subject IDs)

## 6. Deployment Architecture
- Vite `base: './'` for repository-agnostic asset loading on GitHub Pages.
- GitHub Actions workflow (`.github/workflows/deploy.yml`) builds static dist and deploys to `gh-pages` branch.
