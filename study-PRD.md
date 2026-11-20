# MASTER PROMPT: SUBJECTLAB
## Phase 1: Architecture, Design and Minimal Application Foundation

### 1. YOUR ROLE

Act as a multidisciplinary engineering team consisting of:

- Principal React and TypeScript Architect
- Senior Frontend Engineer
- Senior UI/UX Architect specializing in educational applications
- Learning Experience Designer
- Academic Curriculum and Examination Content Architect
- Content Modeling and Information Architecture Specialist
- GitHub Pages and CI/CD Engineer
- Software Quality and Accessibility Engineer

Your responsibility is to design and implement a simple, maintainable, scalable, content-driven web application.

**Application Name:** SubjectLab

**Product Statement:** Learn concepts through practical examples, understand their real-world applications, and prepare effectively for university examinations.

This application must NOT become a conventional Learning Management System.

Do not introduce unnecessary infrastructure, complex frameworks, authentication, administrative dashboards, or backend services.

### 2. PROJECT CONTEXT

I am building a reusable academic learning application that will initially support:

**University:** CHRIST (Deemed to be University)

**Program:** MSc Artificial Intelligence & Machine Learning

**Semester:** III

**Initial Subject:** AI for Cyber Security

**Course Code:** MAI-OL506A-3

The application will eventually support multiple subjects, semesters, programs, and academic disciplines.

Possible future subjects include:

- Data Structures
- Machine Learning
- Deep Learning
- Natural Language Processing
- Cloud Computing
- Software Engineering
- Cybersecurity
- Corporate Law
- Business Analytics

Do not hardcode the application around AI for Cyber Security.

This subject is only the first pilot.

### 3. CORE PRODUCT PHILOSOPHY

Build a **concept-first learning experience**, not a document repository.

Every major topic should help students answer:

1. What is this concept?
2. Why does it exist?
3. How does it work?
4. Where is it used in the real world?
5. How can I remember it?
6. How do I explain it in an examination?
7. How can I test my understanding?

The student should move naturally from theory to practical understanding and examination readiness.

Avoid creating multiple disconnected pages that repeat the same content.

### 4. PRIMARY USER PERSONA

The primary user is a university student preparing for semester examinations while also wanting practical subject knowledge.

Student needs:

- Simple explanations
- Official syllabus coverage
- Unit-wise learning
- Real-world examples
- Industry-specific use cases
- Diagrams and workflows
- Algorithms and formulas
- Worked numerical problems
- Memory techniques
- Examination answers
- Quick revision
- Self-assessment

The interface should be understandable without training.

### 5. TECHNOLOGY STACK

Use the following minimal stack.

Frontend:
- React
- TypeScript
- Vite

Styling:
- Tailwind CSS

Routing:
- React Router with HashRouter for GitHub Pages compatibility

Content:
- Markdown for detailed study content
- JSON for structured metadata and relationships
- react-markdown for rendering
- remark-gfm for tables and Markdown formatting

Icons:
- Lucide React

Local Persistence:
- Browser localStorage for bookmarks, revision state, and lightweight progress

Hosting:
- GitHub Pages

Deployment:
- GitHub Actions

Testing:
- Vitest for essential logic and content validation
- React Testing Library for critical interactions, if required

Do not add:

- FastAPI
- Node.js backend
- PostgreSQL
- MongoDB
- Firebase
- Supabase
- Redux
- Next.js
- Authentication services
- AI APIs
- Server-side rendering
- Paid services
- Large component libraries

Use React Context only if shared state becomes necessary.

Do not introduce state management libraries without a demonstrated requirement.

### 6. IMPORTANT ARCHITECTURE PRINCIPLE

The application must be **content-driven rather than page-driven**.

A new subject must be added primarily by creating content files and updating a subject catalog.

It must NOT require:

- New React page components
- New routing logic
- Duplicated layouts
- Hardcoded syllabus navigation
- Subject-specific UI components

Design reusable components and schemas.

Use stable identifiers for:

- Programs
- Semesters
- Subjects
- Units
- Topics
- Concepts
- Industry use cases
- Examination questions
- Revision items

### 7. APPLICATION INFORMATION ARCHITECTURE

Design the navigation around these sections:

HOME
- Program selection
- Semester selection
- Subject catalog
- Recently visited subjects

SUBJECT OVERVIEW
- Subject name
- Course code
- University
- Semester
- Learning objectives
- Unit overview
- Available study resources

SYLLABUS AND COURSE PLAN
- Official syllabus
- Unit-wise topic hierarchy
- Course outcomes
- Weekly course plan
- Assessment information where provided

LEARN BY UNIT
- Unit overview
- Topic list
- Concept learning pages
- Algorithms
- Formulas
- Worked examples

INDUSTRY CASE STUDIES
- Banking
- Healthcare
- Manufacturing
- Government and Infrastructure
- Other relevant industries

EXAM PREPARATION
- Important keywords
- Short-answer questions
- 5-mark questions
- 10-mark questions
- 16-mark questions
- Model answers
- Numerical problems

QUICK REVISION
- Unit memory codes
- Formula sheets
- Flashcards
- Self-assessment questions
- Revision checklist

RESOURCES
- Official syllabus references
- Course-plan references
- Textbooks
- External learning resources
- Uploaded or bundled study documents

Keep the navigation compact.

Do not create separate top-level menus for every small feature.

### 8. CONCEPT LEARNING EXPERIENCE

Every major concept should support the following learning sections.

**A. UNDERSTAND**

- Simple definition
- Why the concept is needed
- Important terminology
- Core theory

**B. VISUALIZE**

- Architecture diagram
- Workflow
- Decision flow
- Formula explanation
- Algorithm steps

**C. APPLY**

- Real-world scenario
- Industry use case
- Input and output examples
- Worked numerical example where relevant
- Small practical program where useful

**D. REMEMBER**

- Memory shortcut
- Important keywords
- Concept comparison
- Common examination mistakes

**E. EXAM PREPARATION**

- Short definition
- 5-mark answer
- 10-mark answer
- 16-mark answer
- Important diagrams
- Relevant formulas

**F. CHECK UNDERSTANDING**

- Three to five questions
- Correct answers
- Brief explanations

These are content sections within a reusable concept page.

Do not build six independent page types for the same concept.

Hide optional sections when content is unavailable.

Never display invented content simply to fill a layout.

### 9. CONTENT MODEL

Design a reusable schema.

Recommended entities:

Program
Semester
Subject
Unit
Topic
Concept
IndustryUseCase
ExamQuestion
RevisionItem
LearningResource

Relationships:

Program → Semesters

Semester → Subjects

Subject → Units

Unit → Topics

Topic → Concepts

Concept → Industry Use Cases

Concept → Examination Questions

Concept → Revision Items

A concept may belong to more than one topic or subject where academically appropriate.

An industry use case may reference several concepts.

Avoid duplicating canonical theory content.

Store detailed theory in Markdown.

Store relationships, ordering, and metadata in JSON.

Define TypeScript interfaces and runtime validation for essential content fields.

### 10. PROPOSED DIRECTORY STRUCTURE

```text
subjectlab/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── learning/
│   │   └── common/
│   ├── features/
│   │   ├── catalog/
│   │   ├── syllabus/
│   │   ├── concepts/
│   │   ├── case-studies/
│   │   ├── exams/
│   │   └── revision/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── styles/
│
├── content/
│   └── msc-ai-ml/
│       └── semester-3/
│           └── ai-cyber-security/
│               ├── subject.json
│               ├── syllabus.json
│               ├── course-plan.json
│               ├── units/
│               ├── concepts/
│               ├── use-cases/
│               ├── questions/
│               └── revision/
│
├── public/
│   └── resources/
│
├── docs/
│   ├── architecture.md
│   ├── content-schema.md
│   ├── design-system.md
│   └── adding-new-subject.md
│
└── .github/
    └── workflows/
        └── deploy.yml
```

This structure is a starting proposal.

Simplify it if the same functionality can be achieved with fewer folders.

Do not create empty folders or unnecessary abstractions merely to match the diagram.

### 11. OFFICIAL CONTENT ACCURACY

The first subject is AI for Cyber Security.

Official unit titles:

UNIT I: Introduction to AI for Cyber Security

UNIT II: AI for Cyber Security Arsenal

UNIT III: Detecting Cyber Security Threats with AI

UNIT IV: Protecting Sensitive Information and Assets

UNIT V: Fraud Prevention with AI Solutions

The official syllabus and course plan will be supplied as source documents.

Use those documents as the authoritative academic source.

Important rules:

1. Do not invent official syllabus topics.
2. Do not change official unit names.
3. Do not invent university examination patterns.
4. Preserve course codes and learning outcomes.
5. Distinguish official syllabus content from supplementary study content.
6. Mark illustrative examples as examples.
7. Do not fabricate citations, research results, or model accuracy.
8. Keep the syllabus source and version identifiable.
9. Report missing or conflicting source information.
10. Do not silently replace official course content with generic AI-generated notes.

The application may contain additional explanations and industry examples, but they must be clearly separated from official curriculum requirements.

### 12. INDUSTRY USE CASE DESIGN

The first subject should use banking cybersecurity as its primary integrated case study.

Example:

**AI-Powered Banking Cybersecurity Intelligence System**

Unit I:
AI fundamentals and security data analysis.

Unit II:
Classification, regression, clustering, NLP, and anomaly detection.

Unit III:
Spam and phishing detection.

Unit IV:
Authentication abuse prevention, account reputation scoring, keystroke recognition, and facial recognition.

Unit V:
Fraud detection, bagging, boosting, and model evaluation.

Each use case should include:

- Industry
- Business problem
- Relevant concept
- Input data
- Step-by-step process
- Expected output
- Practical application
- Limitations
- Related examination questions

A use case should reference canonical concepts rather than duplicate entire explanations.

### 13. EXAM PREPARATION DESIGN

Examination preparation is a major product feature.

Each supported question should include:

- Question
- Unit
- Related concepts
- Marks
- Important keywords
- Answer outline
- Complete answer where available
- Diagram reference
- Formula reference
- Practical example

Support short-answer, 5-mark, 10-mark, and 16-mark content as configurable categories.

Do not assume every university uses the same marks pattern.

Use this answer framework:

Definition → Working → Algorithm/Architecture → Example → Benefits → Limitations → Conclusion.

Answers must be academically useful, not generic AI-generated filler.

### 14. MEMORY AND REVISION FEATURES

Implement lightweight revision features.

Memory codes:

Unit I: E-L-T-J-C

Unit II: C-R-D-C-V-N-I

Unit III: P-S-L-D-N-N

Unit IV: A-R-K-F

Unit V: M-B-J-S

Master memory sequence:

UNDERSTAND → ANALYZE → DETECT → PROTECT → PREVENT

Provide:

- Unit-wise memory shortcuts
- Important keywords
- Formula revision
- Algorithm comparison
- Simple flashcards
- Self-assessment
- Local revision checklist

Avoid gamification, leaderboards, points, and unnecessary engagement features.

### 15. UI/UX DESIGN REQUIREMENTS

Design a clean, modern, light-themed educational application.

Visual principles:

- White or light-neutral background
- Dark readable text
- One restrained primary accent color
- Compact navigation
- Clear typography
- Minimal card usage
- Consistent spacing
- Strong content hierarchy
- Accessible contrast
- Responsive layouts

Avoid:

- Dark dashboards
- Large hero sections
- Oversized cards
- Excessive empty space
- Decorative gradients
- Too many colors
- Duplicate menus
- Heavy animations
- Excessive badges
- Complex dashboard charts

Desktop:

- Compact left navigation
- Subject selector
- Main learning content
- Optional topic outline

Tablet:

- Collapsible navigation
- Comfortable reading width
- Responsive content sections

Mobile:

- Single-column learning layout
- Compact header
- Accessible navigation drawer
- No horizontal overflow
- Readable tables and code
- Touch-friendly controls

Use semantic HTML and accessible interaction patterns.

### 16. GITHUB PAGES REQUIREMENTS

The application must deploy to GitHub Pages.

Requirements:

- Static production build
- Correct Vite base path
- HashRouter compatibility
- GitHub Actions deployment
- Working asset paths
- No backend dependencies
- No runtime environment secrets
- No broken routes after refresh
- No broken links between subjects and concepts

Support both project repository hosting and potential custom-domain hosting through configuration.

Do not hardcode a GitHub username or repository name.

### 17. PERFORMANCE AND QUALITY REQUIREMENTS

The application must:

- Load quickly
- Avoid unnecessary dependencies
- Lazy-load subject content where practical
- Render Markdown safely
- Avoid arbitrary HTML execution
- Support keyboard navigation
- Provide readable code blocks
- Handle missing content gracefully
- Preserve navigation state where useful
- Avoid duplicated components
- Avoid hardcoded subject-specific logic

Add essential tests for:

- Content schema validation
- Subject navigation
- Unit and topic rendering
- Missing content handling
- GitHub Pages routing
- Revision state persistence

### 18. PHASE 1 EXECUTION RULES

Do not immediately implement the entire application.

First perform an architecture review.

If the repository already contains code:

1. Inspect the existing structure.
2. Identify reusable components.
3. Identify dependencies.
4. Identify architectural problems.
5. Preserve useful existing functionality.
6. Avoid unnecessary rewrites.

If the repository is empty:

1. Propose the minimal project structure.
2. Define the content model.
3. Define the navigation architecture.
4. Define the component design.
5. Define the deployment approach.

Before implementation, produce:

**Document 1: Architecture Proposal**

Include:
- Technology decisions
- Component structure
- Routing strategy
- Content loading
- Data relationships
- Persistence strategy
- Deployment design

**Document 2: UI/UX Blueprint**

Include:
- Application navigation
- Page hierarchy
- Desktop layout
- Tablet layout
- Mobile layout
- Concept page structure
- Design tokens

**Document 3: Content Schema**

Include:
- TypeScript interfaces
- Example JSON
- Markdown conventions
- Cross-reference strategy
- Content validation
- New subject onboarding

**Document 4: Implementation Plan**

Include:
- Development phases
- Tasks
- Dependencies
- Acceptance criteria
- Testing strategy
- GitHub deployment checklist

### 19. IMPLEMENTATION APPROVAL GATE

After preparing the architecture and design documents:

STOP.

Present:

1. Proposed architecture summary
2. Proposed navigation structure
3. Content schema
4. Minimal dependency list
5. Implementation phases
6. Key architectural trade-offs
7. Open decisions requiring approval

Do not start implementation until I approve the architecture.

### 20. FINAL SUCCESS CRITERIA

The architecture must demonstrate that:

1. AI for Cyber Security can be added as the first subject.
2. All five official units can be represented.
3. Concepts support theory, diagrams, examples, and exam answers.
4. Industry use cases can connect multiple concepts.
5. Memory tricks and revision materials are reusable.
6. New subjects can be added without new React pages.
7. The application works on mobile, tablet, and desktop.
8. The application can deploy entirely through GitHub Pages.
9. The application does not require a backend.
10. The codebase remains simple enough for one developer to maintain.

**BEGIN WITH REPOSITORY INSPECTION AND ARCHITECTURE PLANNING ONLY. DO NOT IMPLEMENT YET.**