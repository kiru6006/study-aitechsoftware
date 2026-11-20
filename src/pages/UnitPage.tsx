import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Eye,
  Briefcase,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Code2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Terminal,
  Layers,
  ShieldCheck,
  Award,
  Zap,
  Target
} from 'lucide-react';
import {
  getSubjectMetadata,
  getSubjectUnits,
  getSubjectConcepts,
  getSubjectUseCases,
  getSubjectExamQuestions,
  getSubjectRevision,
  getCompletedConcepts,
  toggleConceptCompleted
} from '../lib/contentLoader';

import { VisualMindmap } from '../components/learning/VisualMindmap';
import { TopicTree } from '../components/learning/TopicTree';
import { CodeBlock } from '../components/learning/CodeBlock';
import { StudyNotes } from '../components/learning/StudyNotes';
import { ConceptComparison, ComparisonRow } from '../components/learning/ConceptComparison';
import { AlgorithmFlow, FlowStep } from '../components/learning/AlgorithmFlow';

export const UnitPage: React.FC = () => {
  const { subjectId = 'ai-cyber-security', unitId = 'unit-1' } = useParams<{
    subjectId?: string;
    unitId?: string;
  }>();

  const metadata = getSubjectMetadata(subjectId);
  const units = getSubjectUnits(subjectId);
  const allConcepts = getSubjectConcepts(subjectId);
  const useCases = getSubjectUseCases(subjectId);
  const revision = getSubjectRevision(subjectId);

  // Find target unit
  const currentUnit = units.find(u => u.id === unitId) || units[0];
  const unitConcepts = allConcepts.filter(c => c.unitId === currentUnit?.id);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  if (!currentUnit) {
    return (
      <div className="bg-white rounded-xl p-6 text-center border border-[#C70234]/30">
        <h2 className="font-serif text-lg font-bold text-[#202124]">Unit Not Found</h2>
        <p className="text-xs text-[#5F6368] mt-1">Please select a valid unit from the sidebar.</p>
        <Link to={`/${subjectId}`} className="inline-block mt-3 text-xs font-semibold text-[#C70234]">
          Return to Subject Overview
        </Link>
      </div>
    );
  }

  // Unit-specific Key Takeaways for learners
  const getUnitKeyTakeaways = (): string[] => {
    switch (currentUnit.unitNumber) {
      case 1:
        return [
          "Evolutionary shift: Transitioning from rigid hand-crafted Expert Systems to statistical Machine Learning & Deep Neural Networks.",
          "Triad Alignment: Mapping Confidentiality, Integrity, and Availability into quantifiable AI telemetry features.",
          "Core Paradigms: Comparing Supervised (labels), Unsupervised (clustering anomalies), and Reinforcement Learning (adaptive honeypots).",
          "Production Hygiene: Preventing train/test data leakage, tuning learning rates, and rapid iteration with Jupyter."
        ];
      case 2:
        return [
          "Supervised Arsenal: Binary & Multiclass Classification for malware categorization; Regression for risk & dwell-time forecasting.",
          "Unsupervised Arsenal: PCA to collapse multi-thousand feature dimensions; K-Means & DBSCAN for clustering zero-day behavior.",
          "Multimodal Security: Convolutional video models for CCTV perimeter security, NLP for threat intelligence, and digital image processing.",
          "Feature Engineering: Extracting n-grams, entropy ratios, and lexical token distributions from raw telemetry streams."
        ];
      case 3:
        return [
          "Linear Decision Boundaries: Perceptron algorithm mechanics, hyper-plane weights update rules, and binary email spam filtration.",
          "Maximum Margin Defense: Support Vector Machines (SVM) with RBF non-linear kernels to defeat visual image spam evasions.",
          "Phishing Classification: Logistic regression probability calibration and Decision Trees for transparent, auditable URL risk scoring.",
          "Probabilistic NLP: Multinomial Naive Bayes threat pipeline with Laplace smoothing and bag-of-words tokenization."
        ];
      case 4:
        return [
          "Identity Gateway Defense: Automated countermeasures against credential stuffing, brute force bursts, and low-and-slow password spraying.",
          "Risk-Based Authentication (RBA): Computing dynamic account reputation scores from IP entropy, ASN risk, and device velocity.",
          "Behavioral Keystroke Biometrics: Measuring passive timing dynamics (Hold Time & Flight Time) for non-intrusive continuous verification.",
          "Biometric Facial Defense: Deep CNN facial embeddings, Euclidean distance matching, and active liveness anti-spoofing verification."
        ];
      case 5:
      default:
        return [
          "Extreme Class Imbalance: Overcoming the 99.9% benign vs 0.1% fraudulent transaction challenge via SMOTE and cost-sensitive loss.",
          "Ensemble Mastery: Bagging (Random Forest variance reduction) vs Boosting (XGBoost/LightGBM iterative error correction).",
          "Feature Store Pipelines: Engineering rolling 1-hour transaction velocities, geographic deviation, and merchant category heuristics.",
          "Rigorous Statistical Metrics: Evaluating models using Precision-Recall curves, F1-scores, and cost-weighted confusion matrices instead of misleading raw accuracy."
        ];
    }
  };

  // Pre-configured comparison tables per unit
  const getUnitComparison = (): { title: string; a: string; b: string; rows: ComparisonRow[] } => {
    switch (currentUnit.unitNumber) {
      case 1:
        return {
          title: 'Paradigm Shift: Traditional Security vs AI-Driven Cybersecurity',
          a: 'Traditional Security',
          b: 'AI-Driven Security',
          rows: [
            { dimension: 'Detection Logic', itemA: 'Deterministic static hashes (MD5, SHA256) & regex rules', itemB: 'Probabilistic patterns & learned statistical anomaly thresholds', advantage: 'B' },
            { dimension: 'Zero-Day Threats', itemA: 'Blind until signature is handcrafted and distributed', itemB: 'Detects novel variations via behavioral generalization', advantage: 'B' },
            { dimension: 'False Positive Overhead', itemA: 'Low false positives on exact matches, rigid rules', itemB: 'Requires calibration against drift, but catches polymorphic variants', advantage: 'neutral' },
            { dimension: 'Maintenance Speed', itemA: 'Manual analyst updates for every new exploit', itemB: 'Automated retraining on active threat telemetry pipelines', advantage: 'B' }
          ]
        };
      case 2:
        return {
          title: 'Arsenal Strategy: Supervised Classification vs Unsupervised Clustering',
          a: 'Supervised Learning',
          b: 'Unsupervised Learning',
          rows: [
            { dimension: 'Label Requirement', itemA: 'Requires large labeled corpora (e.g., confirmed malware)', itemB: 'Operates on raw unlabeled network traffic & system logs', advantage: 'B' },
            { dimension: 'Unknown Attacks', itemA: 'Optimized for known attack families and taxonomy', itemB: 'Superior for detecting novel outliers and insider threats', advantage: 'B' },
            { dimension: 'Algorithms', itemA: 'Random Forest, SVM, Logistic Regression, XGBoost', itemB: 'PCA, K-Means, DBSCAN, Isolation Forests', advantage: 'neutral' },
            { dimension: 'Interpretability', itemA: 'Explicit feature importances and classification boundaries', itemB: 'Cluster distances require security analyst interpretation', advantage: 'A' }
          ]
        };
      case 3:
        return {
          title: 'Threat Detection Models: Perceptron / Linear vs Support Vector Machines (SVM)',
          a: 'Linear Perceptron',
          b: 'Support Vector Machine',
          rows: [
            { dimension: 'Decision Boundary', itemA: 'Single hyper-plane, non-optimal margin separation', itemB: 'Maximum margin separation with support vectors', advantage: 'B' },
            { dimension: 'Non-linear Data', itemA: 'Fails on non-linearly separable inputs (XOR trap)', itemB: 'Handles complex non-linear data via RBF/Polynomial kernels', advantage: 'B' },
            { dimension: 'Computational Speed', itemA: 'Extremely fast O(d) inference for high-speed packet filtering', itemB: 'Higher quadratic kernel compute cost during training', advantage: 'A' },
            { dimension: 'Image Spam Detection', itemA: 'Poor performance on dense visual pixel features', itemB: 'Proven robust classification on extracted image histograms', advantage: 'B' }
          ]
        };
      case 4:
        return {
          title: 'Identity Defense: Static Credentials vs Continuous Behavioral Biometrics',
          a: 'Static Password & Token',
          b: 'Continuous Biometrics',
          rows: [
            { dimension: 'Attack Resistance', itemA: 'Vulnerable to credential stuffing, phishing, and replay', itemB: 'Resistant because biological cadence cannot be phished', advantage: 'B' },
            { dimension: 'Session Security', itemA: 'One-time gate; hijackable post-login session cookies', itemB: 'Continuous passive verification during entire session', advantage: 'B' },
            { dimension: 'User Friction', itemA: 'Forced frequent resets and constant 2FA token prompts', itemB: 'Zero friction transparent background authentication', advantage: 'B' },
            { dimension: 'Failure Mode', itemA: 'Compromised silently upon leakage of plaintext', itemB: 'Temporary false reject managed via step-up challenge', advantage: 'A' }
          ]
        };
      case 5:
      default:
        return {
          title: 'Ensemble Battle: Bagging (Random Forest) vs Boosting (Gradient Boosting)',
          a: 'Bagging (Random Forest)',
          b: 'Boosting (XGBoost/LightGBM)',
          rows: [
            { dimension: 'Model Independence', itemA: 'Parallel independent trees over random feature subsets', itemB: 'Sequential dependent trees learning from prior errors', advantage: 'neutral' },
            { dimension: 'Bias vs Variance', itemA: 'Primarily reduces variance on deep overfitted trees', itemB: 'Primarily reduces bias through iterative gradient descent', advantage: 'neutral' },
            { dimension: 'Class Imbalance', itemA: 'Can be diluted by minority class under-sampling', itemB: 'Focuses high sample weights directly on rare fraud cases', advantage: 'B' },
            { dimension: 'Inference Latency', itemA: 'Fast parallelized decision forest evaluation', itemB: 'Must evaluate sequential trees, but produces compact models', advantage: 'A' }
          ]
        };
    }
  };

  // Pre-configured algorithm flows per unit
  const getUnitFlow = (): { title: string; subtitle: string; steps: FlowStep[] } => {
    switch (currentUnit.unitNumber) {
      case 1:
        return {
          title: 'End-to-End Cybersecurity AI Pipeline',
          subtitle: 'From raw network telemetry to automated security orchestration',
          steps: [
            { stepNumber: 1, title: 'Telemetry Ingestion', type: 'input', description: 'Capture firewall packet headers, DNS query logs, and host auth attempts.', detail: 'Kafka buffer -> Logstash' },
            { stepNumber: 2, title: 'Normalization & Feature Extraction', type: 'process', description: 'Compute rolling velocity, IP entropy, and failed attempt counts without leakage.', detail: 'StandardScaler -> Time-series windowing' },
            { stepNumber: 3, title: 'Machine Learning Inference', type: 'process', description: 'Evaluate live telemetry against trained probabilistic models.', detail: 'Model.predict_proba(X_test)' },
            { stepNumber: 4, title: 'Risk Score Decision Gate', type: 'decision', description: 'Thresholding: Score > 85 triggers block; 50-85 triggers MFA step-up; < 50 allows.', detail: 'Zero-trust policy evaluator' },
            { stepNumber: 5, title: 'Automated Response & Audit', type: 'output', description: 'Inject dynamic firewall block rule and update SIEM incident ticket.', detail: 'SOAR webhook dispatch' }
          ]
        };
      case 2:
        return {
          title: 'Multimodal Security Threat Detection Pipeline',
          subtitle: 'Dimensionality reduction, video anomaly, and social NLP stream',
          steps: [
            { stepNumber: 1, title: 'Multimodal Stream Ingestion', type: 'input', description: 'Simultaneous CCTV video frames, employee social media feed, and NetFlow metrics.', detail: 'Multi-stream message queue' },
            { stepNumber: 2, title: 'Dimensionality Reduction (PCA)', type: 'process', description: 'Compress high-dimensional vectors to preserve 95% variance while cutting noise.', detail: 'PCA(n_components=0.95)' },
            { stepNumber: 3, title: 'Clustering & Outlier Isolation', type: 'process', description: 'DBSCAN identifies dense normal operational clusters; marks outliers as anomalies.', detail: 'DBSCAN(eps=0.5, min_samples=5)' },
            { stepNumber: 4, title: 'Anomaly Validation Gate', type: 'decision', description: 'Distinguish legitimate maintenance peaks from malicious exfiltration behavior.', detail: 'Context correlation check' },
            { stepNumber: 5, title: 'Alert Escalation & Containment', type: 'output', description: 'Broadcast alert to SOC dashboard with coordinate visual heatmap.', detail: 'SIEM Incident Dispatch' }
          ]
        };
      case 3:
        return {
          title: 'Threat Detection & Phishing Classification Workflow',
          subtitle: 'Feature engineering, text tokenization, and classifier ensemble',
          steps: [
            { stepNumber: 1, title: 'Message / URL Capture', type: 'input', description: 'Intercept incoming SMTP payloads, email headers, and embedded hyperlink URLs.', detail: 'Raw MIME parser' },
            { stepNumber: 2, title: 'Lexical & Structural Extraction', type: 'process', description: 'Extract IP presence in URL, sub-domain depth, suspicious TLDs, and TF-IDF terms.', detail: 'NLP pipeline + regex extraction' },
            { stepNumber: 3, title: 'Model Classification Scoring', type: 'process', description: 'Feed features into Naive Bayes / Decision Tree classifier for probability estimation.', detail: 'P(Phish | Words) * P(Prior)' },
            { stepNumber: 4, title: 'Domain Reputation Cross-Check', type: 'decision', description: 'Verify domain age and DNS WHOIS reputation if model confidence is borderline.', detail: 'WHOIS API lookups' },
            { stepNumber: 5, title: 'Quarantine & User Notification', type: 'output', description: 'Move email to security quarantine vault and append warning banner.', detail: 'Exchange/Workspace action' }
          ]
        };
      case 4:
        return {
          title: 'Continuous Identity & Behavioral Authentication Architecture',
          subtitle: 'Keystroke dynamics, account reputation, and facial verification',
          steps: [
            { stepNumber: 1, title: 'Behavioral Telemetry Acquisition', type: 'input', description: 'Record keystroke Flight Time (FT), Hold Time (HT), and facial camera embeddings.', detail: 'Client-side event listeners' },
            { stepNumber: 2, title: 'Feature Vector Normalization', type: 'process', description: 'Transform raw milliseconds into normalized statistical user profile baselines.', detail: 'Z-score normalization against user history' },
            { stepNumber: 3, title: 'Anomaly Distance Computation', type: 'process', description: 'Compute Euclidean / Cosine distance between current interaction and stored profile.', detail: 'Distance = ||Current - Baseline||' },
            { stepNumber: 4, title: 'Confidence Threshold Verification', type: 'decision', description: 'Verify if keystroke and face match threshold theta >= 0.85.', detail: 'Multi-biometric fusion gate' },
            { stepNumber: 5, title: 'Session Maintenance or Step-Up', type: 'output', description: 'Maintain silent session access or immediately enforce biometric step-up re-auth.', detail: 'Session Token Rotation' }
          ]
        };
      case 5:
      default:
        return {
          title: 'Real-Time Financial Fraud Decision Engine',
          subtitle: 'Handling extreme class imbalance with ensemble gradient boosting',
          steps: [
            { stepNumber: 1, title: 'Transaction Stream Ingestion', type: 'input', description: 'Ingest credit card swipe telemetry: Amount, Merchant Category, Location, Time.', detail: 'Sub-100ms API Gateway' },
            { stepNumber: 2, title: 'Real-Time Feature Enrichment', type: 'process', description: 'Calculate rolling 1-hour transaction velocity and deviation from user average spend.', detail: 'Redis feature store lookup' },
            { stepNumber: 3, title: 'Ensemble Model Scoring', type: 'process', description: 'Evaluate transaction using XGBoost trained with cost-sensitive class weights.', detail: 'Scale_pos_weight evaluation' },
            { stepNumber: 4, title: 'Risk Tiering Decision', type: 'decision', description: 'Score >= 0.90 -> Auto Decline; Score >= 0.60 -> SMS OTP; Score < 0.60 -> Approve.', detail: 'Banking risk engine policy' },
            { stepNumber: 5, title: 'Payment Settlement / Fraud Lock', type: 'output', description: 'Notify payment card network and freeze compromised token.', detail: 'Core Banking API Response' }
          ]
        };
    }
  };

  const comparison = getUnitComparison();
  const flow = getUnitFlow();
  const keyTakeaways = getUnitKeyTakeaways();

  // Primary code example
  const primaryConcept = unitConcepts[0] || allConcepts[0];
  const unitCode = primaryConcept?.application?.codeSnippet?.code || `
# SubjectLab Unit ${currentUnit.unitNumber} Demonstration Pipeline
def security_evaluator(telemetry_vector):
    risk_score = sum(telemetry_vector) / len(telemetry_vector)
    return "Malicious Threat" if risk_score > 0.75 else "Benign Traffic"

print(security_evaluator([0.9, 0.8, 0.85])) # Output: Malicious Threat
`.trim();

  const sampleInput = primaryConcept?.application?.inputExample || "Telemetry Vector: [0.92, 0.81, 0.88, 0.95]";
  const expectedOutput = primaryConcept?.application?.outputExample || "Result: Malicious Incident Confirmed (Confidence: 94.2%)";

  return (
    <div className="space-y-4 pb-12">
      {/* Breadcrumb Header with Red & Yellow Theme */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-[#C70234]/30 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-sans text-[#5F6368]">
          <Link to={`/${subjectId}`} className="hover:text-[#C70234] font-medium transition-colors">
            {metadata?.name || 'AI for Cyber Security'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#BDC1C6]" />
          <span className="font-semibold text-[#C70234]">
            Unit {currentUnit.unitNumber}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/40 font-semibold">
            {currentUnit.hours || 6} Teaching Hours
          </span>
          {currentUnit.memoryCode && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/30 font-semibold">
              Mnemonic: {currentUnit.memoryCode}
            </span>
          )}
        </div>
      </div>

      {/* 1. Unit Overview Card with Structured Bullet Points */}
      <section className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#C70234] text-white flex items-center justify-center font-bold text-xs">
            U{currentUnit.unitNumber}
          </span>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#92400E] font-semibold">
              Official Syllabus Module
            </span>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#202124] tracking-tight">
              {currentUnit.title}
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
          {currentUnit.summary}
        </p>

        {/* Learner Delight: Key Takeaways Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#FEF7E0]/60 to-[#FFFBEB] border border-[#FBBC05]/60 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#92400E]">
            <Zap className="w-4 h-4 text-[#D97706]" />
            <span>Essential Cognitive Takeaways (What to Master First):</span>
          </div>
          <ul className="space-y-1.5 pl-1">
            {keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#202124] leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C70234] shrink-0 mt-1.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3 Overview Pillars with Clean Bullet Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
          {/* Pillar 1 */}
          <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#FBBC05]/40 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#92400E]">
              <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
              <span>What Will I Learn?</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#202124]">
              <li className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#C70234] font-bold">•</span>
                <span>Algorithmic foundations and mathematical bounds for Unit {currentUnit.unitNumber}.</span>
              </li>
              <li className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#C70234] font-bold">•</span>
                <span>Telemetry feature engineering & noise-reduction procedures.</span>
              </li>
              <li className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#C70234] font-bold">•</span>
                <span>Hands-on Python scripts with sample inputs & outputs.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#C70234]/30 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#C70234]">
              <Lightbulb className="w-3.5 h-3.5 text-[#C70234]" />
              <span>Why Is It Important?</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#202124]">
              <li className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#FBBC05] font-bold font-mono">✓</span>
                <span>Replaces vulnerable static signatures with probabilistic generalization.</span>
              </li>
              <li className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#FBBC05] font-bold font-mono">✓</span>
                <span>Catches zero-day exploits and evasive polymorphic variations.</span>
              </li>
              <li className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#FBBC05] font-bold font-mono">✓</span>
                <span>Accelerates incident triage from hours to sub-second decisions.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#1A73E8]/30 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A73E8]">
              <Briefcase className="w-3.5 h-3.5 text-[#1A73E8]" />
              <span>Where Is It Used?</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#202124]">
              <li className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#1A73E8] font-bold">→</span>
                <span>Tier-1 Banking: Transaction fraud & anti-money laundering engines.</span>
              </li>
              <li className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#1A73E8] font-bold">→</span>
                <span>SOC Teams: Automated alert correlation & SIEM triage.</span>
              </li>
              <li className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#1A73E8] font-bold">→</span>
                <span>Identity Gateways: Zero-trust step-up MFA and biometrics.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Visual Mindmap Section */}
      <VisualMindmap
        unitNumber={currentUnit.unitNumber}
        unitTitle={currentUnit.title}
        topics={currentUnit.topics}
        subjectId={subjectId}
        concepts={allConcepts}
      />

      {/* 3. Topic Learning & Concept Hierarchy */}
      <TopicTree
        topics={currentUnit.topics}
        subjectId={subjectId}
        concepts={allConcepts}
      />

      {/* 4. Algorithm Flowchart */}
      <AlgorithmFlow
        title={flow.title}
        subtitle={flow.subtitle}
        steps={flow.steps}
      />

      {/* 5. Concept Comparison Table */}
      <ConceptComparison
        title={comparison.title}
        itemAName={comparison.a}
        itemBName={comparison.b}
        rows={comparison.rows}
      />

      {/* 6. Coding Example with Verified Expected Output */}
      <section className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#FBBC05]/40 pb-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#C70234]" />
            <h2 className="font-serif text-base font-bold text-[#202124]">
              Verified Implementation Code & Output
            </h2>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/40">
            Python 3.10+
          </span>
        </div>

        <p className="text-xs text-[#5F6368]">
          Production-grade script illustrating the primary detection mechanism for Unit {currentUnit.unitNumber}. Run or test locally in Jupyter.
        </p>

        <CodeBlock
          language="python"
          caption={`Unit ${currentUnit.unitNumber} Core Pipeline`}
          code={unitCode}
          sampleInput={sampleInput}
          expectedOutput={expectedOutput}
          explanation={[
            "Data ingestion and feature vector extraction from network/identity telemetry.",
            "Threshold evaluation or model scoring using standard machine learning libraries.",
            "Decision logic branching to isolate threats or enforce step-up authentication."
          ]}
        />
      </section>

      {/* 7. Study Notes (Short, Medium, Detailed) */}
      <StudyNotes
        shortContent={primaryConcept?.exam?.shortDefinition || primaryConcept?.understanding?.definition}
        mediumContent={primaryConcept?.exam?.fiveMarkAnswer || primaryConcept?.understanding?.markdownContent}
        detailedContent={primaryConcept?.exam?.tenMarkAnswer || primaryConcept?.exam?.sixteenMarkAnswer || primaryConcept?.understanding?.markdownContent}
        keywords={primaryConcept?.memory?.keywords}
        keyFormulas={primaryConcept?.exam?.keyFormulas}
      />

      {/* 8. Memory, Revision & Knowledge Check */}
      <section className="bg-white rounded-xl p-4 sm:p-5 border border-[#C70234]/30 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#FBBC05]/40 pb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#C70234]" />
            <h2 className="font-serif text-base font-bold text-[#202124]">
              Knowledge Check & Self-Assessment
            </h2>
          </div>
          <span className="text-[11px] font-sans font-medium text-[#188038] bg-[#E6F4EA] px-2 py-0.5 rounded border border-[#34A853]/30">
            Immediate Feedback
          </span>
        </div>

        {/* Quizzes from unit concepts */}
        <div className="space-y-3">
          {unitConcepts.flatMap(c => c.quiz || []).slice(0, 3).map((quiz, qIdx) => {
            const selectedOpt = selectedAnswers[quiz.id];
            const hasAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === quiz.correctIndex;

            return (
              <div
                key={quiz.id || qIdx}
                className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#FBBC05]/40 space-y-2.5"
              >
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FEF7E0] text-[#C70234] border border-[#FBBC05] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    Q{qIdx + 1}
                  </span>
                  <h4 className="text-xs font-semibold text-[#202124] leading-snug">
                    {quiz.question}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                  {quiz.options.map((opt, optIdx) => {
                    let optStyle = 'bg-white border-[#DADCE0] text-[#202124] hover:border-[#FBBC05]';
                    if (hasAnswered) {
                      if (optIdx === quiz.correctIndex) {
                        optStyle = 'bg-[#E6F4EA] border-[#34A853] text-[#188038] font-semibold';
                      } else if (optIdx === selectedOpt) {
                        optStyle = 'bg-[#FCE8EF] border-[#C70234] text-[#C70234] font-semibold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnswered}
                        onClick={() => setSelectedAnswers(prev => ({ ...prev, [quiz.id]: optIdx }))}
                        className={`p-2 rounded-lg border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${optStyle}`}
                      >
                        <span className="line-clamp-2">{opt}</span>
                        {hasAnswered && optIdx === quiz.correctIndex && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#188038] shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && (
                  <div className={`p-2 rounded-lg text-xs leading-relaxed ml-7 ${
                    isCorrect ? 'bg-[#E6F4EA] text-[#188038] border border-[#34A853]/40' : 'bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]/40'
                  }`}>
                    <strong>{isCorrect ? 'Correct! ' : 'Explanation: '}</strong>
                    {quiz.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Navigation Footer: Prev / Next Unit */}
      <div className="flex items-center justify-between pt-2">
        {currentUnit.unitNumber > 1 ? (
          <Link
            to={`/${subjectId}/units/${units[currentUnit.unitNumber - 2]?.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#C70234]/30 hover:border-[#C70234] text-xs font-semibold text-[#202124] hover:text-[#C70234] transition-colors"
          >
            <span>← Unit {currentUnit.unitNumber - 1}</span>
          </Link>
        ) : (
          <div />
        )}

        {currentUnit.unitNumber < units.length && (
          <Link
            to={`/${subjectId}/units/${units[currentUnit.unitNumber]?.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C70234] hover:bg-[#B6263A] text-xs font-semibold text-white transition-colors shadow-xs"
          >
            <span>Unit {currentUnit.unitNumber + 1} →</span>
          </Link>
        )}
      </div>
    </div>
  );
};
