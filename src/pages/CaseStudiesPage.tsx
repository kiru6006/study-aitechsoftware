import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Database,
  Cpu,
  Lock,
  Workflow,
  Clock,
  HardDrive,
  FileText,
  Search,
  ExternalLink,
  Award,
  Terminal,
  Printer
} from 'lucide-react';
import { getSubjectUseCases, getSubjectInvestigation, getSubjectMetadata } from '../lib/contentLoader';

export const CaseStudiesPage: React.FC = () => {
  const { subjectId = 'cyber-forensics' } = useParams<{ subjectId?: string }>();
  const subject = getSubjectMetadata(subjectId);
  const useCases = getSubjectUseCases(subjectId);
  const investigation = getSubjectInvestigation(subjectId);

  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'evidence' | 'timeline' | 'findings' | 'report'>('overview');
  const [selectedTimelineFilter, setSelectedTimelineFilter] = useState<string>('all');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>('E-01');

  // Timeline dataset for bank incident
  const timelineEvents = [
    { time: '2026-11-18 08:35:12 UTC', type: 'Email', unit: 'Unit I', event: 'Spear-phishing email delivered spoofing CEO display name (Message-ID: <20261118-inv@spoofed-bank.net>)' },
    { time: '2026-11-18 08:42:15 UTC', type: 'Workstation', unit: 'Unit II', event: 'Employee opens attachment. Prefetch INVOICE_UPDATE.EXE-B2C4E1A0.pf created; initial beacon established' },
    { time: '2026-11-18 09:15:30 UTC', type: 'File System', unit: 'Unit II', event: 'Customer_Accounts.xlsx accessed via SMB and deleted. Batch file wiper cleans directory' },
    { time: '2026-11-18 11:30:00 UTC', type: 'Server', unit: 'Unit III', event: 'Service installed on Payment Switch (HP DL380); unlinked DKOM process PID 1220 (unknown.exe) spawned' },
    { time: '2026-11-18 14:02:10 UTC', type: 'Hardware', unit: 'Unit II', event: 'SanDisk USB Cruzer Blade (Serial: 4C530001090123115142) inserted into employee laptop' },
    { time: '2026-11-18 14:09:42 UTC', type: 'IoT CCTV', unit: 'Unit IV', event: 'Employee badge #402 swipes into secure server room corridor; CCTV video records entry at 14:10:00 UTC' },
    { time: '2026-11-18 14:14:22 UTC', type: 'Mobile', unit: 'Unit IV', event: 'Banking RTGS transfer OTP SMS received on employee Samsung Galaxy S23 (recorded in mmssms.db-wal)' },
    { time: '2026-11-18 14:14:45 UTC', type: 'Mobile', unit: 'Unit IV', event: 'SMS OTP forwarded to external contact via Signal encrypted messenger' },
    { time: '2026-11-18 14:15:00 UTC', type: 'Financial', unit: 'Unit III', event: '₹5,00,00,000 transferred across 14 dummy beneficiary accounts via core switch API' },
    { time: '2026-11-18 16:30:00 UTC', type: 'Ransomware', unit: 'Unit I', event: 'LockBit ransomware notice deployed on branch teller screens; incident responders arrive and isolate hosts' }
  ];

  const filteredTimeline = timelineEvents.filter(t => {
    if (selectedTimelineFilter === 'all') return true;
    return t.unit.toLowerCase().includes(selectedTimelineFilter.toLowerCase());
  });

  return (
    <div className="space-y-2.5 py-1 text-black font-sans">
      {/* Editorial Header Banner */}
      <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#C70234]/30 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] text-[10px] font-mono font-bold">
              Master Investigation Case Study
            </span>
            <span className="text-[10px] font-mono text-gray-500 font-semibold">
              Simulated Educational Evidence • ISO/IEC 27042
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-black text-[#FEF08A] font-mono text-xs font-bold">
            Suspected Loss: ₹5 Crore
          </span>
        </div>

        <h1 className="font-serif text-lg sm:text-2xl font-bold text-black tracking-tight leading-snug">
          ₹5 Crore Digital Bank Cyberattack: Complete Digital Forensic Investigation
        </h1>

        <p className="text-xs text-gray-700 leading-relaxed max-w-4xl">
          ABC Digital Bank experienced five critical anomalies: a spear-phishing attachment execution, confidential customer record deletions, unauthorized external network beacons, ₹5 crore in fraudulent outward fund transfers, and branch ransomware screens. As Lead Digital Forensic Investigator, synthesize evidence across all five units to establish objective facts.
        </p>

        {/* Dashboard Navigation Tabs */}
        <div className="pt-2 border-t border-[#DADCE0] flex flex-wrap gap-1">
          {[
            { id: 'overview', label: '1. Incident Overview' },
            { id: 'workflow', label: '2. 5-Unit Workflow' },
            { id: 'evidence', label: '3. Evidence Register' },
            { id: 'timeline', label: '4. Master Timeline' },
            { id: 'findings', label: '5. Findings vs Uncertainties' },
            { id: 'report', label: '6. Court Forensic Report' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all border cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#C70234] text-white border-[#C70234] shadow-xs'
                  : 'bg-[#FAF9F5] text-gray-700 border-[#DADCE0] hover:border-[#FBBC05] hover:bg-[#FEF7E0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: INCIDENT OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-2.5">
          {/* 5 Suspicious Incidents Grid */}
          <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
            <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5 border-b border-[#DADCE0] pb-1.5">
              <ShieldAlert className="w-4 h-4 text-[#C70234]" />
              The Five Correlated Bank Incidents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
              {[
                { num: 'Incident 1', title: 'Phishing Execution', desc: 'Employee opened spoofed Invoice_Nov2026.pdf.exe; prefetch created.' },
                { num: 'Incident 2', title: 'Records Scrubbed', desc: 'Confidential loan records accessed and deleted; unallocated space contains remnants.' },
                { num: 'Incident 3', title: 'Outbound C2 Sockets', desc: 'Payment switch server established unlinked PID 1220 socket to overseas C2 IP.' },
                { num: 'Incident 4', title: '₹5 Crore Transfer', desc: 'Unauthorized outward wire transfers dispatched across 14 dummy recipient accounts.' },
                { num: 'Incident 5', title: 'Ransomware Deployed', desc: 'Wiper and LockBit ransom demand triggered to cover digital tracks.' }
              ].map((inc, i) => (
                <div key={i} className="p-2.5 rounded bg-[#FAF9F5] border border-[#DADCE0] space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#C70234] block">{inc.num}</span>
                  <div className="font-serif text-xs font-bold text-black">{inc.title}</div>
                  <div className="text-[11px] text-gray-700 leading-snug">{inc.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Objectives & Student Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-1.5 text-xs">
              <span className="text-[10px] font-mono font-bold uppercase text-[#92400E] block">Lead Investigator Role</span>
              <h3 className="font-serif text-sm font-bold text-black">Core Responsibilities</h3>
              <ul className="text-gray-700 space-y-1 list-disc list-inside leading-snug">
                <li>Acquire write-blocked disk images and volatile RAM following RFC 3227.</li>
                <li>Verify cryptographic SHA-256 hashes and maintain Chain of Custody.</li>
                <li>Reverse-engineer deleted file records, slack space, and Windows artifacts.</li>
                <li>Analyze unlinked memory rootkits using Volatility and correlate PCAP NetFlow.</li>
                <li>Extract smartphone SQLite databases and smart CCTV video frames.</li>
                <li>Author a court-admissible report under Indian Evidence Act Section 65B.</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-3 border border-[#FBBC05] bg-[#FEF7E0]/40 shadow-2xs space-y-1.5 text-xs">
              <span className="text-[10px] font-mono font-bold uppercase text-[#C70234] block">Forensic Integrity Rule</span>
              <h3 className="font-serif text-sm font-bold text-black">Distinguishing Facts from Assumptions</h3>
              <p className="text-gray-800 leading-relaxed">
                Investigators must establish what the physical evidence scientifically supports rather than assume the suspected attack sequence is correct.
                A USB connection proves physical insertion, NOT data theft. A matching hash proves content integrity, NOT authorship. A suspicious process name warrants inquiry, NOT premature classification as malware.
              </p>
              <Link
                to={`/${subjectId}/investigation`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#C70234] hover:underline pt-1"
              >
                <span>Launch Interactive Investigation Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FIVE-UNIT WORKFLOW */}
      {activeTab === 'workflow' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-3">
          <div className="border-b border-[#DADCE0] pb-2 flex items-center justify-between">
            <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-[#C70234]" />
              Five-Unit Curricular Integration with the Bank Incident
            </h2>
            <span className="text-[10px] font-mono text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05]">
              Full Academic Alignment
            </span>
          </div>

          <div className="space-y-2">
            {[
              {
                unit: 'Unit I: Preserve',
                syllabus: 'Foundations, Legal Compliance & Evidence Acquisition',
                role: 'First responder evidence triage across employee laptop, bank servers, smartphone, and network taps. Generation of cryptographic SHA-256 hashes, write-blocked bitstream imaging (.E01 / .raw), and physical chain of custody logs under Section 65B compliance.'
              },
              {
                unit: 'Unit II: Recover',
                syllabus: 'File Systems and Artifact Collection',
                role: 'Examination of employee laptop NTFS Master File Table ($MFT), carving deleted customer Excel documents from unallocated clusters, and extraction of Windows execution artifacts (Prefetch, LNK, UserAssist, and Shellbags) proving malware launch.'
              },
              {
                unit: 'Unit III: Reconstruct',
                syllabus: 'Advanced Volatile Analysis and Network Artifacts',
                role: 'Volatile memory triage of payment switch server with Volatility 3 (windows.pslist, windows.netscan, windows.malfind) uncovering unlinked process (PID 1220 unknown.exe) beaconing to 198.51.100.44:443, and building a 72-hour multi-source Super Timeline.'
              },
              {
                unit: 'Unit IV: Examine Devices',
                syllabus: 'Specialized Device Forensics',
                role: 'Extraction of privileged employee Samsung smartphone using logical backup and ADB file system acquisition; reverse-engineering WhatsApp and Signal SQLite databases; and parsing smart CCTV embedded memory for physical server room access.'
              },
              {
                unit: 'Unit V: Validate & Report',
                syllabus: 'Case Management, Reporting and Advanced Methodologies',
                role: 'Aggregating evidence into a master Evidence Register, conducting NIST CFTT validation checks, performing expert witness defense cross-examination simulation, and compiling an executive and court-ready Digital Forensic Investigation Report.'
              }
            ].map((u, i) => (
              <div key={i} className="p-2.5 rounded bg-[#FAF9F5] border border-[#DADCE0] text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#C70234] text-white">
                    {u.unit}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 font-semibold">{u.syllabus}</span>
                </div>
                <p className="text-gray-700 leading-snug pt-0.5">{u.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EVIDENCE REGISTER */}
      {activeTab === 'evidence' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-2.5">
          <div className="border-b border-[#DADCE0] pb-2 flex items-center justify-between">
            <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#C70234]" />
              Master Evidence Register (8 Simulated Sources)
            </h2>
            <span className="text-[10px] font-mono text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05]">
              Section 65B Audit Trail
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF9F5] border-b border-[#DADCE0] text-[10px] font-mono font-bold text-gray-600 uppercase">
                  <th className="p-2">Item ID</th>
                  <th className="p-2">Evidence Name & Source</th>
                  <th className="p-2">Type / Acquisition Mode</th>
                  <th className="p-2">Cryptographic Hash (SHA-256)</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-sans text-xs">
                {investigation?.evidenceSources.map(item => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedEvidenceId(item.id)}
                    className={`cursor-pointer transition-colors ${
                      selectedEvidenceId === item.id ? 'bg-[#FEF7E0]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="p-2 font-mono font-bold text-[#C70234]">{item.id}</td>
                    <td className="p-2">
                      <div className="font-bold text-black">{item.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{item.source}</div>
                    </td>
                    <td className="p-2 text-[11px] text-gray-700">{item.evidenceType}</td>
                    <td className="p-2 font-mono text-[9px] text-gray-700 truncate max-w-[140px]" title={item.hash}>
                      {item.hash ? `${item.hash.slice(0, 16)}...` : 'N/A'}
                    </td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.2 rounded bg-black text-white text-[9px] font-mono font-bold uppercase">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: MASTER TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-2.5">
          <div className="border-b border-[#DADCE0] pb-2 flex items-center justify-between">
            <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C70234]" />
              Master Investigation Super Timeline (Normalized UTC)
            </h2>
            <div className="flex items-center gap-1 text-[10px] font-mono">
              <span className="text-gray-500">Filter:</span>
              {['all', 'Unit I', 'Unit II', 'Unit III', 'Unit IV'].map(flt => (
                <button
                  key={flt}
                  onClick={() => setSelectedTimelineFilter(flt)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    selectedTimelineFilter === flt
                      ? 'bg-[#C70234] text-white font-bold'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {flt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            {filteredTimeline.map((item, idx) => (
              <div key={idx} className="p-2 rounded bg-[#FAF9F5] border border-[#DADCE0] flex items-start gap-2 text-xs">
                <span className="font-mono text-[10px] font-bold text-gray-500 whitespace-nowrap pt-0.5">
                  {item.time.replace('2026-11-18 ', '')}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] text-[9px] font-mono font-bold shrink-0">
                  {item.unit}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-black text-white text-[9px] font-mono font-bold shrink-0">
                  {item.type}
                </span>
                <span className="text-gray-800 leading-snug flex-1">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FINDINGS AND UNCERTAINTIES */}
      {activeTab === 'findings' && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#DADCE0] shadow-2xs space-y-3">
          <div className="border-b border-[#DADCE0] pb-2 flex items-center justify-between">
            <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#C70234]" />
              Epistemic Framework: Observations, Inferences & Limitations
            </h2>
            <span className="text-[10px] font-mono text-[#C70234] font-bold bg-[#FCE8EF] px-1.5 py-0.2 rounded border border-[#C70234]/30">
              Daubert Evidentiary Boundary
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
            {/* Confirmed Observations */}
            <div className="p-3 rounded-lg border border-[#188038]/40 bg-[#E6F4EA]/20 space-y-1.5">
              <span className="font-bold text-[#188038] uppercase font-mono text-[10px] block">
                1. Confirmed Observations (Empirical Facts)
              </span>
              <ul className="text-gray-800 space-y-1 list-disc list-inside leading-snug">
                <li>INVOICE_UPDATE.EXE-B2C4E1A0.pf prefetch artifact exists with execution count = 3.</li>
                <li>MFT record #4812 in laptop image marked inactive (deleted Customer_Accounts.xlsx).</li>
                <li>Process PID 1220 active in RAM with PAGE_EXECUTE_READWRITE memory page at 0x7ffe0000.</li>
                <li>SMS 2FA verification OTP recorded in mmssms.db-wal at 14:14:22 UTC.</li>
                <li>USBSTOR registry records SanDisk Cruzer Blade insertion at 14:02:10 UTC.</li>
              </ul>
            </div>

            {/* Supported Inferences */}
            <div className="p-3 rounded-lg border border-[#FBBC05] bg-[#FEF7E0]/30 space-y-1.5">
              <span className="font-bold text-[#92400E] uppercase font-mono text-[10px] block">
                2. Supported Inferences (Corroborated)
              </span>
              <ul className="text-gray-800 space-y-1 list-disc list-inside leading-snug">
                <li>The malicious stager executed at 08:42:15 UTC following phishing email delivery.</li>
                <li>Adversary unlinked PID 1220 from ActiveProcessLinks using DKOM to evade detection.</li>
                <li>The server room was physically accessed by employee badge holder at 14:10:00 UTC.</li>
                <li>Transactions were triggered remotely via C2 socket established from PID 1220.</li>
              </ul>
            </div>

            {/* Unverified Hypotheses */}
            <div className="p-3 rounded-lg border border-[#C70234]/40 bg-[#FCE8EF]/20 space-y-1.5">
              <span className="font-bold text-[#C70234] uppercase font-mono text-[10px] block">
                3. Unverified Hypotheses (Excluded from Findings)
              </span>
              <ul className="text-gray-800 space-y-1 list-disc list-inside leading-snug">
                <li>The employee willingly coordinated with the criminal ransomware syndicate.</li>
                <li>Customer accounts were exfiltrated onto the seized SanDisk thumbdrive.</li>
                <li>The phishing email was drafted by an internal bank officer.</li>
              </ul>
            </div>

            {/* Evidence Limitations */}
            <div className="p-3 rounded-lg border border-black/40 bg-[#FAF9F5] space-y-1.5">
              <span className="font-bold text-black uppercase font-mono text-[10px] block">
                4. Technical Limitations & Caveats
              </span>
              <ul className="text-gray-800 space-y-1 list-disc list-inside leading-snug">
                <li>USB presence does not prove file transfer without corroborating shellbag data.</li>
                <li>Hashes confirm bitstream integrity, not who sat at the workstation keyboard.</li>
                <li>Biometric unlock indicates fingerprint presented, but cannot detect duress or coercion.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: FINAL FORENSIC REPORT */}
      {activeTab === 'report' && (
        <div className="bg-white rounded-lg p-3 sm:p-5 border border-[#C70234]/40 shadow-xs space-y-3 font-serif text-black">
          <div className="border-b-2 border-black pb-2 flex items-center justify-between font-sans">
            <div>
              <div className="text-[10px] font-mono font-bold text-gray-500 uppercase">Official Court Exhibit</div>
              <h2 className="text-base sm:text-lg font-bold text-black">DIGITAL FORENSIC INVESTIGATION REPORT</h2>
              <div className="text-[11px] font-mono text-gray-600">Case Ref: CF-2026-ABC-001 • Section 65B Certified</div>
            </div>
            <button
              onClick={() => window.print()}
              className="px-2.5 py-1 bg-black text-[#FEF08A] rounded text-xs font-mono font-bold hover:bg-gray-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            <div>
              <h3 className="font-bold text-sm text-[#C70234] border-b border-gray-200 pb-0.5">1. Executive Summary</h3>
              <p className="mt-1 text-gray-800">
                On November 18, 2026, ABC Digital Bank suffered a coordinated cyber incident involving spear-phishing execution, unauthorized access to customer records, lateral movement to payment switch infrastructure, and unauthorized fund disbursements totaling ₹5,00,00,000. Forensic analysis confirms initial execution at 08:42:15 UTC, persistence via an in-memory unlinked rootkit (PID 1220), and transaction execution via C2 IP 198.51.100.44:443.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#C70234] border-b border-gray-200 pb-0.5">2. Evidence Custody & Verification</h3>
              <p className="mt-1 text-gray-800">
                Eight primary evidence sources (Items E-01 through E-08) were acquired following RFC 3227 Order of Volatility standards using hardware write-blockers and validated live capture utilities. All forensic bitstream copies matched baseline SHA-256 hashes identically. Chain of Custody forms are annexed as Exhibit P-1.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#C70234] border-b border-gray-200 pb-0.5">3. Forensic Opinions & Limitations</h3>
              <p className="mt-1 text-gray-800">
                Within a reasonable degree of scientific certainty, the digital evidence proves that the payment switch server was compromised via malicious code execution initiated from workstation 10.14.2.45. While employee credentials and devices were utilized, forensic evidence alone cannot determine whether the employee acted with criminal intent, was socially engineered, or acted under external duress.
              </p>
            </div>

            <div className="pt-2 border-t border-black font-sans flex items-center justify-between text-[11px] text-gray-600">
              <div>
                <span className="font-bold text-black block">Lead Digital Forensic Examiner</span>
                <span>SubjectLab High-Assurance Forensic Services</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-black block">Verification Seal</span>
                <span className="font-mono text-[#188038] font-bold">SHA-256 VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};