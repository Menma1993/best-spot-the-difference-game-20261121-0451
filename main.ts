// Spot the Shift — a spot-the-difference game (Node 22, standard library only).
// Six original scenes, eight fair differences each: Coral Reef Dive, Forest
// Campfire, Grandma's Kitchen, Toy Workshop, Desert Oasis Caravan, Winter Ski
// Lodge. v2 rebuild: every scene redrawn much denser — three depth layers,
// 15-25 extra camouflage objects per scene, 2-3 tone shading + texture on
// every hero object, soft shadows and a vignette — and the differences made
// sneakier: pattern changes, 40-degree rotations, 1.2-1.3x resizes, small-part
// recolours, and moved objects that blend in. v2.1 polish: the four defects
// found by direct review are fixed (turtle ring no longer clipped, blue fish
// now changes tail-fin only, lodge armchair sits on the floor, skis lean on
// the right wall), plus a jellyfish and caustic light in the reef and warm
// fireplace / cool window light in the lodge. The game is this directory's
// game/ folder: plain static files a desktop browser loads offline
// (game/index.html and its ES modules, no library, no network request). This
// program hands it in: it copies game/ and screenshots/ from beside this file
// to /output and writes /output/dossier.json, the summary the judge reads,
// with the vendored make.fun library.
//
// Serve it locally with `node serve.ts` (or any static server), then open the
// game at http://localhost:8080. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'game'), join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the bytes; the others refuse an entry the
// scorer would refuse (more than 4 screenshots or one over 256 KiB; more than 993 files in game/ or 48 MiB of game
// files, in all, or a path under game/ over 1000 bytes: game/ counts beside /output's own 1000-entry cap, its
// screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);

// v2 build receipt: one line on stdout so a local run can be eyeballed
// (the grader only reads /output, so this changes no file it scores).
console.log(`Spot the Shift v2.1: game/ + screenshots/ copied to ${out}; dossier.json written.`);
