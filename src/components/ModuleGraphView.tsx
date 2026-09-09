import React, { useState } from 'react';
import { AIONS_MODULES } from '../data/aionsArchitectureData';
import { ArchitectureModule } from '../types';
import {
  Cpu,
  Bot,
  Database,
  Monitor,
  Network,
  Shield,
  Activity,
  Box,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Zap,
} from 'lucide-react';

interface ModuleGraphViewProps {
  onSelectModule: (moduleId: string) => void;
}

export const ModuleGraphView: React.FC<ModuleGraphViewProps> = ({ onSelectModule }) => {
  const [selectedModule, setSelectedModule] = useState<ArchitectureModule>(AIONS_MODULES[0]);
  const [activeFlow, setActiveFlow] = useState<string | null>('inference-agent-loop');

  const getModuleIcon = (id: string) => {
    switch (id) {
      case 'wpc-runtime': return Cpu;
      case 'agents-ci': return Bot;
      case 'memory-kv': return Database;
      case 'aions-studio': return Monitor;
      case 'system-graph': return Network;
      case 'aions-kernel': return Box;
      case 'ghost-gate': return Shield;
      case 'os-integration': return Activity;
      default: return Box;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Runtime': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Agent': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'Memory': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Developer': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Kernel': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Security': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'Integration': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Architecture Blueprint</span>
              <span className="bg-slate-800 text-slate-300 text-[11px] px-2 py-0.5 rounded font-mono">docs/AIONS-INTEGRATION-MAP.md</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">The 8 Architectural Modules of AIONS OS</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Historical repositories (<code className="text-indigo-300">wpc-engine</code>, <code className="text-indigo-300">aions-mcp-server</code>, <code className="text-indigo-300">super-system</code>, <code className="text-indigo-300">polip-agi</code>, <code className="text-indigo-300">aions-chroma-watchdog</code>) are mapped into a unified modular operating system architecture.
            </p>
          </div>

          {/* Interactive Flow Filter */}
          <div className="flex flex-col space-y-1.5 self-stretch md:self-auto">
            <span className="text-xs text-slate-400 font-medium">Highlight Interactive Data Flow:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFlow('inference-agent-loop')}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer ${
                  activeFlow === 'inference-agent-loop'
                    ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                Agent Execution Loop
              </button>
              <button
                onClick={() => setActiveFlow('cbms-memory-flow')}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer ${
                  activeFlow === 'cbms-memory-flow'
                    ? 'bg-purple-600/30 text-purple-300 border-purple-500'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                CBMS Memory & KV Flow
              </button>
              <button
                onClick={() => setActiveFlow('ghost-gate-flow')}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer ${
                  activeFlow === 'ghost-gate-flow'
                    ? 'bg-rose-600/30 text-rose-300 border-rose-500'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                Ghost Gate Security
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 8 Module Interactive Graph (Left) & Inspector Drawer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module Nodes Matrix (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
                <Network className="w-4 h-4 text-indigo-400" />
                <span>Interactive System Topology Graph</span>
              </h3>
              <span className="text-xs text-slate-400">Click a module to inspect specs & design patterns</span>
            </div>

            {/* Visual 8-Module Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 relative z-10">
              {AIONS_MODULES.map((mod) => {
                const Icon = getModuleIcon(mod.id);
                const isSelected = selectedModule.id === mod.id;

                let isHighlightedByFlow = false;
                if (activeFlow === 'inference-agent-loop' && ['wpc-runtime', 'agents-ci', 'aions-kernel'].includes(mod.id)) {
                  isHighlightedByFlow = true;
                } else if (activeFlow === 'cbms-memory-flow' && ['memory-kv', 'aions-mcp-server', 'wpc-runtime'].includes(mod.id)) {
                  isHighlightedByFlow = true;
                } else if (activeFlow === 'ghost-gate-flow' && ['ghost-gate', 'agents-ci', 'os-integration'].includes(mod.id)) {
                  isHighlightedByFlow = true;
                }

                return (
                  <div
                    key={mod.id}
                    onClick={() => setSelectedModule(mod)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/20'
                        : isHighlightedByFlow
                        ? 'bg-slate-800/90 border-cyan-500/60 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`p-2 rounded-lg border ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-400'
                              : 'bg-slate-800 text-slate-300 border-slate-700 group-hover:text-indigo-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400">MODULE #{mod.number}</span>
                          <h4 className="text-sm font-bold text-white leading-snug">{mod.name}</h4>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${getCategoryBadgeClass(
                          mod.category
                        )}`}
                      >
                        {mod.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {mod.description}
                    </p>

                    {/* Source repo tag */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Source:</span>
                      <span className="font-mono text-indigo-300 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                        {mod.historicalRepoSource}
                      </span>
                    </div>

                    {isHighlightedByFlow && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Module Detail Inspector (5 columns) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-20 space-y-5">
            {/* Header */}
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-indigo-400">
                  MODULE #{selectedModule.number} DETAILS
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${getCategoryBadgeClass(
                    selectedModule.category
                  )}`}
                >
                  {selectedModule.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">{selectedModule.name}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedModule.description}</p>
            </div>

            {/* Mapped Source Repo */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Historical Repo Mapping</span>
                <div className="font-mono text-sm font-bold text-indigo-300 mt-0.5">{selectedModule.historicalRepoSource}</div>
              </div>
              <button
                onClick={() => onSelectModule(selectedModule.id)}
                className="flex items-center space-x-1.5 text-xs bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer"
              >
                <span>Inspect Source</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Key Design Patterns */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Key Architectural Design Patterns</span>
              </h4>
              <div className="space-y-1.5">
                {selectedModule.keyDesignPatterns.map((pattern, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs bg-slate-800/50 p-2 rounded-lg border border-slate-700/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200">{pattern}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Primary Responsibilities</h4>
              <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                {selectedModule.responsibilities.map((resp, idx) => (
                  <li key={idx} className="leading-relaxed text-slate-300">
                    {resp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Inputs & Outputs */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Inputs</span>
                <ul className="mt-1 space-y-1 text-slate-400">
                  {selectedModule.inputs.map((inp, idx) => (
                    <li key={idx}>&bull; {inp}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Outputs</span>
                <ul className="mt-1 space-y-1 text-slate-400">
                  {selectedModule.outputs.map((out, idx) => (
                    <li key={idx}>&bull; {out}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-2">Technology Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedModule.techStack.map((tech, idx) => (
                  <span key={idx} className="bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-0.5 rounded text-[11px] font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
