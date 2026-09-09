import React, { useState } from 'react';
import { ARCHITECTURAL_IMPROVEMENTS } from '../data/aionsArchitectureData';
import { ArchitecturalImprovement } from '../types';
import {
  Zap,
  CheckCircle2,
  XCircle,
  FileCode,
  ArrowRight,
  TrendingUp,
  Sliders,
  Copy,
  Check,
  Code2,
  Download,
} from 'lucide-react';

interface ArchitecturalImprovementsSuiteProps {
  ipcStatus: boolean;
  setIpcStatus: (status: boolean) => void;
}

export const ArchitecturalImprovementsSuite: React.FC<ArchitecturalImprovementsSuiteProps> = ({
  ipcStatus,
  setIpcStatus,
}) => {
  const [improvements, setImprovements] = useState<ArchitecturalImprovement[]>(ARCHITECTURAL_IMPROVEMENTS);
  const [selectedImp, setSelectedImp] = useState<ArchitecturalImprovement>(ARCHITECTURAL_IMPROVEMENTS[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleImprovement = (id: string) => {
    setImprovements((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextApplied = !item.appliedStatus;
          if (id === 'shared-memory-ipc') {
            setIpcStatus(nextApplied);
          }
          return { ...item, appliedStatus: nextApplied };
        }
        return item;
      })
    );
  };

  const handleCopyPatch = () => {
    navigator.clipboard.writeText(selectedImp.codeDiffSnippet.after);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Cloned &amp; Improved Workspace</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[11px] px-2 py-0.5 rounded font-mono border border-emerald-500/30">
                Architectural Optimization Suite
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1 flex items-center space-x-2">
              <Zap className="w-6 h-6 text-indigo-400" />
              <span>Architectural Improvements Implementation</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Applying modern architectural patterns across the cloned repository: Shared-Memory Zero-Copy IPC, Tiered Hot-KV Compression, Ephemeral Ghost Gate Egress Firewall, and Deterministic CI Repair Loops.
            </p>
          </div>
        </div>
      </div>

      {/* Improvements List (5 cols) & Code Diff + Metrics Panel (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Improvement Cards Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Select &amp; Toggle Improvements</span>
          </h3>

          <div className="space-y-3">
            {improvements.map((imp) => {
              const isSelected = selectedImp.id === imp.id;
              return (
                <div
                  key={imp.id}
                  onClick={() => setSelectedImp(imp)}
                  className={`p-4 rounded-2xl border transition cursor-pointer relative ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-semibold text-indigo-400 block">{imp.moduleTarget}</span>
                      <h4 className="text-sm font-bold text-white leading-snug mt-0.5">{imp.title}</h4>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleImprovement(imp.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition cursor-pointer flex items-center space-x-1 ${
                        imp.appliedStatus
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {imp.appliedStatus ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-slate-500" />
                          <span>Disabled</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{imp.problemStatement}</p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Latency:</span>
                    <span className="font-mono text-emerald-400 font-bold">{imp.impactMetrics.latencyReduction}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Diff Viewer & Metrics Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Selected Improvement Header & Impact Stats */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-semibold text-indigo-400">{selectedImp.moduleTarget}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedImp.title}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyPatch}
                  className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Patch' : 'Copy Improved Code'}</span>
                </button>
              </div>
            </div>

            {/* Impact Metrics Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Latency Impact</span>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                  {selectedImp.impactMetrics.latencyReduction}
                </div>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Memory Savings</span>
                <div className="text-sm font-bold font-mono text-indigo-400 mt-0.5">
                  {selectedImp.impactMetrics.memorySavings}
                </div>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Throughput Gain</span>
                <div className="text-sm font-bold font-mono text-cyan-400 mt-0.5">
                  {selectedImp.impactMetrics.throughputGain}
                </div>
              </div>
            </div>

            {/* Problem vs Solution Text */}
            <div className="space-y-2 text-xs">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 font-bold block text-[11px] mb-1 text-rose-400">Problem Statement:</span>
                <p className="text-slate-300 leading-relaxed">{selectedImp.problemStatement}</p>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 font-bold block text-[11px] mb-1 text-emerald-400">Proposed &amp; Implemented Solution:</span>
                <p className="text-slate-300 leading-relaxed">{selectedImp.proposedSolution}</p>
              </div>
            </div>

            {/* Code Diff Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  <span>Code Diff ({selectedImp.codeDiffSnippet.filename})</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {selectedImp.codeDiffSnippet.language}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                {/* BEFORE */}
                <div className="bg-slate-950/90 p-3 rounded-xl border border-rose-900/40 overflow-x-auto">
                  <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1.5">BEFORE (Original Pattern)</span>
                  <pre className="text-slate-400 text-[11px] whitespace-pre-wrap">{selectedImp.codeDiffSnippet.before}</pre>
                </div>

                {/* AFTER */}
                <div className="bg-slate-950/90 p-3 rounded-xl border border-emerald-900/40 overflow-x-auto">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1.5">AFTER (Improved Pattern)</span>
                  <pre className="text-emerald-200/90 text-[11px] whitespace-pre-wrap">{selectedImp.codeDiffSnippet.after}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
