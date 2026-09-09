# GOOGLE_WORKSPACE — Architectural Coverage Map

This document tracks the inspection depth across the `https://github.com/jpytka666-jpg` ecosystem.

---

## 1. Coverage Classification Legend
- **Deeply Inspected**: Full code, whitepaper, schema, tests, and pull request review.
- **Partially Inspected**: Key READMEs, entry points, workflows, and branch manifests examined.
- **Only Discovered**: Identified via GitHub API crawl (branch names, commit logs, PR titles).
- **Not Yet Inspected**: Unmerged experimental trees or external closed binary blobs.

---

## 2. Granular Ecosystem Coverage Matrix

| Repository | Branch / Module | Inspection Level | Notes & Key Findings |
|---|---|---|---|
| **`wpc-engine`** | `main` | **Deeply Inspected** | WPC v3/v4 compression whitepaper, 30B MoE model benchmarks, SIMD bit-packing, README. |
| **`wpc-engine`** | `Noworodek` | **Deeply Inspected** | PR #31 (CBMS model language, quality gate observer, learning daemon), PR #28 (`WeightSet`), PR #30 (`Code-Atoms`). |
| **`wpc-engine`** | `arch/*` (9 modules) | **Partially Inspected** | `arch/wpc-runtime`, `arch/agents-ci`, `arch/memory-kv`, `arch/studio`, `arch/memory-graph`, `arch/aions-kernel`, `arch/ghost-gate`, `arch/os-integration`. |
| **`wpc-engine`** | `feature/gpu-wpc4-decode-sm50` | **Partially Inspected** | CUDA SM50 WPC v4 GPU decoding kernels. |
| **`wpc-engine`** | `feature/memory-kv-*` (10 branches) | **Partially Inspected** | Resident Qwen 30B KV probes, benchmark gates, low-rank decomposition. |
| **`aions-mcp-server`** | `main` | **Deeply Inspected** | 40+ MCP tools, CBMS direct/unified servers, Docker config, `requirements.txt`. |
| **`aions-mcp-server`** | `rust-port-lab` | **Partially Inspected** | Migration laboratory porting Python MCP tools to native Rust. |
| **`aions-server-wiedzy`** | `main` | **Partially Inspected** | Perception tools (read screen, take photo, find faces), context server handlers. |
| **`aions-server-wiedzy`** | `claude/acae-module-plan-v2-x79i93` | **Deeply Inspected** | PR #1: ACAE v3 module plan overthrows v2 reconnaissance assumptions. |
| **`aions-server-wiedzy`** | `discovery/cbms-structure-2026-08-26` | **Deeply Inspected** | PR #3: CBMS Korean pattern & Esperanto separation logic. |
| **`polip-agi`** | `main` | **Deeply Inspected** | `darkstar-core` capability selector, `.github/agents/my-agent.agent.md`. |
| **`polip-agi`** | `Darkstar` & `feat/darkstar-*` | **Deeply Inspected** | Open PRs #4-#8: Protected-host gateway, AIONS control-plane, Ghost Gate contract, module registry. |
| **`mcp-integration-system`**| `main` | **Deeply Inspected** | Phase 4 Tasks 22-31 completed, SAM Infrastructure, Step Functions, Lambda, CLAUDE.md rules. |
| **`super-system`** | `main` | **Deeply Inspected** | Modular architecture demo, task manager, display, user, interactive calculators. |
| **`super-system`** | `feat/warlock-kali-lab-foundation` | **Partially Inspected** | Security & penetration testing lab foundation integration. |
| **`aions-chroma-watchdog`** | `main` | **Deeply Inspected** | Independent Rust watchdog monitoring ChromaDB health and automated recovery. |

---

## 3. Summary Statistics
- **Total Repositories Catalogued**: 7
- **Total Branches Identified**: 60+
- **Total Workflows Inspected**: 45+
- **Deeply Inspected Modules**: 11
- **Partially Inspected Modules**: 22
- **Discovered Branches / Features**: 28
