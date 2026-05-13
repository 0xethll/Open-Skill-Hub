# Open Skill Hub

A personal AI plugin marketplace and skill library for AI coding agents, organized into domain-specific Codex plugins.

---

## Install

### Codex — marketplace

In Codex, use **Add marketplace** with this repository as the source.
Leave sparse paths empty, or include both paths below:

```text
.agents/plugins
plugins/legal
plugins/writing
```

### Claude

```bash
mkdir -p ~/.claude/skills/<name>
cp plugins/<domain>/skills/<name>/SKILL.md ~/.claude/skills/<name>/SKILL.md
```

### Openclaw

See [ClawHub](https://openclaw.ai/) for Openclaw skill installation instructions.

---

## Plugins And Skills

| Plugin | Skill | Domain | Claude | Openclaw | Codex |
|--------|-------|--------|:------:|:--------:|:-----:|
| [legal](plugins/legal/README.md) | [contract-review](plugins/legal/skills/contract-review/README.md) | Legal | ✅ | ✅ | ✅ |
| [writing](plugins/writing/README.md) | [x-post-strategist](plugins/writing/skills/x-post-strategist/README.md) | Writing | ✅ | ✅ | ✅ |

---

## Adding a Skill

1. Choose the domain plugin under `plugins/<domain>/`, or create a new domain plugin when the skill needs a separate install unit.
2. Create `plugins/<domain>/skills/<your-skill-name>/`
3. Add `README.md` and the canonical `SKILL.md`
4. Update the plugin `README.md`
5. Add or update the root table above
6. If you create a new plugin, add it to `.agents/plugins/marketplace.json`

---

## License

MIT
