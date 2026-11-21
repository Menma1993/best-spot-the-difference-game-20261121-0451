// Spot the Shift — make.fun program entrypoint (Node stdlib only).
// Copies game/ and screenshots/ into the output directory and writes
// dossier.json from them with the vendored makefun-game.ts library.
// Fully deterministic: same inputs write the same bytes every run.

import { cpSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : join(repoRoot, 'output');

// Fail fast with a plain message when the entry is incomplete, before
// buildDossier reports the same thing from inside the copied tree.
for (const needed of ['game', 'screenshots']) {
  const p = join(repoRoot, needed);
  if (!statSync(p, { throwIfNoEntry: false })?.isDirectory()) {
    throw new Error(`Spot the Shift: missing ${needed}/ next to main.ts`);
  }
}
const shots = readdirSync(join(repoRoot, 'screenshots')).filter((f) => !f.startsWith('.'));
if (shots.length < 3 || shots.length > 4) {
  throw new Error(`Spot the Shift: screenshots/ must hold 3 or 4 images, found ${shots.length}`);
}

// Empty the output directory's CONTENTS without removing the directory
// itself: in the grader sandbox the output dir lives under a read-only
// parent, so deleting it (which needs write access to the parent) fails.
// Clearing entries inside it only needs write access inside the dir.
mkdirSync(outDir, { recursive: true });
for (const entry of readdirSync(outDir)) {
  rmSync(join(outDir, entry), { recursive: true, force: true });
}

cpSync(join(repoRoot, 'game'), join(outDir, 'game'), { recursive: true });
cpSync(join(repoRoot, 'screenshots'), join(outDir, 'screenshots'), { recursive: true });

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
});

writeFileSync(join(outDir, 'dossier.json'), dossier);

console.log(`Spot the Shift -> ${outDir}`);
console.log(`dossier.json: ${dossier.length} bytes`);
