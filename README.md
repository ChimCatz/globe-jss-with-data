# Globe Trivia 🌍

A cartoon-style 3D globe you can drag, spin and zoom. Click any country and the globe flies into a map of it and reveals its **tech & data facts**: 680 sourced facts for 241 countries and territories (2020–2026), each one highlighted with its headline figure, a mini chart and a link to its source.

Built with plain **HTML + CSS + JavaScript** (no build step, no framework). Open `index.html` directly from disk or host it anywhere.

![flow](https://img.shields.io/badge/drag-spin-blue) ![flow](https://img.shields.io/badge/click-zoom%20in-orange) ![flow](https://img.shields.io/badge/facts-highlighted%20cards-green)

## Features

- **Cartoon globe**: candy-coloured countries (neighbours never share a colour), ink outlines, a flat toon-shaded ocean with wave squiggles, drifting puffy clouds, an orbiting satellite, "data ping" ripples and twinkling sparkles. Hovered countries pop up off the surface.
- **Draggable** with inertia, scroll or pinch zoom, a gentle idle float and auto-rotate, plus arrow-key and Enter support.
- **Hover tooltips** show the flag and the country's first headline fact.
- **Island markers** make tiny countries and territories clickable, including places with no shape on the map (Gibraltar, Tuvalu, Réunion…).
- **Fly-in transition**: the globe squashes, turns to face the country and zooms in, then crossfades into an SVG map drawn in the same style at the same angle and scale.
- **Every fact is highlighted**:
  - a card per fact with a count-up headline figure in its category colour (internet use, e-government, mobile data, broadband speed and price, crypto, cybersecurity, chips & AI, digital economy, domain names, connectivity);
  - a mini chart: a ring for percentages, a 1–193 rank bar, the world price/speed range (with the cheapest and priciest places from the dataset), top-20 dots or cybersecurity tiers;
  - the key phrase marked in the original sentence, a "record" sticker for world and regional extremes, and growth chips;
  - a source-type chip (International Org, Research/Report, News Media, Government/Official, Company-Marketed) and a link to the original source.
- **Fact bubbles** float around the country on the map, joined to it by animated leader lines. Click one to jump to its card; hovering either one highlights the other.
- **Responsive**: the side panel becomes a bottom sheet on narrow widths. The breakpoint follows the widget's own width, not the viewport's.
- **Accessible**: keyboard-focusable cards and bubbles, Esc to go back, and support for `prefers-reduced-motion` (no count-ups, clouds stay still).
- **Adaptive detail**: draws 50m-resolution borders, and drops to 110m while moving if a device is too slow.

## Run it

Just open `index.html` in a browser. All data is shipped as `<script>` files, so it even works from `file://`.

The only things that need internet are the flag images and the Google Fonts (Fredoka and Nunito). Everything else works offline, and those parts fall back gracefully.

## Project structure

```
index.html              demo page (full-screen)
css/globe-trivia.css    all styles, scoped under .gt, themable via CSS variables
js/globe-trivia.js      the app: GlobeTrivia.mount(element, options)
data/tech-trivia.js     generated: the tech & data facts (from the dataset .md)
data/countries.js       generated: profile for every country
data/world-50m.js       generated: country shapes (Natural Earth via world-atlas)
data/world-110m.js      generated: low-res shapes used while spinning
vendor/                 d3 v7.9.0, topojson-client v3.1.0
tools/build-data.py     regenerates the map and country-profile files
tools/build-tech-data.py builds data/tech-trivia.js from the dataset .md
tools/verify-sources.py checks every fact's source key, highlight and link
```

## Updating the facts

The facts come from the **Global Tech & Data Trivia Dataset** Markdown file in the repo root. It has a CSV block (`country, trivia_number, trivia, tag, source`) and a Source Key table that maps each short source key to its URL. To change the facts, edit that file and rebuild:

```bash
python tools/build-tech-data.py      # writes data/tech-trivia.js
python tools/verify-sources.py       # checks keys, highlights and links (--offline skips the links)
```

For each row, the build script picks out the headline figure, the phrase to highlight, a category, the year and the data for the mini chart. The rules are per source key (`ITU`, `EGDI`, `MOB`, `SPD`, `BBP`, `CHA`, `GCI` …). One-off facts are listed in `OVERRIDES` at the top of the script. The script stops with an error if a new row doesn't match any rule, so add an override for it there. Country names are matched to `data/countries.js`; add spelling differences to `ALIASES`.

Some publishers (SEC, OECD, ISPreview, India's PIB) block scripted requests, so `verify-sources.py` reports them as failures. Open those links in a browser to confirm them.

## Embedding in a portfolio

```html
<link rel="stylesheet" href="globe/css/globe-trivia.css">
<section id="globe-app" style="height: 640px"></section>

<script src="globe/vendor/d3.min.js"></script>
<script src="globe/vendor/topojson-client.min.js"></script>
<script src="globe/data/world-110m.js"></script>
<script src="globe/data/world-50m.js"></script>
<script src="globe/data/countries.js"></script>
<script src="globe/data/tech-trivia.js"></script>
<script src="globe/js/globe-trivia.js"></script>
<script>
  const globe = GlobeTrivia.mount(document.getElementById('globe-app'), {
    title: 'Globe <span>Trivia</span>',
    subtitle: 'Spin the planet. Click any country to reveal its tech & data facts.',
    autoRotate: true,
    rotateSpeed: 5
  });
  // globe.flyTo('Japan'); globe.back();
</script>
```

- The container just needs a height. The widget fills it, and its animation pauses while it is scrolled out of view.
- To re-theme, override CSS variables such as `--gt-bg`, `--gt-accent`, `--gt-font` or `--gt-display` on `#globe-app`. The globe's own colours are the `INK`, `OCEAN`, `LAND` and `FOCUS` constants at the top of `js/globe-trivia.js`.
- Add the Google Fonts `<link>` from `index.html` for the cartoon lettering; without it, system fonts are used.
- **React / Next.js**: call `GlobeTrivia.mount(ref.current)` inside a `useEffect`.

## Data sources & licences

| What | Source | Licence |
|---|---|---|
| Country shapes | [Natural Earth](https://www.naturalearthdata.com/) via [world-atlas 2.0.2](https://github.com/topojson/world-atlas) | Public domain |
| Country profiles | [mledoze/countries](https://github.com/mledoze/countries) (pinned commit) | ODbL |
| Population | [World Bank Open Data](https://data.worldbank.org/indicator/SP.POP.TOTL) | CC BY 4.0 |
| Tech & data facts | Global Tech & Data Trivia Dataset (2020–2026); each fact links to its original source (ITU, UN DESA, Cable.co.uk, Chainalysis, company filings…) | per source |
| Flags | [flagcdn.com](https://flagcdn.com) | Public domain flags |
| Fonts | [Fredoka](https://fonts.google.com/specimen/Fredoka), [Nunito](https://fonts.google.com/specimen/Nunito) via Google Fonts | OFL |
| Rendering | [d3-geo](https://d3js.org/d3-geo), [topojson-client](https://github.com/topojson/topojson-client) | ISC |

> Note: REST Countries (`restcountries.com`) now requires an API key, so this project uses its upstream dataset (mledoze/countries) and the World Bank API directly. Both are free and keyless.

To refresh the generated data, run `python tools/build-data.py`.

## Roadmap / ideas

1. **Colour-by-metric mode**: tint the globe by internet use or mobile data price as a toggle, using the same dataset.
2. **Quiz mode**: "Which country has the world's cheapest mobile data?", using the same facts.
3. **Shareable deep links** such as `#/country/JP/fact/2`.
4. **Fill the gaps**: the dataset lists places with fewer than 3 facts (mostly small territories), which are good candidates for new rows.
