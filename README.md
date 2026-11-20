# SubjectLab

> **Concept-First Academic Mastery & Examination Readiness Engine**  
> Learn concepts through practical examples, understand real-world applications, and prepare effectively for university examinations.

Built with **React 18 + TypeScript + Vite + Tailwind CSS** for zero-backend static deployment on **GitHub Pages**.

---

## 🏛️ Pilot Course
- **University**: CHRIST (Deemed to be University)
- **Program**: MSc Artificial Intelligence & Machine Learning
- **Semester**: III
- **Subject**: AI for Cyber Security
- **Course Code**: `MAI-OL506A-3`

---

## ⚡ Key Features

1. **Concept-Driven Architecture**:
   - Zero hardcoded pages. All subjects onboard strictly through JSON schemas and Markdown assets in `content/`.
2. **Unified 6-Section Concept Learning**:
   - **A. Understand**: Academic definitions, rationale, and essential terminology.
   - **B. Visualize**: Workflows, decision trees, and architectural diagrams.
   - **C. Apply**: Industry scenarios, telemetry data feeds, numerical problems, and Python scripts.
   - **D. Remember**: Unit memory codes, keywords, and examination pitfalls to avoid.
   - **E. Exam Prep**: Model answers categorized by 2M, 5M, 10M, and 16M university marks patterns.
   - **F. Check Understanding**: Self-assessment quizzes with instantaneous rationale feedback.
3. **Integrated Industry Case Study**:
   - End-to-end banking cybersecurity pipeline demonstrating credential stuffing defense, email phishing interception, lateral anomaly isolation, and sub-25ms fraud decisioning across all five units.
4. **Memory Codes & Quick Revision Hub**:
   - Unit I: `E-L-T-J-C`
   - Unit II: `C-R-D-C-V-N-I`
   - Unit III: `P-S-L-D-N-N`
   - Unit IV: `A-R-K-F`
   - Unit V: `M-B-J-S`
   - Master progression: `UNDERSTAND → ANALYZE → DETECT → PROTECT → PREVENT`
   - Interactive flashcard deck and formula sheets.
5. **Local Persistence**:
   - Progress tracking, saved bookmarks, and revision checklists persist via `localStorage` with zero logins or third-party tracking.
6. **Design System**:
   - Light educational theme with Google-inspired palette + Vignxs Crimson editorial accents, high contrast typography, and material elevation shadows.

---

## 🚀 Getting Started

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📦 Deployment

Deploys automatically to **GitHub Pages** on push to `main` via `.github/workflows/deploy.yml`.  
Uses `HashRouter` and Vite `base: './'` for 100% static routing resilience without 404 errors on browser refresh.
