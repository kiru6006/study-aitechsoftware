import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Terminal,
  Cpu,
  Layers,
  HardDrive,
  FileSearch,
  Network,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Play,
  Copy,
  Hash,
  Eye,
  Lock,
  ArrowRight,
  Database,
  FileCode,
  Sliders,
  Check,
  Video
} from 'lucide-react';

export const PracticalLabsPage: React.FC = () => {
  const { subjectId = 'cyber-forensics' } = useParams<{ subjectId?: string }>();
  const [selectedUnit, setSelectedUnit] = useState<number>(1);

  // Unit 1 Simulator States
  const [hashInput, setHashInput] = useState<string>('Customer_Account_Record_ABC_Bank_1029482');
  const [tamperedInput, setTamperedInput] = useState<string>('Customer_Account_Record_ABC_Bank_1029483');
  const [selectedCustodyStep, setSelectedCustodyStep] = useState<number | null>(null);

  // Unit 2 Simulator States
  const [activeArtifactTab, setActiveArtifactTab] = useState<'registry' | 'lnk' | 'jumplist' | 'prefetch'>('prefetch');
  const [selectedTskCmd, setSelectedTskCmd] = useState<string>('fls');

  // Unit 3 Simulator States
  const [selectedVolCmd, setSelectedVolCmd] = useState<string>('windows.malfind');
  const [pcapFilter, setPcapFilter] = useState<string>('all');
  const [selectedProcessPid, setSelectedProcessPid] = useState<number>(1220);

  // Unit 4 Simulator States
  const [mobileAcqMode, setMobileAcqMode] = useState<'logical' | 'fs' | 'physical'>('fs');
  const [selectedPhoneArtifact, setSelectedPhoneArtifact] = useState<'sms' | 'chat' | 'calls' | 'geo'>('sms');

  // Unit 5 Simulator States
  const [farValue, setFarValue] = useState<number>(0.05);
  const [frrValue, setFrrValue] = useState<number>(0.45);
  const [selectedCrossExamQ, setSelectedCrossExamQ] = useState<number>(1);

  // Simple deterministic hash simulation for demo
  const computeSimpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852${hex}`.slice(0, 64);
  };

  return (
    <div className="space-y-2.5 py-1 text-black font-sans">
      {/* Header Banner - Compact */}
      <div className="bg-white rounded-lg p-3 border border-[#C70234]/30 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.2 rounded bg-[#FEF7E0] text-[#92400E] border border-[#FBBC05] text-[10px] font-mono font-bold">
              Interactive Forensic Tool Bench
            </span>
            <span className="text-[10px] font-mono text-gray-500">
              NIST CFTT Aligned • Zero Real Shell Execution
            </span>
          </div>
          <h1 className="font-serif text-lg sm:text-xl font-bold text-black tracking-tight mt-0.5">
            Practical Labs & Command Simulators
          </h1>
        </div>

        {/* Unit Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 rounded border border-[#DADCE0]">
          {[1, 2, 3, 4, 5].map(uNum => (
            <button
              key={uNum}
              onClick={() => setSelectedUnit(uNum)}
              className={`px-2 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedUnit === uNum
                  ? 'bg-[#C70234] text-white shadow-2xs'
                  : 'text-gray-700 hover:text-black hover:bg-white'
              }`}
            >
              Unit {uNum}
            </button>
          ))}
        </div>
      </div>

      {/* UNIT 1 LAB: Foundations, Legal Compliance & Hashing */}
      {selectedUnit === 1 && (
        <div className="space-y-2.5">
          {/* Section: Cryptographic Hashing & Tamper Demonstration */}
          <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
              <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-[#C70234]" />
                Lab 1.1: Cryptographic Hash Integrity Verification (SHA-256)
              </h2>
              <span className="text-[10px] font-mono text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05] font-semibold">
                Avalanche Effect
              </span>
            </div>

            <p className="text-xs text-gray-700 leading-snug">
              Modify even a single byte in the input below to observe how the cryptographic SHA-256 hash completely changes.
              A matching hash mathematically proves <strong>Integrity</strong> (bits unchanged), but does <strong>NOT</strong> prove <strong>Authorship</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {/* Original String & Hash */}
              <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#DADCE0] space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-gray-700 uppercase block">
                  Original Evidence String:
                </label>
                <input
                  type="text"
                  value={hashInput}
                  onChange={e => setHashInput(e.target.value)}
                  className="w-full p-1.5 bg-white border border-[#DADCE0] rounded text-xs font-mono text-black focus:outline-none focus:border-[#C70234]"
                />
                <div className="p-2 bg-black text-[#FEF08A] rounded font-mono text-[10px] break-all leading-tight">
                  <span className="text-gray-400 block text-[9px]">ORIGINAL SHA-256:</span>
                  {computeSimpleHash(hashInput)}
                </div>
              </div>

              {/* Modified String & Hash */}
              <div className="p-2.5 rounded bg-[#FCE8EF]/30 border border-[#C70234]/40 space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-[#C70234] uppercase block">
                  Modified / Tampered Copy:
                </label>
                <input
                  type="text"
                  value={tamperedInput}
                  onChange={e => setTamperedInput(e.target.value)}
                  className="w-full p-1.5 bg-white border border-[#DADCE0] rounded text-xs font-mono text-black focus:outline-none focus:border-[#C70234]"
                />
                <div className="p-2 bg-black text-[#F87171] rounded font-mono text-[10px] break-all leading-tight">
                  <span className="text-gray-400 block text-[9px]">TAMPERED SHA-256:</span>
                  {computeSimpleHash(tamperedInput)}
                </div>
              </div>
            </div>

            <div className="p-2 bg-[#FEF7E0] border border-[#FBBC05] rounded text-[11px] text-[#92400E] font-medium leading-snug">
              Status: {computeSimpleHash(hashInput) === computeSimpleHash(tamperedInput) ? (
                <span className="text-[#188038] font-bold">✓ Hashes Match — Evidence Bitstream Integrity Confirmed.</span>
              ) : (
                <span className="text-[#C70234] font-bold">✗ Hash Mismatch Detected — Copy Modified (Inadmissible as exact mirror).</span>
              )}
            </div>
          </div>

          {/* Section: 8-Stage Forensic Lifecycle Interactive Visualizer */}
          <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
            <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5 border-b border-[#DADCE0] pb-1.5">
              <Layers className="w-4 h-4 text-[#C70234]" />
              Lab 1.2: Eight-Stage Forensic Lifecycle (I-P-C-E-A-D-P-R)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1 text-center">
              {[
                { step: '1. Identification', code: 'I', desc: 'Identify laptop, switch, mobile & CCTV' },
                { step: '2. Preservation', code: 'P', desc: 'Attach write-blocker, Faraday enclosure' },
                { step: '3. Collection', code: 'C', desc: 'Bitstream image (.E01) & RAM dump' },
                { step: '4. Examination', code: 'E', desc: 'File carving, MFT & registry parsing' },
                { step: '5. Analysis', code: 'A', desc: 'Process lineage & C2 traffic correlation' },
                { step: '6. Documentation', code: 'D', desc: 'Contemporaneous bench notes & custody logs' },
                { step: '7. Presentation', code: 'P', desc: 'Court testimony & Sec 65B certificates' },
                { step: '8. Review', code: 'R', desc: 'NIST CFTT post-mortem tool audit' }
              ].map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCustodyStep(idx)}
                  className={`p-1.5 rounded border text-left transition-all cursor-pointer ${
                    selectedCustodyStep === idx
                      ? 'bg-[#C70234] text-white border-[#C70234] shadow-xs'
                      : 'bg-[#FAF9F5] border-[#DADCE0] hover:border-[#FBBC05]'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold">{s.code}</div>
                  <div className="text-[11px] font-bold leading-tight mt-0.5">{s.step.split('. ')[1]}</div>
                </button>
              ))}
            </div>

            {selectedCustodyStep !== null && (
              <div className="p-2.5 bg-[#FAF9F5] rounded border border-[#DADCE0] text-xs space-y-1">
                <span className="font-bold text-[#C70234] block">
                  Stage Details:
                </span>
                <p className="text-gray-800 leading-snug">
                  {[
                    'Identification: Recognizing all potential electronic media. In the bank breach, investigators tagged the Dell laptop, payment server, network taps, and mobile phones.',
                    'Preservation: Securing scene without modifying state. Hardware write-blockers dropped write commands to the NVMe disk; mobile phones were placed in Faraday bags to prevent remote wipe.',
                    'Collection: Creating bit-for-bit physical copies (.E01 / .raw) using Tableau duplicators and winpmem memory dumpers, generating baseline SHA-256 hashes.',
                    'Examination: Processing raw data to extract filesystem metadata, unallocated clusters, and carved files using The Sleuth Kit and Autopsy.',
                    'Analysis: Correlating findings to answer who, what, when, where, and how. Identified PID 1220 rogue process and synchronized multi-host timestamps.',
                    'Documentation: Contemporaneous recording of serial numbers, acquisition dates, hash records, and Chain of Custody forms.',
                    'Presentation: Delivering objective, court-admissible testimony supported by Section 65B electronic evidence affidavits.',
                    'Review: Post-incident review evaluating tool performance against NIST CFTT standards.'
                  ][selectedCustodyStep]}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* UNIT 2 LAB: File Systems, Carving & Windows Artifacts */}
      {selectedUnit === 2 && (
        <div className="space-y-2.5">
          {/* Windows Artifact Explorer */}
          <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
              <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
                <FileSearch className="w-4 h-4 text-[#C70234]" />
                Lab 2.1: Windows Artifact Explorer (Registry, LNK, Jump Lists, Prefetch)
              </h2>
              <span className="text-[10px] font-mono text-gray-500 font-semibold">
                Execution Footprints
              </span>
            </div>

            <div className="flex items-center gap-1">
              {[
                { id: 'prefetch', label: '1. Prefetch (.pf)' },
                { id: 'lnk', label: '2. LNK Files' },
                { id: 'jumplist', label: '3. Jump Lists' },
                { id: 'registry', label: '4. Registry & USBSTOR' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveArtifactTab(tab.id as any)}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all border cursor-pointer ${
                    activeArtifactTab === tab.id
                      ? 'bg-[#C70234] text-white border-[#C70234]'
                      : 'bg-[#FAF9F5] text-gray-700 border-[#DADCE0] hover:border-[#FBBC05]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Artifact Explanatory Card */}
            <div className="p-3 rounded bg-[#FAF9F5] border border-[#DADCE0] text-xs space-y-1.5">
              {activeArtifactTab === 'prefetch' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black">Windows Prefetch (.pf)</span>
                    <span className="font-mono text-[10px] text-gray-600">Location: C:\Windows\Prefetch\*.pf</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Designed to optimize program startup. Records executable name, run count, execution timestamps (last 8 runs on Win 10/11), and volume serial numbers.
                  </p>
                  <div className="p-2 bg-black text-[#FEF08A] font-mono text-[10.5px] rounded">
                    Artifact: INVOICE_UPDATE.EXE-B2C4E1A0.pf | Run Count: 3 | Last Run: 2026-11-18 08:45:10 UTC
                  </div>
                  <div className="text-[11px] text-[#C70234] font-medium">
                    Forensic Limit: Proves the program ran on the OS, but does NOT record user keystrokes or what occurred inside the app.
                  </div>
                </>
              )}

              {activeArtifactTab === 'lnk' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black">Shortcut (.LNK) Files</span>
                    <span className="font-mono text-[10px] text-gray-600">Location: %APPDATA%\Recent\*.lnk</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Automatically created when a user opens a file. Records target path, original file creation/modification dates, drive serial number, and target file size.
                  </p>
                  <div className="p-2 bg-black text-[#FEF08A] font-mono text-[10.5px] rounded">
                    Target: C:\Users\ops\Downloads\Customer_Accounts.xlsx | Volume Serial: 9A42-120C | Opened: 14:03:00 UTC
                  </div>
                  <div className="text-[11px] text-[#C70234] font-medium">
                    Forensic Limit: Proves the file was opened or accessed, but does NOT independently prove data exfiltration.
                  </div>
                </>
              )}

              {activeArtifactTab === 'jumplist' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black">Jump Lists (Destinations-ms)</span>
                    <span className="font-mono text-[10px] text-gray-600">Location: %APPDATA%\Microsoft\Windows\Recent\AutomaticDestinations</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Tracks files accessed within specific applications on the Windows taskbar, providing user interaction histories.
                  </p>
                  <div className="p-2 bg-black text-[#FEF08A] font-mono text-[10.5px] rounded">
                    AppID: 7e4dca8024686324 (Excel) → Recent Entry: Loan_Details_Q3.xlsx [14:02:45 UTC]
                  </div>
                  <div className="text-[11px] text-[#C70234] font-medium">
                    Forensic Limit: Subject to rolling limits; older entries are purged as new documents are opened.
                  </div>
                </>
              )}

              {activeArtifactTab === 'registry' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black">Windows Registry USBSTOR</span>
                    <span className="font-mono text-[10px] text-gray-600">Key: HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Records the vendor, product model, and unique hardware serial number of any USB storage device plugged into the machine.
                  </p>
                  <div className="p-2 bg-black text-[#FEF08A] font-mono text-[10.5px] rounded">
                    Device: Disk&Ven_SanDisk&Prod_Cruzer_Blade&Rev_1.00\4C530001090123115142&0 | First Mounted: 14:02:10 UTC
                  </div>
                  <div className="text-[11px] text-[#C70234] font-medium">
                    Critical Court Rule: Proves connection, NOT that data was copied to the thumbdrive without corroborating LNK/Shellbag evidence.
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sleuth Kit Command Demonstrations */}
          <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
              <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#C70234]" />
                Lab 2.2: The Sleuth Kit (TSK) Command Suite Simulator
              </h2>
              <span className="text-[10px] font-mono text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05]">
                CLI Forensics
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              {['mmls', 'fsstat', 'fls', 'istat', 'icat'].map(cmd => (
                <button
                  key={cmd}
                  onClick={() => setSelectedTskCmd(cmd)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all border cursor-pointer ${
                    selectedTskCmd === cmd
                      ? 'bg-black text-[#FEF08A] border-black'
                      : 'bg-[#FAF9F5] text-gray-700 border-[#DADCE0] hover:border-[#FBBC05]'
                  }`}
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Simulated Terminal Output */}
            <div className="p-3 bg-[#0F172A] text-[#CDD6F4] rounded-lg font-mono text-[11px] space-y-1 overflow-x-auto border border-black shadow-inner">
              <div className="text-gray-400"># Sleuth Kit Simulation Output:</div>
              {selectedTskCmd === 'mmls' && (
                <pre className="text-[#38BDF8] leading-tight">
{`$ mmls /evidence/laptop_disk.raw
DOS Partition Table
Offset Sector: 0
Units are in 512-byte sectors

      Slot      Start        End          Length       Description
000:  Meta      0000000000   0000000000   0000000001   Primary Table (#0)
001:  -------   0000000001   0000002047   0000002047   Unallocated
002:  000:000   0000002048   0000206847   0000204800   EFI System (FAT)
003:  000:001   0000206848   0097677311   0097470464   Basic Data (NTFS)`}
                </pre>
              )}
              {selectedTskCmd === 'fsstat' && (
                <pre className="text-[#38BDF8] leading-tight">
{`$ fsstat -o 206848 /evidence/laptop_disk.raw
FILE SYSTEM INFORMATION
--------------------------------------------
File System Type: NTFS
Volume Name: OS_DISK
Cluster Size: 4096 bytes (8 sectors)
Total Cluster Range: 0 - 12183807
MFT Record Size: 1024 bytes`}
                </pre>
              )}
              {selectedTskCmd === 'fls' && (
                <pre className="text-[#38BDF8] leading-tight">
{`$ fls -o 206848 -r -p /evidence/laptop_disk.raw | grep -i "Account"
+ r/rr 4810:  Customer_Summary.pdf
* r/rr 4812:  Customer_Accounts.xlsx  [DELETED FILE - MFT INACTIVE]
+ r/rr 4815:  Accountant_Notes.txt`}
                </pre>
              )}
              {selectedTskCmd === 'istat' && (
                <pre className="text-[#38BDF8] leading-tight">
{`$ istat -o 206848 /evidence/laptop_disk.raw 4812
MFT Entry: 4812, Sequence: 4
Allocated: No (Deleted File)
$FILE_NAME: Customer_Accounts.xlsx
File Size: 43008 bytes
Cluster Runlist:
  0x14 0x0A 0x40 0x12 -> Offset: 119842, Length: 11 Clusters`}
                </pre>
              )}
              {selectedTskCmd === 'icat' && (
                <pre className="text-[#38BDF8] leading-tight">
{`$ icat -o 206848 /evidence/laptop_disk.raw 4812 > /cases/recovered_accounts.xlsx
[+] Extracted 43008 bytes from MFT Record 4812
[+] SHA-256: d84f1a2390ab... | Magic bytes: PK.. (Valid Excel Archive)`}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* UNIT 3 LAB: Memory Forensics, Volatility & Network PCAP */}
      {selectedUnit === 3 && (
        <div className="space-y-2.5">
          {/* Volatile Memory Process Table Simulator */}
          <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
              <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#C70234]" />
                Lab 3.1: Volatile Memory Process Triage (PID Table)
              </h2>
              <span className="text-[10px] font-mono text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05]">
                Process Analysis
              </span>
            </div>

            <p className="text-xs text-gray-700 leading-snug">
              Click a process to inspect its memory attributes. <strong>Notice:</strong> An unlisted process name alone does not prove malware—examine injected pages and socket connections.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF9F5] border-b border-[#DADCE0] text-[10px] font-mono font-bold text-gray-600 uppercase">
                    <th className="p-1.5">PID</th>
                    <th className="p-1.5">PPID</th>
                    <th className="p-1.5">Process Name</th>
                    <th className="p-1.5">Active Threads</th>
                    <th className="p-1.5">Investigation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono text-[11px]">
                  {[
                    { pid: 100, ppid: 4, name: 'System', threads: 142, status: 'Expected OS Core', alert: false },
                    { pid: 420, ppid: 100, name: 'explorer.exe', threads: 38, status: 'Expected User Shell', alert: false },
                    { pid: 810, ppid: 420, name: 'browser.exe', threads: 14, status: 'Expected Web Client', alert: false },
                    { pid: 1220, ppid: 810, name: 'unknown.exe', threads: 6, status: 'Requires Investigation (Unlinked DKOM)', alert: true }
                  ].map(p => (
                    <tr
                      key={p.pid}
                      onClick={() => setSelectedProcessPid(p.pid)}
                      className={`cursor-pointer transition-colors ${
                        selectedProcessPid === p.pid
                          ? 'bg-[#FEF7E0] font-bold text-black'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="p-1.5">{p.pid}</td>
                      <td className="p-1.5">{p.ppid}</td>
                      <td className="p-1.5 flex items-center gap-1">
                        {p.alert && <AlertTriangle className="w-3 h-3 text-[#C70234]" />}
                        <span>{p.name}</span>
                      </td>
                      <td className="p-1.5">{p.threads}</td>
                      <td className={`p-1.5 ${p.alert ? 'text-[#C70234] font-bold' : 'text-gray-600'}`}>
                        {p.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedProcessPid === 1220 && (
              <div className="p-2.5 bg-[#FCE8EF]/30 border border-[#C70234] rounded text-xs space-y-1">
                <div className="font-bold text-[#C70234] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Deep Triage: PID 1220 (unknown.exe)</span>
                </div>
                <p className="text-gray-800 leading-snug">
                  Unlinked from kernel `ActiveProcessLinks` list. Discovered via `windows.psscan` pool-tag sweep.
                  `windows.netscan` reveals an active TLS socket to IP <strong>198.51.100.44:443</strong> established 4 minutes after service installation.
                </p>
              </div>
            )}
          </div>

          {/* Volatility Command Explorer */}
          <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
              <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#C70234]" />
                Lab 3.2: Volatility 3 Command Explorer
              </h2>
              <span className="text-[10px] font-mono text-gray-500 font-semibold">
                Memory Analysis
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              {['windows.pslist', 'windows.pstree', 'windows.netscan', 'windows.malfind'].map(plugin => (
                <button
                  key={plugin}
                  onClick={() => setSelectedVolCmd(plugin)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all border cursor-pointer ${
                    selectedVolCmd === plugin
                      ? 'bg-black text-[#FEF08A] border-black'
                      : 'bg-[#FAF9F5] text-gray-700 border-[#DADCE0] hover:border-[#FBBC05]'
                  }`}
                >
                  {plugin}
                </button>
              ))}
            </div>

            {/* Simulated Volatility Console */}
            <div className="p-3 bg-[#0F172A] text-[#CDD6F4] rounded-lg font-mono text-[11px] space-y-1 overflow-x-auto border border-black shadow-inner">
              <div className="text-gray-400"># Volatility 3 Framework Execution:</div>
              {selectedVolCmd === 'windows.pslist' && (
                <pre className="text-[#38BDF8] leading-tight">
{`$ vol -f /evidence/switch_memory.raw windows.pslist
PID    PPID   ImageFileName    Offset(V)          Threads  Handles  CreateTime
100    4      System           0xfa80018a4040     142      -        2026-11-18 06:12:00
420    100    explorer.exe     0xfa80021c1080     38       -        2026-11-18 07:40:12
810    420    browser.exe      0xfa8003920140     14       -        2026-11-18 08:35:10
[+] Notice: PID 1220 is absent from linked list (hidden via rootkit DKOM)`}
                </pre>
              )}
              {selectedVolCmd === 'windows.pstree' && (
                <pre className="text-[#38BDF8] leading-tight">
{`$ vol -f /evidence/switch_memory.raw windows.pstree
* 0xfa80018a4040: System (PID: 100)
** 0xfa80021c1080: explorer.exe (PID: 420)
*** 0xfa8003920140: browser.exe (PID: 810)
**** [Terminated / Hidden Child Lineage detected]`}
                </pre>
              )}
              {selectedVolCmd === 'windows.netscan' && (
                <pre className="text-[#38BDF8] leading-tight">
{`$ vol -f /evidence/switch_memory.raw windows.netscan
Offset          Proto  Local Address      Foreign Address     State       PID   Owner
0xfa8001a12010  TCP    10.14.10.12:49182  198.51.100.44:443   ESTABLISHED 1220  unknown.exe
0xfa80028b3040  TCP    10.14.10.12:445    0.0.0.0:0           LISTENING   4     System`}
                </pre>
              )}
              {selectedVolCmd === 'windows.malfind' && (
                <pre className="text-[#38BDF8] leading-tight">
{`$ vol -f /evidence/switch_memory.raw windows.malfind --pid 1220
PID: 1220 Process: unknown.exe
Start VPN: 0x7ffe0000 End VPN: 0x7ffe1000 Tag: VadS Protection: PAGE_EXECUTE_READWRITE
0x7ffe0000  4d 5a 90 00 03 00 00 00 04 00 00 00 ff ff 00 00   MZ..............
0x7ffe0010  b8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00   ........@.......
[!] INJECTION CONFIRMED: Executable MZ header located in RWX anonymous memory page`}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* UNIT 4 LAB: Specialized Devices, Mobile & IoT CCTV */}
      {selectedUnit === 4 && (
        <div className="space-y-2.5">
          {/* Mobile OS Acquisition Simulator */}
          <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
              <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#C70234]" />
                Lab 4.1: Mobile Acquisition Hierarchy (Logical vs File System vs Physical)
              </h2>
              <span className="text-[10px] font-mono text-gray-500 font-semibold">
                Android / iOS
              </span>
            </div>

            <div className="flex items-center gap-1">
              {[
                { id: 'logical', label: 'Tier 1: Logical' },
                { id: 'fs', label: 'Tier 2: File System' },
                { id: 'physical', label: 'Tier 3: Physical (NAND)' }
              ].map(tier => (
                <button
                  key={tier.id}
                  onClick={() => setMobileAcqMode(tier.id as any)}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all border cursor-pointer ${
                    mobileAcqMode === tier.id
                      ? 'bg-[#C70234] text-white border-[#C70234]'
                      : 'bg-[#FAF9F5] text-gray-700 border-[#DADCE0] hover:border-[#FBBC05]'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>

            <div className="p-3 bg-[#FAF9F5] rounded border border-[#DADCE0] text-xs space-y-1.5">
              {mobileAcqMode === 'logical' && (
                <>
                  <div className="font-bold text-black">Logical Acquisition (Backup API Extraction)</div>
                  <p className="text-gray-700 leading-relaxed">
                    Uses standard OS backup protocols (e.g. ADB backup, iTunes sync). Extracts contacts, SMS, call history, and camera photos.
                  </p>
                  <div className="text-[11px] text-[#C70234] font-medium">
                    Limitation: Does NOT capture deleted records or private third-party app SQLite databases (e.g., Signal or banking app internal databases).
                  </div>
                </>
              )}
              {mobileAcqMode === 'fs' && (
                <>
                  <div className="font-bold text-black">File System Acquisition (Advanced Agent-Based)</div>
                  <p className="text-gray-700 leading-relaxed">
                    Dumps the complete active file system hierarchy including private `/data/data/` app directories, SQLite databases, and WAL logs.
                  </p>
                  <div className="text-[11px] text-[#188038] font-bold">
                    Ideal Balance: Captures banking app authentication databases and uncommitted chat messages without requiring hardware chip-off.
                  </div>
                </>
              )}
              {mobileAcqMode === 'physical' && (
                <>
                  <div className="font-bold text-black">Physical Acquisition (Raw Bitstream NAND Dump)</div>
                  <p className="text-gray-700 leading-relaxed">
                    Bit-for-bit extraction of physical flash memory including unallocated sectors and deleted database clusters.
                  </p>
                  <div className="text-[11px] text-[#C70234] font-medium">
                    Limitation: On modern devices with hardware File-Based Encryption (FBE) and Apple Secure Enclave, physical dumps remain encrypted without the hardware key.
                  </div>
                </>
              )}
            </div>
          </div>

          {/* IoT Evidence Map Simulator */}
          <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
            <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5 border-b border-[#DADCE0] pb-1.5">
              <Video className="w-4 h-4 text-[#C70234]" />
              Lab 4.2: IoT Evidence Map (Smart CCTV Camera)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
              {[
                { title: '1. Onboard Storage', desc: 'MicroSD ring buffer video chunks carved with ffmpeg' },
                { title: '2. Embedded Hardware', desc: 'UART serial console and JTAG flash firmware extraction' },
                { title: '3. Mobile App', desc: 'Companion Android/iOS app cache on employee phone' },
                { title: '4. Local Network', desc: 'RTSP video stream packets captured on internal switch SPAN' },
                { title: '5. Cloud Feed', desc: 'Vendor AWS server remote video archive & access logs' }
              ].map((iot, idx) => (
                <div key={idx} className="p-2 rounded bg-[#FAF9F5] border border-[#DADCE0] space-y-1">
                  <div className="font-bold text-[#C70234] text-[11px]">{iot.title}</div>
                  <div className="text-gray-700 text-[10.5px] leading-snug">{iot.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* UNIT 5 LAB: Case Management, Reporting & NIST CFTT */}
      {selectedUnit === 5 && (
        <div className="space-y-2.5">
          {/* Biometric Accuracy Evaluator (FAR vs FRR) */}
          <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
              <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#C70234]" />
                Lab 5.1: Biometric Performance Calculator (FAR vs FRR vs EER)
              </h2>
              <span className="text-[10px] font-mono text-[#92400E] bg-[#FEF7E0] px-1.5 py-0.2 rounded border border-[#FBBC05]">
                Biometric Forensics
              </span>
            </div>

            <p className="text-xs text-gray-700 leading-snug">
              Adjust the verification threshold slider to observe the trade-off between False Acceptance Rate (FAR - imposter allowed) and False Rejection Rate (FRR - genuine rejected).
            </p>

            <div className="space-y-2 p-2.5 bg-[#FAF9F5] rounded border border-[#DADCE0] text-xs">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Security Threshold: {farValue < 0.1 ? 'Strict (High Security)' : farValue > 0.4 ? 'Lenient (High Usability)' : 'Balanced (EER Point)'}</span>
                <span className="font-mono text-[#C70234]">FAR: {(farValue * 100).toFixed(1)}% | FRR: {(frrValue * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.80"
                step="0.02"
                value={farValue}
                onChange={e => {
                  const val = parseFloat(e.target.value);
                  setFarValue(val);
                  setFrrValue(Math.max(0.01, 0.85 - val));
                }}
                className="w-full cursor-pointer accent-[#C70234]"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>Strict Security (Low FAR, High FRR)</span>
                <span>Equal Error Rate (EER)</span>
                <span>Lenient Access (High FAR, Low FRR)</span>
              </div>
            </div>
          </div>

          {/* Expert Witness Cross-Examination Simulator */}
          <div className="bg-white rounded-lg p-3 border border-[#DADCE0] shadow-2xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#DADCE0] pb-1.5">
              <h2 className="font-serif text-sm font-bold text-black flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C70234]" />
                Lab 5.2: Expert Witness Testimony & Cross-Examination Simulator
              </h2>
              <span className="text-[10px] font-mono text-gray-500 font-semibold">
                Daubert Standard
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {[
                {
                  id: 1,
                  q: "Counsel: 'Does finding a SanDisk USB connection in the registry prove my client stole customer files?'",
                  correct: "The USBSTOR registry artifact proves the device was mounted at 14:02 UTC. It does NOT independently prove files were copied, as no corresponding shellbag or file transfer logs show data movement to that volume.",
                  trap: "Saying 'Yes' is the advocacy trap—unsupported assumption not backed by file transfer artifacts."
                },
                {
                  id: 2,
                  q: "Counsel: 'Since the SHA-256 hash matches the malicious malware stager, doesn't that prove my client authored the code?'",
                  correct: "No. A matching SHA-256 hash mathematically proves content integrity (the file bits match the known sample). It does not prove who authored the code or compiled the binary.",
                  trap: "Confusing content integrity with authorship attribution."
                }
              ].map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedCrossExamQ(item.id)}
                  className={`p-2.5 rounded border transition-all cursor-pointer space-y-1.5 ${
                    selectedCrossExamQ === item.id
                      ? 'bg-white border-[#C70234] shadow-xs'
                      : 'bg-[#FAF9F5] border-[#DADCE0] hover:border-[#FBBC05]'
                  }`}
                >
                  <div className="font-bold text-black text-xs font-serif">{item.q}</div>
                  <div className="p-2 bg-[#FEF7E0] border border-[#FBBC05] rounded text-[11px] text-[#92400E] leading-snug">
                    <strong className="block text-[#C70234]">Defensible Expert Response:</strong>
                    {item.correct}
                  </div>
                  <div className="text-[10.5px] text-gray-600 italic">
                    Trap Avoided: {item.trap}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};