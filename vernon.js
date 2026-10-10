(function () {
  "use strict";

  /* ================= SETTINGS ================= */
  // Full birthday surprise page.
  var SURPRISE_URL = "vn.html";

  // Birthday: October 12, 2026 at 12:00:00 AM in the visitor's local time.
  var TARGET = new Date(2026, 9, 12, 0, 0, 0, 0);

  // Test helper: add ?now=2026-10-11T23:59:50 to the link to pretend it's another time.
  var offset = 0;
  try {
    var p = new URLSearchParams(location.search).get("now");
    if (p) { var fake = new Date(p); if (!isNaN(fake)) offset = fake.getTime() - Date.now(); }
  } catch (e) {}
  function now() { return new Date(Date.now() + offset); }

  var $ = function (id) { return document.getElementById(id); };
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ================= SKY DECOR ================= */
  var sky = $("sky");
  function rnd(a, b) { return a + Math.random() * (b - a); }
  (function buildSky() {
    var i, el;
    for (i = 0; i < 70; i++) {
      el = document.createElement("i"); el.className = "star";
      var sz = rnd(1.5, 3.5);
      el.style.cssText = "left:" + rnd(0, 100) + "%;top:" + rnd(0, 100) + "%;width:" + sz + "px;height:" + sz + "px;--d:" + rnd(2, 5) + "s;--delay:" + rnd(0, 4) + "s";
      sky.appendChild(el);
    }
    var glyphs = ["✦", "✧", "✦", "★", "✧", "✦"];
    for (i = 0; i < 9; i++) {
      el = document.createElement("span"); el.className = "big-star"; el.textContent = glyphs[i % glyphs.length];
      el.style.cssText = "left:" + rnd(4, 94) + "%;top:" + rnd(4, 80) + "%;font-size:" + rnd(14, 28) + "px;--d:" + rnd(5, 9) + "s;--delay:" + rnd(0, 5) + "s";
      sky.appendChild(el);
    }
    for (i = 0; i < 4; i++) {
      el = document.createElement("div"); el.className = "cloud";
      el.style.cssText = "top:" + (8 + i * 20 + rnd(0, 6)) + "%;--w:" + rnd(120, 220) + "px;--d:" + rnd(60, 100) + "s;--delay:-" + rnd(0, 80) + "s";
      sky.appendChild(el);
    }
    var cols = ["#2f5bea", "#3be3ff", "#8b6cff", "#86c8ff", "#2f5bea"];
    var pos = [4, 88, 12, 80, 46];
    var tops = [62, 58, 18, 24, 84];
    for (i = 0; i < 5; i++) {
      el = document.createElement("div"); el.className = "balloon" + (i > 1 ? " hide-sm" : "");
      el.style.cssText = "left:" + pos[i] + "%;top:" + tops[i] + "%;--c:" + cols[i] + ";--d:" + rnd(5, 8) + "s;--delay:-" + rnd(0, 5) + "s";
      sky.appendChild(el);
    }
  })();

  /* ================= CONFETTI ================= */
  var canvas = $("confetti"), ctx = canvas.getContext("2d"), parts = [], raf = null, W = 0, H = 0;
  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize(); addEventListener("resize", resize);
  var palette = ["#3be3ff", "#2f5bea", "#8b6cff", "#86c8ff", "#ffffff", "#ffd84d"];
  function burst(x, y, n, spread) {
    if (reduceMotion) n = Math.ceil(n / 4);
    for (var i = 0; i < n; i++) {
      var a = rnd(-Math.PI, 0) + (spread ? rnd(-.4, .4) : 0), sp = rnd(4, 11);
      parts.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, g: .22, w: rnd(6, 11), h: rnd(4, 7),
        r: rnd(0, 6.28), vr: rnd(-.3, .3), c: palette[(Math.random() * palette.length) | 0], life: rnd(90, 150) });
    }
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function rain(n) {
    for (var i = 0; i < n; i++) {
      parts.push({ x: rnd(0, W), y: rnd(-40, -5), vx: rnd(-1.5, 1.5), vy: rnd(2, 5), g: .03, w: rnd(6, 11), h: rnd(4, 7),
        r: rnd(0, 6.28), vr: rnd(-.25, .25), c: palette[(Math.random() * palette.length) | 0], life: rnd(160, 260) });
    }
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    parts = parts.filter(function (q) { return q.life > 0 && q.y < H + 30; });
    parts.forEach(function (q) {
      q.vy += q.g; q.x += q.vx; q.y += q.vy; q.vx *= .99; q.r += q.vr; q.life--;
      ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.r);
      ctx.globalAlpha = Math.min(1, q.life / 40);
      ctx.fillStyle = q.c; ctx.fillRect(-q.w / 2, -q.h / 2, q.w, q.h); ctx.restore();
    });
    raf = parts.length ? requestAnimationFrame(frame) : null;
    if (!parts.length) ctx.clearRect(0, 0, W, H);
  }

  /* ================= SPARKLES ================= */
  function sparkles(x, y) {
    var chars = ["✦", "✨", "⭐", "💫", "✧"];
    for (var i = 0; i < 9; i++) {
      var s = document.createElement("span"); s.className = "spark";
      s.textContent = chars[(Math.random() * chars.length) | 0];
      var ang = rnd(0, 6.28), dist = rnd(40, 100);
      s.style.left = x + "px"; s.style.top = y + "px";
      s.style.setProperty("--x", Math.cos(ang) * dist + "px");
      s.style.setProperty("--y", Math.sin(ang) * dist + "px");
      document.body.appendChild(s);
      setTimeout(function (el) { el.remove(); }.bind(null, s), 850);
    }
  }

  /* ================= DAILY MESSAGES ================= */
  var daily = {
    5: ["5 DAYS LEFT! 🎂", "The countdown begins!"],
    4: ["4 DAYS LEFT! 👀", "You're getting closer..."],
    3: ["3 DAYS LEFT! 🎉", "The secret is getting harder to hide!"],
    2: ["2 DAYS LEFT! 😭", "Almost there, birthday boy!"],
    1: ["TOMORROW!!! 🚨🎂", "Okay... NOW it's getting serious!"]
  };
  function dayDiff(t) {
    return Math.round((Date.UTC(2026, 9, 12) - Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())) / 86400000);
  }

  /* ================= CLICK MESSAGES ================= */
  var firstTen = [
    "😂 Nice try! Your surprise is still hiding.",
    "Bro... it's not October 12 yet. 😭🎂",
    "Are you seriously trying to hack your own birthday? 😂",
    "🚨 Birthday police detected suspicious clicking!",
    "Your surprise said: 'Not today.' 😂",
    "Patience, young grasshopper. 🥷😂",
    "You're getting closer... but NOPE! 😭",
    "Okay okay... I see you REALLY want that surprise. 👀",
    "Maybe if you click 90 more times... 🤔😂",
    "JUST KIDDING. You still have to wait! 🎂😂"
  ];
  var funny = [
    "The surprise is taking a nap. Shhh. 😴🎁",
    "Loading surprise... 3%. Please keep waiting. ⏳😂",
    "Your finger must be getting tired. 💪😭",
    "Error 404: Surprise not unlocked yet. 🤖",
    "The cake heard you clicking and hid. 🎂🙈",
    "Ninja mode activated. Your surprise is too sneaky. 🥷",
    "Even a superhero has to wait for their birthday. 🦸💙",
    "Counting stars while you wait might help. ✨😏",
    "Clicking faster does not make time faster. 😂⏱️",
    "The balloons are still getting pumped up. 🎈😤",
    "Secret level: locked. Come back on October 12. 🔒🎮",
    "You again?! 😂 The surprise is rolling its eyes."
  ];
  var jokes = [
    "Why did the birthday cake go to school? 🍰\nBecause it wanted to get a little smarter! 😂",
    "Why did the teddy bear skip dessert? 🧸\nBecause it was already stuffed! 😂",
    "What do you call a sleeping dinosaur? 🦖\nA dino-snore! 😂",
    "Why was the computer cold? 💻\nBecause it left its Windows open! 😂",
    "What do you call a bear with no teeth? 🐻\nA gummy bear! 😂",
    "Why did the banana go to the doctor? 🍌\nBecause it wasn't peeling well! 😂"
  ];
  var sisterMsgs = [
    "Your big sister has prepared something for you... 💙",
    "But your big sister also knows you're VERY impatient. 😂",
    "Nice try, little brother. ❤️",
    "Just wait, birthday boy. I promise it'll be worth it. 🎁",
    "Your sister loves you too much to spoil the surprise. 🥹💙"
  ];
  var talk = "Okay bro... we need to talk. 😂😭";

  var clicks = 0, last = "", bag = { funny: [], jokes: [], sister: [] };
  function draw(name, list) {
    if (!bag[name].length) {
      bag[name] = list.map(function (_, i) { return i; }).sort(function () { return Math.random() - .5; });
    }
    return list[bag[name].pop()];
  }
  function pickMessage() {
    if (clicks <= 10) return firstTen[clicks - 1];
    if (clicks % 20 === 0) return talk;
    var r = Math.random(), msg;
    if (r < .3) msg = draw("jokes", jokes);
    else if (r < .55) msg = draw("sister", sisterMsgs);
    else msg = draw("funny", funny);
    if (msg === last) msg = draw("funny", funny);
    return msg;
  }

  var bubble = $("bubble"), counter = $("counter"), tempt = $("tempt");
  tempt.addEventListener("click", function (e) {
    clicks++;
    var msg = pickMessage(); last = msg;

    bubble.classList.remove("in"); bubble.classList.add("out");
    setTimeout(function () {
      bubble.textContent = msg;
      bubble.classList.remove("out"); void bubble.offsetWidth; bubble.classList.add("in");
    }, 190);

    counter.textContent = "Attempts to steal the surprise: " + clicks + " 😂";

    tempt.classList.remove("bounce"); void tempt.offsetWidth; tempt.classList.add("bounce");
    setTimeout(function () { tempt.classList.remove("bounce"); }, 520);

    var rect = tempt.getBoundingClientRect();
    var cx = e.clientX || rect.left + rect.width / 2, cy = e.clientY || rect.top + rect.height / 2;
    sparkles(cx, cy);
    if (clicks % 3 === 0 || Math.random() < .2 || msg === talk) burst(cx, cy, msg === talk ? 90 : 30, true);
  });

  /* ================= COUNTDOWN ================= */
  var waitEl = $("wait"), revealEl = $("reveal"), revealed = false;
  var nums = { d: $("d"), h: $("h"), m: $("m"), s: $("s") }, prev = {};
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function setNum(k, v) {
    var t = pad(v);
    if (prev[k] !== t) {
      nums[k].textContent = t;
      if (prev[k] !== undefined) { nums[k].classList.remove("tick"); void nums[k].offsetWidth; nums[k].classList.add("tick"); }
      prev[k] = t;
    }
  }

  function tick() {
    var t = now(), diff = TARGET.getTime() - t.getTime();
    if (diff <= 0) { showReveal(); return; }

    var total = Math.floor(diff / 1000);
    setNum("d", Math.floor(total / 86400));
    setNum("h", Math.floor(total % 86400 / 3600));
    setNum("m", Math.floor(total % 3600 / 60));
    setNum("s", total % 60);

    var dd = dayDiff(t), note = daily[dd] || [dd + " DAYS LEFT! 🎂", "The countdown begins!"];
    $("dayTitle").textContent = note[0];
    $("daySub").textContent = note[1];
    $("togo").textContent = (dd === 1 ? "1 DAY TO GO" : dd + " DAYS TO GO") + " 🎉";
  }

  /* ================= REVEAL ================= */
  function showReveal() {
    if (revealed) return;
    revealed = true;
    clearInterval(timerId);
    waitEl.hidden = true; revealEl.hidden = false;
    window.scrollTo(0, 0);
    document.title = "🎉 Happy Birthday! 🎂";
    celebrate();
  }
  function launchBalloons(n) {
    var cols = ["🎈", "🎈", "🎈", "🎈"], filters = ["none", "hue-rotate(60deg)", "hue-rotate(120deg)", "hue-rotate(250deg)", "hue-rotate(300deg)"];
    for (var i = 0; i < n; i++) {
      (function (i) {
        setTimeout(function () {
          var b = document.createElement("span"); b.className = "rise"; b.textContent = cols[i % cols.length];
          b.style.left = rnd(2, 94) + "%"; b.style.fontSize = rnd(34, 64) + "px";
          b.style.filter = filters[i % filters.length];
          b.style.setProperty("--t", rnd(7, 12) + "s"); b.style.setProperty("--r", rnd(-14, 14) + "deg");
          document.body.appendChild(b);
          setTimeout(function () { b.remove(); }, 12500);
        }, i * 260);
      })(i);
    }
  }
  function celebrate() {
    var round = 0;
    function go() {
      burst(rnd(W * .2, W * .8), H * .7, 70, true);
      rain(40);
      sparkles(rnd(W * .15, W * .85), rnd(H * .15, H * .5));
      if (++round < 8) setTimeout(go, 900);
    }
    go();
    launchBalloons(reduceMotion ? 6 : 22);
    setTimeout(function () { launchBalloons(12); }, 6500);
  }
  revealEl.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("#enter")) return;
    burst(e.clientX, e.clientY, 25, true);
  });

  var toast = $("toast"), toastT;
  $("enter").addEventListener("click", function (e) {
    if (SURPRISE_URL) { location.href = SURPRISE_URL; return; }
    burst(e.clientX, e.clientY, 60, true);
    toast.textContent = "Your big sister is still wrapping the full surprise... it's coming very soon! 🎁💙";
    toast.hidden = false; clearTimeout(toastT);
    toastT = setTimeout(function () { toast.hidden = true; }, 5000);
  });

  /* ================= MUSIC ================= */
  var actx = null, master = null, oscs = [], loopT = null, playing = false, musicBtn = $("music");
  var N = { G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
  var song = [
    ["G4",.75],["G4",.25],["A4",1],["G4",1],["C5",1],["B4",2],
    ["G4",.75],["G4",.25],["A4",1],["G4",1],["D5",1],["C5",2],
    ["G4",.75],["G4",.25],["G5",1],["E5",1],["C5",1],["B4",1],["A4",1],
    ["F5",.75],["F5",.25],["E5",1],["C5",1],["D5",1],["C5",2]
  ];
  function playPass() {
    var beat = .42, t = actx.currentTime + .08;
    song.forEach(function (n) {
      var o = actx.createOscillator(), g = actx.createGain(), d = n[1] * beat;
      o.type = "triangle"; o.frequency.value = N[n[0]];
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(.5, t + .03);
      g.gain.exponentialRampToValueAtTime(.001, t + d * .95);
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t + d);
      oscs.push(o); t += d;
    });
    loopT = setTimeout(playPass, (t - actx.currentTime + 1.4) * 1000);
  }
  function stopMusic() {
    playing = false; clearTimeout(loopT);
    oscs.forEach(function (o) { try { o.stop(); } catch (e) {} }); oscs = [];
    musicBtn.textContent = "🎵 Play Birthday Music"; musicBtn.setAttribute("aria-pressed", "false");
  }
  function startMusic() {
    if (playing) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) throw new Error("Web Audio is not supported in this browser.");
      if (!actx) { actx = new AC(); master = actx.createGain(); master.gain.value = .25; master.connect(actx.destination); }
      var resume = actx.state === "suspended" ? actx.resume() : Promise.resolve();
      resume.then(function () {
        if (playing || actx.state !== "running") return;
        playing = true; playPass();
        musicBtn.textContent = "🔇 Stop Music"; musicBtn.setAttribute("aria-pressed", "true");
        toast.hidden = true; clearTimeout(toastT);
      }).catch(function () {
        toast.textContent = "Your browser blocked autoplay. Tap or press a key anywhere to start the music. 🎵";
        toast.hidden = false; clearTimeout(toastT);
        toastT = setTimeout(function () { toast.hidden = true; }, 5000);
      });
    } catch (e) {
      toast.textContent = e.message || "Birthday music could not be started.";
      toast.hidden = false; clearTimeout(toastT);
      toastT = setTimeout(function () { toast.hidden = true; }, 5000);
    }
  }
  musicBtn.addEventListener("click", function () {
    if (playing) { stopMusic(); return; }
    startMusic();
  });
  function startMusicAfterInteraction(e) {
    if (e.target.closest && e.target.closest("#music")) return;
    startMusic();
  }
  document.addEventListener("pointerdown", startMusicAfterInteraction);
  document.addEventListener("keydown", startMusicAfterInteraction);
  startMusic();

  var timerId = setInterval(tick, 250);
  tick();
})();