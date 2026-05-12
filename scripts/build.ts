import { readdirSync, existsSync, mkdirSync, copyFileSync, writeFileSync, rmSync, cpSync } from "node:fs";
import * as path from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SKILLS_SRC = path.join(ROOT, "skills");
const CLAUDE_DIST = path.join(ROOT, "dist/claude-code/skills");
const OPENCLAW_DIST = path.join(ROOT, "dist/openclaw/skills");
const SHARED_DIRS = ["references", "assets", "scripts"];

type Platform = {
  name: string;
  distRoot: string;
  outputFile: string;
  entryCandidates: string[];
  legacyFile: string;
};

const platforms: Platform[] = [
  {
    name: "claude-code",
    distRoot: CLAUDE_DIST,
    outputFile: "SKILL.md",
    entryCandidates: ["SKILL.md", "skill.md"],
    legacyFile: "claude-code.md",
  },
  {
    name: "openclaw",
    distRoot: OPENCLAW_DIST,
    outputFile: "skill.md",
    entryCandidates: ["skill.md", "SKILL.md"],
    legacyFile: "openclaw.md",
  },
];

const skills = readdirSync(SKILLS_SRC, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

rmSync(CLAUDE_DIST, { recursive: true, force: true });
rmSync(OPENCLAW_DIST, { recursive: true, force: true });
mkdirSync(CLAUDE_DIST, { recursive: true });
mkdirSync(OPENCLAW_DIST, { recursive: true });

function firstExisting(paths: string[]) {
  return paths.find(path => existsSync(path));
}

function copyIfExists(src: string, dest: string) {
  if (existsSync(src)) {
    cpSync(src, dest, { recursive: true });
  }
}

function buildPlatformSkill(skill: string, platform: Platform) {
  const src = path.join(SKILLS_SRC, skill);
  const platformSrc = path.join(src, "platforms", platform.name);
  const sharedEntry = path.join(src, "skill.md");
  const legacyEntry = path.join(src, platform.legacyFile);
  const platformEntries = platform.entryCandidates.map(file => path.join(platformSrc, file));
  const entry = firstExisting([...platformEntries, sharedEntry, legacyEntry]);

  if (!entry) {
    return false;
  }

  const dest = path.join(platform.distRoot, skill);
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });

  copyFileSync(entry, path.join(dest, platform.outputFile));

  for (const dir of SHARED_DIRS) {
    copyIfExists(path.join(src, dir), path.join(dest, dir));
  }

  if (existsSync(platformSrc)) {
    for (const item of readdirSync(platformSrc, { withFileTypes: true })) {
      if (platform.entryCandidates.includes(item.name)) {
        continue;
      }

      copyIfExists(path.join(platformSrc, item.name), path.join(dest, item.name));
    }
  }

  return true;
}

for (const skill of skills) {
  for (const platform of platforms) {
    buildPlatformSkill(skill, platform);
  }
}

writeFileSync(
  path.join(ROOT, "dist/claude-code/package.json"),
  JSON.stringify({ name: "open-skill-hub", version: "0.1.0", type: "module" }, null, 2)
);

console.log(`Built ${skills.length} skill(s): ${skills.join(", ")}`);
