import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  ShieldAlert,
  Cpu,
  BrainCircuit,
  Terminal,
  Activity,
  Play,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Layers,
  Globe,
  RefreshCw,
  Zap,
  Radio,
  FileCode,
} from 'lucide-react';
import { EsperantoHangulNode, WarlockKaliProbe } from '../types';

export const NoworodekDarkstarMatrix: React.FC = () => {
  // Noworodek Engine State
  const [learningDaemonActive, setLearningDaemonActive] = useState<boolean>(true);
  const [qualityGateScore, setQualityGateScore] = useState<number>(98.4);
  const [codeAtomsCount, setCodeAtomsCount] = useState<number>(1420);
  const [assimilating, setAssimilating] = useState<boolean>(false);

  // Darkstar & Ghost Gate State
  const [ghostGateEnforced, setGhostGateEnforced] = useState<boolean>(true);
  const [blockedAttempts, setBlockedAttempts] = useState<number>(42);

  // Esperanto Bridge & Hangul Embeddings Nodes
  const [esperantoNodes, setEsperantoNodes] = useState<EsperantoHangulNode[]>([
    {
      esperantoConcept: 'EXECUTE_AST_CODE_ATOM',
      hangulSyllable: '코드-아톰-01',
      codebookVectorIndex: 'CBMS_VEC_8801',
      subByteEncoding: '0x4B_2A_9F',
      wpcOffset: '0x00A1F40',
    },
    {
      esperantoConcept: 'INSPECT_GHOST_GATE_EGRESS',
      hangulSyllable: '고스트-게이트-02',
      codebookVectorIndex: 'CBMS_VEC_8802',
      subByteEncoding: '0x1C_8E_33',
      wpcOffset: '0x00A1F84',
    },
    {
      esperantoConcept: 'ASSIMILATE_WEIGHTSET_DELTA',
      hangulSyllable: '웨이트-델타-03',
      codebookVectorIndex: 'CBMS_VEC_8803',
      subByteEncoding: '0x99_D4_0A',
      wpcOffset: '0x00A1FC8',
    },
    {
      esperantoConcept: 'WARLOCK_KALI_SECURITY_PROBE',
      hangulSyllable: '칼리-보안-04',
      codebookVectorIndex: 'CBMS_VEC_8804',
      subByteEncoding: '0xE2_5F_B1',
      wpcOffset: '0x00A200C',
    },
  ]);

  // Warlock-Kali Security Probes
  const [probes, setProbes] = useState<WarlockKaliProbe[]>([
    {
      id: 'probe-1',
      name: 'SSRF Ghost Gate Egress Bypass Probe',
      toolCategory: 'Exploit',
      targetModule: 'Darkstar Gateway',
      status: 'mitigated',
      mitigationContract: 'Darkstar Ghost Gate Rule #04 (eBPF packet drop)',
    },
    {
      id: 'probe-2',
      name: 'CBMS Vector Inverted Index Poisoning',
      toolCategory: 'Fuzzing',
      targetModule: 'Noworodek CBMS Language',
      status: 'passed',
      mitigationContract: 'Quality Gate Observer (Bramka Jakości 98.4%)',
    },
    {
      id: 'probe-3',
      name: 'WPC Sub-Byte Tensor Corruption Probe',
      toolCategory: 'RedTeam',
      targetModule: 'WPC v4 SIMD Decompressor',
      status: 'mitigated',
      mitigationContract: 'Noworodek WeightSet Rollback Daemon',
    },
  ]);

  // Handler: Run Learning Daemon Assimilation Iteration
  const handleTriggerLearningDaemon = () => {
    setAssimilating(true);
    setTimeout(() => {
      setCodeAtomsCount((prev) => prev + 12);
      setQualityGateScore(99.1);
      setAssimilating(false);
    }, 1500);
  };

  // Handler: Run Warlock-Kali Security Audit
  const handleRunSecurityAudit = () => {
    setBlockedAttempts((prev) => prev + 3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BrainCircuit className="w-64 h-64 text-indigo-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Deep Core Ecosystem</span>
              <span className="bg-indigo-500/20 text-indigo-300 text-[11px] px-2.5 py-0.5 rounded-full font-mono border border-indigo-500/30 font-semibold">
                PRs #28 &bull; #30 &bull; #31 &bull; Darkstar Gateway
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span>NOWORODEK &bull; DARKSTAR &bull; WARLOCK-KALI Matrix</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Integrating CBMS as native Model Language (Noworodek), Protected-Host Gateway (Darkstar), Warlock-Kali Security Red-Teaming, and the Esperanto Execution Bridge to Hangul Syllabic Sub-Byte Embeddings.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleTriggerLearningDaemon}
              disabled={assimilating}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {assimilating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Assimilating Code-Atoms...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Run Noworodek Learning Daemon</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Dashboard (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1: Noworodek Engine */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Noworodek Engine</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
              PR #31 Active
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Quality Gate Score:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{qualityGateScore}%</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Assimilated Code-Atoms:</span>
              <span className="font-mono font-bold text-indigo-300 text-sm">{codeAtomsCount}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Daemon Status:</span>
              <span className="font-mono font-bold text-cyan-400 flex items-center space-x-1">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>Demon Nauki Active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Pillar 2: Darkstar Gateway */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Darkstar Gateway</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              PR #8 Protected
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Ghost Gate Egress:</span>
              <button
                onClick={() => setGhostGateEnforced(!ghostGateEnforced)}
                className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer transition ${
                  ghostGateEnforced
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {ghostGateEnforced ? 'Enforced (eBPF)' : 'Bypassed'}
              </button>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Blocked Egress Probes:</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{blockedAttempts}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Protected Host:</span>
              <span className="font-mono font-bold text-emerald-300 text-xs">AIONS Core Host</span>
            </div>
          </div>
        </div>

        {/* Pillar 3: Warlock-Kali Security Lab */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-rose-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Warlock-Kali Lab</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
              Red-Team Active
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Active Probes:</span>
              <span className="font-mono font-bold text-rose-300 text-sm">3 Penetration Audits</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Vulnerabilities:</span>
              <span className="font-mono font-bold text-emerald-400 text-xs flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>0 Unmitigated</span>
              </span>
            </div>
            <button
              onClick={handleRunSecurityAudit}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Simulate Kali Penetration Probe
            </button>
          </div>
        </div>

        {/* Pillar 4: Esperanto Bridge & Hangul Embeddings */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Esperanto Bridge</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
              PR #3 Hangul
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Universal Grammar:</span>
              <span className="font-mono font-bold text-cyan-300 text-xs">Esperanto Exec Graph</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Syllabic Tokens:</span>
              <span className="font-mono font-bold text-indigo-300 text-xs">Hangul Sub-Byte (한글)</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 font-semibold">WPC Compression:</span>
              <span className="font-mono font-bold text-emerald-400 text-xs">4.25-bit Quantization</span>
            </div>
          </div>
        </div>
      </div>

      {/* Esperanto Bridge & Hangul Embeddings Interactive Mapper */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono font-semibold text-cyan-400">aions-server-wiedzy &bull; PR #3 Discovery</span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Esperanto Bridge Execution Graph to Hangul Syllabic Sub-Byte Mapping
            </h3>
          </div>
          <span className="text-[11px] font-mono bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-lg border border-cyan-500/30 font-bold">
            Universal Model Language
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {esperantoNodes.map((node, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Concept #{idx + 1}</span>
                <span className="text-indigo-400 font-bold text-[11px]">{node.codebookVectorIndex}</span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Esperanto Execution AST</span>
                <span className="text-white font-bold text-xs truncate block">{node.esperantoConcept}</span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Hangul Syllabic Token (한글)</span>
                <span className="text-cyan-300 font-bold text-sm block">{node.hangulSyllable}</span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className="text-slate-500">Sub-Byte Code:</span>
                <span className="text-emerald-400 font-bold">{node.subByteEncoding}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warlock-Kali Security Red-Teaming Probes Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-rose-400" />
            <span>Warlock-Kali Security Audit &amp; Penetration Probes</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            super-system / feat/warlock-kali-lab-foundation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <th className="p-3">Probe Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Target Subsystem</th>
                <th className="p-3">Status</th>
                <th className="p-3">Active Mitigation Contract</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {probes.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-white">{p.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {p.toolCategory}
                    </span>
                  </td>
                  <td className="p-3 text-indigo-300">{p.targetModule}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center space-x-1 w-fit">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{p.status}</span>
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 font-sans text-xs">{p.mitigationContract}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
