let ctx = null;
let muted = false;

function getCtx() {
  if (ctx) return ctx;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  } catch (e) {
    ctx = null;
  }
  return ctx;
}

function ensureRunning(c) {
  if (c && c.state === 'suspended') {
    try {
      c.resume();
    } catch (e) {
      // ignore
    }
  }
}

function tone(freq, dur, type, gain, when) {
  if (muted) return;
  const c = getCtx();
  if (!c) return;
  ensureRunning(c);

  try {
    const osc = c.createOscillator();
    const amp = c.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    const startTime = c.currentTime + (when || 0);
    const attack = 0.01;
    const stopTime = startTime + dur;

    amp.gain.setValueAtTime(0, startTime);
    amp.gain.linearRampToValueAtTime(gain, startTime + attack);
    amp.gain.linearRampToValueAtTime(0, stopTime);

    osc.connect(amp);
    amp.connect(c.destination);

    osc.start(startTime);
    osc.stop(stopTime + 0.02);
  } catch (e) {
    // ignore
  }
}

export function createAudio() {
  return {
    find() {
      tone(659, 0.09, 'sine', 0.2, 0);
      tone(880, 0.14, 'sine', 0.2, 0.09);
    },

    miss() {
      tone(110, 0.18, 'sawtooth', 0.12, 0);
    },

    hint() {
      tone(990, 0.08, 'sine', 0.1, 0);
    },

    win() {
      tone(523, 0.12, 'sine', 0.18, 0);
      tone(659, 0.12, 'sine', 0.18, 0.12);
      tone(784, 0.12, 'sine', 0.18, 0.24);
      tone(1047, 0.12, 'sine', 0.18, 0.36);
    },

    tick() {
      tone(1200, 0.03, 'square', 0.04, 0);
    },

    click() {
      tone(440, 0.05, 'sine', 0.12, 0);
    },

    setMuted(m) {
      muted = !!m;
    },

    isMuted() {
      return muted;
    }
  };
}
