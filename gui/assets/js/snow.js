// Canvas-based snow effect with a small toggle persisted to localStorage
(function () {
  const KEY = 'snowEnabled';
  let canvas, ctx, flakes = [], running = false, width = 0, height = 0;

  function createCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas';
    canvas.className = 'snow-canvas';
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
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
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
    btn.innerHTML = enabled
      ? '<i class="fa-solid fa-snowflake"></i> Snow: On'
      : '<i class="fa-solid fa-snowflake"></i> Snow: Off';
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

    // create oneko toggle below snow button
    const CAT_KEY = 'onekoEnabled';
    let catBtn = document.querySelector('.oneko-toggle');
    if (!catBtn) {
      catBtn = document.createElement('button');
      catBtn.className = 'oneko-toggle top-control';
      document.body.appendChild(catBtn);
    }

    const catStored = JSON.parse(localStorage.getItem(CAT_KEY) || 'true');
    const cat = document.getElementById('oneko');
    if (cat) cat.style.display = catStored ? 'block' : 'none';
    catBtn.innerHTML = catStored
      ? '<i class="fa-solid fa-cat"></i> Cat: On'
      : '<i class="fa-solid fa-cat"></i> Cat: Off';

    catBtn.addEventListener('click', () => {
      const current = JSON.parse(localStorage.getItem(CAT_KEY) || 'true');
      const next = !current;
      localStorage.setItem(CAT_KEY, JSON.stringify(next));
      if (cat) cat.style.display = next ? 'block' : 'none';
      catBtn.innerHTML = next
        ? '<i class="fa-solid fa-cat"></i> Cat: On'
        : '<i class="fa-solid fa-cat"></i> Cat: Off';
    });

    // create CLI button below cat
    let cliBtn = document.querySelector('.cli-toggle');
    if (!cliBtn) {
      cliBtn = document.createElement('button');
      cliBtn.className = 'cli-toggle top-control';
      cliBtn.innerHTML = '<i class="fa-brands fa-arch-linux"></i> CLI';
      document.body.appendChild(cliBtn);
      cliBtn.addEventListener('click', () => {
        window.location.href = '../index.html?mode=cli';
      });
    }
  }

  // Expose toggle globally for debugging
  window.toggleSnow = toggle;
  document.addEventListener('DOMContentLoaded', init);
})();
