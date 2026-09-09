import React, { useState, useEffect } from 'react';
import { WPC_MODELS } from '../data/aionsArchitectureData';
import { WpcModelConfig } from '../types';
import {
  Cpu,
  Zap,
  BarChart2,
  HardDrive,
  Activity,
  Layers,
  Play,
  CheckCircle,
  RefreshCw,
  Info,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from 'recharts';

export const WpcCompressorStudio: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<WpcModelConfig>(WPC_MODELS[0]);
  const [scheme, setScheme] = useState<'v4-4.25bit' | 'v3-6.25bit' | 'int8' | 'fp16'>('v4-4.25bit');
  const [cpuCores, setCpuCores] = useState<number>(4);
  const [batchSize, setBatchSize] = useState<number>(1);
  const [isBenchmarking, setIsBenchmarking] = useState<boolean>(false);
  const [benchmarkResult, setBenchmarkResult] = useState<any>(null);

  const runBenchmark = async () => {
    setIsBenchmarking(true);
    try {
      const res = await fetch('/api/wpc-benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel.name,
          paramCountB: selectedModel.paramCountB,
          quantizationScheme: scheme,
          cpuCores,
          batchSize,
        }),
      });
      const data = await res.json();
      setBenchmarkResult(data);
    } catch (err) {
      console.error('Error running WPC benchmark:', err);
    } finally {
      setIsBenchmarking(false);
    }
  };

  useEffect(() => {
    runBenchmark();
  }, [selectedModel, scheme, cpuCores, batchSize]);

  const comparisonData = WPC_MODELS.map((m) => ({
    name: m.name.split(' ')[0],
    OriginalFP16: m.originalSizeGB,
    v3_6_25bit: m.v3SizeGB,
    v4_4_25bit: m.v4SizeGB,
  }));

  const coreScalingData = [
    { cores: '1 Core', tokSec: (selectedModel.paramCountB <= 4 ? 4.2 : 0.6) },
    { cores: '2 Cores', tokSec: (selectedModel.paramCountB <= 4 ? 8.1 : 1.25) },
    { cores: '4 Cores', tokSec: (selectedModel.paramCountB <= 4 ? 14.8 : 2.35) },
    { cores: '8 Cores', tokSec: (selectedModel.paramCountB <= 4 ? 24.5 : 4.10) },
    { cores: '16 Cores', tokSec: (selectedModel.paramCountB <= 4 ? 38.0 : 6.80) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Tensor Compiler Engine</span>
              <span className="bg-indigo-500/20 text-indigo-300 text-[11px] px-2 py-0.5 rounded font-mono border border-indigo-500/30">
                Pure Rust &bull; No Python &bull; No GPU Required
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1 flex items-center space-x-2">
              <Cpu className="w-6 h-6 text-indigo-400" />
              <span>Weight-Pattern Compression (WPC) Studio</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Demonstrating how large models (like <strong className="text-slate-200">Qwen3-Coder-30B-A3B</strong>) compress from 57.0 GB down to 15.10 GB at 4.25 bits/weight, running on ordinary quad-core laptop CPUs at 2.35 tokens/sec.
            </p>
          </div>

          <button
            onClick={runBenchmark}
            disabled={isBenchmarking}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2.5 rounded-xl font-bold transition shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
          >
            {isBenchmarking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{isBenchmarking ? 'Compiling Tensor Kernels...' : 'Run Benchmark Profiler'}</span>
          </button>
        </div>
      </div>

      {/* Control Panel + Realtime Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Compiler Configuration Controls (5 columns) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Target Model &amp; Compression Scheme</span>
          </h3>

          {/* Model Selector */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">Select Model Architecture:</label>
            <div className="space-y-2">
              {WPC_MODELS.map((m) => (
                <div
                  key={m.name}
                  onClick={() => setSelectedModel(m)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    selectedModel.name === m.name
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold font-mono">{m.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {m.paramCountB}B parameters &bull; {m.originalSizeGB} GB Baseline
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                    {m.bestRatio}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantization Scheme */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">Quantization Scheme:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'v4-4.25bit', label: 'v4 (4.25-bit)', sub: 'Recommended' },
                { id: 'v3-6.25bit', label: 'v3 (6.25-bit)', sub: 'Higher fidelity' },
                { id: 'int8', label: 'INT8 Quant', sub: 'Standard 8-bit' },
                { id: 'fp16', label: 'FP16 Baseline', sub: 'Uncompressed' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setScheme(item.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                    scheme === item.id
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="text-xs font-bold font-mono">{item.label}</div>
                  <div className="text-[10px] text-slate-500">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Hardware CPU Core & Batch Config */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">CPU Core Allocation:</label>
              <select
                value={cpuCores}
                onChange={(e) => setCpuCores(Number(e.target.value))}
                className="w-full bg-slate-950 text-slate-200 text-xs border border-slate-800 rounded-lg p-2 font-mono"
              >
                <option value={2}>2 Cores (Dual-Core)</option>
                <option value={4}>4 Cores (Quad-Core Laptop)</option>
                <option value={8}>8 Cores (Workstation)</option>
                <option value={16}>16 Cores (Server)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">Batch Size:</label>
              <select
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="w-full bg-slate-950 text-slate-200 text-xs border border-slate-800 rounded-lg p-2 font-mono"
              >
                <option value={1}>Batch 1 (Interactive)</option>
                <option value={2}>Batch 2</option>
                <option value={4}>Batch 4 (Parallel)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Real-Time Benchmark Metrics Display (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          {benchmarkResult && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                <span>Compiler Benchmark &amp; Execution Output</span>
              </h3>

              {/* Stat Cards Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Compressed RAM</span>
                  <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                    {benchmarkResult.compressedMemoryGB} GB
                  </div>
                  <span className="text-[10px] text-slate-400">vs {benchmarkResult.rawMemoryGB} GB FP16</span>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Compression</span>
                  <div className="text-lg font-bold font-mono text-indigo-400 mt-0.5">
                    {benchmarkResult.compressionRatio}
                  </div>
                  <span className="text-[10px] text-slate-400">Weight Reduction</span>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Token Speed</span>
                  <div className="text-lg font-bold font-mono text-cyan-400 mt-0.5">
                    {benchmarkResult.tokensPerSecond} <span className="text-xs">tok/s</span>
                  </div>
                  <span className="text-[10px] text-slate-400">~{Math.round(benchmarkResult.tokensPerSecond * 51)} wpm</span>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Per-Token Latency</span>
                  <div className="text-lg font-bold font-mono text-amber-400 mt-0.5">
                    {benchmarkResult.latencyPerTokenMs} ms
                  </div>
                  <span className="text-[10px] text-slate-400">CPU SIMD Execution</span>
                </div>
              </div>

              {/* Recharts Bar Chart: Memory Compression across models */}
              <div className="pt-3 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 mb-3">Model RAM Footprint Comparison (GB):</h4>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} unit="GB" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                      />
                      <Bar dataKey="OriginalFP16" fill="#64748b" name="Original FP16 (GB)" />
                      <Bar dataKey="v3_6_25bit" fill="#818cf8" name="v3 6.25-bit (GB)" />
                      <Bar dataKey="v4_4_25bit" fill="#34d399" name="v4 4.25-bit (GB)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
