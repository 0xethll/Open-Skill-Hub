# Open Skill Hub

An open, community-driven skill library for AI coding agents — covering every domain, compatible with Claude Code, Codex, and OpenClaw.

---

## Why Open Skill Hub

- **Community safety** — open contributions mean no single point of trust; the community reviews, vets, and improves every skill
- **Skill composition** — skills are designed to compose; meta-skills orchestrate others, enabling reusable pipelines not just individual prompts
- **Cross-agent compatibility** — each skill is tested and tagged across Claude Code, Codex, and OpenClaw, with a compatibility matrix per skill
- **Semantic versioning** — skills follow semver so agent configs can pin versions and avoid breaking changes
- **Domain expert validation** — high-stakes domains (legal, medical, finance) are backed by verified domain experts, not just prompt engineers

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
