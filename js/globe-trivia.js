/*
 * Globe Trivia
 * A draggable, cartoon-style 3D globe. Click a country to fly into a map of it
 * and see its tech & data facts, each one highlighted with its headline figure,
 * a small chart and a link to its source.
 *
 * Dependencies (loaded before this file):
 *   d3 v7, topojson-client v3,
 *   data/world-110m.js, data/world-50m.js, data/countries.js, data/tech-trivia.js
 *
 * Usage:
 *   GlobeTrivia.mount(document.getElementById('globe-app'), { title: 'Globe Trivia' });
 */
(function () {
  'use strict';

  const TAU = Math.PI * 2;
  const DEG = 180 / Math.PI;
  const EARTH_KM = 6371;

  /* ── cartoon palette (the SVG map uses the same values) ── */
  const INK = '#1d2340';
  const OCEAN = '#4cc3ff';
  const LAND = ['#8de4c3', '#c0b3ff', '#ffbe8f', '#ff9fc4', '#c8ee7e'];
  const FOCUS = '#ffd43b';
  const SHADE = 'rgba(16, 24, 80, 0.2)';

  const icon = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

  const CATS = {
    internet: { label: 'Internet use', color: '#38d9ff', icon: icon('<path d="M2 9a15 15 0 0 1 20 0"/><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>') },
    egov:     { label: 'E-government', color: '#b197fc', icon: icon('<path d="M3 21h18M4 10h16M12 3l9 5H3z"/><path d="M6 10v8M10 10v8M14 10v8M18 10v8"/>') },
    mobile:   { label: 'Mobile data', color: '#ff8fc7', icon: icon('<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>') },
    speed:    { label: 'Broadband speed', color: '#a9e34b', icon: icon('<path d="M3.5 16a8.5 8.5 0 1 1 17 0"/><path d="M12 16l4-5"/><circle cx="12" cy="16" r="1.3"/>') },
    price:    { label: 'Broadband price', color: '#ffa94d', icon: icon('<circle cx="12" cy="12" r="9"/><path d="M15 9.2c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.3 0 1.3-1.3 2.3-3 2.3-1.4 0-2.6-.6-3.2-1.6M12 6v1.7M12 16.6v1.6"/>') },
    crypto:   { label: 'Crypto', color: '#ffd43b', icon: icon('<circle cx="12" cy="12" r="9"/><path d="M9.5 7.5h3.5a2 2 0 0 1 0 4H9.5zM9.5 11.5h4a2 2 0 0 1 0 4h-4zM9.5 7.5v8M11 6v1.5M11 15.5V17"/>') },
    cyber:    { label: 'Cybersecurity', color: '#ff6b6b', icon: icon('<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>') },
    chips:    { label: 'Chips & AI', color: '#63e6be', icon: icon('<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>') },
    economy:  { label: 'Digital economy', color: '#69db7c', icon: icon('<path d="M3 20h18"/><path d="M6 17v-3M11 17v-6M16 17v-4"/><path d="M4 10l6-5 4 3 6-5"/>') },
    domain:   { label: 'Domain names', color: '#f783ac', icon: icon('<circle cx="12" cy="12" r="4"/><path d="M16 8v5a2.5 2.5 0 0 0 5 0v-1a9 9 0 1 0-3.5 7.1"/>') },
    infra:    { label: 'Connectivity', color: '#74c0fc', icon: icon('<path d="M4 20c3-6 13-6 16 0"/><circle cx="12" cy="10" r="2"/><path d="M8 6a6 6 0 0 0 0 8M16 6a6 6 0 0 1 0 8"/>') }
  };
  // Colour for the "source type" chip on each fact.
  const TAGS = {
    'International Org': '#74c0fc',
    'Research/Report': '#b197fc',
    'News Media': '#ffa94d',
    'Government/Official': '#69db7c',
    'Company-Marketed': '#f783ac'
  };

  // world-atlas abbreviates some names and leaves a few features without an ISO id.
  const NAME_FIX = {
    'N. Cyprus': 'Northern Cyprus',
    'Indian Ocean Ter.': 'Australian Indian Ocean Territories'
  };

  const ICONS = {
    search: icon('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    dice: icon('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>'),
    back: icon('<path d="M15 18l-6-6 6-6"/>'),
    plus: icon('<path d="M12 5v14M5 12h14"/>'),
    minus: icon('<path d="M5 12h14"/>'),
    reset: icon('<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>'),
    trophy: icon('<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4"/>'),
    link: icon('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>')
  };

  /* ── small helpers ─────────────────────────────────── */
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = new Intl.NumberFormat('en-US');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = d3.easeCubicInOut;
  const boing = d3.easeBackOut.overshoot(3);
  const flagUrl = (cca2, w) => cca2 ? `https://flagcdn.com/w${w}/${cca2.toLowerCase()}.png` : '';
  const pct = (x) => (clamp(x, 0, 1) * 100).toFixed(1) + '%';

  function heroText(h, v) {
    if (h.x) return h.x;
    const n = v == null ? h.v : v;
    return h.p + n.toLocaleString('en-US', { minimumFractionDigits: h.d, maximumFractionDigits: h.d }) + h.s;
  }
  // Animate a headline figure from 0 up to its value.
  function countUp(node, h, delay) {
    if (!node) return;
    if (h.x || reduceMotion) { node.textContent = heroText(h); return; }
    node.textContent = heroText(h, 0);
    const t0 = performance.now() + delay;
    const tick = (now) => {
      if (!node.isConnected) return;
      const t = clamp((now - t0) / 1100, 0, 1);
      node.textContent = heroText(h, t >= 1 ? h.v : h.v * d3.easeCubicOut(t));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function markText(text, hl) {
    const t = esc(text), h = esc(hl);
    const i = h ? t.indexOf(h) : -1;
    return i < 0 ? t : t.slice(0, i) + '<mark>' + h + '</mark>' + t.slice(i + h.length);
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
    return { type: 'MultiPolygon', coordinates: keep };
  }
  function mainCenter(geom) {
    if (geom.type !== 'MultiPolygon') return d3.geoCentroid(geom);
    let best = null, ba = -1;
    for (const c of geom.coordinates) {
      const p = { type: 'Polygon', coordinates: c };
      const a = d3.geoArea(p);
      if (a > ba) { ba = a; best = p; }
    }
    return d3.geoCentroid(best);
  }
  function boundsContains(b, lon, lat) {
    if (lat < b[0][1] - 0.01 || lat > b[1][1] + 0.01) return false;
    if (b[0][0] <= b[1][0]) return lon >= b[0][0] - 0.01 && lon <= b[1][0] + 0.01;
    return lon >= b[0][0] || lon <= b[1][0]; // crosses the antimeridian
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
  }

  /* ────────────────────────────────────────────────────
   * mount
   * ──────────────────────────────────────────────────── */
  function mount(root, opts) {
    opts = Object.assign({
      title: 'Globe <span>Trivia</span>',
      subtitle: 'Spin the planet. Click any country to reveal its tech & data facts.',
      autoRotate: true,
      rotateSpeed: 6 // degrees per second
    }, opts || {});

    if (!window.WORLD_50M || !window.WORLD_110M || !window.COUNTRY_DATA || !window.TECH_TRIVIA) {
      root.textContent = 'Globe Trivia: data files are missing - check the <script> tags.';
      return;
    }

    const C = window.COUNTRY_DATA;
    const TECH = window.TECH_TRIVIA;
    const META = TECH.meta;

    root.classList.add('gt');
    root.innerHTML = `
      <canvas class="gt-stars" aria-hidden="true"></canvas>
      <canvas class="gt-globe" tabindex="0" role="img" aria-label="Interactive globe. Drag to rotate, scroll to zoom, click a country to see its facts."></canvas>
      <div class="gt-hud">
        <div class="gt-top">
          <div class="gt-brand"><h1>${opts.title}</h1><p>${esc(opts.subtitle)}</p></div>
          <div class="gt-tools">
            <label class="gt-search">${ICONS.search}<input type="search" list="gt-countries" placeholder="Search a country…" aria-label="Search a country" autocomplete="off"></label>
            <datalist id="gt-countries"></datalist>
            <button class="gt-btn gt-btn--pop" data-act="random" title="Surprise me">${ICONS.dice}<span>Surprise me</span></button>
          </div>
        </div>
        <div></div>
        <div class="gt-bottom">
          <div class="gt-hint"><span><kbd>Drag</kbd> spin</span><span><kbd>Scroll</kbd> zoom</span><span><kbd>Click</kbd> explore</span></div>
          <div class="gt-legend"><b>${fmt.format(META.facts)}</b> sourced facts · <b>${META.places}</b> places · 2020–2026</div>
        </div>
      </div>
      <div class="gt-tooltip" role="status" aria-live="polite"></div>
      <section class="gt-detail" hidden aria-label="Country details">
        <div class="gt-mapwrap">
          <svg class="gt-map" role="img"></svg>
          <div class="gt-bubbles"></div>
          <div class="gt-maptools">
            <button class="gt-btn" data-act="back">${ICONS.back}<span>Back to globe</span></button>
            <button class="gt-btn gt-btn--icon gt-btn--pop" data-act="random" title="Another country" aria-label="Another country">${ICONS.dice}</button>
          </div>
          <div class="gt-zoomtools">
            <button class="gt-btn gt-btn--icon" data-act="zin" aria-label="Zoom in">${ICONS.plus}</button>
            <button class="gt-btn gt-btn--icon" data-act="zout" aria-label="Zoom out">${ICONS.minus}</button>
            <button class="gt-btn gt-btn--icon" data-act="zreset" aria-label="Reset view">${ICONS.reset}</button>
          </div>
          <div class="gt-maphint">Click a bubble to jump to its fact · click a neighbour to hop over</div>
        </div>
        <aside class="gt-panel" tabindex="-1"></aside>
      </section>
      <div class="gt-loading">Loading the world…</div>
    `;

    const $ = (s) => root.querySelector(s);
    const starsCanvas = $('.gt-stars');
    const canvas = $('.gt-globe');
    const ctx = canvas.getContext('2d');
    const tooltip = $('.gt-tooltip');
    const detail = $('.gt-detail');
    const mapWrap = $('.gt-mapwrap');
    const bubbleBox = $('.gt-bubbles');
    const svg = d3.select($('.gt-map'));
    const panel = $('.gt-panel');
    const searchInput = $('.gt-search input');

    /* ── data ─────────────────────────────────────────── */
    const byName = new Map();
    const byCca3 = new Map();
    for (const p of Object.values(C.byId)) {
      byName.set(p.name.toLowerCase(), p);
      byName.set(p.official.toLowerCase(), p);
      byCca3.set(p.cca3, p);
    }
    const factsFor = (prof) => (prof && TECH.byCca3[prof.cca3]) || [];

    // Colour countries so that neighbours get different colours (greedy colouring).
    const geoms = window.WORLD_50M.objects.countries.geometries;
    const nbrs = topojson.neighbors(geoms);
    const colorOf = new Array(geoms.length).fill(-1);
    d3.range(geoms.length).sort((a, b) => nbrs[b].length - nbrs[a].length).forEach((i) => {
      const used = LAND.map(() => 0);
      for (const j of nbrs[i]) if (colorOf[j] >= 0) used[colorOf[j]]++;
      let best = 0;
      for (let k = 1; k < LAND.length; k++) if (used[k] < used[best]) best = k;
      colorOf[i] = used[i % LAND.length] === 0 ? i % LAND.length : best;
    });
    const featKey = (f) => f.id || f.properties.name;
    const colorByKey = new Map();

    const hiFeatures = topojson.feature(window.WORLD_50M, window.WORLD_50M.objects.countries).features;
    hiFeatures.forEach((f, i) => colorByKey.set(featKey(f), colorOf[i]));

    function layer(topo, features) {
      return {
        land: topojson.feature(topo, topo.objects.land),
        borders: topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b),
        groups: LAND.map((_, k) => ({ type: 'FeatureCollection', features: features.filter((f) => (colorByKey.get(featKey(f)) ?? 0) === k) }))
      };
    }
    const hi = layer(window.WORLD_50M, hiFeatures);
    const lo = layer(window.WORLD_110M, topojson.feature(window.WORLD_110M, window.WORLD_110M.objects.countries).features);

    const countries = hiFeatures.map((f, i) => {
      const id = f.id || null;
      const rawName = f.properties.name;
      const prof = (id && C.byId[id]) || byName.get(rawName.toLowerCase()) || null;
      return {
        key: id || rawName,
        id, feature: f, point: null, prof,
        name: prof ? prof.name : (NAME_FIX[rawName] || rawName),
        facts: factsFor(prof),
        color: colorOf[i],
        bounds: d3.geoBounds(f),
        anchor: mainCenter(f.geometry),
        angR: Math.sqrt(d3.geoArea(f) / Math.PI)
      };
    });
    // Places in the dataset that have no shape on the map (Gibraltar, Tuvalu, Réunion...)
    // become clickable island markers.
    const onMap = new Set(countries.map((c) => c.prof && c.prof.cca3).filter(Boolean));
    Object.keys(TECH.byCca3).forEach((cca3, i) => {
      const prof = byCca3.get(cca3);
      if (onMap.has(cca3) || !prof || !prof.latlng) return;
      const pt = [prof.latlng[1], prof.latlng[0]];
      countries.push({ key: cca3, id: null, feature: null, point: pt, prof, name: prof.name, facts: TECH.byCca3[cca3], color: i % LAND.length, anchor: pt, angR: 0 });
    });
    const withFacts = countries.filter((c) => c.facts.length);
    const shaped = countries.filter((c) => c.feature);
    // Tiny countries also get a marker while they are too small to click.
    const markers = countries.filter((c) => !c.feature || c.angR < 0.03);

    const datalist = $('#gt-countries');
    countries.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach((c) => {
      const o = document.createElement('option');
      o.value = c.name;
      datalist.appendChild(o);
    });

    /* ── decorations: clouds, waves, sparkles ─────────── */
    const rnd = d3.randomLcg(7);
    const clouds = d3.range(16).map(() => {
      const n = 3 + Math.floor(rnd() * 3), mid = Math.floor(n / 2);
      return {
        lon: rnd() * 360 - 180, lat: (rnd() * 2 - 1) * 58, speed: 0.8 + rnd() * 0.9,
        puffs: d3.range(n).map((k) => ({
          dx: (k - (n - 1) / 2) * 2.3 + (rnd() - 0.5) * 0.6,
          dy: (rnd() - 0.5) * 1.1 + (k === mid ? 0.9 : 0),
          r: 1.5 + rnd() * 1.2 + (k === mid ? 0.9 : 0)
        }))
      };
    });
    const waves = [];
    while (waves.length < 80) {
      const p = [rnd() * 360 - 180, Math.asin(rnd() * 2 - 1) * DEG * 0.92];
      if (!d3.geoContains(lo.land, p)) waves.push({ p, ph: rnd() * TAU });
    }
    const sparkles = d3.range(26).map(() => ({ x: rnd(), y: rnd(), s: 2 + rnd() * 4, ph: rnd() * TAU, sp: 0.6 + rnd() }));

    /* ── state ────────────────────────────────────────── */
    const state = {
      mode: 'globe',          // globe | flying | detail
      rot: [-100, -15],
      zoom: 1,
      view: null,             // explicit {scale, tx, ty} during fly-in / detail
      hover: null,
      hoverAt: 0,
      selected: null,
      decor: 1,               // clouds, satellite, pings and waves fade out while flying in
      lastInteract: -1e9,
      vel: [0, 0],
      W: 0, H: 0, dpr: 1, base: 1,
      drawHiMs: 0,
      visible: true,
      pings: [],
      nextPing: 0,
      markerHits: []
    };
    const projection = d3.geoOrthographic().clipAngle(90).precision(0.5);
    const cloudProj = d3.geoOrthographic().clipAngle(90);
    const path = d3.geoPath(projection, ctx);
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
      state.base = Math.min(state.W, state.H) * (state.W < 640 ? 0.36 : 0.34);
      root.classList.toggle('gt--narrow', state.W <= 760);
      drawStars();
      if (state.mode === 'detail' && state.selected) renderDetail(state.selected, false);
    }

    function drawStars() {
      const s = starsCanvas.getContext('2d');
      const { W, H, dpr } = state;
      s.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.clearRect(0, 0, W, H);
      const r = d3.randomLcg(42);
      const n = Math.round((W * H) / 3200);
      const tints = ['#ffffff', '#fff3bf', '#d0ebff', '#ffdeeb'];
      for (let i = 0; i < n; i++) {
        const x = r() * W, y = r() * H, m = r();
        s.globalAlpha = 0.25 + m * 0.7;
        s.fillStyle = tints[Math.floor(r() * tints.length)];
        s.beginPath();
        s.arc(x, y, m > 0.96 ? 1.8 : m * 1.1 + 0.3, 0, TAU);
        s.fill();
      }
      s.globalAlpha = 1;
    }

    /* ── globe rendering ──────────────────────────────── */
    function currentView(now) {
      if (state.view) return state.view;
      const bob = reduceMotion ? 0 : Math.sin((now || performance.now()) / 1400) * 5;
      return { scale: state.base * state.zoom, tx: state.W / 2, ty: state.H / 2 + bob };
    }

    function star4(x, y, s) {
      ctx.beginPath();
      ctx.moveTo(x, y - s);
      ctx.quadraticCurveTo(x, y, x + s, y);
      ctx.quadraticCurveTo(x, y, x, y + s);
      ctx.quadraticCurveTo(x, y, x - s, y);
      ctx.quadraticCurveTo(x, y, x, y - s);
      ctx.fill();
    }

    function satAt(th, v) {
      const R = v.scale * 1.36, tilt = 0.42, phi = -0.35;
      const x = R * Math.cos(th), z0 = R * Math.sin(th);
      const y1 = -z0 * Math.sin(tilt), z = z0 * Math.cos(tilt);
      return { x: v.tx + x * Math.cos(phi) - y1 * Math.sin(phi), y: v.ty + x * Math.sin(phi) + y1 * Math.cos(phi), z };
    }
    function drawOrbit(v, front, alpha) {
      ctx.save();
      ctx.setLineDash([3, 7]);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(200, 235, 255, ${alpha})`;
      ctx.beginPath();
      let pen = false;
      for (let i = 0; i <= 96; i++) {
        const p = satAt((i / 96) * TAU, v);
        if ((p.z >= 0) === front) { pen ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); pen = true; } else pen = false;
      }
      ctx.stroke();
      ctx.restore();
    }
    function drawSatellite(p, v, now) {
      const k = clamp(v.scale / 260, 0.55, 1.2);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(-0.35);
      ctx.scale(k, k);
      ctx.lineWidth = 2;
      ctx.strokeStyle = INK;
      ctx.lineJoin = 'round';
      for (const x0 of [-28, 10]) {
        ctx.fillStyle = '#5c7cfa';
        roundRect(ctx, x0, -6, 18, 12, 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x0 + 9, -6); ctx.lineTo(x0 + 9, 6); ctx.stroke();
      }
      ctx.fillStyle = FOCUS;
      roundRect(ctx, -9, -8, 18, 16, 4); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(0, -14); ctx.stroke();
      ctx.fillStyle = (Math.floor(now / 500) % 2) || reduceMotion ? '#ff6b6b' : '#ffe3e3';
      ctx.beginPath(); ctx.arc(0, -15.5, 2.6, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.restore();
      if (reduceMotion) return;
      // signal pulses toward the planet
      const a = Math.atan2(v.ty - p.y, v.tx - p.x);
      ctx.lineWidth = 2;
      for (let j = 0; j < 2; j++) {
        const ph = (now / 900 + j * 0.5) % 1;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * (1 - ph)})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, (12 + ph * 20) * k, a - 0.45, a + 0.45); ctx.stroke();
      }
    }

    function drawClouds(now, v, center, alpha) {
      cloudProj.rotate(projection.rotate()).scale(v.scale * 1.03).translate([v.tx, v.ty]);
      const drawn = [];
      for (const cl of clouds) {
        const lon0 = cl.lon + (reduceMotion ? 0 : (now / 1000) * cl.speed);
        const dc = d3.geoDistance([lon0, cl.lat], center);
        if (dc > Math.PI / 2 - 0.15) continue;
        const k = clamp((Math.PI / 2 - 0.15 - dc) / 0.4, 0, 1);
        const puffs = [];
        for (const p of cl.puffs) {
          const ll = [lon0 + p.dx / Math.cos(cl.lat / DEG), cl.lat + p.dy];
          const d = d3.geoDistance(ll, center);
          const xy = d < Math.PI / 2 ? cloudProj(ll) : null;
          if (xy) puffs.push([xy[0], xy[1], (p.r / DEG) * v.scale * 1.03 * (0.35 + 0.65 * Math.cos(d))]);
        }
        if (puffs.length) drawn.push({ puffs, a: alpha * k });
      }
      const blob = (puffs, ox, oy) => {
        ctx.beginPath();
        for (const [x, y, r] of puffs) { ctx.moveTo(x + ox + r, y + oy); ctx.arc(x + ox, y + oy, r, 0, TAU); }
      };
      // shadows fall on the planet only
      ctx.save();
      ctx.beginPath(); ctx.arc(v.tx, v.ty, v.scale, 0, TAU); ctx.clip();
      for (const d of drawn) {
        ctx.globalAlpha = d.a;
        blob(d.puffs, 5, 7);
        ctx.fillStyle = SHADE; ctx.fill();
      }
      ctx.restore();
      for (const d of drawn) {
        ctx.globalAlpha = d.a;
        blob(d.puffs, 0, 0);
        ctx.lineWidth = 3.2; ctx.strokeStyle = INK; ctx.stroke();
        ctx.fillStyle = '#ffffff'; ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function draw(moving, now) {
      const t0 = performance.now();
      const { W, H, dpr } = state;
      const v = currentView(now);
      // Draw the detailed 50m shapes unless we're moving and they're too slow.
      const useHi = !moving || state.drawHiMs < 14;
      const L = useHi ? hi : lo;
      const z = v.scale / state.base;
      const decor = state.decor;

      projection.rotate([state.rot[0], state.rot[1], 0]).scale(v.scale).translate([v.tx, v.ty])
        .clipExtent([[-2, -2], [W + 2, H + 2]]);
      const center = [-state.rot[0], -state.rot[1]];

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const r = v.scale, cx = v.tx, cy = v.ty;

      // twinkling sparkles in space (the planet covers the ones behind it)
      if (decor > 0) {
        ctx.fillStyle = '#fff6c9';
        for (const s of sparkles) {
          const t = reduceMotion ? 0.7 : (Math.sin((now / 1000) * s.sp + s.ph) + 1) / 2;
          ctx.globalAlpha = decor * (0.2 + 0.8 * t);
          star4(s.x * W, s.y * H, s.s * (0.4 + 0.8 * t));
        }
        ctx.globalAlpha = 1;
      }

      // satellite orbit (back half) and satellite when it is behind
      const satA = decor * clamp((2.4 - z) / 0.8, 0, 1);
      const sat = satAt(reduceMotion ? 2.2 : now * 0.00022, v);
      if (satA > 0) {
        ctx.globalAlpha = satA;
        drawOrbit(v, false, 0.25);
        if (sat.z < 0) drawSatellite(sat, v, now);
        ctx.globalAlpha = 1;
      }

      // cartoon atmosphere: soft glow + a bright halo line
      let g = ctx.createRadialGradient(cx, cy, r * 0.96, cx, cy, r * 1.12);
      g.addColorStop(0, 'rgba(140, 230, 255, 0.5)');
      g.addColorStop(1, 'rgba(140, 230, 255, 0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, r * 1.12, 0, TAU); ctx.fill();

      // flat ocean
      ctx.beginPath(); path(sphere); ctx.fillStyle = OCEAN; ctx.fill();

      // little wave squiggles
      const waveA = decor * clamp((3 - z) / 1, 0, 1);
      if (waveA > 0) {
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        const s0 = clamp(r / 90, 2.5, 7);
        for (const w of waves) {
          const d = d3.geoDistance(w.p, center);
          if (d > Math.PI / 2 - 0.12) continue;
          const p = projection(w.p);
          if (!p) continue;
          const s = s0 * (0.45 + 0.55 * Math.cos(d));
          const y = p[1] + (reduceMotion ? 0 : Math.sin(now / 700 + w.ph) * 1.4);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * waveA * Math.cos(d)})`;
          ctx.beginPath();
          ctx.moveTo(p[0] - 2 * s, y);
          ctx.quadraticCurveTo(p[0] - s, y - s * 0.8, p[0], y);
          ctx.quadraticCurveTo(p[0] + s, y + s * 0.8, p[0] + 2 * s, y);
          ctx.stroke();
        }
      }

      // candy-coloured countries with ink outlines
      L.groups.forEach((grp, k) => { ctx.beginPath(); path(grp); ctx.fillStyle = LAND[k]; ctx.fill(); });
      ctx.lineJoin = 'round';
      ctx.beginPath(); path(L.borders);
      ctx.strokeStyle = INK; ctx.lineWidth = 0.9; ctx.stroke();
      ctx.beginPath(); path(L.land);
      ctx.lineWidth = 1.6; ctx.stroke();

      // hovered / selected country pops up off the surface
      const hl = state.selected || state.hover;
      const lift = hl ? (state.selected ? 1 : boing(clamp((now - state.hoverAt) / 280, 0, 1))) : 0;
      if (hl && hl.feature) {
        ctx.save(); ctx.translate(0, 2);
        ctx.beginPath(); path(hl.feature); ctx.fillStyle = 'rgba(16, 20, 50, 0.4)'; ctx.fill();
        ctx.restore();
        ctx.save(); ctx.translate(0, -3 * lift);
        ctx.beginPath(); path(hl.feature); ctx.fillStyle = FOCUS; ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = INK; ctx.stroke();
        ctx.restore();
      }

      // island markers for places too small to see
      state.markerHits = [];
      const mr = clamp(r / 140, 3, 5);
      for (const c of markers) {
        if (c.feature && c.angR * r >= 3) continue;
        if (d3.geoDistance(c.anchor, center) > Math.PI / 2 - 0.03) continue;
        const p = projection(c.anchor);
        if (!p) continue;
        state.markerHits.push({ c, x: p[0], y: p[1] });
        const on = c === hl;
        const rr = on ? mr * 1.6 : mr;
        const y = p[1] - (on ? 3 * lift : 0);
        ctx.beginPath(); ctx.arc(p[0], y, rr, 0, TAU);
        ctx.fillStyle = on ? FOCUS : LAND[c.color]; ctx.fill();
        ctx.lineWidth = 1.6; ctx.strokeStyle = INK; ctx.stroke();
      }

      // "data pings": random places send out ripples
      if (decor > 0 && !reduceMotion && state.mode === 'globe') {
        if (now > state.nextPing) {
          for (let tries = 0; tries < 8; tries++) {
            const c = withFacts[Math.floor(Math.random() * withFacts.length)];
            if (d3.geoDistance(c.anchor, center) < Math.PI / 2 - 0.2) { state.pings.push({ c, t0: now }); break; }
          }
          state.nextPing = now + 450 + Math.random() * 450;
        }
        state.pings = state.pings.filter((pg) => now - pg.t0 < 1600);
        for (const pg of state.pings) {
          if (d3.geoDistance(pg.c.anchor, center) > Math.PI / 2 - 0.05) continue;
          const p = projection(pg.c.anchor);
          if (!p) continue;
          const col = CATS[pg.c.facts[0].cat].color;
          for (const lag of [0, 0.3]) {
            const a = (now - pg.t0) / 1600 - lag;
            if (a < 0 || a > 1) continue;
            ctx.globalAlpha = decor * (1 - a);
            ctx.strokeStyle = col; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.arc(p[0], p[1], 3 + a * clamp(r / 12, 14, 30), 0, TAU); ctx.stroke();
          }
          ctx.globalAlpha = decor * clamp(1 - (now - pg.t0) / 1600, 0, 1);
          ctx.fillStyle = col;
          ctx.beginPath(); ctx.arc(p[0], p[1], 2.6, 0, TAU); ctx.fill();
          ctx.lineWidth = 1.2; ctx.strokeStyle = INK; ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // toon shading: one hard-edged shadow band + a cartoon shine
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.clip();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, TAU);
      ctx.moveTo(cx - r * 0.12 + r, cy - r * 0.14);
      ctx.arc(cx - r * 0.12, cy - r * 0.14, r, 0, TAU);
      ctx.fillStyle = SHADE; ctx.fill('evenodd');
      ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.beginPath(); ctx.ellipse(cx - r * 0.42, cy - r * 0.5, r * 0.3, r * 0.13, -0.6, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(cx - r * 0.73, cy - r * 0.2, r * 0.05, 0, TAU); ctx.fill();
      ctx.restore();

      // ink rim + halo line
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU);
      ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r + 6, 0, TAU);
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(160, 235, 255, 0.35)'; ctx.stroke();

      // clouds float above everything
      const cloudA = decor * clamp((2.4 - z) / 1, 0, 1);
      if (cloudA > 0) drawClouds(now, v, center, cloudA);

      if (satA > 0) {
        ctx.globalAlpha = satA;
        drawOrbit(v, true, 0.5);
        if (sat.z >= 0) drawSatellite(sat, v, now);
        ctx.globalAlpha = 1;
      }

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
        anim.step(ease(t), t);
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
      draw(moving, now);
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
      let best = null, bd = 9;
      for (const m of state.markerHits) {
        const d = Math.hypot(m.x - x, m.y - y);
        if (d < bd) { bd = d; best = m.c; }
      }
      if (best) return best;
      const v = currentView();
      if (Math.hypot(x - v.tx, y - v.ty) > v.scale) return null;
      const ll = projection.invert([x, y]);
      if (!ll || isNaN(ll[0])) return null;
      for (const c of shaped) {
        if (!boundsContains(c.bounds, ll[0], ll[1])) continue;
        if (d3.geoContains(c.feature, ll)) return c;
      }
      return null;
    }

    function setHover(c, x, y) {
      if (c !== state.hover) {
        state.hover = c;
        state.hoverAt = performance.now();
        canvas.classList.toggle('is-pointing', !!c);
        if (c) {
          const flag = c.prof ? `<img src="${flagUrl(c.prof.cca2, 40)}" alt="">` : '';
          const f = c.facts[0];
          tooltip.innerHTML = `<strong>${flag}${esc(c.name)}</strong>` + (f
            ? `<span class="gt-tip-fact" style="--c:${CATS[f.cat].color}">${CATS[f.cat].icon}<b>${esc(heroText(f.hero))}</b> ${esc(f.lab)}</span><small>${c.facts.length} fact${c.facts.length > 1 ? 's' : ''} · click to explore</small>`
            : '<small>No facts in the dataset yet</small>');
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
      const fg = c.feature ? focusGeometry(c.feature.geometry) : d3.geoCircle().center(c.point).radius(1.4)();
      const center = c.feature ? d3.geoCentroid(fg) : c.point;
      const narrow = root.classList.contains('gt--narrow');
      // leave room around the country for the fact bubbles
      const padX = narrow ? 64 : Math.min(150, w * 0.17);
      const padY = narrow ? 52 : 90;
      const top = narrow ? 64 : 84;
      const proj = d3.geoOrthographic().clipAngle(90).precision(0.3)
        .rotate([-center[0], -center[1], 0])
        .fitExtent([[padX, top], [Math.max(padX + 10, w - padX), Math.max(top + 10, h - padY)]], fg);
      // keep tiny countries from becoming absurdly zoomed
      const maxScale = Math.min(w, h) * 60;
      if (proj.scale() > maxScale) proj.scale(maxScale).translate([w / 2, (h + top - padY) / 2]);
      return { proj, center, fg };
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

      // First turn the globe to face the country (with a little squash), then zoom in.
      const turnDur = reduceMotion ? 1 : 550 + angle * 6;
      const zoomDur = reduceMotion ? 1 : 1100;
      const mid = { scale: Math.max(from.scale, state.base), tx: from.tx, ty: from.ty };
      anim = {
        t0: performance.now(), dur: turnDur,
        step(t, raw) {
          const squash = reduceMotion ? 0 : 0.06 * Math.sin(Math.PI * clamp(raw * 2.5, 0, 1));
          state.rot = [r0[0] + (r1[0] - r0[0]) * t, r0[1] + (r1[1] - r0[1]) * t];
          state.view = { scale: (from.scale + (mid.scale - from.scale) * t) * (1 - squash), tx: from.tx + (mid.tx - from.tx) * t, ty: from.ty + (mid.ty - from.ty) * t };
        },
        done() {
          anim = {
            t0: performance.now(), dur: zoomDur,
            step(t) {
              state.decor = 1 - t;
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
      root.classList.remove('is-detail');
      tooltip.classList.remove('is-on');
      state.mode = 'flying';
      const from = Object.assign({}, state.view || currentView());
      const to = { scale: state.base * state.zoom, tx: state.W / 2, ty: state.H / 2 };
      // Start from the angle the detail map was showing.
      if (detailState.center) state.rot = [-detailState.center[0], -detailState.center[1]];
      anim = {
        t0: performance.now(), dur: reduceMotion ? 1 : 1000,
        step(t) {
          state.decor = t;
          state.view = {
            scale: from.scale * Math.pow(to.scale / from.scale, t),
            tx: from.tx + (to.tx - from.tx) * t,
            ty: from.ty + (to.ty - from.ty) * t
          };
        },
        done() {
          state.view = null;
          state.decor = 1;
          state.mode = 'globe';
          state.selected = null;
          state.lastInteract = performance.now();
          detail.hidden = true;
          bubbleBox.innerHTML = '';
          canvas.focus({ preventScroll: true });
        }
      };
      kick();
    }

    /* ── detail map (SVG) ─────────────────────────────── */
    const detailState = { c: null, proj: null, center: null, fg: null, transform: d3.zoomIdentity };
    const defs = svg.append('defs');
    const glow = defs.append('radialGradient').attr('id', 'gt-glow');
    glow.append('stop').attr('offset', (0.96 / 1.12).toFixed(4)).attr('stop-color', 'rgba(140, 230, 255, 0.5)');
    glow.append('stop').attr('offset', '1').attr('stop-color', 'rgba(140, 230, 255, 0)');
    const clipCircle = defs.append('clipPath').attr('id', 'gt-clip').append('circle');

    const gZoom = svg.append('g').attr('class', 'gt-map-zoom');
    const gLead = svg.append('g').attr('class', 'gt-leaders');
    const gPts = svg.append('g').attr('class', 'gt-pts');

    const zoom = d3.zoom()
      .scaleExtent([1, 24])
      .filter((e) => !e.button && !(e.target.closest && e.target.closest('.gt-pt')))
      .on('zoom', (e) => {
        detailState.transform = e.transform;
        gZoom.attr('transform', e.transform).style('--k', 1 / e.transform.k);
        placeOverlay();
      });
    svg.call(zoom).on('dblclick.zoom', null);

    function renderDetail(c, resetZoom) {
      const mr = mapWrap.getBoundingClientRect();
      const w = mr.width, h = mr.height;
      const { proj, center, fg } = detailProjection(c, w, h);
      Object.assign(detailState, { c, proj, center, fg });
      const p = d3.geoPath(proj);
      const [cx, cy] = proj.translate(), r = proj.scale();
      svg.attr('viewBox', `0 0 ${w} ${h}`).attr('aria-label', `Map of ${c.name}`);
      clipCircle.attr('cx', cx).attr('cy', cy).attr('r', r);

      gZoom.selectAll('*').remove();
      gZoom.append('circle').attr('class', 'glow').attr('cx', cx).attr('cy', cy).attr('r', r * 1.12);
      gZoom.append('path').attr('class', 'ocean').attr('d', p(sphere));
      gZoom.append('g').selectAll('path')
        .data(shaped)
        .join('path')
        .attr('class', (d) => 'land' + (d === c ? ' is-focus' : ''))
        .attr('fill', (d) => LAND[d.color])
        .attr('d', (d) => p(d.feature))
        .on('click', (e, d) => { if (d !== c) switchCountry(d); })
        .append('title').text((d) => d.name);
      gZoom.selectAll('.land.is-focus').raise();
      // same toon shading and shine as the globe, so the hand-off is seamless
      const ox = cx - r * 0.12, oy = cy - r * 0.14;
      gZoom.append('path').attr('class', 'shade').attr('clip-path', 'url(#gt-clip)')
        .attr('d', `M${cx + r},${cy}A${r},${r} 0 1,1 ${cx - r},${cy}A${r},${r} 0 1,1 ${cx + r},${cy}Z` +
          `M${ox + r},${oy}A${r},${r} 0 1,1 ${ox - r},${oy}A${r},${r} 0 1,1 ${ox + r},${oy}Z`);
      gZoom.append('ellipse').attr('class', 'shine')
        .attr('cx', cx - r * 0.42).attr('cy', cy - r * 0.5).attr('rx', r * 0.3).attr('ry', r * 0.13)
        .attr('transform', `rotate(${-0.6 * DEG} ${cx - r * 0.42} ${cy - r * 0.5})`);
      gZoom.append('circle').attr('class', 'shine').attr('cx', cx - r * 0.73).attr('cy', cy - r * 0.2).attr('r', r * 0.05);
      gZoom.append('circle').attr('class', 'rim').attr('cx', cx).attr('cy', cy).attr('r', r);

      // keep the globe's end state in sync for the reverse animation
      const rr = root.getBoundingClientRect();
      state.view = { scale: r, tx: mr.left - rr.left + cx, ty: mr.top - rr.top + cy };

      buildOverlay(c);
      if (resetZoom) svg.call(zoom.transform, d3.zoomIdentity);
      else placeOverlay();
      renderPanel(c);
    }

    function switchCountry(c) {
      tooltip.classList.remove('is-on');
      state.selected = c;
      root.classList.add('is-switching');
      setTimeout(() => {
        renderDetail(c, true);
        panel.scrollTop = 0;
        root.classList.remove('is-switching');
      }, reduceMotion ? 0 : 220);
    }

    /* ── fact bubbles + leader lines on the map ───────── */
    let bubbles = [];
    function buildOverlay(c) {
      bubbleBox.innerHTML = c.facts.map((f, i) => {
        const cat = CATS[f.cat];
        return `<button class="gt-bubble" data-i="${i}" style="--c:${cat.color};--d:${(0.15 + i * 0.12).toFixed(2)}s;--f:${(i * 0.7).toFixed(1)}s" aria-label="Fact ${i + 1}: ${esc(f.t)}">
          <span class="gt-bnum">${i + 1}</span><span class="gt-bicon">${cat.icon}</span><b class="gt-bval">${esc(heroText(f.hero))}</b></button>`;
      }).join('');
      bubbles = [...bubbleBox.querySelectorAll('.gt-bubble')];
      bubbles.forEach((b, i) => {
        countUp(b.querySelector('.gt-bval'), c.facts[i].hero, 250 + i * 150);
        b.addEventListener('click', () => focusCard(i));
        b.addEventListener('mouseenter', () => setHot(i, true));
        b.addEventListener('mouseleave', () => setHot(i, false));
      });
      gLead.selectAll('*').remove();
      gLead.selectAll('line').data(c.facts).join('line')
        .attr('class', 'gt-lead').style('--c', (f) => CATS[f.cat].color);

      // markers for places without a shape (the focused one gets a big pin)
      gPts.selectAll('*').remove();
      const pts = countries.filter((d) => !d.feature);
      const sel = gPts.selectAll('g').data(pts).join('g')
        .attr('class', (d) => 'gt-pt' + (d === c ? ' is-focus' : ''))
        .on('click', (e, d) => { if (d !== c) switchCountry(d); });
      sel.append('circle').attr('class', 'halo').attr('r', 14);
      sel.append('circle').attr('class', 'dot').attr('r', (d) => d === c ? 9 : 5).attr('fill', (d) => d === c ? FOCUS : LAND[d.color]);
      sel.append('title').text((d) => d.name);
    }

    function placeOverlay() {
      const { c, proj, center, fg, transform } = detailState;
      if (!proj) return;
      const svgEl = svg.node();
      const w = svgEl.viewBox.baseVal.width, h = svgEl.viewBox.baseVal.height;

      gPts.selectAll('g.gt-pt')
        .classed('is-hidden', (d) => d3.geoDistance(d.point, center) > Math.PI / 2 - 0.02)
        .attr('transform', (d) => { const p = transform.apply(proj(d.point)); return `translate(${p[0]},${p[1]})`; });

      if (!bubbles.length) return;
      const a = transform.apply(proj(c.feature ? center : c.point));
      const b = d3.geoPath(proj).bounds(fg).map((pt) => transform.apply(pt));
      const rx = Math.max((b[1][0] - b[0][0]) / 2 + 80, 120);
      const ry = Math.max((b[1][1] - b[0][1]) / 2 + 50, 90);
      const n = bubbles.length;
      const narrow = root.classList.contains('gt--narrow');
      const flip = a[0] > w * 0.58 ? -1 : 1; // put the bubbles on the roomier side
      const spread = n === 1 ? [-30] : n === 2 ? [-35, 35] : [-55, 0, 55];
      const pos = spread.map((deg) => {
        const t = deg / DEG;
        return [
          clamp(a[0] + flip * rx * Math.cos(t), narrow ? 52 : 70, w - (narrow ? 52 : 70)),
          clamp(a[1] + ry * Math.sin(t), narrow ? 70 : 90, h - 30)
        ];
      });
      // keep bubbles from stacking on top of each other
      for (let i = 1; i < pos.length; i++) {
        if (Math.abs(pos[i][0] - pos[i - 1][0]) < 120 && pos[i][1] - pos[i - 1][1] < 48) pos[i][1] = pos[i - 1][1] + 48;
      }
      bubbles.forEach((el, i) => { el.style.left = pos[i][0] + 'px'; el.style.top = pos[i][1] + 'px'; });
      gLead.selectAll('line.gt-lead')
        .attr('x1', a[0]).attr('y1', a[1])
        .attr('x2', (d, i) => pos[i][0]).attr('y2', (d, i) => pos[i][1]);
    }

    function setHot(i, on) {
      if (bubbles[i]) bubbles[i].classList.toggle('is-hot', on);
      gLead.selectAll('line.gt-lead').classed('is-hot', (d, j) => on && j === i);
      const card = panel.querySelector(`.gt-fcard[data-i="${i}"]`);
      if (card) card.classList.toggle('is-hot', on);
    }

    function focusCard(i) {
      const card = panel.querySelector(`.gt-fcard[data-i="${i}"]`);
      if (!card) return;
      card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
      card.classList.remove('is-flash');
      void card.offsetWidth; // restart the flash animation
      card.classList.add('is-flash');
      card.focus({ preventScroll: true });
    }

    function zoomBy(k) { svg.transition().duration(350).call(zoom.scaleBy, k); }

    /* ── side panel: one highlighted card per fact ────── */
    function ringSvg(v) {
      const L = 2 * Math.PI * 26;
      return `<svg class="gt-ring" viewBox="0 0 64 64" aria-hidden="true"><circle class="trk" cx="32" cy="32" r="26"/>` +
        `<circle class="val" cx="32" cy="32" r="26" style="stroke-dasharray:${L.toFixed(1)};stroke-dashoffset:${(L * (1 - clamp(v, 0, 100) / 100)).toFixed(1)};--full:${L.toFixed(1)}"/></svg>`;
    }

    function vizHtml(f) {
      const v = f.viz;
      if (!v || v.k === 'ring') return '';
      if (v.k === 'rank') {
        return `<div class="gt-viz gt-viz--track good-low"><div class="gt-track"><i class="gt-marker" style="left:${pct((v.r - 1) / (v.n - 1))}"></i></div>` +
          `<div class="gt-ends"><span>#1</span><span>#${v.n}</span></div></div>`;
      }
      if (v.k === 'scale') {
        const s = META.scales[v.id];
        const tf = s.log ? Math.log : (x) => x;
        const pos = (tf(v.v) - tf(s.min)) / (tf(s.max) - tf(s.min));
        const val = (x) => s.unit === '$' ? '$' + x.toFixed(2) : x.toFixed(2) + s.unit;
        return `<div class="gt-viz gt-viz--track ${s.better === 'low' ? 'good-low' : 'good-high'}"><div class="gt-track"><i class="gt-marker" style="left:${pct(pos)}"></i></div>` +
          `<div class="gt-ends"><span>${esc(s.minName)} <b>${val(s.min)}</b></span><span>${esc(s.maxName)} <b>${val(s.max)}</b></span></div>` +
          `<div class="gt-viz-cap">World range · ${esc(s.label)}${s.log ? ' · log scale' : ''}</div></div>`;
      }
      if (v.k === 'dots') {
        return `<div class="gt-viz gt-dots" aria-hidden="true">${d3.range(1, v.n + 1).map((k) => `<i class="${k === v.r ? 'on' : k < v.r ? 'above' : ''}" style="--j:${k}"></i>`).join('')}</div>` +
          `<div class="gt-viz-cap">#${v.r} of the top ${v.n}</div>`;
      }
      if (v.k === 'tier') {
        return `<div class="gt-viz gt-tiers" aria-hidden="true">${d3.range(1, v.n + 1).map((k) => `<i class="${k === v.r ? 'on' : ''}" style="--h:${(1 - (k - 1) / v.n) * 100}%;--j:${k}"><span>T${k}</span></i>`).join('')}</div>` +
          `<div class="gt-viz-cap">Tier 1 ("role-modelling") is the top of 5 tiers</div>`;
      }
      return '';
    }

    function cardHtml(f, i) {
      const cat = CATS[f.cat];
      const src = META.sources[f.src] || {};
      const ring = f.viz && f.viz.k === 'ring' ? ringSvg(f.viz.v) : '';
      return `<li><article class="gt-fcard" tabindex="0" data-i="${i}" style="--c:${cat.color};--d:${(0.2 + i * 0.14).toFixed(2)}s">
        <header class="gt-fhead"><span class="gt-fnum">${i + 1}</span><span class="gt-ficon">${cat.icon}</span><span class="gt-fcat">${cat.label}</span>${f.yr ? `<span class="gt-fyr">${esc(f.yr)}</span>` : ''}</header>
        <div class="gt-hero-row">
          <div class="gt-hero-main">
            <div class="gt-hero"><span class="gt-hero-num">${esc(heroText(f.hero))}</span>${f.delta ? `<span class="gt-delta">▲ ${f.delta}%</span>` : ''}</div>
            <div class="gt-hero-lab">${esc(f.lab)}</div>
          </div>${ring}
        </div>
        ${f.badge ? `<span class="gt-badge">${ICONS.trophy}${esc(f.badge)}</span>` : ''}
        ${vizHtml(f)}
        <p class="gt-ftext">${markText(f.t, f.hl)}</p>
        ${f.ctx ? `<p class="gt-ctx">${esc(f.ctx)}</p>` : ''}
        <footer class="gt-ffoot"><span class="gt-tag" style="--t:${TAGS[f.tag] || '#adb5bd'}">${esc(f.tag)}</span>${src.url ? `<a href="${esc(src.url)}" target="_blank" rel="noopener">${esc(src.label)}${ICONS.link}</a>` : ''}</footer>
      </article></li>`;
    }

    function renderPanel(c) {
      const p = c.prof;
      const sub = p ? [
        p.region ? [p.region, p.subregion].filter(Boolean).join(' · ') : '',
        p.capital && p.capital.length ? 'Capital: ' + p.capital[0] : '',
        p.population ? fmt.format(p.population) + ' people' : ''
      ].filter(Boolean) : [];
      const cats = [...new Set(c.facts.map((f) => f.cat))];

      panel.innerHTML = `
        <div class="gt-head">
          ${p ? `<img class="gt-flag" src="${flagUrl(p.cca2, 160)}" alt="Flag of ${esc(c.name)}" onerror="this.style.visibility='hidden'">` : ''}
          <div><h2>${esc(c.name)}</h2>${sub.length ? `<p class="gt-sub">${sub.map(esc).join(' <i>•</i> ')}</p>` : ''}</div>
        </div>
        ${c.facts.length ? `
          <div class="gt-summary"><b>${c.facts.length}</b> tech &amp; data fact${c.facts.length > 1 ? 's' : ''}
            <span class="gt-catpills">${cats.map((k) => `<span style="--c:${CATS[k].color}" title="${CATS[k].label}">${CATS[k].icon}</span>`).join('')}</span></div>
          <ol class="gt-cards">${c.facts.map(cardHtml).join('')}</ol>`
        : `<p class="gt-note">The dataset has no sourced tech or data facts for ${esc(c.name)} yet. Try a neighbour, or hit the dice for a surprise.</p>`}
        <p class="gt-srcs">Facts: <i>${esc(META.title)}</i>. Each card links to its original source; the chip shows what kind of source it is.
          Charts compare against the other places in the same dataset. Flags: flagcdn.com</p>
      `;
      panel.querySelectorAll('.gt-fcard').forEach((card) => {
        const i = +card.dataset.i;
        countUp(card.querySelector('.gt-hero-num'), c.facts[i].hero, 350 + i * 160);
        card.addEventListener('mouseenter', () => setHot(i, true));
        card.addEventListener('mouseleave', () => setHot(i, false));
        card.addEventListener('focus', () => setHot(i, true));
        card.addEventListener('blur', () => setHot(i, false));
      });
    }

    /* ── HUD + global controls ────────────────────────── */
    function randomCountry() {
      const pool = withFacts.filter((c) => c !== state.selected);
      return pool[Math.floor(Math.random() * pool.length)];
    }
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const act = b.dataset.act;
      if (act === 'back') closeDetail();
      else if (act === 'zin') zoomBy(1.6);
      else if (act === 'zout') zoomBy(1 / 1.6);
      else if (act === 'zreset') svg.transition().duration(450).call(zoom.transform, d3.zoomIdentity);
      else if (act === 'random') {
        if (state.mode === 'detail') switchCountry(randomCountry());
        else flyTo(randomCountry());
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
      if (e.key === 'Escape' && state.mode === 'detail') closeDetail();
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
      flyTo: (nameOrCode) => {
        const c = findCountry(String(nameOrCode));
        if (!c) return;
        if (state.mode === 'detail') switchCountry(c); else flyTo(c);
      },
      back: closeDetail
    };
  }

  window.GlobeTrivia = { mount };
})();
