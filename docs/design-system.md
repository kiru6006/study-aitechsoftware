# SubjectLab UI/UX Blueprint & Design Tokens

## 1. Design Philosophy
- **Light Educational Theme**: White/light-slate backdrop (`bg-slate-50`, `bg-white`) with deep slate typography (`text-slate-900`, `text-slate-700`).
- **Restrained Accent**: Deep indigo / cobalt (`#2563eb` / `#1d4ed8` or `#4f46e5`) for active elements, badges, and progress states.
- **Zero Fluff**: No decorative 3D heroes, no heavy gradients, no gamification badges. High text contrast (WCAG AAA compliant).
- **Dense Information Architecture**: Tight padding, clean borders (`border-slate-200`), distinct visual groupings.

## 2. Layout Structure

### Desktop (>= 1024px)
- Fixed Left Sidebar (240px):
  - Subject Switcher / Breadcrumbs
  - Navigation Sections: Overview, Syllabus, Units, Industry Cases, Exam Prep, Revision
  - Unit / Topic Tree
- Main Content Area (Max width 896px / `max-w-4xl` for optimal reading speed):
  - Sticky Breadcrumb Header + Concept Progress Indicator
  - Section Jump Pills (Understand, Visualize, Apply, Remember, Exam, Quiz)
  - Section Blocks with subtle left-accent borders
- Right Outline (Optional on wide screens >= 1280px): Section quick-links.

### Tablet (768px - 1023px)
- Collapsible Left Navigation Drawer.
- Floating Menu Toggle.
- Center reading container with 24px margins.

### Mobile (< 768px)
- Header with Hamburger Menu and Subject Name.
- Fullscreen Slide-over Navigation Drawer.
- Single-column linear layout.
- Horizontal scroll container for code, formulas, and wide tables.

## 3. Concept Page Section Tokens
- **Understand**: Clean typography with highlighted definition banner.
- **Visualize**: Mermaid / diagram viewer with zoomable container.
- **Apply**: Code block syntax highlighting + real-world scenario card.
- **Remember**: Key term pills + mnemonic callout box (`bg-amber-50`, `border-amber-200`).
- **Exam Prep**: Marks selector tabs (Short / 5M / 10M / 16M) with structured answer flow.
- **Check Understanding**: Interactive 1-click self-evaluation radio cards with instant feedback.
