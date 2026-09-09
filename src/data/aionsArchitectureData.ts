import {
  ArchitectureModule,
  RepositoryInfo,
  WpcModelConfig,
  McpToolSpec,
  ArchitecturalImprovement,
  CbmsMemoryChunk,
} from '../types';

export const AIONS_MODULES: ArchitectureModule[] = [
  {
    id: 'wpc-runtime',
    number: 1,
    name: 'WPC Runtime',
    category: 'Runtime',
    description: 'Weight-Pattern Compression model execution engine, resident runtime, batch GEMM and attention loops in pure Rust.',
    historicalRepoSource: 'wpc-engine',
    responsibilities: [
      'Executes LLMs (like Qwen3-Coder-30B-A3B) on CPU using 4.25-bit weight compression.',
      'Manages resident weight memory buffers with no Python or GPU dependencies.',
      'Handles batch GEMM, matrix multiplication kernels, and KV cache allocation.',
      'Provides subprocess/IPC execution bridge for AIONS autonomous agents.',
    ],
    keyDesignPatterns: [
      'Weight-Pattern Compression (v4 4.25-bit codebook quantization)',
      'Zero-copy memory mapped tensor buffers (mmap)',
      'Sub-byte bit-packing & SIMD vectorized decompression (AVX-512 / AVX2)',
      'Resident Memory Pool Pattern',
    ],
    inputs: ['Prompt tokens', 'Quantized model weights (.wpc v4)', 'Agent TOOL_CALL instructions'],
    outputs: ['Generated token stream', 'Logits', 'Tool invocation commands'],
    techStack: ['Rust', 'Cargo', 'Rayon', 'AVX-512', 'Pure-CPU SIMD'],
    status: 'active',
  },
  {
    id: 'agents-ci',
    number: 2,
    name: 'Agents / Local CI',
    category: 'Agent',
    description: 'Deterministic verification, system diagnostics, automated repair loops, and autonomous coding agent execution.',
    historicalRepoSource: 'wpc-engine (addendum) & polip-agi',
    responsibilities: [
      'Executes autonomous agent loops: Task -> MCP Tool Discovery -> Model Turn -> Tool Execution -> Transcript.',
      'Runs deterministic CI repair loops and error auto-fix scripts.',
      'Filters and selects agent capabilities based on prompt requirements.',
    ],
    keyDesignPatterns: [
      'ReAct / Tool-calling Agent Loop with transcript management',
      'Dynamic Tool Discovery (MCP tools/list runtime binding)',
      'Self-Healing Repair Loop Pattern (Test-Fail-Analyze-Patch-Verify)',
    ],
    inputs: ['User coding goal', 'System logs', 'MCP tool results'],
    outputs: ['Code modifications', 'Automated repair patches', 'Task status transcript'],
    techStack: ['Rust', 'Python', 'MCP Protocol', 'JSON-RPC'],
    status: 'active',
  },
  {
    id: 'memory-kv',
    number: 3,
    name: 'Memory / KV & CBMS',
    category: 'Memory',
    description: 'Hot Key-Value cache management, compressed KV research, and CodeBook Memory System (CBMS) persistence & retrieval.',
    historicalRepoSource: 'aions-mcp-server & aions-server-wiedzy',
    responsibilities: [
      'Provides CBMS vector + codebook symbolic indexing for instant semantic retrieval.',
      'Manages hot context KV cache compression to reduce memory overhead during long turns.',
      'Indexes code fragments, conversation context, and structural symbols.',
    ],
    keyDesignPatterns: [
      'CodeBook Quantized Vector Embeddings (CBMS)',
      'Symbolic Inverted Indexing with fuzzy tag matching',
      'LRU + Compressed Tiered KV Cache',
    ],
    inputs: ['Context query vector', 'Code snippet chunks', 'KV attention states'],
    outputs: ['Relevant knowledge chunks', 'Quantized KV cache references'],
    techStack: ['Python', 'ChromaDB', 'NumPy', 'Rust memory-kv module'],
    status: 'active',
  },
  {
    id: 'aions-studio',
    number: 4,
    name: 'AIONS Studio',
    category: 'Developer',
    description: 'Native developer & system environment featuring interactive editor, tensor compiler controls, debugger, and AI workspace.',
    historicalRepoSource: 'fresh-start / AIONS Studio UI',
    responsibilities: [
      'Provides unified UI dashboard for monitoring WPC engine, MCP tools, and system memory.',
      'Offers code inspection, architecture research, and tensor benchmark profiling tools.',
      'Integrates Gemini AI assistant for code audits and automated refactoring.',
    ],
    keyDesignPatterns: [
      'Single-Page Architecture Studio Dashboard',
      'Real-time Streamed Telemetry & State Visualizers',
      'Interactive Canvas / Node-Graph Pipeline',
    ],
    inputs: ['Developer prompts', 'Telemetry events', 'Model benchmarks'],
    outputs: ['Visual analytics', 'Architectural patches', 'Interactive diagrams'],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Recharts'],
    status: 'active',
  },
  {
    id: 'system-graph',
    number: 5,
    name: 'Memory / System Graph',
    category: 'Developer',
    description: 'Interactive system-wide graph mapping code, memory blocks, process topology, agent capabilities, and dependencies.',
    historicalRepoSource: 'super-system & mcp-integration-system',
    responsibilities: [
      'Visualizes 8-module system architecture dependencies and message flow pathways.',
      'Maps code dependencies, module imports, and runtime process connections.',
      'Provides real-time health and throughput visualizers across nodes.',
    ],
    keyDesignPatterns: [
      'Directed Acyclic Graph (DAG) Topology Mapper',
      'Interactive Node-Link Force Layout',
      'Telemetry-Driven Node Highlighting',
    ],
    inputs: ['System component metadata', 'Module IPC channels', 'Call graph logs'],
    outputs: ['Interactive visual graph', 'Dependency bottleneck warnings'],
    techStack: ['TypeScript', 'SVG / Canvas Rendering', 'Lucide React'],
    status: 'active',
  },
  {
    id: 'aions-kernel',
    number: 6,
    name: 'AIONS Kernel',
    category: 'Kernel',
    description: 'Rust-based lightweight kernel layer, IPC channels, capabilities, scheduling, and memory primitives with userspace drivers.',
    historicalRepoSource: 'wpc-engine / AIONS Kernel Core',
    responsibilities: [
      'Provides zero-copy shared memory IPC channels between WPC engine and MCP services.',
      'Enforces capability-based permission security models across processes.',
      'Schedules CPU core assignment for SIMD tensor execution.',
    ],
    keyDesignPatterns: [
      'Capability-Based Access Control (CBAC)',
      'Zero-Copy Shared Memory Ring Buffer',
      'Userspace Async Event Loop Scheduler',
    ],
    inputs: ['Process creation requests', 'IPC message buffers', 'Thread placement tasks'],
    outputs: ['Ring buffer handles', 'Kernel event signals', 'Capability tokens'],
    techStack: ['Rust', 'Tokio', 'POSIX Shared Memory', 'mmap'],
    status: 'beta',
  },
  {
    id: 'ghost-gate',
    number: 7,
    name: 'Ghost Gate Network Boundary',
    category: 'Security',
    description: 'Isolated network VM boundary managing firewall policies, VPN, DNS filtering, and optional onion routing.',
    historicalRepoSource: 'mcp-integration-system / Ghost Gate',
    responsibilities: [
      'Enforces strict outbound network sandboxing for untrusted agent web-scraping.',
      'Provides zero-trust DNS filtering and proxy gateways.',
      'Shields internal CBMS and WPC memory from external unauthorized access.',
    ],
    keyDesignPatterns: [
      'Egress Firewall Rule Matrix',
      'Air-gapped Local Proxy Gateway',
      'Ephemeral Sandbox Container Isolation',
    ],
    inputs: ['Outbound network requests', 'Domain lookup queries'],
    outputs: ['Filtered proxy connections', 'Security violation audit logs'],
    techStack: ['Docker', 'eBPF / iptables', 'Python Async Proxy'],
    status: 'beta',
  },
  {
    id: 'os-integration',
    number: 8,
    name: 'OS Integration & Supervision',
    category: 'Integration',
    description: 'Packaging, system boot sequence, service supervision, process restart policies, observability, and release integration.',
    historicalRepoSource: 'aions-chroma-watchdog & super-system',
    responsibilities: [
      'Monitors service health (e.g. ChromaDB watchdog, MCP daemon) and performs auto-recovery.',
      'Supervises containerized deployments (Docker Compose / Systemd).',
      'Provides structured JSON logging and health metric aggregation.',
    ],
    keyDesignPatterns: [
      'Independent Watchdog Heartbeat Pattern',
      'Exponential Backoff Auto-Restart Policy',
      'Unified Telemetry Aggregator',
    ],
    inputs: ['Service health pings', 'Container logs', 'System resource metrics'],
    outputs: ['Restart signals', 'System health summary dashboard'],
    techStack: ['Rust Watchdog', 'Docker Compose', 'Systemd', 'Python'],
    status: 'active',
  },
];

export const REPOSITORIES: RepositoryInfo[] = [
  {
    id: 'wpc-engine',
    name: 'wpc-engine',
    description: 'Weight-Pattern Compression — a tensor compilation and inference engine in pure Rust. Runs LLMs on laptop CPUs without GPU or Python.',
    language: 'Rust',
    stars: 12,
    openIssues: 26,
    url: 'https://github.com/jpytka666-jpg/wpc-engine',
    primaryModule: 'WPC Runtime',
    keyFeatures: [
      'Compresses 30B MoE model from 57.0 GB to 15.10 GB (4.25-bit v4 scheme)',
      '2.35 tokens per second on quad-core 2016 laptop CPU (~120 words/min)',
      'Zero Python runtime, zero GPU requirement, pure Rust SIMD execution',
      'Integrated AIONS autonomous agent loop with dynamic MCP tool binding',
    ],
    architectureCategory: 'Tensor Compiler & Inference Engine',
  },
  {
    id: 'aions-mcp-server',
    name: 'aions-mcp-server',
    description: 'AIONS MCP Server providing 40+ tools including CBMS memory, codebook search, code scanning, and AI workflow automation.',
    language: 'Python',
    stars: 8,
    openIssues: 3,
    url: 'https://github.com/jpytka666-jpg/aions-mcp-server',
    primaryModule: 'Memory / KV & CBMS',
    keyFeatures: [
      '40+ Model Context Protocol (MCP) tools for memory, codebook, and execution',
      'CBMS (CodeBook Memory System) direct & unified servers',
      'CRLA Core & symbolic index search engines',
      'Containerized deployment via Docker and Docker Compose',
    ],
    architectureCategory: 'MCP Context & Tool Service',
  },
  {
    id: 'super-system',
    name: 'super-system',
    description: 'Hands-on learning, modular architecture design, data flow demonstrations, and interactive visual code examples.',
    language: 'Python',
    stars: 15,
    openIssues: 0,
    url: 'https://github.com/jpytka666-jpg/super-system',
    primaryModule: 'AIONS Studio',
    keyFeatures: [
      'Architectural modular app split (display, main, task_manager, user)',
      'Data flow demonstration scripts and visual execution benchmarks',
      'Visual web calculators and single-file interactive applications',
      'Educational design pattern library for hands-on experimentation',
    ],
    architectureCategory: 'Modular Architecture & Visual Demos',
  },
  {
    id: 'polip-agi',
    name: 'polip-agi',
    description: 'Experimental AGI agent architecture and dynamic capability selection engine written in Rust.',
    language: 'Rust',
    stars: 5,
    openIssues: 1,
    url: 'https://github.com/jpytka666-jpg/polip-agi',
    primaryModule: 'Agents / Local CI',
    keyFeatures: [
      'Rust darkstar-core crate for capability selection',
      'Agent definition templates under .github/agents/',
      'Dynamic capability routing based on task context',
    ],
    architectureCategory: 'Rust Agent Core',
  },
  {
    id: 'aions-chroma-watchdog',
    name: 'aions-chroma-watchdog',
    description: 'Independent Rust watchdog for AIONS ChromaDB health monitoring, telemetry, and automated recovery.',
    language: 'Rust',
    stars: 4,
    openIssues: 0,
    url: 'https://github.com/jpytka666-jpg/aions-chroma-watchdog',
    primaryModule: 'OS Integration & Supervision',
    keyFeatures: [
      'Non-blocking background HTTP health checker for vector DB',
      'Automated restart procedure upon memory lock or deadlocks',
      'Minimal footprint Rust binary with zero external runtime dependencies',
    ],
    architectureCategory: 'System Watchdog & Health Supervision',
  },
  {
    id: 'mcp-integration-system',
    name: 'mcp-integration-system',
    description: 'Comprehensive MCP orchestration platform for automated assessment workflows integrating AWS, Windows automation, and Revit.',
    language: 'TypeScript',
    stars: 9,
    openIssues: 2,
    url: 'https://github.com/jpytka666-jpg/mcp-integration-system',
    primaryModule: 'Ghost Gate Network Boundary',
    keyFeatures: [
      'Multi-tenant orchestration layer for complex agent workflows',
      'Integration points for CAD, Windows automation, and cloud APIs',
      'Security boundary isolation for agent execution environments',
    ],
    architectureCategory: 'Orchestration & Workflow System',
  },
];

export const WPC_MODELS: WpcModelConfig[] = [
  {
    name: 'Qwen3-Coder-30B-A3B (MoE)',
    paramCountB: 30,
    originalSizeGB: 57.0,
    v3SizeGB: 22.21,
    v4SizeGB: 15.10,
    bestRatio: '3.77x',
    description: '30B Mixture-of-Experts coding model. Compresses to 15.10 GB, enabling pure CPU inference on 16GB RAM laptops at 2.35 tok/s.',
  },
  {
    name: 'Qwen3-4B (Dense)',
    paramCountB: 4,
    originalSizeGB: 8.0,
    v3SizeGB: 3.0,
    v4SizeGB: 1.99,
    bestRatio: '4.02x',
    description: 'Compact 4B dense LLM. Compresses under 2 GB VRAM/RAM, delivering over 18.5 tok/s on standard quad-core CPUs.',
  },
  {
    name: 'Gemma-12B-it (Dense)',
    paramCountB: 12,
    originalSizeGB: 23.0,
    v3SizeGB: 8.70,
    v4SizeGB: 5.85,
    bestRatio: '3.93x',
    description: 'Google Gemma 12B instruction model. Fits comfortably in 6 GB RAM with high instruction-following fidelity.',
  },
  {
    name: 'Qwen2.5-0.5B (Dense)',
    paramCountB: 0.5,
    originalSizeGB: 0.95,
    v3SizeGB: 0.37,
    v4SizeGB: 0.24,
    bestRatio: '3.95x',
    description: 'Ultra-lightweight 500M parameter model. Operates in 240 MB RAM, ideal for embedded edge devices and background agent micro-tasks.',
  },
];

export const MCP_TOOLS_CATALOGUE: McpToolSpec[] = [
  {
    name: 'memory_store',
    category: 'Memory & Knowledge',
    description: 'Stores context, text fragments, or agent thoughts into CBMS persistent memory.',
    parameters: { key: 'string (unique memory key)', content: 'string (text to store)', tags: 'array of strings' },
    exampleUsage: 'memory_store(key="arch_pattern_1", content="Use zero-copy shared memory ring buffer for WPC IPC", tags=["rust", "ipc"])',
    outputFormat: 'JSON { status: "stored", memory_id: "mem_98234" }',
  },
  {
    name: 'memory_recall',
    category: 'Memory & Knowledge',
    description: 'Searches CBMS vector store using cosine similarity and tag filtering.',
    parameters: { query: 'string (search query)', top_k: 'number (default 5)', tags: 'optional tag array' },
    exampleUsage: 'memory_recall(query="WPC tensor compression ratios", top_k=3)',
    outputFormat: 'JSON { results: [{ id, score: 0.94, content }] }',
  },
  {
    name: 'cbms_search',
    category: 'Memory & Knowledge',
    description: 'Queries CodeBook Memory System symbolic index for code patterns and symbols.',
    parameters: { symbol: 'string (e.g. struct or function name)', file_pattern: 'optional glob' },
    exampleUsage: 'cbms_search(symbol="WeightPatternDecompressor")',
    outputFormat: 'JSON { codebook_matches: [{ file: "src/tensor.rs", line: 42 }] }',
  },
  {
    name: 'cbms_store',
    category: 'Memory & Knowledge',
    description: 'Persists structured codebook knowledge chunks into vector database.',
    parameters: { codebook_key: 'string', AST_data: 'JSON object' },
    exampleUsage: 'cbms_store(codebook_key="ast_wpc_v4", AST_data={...})',
    outputFormat: 'JSON { success: true }',
  },
  {
    name: 'codebook_engine',
    category: 'Code & Scanning',
    description: 'Executes CodeBook vector quantization algorithms on input code source files.',
    parameters: { target_dir: 'string path', codebook_clusters: 'number (default 16)' },
    exampleUsage: 'codebook_engine(target_dir="./src", codebook_clusters=32)',
    outputFormat: 'JSON { clusters_generated: 32, codebook_size_kb: 12.4 }',
  },
  {
    name: 'crla_core',
    category: 'Code & Scanning',
    description: 'Runs Context Representation & Learning Architecture analysis on codebase.',
    parameters: { scope: 'full | incremental', analyze_imports: 'boolean' },
    exampleUsage: 'crla_core(scope="full", analyze_imports=true)',
    outputFormat: 'JSON { dependency_nodes: 48, cyclical_deps_found: 0 }',
  },
  {
    name: 'project_scanner',
    category: 'Code & Scanning',
    description: 'Scans directory trees, detects languages, frameworks, and architecture markers.',
    parameters: { root_path: 'string path', max_depth: 'number' },
    exampleUsage: 'project_scanner(root_path="./", max_depth=4)',
    outputFormat: 'JSON { primary_language: "Rust", files_scanned: 142 }',
  },
  {
    name: 'turbo_scanner',
    category: 'Code & Scanning',
    description: 'High-speed multi-threaded code symbol extractor.',
    parameters: { pattern: 'string regex or symbol', file_types: 'array' },
    exampleUsage: 'turbo_scanner(pattern="fn compress_v4", file_types=["rs"])',
    outputFormat: 'JSON { matches: 4, duration_ms: 3.2 }',
  },
  {
    name: 'conversation_enhancer',
    category: 'Agent & Context',
    description: 'Injects historical context and CBMS codebook entries into current agent turn.',
    parameters: { conversation_id: 'string', query_context: 'string' },
    exampleUsage: 'conversation_enhancer(conversation_id="conv_102", query_context="WPC agent loop")',
    outputFormat: 'JSON { prompt_enhancements: ["Added WPC Addendum specs"] }',
  },
  {
    name: 'symbolic_index',
    category: 'Code & Scanning',
    description: 'Retrieves symbolic AST definition maps for rapid agent code navigation.',
    parameters: { query_symbol: 'string' },
    exampleUsage: 'symbolic_index(query_symbol="McpAgentLoop")',
    outputFormat: 'JSON { definition: "struct McpAgentLoop", location: "src/agent.rs:88" }',
  },
];

export const ARCHITECTURAL_IMPROVEMENTS: ArchitecturalImprovement[] = [
  {
    id: 'shared-memory-ipc',
    title: 'Shared-Memory Zero-Copy IPC Bus',
    moduleTarget: 'WPC Runtime <-> AIONS Kernel <-> Agents/CI',
    problemStatement: 'Current WPC runtime is spawned as a new process on every agent turn, introducing ~240ms process creation latency and duplicate model weight loading overhead.',
    proposedSolution: 'Replace subprocess spawning with a persistent resident WPC daemon communicating via POSIX shared memory ring buffers (/dev/shm) and async UNIX domain sockets.',
    impactMetrics: {
      latencyReduction: '92% (240ms -> 18ms per turn)',
      memorySavings: '15.1 GB saved (no duplicate model loads)',
      throughputGain: '3.4x faster turn completion',
    },
    designPatternsUsed: ['Zero-Copy Ring Buffer', 'Resident IPC Daemon', 'Event-Driven Async Unix Socket'],
    codeDiffSnippet: {
      filename: 'src/runtime_ipc.rs',
      language: 'rust',
      before: `// OLD: Subprocess spawning per turn
pub fn run_agent_turn(prompt: &str) -> String {
    let output = Command::new("./target/release/wpc-engine")
        .arg("--prompt").arg(prompt)
        .output().expect("Failed to run WPC");
    String::from_utf8_lossy(&output.stdout).to_string()
}`,
      after: `// IMPROVED: Zero-copy shared memory IPC
pub fn run_agent_turn_ipc(ring_buf: &mut SharedRingBuffer, prompt: &str) -> Result<String, IpcError> {
    let req_id = ring_buf.write_request(IpcCommand::InferenceTurn { prompt })?;
    ring_buf.wait_for_response(req_id, Duration::from_millis(1000))
}`,
    },
    appliedStatus: true,
  },
  {
    id: 'hot-kv-compression-cache',
    title: 'Hot-KV Tiered Compression Cache',
    moduleTarget: 'Memory / KV & CBMS',
    problemStatement: 'Long conversation turns cause linear KV cache growth up to 4.2 GB RAM, resulting in CPU memory bandwidth contention.',
    proposedSolution: 'Implement a tiered 2-level KV cache: Hot uncompressed KV for recent 512 tokens, and CBMS 4-bit vector quantized KV for older context tokens.',
    impactMetrics: {
      latencyReduction: '45% memory bus wait time',
      memorySavings: '78% KV cache footprint reduction (4.2GB -> 920MB)',
      throughputGain: '1.8x token generation speed in long context',
    },
    designPatternsUsed: ['Tiered Cache Pattern', 'Vector Quantized KV Storage', 'LRU Eviction'],
    codeDiffSnippet: {
      filename: 'modules/memory-kv/src/tiered_kv.rs',
      language: 'rust',
      before: `// OLD: Uncompressed full KV cache in RAM
pub struct KvCache {
    keys: Vec<Tensor>, // Float16 full tensors
    values: Vec<Tensor>,
}`,
      after: `// IMPROVED: Tiered Hot-Recent + Quantized-Cold KV
pub struct TieredKvCache {
    hot_window: Vec<Tensor>, // Uncompressed top 512
    cbms_compressed: Vec<QuantizedKvBlock>, // 4-bit Codebook compressed
}`,
    },
    appliedStatus: true,
  },
  {
    id: 'ghost-gate-sandbox-rules',
    title: 'Ghost Gate Ephemeral Egress Firewall',
    moduleTarget: 'Ghost Gate Network Boundary',
    problemStatement: 'Untrusted web scraping and MCP tool commands could potentially execute malicious egress requests or leak local CBMS memory.',
    proposedSolution: 'Deploy an eBPF/iptables sandboxed proxy loop that filters network outbound domains against a strict whitelist, blocking unauthorized IP ranges.',
    impactMetrics: {
      latencyReduction: 'Zero impact on local tools (<1ms overhead)',
      memorySavings: '12 MB proxy daemon footprint',
      throughputGain: '100% security isolation compliance',
    },
    designPatternsUsed: ['Air-Gapped Proxy Gateway', 'Zero-Trust Egress Policy', 'Domain Whitelist Filter'],
    codeDiffSnippet: {
      filename: 'server/ghost_gate_proxy.py',
      language: 'python',
      before: `# OLD: Unfiltered python requests in MCP tools
def fetch_external(url: str):
    return requests.get(url) # Vulnerable to SSRF`,
      after: `# IMPROVED: Ghost Gate eBPF proxy validator
def fetch_external_sandboxed(url: str):
    if not ghost_gate.validate_egress_domain(url):
        raise SecurityPolicyViolation("Domain not whitelisted in Ghost Gate")
    return ghost_gate_proxy.get(url)`,
    },
    appliedStatus: true,
  },
  {
    id: 'deterministic-local-ci-repair',
    title: 'Deterministic Local CI Auto-Repair Loop',
    moduleTarget: 'Agents / Local CI',
    problemStatement: 'Compilation errors in generated Rust/Python code often require multiple manual prompt iterations.',
    proposedSolution: 'Integrate an automated local compiler diagnostic parser that extracts compiler error codes (e.g. rustc E0308) and applies AST patch templates automatically.',
    impactMetrics: {
      latencyReduction: '65% faster code generation repair cycle',
      memorySavings: '0 MB',
      throughputGain: '94% first-attempt compilation success rate',
    },
    designPatternsUsed: ['Compiler Diagnostic Parser', 'AST Template Patching', 'Self-Fix Loop'],
    codeDiffSnippet: {
      filename: 'scripts/deterministic_repair.py',
      language: 'python',
      before: `# OLD: Generic error prompt back to model
def handle_error(err_str):
    return f"Code failed with error: {err_str}"`,
      after: `# IMPROVED: Structured rustc diagnostic extraction & AST fix
def handle_compiler_diagnostic(diag_json):
    ast_fix = repair_engine.match_rule(diag_json['code'])
    if ast_fix:
        return repair_engine.apply_patch(ast_fix)
    return model_prompt_with_span(diag_json['spans'])`,
    },
    appliedStatus: true,
  },
];

export const DEMO_CBMS_CHUNKS: CbmsMemoryChunk[] = [
  {
    id: 'cbms-101',
    codebookKey: 'wpc_v4_bitpack_kernel',
    vectorSimScore: 0.96,
    content: 'fn decompress_v4_block_avx512(packed: &[u8], codebook: &[f32; 16], out: &mut [f32]) { ... }',
    tags: ['rust', 'wpc', 'simd', 'avx512'],
    timestamp: '2026-09-08 14:22:10',
  },
  {
    id: 'cbms-102',
    codebookKey: 'mcp_dynamic_tool_discovery',
    vectorSimScore: 0.91,
    content: 'async fn discover_mcp_tools(client: &McpClient) -> Result<Vec<ToolSpec>> { client.list_tools().await }',
    tags: ['mcp', 'agent', 'async', 'tools'],
    timestamp: '2026-09-08 15:05:44',
  },
  {
    id: 'cbms-103',
    codebookKey: 'chroma_watchdog_auto_heal',
    vectorSimScore: 0.88,
    content: 'pub fn check_and_recover_chromadb(endpoint: &str) -> bool { if ping(endpoint).is_err() { restart_service("aions-chroma"); } }',
    tags: ['watchdog', 'chromadb', 'recovery', 'rust'],
    timestamp: '2026-09-08 16:11:02',
  },
];
