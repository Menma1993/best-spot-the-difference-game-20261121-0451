// Spot the Shift — game logic: panels, clicks, magnifier, HUD, audio,
// levels, timer, hints, pause, keyboard, cover, and the ?shot / ?selftest hooks.
(function () {
  'use strict';

  var PANEL_W = 640;
  var PANEL_H = 480;
  var TIME_PER_LEVEL = 180;
  var HINTS_PER_LEVEL = 3;

  var sceneIndex = 0;
  var found = {};
  var foundCount = 0;
  var combo = 0;
  var bestCombo = 0;
  var score = 0;
  var hintsLeft = HINTS_PER_LEVEL;
  var timeLeft = TIME_PER_LEVEL;
  var paused = false;
  var started = false;
  var levelDone = false;
  var hintMark = null; // { index, until }
  var missMark = null; // { x, y, until }
  var needsRender = true;
  var soundOn = true;
  var audioCtx = null;

  function $(id) {
    return document.getElementById(id);
  }

  var leftCtx = $('panel-left').getContext('2d');
  var rightCtx = $('panel-right').getContext('2d');
  var lens = $('lens');
  var lensCtx = lens.getContext('2d');

  function scene() {
    return window.SCENES[sceneIndex];
  }

  // ---------- audio (WebAudio blips, created on first gesture) ----------
  function tone(freq, dur, type, vol, delay) {
    if (!soundOn) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      var t0 = audioCtx.currentTime + (delay || 0);
      var o = audioCtx.createOscillator();
      var g = audioCtx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start(t0);
      o.stop(t0 + dur + 0.03);
    } catch (e) {
      /* audio unavailable: the game plays on silently */
    }
  }
  function blip() {
    tone(740, 0.09, 'sine', 0.16);
    tone(1108, 0.12, 'sine', 0.1, 0.06);
  }
  function buzz() {
    tone(150, 0.18, 'square', 0.1);
  }
  function chime() {
    tone(523, 0.14, 'sine', 0.16);
    tone(659, 0.14, 'sine', 0.16, 0.11);
    tone(784, 0.22, 'sine', 0.16, 0.22);
  }

  // ---------- rendering ----------
  function drawRings(ctx) {
    var diffs = scene().diffs;
    var now = Date.now();
    ctx.save();
    for (var i = 0; i < diffs.length; i++) {
      if (!found[i]) continue;
      var d = diffs[i];
      ctx.strokeStyle = '#37d67a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r + 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(55,214,122,0.16)';
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r + 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#37d67a';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(d.x - 8, d.y);
      ctx.lineTo(d.x - 2, d.y + 6);
      ctx.lineTo(d.x + 9, d.y - 6);
      ctx.stroke();
    }
    if (hintMark && now < hintMark.until) {
      var hd = diffs[hintMark.index];
      var pulse = 1 + 0.18 * Math.sin(now / 130);
      ctx.strokeStyle = '#ffb03d';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(hd.x, hd.y, (hd.r + 10) * pulse, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (missMark && now < missMark.until) {
      ctx.strokeStyle = '#ff5a5a';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      var mx = missMark.x;
      var my = missMark.y;
      ctx.beginPath();
      ctx.moveTo(mx - 9, my - 9);
      ctx.lineTo(mx + 9, my + 9);
      ctx.moveTo(mx + 9, my - 9);
      ctx.lineTo(mx - 9, my + 9);
      ctx.stroke();
    }
    ctx.restore();
  }

  function render() {
    var s = scene();
    s.draw(leftCtx, PANEL_W, PANEL_H, false);
    s.draw(rightCtx, PANEL_W, PANEL_H, true);
    drawRings(leftCtx);
    drawRings(rightCtx);
    needsRender = false;
  }

  // Re-render on a short tick while a hint or a miss flash is alive.
  setInterval(function () {
    var now = Date.now();
    if (needsRender) {
      render();
      return;
    }
    if ((hintMark && now < hintMark.until) || (missMark && now < missMark.until)) {
      render();
    }
  }, 120);

  // ---------- HUD ----------
  function updateHUD() {
    var remaining = scene().diffs.length - foundCount;
    $('counter-num').textContent = remaining;
    $('counter-label').textContent = remaining === 1 ? 'to find' : 'to find';
    $('combo').textContent = combo > 1 ? 'COMBO x' + combo : 'COMBO —';
    $('score').textContent = 'SCORE ' + score;
    $('level-name').textContent = 'LEVEL ' + (sceneIndex + 1) + ' · ' + scene().name;
    $('timer-fill').style.width = Math.max(0, (timeLeft / TIME_PER_LEVEL) * 100) + '%';
    $('timer-text').textContent = Math.ceil(timeLeft) + 's';
    $('hint-btn').textContent = 'HINT (' + hintsLeft + ')';
    $('hint-btn').classList.toggle('empty', hintsLeft <= 0);
    var chips = '';
    var diffs = scene().diffs;
    for (var i = 0; i < diffs.length; i++) {
      chips += '<span class="chip' + (found[i] ? ' got' : '') + '">' + diffs[i].name + '</span>';
    }
    $('found-list').innerHTML = chips;
    var pills = '';
    for (var j = 0; j < window.SCENES.length; j++) {
      pills += '<button class="pill' + (j === sceneIndex ? ' active' : '') + '" data-level="' + j + '">' + (j + 1) + '</button>';
    }
    $('level-pills').innerHTML = pills;
  }

  // ---------- level flow ----------
  function loadLevel(index) {
    sceneIndex = index;
    found = {};
    foundCount = 0;
    combo = 0;
    hintsLeft = HINTS_PER_LEVEL;
    timeLeft = TIME_PER_LEVEL;
    paused = false;
    levelDone = false;
    hintMark = null;
    missMark = null;
    $('complete').classList.add('hidden');
    $('paused-badge').classList.add('hidden');
    $('pause-btn').textContent = 'II PAUSE';
    needsRender = true;
    render();
    updateHUD();
  }

  function levelComplete() {
    levelDone = true;
    score += Math.round(timeLeft) * 5;
    chime();
    var stars = timeLeft > 120 ? 3 : timeLeft > 60 ? 2 : 1;
    $('complete-stars').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    $('complete-text').textContent =
      'All 8 differences found in ' + scene().name + '!  Score ' + score + '.';
    $('next-btn').textContent = sceneIndex < window.SCENES.length - 1 ? 'NEXT LEVEL →' : 'PLAY AGAIN';
    $('complete').classList.remove('hidden');
    updateHUD();
  }

  function timeUp() {
    levelDone = true;
    buzz();
    $('complete-stars').textContent = '☆☆☆';
    $('complete-text').textContent = "Time's up in " + scene().name + ' — the differences are still hiding.';
    $('next-btn').textContent = 'TRY AGAIN';
    $('complete').classList.remove('hidden');
    updateHUD();
  }

  setInterval(function () {
    if (!started || paused || levelDone) return;
    timeLeft -= 0.25;
    if (timeLeft <= 0) {
      timeLeft = 0;
      timeUp();
    }
    updateHUD();
  }, 250);

  // ---------- clicks ----------
  function tryClick(x, y) {
    if (!started || paused || levelDone) return false;
    var diffs = scene().diffs;
    var best = -1;
    var bestD = 1e9;
    for (var i = 0; i < diffs.length; i++) {
      if (found[i]) continue;
      var dx = x - diffs[i].x;
      var dy = y - diffs[i].y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d <= diffs[i].r + 10 && d < bestD) {
        best = i;
        bestD = d;
      }
    }
    if (best >= 0) {
      found[best] = true;
      foundCount++;
      combo++;
      if (combo > bestCombo) bestCombo = combo;
      score += 100 + combo * 25;
      blip();
      needsRender = true;
      render();
      updateHUD();
      if (foundCount === diffs.length) levelComplete();
      return true;
    }
    combo = 0;
    buzz();
    missMark = { x: x, y: y, until: Date.now() + 700 };
    needsRender = true;
    render();
    updateHUD();
    return false;
  }

  function canvasClick(ev) {
    var rect = ev.currentTarget.getBoundingClientRect();
    var x = ((ev.clientX - rect.left) / rect.width) * PANEL_W;
    var y = ((ev.clientY - rect.top) / rect.height) * PANEL_H;
    tryClick(x, y);
  }
  $('panel-left').addEventListener('click', canvasClick);
  $('panel-right').addEventListener('click', canvasClick);

  // ---------- magnifier lens ----------
  function showLens(ev) {
    var canvas = ev.currentTarget;
    var rect = canvas.getBoundingClientRect();
    var x = ((ev.clientX - rect.left) / rect.width) * PANEL_W;
    var y = ((ev.clientY - rect.top) / rect.height) * PANEL_H;
    var size = 150;
    var zoom = 2;
    var src = size / zoom;
    lens.style.display = 'block';
    lens.style.left = Math.min(window.innerWidth - size - 8, ev.clientX + 18) + 'px';
    lens.style.top = Math.max(8, ev.clientY - size - 14) + 'px';
    lensCtx.save();
    lensCtx.clearRect(0, 0, size, size);
    lensCtx.beginPath();
    lensCtx.arc(size / 2, size / 2, size / 2 - 3, 0, Math.PI * 2);
    lensCtx.clip();
    lensCtx.drawImage(canvas, x - src / 2, y - src / 2, src, src, 0, 0, size, size);
    lensCtx.restore();
    lensCtx.strokeStyle = '#ffd23d';
    lensCtx.lineWidth = 4;
    lensCtx.beginPath();
    lensCtx.arc(size / 2, size / 2, size / 2 - 3, 0, Math.PI * 2);
    lensCtx.stroke();
  }
  function hideLens() {
    lens.style.display = 'none';
  }
  $('panel-left').addEventListener('mousemove', showLens);
  $('panel-right').addEventListener('mousemove', showLens);
  $('panel-left').addEventListener('mouseleave', hideLens);
  $('panel-right').addEventListener('mouseleave', hideLens);

  // ---------- hint / pause / sound ----------
  function useHint() {
    if (!started || paused || levelDone || hintsLeft <= 0) return;
    var diffs = scene().diffs;
    var open = [];
    for (var i = 0; i < diffs.length; i++) if (!found[i]) open.push(i);
    if (open.length === 0) return;
    hintsLeft--;
    hintMark = { index: open[Math.floor(Math.random() * open.length)], until: Date.now() + 3000 };
    tone(880, 0.1, 'sine', 0.12);
    needsRender = true;
    render();
    updateHUD();
  }
  $('hint-btn').addEventListener('click', useHint);

  function togglePause() {
    if (!started || levelDone) return;
    paused = !paused;
    $('pause-btn').textContent = paused ? '▶ RESUME' : 'II PAUSE';
    $('paused-badge').classList.toggle('hidden', !paused);
    updateHUD();
  }
  $('pause-btn').addEventListener('click', togglePause);

  $('sound-btn').addEventListener('click', function () {
    soundOn = !soundOn;
    $('sound-btn').textContent = soundOn ? 'SOUND ON' : 'SOUND OFF';
  });

  $('level-pills').addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-level]');
    if (!b || !started) return;
    loadLevel(parseInt(b.getAttribute('data-level'), 10));
  });

  $('next-btn').addEventListener('click', function () {
    if (sceneIndex < window.SCENES.length - 1) loadLevel(sceneIndex + 1);
    else loadLevel(0);
  });

  $('retry-btn').addEventListener('click', function () {
    loadLevel(sceneIndex);
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'h' || ev.key === 'H') useHint();
    else if (ev.key === 'p' || ev.key === 'P' || ev.key === 'Escape') togglePause();
    else if (ev.key >= '1' && ev.key <= '6' && started) loadLevel(parseInt(ev.key, 10) - 1);
    else if (ev.key === 'Enter' && !started) startGame();
  });

  // ---------- cover / start ----------
  function startGame() {
    started = true;
    $('cover').classList.add('hidden');
    loadLevel(sceneIndex);
  }
  $('start-btn').addEventListener('click', startGame);
  $('cover-levels').addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-level]');
    if (!b) return;
    sceneIndex = parseInt(b.getAttribute('data-level'), 10);
    startGame();
  });

  // Cover level buttons.
  (function () {
    var html = '';
    for (var i = 0; i < window.SCENES.length; i++) {
      html += '<button class="cover-level" data-level="' + i + '">' + (i + 1) + '. ' + window.SCENES[i].name + '</button>';
    }
    $('cover-levels').innerHTML = html;
  })();

  // ---------- ?shot / ?selftest hooks (screenshots + automated play-test) ----------
  var params = new URLSearchParams(window.location.search);
  var shot = params.get('shot');
  var selftest = params.get('selftest');
  if (selftest) {
    var ti = window.SCENES.findIndex(function (s) {
      return s.id === selftest;
    });
    if (ti >= 0) {
      started = true;
      $('cover').classList.add('hidden');
      loadLevel(ti);
      var diffs = scene().diffs;
      var ok = 0;
      for (var k = 0; k < diffs.length; k++) {
        if (tryClick(diffs[k].x, diffs[k].y)) ok++;
      }
      var verdict = ok === diffs.length ? 'PASS' : 'FAIL';
      var text = 'SELFTEST ' + selftest + ' ' + ok + '/' + diffs.length + ' ' + verdict;
      $('selftest').textContent = text;
      document.title = text;
    }
  } else if (shot && shot !== 'cover') {
    var si = window.SCENES.findIndex(function (s) {
      return s.id === shot;
    });
    if (si >= 0) {
      started = true;
      paused = true; // frozen timer: clean stills for screenshots
      $('cover').classList.add('hidden');
      loadLevel(si);
      paused = true;
      $('paused-badge').classList.add('hidden');
    }
  }

  // First paint: cover over a preview of scene 1.
  if (!started) {
    loadLevel(0);
    started = false;
    $('complete').classList.add('hidden');
  }
  updateHUD();
})();
