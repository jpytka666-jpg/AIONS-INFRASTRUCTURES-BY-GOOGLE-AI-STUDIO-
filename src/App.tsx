import React, { useState } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { ModuleGraphView } from './components/ModuleGraphView';
import { RepoExplorer } from './components/RepoExplorer';
import { WpcCompressorStudio } from './components/WpcCompressorStudio';
import { McpAgentSandbox } from './components/McpAgentSandbox';
import { CbmsMemoryExplorer } from './components/CbmsMemoryExplorer';
import { ArchitecturalImprovementsSuite } from './components/ArchitecturalImprovementsSuite';
import { AiArchitectureAssistant } from './components/AiArchitectureAssistant';
import { GoogleWorkspaceHub } from './components/GoogleWorkspaceHub';
import { NoworodekDarkstarMatrix } from './components/NoworodekDarkstarMatrix';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('google-workspace');
  const [selectedRepo, setSelectedRepo] = useState<string>('wpc-engine');
  const [ipcStatus, setIpcStatus] = useState<boolean>(true);

  const handleSelectModuleFromGraph = (moduleId: string) => {
    if (moduleId === 'wpc-runtime') {
      setSelectedRepo('wpc-engine');
    } else if (moduleId === 'memory-kv') {
      setSelectedRepo('aions-mcp-server');
    } else if (moduleId === 'system-graph' || moduleId === 'aions-studio') {
      setSelectedRepo('super-system');
    } else if (moduleId === 'agents-ci') {
      setSelectedRepo('polip-agi');
    } else if (moduleId === 'os-integration') {
      setSelectedRepo('aions-chroma-watchdog');
    }
    setActiveTab('repo-explorer');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Navigation Header */}
      <HeaderNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedRepo={selectedRepo}
        setSelectedRepo={setSelectedRepo}
        ipcStatus={ipcStatus}
      />

      {/* Primary Workspace View */}
      <main className="flex-1 pb-12">
        {activeTab === 'google-workspace' && <GoogleWorkspaceHub />}

        {activeTab === 'noworodek-matrix' && <NoworodekDarkstarMatrix />}

        {activeTab === 'graph' && (
          <ModuleGraphView onSelectModule={handleSelectModuleFromGraph} />
        )}

        {activeTab === 'repo-explorer' && (
          <RepoExplorer
            selectedRepoName={selectedRepo}
            setSelectedRepoName={setSelectedRepo}
          />
        )}

        {activeTab === 'wpc-studio' && <WpcCompressorStudio />}

        {activeTab === 'mcp-sandbox' && <McpAgentSandbox />}

        {activeTab === 'cbms-memory' && <CbmsMemoryExplorer />}

        {activeTab === 'improvements' && (
          <ArchitecturalImprovementsSuite
            ipcStatus={ipcStatus}
            setIpcStatus={setIpcStatus}
          />
        )}

        {activeTab === 'ai-audit' && (
          <AiArchitectureAssistant selectedRepo={selectedRepo} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-4 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            AIONS OS Architecture Studio &bull; <span className="text-slate-300 font-mono">jpytka666-jpg</span> Repository Research
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <span className="text-emerald-400">&bull; WPC v4 (4.25-bit) Active</span>
            <span className="text-indigo-400">&bull; 40+ MCP Tools</span>
            <span className="text-cyan-400">&bull; CBMS Vector Index</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
