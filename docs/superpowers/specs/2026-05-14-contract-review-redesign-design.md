# Design: contract-review Skill Redesign

**Date:** 2026-05-14  
**Skill:** `plugins/legal/skills/contract-review`  
**Version:** 0.2.2 → 0.3.0

## Problem

The current skill has four pain points:

1. **Output quality** — risk analysis is shallow; the X/10 score has no defined rubric
2. **Flow adaptability** — a fixed 6-block structure regardless of contract type (NDA vs employment vs service agreement have very different risk profiles)
3. **Output format** — no standardized template; output varies per session
4. **Interaction experience** — check-in prompts are inconsistent; no pre-analysis confirmation of scope

## Solution

Redesign the skill with a two-phase structure, contract-type routing, severity-labeled risks, and a standardized output template.

## Structure

```
Phase 1 — Context & Routing
  Step 1: Understand Context      (type, parties, user's role)
  Step 2: Collect Contract        (paste text; offer section-by-section for long contracts)
  Step 3: Confirm Block Set       (show type-specific blocks, wait for user confirmation)

Phase 2 — Analysis
  Step 4: Block-by-Block Walkthrough  (type-routed blocks, uniform check-in after each)
  Step 5: Risk Summary                (all risks grouped by Critical / Major / Minor + Overall)
  Step 6: Open Q&A
```

## Routing Table

| Contract Type | Analysis Blocks |
|---|---|
| NDA | Parties & Purpose · Scope of Confidential Info · Receiving Party Obligations · Duration & Survival · Exclusions · Breach & Remedies · Dispute Resolution |
| Employment | Parties & Role · Compensation & Benefits · Duration & Termination · Non-compete / Non-solicit · IP Assignment · Confidentiality · Dispute Resolution |
| Service Agreement | Parties & Scope · Deliverables & Acceptance · Payment Terms · Duration & Termination · IP Ownership · Liability & Indemnification · Dispute Resolution |
| Purchase Agreement | Parties & Subject Matter · Price & Payment · Delivery & Acceptance · Warranties & Representations · Risk of Loss · Breach & Remedies · Dispute Resolution |
| General (fallback) | Parties & Purpose · Core Obligations · Payment Terms · Duration & Termination · Breach & Liability · Dispute Resolution |

## Risk Summary Output Format

```
Risk Summary:

🔴 Critical  (must negotiate before signing)
- [Risk name]: [plain-language description]
  Suggested change: "[specific alternative wording]"

🟡 Major  (should negotiate, not a dealbreaker)
- [Risk name]: [plain-language description]
  Suggested change: "[specific alternative wording]"

🟢 Minor  (low risk, worth noting)
- [Risk name]: [plain-language description]
  Suggested change: "[specific alternative wording]"

Overall: [1-2 sentence plain-language bottom line — whether to sign and under what conditions]
```

## Key Rule Changes

- Step 3 is mandatory — must show block list and wait for confirmation before Phase 2
- If contract type is ambiguous, ask the user; never silently fall back to General
- Uniform check-in after every block: "Anything here you'd like me to explain further, or shall we move on?"
- All risks listed (not capped at 3), grouped by severity
- Overall conclusion replaces X/10 score
