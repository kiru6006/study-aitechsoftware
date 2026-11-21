import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Network,
  Sparkles,
  Layers,
  ShieldCheck,
  ChevronRight,
  HardDrive,
  Cpu,
  Smartphone,
  FileText,
  AlertTriangle,
  ZoomIn
} from 'lucide-react';
import { getSubjectMetadata, getSubjectUnits } from '../lib/contentLoader';

export const MindmapsPage: React.FC = () => {
  const { subjectId = 'cyber-forensics' } = useParams<{ subjectId?: string }>();
  const subject = getSubjectMetadata(subjectId);
  const units = getSubjectUnits(subjectId);

  const [activeTab, setActiveTab] = useState<string>('overview');

  const tabs = [
    { id: 'overview', label: '1. 5-Unit Course Map' },
    { id: 'bank-workflow', label: '2. ₹5Cr Bank Attack Flow' },
    { id: 'cross-unit', label: '3. Cross-Unit Concepts' },
    { id: 'u1-lifecycle', label: '4. Unit I: Lifecycle' },
    { id: 'u2-artifacts', label: '5. Unit II: Files & Artifacts' },
    { id: 'u3-memory', label: '6. Unit III: Memory & Network' },
    { id: 'u4-mobile', label: '7. Unit IV: Mobile & IoT' },
    { id: 'u5-reporting', label: '8. Unit V: EDRM & Report' }
  ];

  return (
    <div className="space-y-2.5 py-1 text-black font-sans">
      {/* Header Banner - Compact */}
      <div className="bg-white rounded-lg p-3 border border-[#C70234]/30 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] text-[10px] font-mono font-bold">
              Interactive Architectural Maps
            </span>
            <span className="text-[10px] font-mono text-gray-500">
              Responsive SVG & CSS • Zero External Image Files
            </span>
          </div>
          <h1 className="font-serif text-lg sm:text-xl font-bold text-black tracking-tight mt-0.5">
            {subject?.name || 'Cyber Forensics'} • Visual Mindmaps & Concept Graphs
          </h1>
        </div>

        <Link
          to={`/${subjectId}/investigation`}
          className="px-2.5 py-1 rounded bg-[#C70234] text-white text-xs font-bold hover:bg-[#A00028] transition-colors"
        >
          Investigation Mode →
        </Link>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2.5 py-1 rounded text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
              activeTab === tab.id
                ? 'bg-black text-[#FEF08A] border-black shadow-xs'
                : 'bg-white text-gray-700 border-[#DADCE0] hover:border-[#FBBC05] hover:bg-[#FAF9F5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DIAGRAM 1: Five-Unit Course Overview Map */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-3">
          <div className="border-b border-[#DADCE0] pb-2 flex items-center justify-between">
            <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
              <Network className="w-4 h-4 text-[#C70234]" />
              Five-Unit Curricular Knowledge Architecture
            </h2>
            <span className="text-[10px] font-mono text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05]">
              60 Credits Total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {[
              { u: 'Unit I', code: 'I-P-C-E-A-D-P-R', title: 'Foundations & Legal Compliance', focus: 'Preservation, Chain of Custody, Write-blockers, SHA-256 Hashing, Dead vs Live' },
              { u: 'Unit II', code: 'F-D-C-W-T', title: 'File Systems & Artifacts', focus: 'NTFS $MFT, Slack space, Magic byte carving, Prefetch, LNK, Registry, TSK' },
              { u: 'Unit III', code: 'L-M-T-A-N', title: 'Memory & Network Forensics', focus: 'Volatility 3, Process unlinking, NetFlow, PCAP, UTC Super Timelines' },
              { u: 'Unit IV', code: 'M-A-D-I-L', title: 'Specialized Device Forensics', focus: 'Android vs iOS, SQLite WAL logs, Geolocation, Smart CCTV IoT firmware' },
              { u: 'Unit V', code: 'C-R-E-V', title: 'Reporting & Methodologies', focus: 'EDRM E-Discovery, Court report writing, Daubert testimony, NIST CFTT' }
            ].map((col, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-[#DADCE0] bg-[#FAF9F5] flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-[#C70234] text-white rounded">
                      {col.u}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-[#92400E] bg-[#FEF7E0] px-1 rounded border border-[#FBBC05]">
                      {col.code}
                    </span>
                  </div>
                  <h3 className="font-serif text-xs font-bold text-black mt-1 leading-snug">
                    {col.title}
                  </h3>
                  <p className="text-[11px] text-gray-700 mt-1 leading-snug">
                    {col.focus}
                  </p>
                </div>
                <Link
                  to={`/${subjectId}/units/unit-${idx + 1}`}
                  className="text-[10px] font-mono font-bold text-[#C70234] hover:underline flex items-center gap-0.5 pt-1 border-t border-[#DADCE0]"
                >
                  <span>Open Unit {idx + 1}</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIAGRAM 2: Master Bank Investigation Workflow Diagram */}
      {activeTab === 'bank-workflow' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-3">
          <div className="border-b border-[#DADCE0] pb-2 flex items-center justify-between">
            <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C70234]" />
              Master ₹5 Crore Digital Bank Investigation Chronology & Attack Path
            </h2>
            <span className="text-[10px] font-mono text-[#C70234] bg-[#FCE8EF] px-1.5 py-0.2 rounded border border-[#C70234]/30 font-bold">
              All 5 Units Unified
            </span>
          </div>

          <div className="space-y-2">
            {[
              {
                stage: '08:42 UTC • Phishing Execution',
                unit: 'Unit I (Preserve) & Unit II (Artifacts)',
                detail: 'Employee opens Invoice_Nov2026.pdf.exe from spoofed email. Prefetch INVOICE_UPDATE.EXE-B2C4E1A0.pf created; disk image acquired with Tableau write-blocker.'
              },
              {
                stage: '09:15 UTC • File Access & Deletion',
                unit: 'Unit II (File Systems & Carving)',
                detail: 'Attacker accesses Customer_Accounts.xlsx and triggers batch wiper. Forensics parses MFT record #4812 and carves 18 Excel files from unallocated clusters.'
              },
              {
                stage: '11:30 UTC • Memory Injection & Persistence',
                unit: 'Unit III (Volatile Memory & Volatility)',
                detail: 'Rogue service PID 1220 (unknown.exe) spawned on payment switch. Volatility windows.psscan uncovers unlinked DKOM process and malfind identifies RWX injected shellcode.'
              },
              {
                stage: '14:14 UTC • Outbound Fraud Transfers',
                unit: 'Unit IV (Mobile & IoT Devices)',
                detail: 'SMS 2FA OTP intercepted on employee Samsung phone (mmssms.db-wal); smart CCTV footage places employee in server vault at 14:10 UTC.'
              },
              {
                stage: '16:30 UTC • Validation & Final Report',
                unit: 'Unit V (Reporting & Expert Witness)',
                detail: 'Forensic team verifies tools against NIST CFTT assertions, compiles Evidence Register (E-01 to E-08), and drafts Section 65B certified court report.'
              }
            ].map((step, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-[#DADCE0] bg-[#FAF9F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C70234] text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-black">{step.stage}</span>
                    <span className="text-[10px] font-mono text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05]">
                      {step.unit}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 pl-7 leading-snug">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIAGRAM 3: Cross-Unit Concept Relationship Diagram */}
      {activeTab === 'cross-unit' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-3">
          <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5 border-b border-[#DADCE0] pb-2">
            <Layers className="w-4 h-4 text-[#C70234]" />
            Cross-Unit Concept Interdependence Matrix
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            <div className="p-3 rounded-lg border border-[#DADCE0] bg-[#FAF9F5] space-y-1.5">
              <span className="font-bold text-[#C70234] font-serif block">
                Evidence Integrity Axis
              </span>
              <p className="text-gray-700 leading-snug">
                Connects <strong>Unit I</strong> (Hardware write-blocking and SHA-256 baseline hashing) with <strong>Unit V</strong> (Section 65B certification and NIST CFTT tool error rate validation).
              </p>
            </div>
            <div className="p-3 rounded-lg border border-[#DADCE0] bg-[#FAF9F5] space-y-1.5">
              <span className="font-bold text-[#C70234] font-serif block">
                Execution Reconstruction Axis
              </span>
              <p className="text-gray-700 leading-snug">
                Connects <strong>Unit II</strong> (Windows Prefetch and LNK timestamps) with <strong>Unit III</strong> (Volatility volatile process lineage and C2 NetFlow correlation).
              </p>
            </div>
            <div className="p-3 rounded-lg border border-[#DADCE0] bg-[#FAF9F5] space-y-1.5">
              <span className="font-bold text-[#C70234] font-serif block">
                Physical-Digital Attribution Axis
              </span>
              <p className="text-gray-700 leading-snug">
                Connects <strong>Unit IV</strong> (Mobile SQLite 2FA logs and CCTV firmware) with <strong>Unit V</strong> (Expert witness cross-examination defense on user intent versus access).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM 4: Unit I Forensic Lifecycle Map */}
      {activeTab === 'u1-lifecycle' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-3">
          <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5 border-b border-[#DADCE0] pb-2">
            <ShieldCheck className="w-4 h-4 text-[#C70234]" />
            Unit I: Eight-Stage Forensic Lifecycle & RFC 3227 Volatility Hierarchy
          </h2>
          <div className="p-3 bg-[#FAF9F5] rounded border border-[#DADCE0] font-mono text-xs space-y-1 text-gray-800 leading-snug">
            <div>1. Identification   → Detect physical, virtual, and cloud evidence sources</div>
            <div>2. Preservation     → Enforce RFC 3227 Order of Volatility: Registers → RAM → Disk</div>
            <div>3. Collection       → Acquire bitstream images (.E01 / .raw) with hardware write-blockers</div>
            <div>4. Examination      → Extract file systems and carved data on forensic clones</div>
            <div>5. Analysis         → Correlate timestamps and test competing hypotheses</div>
            <div>6. Documentation    → Maintain unbroken Chain of Custody and bench notes</div>
            <div>7. Presentation     → Provide court testimony backed by Section 65B certificates</div>
            <div>8. Review           → Post-trial methodology review and NIST validation</div>
          </div>
        </div>
      )}

      {/* DIAGRAM 5: Unit II File System & Artifacts Map */}
      {activeTab === 'u2-artifacts' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-3">
          <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5 border-b border-[#DADCE0] pb-2">
            <HardDrive className="w-4 h-4 text-[#C70234]" />
            Unit II: NTFS Storage Architecture, Slack Space & Windows Artifacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-[#FAF9F5] rounded border border-[#DADCE0] space-y-1">
              <span className="font-bold text-[#C70234]">NTFS Metadata Attributes:</span>
              <ul className="list-disc list-inside space-y-0.5 text-gray-700">
                <li>0x10 $STANDARD_INFORMATION: User MACB timestamps (Timestompable)</li>
                <li>0x30 $FILE_NAME: Kernel namespace & parent directory pointer</li>
                <li>0x80 $DATA: Resident byte stream or non-resident cluster runlists</li>
              </ul>
            </div>
            <div className="p-2.5 bg-[#FAF9F5] rounded border border-[#DADCE0] space-y-1">
              <span className="font-bold text-[#C70234]">Execution Artifact Hierarchy:</span>
              <ul className="list-disc list-inside space-y-0.5 text-gray-700">
                <li>Prefetch (.pf): Proves program execution count & last 8 timestamps</li>
                <li>LNK Files: Proves document opened & target volume serial</li>
                <li>Registry USBSTOR: Proves USB drive vendor, model & serial connection</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM 6: Unit III Memory & Network Analysis Map */}
      {activeTab === 'u3-memory' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-3">
          <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5 border-b border-[#DADCE0] pb-2">
            <Cpu className="w-4 h-4 text-[#C70234]" />
            Unit III: Volatile Memory Forensics & Network Telemetry Map
          </h2>
          <div className="p-3 bg-[#FAF9F5] rounded border border-[#DADCE0] text-xs space-y-2">
            <div className="font-bold text-black">Volatility Framework Analysis Sequence:</div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-1.5 text-center font-mono text-[11px]">
              <div className="p-2 bg-white rounded border border-[#DADCE0]">windows.pslist<br/><span className="text-gray-500 text-[10px]">Active Process Links</span></div>
              <div className="p-2 bg-white rounded border border-[#DADCE0]">windows.psscan<br/><span className="text-gray-500 text-[10px]">Unlinked DKOM Pool Tags</span></div>
              <div className="p-2 bg-white rounded border border-[#DADCE0]">windows.netscan<br/><span className="text-gray-500 text-[10px]">Active Network Sockets</span></div>
              <div className="p-2 bg-white rounded border border-[#DADCE0]">windows.malfind<br/><span className="text-gray-500 text-[10px]">PAGE_EXECUTE_RWX Injections</span></div>
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM 7: Unit IV Mobile & IoT Map */}
      {activeTab === 'u4-mobile' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-3">
          <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5 border-b border-[#DADCE0] pb-2">
            <Smartphone className="w-4 h-4 text-[#C70234]" />
            Unit IV: Mobile OS Security Sandboxes & IoT Extraction Tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-[#FAF9F5] rounded border border-[#DADCE0] space-y-1">
              <span className="font-bold text-[#C70234]">Android vs iOS Sandbox:</span>
              <p className="text-gray-700 leading-snug">
                Android enforces unique Linux UIDs with SELinux; iOS uses class-based Data Protection keys managed by the Secure Enclave Processor (SEP).
              </p>
            </div>
            <div className="p-2.5 bg-[#FAF9F5] rounded border border-[#DADCE0] space-y-1">
              <span className="font-bold text-[#C70234]">IoT CCTV Evidence Vectors:</span>
              <p className="text-gray-700 leading-snug">
                UART hardware consoles, SPI flash memory dumps, RTSP packet streams, companion mobile apps, and cloud archive logs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM 8: Unit V EDRM & Report Map */}
      {activeTab === 'u5-reporting' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-3">
          <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5 border-b border-[#DADCE0] pb-2">
            <FileText className="w-4 h-4 text-[#C70234]" />
            Unit V: EDRM Electronic Discovery & Court-Admissible Report Architecture
          </h2>
          <div className="p-3 bg-[#FAF9F5] rounded border border-[#DADCE0] font-mono text-xs text-gray-800 leading-snug">
            EDRM Pipeline: Governance → Identification → Preservation → Collection → Processing → Review → Analysis → Production → Presentation
          </div>
        </div>
      )}
    </div>
  );
};