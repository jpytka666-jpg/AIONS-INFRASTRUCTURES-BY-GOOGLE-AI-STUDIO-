import React, { useState } from 'react';
import { MCP_TOOLS_CATALOGUE } from '../data/aionsArchitectureData';
import { McpToolSpec } from '../types';
import {
  Bot,
  Terminal,
  Play,
  Layers,
  CheckCircle2,
  Cpu,
  Search,
  Code2,
  Database,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

export const McpAgentSandbox: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<McpToolSpec>(MCP_TOOLS_CATALOGUE[0]);
  const [toolArgs, setToolArgs] = useState<string>('{\n  "query": "WPC tensor compression ratios",\n  "top_k": 3\n}');
  const [executionLogs, setExecutionLogs] = useState<
    { timestamp: string; step: string; type: 'info' | 'tool_call' | 'result' | 'final'; text: string }[]
  >([
    {
      timestamp: '17:58:01',
      step: 'INIT',
      type: 'info',
      text: 'Connected to persistent AIONS MCP Server daemon over UNIX socket.',
    },
    {
      timestamp: '17:58:02',
      step: 'DISCOVERY',
      type: 'info',
      text: 'Discovered 40+ live MCP tools (CBMS, CRLA Core, Codebook Engine, Memory Store).',
    },
  ]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [userPrompt, setUserPrompt] = useState<string>(
    'Search CBMS for memory_kv compression and store new architecture benchmark findings.'
  );

  const runAgentTurnLoop = () => {
    setIsExecuting(true);
    const newLogs = [
      ...executionLogs,
      {
        timestamp: new Date().toLocaleTimeString(),
        step: 'USER_TASK',
        type: 'info' as const,
        text: `Received User Goal: "${userPrompt}"`,
      },
      {
        timestamp: new Date().toLocaleTimeString(),
        step: 'WPC_INFERENCE',
        type: 'info' as const,
        text: 'WPC Qwen3-Coder-30B-A3B v4 model turn started (2.35 tok/s)...',
      },
      {
        timestamp: new Date().toLocaleTimeString(),
        step: 'TOOL_CALL',
        type: 'tool_call' as const,
        text: `TOOL_CALL: { "name": "${selectedTool.name}", "arguments": ${toolArgs.replace(/\n/g, ' ')} }`,
      },
      {
        timestamp: new Date().toLocaleTimeString(),
        step: 'TOOL_RESULT',
        type: 'result' as const,
        text: `AIONS MCP tools/call -> ${selectedTool.outputFormat}`,
      },
      {
        timestamp: new Date().toLocaleTimeString(),
        step: 'FINAL',
        type: 'final' as const,
        text: 'Final Agent Turn Complete. CBMS context updated & transcript appended.',
      },
    ];

    setTimeout(() => {
      setExecutionLogs(newLogs);
      setIsExecuting(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Autonomous Agent Execution Engine</span>
              <span className="bg-slate-800 text-slate-300 text-[11px] px-2 py-0.5 rounded font-mono">
                WHITEPAPER_ADDENDUM_AIONS_AGENT.md
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1 flex items-center space-x-2">
              <Bot className="w-6 h-6 text-indigo-400" />
              <span>AIONS MCP Agent Sandbox &amp; Tool Catalogue</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Demonstrating the dynamic tool discovery loop where WPC model turns generate structured <code className="text-indigo-300">TOOL_CALL</code> instructions, execute against the 40+ tool AIONS MCP server, and update the turn transcript.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Tool Catalogue (4 cols), Agent Execution Transcript (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tool Catalogue Selector (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>40+ Live MCP Tools</span>
            </h3>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono font-semibold">
              Dynamic Discovery
            </span>
          </div>

          <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
            {MCP_TOOLS_CATALOGUE.map((tool) => {
              const isSelected = selectedTool.name === tool.name;
              return (
                <button
                  key={tool.name}
                  onClick={() => {
                    setSelectedTool(tool);
                    setToolArgs(
                      JSON.stringify(
                        Object.fromEntries(
                          Object.keys(tool.parameters).map((k) => [k, tool.parameters[k].includes('number') ? 5 : 'example_query'])
                        ),
                        null,
                        2
                      )
                    );
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-300">{tool.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {tool.category.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{tool.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Execution Sandbox & Interactive Agent Loop (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Prompt + Execute Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Simulate Agent Turn Goal</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  className="flex-1 bg-slate-950 text-slate-200 text-xs border border-slate-800 rounded-xl px-3.5 py-2.5 font-sans focus:outline-none focus:border-indigo-500"
                  placeholder="Enter agent task..."
                />
                <button
                  onClick={runAgentTurnLoop}
                  disabled={isExecuting}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2.5 rounded-xl font-bold transition shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute Turn</span>
                </button>
              </div>
            </div>

            {/* Selected Tool Inspector & Arguments */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  <span className="font-mono text-xs font-bold text-white">{selectedTool.name}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Category: {selectedTool.category}</span>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 font-medium block mb-1">Tool Arguments (JSON):</label>
                <textarea
                  value={toolArgs}
                  onChange={(e) => setToolArgs(e.target.value)}
                  className="w-full h-24 bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Execution Transcript Logs */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Agent Execution Loop Transcript</span>
            </h3>

            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs space-y-2 max-h-80 overflow-y-auto border border-slate-800">
              {executionLogs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-slate-300">
                  <span className="text-slate-600 text-[10px] shrink-0">{log.timestamp}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0 ${
                      log.type === 'tool_call'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : log.type === 'result'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : log.type === 'final'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {log.step}
                  </span>
                  <span className="text-slate-200 leading-relaxed">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
