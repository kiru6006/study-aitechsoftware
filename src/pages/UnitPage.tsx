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
  Target,
  ShieldAlert,
  Network
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
  const { subjectId = 'cyber-forensics', unitId = 'unit-1' } = useParams<{
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
      <div className="bg-white rounded-lg p-4 text-center border border-[#C70234]">
        <h2 className="font-serif text-sm font-bold text-black">Unit Not Found</h2>
        <p className="text-xs text-gray-600 mt-1">Please select a valid unit from the sidebar.</p>
        <Link to={`/${subjectId}`} className="inline-block mt-2 text-xs font-bold text-[#C70234]">
          Return to Overview
        </Link>
      </div>
    );
  }

  const isCF = subjectId === 'cyber-forensics';

  // Unit Key Takeaways
  const getUnitKeyTakeaways = (): string[] => {
    if (isCF) {
      switch (currentUnit.unitNumber) {
        case 1:
          return [
            "Eight-Stage Lifecycle: Enforce strict Identification -> Preservation -> Collection -> Examination -> Analysis -> Documentation -> Presentation -> Review.",
            "Order of Volatility (RFC 3227): Capture CPU registers and RAM before non-volatile disk or backup tapes.",
            "Write-Blocking & Integrity: Hardware write-blockers drop ATA/SCSI write commands; SHA-256 proves content integrity but NOT authorship.",
            "Section 65B Compliance: Mandatory statutory certification for electronic records admissibility under Indian Evidence Act."
          ];
        case 2:
          return [
            "NTFS $MFT Record Structure: $STANDARD_INFORMATION (0x10) timestamps vs $FILE_NAME (0x30) kernel-controlled timestamps.",
            "File Slack Space Recovery: Extract remnant data hiding between logical EOF and physical cluster boundaries (RAM slack vs Drive slack).",
            "Signature-Based Data Carving: Extracting unallocated clusters using magic byte headers (e.g. %PDF-, PK..) and footers (%%EOF).",
            "Windows Execution Artifacts: Prefetch (.pf) proves execution count and dates; LNK files prove document opening; USBSTOR proves drive serial."
          ];
        case 3:
          return [
            "Volatile Memory Triage: Capturing live RAM via winpmem or LiME before network disconnection or power-down.",
            "Volatility 3 Framework: windows.pslist (linked list), windows.psscan (pool tags), windows.netscan (sockets), windows.malfind (RWX injection).",
            "DKOM Rootkit Evasion: Direct Kernel Object Manipulation unlinks processes from active links, bypassed via pool-tag scanning.",
            "Super Timeline Synthesis: Normalizing multi-source logs (MFT, EVTX, PCAP, Browser) into a synchronized UTC timeline using Plaso."
          ];
        case 4:
          return [
            "Mobile OS Architecture: Android Linux UID/SELinux sandboxing vs Apple Secure Enclave Processor (SEP) hardware encryption.",
            "Mobile Acquisition Tiers: Logical (standard backup APIs), File System (app private SQLite storage), and Physical (raw bitstream flash).",
            "SQLite WAL Analysis: Parsing Write-Ahead Logging (-wal) companion files to recover uncommitted transactions and deleted messages.",
            "IoT & Smart CCTV Triage: Extracting embedded flash firmware via UART/JTAG and carving RTSP circular video ring buffers."
          ];
        case 5:
        default:
          return [
            "EDRM E-Discovery Framework: Standardizing 9-stage legal lifecycle from information governance to court presentation.",
            "Court-Admissible Reporting: Strictly separating Confirmed Observations from Supported Inferences and Unverified Hypotheses.",
            "Expert Witness Ethics: Daubert admissibility standard, resisting the advocacy trap, and objective cross-examination defense.",
            "Tool Validation & Biometrics: NIST Computer Forensic Tool Testing (CFTT) error rate benchmarks, and Biometric FAR vs FRR trade-offs."
          ];
      }
    } else {
      switch (currentUnit.unitNumber) {
        case 1:
          return [
            "Evolutionary shift: Transitioning from rigid hand-crafted Expert Systems to statistical Machine Learning & Deep Neural Networks.",
            "Triad Alignment: Mapping Confidentiality, Integrity, and Availability into quantifiable AI telemetry features.",
            "Core Paradigms: Comparing Supervised (labels), Unsupervised (clustering anomalies), and Reinforcement Learning.",
            "Production Hygiene: Preventing train/test data leakage, tuning learning rates, and rapid iteration with Jupyter."
          ];
        case 2:
          return [
            "Supervised Arsenal: Binary & Multiclass Classification for malware categorization; Regression for risk forecasting.",
            "Unsupervised Arsenal: PCA to collapse multi-thousand feature dimensions; K-Means & DBSCAN for clustering outliers.",
            "Multimodal Security: Convolutional video models for CCTV perimeter security, NLP for threat intelligence.",
            "Feature Engineering: Extracting n-grams, entropy ratios, and lexical token distributions from raw telemetry streams."
          ];
        case 3:
          return [
            "Linear Decision Boundaries: Perceptron algorithm mechanics, hyper-plane weights update rules, and spam filtration.",
            "Maximum Margin Defense: Support Vector Machines (SVM) with RBF non-linear kernels to defeat visual image spam.",
            "Phishing Classification: Logistic regression probability calibration and Decision Trees for transparent URL risk scoring.",
            "Probabilistic NLP: Multinomial Naive Bayes threat pipeline with Laplace smoothing and bag-of-words tokenization."
          ];
        case 4:
          return [
            "Identity Gateway Defense: Automated countermeasures against credential stuffing, brute force bursts, and password spraying.",
            "Risk-Based Authentication (RBA): Computing dynamic account reputation scores from IP entropy and device velocity.",
            "Behavioral Keystroke Biometrics: Measuring passive timing dynamics (Hold Time & Flight Time) for continuous verification.",
            "Biometric Facial Defense: Deep CNN facial embeddings, Euclidean distance matching, and active liveness anti-spoofing."
          ];
        case 5:
        default:
          return [
            "Extreme Class Imbalance: Overcoming the 99.9% benign vs 0.1% fraudulent transaction challenge via SMOTE and cost-sensitive loss.",
            "Ensemble Mastery: Bagging (Random Forest variance reduction) vs Boosting (XGBoost/LightGBM iterative error correction).",
            "Feature Store Pipelines: Engineering rolling 1-hour transaction velocities and geographic deviation heuristics.",
            "Rigorous Statistical Metrics: Evaluating models using Precision-Recall curves and F1-scores instead of raw accuracy."
          ];
      }
    }
  };

  // Comparisons per unit
  const getUnitComparison = (): { title: string; a: string; b: string; rows: ComparisonRow[] } => {
    if (isCF) {
      switch (currentUnit.unitNumber) {
        case 1:
          return {
            title: 'Forensic Acquisition Strategy: Dead (Static) vs Live Acquisition',
            a: 'Dead Acquisition',
            b: 'Live Acquisition',
            rows: [
              { dimension: 'Power State', itemA: 'System powered OFF; zero active runtime processes', itemB: 'System actively powered on and executing tasks', advantage: 'neutral' },
              { dimension: 'Hardware Write-Blocker', itemA: 'Physical SATA/NVMe write-blocker guarantees zero disk changes', itemB: 'Executes triage collector; modifies tiny RAM footprint', advantage: 'A' },
              { dimension: 'Volatile RAM & Sockets', itemA: 'Permanently lost upon power-off; encryption keys purged', itemB: 'Captures physical RAM, active C2 sockets, and decrypted keys', advantage: 'B' },
              { dimension: 'Full Disk Encryption', itemA: 'BitLocker volumes remain locked without recovery key', itemB: 'Can extract decrypted master keys directly from volatile RAM', advantage: 'B' }
            ]
          };
        case 2:
          return {
            title: 'File System Architecture: NTFS ($MFT) vs Linux ext4 (Inodes)',
            a: 'NTFS ($MFT)',
            b: 'Linux ext4 (Inodes)',
            rows: [
              { dimension: 'Metadata Structure', itemA: '1024-byte Master File Table records holding all attributes', itemB: 'Fixed-size Inode tables storing file metadata & block pointers', advantage: 'neutral' },
              { dimension: 'Small File Storage', itemA: 'Resident files (<700B) stored directly inside MFT record', itemB: 'Allocates at least one physical disk block regardless of size', advantage: 'A' },
              { dimension: 'Deleted File Handling', itemA: 'Marks MFT record inactive; cluster runlists remain until overwritten', itemB: 'Zeroes direct block pointers in ext4 upon file deletion', advantage: 'A' },
              { dimension: 'Journaling', itemA: '$LogFile & $UsnJrnl track metadata & allocation changes', itemB: 'JBD2 journal maintains ordered metadata transactions', advantage: 'neutral' }
            ]
          };
        case 3:
          return {
            title: 'Network Artifact Analysis: Full Packet Capture (PCAP) vs NetFlow / IPFIX',
            a: 'Packet Capture (PCAP)',
            b: 'NetFlow / IPFIX',
            rows: [
              { dimension: 'Data Scope', itemA: 'Full packet headers and complete application payload', itemB: 'Session metadata only (5-tuple, bytes, packets, duration)', advantage: 'A' },
              { dimension: 'Storage Footprint', itemA: 'Gigabytes to terabytes per hour; short retention buffer', itemB: 'Lightweight (~1% of raw traffic); scalable long-term storage', advantage: 'B' },
              { dimension: 'Payload Inspection', itemA: 'Can reassemble transferred files, scripts, and TLS SNI', itemB: 'Cannot reconstruct file payloads or inspect text', advantage: 'A' },
              { dimension: 'C2 Beacon Detection', itemA: 'Requires deep packet inspection filtering across streams', itemB: 'High-speed automated statistical query for periodic beacon bursts', advantage: 'B' }
            ]
          };
        case 4:
          return {
            title: 'Mobile Forensics Security: Android Sandboxing vs Apple iOS Secure Enclave',
            a: 'Android OS',
            b: 'Apple iOS',
            rows: [
              { dimension: 'App Sandboxing', itemA: 'Unique Linux UID per app with SELinux domain policies', itemB: 'Container-based sandbox with class-based Data Protection', advantage: 'neutral' },
              { dimension: 'Hardware Security', itemA: 'Hardware TEE / Knox / Titan M security chips', itemB: 'Dedicated Secure Enclave Processor (SEP) with microkernel', advantage: 'B' },
              { dimension: 'Physical Extraction', itemA: 'Feasible via bootloader exploits, EDL, or root privilege', itemB: 'Extremely difficult on modern chips without zero-day bootrom exploits', advantage: 'A' },
              { dimension: 'Debug & Extraction', itemA: 'Standard Android Debug Bridge (ADB) logical backup protocols', itemB: 'Encrypted iTunes/Configurator backups; requires passcode', advantage: 'A' }
            ]
          };
        case 5:
        default:
          return {
            title: 'Evidentiary Fact Hierarchy: Confirmed Observation vs Supported Inference',
            a: 'Confirmed Observation',
            b: 'Supported Inference',
            rows: [
              { dimension: 'Epistemic Standard', itemA: 'Undeniable bitstream fact verified directly from artifact', itemB: 'Logical deduction corroborated by multiple intersecting artifacts', advantage: 'A' },
              { dimension: 'Example', itemA: 'USBSTOR registry logs SanDisk connected at 14:02 UTC', itemB: 'Customer accounts accessed at 14:03 based on LNK timestamps', advantage: 'neutral' },
              { dimension: 'Courtroom Defensibility', itemA: 'Withstands cross-examination without secondary corroboration', itemB: 'Requires secondary timeline and event log corroboration', advantage: 'A' },
              { dimension: 'Risk of Speculation', itemA: 'Zero risk; states only empirical physical/digital facts', itemB: 'Risks advocacy trap if extended beyond evidentiary support', advantage: 'A' }
            ]
          };
      }
    } else {
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
        default:
          return {
            title: 'Model Comparison',
            a: 'Approach A',
            b: 'Approach B',
            rows: [
              { dimension: 'Speed', itemA: 'Fast', itemB: 'Adaptive', advantage: 'B' }
            ]
          };
      }
    }
  };

  // Algorithm Flows per unit
  const getUnitFlow = (): { title: string; subtitle: string; steps: FlowStep[] } => {
    if (isCF) {
      switch (currentUnit.unitNumber) {
        case 1:
          return {
            title: 'Evidence Preservation & Bitstream Acquisition Pipeline',
            subtitle: 'Conforming to ISO/IEC 27037 and Section 65B Admissibility',
            steps: [
              { stepNumber: 1, title: 'Crime Scene Triage', type: 'input', description: 'Assess machine power state, open windows, and isolate from network.', detail: 'RFC 3227 Order of Volatility' },
              { stepNumber: 2, title: 'Hardware Write-Blocking', type: 'process', description: 'Connect suspect storage media through validated physical write-blocker.', detail: 'Tableau T8u ATA/NVMe Bridge' },
              { stepNumber: 3, title: 'Bitstream Mirroring (.E01)', type: 'process', description: 'Acquire raw bitstream clone calculating block-level checksums.', detail: 'dc3dd / FTK Imager CLI' },
              { stepNumber: 4, title: 'Cryptographic Hash Verification', type: 'decision', description: 'Verify SHA-256 of source matches forensic clone identically.', detail: 'Integrity equality check' },
              { stepNumber: 5, title: 'Chain of Custody & Sec 65B Log', type: 'output', description: 'Execute physical custody transfer log and legal electronic certificate.', detail: 'Exhibit Documentation' }
            ]
          };
        case 2:
          return {
            title: 'File System Examination & Data Carving Pipeline',
            subtitle: 'Recovering deleted records from unallocated storage clusters',
            steps: [
              { stepNumber: 1, title: 'Partition Identification (mmls)', type: 'input', description: 'Identify volume boundaries and sector offsets in raw image.', detail: 'DOS / GPT partition tables' },
              { stepNumber: 2, title: 'MFT Metadata Inspection (fls)', type: 'process', description: 'Enumerate allocated and deleted directory records marked inactive (*).', detail: 'Parse $MFT records 0x10 & 0x30' },
              { stepNumber: 3, title: 'Unallocated Cluster Extraction', type: 'process', description: 'Extract non-assigned disk space using Sleuth Kit blkls utility.', detail: 'blkls raw image > unalloc.raw' },
              { stepNumber: 4, title: 'Signature-Based Data Carving', type: 'decision', description: 'Scan unallocated blocks for magic headers (PK.., %PDF-) and footers.', detail: 'Scalpel / Foremost matching' },
              { stepNumber: 5, title: 'Carved File Validation & Extraction', type: 'output', description: 'Reconstruct file stream and verify internal structure in Autopsy.', detail: 'Extracted Loan Records' }
            ]
          };
        case 3:
          return {
            title: 'Volatile Memory & Super Timeline Reconstruction',
            subtitle: 'Detecting unlinked rootkits and correlating network C2 traffic',
            steps: [
              { stepNumber: 1, title: 'Live Memory Capture', type: 'input', description: 'Dump physical RAM using statically compiled winpmem utility.', detail: 'winpmem -o memory.raw' },
              { stepNumber: 2, title: 'Kernel Pool Tag Scan (psscan)', type: 'process', description: 'Discover processes unlinked from ActiveProcessLinks list via DKOM.', detail: 'vol windows.psscan' },
              { stepNumber: 3, title: 'Injected Code Analysis (malfind)', type: 'process', description: 'Scan VAD memory structures for RWX pages containing MZ headers.', detail: 'vol windows.malfind --pid 1220' },
              { stepNumber: 4, title: 'Socket Association (netscan)', type: 'decision', description: 'Tie injected PID to external outbound TCP socket (198.51.100.44:443).', detail: 'C2 beacon correlation' },
              { stepNumber: 5, title: 'UTC Super Timeline Output', type: 'output', description: 'Synthesize MFT MACB, Event Logs, and PCAP into normalized chronology.', detail: 'Plaso / log2timeline CSV' }
            ]
          };
        case 4:
          return {
            title: 'Mobile Smartphone & IoT Evidence Extraction Pipeline',
            subtitle: 'Parsing SQLite Write-Ahead Logs and embedded CCTV flash',
            steps: [
              { stepNumber: 1, title: 'Radio Frequency Isolation', type: 'input', description: 'Place smartphone in Faraday bag to prevent remote wipe commands.', detail: 'RF shielding enclosure' },
              { stepNumber: 2, title: 'File System Acquisition', type: 'process', description: 'Extract full app directory structure and /data/data/ private storage via ADB.', detail: 'Android Debug Bridge dump' },
              { stepNumber: 3, title: 'SQLite WAL Journal Parsing', type: 'process', description: 'Analyze companion mmssms.db-wal to recover uncommitted 2FA SMS codes.', detail: 'sqlitebrowser WAL inspection' },
              { stepNumber: 4, title: 'IoT Embedded Flash Carving', type: 'decision', description: 'Extract MicroSD ring buffer from Smart CCTV camera and repair video.', detail: 'FFmpeg H.264 stream repair' },
              { stepNumber: 5, title: 'Physical Presence Corroboration', type: 'output', description: 'Correlate SMS OTP transmission timestamp with CCTV server room entry.', detail: 'Multi-device forensic proof' }
            ]
          };
        case 5:
        default:
          return {
            title: 'Defensible Forensic Case Reporting & Validation Pipeline',
            subtitle: 'NIST CFTT compliance, Daubert evaluation, and court presentation',
            steps: [
              { stepNumber: 1, title: 'Master Evidence Inventory', type: 'input', description: 'Catalog Items E-01 through E-08 with dual SHA-256 and MD5 hashes.', detail: 'Evidence Register compilation' },
              { stepNumber: 2, title: 'NIST CFTT Tool Validation', type: 'process', description: 'Cross-reference write-blockers and carvers against NIST test assertions.', detail: 'CFTT known error rate audit' },
              { stepNumber: 3, title: 'Epistemic Classification', type: 'decision', description: 'Strictly separate Confirmed Observations from Unsupported Hypotheses.', detail: 'Eliminate advocacy bias' },
              { stepNumber: 4, title: 'Court Report Drafting', type: 'process', description: 'Compile ISO/IEC 27042 compliant report with technical appendices.', detail: 'Formal judicial exhibit' },
              { stepNumber: 5, title: 'Expert Witness Certification', type: 'output', description: 'Execute Section 65B electronic certificate and prepare cross-exam defense.', detail: 'Statutory Court Admissibility' }
            ]
          };
      }
    } else {
      switch (currentUnit.unitNumber) {
        case 1:
          return {
            title: 'End-to-End Cybersecurity AI Pipeline',
            subtitle: 'From raw network telemetry to automated security orchestration',
            steps: [
              { stepNumber: 1, title: 'Telemetry Ingestion', type: 'input', description: 'Capture firewall packet headers and auth attempts.', detail: 'Kafka buffer' },
              { stepNumber: 2, title: 'Normalization', type: 'process', description: 'Compute rolling velocity and IP entropy.', detail: 'StandardScaler' },
              { stepNumber: 3, title: 'Inference', type: 'process', description: 'Evaluate live telemetry against models.', detail: 'predict_proba' },
              { stepNumber: 4, title: 'Decision Gate', type: 'decision', description: 'Score > 85 triggers block; < 50 allows.', detail: 'Zero-trust gate' },
              { stepNumber: 5, title: 'Response', type: 'output', description: 'Inject dynamic firewall block rule.', detail: 'SOAR dispatch' }
            ]
          };
        default:
          return {
            title: 'AI Security Pipeline',
            subtitle: 'Standard Detection Flow',
            steps: [
              { stepNumber: 1, title: 'Input', type: 'input', description: 'Telemetry Feed', detail: 'Raw Log' },
              { stepNumber: 2, title: 'Model', type: 'process', description: 'ML Evaluation', detail: 'Classifier' },
              { stepNumber: 3, title: 'Output', type: 'output', description: 'Threat Alert', detail: 'SIEM' }
            ]
          };
      }
    }
  };

  const comparison = getUnitComparison();
  const flow = getUnitFlow();
  const keyTakeaways = getUnitKeyTakeaways();

  // Primary code example
  const primaryConcept = unitConcepts[0] || allConcepts[0];
  const unitCode = primaryConcept?.application?.codeSnippet?.code || `
# SubjectLab Unit ${currentUnit.unitNumber} Demonstration Pipeline
def forensic_hash_validator(original_hash, copy_hash):
    if original_hash == copy_hash:
        return "MATCH: Bitstream Integrity Confirmed (Admissible)"
    return "MISMATCH: Evidence Modified or Corrupted (Inadmissible)"

print(forensic_hash_validator("e3b0c442...", "e3b0c442..."))
`.trim();

  const sampleInput = primaryConcept?.application?.inputExample || "Evidence Item: E-01 (Dell Laptop NVMe) | SHA-256 Checksum";
  const expectedOutput = primaryConcept?.application?.outputExample || "Result: Bitstream Verification MATCH CONFIRMED (100% Integrity)";

  return (
    <div className="space-y-2.5 pb-8 text-black font-sans">
      {/* 5-Unit Interactive Stepper Header (Horizontal on desktop, vertical on mobile) */}
      <div className="bg-white rounded-lg p-2 border border-[#DADCE0] shadow-2xs">
        <div className="text-[10px] font-mono font-bold text-[#92400E] uppercase mb-1 flex items-center justify-between">
          <span>{metadata?.name || 'Curriculum'} • 5-Unit Learning Stepper</span>
          <span className="text-gray-500 font-normal">Click a unit to jump</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-1.5">
          {units.map(u => {
            const isThisActive = u.id === currentUnit.id;
            return (
              <Link
                key={u.id}
                to={`/${subjectId}/units/${u.id}`}
                className={`p-1.5 rounded text-left transition-all border flex items-center sm:flex-col sm:items-start justify-between sm:justify-start gap-1 ${
                  isThisActive
                    ? 'bg-[#C70234] text-white border-[#C70234] shadow-xs'
                    : 'bg-[#FAF9F5] border-[#DADCE0] text-gray-800 hover:border-[#FBBC05] hover:bg-[#FEF7E0]/40'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`w-4 h-4 rounded text-[9px] font-mono font-bold flex items-center justify-center shrink-0 ${
                    isThisActive ? 'bg-white text-[#C70234]' : 'bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]'
                  }`}>
                    U{u.unitNumber}
                  </span>
                  <span className="font-mono text-[10px] font-bold">
                    {u.memoryCode}
                  </span>
                </div>
                <div className="text-[11px] font-bold leading-tight truncate sm:mt-0.5">
                  {u.title.split(':')[0]}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Breadcrumb & Unit Header */}
      <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#C70234]/30 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link to={`/${subjectId}`} className="hover:text-[#C70234] font-medium transition-colors">
              {metadata?.name || 'Subject'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-bold text-[#C70234]">
              Unit {currentUnit.unitNumber}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] font-bold">
              {currentUnit.hours || 12} Teaching Hours
            </span>
            {currentUnit.memoryCode && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FCE8EF] text-[#C70234] border border-[#C70234]/30 font-bold">
                Mnemonic: {currentUnit.memoryCode}
              </span>
            )}
          </div>
        </div>

        <h1 className="font-serif text-lg sm:text-2xl font-bold text-black tracking-tight leading-snug">
          Unit {currentUnit.unitNumber}: {currentUnit.title}
        </h1>

        <p className="text-xs text-gray-700 leading-relaxed max-w-4xl">
          {currentUnit.summary}
        </p>

        {/* Quick Link Navigation Toolbar */}
        <div className="pt-2 border-t border-[#DADCE0] flex flex-wrap gap-1.5 text-xs font-bold">
          <Link
            to={`/${subjectId}/investigation`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#C70234] text-white hover:bg-[#A00028] shadow-2xs"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Investigation Task (Stage {currentUnit.unitNumber})</span>
          </Link>
          <Link
            to={`/${subjectId}/mindmaps`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] hover:bg-[#FEF08A]"
          >
            <Network className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Unit Mindmap</span>
          </Link>
          <Link
            to={`/${subjectId}/labs`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF9F5] text-black border border-[#DADCE0] hover:border-[#FBBC05]"
          >
            <Terminal className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Practical Lab Simulator</span>
          </Link>
          <Link
            to={`/${subjectId}/revision`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF9F5] text-black border border-[#DADCE0] hover:border-[#FBBC05]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C70234]" />
            <span>Memory Tip ({currentUnit.memoryCode})</span>
          </Link>
        </div>
      </div>

      {/* Cognitive Takeaways Card - Compact */}
      <div className="p-3 rounded-lg bg-[#FEF7E0] border border-[#FBBC05] space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#92400E]">
          <Zap className="w-4 h-4 text-[#C70234]" />
          <span>Core Syllabus Takeaways (Unit {currentUnit.unitNumber} Mastery):</span>
        </div>
        <ul className="space-y-1 pl-1 text-xs text-gray-800 leading-snug">
          {keyTakeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C70234] shrink-0 mt-1.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

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

      {/* 6. Implementation Code & Output */}
      <section className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-2">
        <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
          <div className="flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-[#C70234]" />
            <h2 className="font-serif text-sm font-bold text-black">
              Verified Forensic Script & Command Execution
            </h2>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]">
            Python 3.10+ / Linux CLI
          </span>
        </div>

        <CodeBlock
          language="python"
          caption={`Unit ${currentUnit.unitNumber} Core Pipeline`}
          code={unitCode}
          sampleInput={sampleInput}
          expectedOutput={expectedOutput}
          explanation={[
            "Input telemetry ingestion and physical hardware write-blocking.",
            "Verification against mathematical SHA-256 cryptographic hashes.",
            "Defensible analysis logging conforming to court admissibility standards."
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

      {/* 8. Knowledge Check */}
      <section className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-2">
        <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#C70234]" />
            <h2 className="font-serif text-sm font-bold text-black">
              Unit {currentUnit.unitNumber} Active Knowledge Check
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#188038] bg-[#E6F4EA] px-1.5 py-0.2 rounded border border-[#34A853]/30">
            Immediate Feedback
          </span>
        </div>

        <div className="space-y-2">
          {unitConcepts.flatMap(c => c.quiz || []).slice(0, 3).map((quiz, qIdx) => {
            const selectedOpt = selectedAnswers[quiz.id];
            const hasAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === quiz.correctIndex;

            return (
              <div
                key={quiz.id || qIdx}
                className="p-2.5 rounded bg-[#FAF9F5] border border-[#DADCE0] space-y-2"
              >
                <div className="flex items-start gap-1.5">
                  <span className="w-4 h-4 rounded bg-[#FEF7E0] text-[#C70234] border border-[#FBBC05] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    Q{qIdx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-black leading-snug">
                    {quiz.question}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-6">
                  {quiz.options.map((opt, optIdx) => {
                    let optStyle = 'bg-white border-[#DADCE0] text-gray-800 hover:border-[#FBBC05]';
                    if (hasAnswered) {
                      if (optIdx === quiz.correctIndex) {
                        optStyle = 'bg-[#E6F4EA] border-[#34A853] text-[#188038] font-bold';
                      } else if (optIdx === selectedOpt) {
                        optStyle = 'bg-[#FCE8EF] border-[#C70234] text-[#C70234] font-bold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnswered}
                        onClick={() => setSelectedAnswers(prev => ({ ...prev, [quiz.id]: optIdx }))}
                        className={`p-1.5 rounded text-left text-xs transition-colors flex items-center justify-between cursor-pointer border ${optStyle}`}
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
                  <div className={`p-2 rounded text-xs leading-relaxed ml-6 ${
                    isCorrect ? 'bg-[#E6F4EA] text-[#188038] border border-[#34A853]/40' : 'bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05]'
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

      {/* Prev / Next Unit Buttons */}
      <div className="flex items-center justify-between pt-1 text-xs font-bold">
        {currentUnit.unitNumber > 1 ? (
          <Link
            to={`/${subjectId}/units/${units[currentUnit.unitNumber - 2]?.id}`}
            className="px-2.5 py-1 rounded bg-white border border-[#DADCE0] hover:border-[#C70234] text-black hover:text-[#C70234] transition-colors"
          >
            ← Unit {currentUnit.unitNumber - 1}
          </Link>
        ) : (
          <div />
        )}

        {currentUnit.unitNumber < units.length && (
          <Link
            to={`/${subjectId}/units/${units[currentUnit.unitNumber]?.id}`}
            className="px-2.5 py-1 rounded bg-[#C70234] hover:bg-[#A00028] text-white transition-colors shadow-2xs"
          >
            Unit {currentUnit.unitNumber + 1} →
          </Link>
        )}
      </div>
    </div>
  );
};