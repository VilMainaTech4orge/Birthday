// Add each recording to images/vernon/ using its matching name: chapter1.mp3 through chapter5.mp3.
var CHAPTERS = [
  {
    id: 'baby',
    number: 'Chapter One',
    title: 'The Little Boy Who Stole Our Hearts',
    blurb: '',                                  // optional sentence under the title
    layout: 'cinematic',
    audio: 'images/vernon/chapter1.mp3',
    photos: [
      { src: 'images/vernon/littlebaby.jpeg', caption: '' },
      { src: 'images/vernon/baby1.jpeg', caption: '' },
      { src: 'images/vernon/baby2.jpeg', caption: '' }
    ]
  },
  {
    id: 'childhood',
    number: 'Chapter Two',
    title: 'Look How Little You Were! 😂',
    blurb: '',
    layout: 'scrapbook',
    audio: 'images/vernon/chapter2.mp3',
    photos: [
      { src: 'images/vernon/baby4happy.jpeg', caption: '' },
      { src: 'images/vernon/littlebaby2.jpeg', caption: '' },
      { src: 'images/vernon/trainwalk.jpeg', caption: '' },
      { src: 'images/vernon/eating.jpeg', caption: '' }
    ]
  },
  {
    id: 'growing',
    number: 'Chapter Three',
    title: 'Growing Up, One Memory at a Time',
    blurb: '',
    layout: 'cinematic',
    audio: 'images/vernon/chapter3.mp3',
    photos: [
      { src: 'images/vernon/teeth2.jpeg', caption: '' },
      { src: 'images/vernon/Cute2.jpeg', caption: '' },
      { src: 'images/vernon/Cutebaby.jpeg', caption: '' }
    ]
  },
  {
    id: 'family',
    number: 'Chapter Four',
    title: 'The People Who Love You',
    blurb: '',
    layout: 'scrapbook',
    audio: 'images/vernon/chapter4.mp3',
    photos: [
      { src: 'images/vernon/family.jpeg', caption: '' },
      { src: 'images/vernon/sisters.jpeg', caption: '' },
      { src: 'images/vernon/family3.jpeg', caption: '' },
      { src: 'images/vernon/parents.jpeg', caption: '' }
    ]
  },
  {
    id: 'siblings',
    number: 'Chapter Five',
    title: 'Memories With Your Big Sister 💙',
    blurb: '',
    layout: 'cinematic',
    photos: [
      { src: 'images/vernon/Vilandvern.jpeg', caption: '' },
      { src: 'images/vernon/funny2.jpeg', caption: '' },
      { src: 'images/vernon/funny.jpeg', caption: '' },
      { src: 'images/vernon/sisphoto.jpeg', caption: '' }
    ]
  }
];
 
/* The photo collage in the final scene. Pick your favourites (up to 6 look best).
   You can reuse photos from the chapters above. */
var FINALE_PHOTOS = [
  { src: 'images/vernon/baby3.jpeg',      caption: '' },
  { src: 'images/vernon/family2.jpeg',    caption: '' },
  { src: 'images/vernon/Valandvern.jpeg',  caption: '' },
  { src: 'images/vernon/sisters.jpeg', caption: '' },
  { src: 'images/vernon/parents2.jpeg',  caption: '' },
  { src: 'images/vernon/funsisters.jpeg',    caption: '' }
];
 
/* Optional background music file (put your own royalty-free or original
   instrumental here). If this file isn't found, the page plays a soft
   built-in music-box tune instead, so the music button always works. */
var BACKGROUND_MUSIC = 'images/vernon/music.mp3';
 
/* The message shown at the start of every chapter. */
var HEADPHONES_MESSAGE = 'Put on your headphones, birthday boy. This part is from my heart to yours. 🎧💙';
 
 
/* ============================================================
   DON'T NEED TO EDIT BELOW THIS LINE 🙂
   ============================================================ */
(function () {
  'use strict';
 
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var params = new URLSearchParams(location.search);
 
  /* ---------- Stars ---------- */
  function addStars(root, n) {
    for (var i = 0; i < n; i++) {
      var s = el('i', 'star'), z = rnd(1.5, 3.5);
      s.style.cssText = 'left:' + rnd(0, 100) + '%;top:' + rnd(0, 100) + '%;width:' + z + 'px;height:' + z + 'px;--d:' + rnd(2, 5) + 's;--delay:' + rnd(0, 4) + 's';
      root.appendChild(s);
    }
  }
  addStars($('#sky'), 90);
  addStars($('#finaleSky'), 45);
 
  /* ---------- Confetti ---------- */
  var canvas = $('#confetti'), ctx = canvas.getContext('2d'), parts = [], raf = null, W = 0, H = 0;
  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize(); addEventListener('resize', resize);
  var palette = ['#3be3ff', '#2f5bea', '#8b6cff', '#86c8ff', '#ffffff', '#ffd84d'];
  function pick() { return palette[(Math.random() * palette.length) | 0]; }
  function burst(x, y, n) {
    if (reduceMotion) n = Math.ceil(n / 4);
    for (var i = 0; i < n; i++) {
      var a = rnd(-Math.PI, 0) + rnd(-.4, .4), sp = rnd(4, 11);
      parts.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, g: .22, w: rnd(6, 11), h: rnd(4, 7), r: rnd(0, 6.28), vr: rnd(-.3, .3), c: pick(), life: rnd(90, 150) });
    }
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function rain(n) {
    if (reduceMotion) n = Math.ceil(n / 4);
    for (var i = 0; i < n; i++) {
      parts.push({ x: rnd(0, W), y: rnd(-40, -5), vx: rnd(-1.2, 1.2), vy: rnd(1.5, 4), g: .025, w: rnd(6, 11), h: rnd(4, 7), r: rnd(0, 6.28), vr: rnd(-.25, .25), c: pick(), life: rnd(180, 280) });
    }
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    parts = parts.filter(function (q) { return q.life > 0 && q.y < H + 30; });
    parts.forEach(function (q) {
      q.vy += q.g; q.x += q.vx; q.y += q.vy; q.vx *= .99; q.r += q.vr; q.life--;
      ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.r);
      ctx.globalAlpha = Math.min(1, q.life / 40); ctx.fillStyle = q.c;
      ctx.fillRect(-q.w / 2, -q.h / 2, q.w, q.h); ctx.restore();
    });
    raf = parts.length ? requestAnimationFrame(frame) : null;
    if (!parts.length) ctx.clearRect(0, 0, W, H);
  }
 
  /* ---------- Hero balloons ---------- */
  (function () {
    var box = $('#balloons'), cols = ['#2f5bea', '#3be3ff', '#8b6cff', '#86c8ff', '#d9e4f5', '#4a73f0'];
    for (var i = 0; i < 10; i++) {
      var b = el('div', 'fb');
      b.style.cssText = 'left:' + (4 + i * 9.5) + '%;--c:' + cols[i % cols.length] + ';--s:' + rnd(34, 58) + 'px;--t:' + rnd(12, 20) + 's;--delay:-' + rnd(0, 18) + 's';
      box.appendChild(b);
    }
  })();
 
  /* ---------- Scroll reveal + progress ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  function observeReveals(root) { $$('.reveal', root).forEach(function (n) { io.observe(n); }); }
 
  var scrollProgress = 0;
  function onScroll() {
    var max = document.documentElement.scrollHeight - innerHeight;
    scrollProgress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    $('#scrollProgress').style.width = (scrollProgress * 100) + '%';
    Music.setProgress(scrollProgress);
  }
 
  /* ============================================================
     PHOTOS
     ============================================================ */
  function placeholder(photo) {
    var d = el('div', 'ph');
    d.innerHTML = '<span aria-hidden="true">📸</span><b></b><small>Your photo goes here</small>';
    $('b', d).textContent = photo.src;
    return d;
  }
  function makePhoto(photo, cls) {
    var fig = el('figure', 'photo ' + (cls || ''));
    var img = new Image();
    img.alt = photo.alt || photo.caption || 'A photograph from your story';
    img.decoding = 'async';
    img.loading = 'lazy';
    img.addEventListener('load', function () {
      fig.classList.add('loaded');
      fig.style.setProperty('--bg', 'url("' + photo.src + '")');
    });
    img.addEventListener('error', function () {
      fig.classList.add('missing');
      if (img.parentNode) img.remove();
      fig.insertBefore(placeholder(photo), fig.firstChild);
    });
    img.src = photo.src;
    fig.appendChild(img);
    var cap = el('figcaption'); cap.textContent = photo.caption || '';
    fig.appendChild(cap);
    return fig;
  }
 
  /* ============================================================
     LIGHTBOX (full-screen photos)
     ============================================================ */
  var lb = { items: [], i: 0, opener: null };
  function lbShow() {
    var it = lb.items[lb.i];
    $('#lbImg').src = it.src; $('#lbImg').alt = it.alt;
    $('#lbCap').textContent = it.caption;
    var many = lb.items.length > 1;
    $('#lbPrev').hidden = !many; $('#lbNext').hidden = !many;
  }
  function lbOpen(group, fig) {
    var figs = $$('figure.photo.loaded', group);
    lb.items = figs.map(function (f) {
      var im = $('img', f);
      return { src: im.currentSrc || im.src, alt: im.alt, caption: $('figcaption', f).textContent };
    });
    lb.i = Math.max(0, figs.indexOf(fig));
    lb.opener = document.activeElement;
    lbShow();
    $('#lightbox').hidden = false;
    document.body.classList.add('locked');
    $('#lbClose').focus();
  }
  function lbClose() {
    $('#lightbox').hidden = true;
    document.body.classList.remove('locked');
    if (lb.opener && lb.opener.focus) lb.opener.focus();
  }
  function lbStep(d) { lb.i = (lb.i + d + lb.items.length) % lb.items.length; lbShow(); }
  $('#lbClose').addEventListener('click', lbClose);
  $('#lbPrev').addEventListener('click', function () { lbStep(-1); });
  $('#lbNext').addEventListener('click', function () { lbStep(1); });
  $('#lightbox').addEventListener('click', function (e) { if (e.target === this) lbClose(); });
  document.addEventListener('keydown', function (e) {
    if ($('#lightbox').hidden) return;
    if (e.key === 'Escape') lbClose();
    if (e.key === 'ArrowLeft') lbStep(-1);
    if (e.key === 'ArrowRight') lbStep(1);
  });
  // Open a photo when clicked (works for chapters and the finale collage)
  document.addEventListener('click', function (e) {
    var fig = e.target.closest && e.target.closest('figure.photo.loaded');
    if (!fig || fig.closest('.lightbox')) return;
    var group = fig.closest('.chapter') || fig.closest('.collage');
    if (group) lbOpen(group, fig);
  });
 
  /* ============================================================
     CHAPTERS
     ============================================================ */
  var groups = {};   // chapter id → { show(i), reset() }
 
  function buildStage(ch) {
    var stage = el('div', 'stage reveal');
    stage.setAttribute('role', 'group');
    stage.setAttribute('aria-label', ch.title + ' photos');
    var figs = ch.photos.map(function (p, i) {
      var f = makePhoto(p, 'slide' + (i === 0 ? ' active' : ''));
      stage.appendChild(f);
      return f;
    });
    var dotsBox = el('div', 'dots'), dots = [], cur = 0;
    function show(i) {
      cur = (i + figs.length) % figs.length;
      figs.forEach(function (f, k) { f.classList.toggle('active', k === cur); });
      dots.forEach(function (d, k) { d.classList.toggle('active', k === cur); d.setAttribute('aria-current', k === cur ? 'true' : 'false'); });
    }
    if (figs.length > 1) {
      var prev = el('button', 'stage-nav prev', { type: 'button', 'aria-label': 'Previous photo' }); prev.textContent = '‹';
      var next = el('button', 'stage-nav next', { type: 'button', 'aria-label': 'Next photo' }); next.textContent = '›';
      prev.addEventListener('click', function () { show(cur - 1); });
      next.addEventListener('click', function () { show(cur + 1); });
      stage.appendChild(prev); stage.appendChild(next);
    }
    figs.forEach(function (f, i) {
      var d = el('button', 'dot' + (i === 0 ? ' active' : ''), { type: 'button', 'aria-label': 'Show photo ' + (i + 1) });
      d.addEventListener('click', function () { show(i); });
      dots.push(d); dotsBox.appendChild(d);
    });
    return { nodes: [stage, dotsBox], show: show, reset: function () { show(0); } };
  }
 
  function buildScrapbook(ch) {
    var wrap = el('div', 'scrap');
    var rots = [-3, 2, -1.5, 3, -2.5, 1.5, -2, 2.5];
    var figs = ch.photos.map(function (p, i) {
      var f = makePhoto(p, 'polaroid reveal' + (ch.id === 'childhood' && i === 3 ? ' fourth-photo' : ''));
      f.style.setProperty('--rot', rots[i % rots.length] + 'deg');
      wrap.appendChild(f);
      return f;
    });
    return {
      nodes: [wrap],
      show: function (i) { figs.forEach(function (f, k) { f.classList.toggle('spot', k === i); }); },
      reset: function () { figs.forEach(function (f) { f.classList.remove('spot'); }); }
    };
  }
 
  function indexAt(photos, t, d) {
    var allTimed = photos.every(function (p) { return typeof p.at === 'number'; });
    if (allTimed) { var idx = 0; photos.forEach(function (p, i) { if (t >= p.at) idx = i; }); return idx; }
    if (!d) return 0;
    return Math.min(photos.length - 1, Math.floor(t / d * photos.length));
  }
 
  function buildChapters() {
    var root = $('#chapters');
    CHAPTERS.forEach(function (ch) {
      var sec = el('section', 'chapter', { id: 'ch-' + ch.id, 'aria-labelledby': 'h-' + ch.id });
      var head = el('header', 'ch-head reveal');
      head.innerHTML = '<p class="ch-num"></p><h3 id="h-' + ch.id + '"></h3>';
      $('.ch-num', head).textContent = ch.number;
      $('h3', head).textContent = ch.title;
      if (ch.blurb) { var bl = el('p', 'ch-blurb'); bl.textContent = ch.blurb; head.appendChild(bl); }
      sec.appendChild(head);
 
      if (ch.audio) {
        var hp = el('div', 'hp-note reveal');
        hp.innerHTML = '<span aria-hidden="true">🎧</span><p></p>';
        $('p', hp).textContent = HEADPHONES_MESSAGE;
        sec.appendChild(hp);
      }
 
      var g = ch.layout === 'scrapbook' ? buildScrapbook(ch) : buildStage(ch);
      g.nodes.forEach(function (n) { sec.appendChild(n); });
      groups[ch.id] = g;
 
      if (ch.audio) {
        var slot = el('div', 'player-slot reveal');
        slot.dataset.audio = ch.audio;
        slot.dataset.label = ch.number + ': ' + ch.title.replace(/\s*[\u{1F300}-\u{1FAFF}\u2600-\u27BF]+\s*$/u, '');
        slot.__onTime = function (t, d) { g.show(indexAt(ch.photos, t, d)); };
        sec.appendChild(slot);
      }
 
      root.appendChild(sec);
    });
  }
 
  function buildCollage() {
    var box = $('#collage');
    FINALE_PHOTOS.forEach(function (p) {
      var f = makePhoto(p, 'reveal');
      box.appendChild(f);
    });
  }
 
  /* ============================================================
     VOICE PLAYERS  — only one voice plays at a time
     ============================================================ */
  var activeVoice = null;
  var allVoices = [];
  function fmt(s) { if (!isFinite(s)) s = 0; var m = Math.floor(s / 60), r = Math.floor(s % 60); return m + ':' + (r < 10 ? '0' : '') + r; }
 
  function initPlayer(slot) {
    var src = slot.dataset.audio, label = slot.dataset.label || 'Voice message';
    var onTime = slot.__onTime || null;
    slot.innerHTML =
      '<div class="player" data-state="loading">' +
      '<button class="pl-play" type="button"><span aria-hidden="true">▶</span></button>' +
      '<div class="pl-main"><p class="pl-label"></p>' +
      '<input class="pl-seek" type="range" min="0" max="1000" value="0" step="1" aria-label="Seek through the recording">' +
      '<div class="pl-row"><span class="pl-time">0:00 / 0:00</span><span class="pl-status"></span></div></div>' +
      '<button class="pl-replay" type="button" aria-label="Replay from the beginning">↺</button></div>';
    var box = $('.player', slot), play = $('.pl-play', slot), icon = $('.pl-play span', slot),
        seek = $('.pl-seek', slot), time = $('.pl-time', slot), status = $('.pl-status', slot), rep = $('.pl-replay', slot);
    $('.pl-label', slot).textContent = '🎙️ ' + label;
    play.setAttribute('aria-label', 'Play: ' + label);
 
    var audio = new Audio();
    audio.preload = 'metadata';
    var dragging = false, ready = false;
 
    function setState(s) { box.dataset.state = s; }
    function paint() {
      var d = audio.duration || 0, t = audio.currentTime || 0;
      time.textContent = fmt(t) + ' / ' + fmt(d);
      if (!dragging) { var v = d ? t / d * 1000 : 0; seek.value = v; seek.style.setProperty('--p', (v / 10) + '%'); }
      if (onTime) onTime(t, d);
    }
    var api = {
      pause: function () { audio.pause(); },
      reset: function () { audio.pause(); try { audio.currentTime = 0; } catch (e) {} paint(); }
    };
    allVoices.push(api);
 
    audio.addEventListener('loadedmetadata', function () { ready = true; setState('ready'); status.textContent = ''; paint(); });
    audio.addEventListener('durationchange', function () {
      if (isFinite(audio.duration) && audio.duration > 0 && box.dataset.state === 'playing') paint();
    });
    audio.addEventListener('error', function () {
      ready = false; setState('missing');
      status.textContent = 'Add audio file:';
      status.title = 'Add your recording as: ' + src;
      time.textContent = src;
      play.setAttribute('aria-disabled', 'true');
    });
    audio.addEventListener('timeupdate', paint);
    audio.addEventListener('play', function () {
      if (activeVoice && activeVoice !== api) activeVoice.pause();
      activeVoice = api; setState('playing'); icon.textContent = '❚❚';
      play.setAttribute('aria-label', 'Pause: ' + label); Music.setNarrating(true);
    });
    function stopped() {
      if (activeVoice === api) { activeVoice = null; Music.setNarrating(false); }
      if (box.dataset.state !== 'missing') setState('ready');
      icon.textContent = '▶'; play.setAttribute('aria-label', 'Play: ' + label);
    }
    audio.addEventListener('pause', stopped);
    audio.addEventListener('ended', stopped);
 
    play.addEventListener('click', function () {
      if (box.dataset.state === 'missing') return;
      if (audio.paused) { var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {}); } else audio.pause();
    });
    rep.addEventListener('click', function () {
      if (box.dataset.state === 'missing') return;
      audio.currentTime = 0; var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {});
    });
    seek.addEventListener('input', function () {
      dragging = true; seek.style.setProperty('--p', (seek.value / 10) + '%');
      if (ready && audio.duration) audio.currentTime = seek.value / 1000 * audio.duration;
    });
    seek.addEventListener('change', function () { dragging = false; paint(); });
 
    audio.src = src;
  }
 
  /* ============================================================
     BACKGROUND MUSIC
     Plays images/vernon/music.mp3 if available.
     If not, plays a soft music-box tune made live in the browser.
     ============================================================ */
  var Music = (function () {
    var wantPlaying = false, muted = false, vol = 0.5, narrating = false, progress = 0;
    var fileAudio = null, fileFailed = false, synth = null, cur = 0, easing = false;
 
    function target() {
      var build = 0.8 + 0.2 * progress;            // gentle build toward the finale
      return muted ? 0 : vol * (narrating ? 0.28 : 1) * build; // quieter while she speaks
    }
    function apply() {
      if (fileAudio && !fileFailed) fileAudio.volume = Math.max(0, Math.min(1, cur));
      if (synth) synth.setLevel(cur);
    }
    function ease() {
      if (easing) return; easing = true;
      (function step() {
        var t = target();
        cur += (t - cur) * 0.12;
        if (Math.abs(t - cur) < 0.003) { cur = t; easing = false; apply(); return; }
        apply(); requestAnimationFrame(step);
      })();
    }
 
    /* ----- the built-in synth tune ----- */
    function Synth() {
      var ac, level, run, delay, fb, padBus, bellBus, timer = null, step = 0, nextT = 0, prog = 0;
      var chords = [[261.63, 329.63, 392.00], [220.00, 261.63, 329.63], [174.61, 220.00, 261.63], [196.00, 246.94, 293.66]];
      var sparkle = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      function init() {
        var AC = window.AudioContext || window.webkitAudioContext; ac = new AC();
        level = ac.createGain(); level.gain.value = 0; level.connect(ac.destination);
        run = ac.createGain(); run.gain.value = 0; run.connect(level);
        delay = ac.createDelay(1); delay.delayTime.value = 0.42;
        fb = ac.createGain(); fb.gain.value = 0.38;
        var lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400;
        delay.connect(lp); lp.connect(fb); fb.connect(delay); lp.connect(run);
        bellBus = ac.createGain(); bellBus.gain.value = 0.5; bellBus.connect(run); bellBus.connect(delay);
        padBus = ac.createGain(); padBus.gain.value = 0.16; padBus.connect(run);
      }
      function bell(f, t, v, dur) {
        var o = ac.createOscillator(), o2 = ac.createOscillator(), g = ac.createGain();
        o.type = 'sine'; o.frequency.value = f; o2.type = 'sine'; o2.frequency.value = f * 2.01;
        var g2 = ac.createGain(); g2.gain.value = 0.22; o2.connect(g2); g2.connect(g);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 2.4));
        o.connect(g); g.connect(bellBus);
        o.start(t); o2.start(t); o.stop(t + (dur || 2.4) + .1); o2.stop(t + (dur || 2.4) + .1);
      }
      function pad(f, t, dur) {
        [-6, 6].forEach(function (c) {
          var o = ac.createOscillator(), g = ac.createGain(), lp = ac.createBiquadFilter();
          o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = c;
          lp.type = 'lowpass'; lp.frequency.value = 650;
          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.5, t + 1.6);
          g.gain.linearRampToValueAtTime(0.0001, t + dur);
          o.connect(lp); lp.connect(g); g.connect(padBus);
          o.start(t); o.stop(t + dur + .1);
        });
      }
      function soft(f, t, v, dur) {   // soft piano-ish note
        var o = ac.createOscillator(), g = ac.createGain();
        o.type = 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(run);
        o.start(t); o.stop(t + dur + .1);
      }
      function schedule() {
        var eighth = 0.34;
        while (nextT < ac.currentTime + 1.4) {
          var inChord = step % 16, ci = ((step / 16) | 0) % chords.length, ch = chords[ci];
          if (inChord === 0) {
            ch.forEach(function (f) { pad(f, nextT, 6.4); });
            soft(ch[0] / 2, nextT, 0.28, 3.2);
            if (prog > 0.5) soft(ch[0] / 2 * 1.5, nextT + eighth * 8, 0.18, 2.5);
          }
          if (inChord % 2 === 0 && Math.random() < 0.5 + 0.35 * prog) {
            var idx = (inChord / 2) % 3;
            var f = ch[idx] * 2;
            bell(f, nextT, 0.22 + 0.08 * prog, 2.6);
            if (inChord % 4 === 0) soft(f, nextT, 0.1, 1.4);
          }
          if (Math.random() < 0.05 + 0.18 * prog) bell(sparkle[(Math.random() * sparkle.length) | 0], nextT + rnd(0, .1), 0.12, 2.8);
          step++; nextT += eighth;
        }
      }
      return {
        start: function () {
          if (!ac) init();
          if (ac.state === 'suspended') ac.resume();
          run.gain.cancelScheduledValues(ac.currentTime);
          run.gain.setTargetAtTime(1, ac.currentTime, 0.6);
          if (!timer) { nextT = ac.currentTime + 0.1; step = 0; timer = setInterval(schedule, 250); schedule(); }
        },
        stop: function () {
          if (!ac) return;
          run.gain.cancelScheduledValues(ac.currentTime);
          run.gain.setTargetAtTime(0, ac.currentTime, 0.25);
          clearInterval(timer); timer = null;
        },
        setLevel: function (v) { if (level) level.gain.value = v * 1.4; },
        setProgress: function (p) { prog = p; }
      };
    }
 
    /* ----- UI ----- */
    var box, btnPlay, btnMute, rng, hint;
    function ui() {
      box = $('#music'); btnPlay = $('#muPlay'); btnMute = $('#muMute'); rng = $('#muVol'); hint = $('#musicHint');
      rng.style.setProperty('--p', rng.value + '%');
      btnPlay.addEventListener('click', toggle);
      btnMute.addEventListener('click', function () {
        muted = !muted; btnMute.textContent = muted ? '🔇' : '🔊';
        btnMute.setAttribute('aria-label', muted ? 'Unmute background music' : 'Mute background music'); ease();
      });
      rng.addEventListener('input', function () {
        vol = rng.value / 100; rng.style.setProperty('--p', rng.value + '%');
        if (muted && vol > 0) { muted = false; btnMute.textContent = '🔊'; }
        ease();
      });
      setTimeout(function () { if (hint) hint.hidden = true; }, 16000);
    }
    function startSynth() { if (!synth) synth = Synth(); synth.setProgress(progress); synth.start(); synth.setLevel(cur); }
    function setUI(on) {
      wantPlaying = on; box.classList.toggle('playing', on);
      btnPlay.textContent = on ? '❚❚' : '▶';
      btnPlay.setAttribute('aria-label', on ? 'Pause background music' : 'Play background music');
    }
    function toggle() {
      if (hint) hint.hidden = true;
      if (wantPlaying) {
        setUI(false);
        if (fileAudio && !fileFailed) fileAudio.pause();
        if (synth) synth.stop();
        return;
      }
      if (!fileAudio) {
        fileAudio = new Audio(); fileAudio.loop = true; fileAudio.preload = 'auto'; fileAudio.volume = 0;
        fileAudio.addEventListener('error', function () { fileFailed = true; if (wantPlaying) startSynth(); });
        fileAudio.src = BACKGROUND_MUSIC;
      }
      setUI(true); cur = 0; ease();
      if (fileFailed) { startSynth(); return; }
      var p = fileAudio.play();
      if (p && p.catch) p.catch(function () { fileFailed = true; if (wantPlaying) startSynth(); });
    }
    return {
      init: ui,
      setNarrating: function (n) { narrating = n; ease(); },
      setProgress: function (p) { progress = p; if (synth) synth.setProgress(p); if (wantPlaying) ease(); }
    };
  })();
 
  /* ============================================================
     LETTER
     ============================================================ */
  (function () {
    var env = $('#envelope'), paper = $('#letterPaper'), opened = false;
    env.addEventListener('click', function () {
      if (opened) return; opened = true;
      env.classList.add('open'); env.setAttribute('aria-expanded', 'true');
      burst(innerWidth / 2, innerHeight * .6, 40);
      setTimeout(function () {
        paper.hidden = false;
        var ps = $$('p', paper);
        ps.forEach(function (p, i) { setTimeout(function () { p.classList.add('show'); }, 500 + i * 1100); });
        setTimeout(function () { paper.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }); }, 300);
      }, 1100);
    });
  })();
 
  /* ============================================================
     NINE REASONS
     ============================================================ */
  (function () {
    var cards = $$('.rcard'), msg = $('#cardsMsg');
    cards.forEach(function (c) {
      c.addEventListener('click', function () {
        var on = !c.classList.contains('flipped');
        c.classList.toggle('flipped', on); c.setAttribute('aria-pressed', on);
        var n = $$('.rcard.flipped').length;
        msg.textContent = n === 9 ? 'All nine opened! You are loved more than nine times nine. 💙' : 'Cards opened: ' + n + ' / 9';
        if (on) { var r = c.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, n === 9 ? 80 : 14); }
      });
    });
  })();
 
  /* ============================================================
     LEVEL 9 MISSIONS
     ============================================================ */
  (function () {
    var ms = $$('.mission'), fill = $('#barFill'), rocket = $('#rocket'), count = $('#missionCount'),
        win = $('#missionWin'), bar = $('#missionBar'), done9 = false;
    function update() {
      var n = $$('.mission[aria-pressed="true"]').length, pct = n / ms.length * 100;
      fill.style.width = pct + '%'; rocket.style.left = pct + '%';
      bar.setAttribute('aria-valuenow', n); bar.setAttribute('aria-valuemax', ms.length);
      count.textContent = n + ' / ' + ms.length + ' missions complete';
      var all = n === ms.length; win.hidden = !all;
      if (all && !done9) { done9 = true; burst(innerWidth / 2, innerHeight * .55, 120); }
      if (!all) done9 = false;
    }
    ms.forEach(function (m) {
      m.addEventListener('click', function () {
        var on = m.getAttribute('aria-pressed') !== 'true';
        m.setAttribute('aria-pressed', on);
        if (on) { var r = m.getBoundingClientRect(); burst(r.left + 30, r.top + r.height / 2, 10); }
        update();
      });
    });
    update();
  })();
 
  /* ============================================================
     FINALE + REPLAY
     ============================================================ */
  var finaleTimers = [], finaleRan = false;
  function runFinale() {
    if (finaleRan) return; finaleRan = true;
    var lines = $$('.f-line', $('#finaleText')), delays = [300, 4200, 8200, 11800];
    lines.forEach(function (l, i) { finaleTimers.push(setTimeout(function () { l.classList.add('show'); }, delays[i] || i * 3500)); });
    finaleTimers.push(setTimeout(function () { burst(innerWidth / 2, innerHeight * .6, 90); rain(50); }, 8800));
    finaleTimers.push(setTimeout(function () { rain(60); }, 12400));
    finaleTimers.push(setTimeout(function () { rain(40); }, 16000));
  }
  function resetFinale() {
    finaleTimers.forEach(clearTimeout); finaleTimers = []; finaleRan = false;
    $$('.f-line').forEach(function (l) { l.classList.remove('show'); });
  }
  new IntersectionObserver(function (en) { if (en[0].isIntersecting) runFinale(); }, { threshold: 0.45 }).observe($('#finaleText'));
 
  $('#replayBtn').addEventListener('click', function () {
    // Back to the start of the story only. The countdown page is a different page and is never touched.
    allVoices.forEach(function (v) { v.reset(); });
    Object.keys(groups).forEach(function (k) { groups[k].reset(); });
    resetFinale();
    $('#story').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
 
  /* ============================================================
     INTRO (gift box → curtains → reveal)
     ============================================================ */
  function heroCelebrate() {
    var x = innerWidth / 2;
    burst(x, innerHeight * .55, 100);
    setTimeout(function () { burst(innerWidth * .25, innerHeight * .6, 60); burst(innerWidth * .75, innerHeight * .6, 60); }, 500);
    setTimeout(function () { rain(60); }, 900);
  }
  function runIntro() {
    var intro = $('#intro'), opened = false, finished = false, timers = [];
    function finish() {
      if (finished) return; finished = true; timers.forEach(clearTimeout);
      intro.classList.add('parting', 'gone');
      document.body.classList.remove('locked'); document.body.classList.add('revealed');
      window.scrollTo(0, 0);
      heroCelebrate();
      setTimeout(function () { if (intro.parentNode) intro.remove(); }, 2200);
    }
    function open() {
      if (opened) return; opened = true; intro.classList.add('open');
      burst(innerWidth / 2, innerHeight * .5, 50);
      timers.push(setTimeout(function () { intro.classList.add('parting'); }, 4700));
      timers.push(setTimeout(finish, 5900));
    }
    intro.addEventListener('click', function () { if (!opened) open(); else finish(); });
    if (params.has('skipintro')) { intro.remove(); document.body.classList.remove('locked'); document.body.classList.add('revealed'); return; }
    timers.push(setTimeout(open, 2600));   // opens by itself if he doesn't tap
  }
 
  /* ============================================================
     ENTER BUTTON
     ============================================================ */
  $('#enterBtn').addEventListener('click', function (e) {
    burst(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 40);
    $('#story').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
 
  /* ============================================================
     START
     ============================================================ */
  buildChapters();
  buildCollage();
  $$('.player-slot').forEach(initPlayer);
  observeReveals(document);
  Music.init();
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  runIntro();
 
  // Friendly reminder for you (only visible in the browser console):
  var todo = $$('.edit-me').length;
  if (todo) console.info('💙 ' + todo + ' yellow "edit-me" reminder(s) still need your own words in birthday.html');
})();
 