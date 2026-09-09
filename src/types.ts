export interface RepositoryInfo {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  openIssues: number;
  url: string;
  primaryModule: string;
  keyFeatures: string[];
  architectureCategory: string;
}

export interface ArchitectureModule {
  id: string;
  number: number;
  name: string;
  category: 'Runtime' | 'Agent' | 'Memory' | 'Developer' | 'Kernel' | 'Security' | 'Integration';
  description: string;
  historicalRepoSource: string;
  responsibilities: string[];
  keyDesignPatterns: string[];
  inputs: string[];
  outputs: string[];
  techStack: string[];
  status: 'active' | 'beta' | 'planned';
}

export interface WpcModelConfig {
  name: string;
  originalSizeGB: number;
  v3SizeGB: number;
  v4SizeGB: number;
  bestRatio: string;
  paramCountB: number;
  description: string;
}

export interface McpToolSpec {
  name: string;
  category: 'Memory & Knowledge' | 'Code & Scanning' | 'System & Execution' | 'Agent & Context';
  description: string;
  parameters: Record<string, string>;
  exampleUsage: string;
  outputFormat: string;
}

export interface ArchitecturalImprovement {
  id: string;
  title: string;
  moduleTarget: string;
  problemStatement: string;
  proposedSolution: string;
  impactMetrics: {
    latencyReduction: string;
    memorySavings: string;
    throughputGain: string;
  };
  designPatternsUsed: string[];
  codeDiffSnippet: {
    filename: string;
    language: 'rust' | 'python' | 'typescript';
    before: string;
    after: string;
  };
  appliedStatus: boolean;
}

export interface CbmsMemoryChunk {
  id: string;
  codebookKey: string;
  vectorSimScore: number;
  content: string;
  tags: string[];
  timestamp: string;
}

export interface NoworodekState {
  weightSetId: string;
  codeAtomsCount: number;
  qualityGateScore: number;
  learningDaemonStatus: 'active' | 'idle' | 'assimilating';
  activeObservations: string[];
}

export interface DarkstarState {
  gatewayStatus: 'protected' | 'filtering' | 'bypassed';
  activeCapabilities: string[];
  ghostGateRuleCount: number;
  blockedAttemptsCount: number;
}

export interface WarlockKaliProbe {
  id: string;
  name: string;
  toolCategory: 'Recon' | 'Exploit' | 'RedTeam' | 'Fuzzing';
  targetModule: string;
  status: 'passed' | 'mitigated' | 'vulnerable';
  mitigationContract: string;
}

export interface EsperantoHangulNode {
  esperantoConcept: string; // e.g. "TRANSFORM_AST_CODEBOOK_REPRESENTATION"
  hangulSyllable: string; // e.g. "코드-글-1"
  codebookVectorIndex: string;
  subByteEncoding: string; // e.g. "0x4B_2A_9F"
  wpcOffset: string;
}

