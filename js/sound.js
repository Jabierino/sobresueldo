// Efectos mínimos sintetizados con WebAudio (sin archivos): máquina de escribir, caja registradora, flash y golpe.
let ctx = null, enabled = true;
export function setSound(on) { enabled = on; }
function ac() {
  if (!enabled) return null;
  try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); } catch { return null; }
  return ctx;
}
function noise(c, dur, freq, gain = 0.3, type = 'highpass') {
  const b = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 2;
  const s = c.createBufferSource(); s.buffer = b;
  const f = c.createBiquadFilter(); f.type = type; f.frequency.value = freq;
  const g = c.createGain(); g.gain.value = gain;
  s.connect(f).connect(g).connect(c.destination); s.start();
}
function tone(c, f, t0, dur, gain = 0.15, type = 'sine') {
  const o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = f;
  g.gain.setValueAtTime(gain, c.currentTime + t0); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + t0 + dur);
  o.connect(g).connect(c.destination); o.start(c.currentTime + t0); o.stop(c.currentTime + t0 + dur);
}
export const sfx = {
  type() { const c = ac(); if (c) noise(c, 0.04, 2500, 0.25); },
  cash() { const c = ac(); if (!c) return; noise(c, 0.08, 1500, 0.2); tone(c, 1568, 0.05, 0.25, 0.12); tone(c, 2093, 0.13, 0.4, 0.12); },
  flash() { const c = ac(); if (!c) return; tone(c, 3000, 0, 0.12, 0.05, 'square'); noise(c, 0.25, 4000, 0.35); },
  thud() { const c = ac(); if (!c) return; tone(c, 90, 0, 0.3, 0.4, 'triangle'); noise(c, 0.12, 300, 0.3, 'lowpass'); },
  win() { const c = ac(); if (!c) return; [523, 659, 784, 1047].forEach((f, i) => tone(c, f, i * 0.12, 0.3, 0.12, 'triangle')); },
  lose() { const c = ac(); if (!c) return; [392, 330, 262].forEach((f, i) => tone(c, f, i * 0.2, 0.4, 0.12, 'triangle')); },
};
