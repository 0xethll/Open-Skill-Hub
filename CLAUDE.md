# AGENTS.md

## Purpose

This repository is a global, portable skill library for AI coding agents. Skills live inside domain-specific plugins under `plugins/<domain>/skills/<skill-name>/`.

Use this guide when creating, reviewing, or updating skills. It distills reusable authoring patterns from the reference OpenClaw skills without copying their domain-specific content.

## Repository Workflow

- Treat `plugins/` as the source of truth.
- Each Codex plugin should live in `plugins/<domain>/`.
- Each skill should live in `plugins/<domain>/skills/<skill-name>/`.
- Add a new domain plugin only when the skill needs a separate install unit, audience, risk boundary, or integration surface.
- When adding a new skill, update the plugin `README.md` and the root `README.md` Plugins And Skills table.
- When adding a new plugin, update `.agents/plugins/marketplace.json` (Codex) and `.claude-plugin/marketplace.json` (Claude Code).

## Git Workflow

- `main` is protected. Do not make implementation changes directly on `main`. Direct pushes to `main` are not allowed; all changes must go through a pull request.
- Before editing files, check the current branch with `git branch --show-current`.
- Create or switch to a feature branch for every implementation task, including code, documentation, skill, plugin, marketplace, and configuration changes.
- Use `codex/<short-task-name>` for Codex-created branches unless the user requests a different name.
- Keep branch names lowercase, kebab-case, and descriptive, such as `codex/plugin-marketplace-layout`.
- Do not commit directly to `main`; merge changes through a pull request or the repository's normal review process.

### Merging Pull Requests

- `main` only allows squash merges. Always use `--squash` when merging PRs.
- Always delete the remote branch after merging with `--delete-branch`.
- After merging, switch back to `main` and pull the latest changes.

Standard merge sequence:

```sh
gh pr merge <PR-number> --squash --delete-branch
git checkout main
git pull origin main
```

Standard skill layout:

| Path | Purpose |
| --- | --- |
| `README.md` | Human-facing overview, use cases, and scope. |
| `SKILL.md` | Shared canonical skill instructions used when a platform has no override. |
| `platforms/claude/SKILL.md` | Optional Claude specific entrypoint. |
| `platforms/openclaw/skill.md` | Optional OpenClaw-specific entrypoint. |

Optional directories for larger skills:

| Directory | Use When |
| --- | --- |
| `scripts/` | The skill needs tested helper commands or automation. |
| `references/` | The skill needs detailed background that should not crowd the main file. |
| `assets/` | The skill needs templates, examples, fixtures, or reusable documents. |
| `platforms/<platform>/` | The skill needs platform-specific frontmatter, metadata, references, assets, or wrappers. |

Keep `SKILL.md` useful on its own. Extra files should support the workflow, not hide the essential instructions.

Use this source structure for new skills:

```text
plugins/<domain>/
  README.md
  .codex-plugin/
    plugin.json
  .claude-plugin/
    plugin.json
  assets/
  skills/
    <skill-name>/
      README.md
      SKILL.md
      references/
      assets/
      scripts/
      platforms/
        claude-code/
          SKILL.md
        openclaw/
          skill.md
```

Most skills should start with only `README.md` and `SKILL.md`. Add platform-specific files only when the platform needs different frontmatter, metadata, naming, tool declarations, or behavioral instructions.

## Naming And Frontmatter

- Use lowercase kebab-case for skill names, such as `contract-review` or `api-timeout-debugging`.
- Keep names short, searchable, and action-oriented.
- Write frontmatter descriptions that answer two questions: what the skill does and when the agent should use it.
- Prefer specific trigger language over broad labels.

Good description:

```yaml
description: Use when the user wants to review, understand, or assess a contract in plain language.
```

Weak description:

```yaml
description: Contract stuff.
```

For OpenClaw skills, include platform metadata only when it is useful and accurate. Do not invent requirements, install steps, or tool permissions.

## Skill Structure

Start each skill with the role, the problem it solves, and the user-facing outcome. A reader should understand the skill in the first screen.

Recommended structure:

1. Frontmatter with name and trigger-focused description.
2. Title matching the skill name in human-readable form.
3. Short purpose statement.
4. Workflow or protocol with ordered steps.
5. Key rules and boundaries.
6. Output format, examples, or command reference when relevant.
7. Safety notes for risky operations.

Use sections that match the skill. A small skill can be direct and minimal; a complex skill should be explicit enough that another agent can execute it reliably.

For platform wrappers, keep the wrapper short when possible. It should either contain the platform-specific frontmatter plus the same instructions, or explain only the differences from the shared workflow when the packaging format supports that safely. Avoid maintaining two long divergent copies unless the platforms truly need different behavior.

## Writing Standards

- Write in clear international English.
- Avoid culture-specific idioms, jokes, or local assumptions that reduce clarity for global contributors.
- Prefer concrete workflows, checklists, tables, examples, command snippets, and output formats over abstract advice.
- Use strong language for required behavior: "must", "never", "always", "confirm before".
- Keep instructions operational. Tell the agent what to do, in what order, and what result to produce.
- Define interaction rhythm when it matters, such as asking one question at a time or waiting for the user's answer before continuing.
- Make edge cases visible, especially missing input, long input, unsafe requests, ambiguous goals, and unsupported tools.
- Avoid filler, motivational language, and generic claims that do not change agent behavior.

## Safety And Boundaries

Skills that touch files, external services, scripts, installs, credentials, browser sessions, or user data need explicit safety rules.

Include boundaries for:

- What files the skill may read or write.
- Whether network access is required and to which services.
- Which commands or binaries are expected.
- When user confirmation is required.
- What data must never be logged, stored, transmitted, or pasted into examples.
- How to handle secrets, tokens, API keys, credentials, private documents, and personal data.

For high-risk actions, require confirmation before proceeding. Examples include sending email, creating calendar events, installing code, running unknown scripts, changing system configuration, or using credentials.

When adapting reference skills, preserve their safety mindset: review before installing, use minimal permissions, reject obfuscated or suspicious code, and document assumptions.

## Platform Portability

Keep shared behavior in `SKILL.md`, and isolate platform-specific details under `platforms/<platform>/`.

- Do not assume a tool exists unless the skill documents it.
- Prefer portable instructions and plain Markdown.
- If a skill requires a binary, service, account, or setup step, state that requirement clearly.
- If a command supports JSON or non-interactive output, prefer that mode for agent workflows.
- Build packaging should prefer a platform override when present, then fall back to `SKILL.md`.
- Shared `references/`, `assets/`, and `scripts/` are copied to platform packages by default. Platform-specific files may override or extend them from `platforms/<platform>/`.

## Quality Checklist

Before considering a skill ready:

- The skill name is lowercase kebab-case.
- `README.md`, `SKILL.md`, and `CHANGELOG.md` exist for the skill.
- Frontmatter descriptions clearly state when to use the skill.
- The main workflow is executable without reading `reference/`.
- User interaction rules are explicit.
- Output expectations are clear.
- Safety boundaries are documented for any risky operation.
- Platform-specific differences are isolated under `platforms/<platform>/`.
- The plugin `README.md` and root `README.md` Plugins And Skills table are updated.
- New plugins are listed in `.agents/plugins/marketplace.json`.
