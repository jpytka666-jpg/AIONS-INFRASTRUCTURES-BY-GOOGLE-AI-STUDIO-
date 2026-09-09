import React from 'react';
import {
  Cpu,
  GitBranch,
  Layers,
  Database,
  Bot,
  Zap,
  Sparkles,
  ShieldAlert,
  Activity,
  Github,
  Code2,
  FolderGit2,
  BrainCircuit,
} from 'lucide-react';

interface HeaderNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedRepo: string;
  setSelectedRepo: (repo: string) => void;
  ipcStatus: boolean;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedRepo,
  setSelectedRepo,
  ipcStatus,
}) => {
  const tabs = [
    { id: 'google-workspace', label: 'GOOGLE_WORKSPACE Hub', icon: FolderGit2 },
    { id: 'noworodek-matrix', label: 'Noworodek & Darkstar Deep Core', icon: BrainCircuit },
    { id: 'graph', label: '8-Module System Graph', icon: Layers },
    { id: 'repo-explorer', label: 'Repo Familiarisation & Docs', icon: GitBranch },
    { id: 'wpc-studio', label: 'WPC Tensor Compiler', icon: Cpu },
    { id: 'mcp-sandbox', label: 'MCP Agent Loop (40+ Tools)', icon: Bot },
    { id: 'cbms-memory', label: 'CBMS Memory & Watchdog', icon: Database },
    { id: 'improvements', label: 'Architectural Improvements', icon: Zap },
    { id: 'ai-audit', label: 'Gemini AI Architecture Review', icon: Sparkles },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50 shadow-md">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-indigo-500 to-cyan-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20 text-white">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-white">
                AIONS OS <span className="text-indigo-400 font-normal">Architecture Studio</span>
              </h1>
              <span className="text-[10px] uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-semibold">
                jpytka666-jpg Ecosystem
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Weight-Pattern Compression (WPC) &bull; MCP Context Server &bull; 8-Module Rust/Python Kernel
            </p>
          </div>
        </div>

        {/* System Indicators & Repo Quick-Select */}
        <div className="flex items-center space-x-4 text-xs">
          {/* Target GitHub Repo Selector */}
          <div className="flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg px-2.5 py-1.5 space-x-2">
            <Github className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 font-medium">Repo Context:</span>
            <select
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              className="bg-slate-900 text-indigo-300 font-mono font-semibold text-xs border border-slate-700 rounded px-2 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="wpc-engine">wpc-engine (Rust Tensor Compiler)</option>
              <option value="aions-mcp-server">aions-mcp-server (40+ Tools & CBMS)</option>
              <option value="super-system">super-system (Modular Architecture)</option>
              <option value="polip-agi">polip-agi (Rust Capability Selector)</option>
              <option value="aions-chroma-watchdog">aions-chroma-watchdog (ChromaDB)</option>
              <option value="mcp-integration-system">mcp-integration-system (Orchestrator)</option>
            </select>
          </div>

          {/* IPC Status Badge */}
          <div className="hidden md:flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-1.5 space-x-2">
            <Activity className={`w-3.5 h-3.5 ${ipcStatus ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
            <span className="text-slate-300 font-medium">IPC Bus:</span>
            <span className={ipcStatus ? 'text-emerald-400 font-mono font-semibold' : 'text-amber-400 font-mono font-semibold'}>
              {ipcStatus ? 'Shared-Memory 18ms' : 'Subprocess 240ms'}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 overflow-x-auto scrollbar-none flex space-x-1 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
