import React, { useState } from 'react';
import { DEMO_CBMS_CHUNKS } from '../data/aionsArchitectureData';
import { CbmsMemoryChunk } from '../types';
import {
  Database,
  Search,
  Activity,
  Plus,
  Tag,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const CbmsMemoryExplorer: React.FC = () => {
  const [chunks, setChunks] = useState<CbmsMemoryChunk[]>(DEMO_CBMS_CHUNKS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [watchdogStatus, setWatchdogStatus] = useState<'healthy' | 'recovering' | 'error'>('healthy');
  const [newKey, setNewKey] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newTags, setNewTags] = useState<string>('rust, wpc, memory');

  const filteredChunks = chunks.filter(
    (c) =>
      c.codebookKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const triggerWatchdogRecovery = () => {
    setWatchdogStatus('recovering');
    setTimeout(() => {
      setWatchdogStatus('healthy');
    }, 1200);
  };

  const handleStoreChunk = () => {
    if (!newKey || !newContent) return;
    const created: CbmsMemoryChunk = {
      id: `cbms-${Date.now()}`,
      codebookKey: newKey,
      vectorSimScore: 0.98,
      content: newContent,
      tags: newTags.split(',').map((t) => t.trim()),
      timestamp: new Date().toLocaleString(),
    };
    setChunks([created, ...chunks]);
    setNewKey('');
    setNewContent('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner & ChromaDB Watchdog Status */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">CodeBook Memory System</span>
              <span className="bg-slate-800 text-slate-300 text-[11px] px-2 py-0.5 rounded font-mono">
                CBMS &bull; ChromaDB Vector Store
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1 flex items-center space-x-2">
              <Database className="w-6 h-6 text-indigo-400" />
              <span>CBMS Memory Explorer &amp; Chroma Watchdog</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Provides vector quantization index matching, symbolic indexing, and independent Rust background health supervision via <code className="text-indigo-300">aions-chroma-watchdog</code>.
            </p>
          </div>

          {/* ChromaDB Watchdog Live Badge */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center space-x-3">
            <Activity
              className={`w-5 h-5 ${
                watchdogStatus === 'healthy'
                  ? 'text-emerald-400 animate-pulse'
                  : watchdogStatus === 'recovering'
                  ? 'text-amber-400 animate-spin'
                  : 'text-rose-400'
              }`}
            />
            <div>
              <div className="text-xs text-slate-400 font-medium">aions-chroma-watchdog</div>
              <div className="text-xs font-bold font-mono text-slate-200">
                {watchdogStatus === 'healthy'
                  ? 'Healthy & Listening (12ms)'
                  : watchdogStatus === 'recovering'
                  ? 'Auto-Healing Service...'
                  : 'Service Error'}
              </div>
            </div>
            <button
              onClick={triggerWatchdogRecovery}
              title="Test Watchdog Heartbeat Ping"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Add Memory Chunk (4 cols) & Vector Search / Index List (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Store New Memory Chunk Form (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>Store CBMS Memory Chunk</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">CodeBook Key:</label>
              <input
                type="text"
                placeholder="e.g. wpc_v4_shared_memory_ipc"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs border border-slate-800 rounded-lg p-2.5 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Content / AST Code Fragment:</label>
              <textarea
                placeholder="Enter memory snippet or AST data..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full h-24 bg-slate-950 text-slate-200 text-xs border border-slate-800 rounded-lg p-2.5 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Tags (comma separated):</label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs border border-slate-800 rounded-lg p-2.5 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleStoreChunk}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Store in CBMS Vector DB</span>
            </button>
          </div>
        </div>

        {/* Vector Search & Memory Chunks List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Search Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center space-x-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search CBMS memory chunks by key, query vector, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-slate-200 text-xs focus:outline-none placeholder-slate-500"
            />
          </div>

          {/* Memory Chunks Grid */}
          <div className="space-y-3">
            {filteredChunks.map((chunk) => (
              <div key={chunk.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono text-xs font-bold text-white">{chunk.codebookKey}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono border border-emerald-500/30">
                      Sim: {(chunk.vectorSimScore * 100).toFixed(0)}%
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{chunk.timestamp}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{chunk.content}</pre>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {chunk.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded flex items-center space-x-1">
                      <Tag className="w-2.5 h-2.5" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
