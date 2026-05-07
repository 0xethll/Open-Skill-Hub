# Open Skill Hub

A personal AI skill library for **Claude Code** and **Openclaw**, covering all industries and domains.

---

## Install

### Claude Code — full plugin

```bash
claude plugins install github:hanlynn/Open-Skill-Hub?path=dist/claude-code
```

### Claude Code — single skill (manual copy)

```bash
cp skills/<name>/claude-code.md ~/.claude/skills/<name>/SKILL.md
```

### Openclaw

See [ClawHub](https://openclaw.ai/) for Openclaw skill installation instructions.

---

## Skills

| Skill | Domain | Claude Code | Openclaw |
|-------|--------|:-----------:|:--------:|
| [contract-review](skills/contract-review/README.md) | Legal | ✅ | ✅ |
| [hello-world](skills/hello-world/README.md) | General | ✅ | ✅ |

---

## Build

Regenerate `dist/` after editing skills:

```bash
bun run build
```

---

## Adding a Skill

1. Create a directory under `skills/<your-skill-name>/`
2. Add `README.md` (description), `claude-code.md` (Claude Code format), `openclaw.md` (Openclaw format)
3. Run `bun run build`
4. Add a row to the Skills table above

---

## License

MIT
