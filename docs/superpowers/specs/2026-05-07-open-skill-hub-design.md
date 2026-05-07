# Open Skill Hub — Design Spec

**Date:** 2026-05-07  
**Status:** Draft

---

## Context

The goal is to build a personal GitHub repository that collects AI skills for two platforms: **Claude Code** (Anthropic's CLI coding agent) and **Openclaw** (an open-source local AI assistant with its own skill marketplace, ClawHub). Skills will cover any domain — law, medicine, engineering, finance, and beyond — with no category restrictions.

The repo serves two audiences:
1. **The owner** — a living personal skill library to accumulate and iterate on
2. **Others** — who can either install the whole Claude Code plugin in one command or copy individual skills manually

---

## Architecture

### Approach: Skill-First Source, Platform-Specific Dist

Skills are authored once under a unified `skills/` directory. A build script (Bun) generates platform-specific output under `dist/` that conforms to each platform's installation format.

```
Open-Skill-Hub/
├── skills/                          # Source of truth — all skills live here
│   └── <skill-name>/
│       ├── README.md                # Human-readable description (English)
│       ├── claude-code.md           # Claude Code skill content (SKILL.md format)
│       └── openclaw.md              # Openclaw skill content
│
├── dist/                            # Build output — committed to git
│   ├── claude-code/
│   │   ├── package.json             # Claude Code plugin metadata
│   │   └── skills/
│   │       └── <skill-name>/
│   │           └── SKILL.md
│   └── openclaw/
│       └── skills/
│           └── <skill-name>/
│               └── skill.md
│
├── scripts/
│   └── build.ts                     # Bun build script
│
├── package.json                     # Bun project config
└── README.md                        # Navigation index + install instructions
```

**Why commit `dist/`:** Allows users to install the Claude Code plugin directly from GitHub without needing to run a build step locally.

---

## Skill File Format

### `skills/<name>/README.md`
Plain English description of what the skill does, when to use it, and example scenarios. No platform-specific syntax.

```markdown
# <Skill Name>

**Platforms:** Claude Code · Openclaw  
**Domain:** <industry/domain>

## Purpose
<One paragraph describing what this skill enables>

## When to Use
- <scenario 1>
- <scenario 2>

## Example
<Short example prompt or interaction>
```

### `skills/<name>/claude-code.md`
Follows the Claude Code SKILL.md frontmatter format:

```markdown
---
name: <skill-name>
description: <trigger description — when Claude should invoke this skill>
---

# <Skill Name>

<Full skill content in Claude Code format>
```

### `skills/<name>/openclaw.md`
Follows Openclaw's skill format (to be confirmed against ClawHub spec):

```markdown
---
name: <skill-name>
description: <description>
platform: openclaw
---

<Full skill content>
```

---

## Build Script (`scripts/build.ts`)

Run with: `bun run build`

**What it does:**
1. Reads all directories under `skills/`
2. For each skill:
   - Copies `claude-code.md` → `dist/claude-code/skills/<name>/SKILL.md`
   - Copies `openclaw.md` → `dist/openclaw/skills/<name>/skill.md`
3. Generates `dist/claude-code/package.json` with plugin metadata (name, version, skills list)

**`package.json` scripts:**
```json
{
  "scripts": {
    "build": "bun scripts/build.ts"
  }
}
```

---

## README Structure

The root `README.md` is the unified navigation surface. All text is in English.

```markdown
# Open Skill Hub

A personal AI skill library for Claude Code and Openclaw, covering all industries and domains.

## Install

### Claude Code (full plugin)
claude plugins install github:hanlynn/Open-Skill-Hub?path=dist/claude-code

### Single skill (manual copy)
cp skills/<name>/claude-code.md ~/.claude/skills/<name>/SKILL.md

### Openclaw
[instructions TBD based on ClawHub format]

## Skills

| Skill | Domain | Claude Code | Openclaw |
|-------|--------|-------------|----------|
| example-skill | General | ✅ | ✅ |

## Build
bun run build
```

---

## Data Flow

```
skills/<name>/claude-code.md  ──► bun run build ──► dist/claude-code/skills/<name>/SKILL.md
skills/<name>/openclaw.md     ──► bun run build ──► dist/openclaw/skills/<name>/skill.md
                                                 └──► dist/claude-code/package.json
```

---

## Verification

To verify the repo works end-to-end after implementation:

1. **Build passes:** `bun run build` completes without errors and `dist/` is populated
2. **Claude Code plugin install:** `claude plugins install github:hanlynn/Open-Skill-Hub?path=dist/claude-code` installs successfully and skills appear in Claude Code
3. **Manual copy works:** Copying `skills/<name>/claude-code.md` to `~/.claude/skills/<name>/SKILL.md` and verifying Claude Code picks up the skill
4. **Skill format valid:** At least one example skill (e.g., a general-purpose skill) is authored and builds correctly

---

## Open Questions

- **Openclaw exact format:** The ClawHub skill format needs to be confirmed against Openclaw's documentation before the `openclaw.md` template is finalized
- **`dist/` commit strategy:** Currently committed; reconsider if dist/ grows very large
- **Claude Code plugin install URL format:** Needs to be verified against actual Claude Code plugin install syntax
