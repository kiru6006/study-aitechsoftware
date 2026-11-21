import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { CatalogPage } from './pages/CatalogPage';
import { SubjectOverviewPage } from './pages/SubjectOverviewPage';
import { UnitPage } from './pages/UnitPage';
import { ConceptPage } from './pages/ConceptPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { InvestigationPage } from './pages/InvestigationPage';
import { PracticalLabsPage } from './pages/PracticalLabsPage';
import { MindmapsPage } from './pages/MindmapsPage';
import { ExamPrepPage } from './pages/ExamPrepPage';
import { RevisionPage } from './pages/RevisionPage';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/:subjectId" element={<SubjectOverviewPage />} />
          <Route path="/:subjectId/units/:unitId" element={<UnitPage />} />
          <Route path="/:subjectId/concepts/:conceptId" element={<ConceptPage />} />
          <Route path="/:subjectId/case-studies" element={<CaseStudiesPage />} />
          <Route path="/:subjectId/investigation" element={<InvestigationPage />} />
          <Route path="/:subjectId/labs" element={<PracticalLabsPage />} />
          <Route path="/:subjectId/mindmaps" element={<MindmapsPage />} />
          <Route path="/:subjectId/exam-prep" element={<ExamPrepPage />} />
          <Route path="/:subjectId/revision" element={<RevisionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;