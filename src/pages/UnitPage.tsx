import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  Briefcase,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Code2,
  HelpCircle,
  Zap
} from 'lucide-react';
import {
  getSubjectMetadata,
  getSubjectUnits,
  getSubjectConcepts,
  getSubjectUseCases,
  getSubjectRevision
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

  const currentUnit = units.find(u => u.id === unitId) || units[0];
  const unitConcepts = allConcepts.filter(c => c.unitId === currentUnit?.id);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  if (!currentUnit) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
        <h2 className="font-serif text-lg font-semibold text-slate-900">Unit not found</h2>
        <p className="text-xs text-slate-500 mt-1">Please select a valid unit from the sidebar.</p>
        <Link to={`/${subjectId}`} className="inline-block mt-3 text-xs font-medium text-slate-900 underline">
          Return to subject overview
        </Link>
      </div>
    );
  }

  const getUnitKeyTakeaways = (): string[] => {
    switch (currentUnit.unitNumber) {
      case 1:
        return [
          "Transitioning from rigid Expert Systems to statistical Machine Learning and Deep Neural Networks.",
          "Mapping the CIA Triad (Confidentiality, Integrity, Availability) into measurable AI telemetry signals.",
          "Contrasting Supervised (labeled malware), Unsupervised (anomaly clustering), and Reinforcement Learning.",
          "Preventing train-test data leakage and running telemetry experiments in Jupyter Notebooks."
        ];
      case 2:
        return [
          "Supervised Arsenal: Binary and multiclass classification for malware families; regression for dwell-time forecasting.",
          "Unsupervised Arsenal: PCA to collapse multi-thousand feature dimensions; K-Means and DBSCAN for zero-day clustering.",
          "Multimodal Security: Computer vision for CCTV perimeter defense, NLP for social threat mining, and image preprocessing.",
          "Feature Engineering: Extracting n-grams, entropy ratios, and lexical token distributions from packet streams."
        ];
      case 3:
        return [
          "Linear Decision Boundaries: Perceptron mechanics, weight update rules, and high-speed email header filtering.",
          "Maximum Margin Defense: Support Vector Machines (SVM) with non-linear RBF kernels to defeat image spam evasions.",
          "Phishing Classification: Logistic regression probability calibration and Decision Trees for transparent risk scoring.",
          "Probabilistic NLP: Multinomial Naive Bayes pipelines with Laplace smoothing and bag-of-words tokenization."
        ];
      case 4:
        return [
          "Identity Gateway Defense: Automated countermeasures against credential stuffing, brute force, and password spraying.",
          "Risk-Based Authentication (RBA): Computing account reputation scores from IP entropy, ASN risk, and device velocity.",
          "Behavioral Keystroke Biometrics: Measuring passive timing dynamics (Hold Time & Flight Time) for continuous session verification.",
          "Biometric Facial Defense: Deep CNN facial embeddings, Euclidean distance thresholds, and active liveness verification."
        ];
      case 5:
      default:
        return [
          "Class Imbalance Paradox: Managing the 99.9% benign vs 0.1% fraud challenge via SMOTE and cost-sensitive loss functions.",
          "Ensemble Mastery: Bagging (Random Forest variance reduction) vs Boosting (XGBoost iterative gradient error correction).",
          "Feature Store Pipelines: Engineering rolling 1-hour transaction velocities, geographic deviation, and merchant heuristics.",
          "Rigorous Statistical Metrics: Evaluating models using Precision-Recall curves, F1-scores, and cost-weighted confusion matrices."
        ];
    }
  };

  const getUnitComparison = (): { title: string; a: string; b: string; rows: ComparisonRow[] } => {
    switch (currentUnit.unitNumber) {
      case 1:
        return {
          title: 'Paradigm Comparison: Traditional Security vs AI-Driven Cybersecurity',
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
          title: 'Threat Detection Models: Linear Perceptron vs Support Vector Machines (SVM)',
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

  const getUnitFlow = (): { title: string; subtitle: string; steps: FlowStep[] } => {
    switch (currentUnit.unitNumber) {
      case 1:
        return {
          title: 'Cybersecurity AI Pipeline Workflow',
          subtitle: 'From telemetry ingestion to automated response orchestration',
          steps: [
            { stepNumber: 1, title: 'Telemetry ingestion', type: 'input', description: 'Capture firewall packet headers, DNS query logs, and host auth attempts.', detail: 'Kafka buffer → Logstash' },
            { stepNumber: 2, title: 'Feature normalization', type: 'process', description: 'Compute rolling velocity, IP entropy, and failed attempt counts without leakage.', detail: 'StandardScaler → Time windowing' },
            { stepNumber: 3, title: 'Model inference', type: 'process', description: 'Evaluate live telemetry against trained probabilistic models.', detail: 'Model.predict_proba(X_test)' },
            { stepNumber: 4, title: 'Risk score decision gate', type: 'decision', description: 'Thresholding: Score > 85 triggers block; 50-85 triggers MFA; < 50 allows.', detail: 'Zero-trust policy evaluator' },
            { stepNumber: 5, title: 'Automated response', type: 'output', description: 'Inject dynamic firewall block rule and update SIEM incident ticket.', detail: 'SOAR webhook dispatch' }
          ]
        };
      case 2:
        return {
          title: 'Multimodal Threat Detection Pipeline',
          subtitle: 'Dimensionality reduction, video anomaly, and social NLP stream',
          steps: [
            { stepNumber: 1, title: 'Stream ingestion', type: 'input', description: 'Simultaneous CCTV video frames, employee social media feed, and NetFlow metrics.', detail: 'Multi-stream message queue' },
            { stepNumber: 2, title: 'Dimensionality reduction', type: 'process', description: 'Compress high-dimensional vectors to preserve 95% variance while cutting noise.', detail: 'PCA(n_components=0.95)' },
            { stepNumber: 3, title: 'Clustering & isolation', type: 'process', description: 'DBSCAN identifies dense normal operational clusters; marks outliers as anomalies.', detail: 'DBSCAN(eps=0.5, min_samples=5)' },
            { stepNumber: 4, title: 'Anomaly validation', type: 'decision', description: 'Distinguish legitimate maintenance peaks from malicious exfiltration behavior.', detail: 'Context correlation check' },
            { stepNumber: 5, title: 'Incident escalation', type: 'output', description: 'Broadcast alert to SOC dashboard with coordinate visual heatmap.', detail: 'SIEM Incident Dispatch' }
          ]
        };
      case 3:
        return {
          title: 'Threat Detection & Phishing Workflow',
          subtitle: 'Feature engineering, text tokenization, and classifier ensemble',
          steps: [
            { stepNumber: 1, title: 'Message capture', type: 'input', description: 'Intercept incoming SMTP payloads, email headers, and embedded hyperlink URLs.', detail: 'Raw MIME parser' },
            { stepNumber: 2, title: 'Lexical extraction', type: 'process', description: 'Extract IP presence in URL, sub-domain depth, suspicious TLDs, and TF-IDF terms.', detail: 'NLP pipeline + regex extraction' },
            { stepNumber: 3, title: 'Model scoring', type: 'process', description: 'Feed features into Naive Bayes / Decision Tree classifier for probability estimation.', detail: 'P(Phish | Words) * P(Prior)' },
            { stepNumber: 4, title: 'Reputation check', type: 'decision', description: 'Verify domain age and DNS WHOIS reputation if model confidence is borderline.', detail: 'WHOIS API lookups' },
            { stepNumber: 5, title: 'Quarantine & alert', type: 'output', description: 'Move email to security quarantine vault and append warning banner.', detail: 'Exchange/Workspace action' }
          ]
        };
      case 4:
        return {
          title: 'Continuous Identity & Behavioral Authentication',
          subtitle: 'Keystroke dynamics, account reputation, and facial verification',
          steps: [
            { stepNumber: 1, title: 'Telemetry acquisition', type: 'input', description: 'Record keystroke Flight Time (FT), Hold Time (HT), and facial camera embeddings.', detail: 'Client-side event listeners' },
            { stepNumber: 2, title: 'Profile normalization', type: 'process', description: 'Transform raw milliseconds into normalized statistical user profile baselines.', detail: 'Z-score normalization against user history' },
            { stepNumber: 3, title: 'Distance computation', type: 'process', description: 'Compute Euclidean / Cosine distance between current interaction and stored profile.', detail: 'Distance = ||Current - Baseline||' },
            { stepNumber: 4, title: 'Confidence verification', type: 'decision', description: 'Verify if keystroke and face match threshold theta >= 0.85.', detail: 'Multi-biometric fusion gate' },
            { stepNumber: 5, title: 'Session maintenance', type: 'output', description: 'Maintain silent session access or immediately enforce biometric step-up re-auth.', detail: 'Session Token Rotation' }
          ]
        };
      case 5:
      default:
        return {
          title: 'Real-Time Financial Fraud Decision Engine',
          subtitle: 'Handling extreme class imbalance with ensemble gradient boosting',
          steps: [
            { stepNumber: 1, title: 'Transaction ingestion', type: 'input', description: 'Ingest credit card swipe telemetry: Amount, Merchant Category, Location, Time.', detail: 'Sub-100ms API Gateway' },
            { stepNumber: 2, title: 'Feature enrichment', type: 'process', description: 'Calculate rolling 1-hour transaction velocity and deviation from user average spend.', detail: 'Redis feature store lookup' },
            { stepNumber: 3, title: 'Ensemble scoring', type: 'process', description: 'Evaluate transaction using XGBoost trained with cost-sensitive class weights.', detail: 'Scale_pos_weight evaluation' },
            { stepNumber: 4, title: 'Risk tiering decision', type: 'decision', description: 'Score >= 0.90 -> Auto Decline; Score >= 0.60 -> SMS OTP; Score < 0.60 -> Approve.', detail: 'Banking risk engine policy' },
            { stepNumber: 5, title: 'Payment settlement', type: 'output', description: 'Notify payment card network and freeze compromised token.', detail: 'Core Banking API Response' }
          ]
        };
    }
  };

  const comparison = getUnitComparison();
  const flow = getUnitFlow();
  const keyTakeaways = getUnitKeyTakeaways();

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
    <div className="space-y-6 pb-16">
      {/* Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
          <Link to={`/${subjectId}`} className="hover:text-slate-900 transition-colors">
            {metadata?.name || 'AI for Cyber Security'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">
            Unit {currentUnit.unitNumber}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
            {currentUnit.hours || 6} hours
          </span>
          {currentUnit.memoryCode && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60 font-medium">
              Mnemonic: {currentUnit.memoryCode}
            </span>
          )}
        </div>
      </div>

      {/* 1. Unit Overview Card */}
      <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
            Unit {currentUnit.unitNumber}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            {currentUnit.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
            {currentUnit.summary}
          </p>
        </div>

        {/* Cognitive Takeaways Banner */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
            <Zap className="w-4 h-4 text-[#9F1239]" />
            <span>Essential Key Takeaways:</span>
          </div>
          <ul className="space-y-1.5 pl-1">
            {keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9F1239] shrink-0 mt-1.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>What will I learn?</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-600">
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400">•</span>
                <span>Core algorithmic mechanisms & mathematical bounds</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400">•</span>
                <span>Telemetry normalization & feature pipelines</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400">•</span>
                <span>Verified Python implementations</span>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
              <Lightbulb className="w-3.5 h-3.5 text-slate-500" />
              <span>Why is it important?</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-600">
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400">✓</span>
                <span>Replaces rigid static signatures with generalization</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400">✓</span>
                <span>Detects zero-day threats and polymorphic variants</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400">✓</span>
                <span>Shrinks triage latency from hours to seconds</span>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/60 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              <span>Where is it used?</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-600">
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400">→</span>
                <span>Banking fraud & real-time transaction gateways</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400">→</span>
                <span>SOC alert triage & automated containment</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400">→</span>
                <span>Zero-trust identity gateways & continuous biometrics</span>
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
      <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-slate-500" />
            <h2 className="font-serif text-base font-semibold text-slate-900">
              Implementation Code & Output
            </h2>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            Python 3.10+
          </span>
        </div>

        <p className="text-xs text-slate-600">
          Executable reference implementation illustrating the detection mechanism for Unit {currentUnit.unitNumber}.
        </p>

        <CodeBlock
          language="python"
          caption={`Unit ${currentUnit.unitNumber} pipeline demonstration`}
          code={unitCode}
          sampleInput={sampleInput}
          expectedOutput={expectedOutput}
          explanation={[
            "Data ingestion and feature vector extraction from telemetry.",
            "Threshold evaluation or model scoring using standard libraries.",
            "Decision logic branching to isolate threats or enforce step-up authentication."
          ]}
        />
      </section>

      {/* 7. Study Notes */}
      <StudyNotes
        shortContent={primaryConcept?.exam?.shortDefinition || primaryConcept?.understanding?.definition}
        mediumContent={primaryConcept?.exam?.fiveMarkAnswer || primaryConcept?.understanding?.markdownContent}
        detailedContent={primaryConcept?.exam?.tenMarkAnswer || primaryConcept?.exam?.sixteenMarkAnswer || primaryConcept?.understanding?.markdownContent}
        keywords={primaryConcept?.memory?.keywords}
        keyFormulas={primaryConcept?.exam?.keyFormulas}
      />

      {/* 8. Self-Assessment Quiz */}
      <section className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <h2 className="font-serif text-base font-semibold text-slate-900">
              Knowledge Check
            </h2>
          </div>
          <span className="text-xs font-sans text-slate-500">
            Immediate feedback
          </span>
        </div>

        <div className="space-y-3">
          {unitConcepts.flatMap(c => c.quiz || []).slice(0, 3).map((quiz, qIdx) => {
            const selectedOpt = selectedAnswers[quiz.id];
            const hasAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === quiz.correctIndex;

            return (
              <div
                key={quiz.id || qIdx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2.5"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded bg-slate-200/70 text-slate-700 font-mono text-[10px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <h4 className="text-xs font-medium text-slate-900 leading-relaxed">
                    {quiz.question}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                  {quiz.options.map((opt, optIdx) => {
                    let optStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300';
                    if (hasAnswered) {
                      if (optIdx === quiz.correctIndex) {
                        optStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-medium';
                      } else if (optIdx === selectedOpt) {
                        optStyle = 'bg-rose-50 border-rose-300 text-rose-800 font-medium';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnswered}
                        onClick={() => setSelectedAnswers(prev => ({ ...prev, [quiz.id]: optIdx }))}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${optStyle}`}
                      >
                        <span className="line-clamp-2">{opt}</span>
                        {hasAnswered && optIdx === quiz.correctIndex && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && (
                  <div className={`p-2.5 rounded-lg text-xs leading-relaxed ml-7 ${
                    isCorrect ? 'bg-emerald-50/70 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    <strong>{isCorrect ? 'Correct. ' : 'Explanation: '}</strong>
                    {quiz.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-2">
        {currentUnit.unitNumber > 1 ? (
          <Link
            to={`/${subjectId}/units/${units[currentUnit.unitNumber - 2]?.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <span>← Unit {currentUnit.unitNumber - 1}</span>
          </Link>
        ) : (
          <div />
        )}

        {currentUnit.unitNumber < units.length && (
          <Link
            to={`/${subjectId}/units/${units[currentUnit.unitNumber]?.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-white transition-colors shadow-2xs"
          >
            <span>Unit {currentUnit.unitNumber + 1} →</span>
          </Link>
        )}
      </div>
    </div>
  );
};
