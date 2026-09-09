import React, { useState } from 'react';
import { REPOSITORIES } from '../data/aionsArchitectureData';
import { RepositoryInfo } from '../types';
import {
  GitBranch,
  FileText,
  Folder,
  FileCode,
  BookOpen,
  Code2,
  ExternalLink,
  ChevronRight,
  Search,
  Zap,
  Info,
} from 'lucide-react';

interface RepoExplorerProps {
  selectedRepoName: string;
  setSelectedRepoName: (repo: string) => void;
}

export const RepoExplorer: React.FC<RepoExplorerProps> = ({
  selectedRepoName,
  setSelectedRepoName,
}) => {
  const [activeDoc, setActiveDoc] = useState<'aions-map' | 'whitepaper' | 'agent-addendum' | 'source'>('aions-map');
  const [activeFile, setActiveFile] = useState<string>('README.md');

  const currentRepoInfo = REPOSITORIES.find((r) => r.name === selectedRepoName) || REPOSITORIES[0];

  const sampleFilesByRepo: Record<string, { path: string; language: string; content: string }[]> = {
    'wpc-engine': [
      {
        path: 'README.md',
        language: 'markdown',
        content: `# wpc-engine
**Weight-Pattern Compression — a tensor compilation and inference engine in pure Rust.**

Runs large language models on ordinary CPUs by compressing their weights to as few as 4.25 bits each, with no GPU, no Python runtime, and no external inference dependencies.

## What it does
A 30-billion-parameter mixture-of-experts model — Qwen3-Coder-30B-A3B — compresses from **57.0 GB to 15.10 GB** and generates correct code on a 2016 quad-core laptop CPU, at **2.35 tokens per second**.

| Model | Source | v3 (6.25 bit) | v4 (4.25 bit) | Best Ratio |
|---|---|---|---|---|
| Qwen3-Coder-30B-A3B (MoE) | 57.0 GB | 22.21 GB | **15.10 GB** | 3.77x |
| Qwen3-4B (dense) | 8.0 GB | 3.0 GB | **1.99 GB** | 4.02x |
| Gemma-12B-it (dense) | 23.0 GB | 8.70 GB | **5.85 GB** | 3.93x |
| Qwen2.5-0.5B (dense) | 0.95 GB | 0.37 GB | **0.24 GB** | 3.95x |`,
      },
      {
        path: 'docs/AIONS-INTEGRATION-MAP.md',
        language: 'markdown',
        content: `# AIONS Integration Map
## Purpose
This document maps the historical repositories into the modular AIONS OS architecture.

## Eight Architectural Modules
1. **WPC Runtime** — model execution, resident runtime, batch GEMM/attention.
2. **Agents / Local CI** — deterministic verification, diagnostics, repair loop, coding agent.
3. **Memory / KV** — hot KV, compressed KV research, CBMS persistence and retrieval.
4. **AIONS Studio** — native developer/system environment: editor, compiler, debugger.
5. **Memory/System Graph** — interactive graph of code, memory, processes, agents and dependencies.
6. **AIONS Kernel** — Rust kernel, IPC, capabilities, scheduling and memory primitives.
7. **Ghost Gate** — isolated network VM boundary for firewall/VPN/DNS and optional Tor routing.
8. **OS Integration** — packaging, boot, service supervision, permissions, observability.`,
      },
      {
        path: 'WHITEPAPER_ADDENDUM_AIONS_AGENT.md',
        language: 'markdown',
        content: `# WPC/AIONS Agent Integration — Addendum to WHITEPAPER.md

## 1. Dynamic Tool Discovery
The agent connects to an AIONS MCP server and performs the standard initialization sequence followed by tools/list. The complete live tool catalogue is inserted into the model's system context.

## 2. Execution Loop
Task -> Live MCP Tool Catalogue -> WPC Qwen3-Coder-30B-A3B v4 -> TOOL_CALL {name, arguments} -> AIONS MCP tools/call -> TOOL_RESULT -> Transcript -> Next Model Turn.`,
      },
      {
        path: 'noworodek/src/bin/noworodek-train-math.rs',
        language: 'rust',
        content: `// Weight-Pattern Compression Training & Quantization Kernel
use std::fs::File;
use std::io::{Read, Write};

pub struct WeightPatternCompressor {
    bitrate: f32, // 4.25 bits/weight for v4
    codebook: [f32; 16],
}

impl WeightPatternCompressor {
    pub fn new_v4() -> Self {
        Self {
            bitrate: 4.25,
            codebook: [-1.2, -0.8, -0.4, -0.2, -0.1, 0.0, 0.1, 0.2, 0.4, 0.8, 1.2, 1.8, 2.4, 3.2, 4.0, 5.2],
        }
    }

    pub fn compress_layer(&self, weights: &[f32]) -> Vec<u8> {
        let mut packed = Vec::with_capacity(weights.len() / 2);
        for chunk in weights.chunks(2) {
            let idx0 = self.find_nearest_codebook(chunk[0]);
            let idx1 = if chunk.len() > 1 { self.find_nearest_codebook(chunk[1]) } else { 0 };
            packed.push((idx0 << 4) | (idx1 & 0x0F));
        }
        packed
    }

    fn find_nearest_codebook(&self, val: f32) -> u8 {
        let mut min_diff = f32::MAX;
        let mut best_idx = 0;
        for (idx, &cb_val) in self.codebook.iter().enumerate() {
            let diff = (val - cb_val).abs();
            if diff < min_diff {
                min_diff = diff;
                best_idx = idx as u8;
            }
        }
        best_idx
    }
}`,
      },
    ],
    'aions-mcp-server': [
      {
        path: 'README.md',
        language: 'markdown',
        content: `# AIONS MCP Server
MCP (Model Context Protocol) server with 40+ tools for AI development workflows.

## Features
- CBMS (CodeBook Memory System) direct & unified servers
- CRLA Core & symbolic index search engines
- Codebook vector quantization engine
- Memory recall & persistence tools`,
      },
      {
        path: 'server/cbms_direct_server.py',
        language: 'python',
        content: `# CBMS Direct Server Implementation
import sys
import json
from typing import Dict, Any, List

class CbmsDirectServer:
    def __init__(self):
        self.codebooks: Dict[str, Any] = {}
        self.memory_store: Dict[str, Any] = {}

    def handle_tool_call(self, tool_name: str, args: Dict[str, Any]) -> Dict[str, Any]:
        if tool_name == "cbms_search":
            query = args.get("query", "")
            matches = [v for k, v in self.memory_store.items() if query.lower() in str(v).lower()]
            return {"status": "success", "matches": matches[:5]}
        elif tool_name == "memory_store":
            key = args.get("key")
            content = args.get("content")
            self.memory_store[key] = content
            return {"status": "stored", "key": key}
        return {"error": f"Tool {tool_name} not found"}

if __name__ == "__main__":
    server = CbmsDirectServer()
    print("CBMS Direct Server initialized.")`,
      },
    ],
    'super-system': [
      {
        path: 'README.md',
        language: 'markdown',
        content: `# Super System - Learning by Doing 🚀
Welcome! This repository is designed for **learning by observing and experimenting**.

## 📚 Structure
1. Basic Examples (\`/examples/basics/\`)
2. Web Examples (\`/examples/web/\`)
3. Architecture Examples (\`/examples/architecture/\`)`,
      },
      {
        path: 'examples/architecture/modular-app/main.py',
        language: 'python',
        content: `# Modular Architecture Demo - main.py
from task_manager import TaskManager
from display import Display
from user import User

def main():
    display = Display()
    user = User("Architect", "admin")
    task_mgr = TaskManager()

    display.show_header(f"AIONS Modular Architecture Demo - User: {user.name}")
    task_mgr.add_task("WPC Tensor Optimization")
    task_mgr.add_task("CBMS Vector Store Indexing")

    display.render_tasks(task_mgr.get_tasks())

if __name__ == "__main__":
    main()`,
      },
    ],
    'polip-agi': [
      {
        path: 'README.md',
        language: 'markdown',
        content: `# polip-agi
Agent architecture and dynamic capability selection engine written in Rust.

## Crates
- \`crates/darkstar-core\` - capability selector & agent router.`,
      },
      {
        path: 'crates/darkstar-core/src/capability_selector.rs',
        language: 'rust',
        content: `// Darkstar Core Capability Selector
pub struct CapabilitySelector {
    capabilities: Vec<String>,
}

impl CapabilitySelector {
    pub fn new() -> Self {
        Self {
            capabilities: vec!["code_gen".into(), "memory_recall".into(), "ipc_send".into()],
        }
    }

    pub fn match_capability(&self, prompt: &str) -> Option<&str> {
        if prompt.contains("memory") {
            Some("memory_recall")
        } else if prompt.contains("code") {
            Some("code_gen")
        } else {
            None
        }
    }
}`,
      },
    ],
  };

  const fileList = sampleFilesByRepo[selectedRepoName] || sampleFilesByRepo['wpc-engine'];
  const currentFileObj = fileList.find((f) => f.path === activeFile) || fileList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Research &amp; Familiarisation</span>
              <span className="bg-slate-800 text-slate-300 text-[11px] px-2 py-0.5 rounded font-mono">
                {currentRepoInfo.language} &bull; {currentRepoInfo.primaryModule}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1 flex items-center space-x-2">
              <GitBranch className="w-6 h-6 text-indigo-400" />
              <span>{currentRepoInfo.name}</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {currentRepoInfo.description}
            </p>
          </div>

          <a
            href={currentRepoInfo.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl transition font-medium cursor-pointer"
          >
            <span>Open on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Feature Pill Matrix */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
          {currentRepoInfo.keyFeatures.map((feat, idx) => (
            <span
              key={idx}
              className="bg-slate-800/80 text-indigo-300 border border-indigo-500/30 text-xs px-3 py-1 rounded-lg flex items-center space-x-1.5"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>{feat}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Repository Explorer Workspace: File Browser + Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* File Tree & Spec Documents Navigation (4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <Folder className="w-4 h-4 text-indigo-400" />
              <span>Repository Files &amp; Specs</span>
            </h3>

            {/* File List */}
            <div className="space-y-1">
              {fileList.map((file) => {
                const isActive = activeFile === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setActiveFile(file.path)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs transition cursor-pointer font-mono ${
                      isActive
                        ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50 shadow-sm'
                        : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      {file.path.endsWith('.rs') ? (
                        <Code2 className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : file.path.endsWith('.py') ? (
                        <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                      )}
                      <span className="truncate">{file.path}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Architectural Summary Card */}
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 text-xs text-indigo-200 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-indigo-300">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>Architecture Takeaways</span>
            </div>
            <p className="leading-relaxed text-indigo-200/90">
              In <code className="text-white font-mono">{selectedRepoName}</code>, notice how heavy reliance on standard subprocess calls or external dependencies is mitigated by zero-dependency Rust SIMD kernels or structured MCP tool schemas.
            </p>
          </div>
        </div>

        {/* Code / Markdown Viewer Panel (8 columns) */}
        <div className="lg:col-span-8">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Code Header Bar */}
            <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <span className="font-mono text-xs text-slate-200 font-semibold">{currentFileObj.path}</span>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold border border-slate-700">
                {currentFileObj.language}
              </span>
            </div>

            {/* Code / Markdown Content Box */}
            <div className="p-5 font-mono text-xs overflow-x-auto text-slate-200 bg-slate-950/60 leading-relaxed min-h-[420px] max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap">{currentFileObj.content}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
