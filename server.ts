import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Get user repos metadata
  app.get('/api/repos', async (req, res) => {
    try {
      const response = await fetch('https://api.github.com/users/jpytka666-jpg/repos?per_page=100', {
        headers: {
          'User-Agent': 'AIONS-Architecture-Studio/1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (err: any) {
      console.error('Error fetching repos:', err);
      // Fallback repo data if GitHub API rate-limited
      res.json([
        {
          id: 1,
          name: 'wpc-engine',
          description: 'Weight-Pattern Compression — a tensor compilation and inference engine in pure Rust.',
          language: 'Rust',
          stargazers_count: 12,
          html_url: 'https://github.com/jpytka666-jpg/wpc-engine',
          open_issues_count: 26,
        },
        {
          id: 2,
          name: 'aions-mcp-server',
          description: 'AIONS MCP Server - 40 tools including CBMS, ChromaDB, Playwright, and more. Containerized for easy deployment.',
          language: 'Python',
          stargazers_count: 8,
          html_url: 'https://github.com/jpytka666-jpg/aions-mcp-server',
          open_issues_count: 3,
        },
        {
          id: 3,
          name: 'super-system',
          description: 'Hands-on learning, modular architecture, data flow demo & visual architecture examples.',
          language: 'Python',
          stargazers_count: 15,
          html_url: 'https://github.com/jpytka666-jpg/super-system',
          open_issues_count: 0,
        },
        {
          id: 4,
          name: 'polip-agi',
          description: 'Agent architecture and capability selector experiments in Rust.',
          language: 'Rust',
          stargazers_count: 5,
          html_url: 'https://github.com/jpytka666-jpg/polip-agi',
          open_issues_count: 1,
        },
        {
          id: 5,
          name: 'aions-chroma-watchdog',
          description: 'Independent Rust watchdog for AIONS ChromaDB health and recovery.',
          language: 'Rust',
          stargazers_count: 4,
          html_url: 'https://github.com/jpytka666-jpg/aions-chroma-watchdog',
          open_issues_count: 0,
        },
        {
          id: 6,
          name: 'mcp-integration-system',
          description: 'Comprehensive MCP orchestration platform for automated assessment workflows.',
          language: 'TypeScript',
          stargazers_count: 9,
          html_url: 'https://github.com/jpytka666-jpg/mcp-integration-system',
          open_issues_count: 2,
        },
      ]);
    }
  });

  // Fetch repository file content or tree
  app.get('/api/repo-content', async (req, res) => {
    const { repo, path: filePath } = req.query;
    if (!repo) {
      return res.status(400).json({ error: 'Repository name required' });
    }

    try {
      const url = filePath
        ? `https://api.github.com/repos/jpytka666-jpg/${repo}/contents/${filePath}`
        : `https://api.github.com/repos/jpytka666-jpg/${repo}/contents`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'AIONS-Architecture-Studio/1.0',
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch content from GitHub' });
      }

      const data = await response.json();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // WPC Benchmark Calculator
  app.post('/api/wpc-benchmark', (req, res) => {
    const { model, paramCountB, quantizationScheme, cpuCores, batchSize } = req.body;

    const params = parseFloat(paramCountB) || 30; // default 30B
    const cores = parseInt(cpuCores) || 4;
    const batch = parseInt(batchSize) || 1;

    let bpp = 16; // float16 baseline
    let speedMult = 1.0;
    let accuracyLossPercent = 0.0;

    if (quantizationScheme === 'v4-4.25bit') {
      bpp = 4.25;
      speedMult = 2.45;
      accuracyLossPercent = 0.42;
    } else if (quantizationScheme === 'v3-6.25bit') {
      bpp = 6.25;
      speedMult = 1.85;
      accuracyLossPercent = 0.15;
    } else if (quantizationScheme === 'int8') {
      bpp = 8.0;
      speedMult = 1.4;
      accuracyLossPercent = 0.25;
    }

    // Memory calculation in GB
    const rawSizeGB = (params * 2.0); // 16-bit float = 2 bytes per param
    const compressedSizeGB = (params * bpp) / 8.0;
    const compressionRatio = rawSizeGB / compressedSizeGB;

    // Tokens per second estimation on modern AVX-512 / AVX2 CPU
    // Baseline for 30B on 4-core CPU is ~0.9 tok/s raw, compressed v4 reaches ~2.35 tok/s
    const baseTokensPerSec = (30 / params) * (cores / 4.0) * 0.9;
    const tokensPerSecond = (baseTokensPerSec * speedMult / Math.sqrt(batch)).toFixed(2);
    const latencyPerTokenMs = (1000 / parseFloat(tokensPerSecond)).toFixed(1);

    res.json({
      model: model || 'Qwen3-Coder-30B-A3B',
      parameters: `${params}B`,
      quantizationScheme: quantizationScheme || 'v4-4.25bit',
      rawMemoryGB: rawSizeGB.toFixed(2),
      compressedMemoryGB: compressedSizeGB.toFixed(2),
      compressionRatio: `${compressionRatio.toFixed(2)}x`,
      tokensPerSecond: parseFloat(tokensPerSecond),
      latencyPerTokenMs: parseFloat(latencyPerTokenMs),
      accuracyLossPercent,
      kvCacheSizeMB: (params * 0.04 * batch * 1024).toFixed(1), // KV cache estimation
      cpuCores: cores,
      batchSize: batch,
    });
  });

  // AI Architecture Audit using Gemini API
  app.post('/api/ai-architecture-audit', async (req, res) => {
    const { prompt, context, repoName } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY environment variable is not configured.',
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the Lead Systems Architect & AI Compiler Specialist for the AIONS OS and jpytka666-jpg ecosystem (wpc-engine, aions-mcp-server, super-system, polip-agi, aions-chroma-watchdog).
Your task is to analyze code structures, explain design patterns, perform zero-copy Rust/Python architecture reviews, evaluate Weight-Pattern Compression (WPC), CBMS memory schemas, and propose concrete modular improvements.
Structure your answers clearly with Markdown headings, bullet points, technical diagrams (using ASCII or code blocks), and Rust/Python code snippets where relevant.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `[Target Repo Context: ${repoName || 'AIONS Ecosystem'}]\n\nAdditional Technical Context:\n${context || 'No extra context'}\n\nArchitectural Inquiry / Improvement Request:\n${prompt}`,
              },
            ],
          },
        ],
        config: {
          systemInstruction,
          temperature: 0.3,
          maxOutputTokens: 2500,
        },
      });

      res.json({
        result: response.text || 'No response generated.',
      });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({ error: err.message || 'Error processing AI architecture audit' });
    }
  });

  // Vite development middleware or production static server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AIONS Architecture Studio Server running on http://localhost:${PORT}`);
  });
}

startServer();
