export function bindHud(callbacks) {
  const cb = callbacks || {};
  const sceneLabel = document.getElementById('scene-label');
  const remainingBig = document.getElementById('remaining-big');
  const timerText = document.getElementById('timer-text');
  const timerFill = document.getElementById('timer-fill');
  const scoreVal = document.getElementById('score-val');
  const comboVal = document.getElementById('combo-val');
  const hintBtn = document.getElementById('hint-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const soundBtn = document.getElementById('sound-btn');
  const restartBtn = document.getElementById('restart-btn');
  const levelRow = document.getElementById('level-row');
  const foundList = document.getElementById('found-list');
  const overlay = document.getElementById('overlay');
  const overlayCard = document.getElementById('overlay-card');
  const msgLine = document.getElementById('msg-line');

  const EMPTY_FOUND = 'Nothing found yet — click a difference on either picture.';
  const levelNames = [];

  function setText(el, text) {
    if (el) el.textContent = text;
  }

  function setHtml(el, html) {
    if (el) el.innerHTML = html;
  }

  function wire(id, handler) {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = handler;
  }

  function showOverlay() {
    if (overlay) overlay.classList.remove('hidden');
  }

  if (hintBtn) hintBtn.onclick = function () { if (cb.onHint) cb.onHint(); };
  if (pauseBtn) pauseBtn.onclick = function () { if (cb.onPause) cb.onPause(); };
  if (soundBtn) soundBtn.onclick = function () { if (cb.onSound) cb.onSound(); };
  if (restartBtn) restartBtn.onclick = function () { if (cb.onRestart) cb.onRestart(); };

  function setScene(index, scene, totalScenes) {
    const total = totalScenes || 0;
    if (scene && scene.name) levelNames[index] = scene.name;
    setText(sceneLabel, 'Scene ' + (index + 1) + ' of ' + total + ' — ' + (scene && scene.name ? scene.name : ''));

    if (!levelRow) return;
    levelRow.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = (i + 1) + '. ' + (levelNames[i] || ('Scene ' + (i + 1)));
      if (i === index) btn.classList.add('active');
      if (i < index) btn.classList.add('done');
      (function (idx) {
        btn.onclick = function () { if (cb.onLevel) cb.onLevel(idx); };
      })(i);
      levelRow.appendChild(btn);
    }
  }

  function setRemaining(found, total) {
    const left = total - found;
    setText(remainingBig, left > 0 ? left + ' to find' : 'All found!');
  }

  function setTimer(secondsLeft, par) {
    const secs = Math.max(0, Math.floor(secondsLeft || 0));
    const mins = Math.floor(secs / 60);
    const rest = secs % 60;
    setText(timerText, mins + ':' + (rest < 10 ? '0' + rest : rest));
    if (timerFill) {
      const pct = par > 0 ? Math.max(0, Math.min(100, (secondsLeft / par) * 100)) : 0;
      timerFill.style.width = pct + '%';
    }
    if (timerText) {
      if (secs <= 10) timerText.classList.add('low');
      else timerText.classList.remove('low');
    }
  }

  function setScore(score) {
    setText(scoreVal, String(score));
  }

  function setCombo(combo) {
    setText(comboVal, combo >= 2 ? 'Combo x' + combo : '');
  }

  function setHints(n) {
    if (!hintBtn) return;
    hintBtn.textContent = 'Hint (' + n + ')';
    hintBtn.disabled = n <= 0;
  }

  function setFoundList(foundOrder) {
    const list = foundOrder || [];
    if (!foundList) return;
    if (list.length === 0) {
      foundList.innerHTML = EMPTY_FOUND;
      return;
    }
    let html = '';
    for (let i = 0; i < list.length; i++) {
      const name = (list[i] && list[i].name) || '';
      html += '<span class="found-chip">✓ ' + name + '</span>';
    }
    foundList.innerHTML = html;
  }

  function setPaused(paused) {
    setText(pauseBtn, paused ? 'Resume' : 'Pause');
  }

  function setMuted(muted) {
    setText(soundBtn, muted ? 'Sound: off' : 'Sound: on');
  }

  function setMessage(text) {
    setText(msgLine, text);
  }

  function showSceneComplete(scene, sceneScore, stars, hasNext) {
    showOverlay();
    const name = (scene && scene.name) || '';
    setHtml(overlayCard,
      '<h2>Scene complete!</h2>' +
      '<p>' + name + ' — ' + sceneScore + ' points, ' + stars + ' star' + (stars > 1 ? 's' : '') + '</p>' +
      (hasNext
        ? '<button id="overlay-next">Next scene →</button>'
        : '<button id="overlay-next">See results</button>'));
    wire('overlay-next', function () { if (cb.onNext) cb.onNext(); });
  }

  function showResults(score, stars, foundTotal, bestCombo) {
    showOverlay();
    setHtml(overlayCard,
      '<h2>All scenes complete!</h2>' +
      '<p>Final score: <b>' + score + '</b></p>' +
      '<p>Stars: ' + stars + ' / 18 · Differences found: ' + foundTotal + ' / 48 · Best combo: x' + bestCombo + '</p>' +
      '<button id="overlay-replay">Play again</button>');
    wire('overlay-replay', function () { if (cb.onReplay) cb.onReplay(); });
  }

  function showTimeout(foundTotal) {
    showOverlay();
    setHtml(overlayCard,
      '<h2>Time up!</h2>' +
      '<p>You found ' + foundTotal + ' of 48 differences.</p>' +
      '<button id="overlay-replay">Try again</button>');
    wire('overlay-replay', function () { if (cb.onReplay) cb.onReplay(); });
  }

  function hideOverlay() {
    if (overlay) overlay.classList.add('hidden');
  }

  return {
    setScene: setScene,
    setRemaining: setRemaining,
    setTimer: setTimer,
    setScore: setScore,
    setCombo: setCombo,
    setHints: setHints,
    setFoundList: setFoundList,
    setPaused: setPaused,
    setMuted: setMuted,
    setMessage: setMessage,
    showSceneComplete: showSceneComplete,
    showResults: showResults,
    showTimeout: showTimeout,
    hideOverlay: hideOverlay
  };
}
