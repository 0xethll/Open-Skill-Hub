# Open Skill Hub

A personal AI skill library for **Claude** and **Openclaw**, covering all industries and domains.

---

## Install

### Codex — marketplace

In Codex, use **Add marketplace** with this repository as the source.
Leave sparse paths empty, or include both paths below:

```text
.agents/plugins
plugins/open-skill-hub
```

### Claude

```bash
mkdir -p ~/.claude/skills/<name>
cp skills/<name>/skill.md ~/.claude/skills/<name>/SKILL.md
```

### Openclaw

See [ClawHub](https://openclaw.ai/) for Openclaw skill installation instructions.

---

## Skills

| Skill | Domain | Claude | Openclaw | Codex |
|-------|--------|:------:|:--------:|:-----:|
| [contract-review](skills/contract-review/README.md) | Legal | ✅ | ✅ | ✅ |
| [x-post-strategist](skills/x-post-strategist/README.md) | Writing | ✅ | ✅ | ✅ |

---

## Adding a Skill

1. Create a directory under `skills/<your-skill-name>/`
2. Add `README.md` and the shared canonical `skill.md`
3. Add platform-specific overrides only when needed:
   - `platforms/claude/SKILL.md`
   - `platforms/openclaw/skill.md`
4. Add a row to the Skills table above

---

## License

MIT
