// Mini SoundCloud player: fetch metadata via oEmbed and use the SoundCloud Widget for playback
(function () {
  const TRACK_URL = 'https://soundcloud.com/a7iati/heartbroken';
  const CONTAINER_ID = 'mini-player';
  const SEEKBAR_MAX = 1000;
  let widgetApiPromise = null;

  function loadWidgetApi() {
    if (window.SC && window.SC.Widget) return Promise.resolve();
    if (widgetApiPromise) return widgetApiPromise;
    widgetApiPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('SoundCloud API failed to load'));
      document.body.appendChild(script);
    });
    return widgetApiPromise;
  }

  async function fetchMeta(url) {
    try {
      const res = await fetch('https://soundcloud.com/oembed?format=json&url=' + encodeURIComponent(url));
      if (!res.ok) throw new Error('oembed failed');
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  function formatTime(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes + ':' + String(seconds).padStart(2, '0');
  }

  async function init() {
    const container = document.getElementById(CONTAINER_ID);
    if (!container) return;
    container.innerHTML = '';

    const toggleBtn = document.querySelector('.music-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        container.classList.remove('is-hidden');
        toggleBtn.classList.add('is-hidden');
      });
    }

    const meta = await fetchMeta(TRACK_URL);

    const artWrap = document.createElement('div');
    artWrap.className = 'mini-player__artwork';
    const art = document.createElement('img');
    art.alt = 'Artwork';
    art.src = meta && meta.thumbnail_url ? meta.thumbnail_url.replace('-t500x500', '-t200x200') : 'assets/images/avatar.png';
    artWrap.appendChild(art);

    const body = document.createElement('div');
    body.className = 'mini-player__body';
    const title = document.createElement('div');
    title.className = 'mini-player__title';
    title.textContent = meta ? meta.title : 'Unknown Title';
    const artist = document.createElement('div');
    artist.className = 'mini-player__artist';
    artist.textContent = meta ? meta.author_name : 'Unknown Artist';

    const controls = document.createElement('div');
    controls.className = 'mini-player__controls';
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.textContent = '⏮';
    prevBtn.setAttribute('aria-label', 'Previous');
    const playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.textContent = '▶';
    playBtn.setAttribute('aria-label', 'Play/Pause');
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.textContent = '⏭';
    nextBtn.setAttribute('aria-label', 'Next');

    controls.appendChild(prevBtn);
    controls.appendChild(playBtn);
    controls.appendChild(nextBtn);

    const timeline = document.createElement('div');
    timeline.className = 'mini-player__timeline';
    const current = document.createElement('span');
    current.textContent = '0:00';
    const duration = document.createElement('span');
    duration.textContent = '0:00';
    const seek = document.createElement('input');
    seek.type = 'range';
    seek.min = 0;
    seek.max = SEEKBAR_MAX;
    seek.value = 0;

    timeline.appendChild(current);
    timeline.appendChild(seek);
    timeline.appendChild(duration);

    body.appendChild(title);
    body.appendChild(artist);
    body.appendChild(controls);
    body.appendChild(timeline);

    container.appendChild(artWrap);
    container.appendChild(body);

    const minimizeBtn = document.createElement('button');
    minimizeBtn.type = 'button';
    minimizeBtn.className = 'mini-player__minimize';
    minimizeBtn.textContent = '-';
    minimizeBtn.setAttribute('aria-label', 'Minimize');
    minimizeBtn.addEventListener('click', () => {
      container.classList.add('is-hidden');
      if (toggleBtn) toggleBtn.classList.remove('is-hidden');
    });
    container.appendChild(minimizeBtn);

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('frameborder', 'no');
    iframe.setAttribute('scrolling', 'no');
    iframe.src =
      'https://w.soundcloud.com/player/?url=' +
      encodeURIComponent(TRACK_URL) +
      '&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false';
    container.appendChild(iframe);

    await loadWidgetApi();
    const widget = window.SC && window.SC.Widget ? window.SC.Widget(iframe) : null;
    if (!widget) return;

    let isPlaying = false;
    let isReady = false;
    let durationMs = 0;
    let rafId = null;

    function stopTimeline() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    function updateTimeline() {
      if (!isReady) return;
      widget.getPosition((pos) => {
        current.textContent = formatTime(pos);
        if (durationMs > 0) {
          const ratio = Math.min(1, pos / durationMs);
          seek.value = Math.floor(ratio * SEEKBAR_MAX);
        }
      });
      rafId = requestAnimationFrame(updateTimeline);
    }

    widget.bind(window.SC.Widget.Events.READY, () => {
      isReady = true;
      widget.getDuration((dur) => {
        durationMs = dur || 0;
        duration.textContent = formatTime(durationMs);
      });
    });

    widget.bind(window.SC.Widget.Events.PLAY, () => {
      isPlaying = true;
      playBtn.textContent = '⏸';
      stopTimeline();
      updateTimeline();
    });

    widget.bind(window.SC.Widget.Events.PAUSE, () => {
      isPlaying = false;
      playBtn.textContent = '▶';
      stopTimeline();
    });

    widget.bind(window.SC.Widget.Events.FINISH, () => {
      isPlaying = false;
      playBtn.textContent = '▶';
      stopTimeline();
      seek.value = 0;
      current.textContent = '0:00';
    });

    playBtn.addEventListener('click', () => {
      if (!isReady) return;
      if (isPlaying) {
        widget.pause();
      } else {
        widget.play();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (!isReady) return;
      widget.seekTo(0);
    });

    nextBtn.addEventListener('click', () => {
      if (!isReady || durationMs <= 0) return;
      widget.seekTo(Math.max(0, durationMs - 1500));
    });

    seek.addEventListener('input', () => {
      if (!isReady || durationMs <= 0) return;
      const ratio = Number(seek.value) / SEEKBAR_MAX;
      widget.seekTo(Math.floor(durationMs * ratio));
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
