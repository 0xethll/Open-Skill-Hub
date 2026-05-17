# Incident Postmortem

**Platforms:** Claude · Openclaw · Codex
**Domain:** DevOps / SRE

## Purpose

A conversational postmortem facilitator for engineering teams. Guides the team through a structured, blameless retrospective after any production incident and produces a complete postmortem document — covering timeline reconstruction, root cause analysis, impact quantification, and concrete action items.

## When to Use

- After any production incident you need to document for the team or stakeholders
- When the on-call engineer needs help structuring a postmortem from raw notes and chat logs
- When you want to ensure the postmortem is blameless, complete, and follows a consistent format

## What It Does

1. Collects incident severity, type, and basic facts
2. Routes to the right analysis focus based on incident type (outage, degradation, security breach, data loss, deployment failure)
3. Reconstructs a timestamped event timeline and flags detection gaps
4. Quantifies impact: affected users, SLA breach, business and regulatory exposure
5. Traces the causal chain using 5-Whys to distinguish proximate cause, root cause, and contributing factors
6. Collects specific, testable action items (preventive, detective, corrective) with owner and due date
7. Produces a complete, ready-to-share postmortem document
8. Incorporates review feedback and finalizes the document

## Note

This skill facilitates the postmortem process — it does not replace engineering judgment or legal review. For incidents that trigger regulatory obligations (GDPR, HIPAA, PCI-DSS, SOC 2), consult your legal or compliance team before making public disclosures.
