/*
 * Globe Trivia
 * An interactive, draggable 3D globe. Click a country to fly into a map of it
 * with clickable trivia pins backed by sources.
 *
 * Dependencies (loaded before this file):
 *   d3 v7, topojson-client v3,
 *   data/world-110m.js, data/world-50m.js, data/countries.js, data/trivia.js
 *
 * Usage:
 *   GlobeTrivia.mount(document.getElementById('globe-app'), { title: 'Globe Trivia' });
 */
(function () {
  'use strict';

  const TAU = Math.PI * 2;
  const DEG = 180 / Math.PI;
  const EARTH_KM = 6371;

  const CATS = {
    nature:  { label: 'Nature',  color: '#4ade80' },
    history: { label: 'History', color: '#f59e0b' },
    culture: { label: 'Culture', color: '#f472b6' },
    record:  { label: 'Record',  color: '#22d3ee' },
    science: { label: 'Science', color: '#a5b4fc' },
    capital: { label: 'Capital', color: '#ffffff' }
  };

  // world-atlas abbreviates some names and leaves a few features without an ISO id.
  const NAME_FIX = {
    'N. Cyprus': 'Northern Cyprus',
    'Indian Ocean Ter.': 'Australian Indian Ocean Territories',
    'Siachen Glacier': 'Siachen Glacier',
    'Somaliland': 'Somaliland'
  };
  // Wikipedia titles where the common country name is ambiguous.
  const WIKI_TITLE = {
    GEO: 'Georgia (country)', IRL: 'Republic of Ireland', COG: 'Republic of the Congo',
    COD: 'Democratic Republic of the Congo', PSE: 'State of Palestine', CIV: 'Ivory Coast',
    TLS: 'East Timor', MKD: 'North Macedonia', FSM: 'Federated States of Micronesia',
    VAT: 'Vatican City', GMB: 'The Gambia', BHS: 'The Bahamas', JOR: 'Jordan',
    TUR: 'Turkey', CZE: 'Czech Republic', SWZ: 'Eswatini', CPV: 'Cape Verde'
  };

  const ICONS = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    dice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>'
  };

  /* ── small helpers ─────────────────────────────────── */
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = new Intl.NumberFormat('en-US');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = d3.easeCubicInOut;
  const wikiUrl = (t) => 'https://en.wikipedia.org/wiki/' + encodeURIComponent(t.replace(/ /g, '_'));
  const flagUrl = (cca2, w) => cca2 ? `https://flagcdn.com/w${w}/${cca2.toLowerCase()}.png` : '';

  /* ── Wikipedia summaries (live, keyless, CORS-enabled) ── */
  const wikiCache = new Map();
  function wikiSummary(titles) {
    const list = (Array.isArray(titles) ? titles : [titles]).filter(Boolean);
    const key = list.join('|');
    if (wikiCache.has(key)) return wikiCache.get(key);
    const p = (async () => {
      for (const t of list) {
        try {
          const r = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(t.replace(/ /g, '_')));
          if (!r.ok) continue;
          const j = await r.json();
          if (j.type === 'disambiguation' || !j.extract) continue;
          return j;
        } catch (_) { /* offline or blocked - try next */ }
      }
      return null;
    })();
    wikiCache.set(key, p);
    return p;
  }
  function wikiImage(s) {
    if (!s || !s.thumbnail) return null;
    const src = s.thumbnail.source;
    const o = s.originalimage;
    // Wikimedia only serves standard thumbnail widths (330, 500, 960, ...).
    if (o && o.width >= 960 && /\/\d+px-/.test(src)) return src.replace(/\/\d+px-/, '/960px-');
    if (o && o.width < 960) return o.source;
    return src;
  }

  /* ── geometry helpers ──────────────────────────────── */
  // For countries with far-flung territories (France, USA, Netherlands...) focus on
  // the main landmass and anything reasonably close to it.
  function focusGeometry(geom) {
    if (geom.type !== 'MultiPolygon') return geom;
    const polys = geom.coordinates.map((c) => ({ type: 'Polygon', coordinates: c }));
    const areas = polys.map((p) => d3.geoArea(p));
    const mi = areas.indexOf(Math.max(...areas));
    const mc = d3.geoCentroid(polys[mi]);
    let rad = 0;
    for (const ring of polys[mi].coordinates) for (const pt of ring) rad = Math.max(rad, d3.geoDistance(mc, pt));
    const R = Math.max(3000 / EARTH_KM, rad * 1.5);
    const keep = geom.coordinates.filter((c, i) => i === mi || d3.geoDistance(mc, d3.geoCentroid(polys[i])) <= R);
    return { type: 'MultiPolygon', coordinates: keep, _center: mc, _R: R };
  }
  function boundsContains(b, lon, lat) {
    if (lat < b[0][1] - 0.01 || lat > b[1][1] + 0.01) return false;
    if (b[0][0] <= b[1][0]) return lon >= b[0][0] - 0.01 && lon <= b[1][0] + 0.01;
    return lon >= b[0][0] || lon <= b[1][0]; // crosses the antimeridian
  }

  /* ────────────────────────────────────────────────────
   * mount
   * ──────────────────────────────────────────────────── */
  function mount(root, opts) {
    opts = Object.assign({
      title: 'Globe <span>Trivia</span>',
      subtitle: 'Spin the planet. Click a country to dive in and uncover sourced trivia.',
      autoRotate: true,
      rotateSpeed: 5 // degrees per second
    }, opts || {});

    if (!window.WORLD_50M || !window.WORLD_110M || !window.COUNTRY_DATA || !window.TRIVIA) {
      root.textContent = 'Globe Trivia: data files are missing - check the <script> tags.';
      return;
    }

    root.classList.add('gt');
    root.innerHTML = `
      <canvas class="gt-stars" aria-hidden="true"></canvas>
      <canvas class="gt-globe" tabindex="0" role="img" aria-label="Interactive globe. Drag to rotate, scroll to zoom, click a country to explore it."></canvas>
      <div class="gt-hud">
        <div class="gt-top">
          <div class="gt-brand"><h1>${opts.title}</h1><p>${esc(opts.subtitle)}</p></div>
          <div class="gt-tools">
            <label class="gt-search">${ICONS.search}<input type="search" list="gt-countries" placeholder="Search a country…" aria-label="Search a country" autocomplete="off"></label>
            <datalist id="gt-countries"></datalist>
            <button class="gt-btn" data-act="random" title="Surprise me">${ICONS.dice}<span>Surprise me</span></button>
          </div>
        </div>
        <div></div>
        <div class="gt-bottom">
          <div class="gt-hint"><span><kbd>Drag</kbd> spin</span><span><kbd>Scroll</kbd> zoom</span><span><kbd>Click</kbd> explore</span></div>
          <div class="gt-legend">
            <span style="color:#ffc35a"><i style="background:#ffc35a"></i>Curated trivia</span>
            <span style="color:#6f93b8"><i style="background:#6f93b8"></i>Live profile</span>
          </div>
        </div>
      </div>
      <div class="gt-tooltip" role="status" aria-live="polite"></div>
      <section class="gt-detail" hidden aria-label="Country details">
        <div class="gt-mapwrap">
          <svg class="gt-map" role="img"></svg>
          <div class="gt-maptools"><button class="gt-btn" data-act="back">${ICONS.back}<span>Back to globe</span></button></div>
          <div class="gt-zoomtools">
            <button class="gt-btn gt-btn--icon" data-act="zin" aria-label="Zoom in">${ICONS.plus}</button>
            <button class="gt-btn gt-btn--icon" data-act="zout" aria-label="Zoom out">${ICONS.minus}</button>
            <button class="gt-btn gt-btn--icon" data-act="zreset" aria-label="Reset view">${ICONS.reset}</button>
          </div>
          <div class="gt-maphint">Click a pin to open its trivia · scroll or pinch to zoom</div>
        </div>
        <aside class="gt-panel" tabindex="-1"></aside>
      </section>
      <div class="gt-modal" aria-hidden="true">
        <article class="gt-card" role="dialog" aria-modal="true" tabindex="-1"></article>
      </div>
      <div class="gt-loading">Loading the world…</div>
    `;

    const $ = (s) => root.querySelector(s);
    const starsCanvas = $('.gt-stars');
    const canvas = $('.gt-globe');
    const ctx = canvas.getContext('2d');
    const tooltip = $('.gt-tooltip');
    const detail = $('.gt-detail');
    const mapWrap = $('.gt-mapwrap');
    const svg = d3.select($('.gt-map'));
    const panel = $('.gt-panel');
    const modal = $('.gt-modal');
    const card = $('.gt-card');
    const searchInput = $('.gt-search input');

    /* ── data ─────────────────────────────────────────── */
    const C = window.COUNTRY_DATA;
    const TRIVIA = window.TRIVIA;
    const byName = new Map();
    for (const [, p] of Object.entries(C.byId)) {
      byName.set(p.name.toLowerCase(), p);
      byName.set(p.official.toLowerCase(), p);
    }

    function layer(topo) {
      const features = topojson.feature(topo, topo.objects.countries).features;
      return {
        features,
        land: topojson.feature(topo, topo.objects.land),
        borders: topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b),
        featured: { type: 'FeatureCollection', features: features.filter((f) => f.id && TRIVIA[f.id]) }
      };
    }
    const lo = layer(window.WORLD_110M);
    const hi = layer(window.WORLD_50M);

    const countries = hi.features.map((f) => {
      const id = f.id || null;
      const rawName = f.properties.name;
      const prof = (id && C.byId[id]) || byName.get(rawName.toLowerCase()) || null;
      const name = prof ? prof.name : (NAME_FIX[rawName] || rawName);
      return {
        key: id || rawName,
        id, feature: f, name, prof,
        facts: (id && TRIVIA[id]) || [],
        bounds: d3.geoBounds(f)
      };
    });
    const byKey = new Map(countries.map((c) => [c.key, c]));
    const curated = countries.filter((c) => c.facts.length);

    const factDots = [];
    for (const c of curated) c.facts.forEach((f) => factDots.push({ lon: f.lon, lat: f.lat, color: (CATS[f.cat] || CATS.record).color }));

    const datalist = $('#gt-countries');
    countries.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach((c) => {
      const o = document.createElement('option');
      o.value = c.name;
      datalist.appendChild(o);
    });

    /* ── state ────────────────────────────────────────── */
    const state = {
      mode: 'globe',          // globe | flying | detail
      rot: [-122, -12],       // start over the Philippines / Asia-Pacific
      zoom: 1,
      view: null,             // explicit {scale, tx, ty} during fly-in / detail
      hover: null,
      selected: null,
      lastInteract: -1e9,
      vel: [0, 0],
      W: 0, H: 0, dpr: 1, base: 1,
      drawHiMs: 0,
      visible: true
    };
    const projection = d3.geoOrthographic().clipAngle(90).precision(0.5);
    const path = d3.geoPath(projection, ctx);
    const graticule = d3.geoGraticule10();
    const sphere = { type: 'Sphere' };

    /* ── sizing ───────────────────────────────────────── */
    function resize() {
      const r = root.getBoundingClientRect();
      state.W = Math.max(1, r.width);
      state.H = Math.max(1, r.height);
      state.dpr = Math.min(2, window.devicePixelRatio || 1);
      for (const cv of [canvas, starsCanvas]) {
        cv.width = Math.round(state.W * state.dpr);
        cv.height = Math.round(state.H * state.dpr);
      }
      state.base = Math.min(state.W, state.H) * (state.W < 640 ? 0.4 : 0.38);
      root.classList.toggle('gt--narrow', state.W <= 760);
      drawStars();
      if (state.mode === 'detail' && state.selected) renderDetail(state.selected, false);
    }

    function drawStars() {
      const s = starsCanvas.getContext('2d');
      const { W, H, dpr } = state;
      s.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.clearRect(0, 0, W, H);
      const rnd = d3.randomLcg(42);
      const n = Math.round((W * H) / 2600);
      for (let i = 0; i < n; i++) {
        const x = rnd() * W, y = rnd() * H, m = rnd();
        s.globalAlpha = 0.15 + m * 0.75;
        s.fillStyle = m > 0.92 ? '#ffe9c4' : m > 0.8 ? '#cfe1ff' : '#ffffff';
        s.beginPath();
        s.arc(x, y, m > 0.97 ? 1.4 : m * 0.9 + 0.2, 0, TAU);
        s.fill();
      }
      s.globalAlpha = 1;
    }

    /* ── globe rendering ──────────────────────────────── */
    function currentView() {
      if (state.view) return state.view;
      return { scale: state.base * state.zoom, tx: state.W / 2, ty: state.H / 2 };
    }

    function draw(moving) {
      const t0 = performance.now();
      const { W, H, dpr } = state;
      const v = currentView();
      // Draw the detailed 50m shapes unless we're moving and they're too slow.
      const useHi = !moving || state.drawHiMs < 14;
      const L = useHi ? hi : lo;

      projection.rotate([state.rot[0], state.rot[1], 0]).scale(v.scale).translate([v.tx, v.ty])
        .clipExtent([[-2, -2], [W + 2, H + 2]]);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const r = v.scale, cx = v.tx, cy = v.ty;

      // atmosphere glow
      let g = ctx.createRadialGradient(cx, cy, r * 0.92, cx, cy, r * 1.22);
      g.addColorStop(0, 'rgba(110, 180, 255, 0.38)');
      g.addColorStop(0.35, 'rgba(80, 140, 255, 0.12)');
      g.addColorStop(1, 'rgba(80, 140, 255, 0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, r * 1.22, 0, TAU); ctx.fill();

      // ocean
      g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.05, cx, cy, r);
      g.addColorStop(0, '#1f5a92');
      g.addColorStop(0.55, '#0c2c55');
      g.addColorStop(1, '#061530');
      ctx.beginPath(); path(sphere); ctx.fillStyle = g; ctx.fill();

      ctx.beginPath(); path(graticule);
      ctx.strokeStyle = 'rgba(150, 200, 255, 0.08)'; ctx.lineWidth = 0.7; ctx.stroke();

      // land
      ctx.beginPath(); path(L.land);
      ctx.fillStyle = '#2b4f72'; ctx.fill();
      ctx.beginPath(); path(L.featured);
      ctx.fillStyle = 'rgba(255, 195, 90, 0.78)'; ctx.fill();

      const hl = state.selected || state.hover;
      if (hl) {
        ctx.beginPath(); path(hl.feature);
        ctx.fillStyle = hl.facts.length ? '#ffd88a' : '#7ec8f0'; ctx.fill();
        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.2; ctx.stroke();
      }

      ctx.beginPath(); path(L.borders);
      ctx.strokeStyle = 'rgba(5, 14, 32, 0.75)'; ctx.lineWidth = 0.6; ctx.stroke();
      ctx.beginPath(); path(L.land);
      ctx.strokeStyle = 'rgba(170, 220, 255, 0.28)'; ctx.lineWidth = 0.6; ctx.stroke();

      // trivia dots
      const center = [-state.rot[0], -state.rot[1]];
      const pulse = reduceMotion ? 0.5 : (Math.sin(t0 / 450) + 1) / 2;
      const dotR = clamp(r / 260, 1.2, 4);
      for (const d of factDots) {
        if (d3.geoDistance([d.lon, d.lat], center) > Math.PI / 2 - 0.05) continue;
        const p = projection([d.lon, d.lat]);
        if (!p || p[0] < -10 || p[1] < -10 || p[0] > W + 10 || p[1] > H + 10) continue;
        ctx.globalAlpha = 0.22 * (1 - pulse);
        ctx.fillStyle = d.color;
        ctx.beginPath(); ctx.arc(p[0], p[1], dotR * (1.6 + pulse * 2.4), 0, TAU); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(p[0], p[1], dotR, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#0a1026'; ctx.lineWidth = 0.8; ctx.stroke();
      }

      // lighting: soft specular highlight + darkened limb for a 3D feel
      g = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.45, 0, cx - r * 0.4, cy - r * 0.45, r * 1.1);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.10)');
      g.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath(); path(sphere); ctx.fillStyle = g; ctx.fill();
      g = ctx.createRadialGradient(cx, cy, r * 0.65, cx, cy, r);
      g.addColorStop(0, 'rgba(2, 6, 20, 0)');
      g.addColorStop(1, 'rgba(2, 6, 20, 0.55)');
      ctx.beginPath(); path(sphere); ctx.fillStyle = g; ctx.fill();

      if (useHi) {
        const ms = performance.now() - t0;
        state.drawHiMs = state.drawHiMs ? state.drawHiMs * 0.8 + ms * 0.2 : ms;
      }
    }

    /* ── animation loop ───────────────────────────────── */
    let anim = null;      // {t0, dur, step(t), done()}
    let last = performance.now();
    let raf = 0;
    let dragging = false;

    function loop(now) {
      raf = 0;
      if (!state.visible || state.mode === 'detail') return;
      const dt = Math.min(64, now - last);
      last = now;
      let moving = dragging;

      if (anim) {
        const t = clamp((now - anim.t0) / anim.dur, 0, 1);
        anim.step(ease(t));
        moving = true;
        if (t >= 1) { const a = anim; anim = null; a.done && a.done(); }
      } else if (state.mode === 'globe' && !dragging) {
        const sp = Math.abs(state.vel[0]) + Math.abs(state.vel[1]);
        if (sp > 0.002) {
          state.rot[0] += state.vel[0] * dt;
          state.rot[1] = clamp(state.rot[1] + state.vel[1] * dt, -80, 80);
          const k = Math.exp(-dt / 320);
          state.vel[0] *= k; state.vel[1] *= k;
          moving = true;
        } else if (opts.autoRotate && !reduceMotion && !state.hover && now - state.lastInteract > 2500) {
          state.rot[0] += (opts.rotateSpeed * dt) / 1000;
          moving = true;
        }
      }
      draw(moving);
      if (state.mode !== 'detail') raf = requestAnimationFrame(loop);
    }
    function kick() {
      if (!raf && state.visible && state.mode !== 'detail') {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    }

    /* ── hit testing ──────────────────────────────────── */
    function countryAt(x, y) {
      const v = currentView();
      if (Math.hypot(x - v.tx, y - v.ty) > v.scale) return null;
      const ll = projection.invert([x, y]);
      if (!ll || isNaN(ll[0])) return null;
      for (const c of countries) {
        if (!boundsContains(c.bounds, ll[0], ll[1])) continue;
        if (d3.geoContains(c.feature, ll)) return c;
      }
      return null;
    }

    function setHover(c, x, y) {
      if (c !== state.hover) {
        state.hover = c;
        canvas.classList.toggle('is-pointing', !!c);
        if (c) {
          const flag = c.prof ? `<img src="${flagUrl(c.prof.cca2, 40)}" alt="">` : '';
          tooltip.innerHTML = `<strong>${flag}${esc(c.name)}</strong>` +
            (c.facts.length ? `<small><b>★ ${c.facts.length} trivia pins</b> · click to explore</small>` : '<small>Live profile · click to explore</small>');
        }
        tooltip.classList.toggle('is-on', !!c);
      }
      if (c) { tooltip.style.left = x + 'px'; tooltip.style.top = y + 'px'; }
    }

    /* ── globe pointer interaction ────────────────────── */
    const pointers = new Map();
    let downAt = null, lastMove = null, pinchStart = null;

    function localXY(e) {
      const r = root.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    }

    canvas.addEventListener('pointerdown', (e) => {
      if (state.mode !== 'globe') return;
      canvas.setPointerCapture(e.pointerId);
      const p = localXY(e);
      pointers.set(e.pointerId, p);
      state.lastInteract = performance.now();
      state.vel = [0, 0];
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinchStart = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), zoom: state.zoom };
        downAt = null;
        return;
      }
      dragging = true;
      canvas.classList.add('is-dragging');
      downAt = { x: p[0], y: p[1], t: performance.now(), moved: 0 };
      lastMove = { x: p[0], y: p[1], t: performance.now() };
      kick();
    });

    canvas.addEventListener('pointermove', (e) => {
      if (state.mode !== 'globe') return;
      const p = localXY(e);
      if (pointers.has(e.pointerId)) pointers.set(e.pointerId, p);

      if (pinchStart && pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        state.zoom = clamp(pinchStart.zoom * Math.hypot(a[0] - b[0], a[1] - b[1]) / pinchStart.d, 0.6, 8);
        return;
      }
      if (dragging && downAt) {
        const now = performance.now();
        const dx = p[0] - lastMove.x, dy = p[1] - lastMove.y;
        downAt.moved += Math.abs(dx) + Math.abs(dy);
        const k = 75 / (state.base * state.zoom) * 1.6; // degrees per pixel, slower when zoomed in
        state.rot[0] += dx * k;
        state.rot[1] = clamp(state.rot[1] - dy * k, -80, 80);
        const dt = Math.max(1, now - lastMove.t);
        state.vel = [(dx * k) / dt, (-dy * k) / dt];
        lastMove = { x: p[0], y: p[1], t: now };
        state.lastInteract = now;
        if (downAt.moved > 4) setHover(null);
        return;
      }
      if (e.pointerType === 'mouse') setHover(countryAt(p[0], p[1]), p[0], p[1]);
    });

    function endPointer(e) {
      if (!pointers.has(e.pointerId)) return;
      pointers.delete(e.pointerId);
      if (pinchStart) { if (pointers.size < 2) pinchStart = null; return; }
      dragging = false;
      canvas.classList.remove('is-dragging');
      state.lastInteract = performance.now();
      if (lastMove && performance.now() - lastMove.t > 80) state.vel = [0, 0];
      if (downAt && downAt.moved < 6 && e.type === 'pointerup') {
        state.vel = [0, 0];
        const p = localXY(e);
        const c = countryAt(p[0], p[1]);
        if (c) flyTo(c);
      }
      downAt = null;
    }
    canvas.addEventListener('pointerup', endPointer);
    canvas.addEventListener('pointercancel', endPointer);
    canvas.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && !dragging) setHover(null); });

    canvas.addEventListener('wheel', (e) => {
      if (state.mode !== 'globe') return;
      e.preventDefault();
      state.zoom = clamp(state.zoom * Math.exp(-e.deltaY * 0.0015), 0.6, 8);
      state.lastInteract = performance.now();
      kick();
    }, { passive: false });

    canvas.addEventListener('keydown', (e) => {
      if (state.mode !== 'globe') return;
      const step = 8 / state.zoom;
      const k = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (k) {
        e.preventDefault();
        state.rot[0] += k[0];
        state.rot[1] = clamp(state.rot[1] + k[1], -80, 80);
      } else if (e.key === '+' || e.key === '=') state.zoom = clamp(state.zoom * 1.2, 0.6, 8);
      else if (e.key === '-') state.zoom = clamp(state.zoom / 1.2, 0.6, 8);
      else if (e.key === 'Enter') {
        // Enter explores whatever country is at the centre of the globe.
        const v = currentView();
        const c = countryAt(v.tx, v.ty);
        if (c) flyTo(c);
        return;
      } else return;
      state.lastInteract = performance.now();
    });

    /* ── fly-in transition ────────────────────────────── */
    function detailProjection(c, w, h) {
      const fg = focusGeometry(c.feature.geometry);
      const center = d3.geoCentroid(fg);
      // include trivia pins near the main landmass so none fall off-screen
      const pts = c.facts.map((f) => [f.lon, f.lat])
        .filter((p) => !fg._center || d3.geoDistance(p, fg._center) <= fg._R);
      const fitObj = { type: 'GeometryCollection', geometries: [fg].concat(pts.length ? [{ type: 'MultiPoint', coordinates: pts }] : []) };
      const narrow = root.classList.contains('gt--narrow');
      const pad = narrow ? 28 : 56;
      const top = narrow ? 64 : 72;
      const proj = d3.geoOrthographic().clipAngle(90).precision(0.3)
        .rotate([-center[0], -center[1], 0])
        .fitExtent([[pad, top], [Math.max(pad + 10, w - pad), Math.max(top + 10, h - pad)]], fitObj);
      // keep tiny countries from becoming absurdly zoomed
      const maxScale = Math.min(w, h) * 60;
      if (proj.scale() > maxScale) proj.scale(maxScale).translate([w / 2, (h + top - pad) / 2]);
      return { proj, center };
    }

    function flyTo(c) {
      if (state.mode !== 'globe' || anim) return;
      setHover(null);
      state.selected = c;
      state.mode = 'flying';
      root.classList.add('is-flying');
      searchInput.blur();

      // Lay the detail view out (invisible) so we can measure the map area.
      detail.hidden = false;
      const rr = root.getBoundingClientRect();
      const mr = mapWrap.getBoundingClientRect();
      const { proj, center } = detailProjection(c, mr.width, mr.height);

      const from = Object.assign({}, currentView());
      const to = { scale: proj.scale(), tx: mr.left - rr.left + proj.translate()[0], ty: mr.top - rr.top + proj.translate()[1] };
      const r0 = state.rot.slice();
      const r1 = [-center[0], -center[1]];
      r1[0] = r0[0] + ((((r1[0] - r0[0]) % 360) + 540) % 360 - 180); // shortest way round
      const angle = d3.geoDistance([-r0[0], -r0[1]], center) * DEG;

      // First turn the globe to face the country, then zoom into it.
      const turnDur = reduceMotion ? 1 : 500 + angle * 6;
      const zoomDur = reduceMotion ? 1 : 1100;
      const mid = { scale: Math.max(from.scale, state.base), tx: from.tx, ty: from.ty };
      anim = {
        t0: performance.now(), dur: turnDur,
        step(t) {
          state.rot = [r0[0] + (r1[0] - r0[0]) * t, r0[1] + (r1[1] - r0[1]) * t];
          state.view = { scale: from.scale + (mid.scale - from.scale) * t, tx: from.tx + (mid.tx - from.tx) * t, ty: from.ty + (mid.ty - from.ty) * t };
        },
        done() {
          anim = {
            t0: performance.now(), dur: zoomDur,
            step(t) {
              state.view = {
                scale: mid.scale * Math.pow(to.scale / mid.scale, t),
                tx: mid.tx + (to.tx - mid.tx) * t,
                ty: mid.ty + (to.ty - mid.ty) * t
              };
            },
            done() { openDetail(c); }
          };
        }
      };
      kick();
    }

    function openDetail(c) {
      state.mode = 'detail';
      root.classList.remove('is-flying');
      renderDetail(c, true);
      root.classList.add('is-detail');
      panel.scrollTop = 0;
      setTimeout(() => panel.focus({ preventScroll: true }), 300);
    }

    function closeDetail() {
      if (state.mode !== 'detail') return;
      closeModal();
      root.classList.remove('is-detail');
      state.mode = 'flying';
      const from = Object.assign({}, state.view || currentView());
      const to = { scale: state.base * state.zoom, tx: state.W / 2, ty: state.H / 2 };
      // Start from the angle the detail map was showing.
      if (detailState.center) state.rot = [-detailState.center[0], -detailState.center[1]];
      anim = {
        t0: performance.now(), dur: reduceMotion ? 1 : 1000,
        step(t) {
          state.view = {
            scale: from.scale * Math.pow(to.scale / from.scale, t),
            tx: from.tx + (to.tx - from.tx) * t,
            ty: from.ty + (to.ty - from.ty) * t
          };
        },
        done() {
          state.view = null;
          state.mode = 'globe';
          state.selected = null;
          state.lastInteract = performance.now();
          detail.hidden = true;
          canvas.focus({ preventScroll: true });
        }
      };
      kick();
    }

    /* ── detail map (SVG) ─────────────────────────────── */
    const detailState = { proj: null, center: null, zoom: null, transform: d3.zoomIdentity };
    const defs = svg.append('defs');
    const og = defs.append('radialGradient').attr('id', 'gt-ocean').attr('cx', '35%').attr('cy', '30%').attr('r', '75%');
    og.append('stop').attr('offset', '0%').attr('stop-color', '#1f5a92');
    og.append('stop').attr('offset', '55%').attr('stop-color', '#0c2c55');
    og.append('stop').attr('offset', '100%').attr('stop-color', '#061530');
    const fg = defs.append('linearGradient').attr('id', 'gt-focus').attr('x1', 0).attr('y1', 0).attr('x2', 1).attr('y2', 1);
    fg.append('stop').attr('offset', '0%').attr('stop-color', '#ffd98f');
    fg.append('stop').attr('offset', '100%').attr('stop-color', '#f2a93b');
    const lg = defs.append('radialGradient').attr('id', 'gt-limb');
    lg.append('stop').attr('offset', '65%').attr('stop-color', 'rgba(2,6,20,0)');
    lg.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(2,6,20,0.55)');

    const gZoom = svg.append('g').attr('class', 'gt-map-zoom');
    const gPins = svg.append('g').attr('class', 'gt-pins');

    const zoom = d3.zoom()
      .scaleExtent([1, 24])
      .filter((e) => !e.button && !(e.target.closest && e.target.closest('.gt-pin')))
      .on('zoom', (e) => {
        detailState.transform = e.transform;
        gZoom.attr('transform', e.transform);
        placePins();
      });
    svg.call(zoom).on('dblclick.zoom', null);

    function renderDetail(c, resetZoom) {
      const mr = mapWrap.getBoundingClientRect();
      const w = mr.width, h = mr.height;
      const { proj, center } = detailProjection(c, w, h);
      detailState.proj = proj;
      detailState.center = center;
      const p = d3.geoPath(proj);
      svg.attr('viewBox', `0 0 ${w} ${h}`).attr('aria-label', `Map of ${c.name} with trivia pins`);

      gZoom.selectAll('*').remove();
      gZoom.append('path').attr('class', 'ocean').attr('d', p(sphere));
      gZoom.append('path').attr('class', 'grat').attr('d', p(graticule));
      gZoom.append('g').selectAll('path')
        .data(countries)
        .join('path')
        .attr('class', (d) => 'land' + (d === c ? ' is-focus' : ''))
        .attr('d', (d) => p(d.feature))
        .on('click', (e, d) => { if (d !== c) switchCountry(d); })
        .append('title').text((d) => d.name);
      // bring the focused country to the front
      gZoom.selectAll('.land.is-focus').raise();
      gZoom.append('circle').attr('class', 'limb')
        .attr('cx', proj.translate()[0]).attr('cy', proj.translate()[1]).attr('r', proj.scale());

      // keep the globe's end state in sync for the reverse animation
      state.view = { scale: proj.scale(), tx: mr.left - root.getBoundingClientRect().left + proj.translate()[0], ty: mr.top - root.getBoundingClientRect().top + proj.translate()[1] };

      buildPins(c);
      if (resetZoom) svg.call(zoom.transform, d3.zoomIdentity);
      else placePins();
      renderPanel(c);
    }

    function switchCountry(c) {
      closeModal();
      tooltip.classList.remove('is-on');
      state.selected = c;
      svg.transition().duration(reduceMotion ? 0 : 220).style('opacity', 0).on('end', () => {
        renderDetail(c, true);
        panel.scrollTop = 0;
        svg.transition().duration(reduceMotion ? 0 : 320).style('opacity', 1);
      });
    }

    let pinData = [];
    function buildPins(c) {
      pinData = c.facts.map((f, i) => ({ kind: 'fact', i, f, lon: f.lon, lat: f.lat, color: (CATS[f.cat] || CATS.record).color, label: f.title }));
      const prof = c.prof;
      if (prof && prof.capitalLatLng && prof.capital && prof.capital.length) {
        pinData.push({ kind: 'capital', lon: prof.capitalLatLng[1], lat: prof.capitalLatLng[0], color: CATS.capital.color, label: 'Capital: ' + prof.capital[0] });
      }
      gPins.selectAll('*').remove();
      const sel = gPins.selectAll('g.gt-pin').data(pinData).enter().append('g')
        .attr('class', 'gt-pin').attr('tabindex', 0).attr('role', 'button');
      sel.append('circle').attr('class', 'halo').attr('r', 12)
        .style('animation-delay', () => (Math.random() * 2).toFixed(2) + 's');
      sel.each(function (d) {
        const n = d3.select(this);
        if (d.kind === 'capital') {
          n.append('path').attr('class', 'dot').attr('d', d3.symbol(d3.symbolStar, 260)());
        } else {
          n.append('circle').attr('class', 'dot').attr('r', 11);
          n.append('text').text(d.i + 1);
        }
      });
      sel.attr('style', (d) => `--c:${d.color}`)
        .attr('aria-label', (d) => d.label)
        .on('click', (e, d) => openPin(c, d))
        .on('keydown', (e, d) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPin(c, d); } })
        .on('mouseenter focus', (e, d) => {
          const r = root.getBoundingClientRect();
          const b = e.currentTarget.getBoundingClientRect();
          tooltip.innerHTML = `<strong>${esc(d.label)}</strong>` + (d.f ? `<small><b>${esc(d.f.year)}</b> · ${esc((CATS[d.f.cat] || CATS.record).label)}</small>` : '<small>Click for the city profile</small>');
          tooltip.style.left = (b.left + b.width / 2 - r.left) + 'px';
          tooltip.style.top = (b.top - r.top) + 'px';
          tooltip.classList.add('is-on');
        })
        .on('mouseleave blur', () => tooltip.classList.remove('is-on'));
    }

    function placePins() {
      const { proj, center, transform } = detailState;
      if (!proj) return;
      gPins.selectAll('g.gt-pin')
        .classed('is-hidden', (d) => d3.geoDistance([d.lon, d.lat], center) > Math.PI / 2 - 0.02)
        .attr('transform', (d) => {
          const p = transform.apply(proj([d.lon, d.lat]));
          return `translate(${p[0]},${p[1]})`;
        });
    }

    function openPin(c, d) {
      tooltip.classList.remove('is-on');
      gPins.selectAll('g.gt-pin').classed('is-active', (x) => x === d);
      if (d.kind === 'capital') openCapital(c);
      else openFact(c, d.i);
    }

    function zoomBy(k) { svg.transition().duration(350).call(zoom.scaleBy, k); }

    /* ── side panel ───────────────────────────────────── */
    let panelToken = 0;
    function renderPanel(c) {
      const token = ++panelToken;
      const p = c.prof;
      const stat = (label, value, wide) => value ? `<div class="gt-stat${wide ? ' gt-stat--wide' : ''}"><dt>${label}</dt><dd>${value}</dd></div>` : '';
      const pop = p && p.population ? `${fmt.format(p.population)} <small>(${esc(p.populationYear)})</small>` : '';
      const area = p && p.area ? `${fmt.format(Math.round(p.area))} km²` : '';

      const factsHtml = c.facts.length
        ? `<ol class="gt-facts">${c.facts.map((f, i) => `
            <li><button class="gt-fact" data-i="${i}" style="--c:${(CATS[f.cat] || CATS.record).color}">
              <span class="num">${i + 1}</span>
              <span><b>${esc(f.title)}</b><small>${esc(f.year)} · ${esc((CATS[f.cat] || CATS.record).label)}</small></span>
            </button></li>`).join('')}</ol>`
        : `<p class="gt-note">No curated trivia for ${esc(c.name)} yet, so the profile below comes live from Wikipedia. Click the ★ capital pin on the map for more.</p>`;

      panel.innerHTML = `
        <div class="gt-flagrow">
          ${p ? `<img class="gt-flag" src="${flagUrl(p.cca2, 160)}" alt="Flag of ${esc(c.name)}" onerror="this.style.visibility='hidden'">` : ''}
        </div>
        <h2>${esc(c.name)}</h2>
        ${p && p.official !== p.name ? `<p class="gt-official">${esc(p.official)}</p>` : ''}
        ${p && p.region ? `<span class="gt-region">${esc([p.region, p.subregion].filter(Boolean).join(' · '))}</span>` : ''}
        ${p ? `<dl class="gt-stats">
          ${stat('Capital', esc((p.capital || []).join(', ')))}
          ${stat('Population', pop)}
          ${stat('Area', area)}
          ${stat('Currency', esc((p.currencies || []).join(', ')))}
          ${stat('Languages', esc((p.languages || []).join(', ')), true)}
        </dl>` : ''}
        <h3>Trivia${c.facts.length ? ` · ${c.facts.length}` : ''}</h3>
        ${factsHtml}
        <h3>About</h3>
        <div class="gt-about"><div class="gt-skel"></div><div class="gt-skel" style="width:85%"></div><div class="gt-skel" style="width:60%"></div></div>
        <p class="gt-srcs">Profile data: <a href="https://github.com/mledoze/countries" target="_blank" rel="noopener">mledoze/countries</a> ·
          population: <a href="https://data.worldbank.org/indicator/SP.POP.TOTL" target="_blank" rel="noopener">World Bank</a> ·
          summary: <a href="https://www.wikipedia.org/" target="_blank" rel="noopener">Wikipedia</a> (CC BY-SA) · flags: flagcdn.com</p>
      `;
      panel.querySelectorAll('.gt-fact').forEach((b) => b.addEventListener('click', () => {
        const i = +b.dataset.i;
        gPins.selectAll('g.gt-pin').classed('is-active', (x) => x.kind === 'fact' && x.i === i);
        openFact(c, i);
      }));

      const titles = [];
      if (p && WIKI_TITLE[p.cca3]) titles.push(WIKI_TITLE[p.cca3]);
      titles.push(c.name);
      if (p) titles.push(p.official, c.name + ' (country)');
      wikiSummary(titles).then((s) => {
        if (token !== panelToken) return;
        const about = panel.querySelector('.gt-about');
        if (!about) return;
        about.innerHTML = s
          ? `<p>${esc(s.extract)}</p><a href="${esc(s.content_urls && s.content_urls.desktop.page || wikiUrl(s.title))}" target="_blank" rel="noopener">Read more on Wikipedia →</a>`
          : '<p class="gt-note">Couldn\'t reach Wikipedia right now (offline?). The trivia and profile above still work.</p>';
      });
    }

    /* ── modal / trivia card ──────────────────────────── */
    let lastFocus = null;
    let modalToken = 0;
    function showCard(html) {
      card.innerHTML = html;
      if (!modal.classList.contains('is-open')) lastFocus = document.activeElement;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      card.scrollTop = 0;
      card.focus({ preventScroll: true });
      card.querySelector('.gt-close').addEventListener('click', closeModal);
    }
    function closeModal() {
      if (!modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      gPins.selectAll('g.gt-pin').classed('is-active', false);
      if (lastFocus && root.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    }
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    function loadMedia(token, titles) {
      wikiSummary(titles).then((s) => {
        if (token !== modalToken) return;
        const media = card.querySelector('.gt-card-media');
        const img = media && media.querySelector('img');
        const src = wikiImage(s);
        if (!img) return;
        if (!src) { media.classList.add('is-empty'); return; }
        img.onload = () => img.classList.add('is-loaded');
        img.onerror = () => {
          // fall back to the default small thumbnail before giving up
          if (img.src !== s.thumbnail.source) img.src = s.thumbnail.source;
          else media.classList.add('is-empty');
        };
        img.alt = s.title;
        img.src = src;
        const credit = media.querySelector('.gt-card-credit');
        if (credit) credit.innerHTML = `Image: <a href="${esc(s.content_urls.desktop.page)}" target="_blank" rel="noopener" style="color:inherit">Wikipedia</a>`;
      });
    }

    function openFact(c, i) {
      const f = c.facts[i];
      if (!f) return;
      const token = ++modalToken;
      const cat = CATS[f.cat] || CATS.record;
      const srcs = [{ label: 'Wikipedia: ' + f.wiki, url: wikiUrl(f.wiki) }].concat(f.sources || []);
      showCard(`
        <button class="gt-btn gt-btn--icon gt-close" aria-label="Close">${ICONS.close}</button>
        <div class="gt-card-media"><img alt=""><span class="gt-card-credit"></span></div>
        <div class="gt-card-body">
          <div class="gt-chips">
            <span class="gt-chip gt-chip--year">${esc(f.year)}</span>
            <span class="gt-chip gt-chip--cat" style="--c:${cat.color}">${cat.label}</span>
            <span class="gt-chip">${esc(c.name)} · ${i + 1}/${c.facts.length}</span>
          </div>
          <h4>${esc(f.title)}</h4>
          <p>${esc(f.text)}</p>
          <div class="gt-card-src"><strong>Sources</strong>
            <ul>${srcs.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join('')}</ul>
          </div>
          <div class="gt-card-nav">
            <button class="gt-btn" data-nav="-1" ${i === 0 ? 'disabled style="opacity:.4"' : ''}>${ICONS.prev}Previous</button>
            <button class="gt-btn" data-nav="1" ${i === c.facts.length - 1 ? 'disabled style="opacity:.4"' : ''}>Next${ICONS.next}</button>
          </div>
        </div>`);
      card.querySelectorAll('[data-nav]').forEach((b) => b.addEventListener('click', () => {
        const j = i + +b.dataset.nav;
        gPins.selectAll('g.gt-pin').classed('is-active', (x) => x.kind === 'fact' && x.i === j);
        openFact(c, j);
      }));
      loadMedia(token, [f.wiki]);
    }

    function openCapital(c) {
      const p = c.prof;
      const cap = p.capital[0];
      const token = ++modalToken;
      showCard(`
        <button class="gt-btn gt-btn--icon gt-close" aria-label="Close">${ICONS.close}</button>
        <div class="gt-card-media"><img alt=""><span class="gt-card-credit"></span></div>
        <div class="gt-card-body">
          <div class="gt-chips">
            <span class="gt-chip gt-chip--cat" style="--c:#fff">★ Capital city</span>
            <span class="gt-chip">${esc(c.name)}</span>
          </div>
          <h4>${esc(cap)}</h4>
          <p class="gt-cap-text"><span class="gt-skel" style="display:block"></span><span class="gt-skel" style="display:block;width:80%"></span></p>
          <div class="gt-card-src"><strong>Source</strong><ul class="gt-cap-src"><li>Wikipedia</li></ul></div>
        </div>`);
      const titles = [`${cap}, ${c.name}`, cap, `${cap} (city)`];
      wikiSummary(titles).then((s) => {
        if (token !== modalToken) return;
        card.querySelector('.gt-cap-text').textContent = s ? s.extract : 'Wikipedia is unavailable right now.';
        if (s) card.querySelector('.gt-cap-src').innerHTML = `<li><a href="${esc(s.content_urls.desktop.page)}" target="_blank" rel="noopener">Wikipedia: ${esc(s.title)}</a></li>`;
      });
      loadMedia(token, titles);
    }

    /* ── HUD + global controls ────────────────────────── */
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const act = b.dataset.act;
      if (act === 'back') closeDetail();
      else if (act === 'zin') zoomBy(1.6);
      else if (act === 'zout') zoomBy(1 / 1.6);
      else if (act === 'zreset') svg.transition().duration(450).call(zoom.transform, d3.zoomIdentity);
      else if (act === 'random') {
        const pool = curated.filter((c) => c !== state.selected);
        flyTo(pool[Math.floor(Math.random() * pool.length)]);
      }
    });

    function findCountry(q) {
      q = q.trim().toLowerCase();
      if (!q) return null;
      return countries.find((c) => c.name.toLowerCase() === q) ||
        countries.find((c) => c.prof && (c.prof.official.toLowerCase() === q || c.prof.cca3.toLowerCase() === q || c.prof.cca2.toLowerCase() === q)) ||
        countries.find((c) => c.name.toLowerCase().startsWith(q));
    }
    function submitSearch() {
      const c = findCountry(searchInput.value);
      if (c) { searchInput.value = ''; flyTo(c); }
    }
    searchInput.addEventListener('change', submitSearch);
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submitSearch(); } });

    root.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (modal.classList.contains('is-open')) closeModal();
      else if (state.mode === 'detail') closeDetail();
    });
    // keep keyboard focus inside the open card
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const f = [...card.querySelectorAll('a[href], button:not([disabled])')];
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });

    /* ── lifecycle ────────────────────────────────────── */
    new ResizeObserver(() => { resize(); kick(); }).observe(root);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        state.visible = entries[0].isIntersecting;
        if (state.visible) kick();
      }).observe(root);
    }
    document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });

    resize();
    kick();
    requestAnimationFrame(() => $('.gt-loading').classList.add('is-done'));

    return {
      flyTo: (nameOrCode) => { const c = findCountry(String(nameOrCode)); if (c) flyTo(c); },
      back: closeDetail
    };
  }

  window.GlobeTrivia = { mount };
})();
