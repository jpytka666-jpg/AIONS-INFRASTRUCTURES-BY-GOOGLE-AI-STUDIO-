import React, { useState } from 'react';
import { Sparkles, Bot, Send, RefreshCw, Code2, BookOpen, CheckCircle, Copy, Check } from 'lucide-react';

interface AiArchitectureAssistantProps {
  selectedRepo: string;
}

export const AiArchitectureAssistant: React.FC<AiArchitectureAssistantProps> = ({ selectedRepo }) => {
  const [prompt, setPrompt] = useState<string>(
    `Perform an architectural audit on ${selectedRepo}. Explain how to transition from process-spawning to zero-copy shared memory IPC and generate the corresponding Rust/Python module interfaces.`
  );
  const [extraContext, setExtraContext] = useState<string>(
    'Focus on WPC v4 4.25-bit weight decompression SIMD kernels, CBMS vector memory indexing, and AIONS 8-module OS kernel boundary.'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [responseMarkdown, setResponseMarkdown] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const presets = [
    {
      title: 'Zero-Copy IPC Shared Memory Architecture',
      query: `Explain how to implement zero-copy ring buffer IPC between wpc-engine (Rust) and aions-mcp-server (Python) over POSIX /dev/shm. Provide Rust and Python code snippets.`,
    },
    {
      title: 'WPC v4 4.25-Bit SIMD Kernel Optimization',
      query: `Analyze the sub-byte packing algorithm for Weight-Pattern Compression v4 (4.25 bits/weight). How can AVX-512 vector instructions be used to minimize memory bandwidth contention?`,
    },
    {
      title: 'CBMS Vector + Codebook Hybrid Indexing',
      query: `Evaluate the CodeBook Memory System (CBMS) design pattern. How does combining 4-bit vector quantization with symbolic inverted AST indexing improve code recall speed?`,
    },
    {
      title: 'Ghost Gate Ephemeral Network Egress Audit',
      query: `Propose security rules for the Ghost Gate network boundary to sandbox untrusted agent web-scraping while preserving low-latency local MCP tool execution.`,
    },
  ];

  const handleAudit = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai-architecture-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          context: extraContext,
          repoName: selectedRepo,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMarkdown(data.result);
      } else {
        setResponseMarkdown(`**Error:** ${data.error || 'Failed to communicate with Gemini API server'}`);
      }
    } catch (err: any) {
      setResponseMarkdown(`**Error:** ${err.message || 'Network error calling AI service'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!responseMarkdown) return;
    navigator.clipboard.writeText(responseMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Server-Side Gemini AI Engine</span>
              <span className="bg-indigo-500/20 text-indigo-300 text-[11px] px-2 py-0.5 rounded font-mono border border-indigo-500/30">
                gemini-2.5-flash &bull; @google/genai
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span>Gemini AI Architecture Reviewer &amp; Code Generator</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Query Gemini to review design patterns, generate Rust/Python architectural improvements, optimize WPC tensor compression kernels, and audit security boundaries for <code className="text-indigo-300">{selectedRepo}</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Queries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => setPrompt(preset.query)}
            className="p-3.5 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 rounded-xl text-left transition cursor-pointer group"
          >
            <div className="text-xs font-bold text-indigo-300 group-hover:text-white flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">{preset.title}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{preset.query}</p>
          </button>
        ))}
      </div>

      {/* Input Box & Result Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Architecture Prompt Input</span>
          </h3>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Target Repository:</label>
            <div className="bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 font-mono text-xs text-indigo-300 font-bold">
              {selectedRepo}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Architectural Audit Request:</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-28 bg-slate-950 text-slate-200 font-sans text-xs border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-indigo-500 leading-relaxed"
              placeholder="Describe the architectural audit or code generation requested..."
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Additional Technical Context:</label>
            <textarea
              value={extraContext}
              onChange={(e) => setExtraContext(e.target.value)}
              className="w-full h-20 bg-slate-950 text-slate-200 font-sans text-xs border border-slate-800 rounded-xl p-3 focus:outline-none focus:border-indigo-500 leading-relaxed"
              placeholder="Add hardware specs, memory limits, or kernel boundaries..."
            />
          </div>

          <button
            onClick={handleAudit}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Auditing via Gemini AI...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Generate Architecture Analysis</span>
              </>
            )}
          </button>
        </div>

        {/* AI Output Result Box (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Gemini Architecture Audit Report</span>
            </h3>

            {responseMarkdown && (
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Report'}</span>
              </button>
            )}
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed min-h-[380px] max-h-[580px] overflow-y-auto">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-3 text-slate-400">
                <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
                <p className="text-xs font-sans">Evaluating tensor compiler kernels &amp; system architecture...</p>
              </div>
            ) : responseMarkdown ? (
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-200">
                {responseMarkdown}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 space-y-2 text-slate-500 font-sans text-center">
                <Sparkles className="w-8 h-8 text-slate-600 mb-1" />
                <p className="text-sm font-semibold text-slate-400">Ready to perform AI architecture audit</p>
                <p className="text-xs max-w-md">
                  Select a preset query or type your request on the left to analyze code design patterns, WPC tensor compression, and zero-copy IPC interfaces.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
