# SubjectLab Implementation Plan

## Phase 0: Repository Reset & Git Initialization
1. Verify git repository status & remote origin (`git remote -v`).
2. Clean out old code on remote/local if present as instructed by user, preserving `study-PRD.md` and `docs/`.
3. Commit clean baseline and push.

## Phase 1: Foundation Setup (Vite + React + Tailwind + TypeScript)
1. Initialize Vite project with React + TypeScript.
2. Configure Tailwind CSS with slate-neutral palette.
3. Install minimal runtime dependencies:
   - `react-router-dom`
   - `lucide-react`
   - `react-markdown`
   - `remark-gfm`
4. Set up `HashRouter` and configure Vite `base: './'` for GitHub Pages compatibility.

## Phase 2: Schema & Mock Content Engine
1. Implement TypeScript interfaces under `src/types/content.ts`.
2. Author pilot content for **AI for Cyber Security (MAI-OL506A-3)** under `content/msc-ai-ml/semester-3/ai-cyber-security/`:
   - Unit I: Introduction to AI for Cyber Security (Memory code: E-L-T-J-C)
   - Unit II: AI for Cyber Security Arsenal (Memory code: C-R-D-C-V-N-I)
   - Unit III: Detecting Cyber Security Threats with AI (Memory code: P-S-L-D-N-N)
   - Unit IV: Protecting Sensitive Information and Assets (Memory code: A-R-K-F)
   - Unit V: Fraud Prevention with AI Solutions (Memory code: M-B-J-S)
3. Implement dynamic content loader in `src/lib/contentLoader.ts`.

## Phase 3: Core Application Components & Routing
1. App Layout: Left navigation bar, top breadcrumb bar, mobile drawer.
2. Catalog / Home Page: Program, semester, subject selector + recent subjects.
3. Subject Overview Page: Metadata, course outcomes, unit grid, resources.
4. Concept Page: Reusable 6-section viewer (Understand, Visualize, Apply, Remember, Exam, Quiz).
5. Industry Case Study Page: Banking Cybersecurity Intelligence System.
6. Exam Preparation Page: Filterable by marks (Short, 5M, 10M, 16M) & units.
7. Revision Hub: Memory codes, interactive flashcards, local revision checklist.

## Phase 4: Local Persistence & Verification
1. `localStorage` hooks for progress tracking, bookmarks, checklist states.
2. Unit tests via Vitest for schema validation and content integrity.
3. Test production static build (`npm run build`).

## Phase 5: GitHub Pages CI/CD & Final Push
1. Create `.github/workflows/deploy.yml`.
2. Commit all implementation files and push to GitHub repository.
