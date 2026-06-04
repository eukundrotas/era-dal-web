# ADR-001: Meta-Orchestrator Architecture

**Status:** Accepted  
**Date:** 2026-06-03  
**Deciders:** Eugene Kundrotas

---

## Context

The ERA DAL platform has an OpenRouter proxy, ensemble execution, quality-gate,
and 15 thinking modes. The next layer is a Meta-Orchestrator that accepts a plain-language
user task and autonomously decides which agents, strategy, and thinking mode to use.

Key design question: where does the "intelligence" of task decomposition live,
and how does it relate to the execution layer?

---

## Decision

**The Meta-Orchestrator is a pure planning layer. It never executes.**

```
User Prompt
    │
    ▼
Meta-Orchestrator (POST /api/meta/plan)
    │  analyses task, selects agents/strategy/thinking mode
    │  returns MetaPlan (JSON)
    │
    ▼
Execution Layer (POST /api/meta/plans/:id/execute)
    │  interprets MetaPlan steps
    │  calls agents via /api/openrouter/* and /api/integrations/*
    │  enforces AutonomyLevel gates
    │
    ▼
Action Log (D1 / CloudflareKV)
```

The Meta-Orchestrator calls one LLM call (with the meta system prompt) to produce
a `MetaPlanLLMResponse`. That response is validated with Zod, persisted, and then
handed off to the execution layer.

---

## Consequences

**Positive:**
- Clear separation of concerns: planning ≠ execution
- The execution layer is deterministic and testable independent of the LLM plan
- Plans can be inspected, edited, and re-run by the user before execution
- Easy to swap the planning LLM without touching execution logic

**Negative:**
- An extra round-trip (plan generation) before execution begins
- If the planning LLM produces an invalid plan, the whole request fails fast
  (mitigated by Zod validation + fallback to safe defaults)

**Constraints this ADR imposes on all future work:**
1. No LLM calls inside the execution layer — only plan step dispatch
2. AutonomyLevel must be enforced at the execution layer, not the planning layer
3. All external writes (CRM, email, Telegram) require `REQUIRES_CONFIRMATION` in the plan
4. The planning LLM prompt must live in `/docs/meta-orchestrator-system-prompt.md`
   and be versioned; changes require a new ADR or amendment

---

## Alternatives considered

**A. Inline planning + execution in one endpoint**  
Rejected: mixes concerns; hard to inspect or pause mid-execution.

**B. Agent-native planning (each agent plans its own next step)**  
Rejected: leads to unpredictable chains and makes Autonomy Gate enforcement difficult.

**C. Hardcoded rule-based routing**  
Rejected: doesn't scale to arbitrary user prompts; brittle.
