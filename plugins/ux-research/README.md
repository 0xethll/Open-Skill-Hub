# Open Skill Hub — UX Research

UX research skills for AI coding agents. Helps researchers and product teams synthesize qualitative data, surface themes, and generate stakeholder-ready insights.

## Skills

| Skill | Description |
| --- | --- |
| [interview-synthesis](skills/interview-synthesis/README.md) | Synthesize user interviews, usability tests, focus groups, and survey open-ends into structured themes, quotes, and prioritized recommendations. |
| [user-research-synthesis](skills/user-research-synthesis/README.md) | Turn raw interview transcripts, usability notes, or survey responses into a structured insights report with themes, evidence, and recommendations. |

## Install

### Claude Code

```bash
mkdir -p ~/.claude/skills/interview-synthesis
cp plugins/ux-research/skills/interview-synthesis/SKILL.md ~/.claude/skills/interview-synthesis/SKILL.md

mkdir -p ~/.claude/skills/user-research-synthesis
cp plugins/ux-research/skills/user-research-synthesis/SKILL.md ~/.claude/skills/user-research-synthesis/SKILL.md
```

### Codex

Use **Add marketplace** with this repository as the source, and include `plugins/ux-research` in the sparse paths.

### Openclaw

See [ClawHub](https://openclaw.ai/) for Openclaw skill installation instructions.

## License

MIT
