import { readdirSync, existsSync, mkdirSync, copyFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = new URL("..", import.meta.url).pathname;
const SKILLS_SRC = join(ROOT, "skills");
const CLAUDE_DIST = join(ROOT, "dist/claude-code/skills");
const OPENCLAW_DIST = join(ROOT, "dist/openclaw/skills");

const skills = readdirSync(SKILLS_SRC, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const skill of skills) {
  const src = join(SKILLS_SRC, skill);

  const ccSrc = join(src, "claude-code.md");
  if (existsSync(ccSrc)) {
    const dest = join(CLAUDE_DIST, skill);
    mkdirSync(dest, { recursive: true });
    copyFileSync(ccSrc, join(dest, "SKILL.md"));
  }

  const ocSrc = join(src, "openclaw.md");
  if (existsSync(ocSrc)) {
    const dest = join(OPENCLAW_DIST, skill);
    mkdirSync(dest, { recursive: true });
    copyFileSync(ocSrc, join(dest, "skill.md"));
  }
}

writeFileSync(
  join(ROOT, "dist/claude-code/package.json"),
  JSON.stringify({ name: "open-skill-hub", version: "0.1.0", type: "module" }, null, 2)
);

console.log(`Built ${skills.length} skill(s): ${skills.join(", ")}`);
