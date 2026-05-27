// Canvas-based snow effect with a small toggle persisted to localStorage
(function () {
  const KEY = 'snowEnabled';
  let canvas, ctx, flakes = [], running = false, width = 0, height = 0;

  function createCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas';
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function makeFlakes(count = 75) {
    flakes = [];
    for (let i = 0; i < count; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * -height,
        r: Math.random() * 3 + 1,
        d: Math.random() * 1,
        vx: (Math.random() * 0.6) - 0.3
      });
    }
  }

  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    for (let f of flakes) {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function update() {
    if (!running) return;
    for (let f of flakes) {
      f.y += f.r * 0.3 + f.d * 0.5; // slower, calmer fall
      f.x += f.vx;
      if (f.y > height + 5) {
        f.y = -5;
        f.x = Math.random() * width;
      }
      if (f.x > width + 5) f.x = -5;
      if (f.x < -5) f.x = width + 5;
    }
    draw();
    requestAnimationFrame(update);
  }

  function start() {
    if (running) return;
    running = true;
    if (!canvas) createCanvas();
    makeFlakes(Math.max(30, Math.floor(window.innerWidth / 20)));
    requestAnimationFrame(update);
  }

  function stop() {
    running = false;
    if (canvas && canvas.parentElement) canvas.parentElement.removeChild(canvas);
    canvas = null;
  }

  // Toggle and persistence
  function toggle() {
    const enabled = JSON.parse(localStorage.getItem(KEY) || 'true');
    const next = !enabled;
    localStorage.setItem(KEY, JSON.stringify(next));
    if (next) start(); else stop();
    updateToggleUI(next);
  }

  function updateToggleUI(enabled) {
    let btn = document.querySelector('.snow-toggle');
    if (!btn) return;
    btn.textContent = enabled ? '❄ Snow: On' : '❄ Snow: Off';
  }

  // Initialize based on localStorage
  function init() {
    const stored = JSON.parse(localStorage.getItem(KEY) || 'true');
    // create toggle UI if missing
    let btn = document.querySelector('.snow-toggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'snow-toggle top-control';
      document.body.appendChild(btn);
      btn.addEventListener('click', toggle);
    }
    updateToggleUI(stored);
    if (stored) start();
  }

  // Expose toggle globally for debugging
  window.toggleSnow = toggle;
  document.addEventListener('DOMContentLoaded', init);
})();
