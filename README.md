# Spot the Shift — a spot-the-difference game

[![Spot the Difference](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![Rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Menma1993/best-spot-the-difference-game-20261121-0451/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![Reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Menma1993/best-spot-the-difference-game-20261121-0451/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)

Two pictures look the same — but the right one has 8 sneaky changes. Click a
difference on either picture to ring it. Wrong clicks cost 5 seconds.

## The game

- **6 original scenes, 48 fair differences**: Coral Reef Dive, Forest Campfire,
  Grandma's Kitchen, Toy Workshop, Desert Oasis Caravan, Winter Ski Lodge.
  Every difference is one of: removed, added, recoloured, moved, resized or
  flipped — fair, never hidden behind pixels.
- **Magnifier on hover** — hold the cursor over a picture to zoom in 2×.
- **Found list** — every difference you find is named in the list under the
  pictures, so the hunt stays readable.
- **Combo & streak multiplier** — consecutive finds raise the points per find
  (up to ×3); a wrong click resets the combo and costs 5 seconds.
- **Pulsing hint** — 3 hints per scene, each one throbs right on a difference
  you have not found yet.
- **Timer bar + par time** — each scene has its own par; finishing with time
  left earns a bonus and up to 3 stars.
- **Sound, no files** — chimes, buzzes and fanfares are synthesized live with
  WebAudio (oscillators only).
- **Keyboard play** — H hint, P pause, M sound, R restart, N next scene,
  1–6 jump to a scene, arrow keys move the crosshair, Enter guesses.
- **Pause, restart, level select, results screen** with final score, stars,
  differences found and best combo.

All art is drawn procedurally on canvas (flat vector, no image or sound files,
zero network requests). The game is static files under `game/` — serve them
with any static server and open `game/index.html` in desktop Chrome.

## Layout

- `main.ts` — the entry program: copies `game/` + `screenshots/` to `/output`
  and writes `/output/dossier.json` with the vendored make.fun library.
- `game/index.html` — page, HUD, styles.
- `game/src/main.js` — bootstrap, render loop, guess handling, effects.
- `game/src/state.js` — score, combo, timer, hints, stars.
- `game/src/scenes.js` — the 6 scenes and their 48 differences.
- `game/src/render.js` — small canvas-drawing helpers.
- `game/src/draw-reef.js`, `draw-camp.js`, `draw-kitchen.js`,
  `draw-workshop.js`, `draw-oasis.js`, `draw-lodge.js` — one procedural
  painter per scene.
- `game/src/input.js` — pointer + keyboard input, magnifier, crosshair.
- `game/src/audio.js` — WebAudio synth (no audio files).
- `game/src/hud.js` — DOM HUD: counter, timer bar, found list, overlays.
- `vendor/makefun-game.ts` — the kit's library, unchanged.
