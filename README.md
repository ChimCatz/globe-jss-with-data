# Globe Trivia 🌍

An interactive 3D globe you can drag, spin and zoom. Click any country and the globe flies into a map of it, with numbered **trivia pins** you can click to read sourced facts.

Built with plain **HTML + CSS + JavaScript** (no build step, no framework). Open `index.html` directly from disk or host it anywhere.

![flow](https://img.shields.io/badge/drag-spin-blue) ![flow](https://img.shields.io/badge/click-zoom%20in-orange) ![flow](https://img.shields.io/badge/pins-trivia%20cards-green)

## Features

- **Draggable globe** with inertia, scroll or pinch zoom, auto-rotate when idle, and arrow-key and Enter support.
- **Hover tooltips** with the country's flag. Countries with curated trivia are highlighted in gold, and their facts show as glowing dots on the globe.
- **Fly-in transition**: the globe turns to face the country and zooms in. It then crossfades into a detailed SVG map at exactly the same angle and scale, so the hand-off looks seamless.
- **Country map** with numbered trivia pins and a ★ capital pin. You can pan and zoom it, and clicking a neighbouring country switches to that country.
- **Trivia cards** with year, category, the fact, a photo from Wikipedia, source links (Wikipedia, plus UNESCO where relevant) and previous/next navigation.
- **Every country has data.** All 241 map features get a profile (capital, population, area, languages and currency) and a live Wikipedia summary, even when no curated trivia exists yet.
- **Responsive**: the side panel becomes a bottom sheet on narrow widths. The breakpoint follows the widget's own width, not the viewport's.
- **Accessible**: keyboard-focusable pins, Esc to close or go back, focus trap in the card, and support for `prefers-reduced-motion`.
- **Adaptive detail**: draws 50m-resolution borders, and drops to 110m while moving if a device is too slow.

## Run it

Just open `index.html` in a browser. All data is shipped as `<script>` files, so it even works from `file://`.

The only things that need internet are the live Wikipedia summaries and photos, and the flag images. Everything else works offline, and those parts fall back gracefully.

## Project structure

```
index.html              demo page (full-screen)
css/globe-trivia.css    all styles, scoped under .gt, themable via CSS variables
js/globe-trivia.js      the app: GlobeTrivia.mount(element, options)
data/trivia.js          ✏️ curated trivia - edit this to add facts
data/countries.js       generated: profile for every country
data/world-50m.js       generated: country shapes (Natural Earth via world-atlas)
data/world-110m.js      generated: low-res shapes used while spinning
vendor/                 d3 v7.9.0, topojson-client v3.1.0
tools/build-data.py     regenerates the data/*.js files from the sources
tools/verify-sources.py checks every trivia link and pin position
```

## Adding trivia

Open `data/trivia.js`. Each country is keyed by its ISO 3166-1 numeric code; look the code up in `data/countries.js` (e.g. Philippines `"608"`, Japan `"392"`):

```js
"608": [
  {
    title: "The Chocolate Hills of Bohol",
    year: "1988",
    cat: "nature",               // nature | history | culture | record | science
    lat: 9.83, lon: 124.14,      // where the pin goes
    wiki: "Chocolate Hills",     // Wikipedia article: photo + source link
    text: "At least 1,260 ...",
    sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/653" }]
  }
]
```

Then run:

```bash
python tools/verify-sources.py
```

It checks that each Wikipedia article exists, that each pin is within 75 km of the article's coordinates, and that every extra source URL loads; it also prints each URL's page title so you can confirm it points at the right page. It can't prove the wording of a fact is correct, so always read the source before adding a fact.

## Embedding in a portfolio

```html
<link rel="stylesheet" href="globe/css/globe-trivia.css">
<section id="globe-app" style="height: 640px"></section>

<script src="globe/vendor/d3.min.js"></script>
<script src="globe/vendor/topojson-client.min.js"></script>
<script src="globe/data/world-110m.js"></script>
<script src="globe/data/world-50m.js"></script>
<script src="globe/data/countries.js"></script>
<script src="globe/data/trivia.js"></script>
<script src="globe/js/globe-trivia.js"></script>
<script>
  const globe = GlobeTrivia.mount(document.getElementById('globe-app'), {
    title: 'Globe <span>Trivia</span>',
    subtitle: 'Spin the planet. Click a country to dive in.',
    autoRotate: true,
    rotateSpeed: 5
  });
  // globe.flyTo('Philippines'); globe.back();
</script>
```

- The container just needs a height. The widget fills it, and its animation pauses while it is scrolled out of view.
- To re-theme, override CSS variables such as `--gt-bg`, `--gt-accent` or `--gt-font` on `#globe-app`.
- **React / Next.js**: call `GlobeTrivia.mount(ref.current)` inside a `useEffect`.

## Data sources & licences

| What | Source | Licence |
|---|---|---|
| Country shapes | [Natural Earth](https://www.naturalearthdata.com/) via [world-atlas 2.0.2](https://github.com/topojson/world-atlas) | Public domain |
| Country profiles | [mledoze/countries](https://github.com/mledoze/countries) (pinned commit) | ODbL |
| Population | [World Bank Open Data](https://data.worldbank.org/indicator/SP.POP.TOTL) | CC BY 4.0 |
| Summaries & photos | [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) (live) | CC BY-SA / per-image |
| Curated trivia | Written for this project; each fact links to Wikipedia and UNESCO where relevant | - |
| Flags | [flagcdn.com](https://flagcdn.com) | Public domain flags |
| Rendering | [d3-geo](https://d3js.org/d3-geo), [topojson-client](https://github.com/topojson/topojson-client) | ISC |

> Note: REST Countries (`restcountries.com`) now requires an API key, so this project uses its upstream dataset (mledoze/countries) and the World Bank API directly. Both are free and keyless.

To refresh the generated data, run `python tools/build-data.py`.

## Roadmap / ideas

1. **Province and region maps.** For the Philippines, add Natural Earth admin-1 or PSGC region boundaries and lazy-load them only when that country is opened, so you can see regions like Bohol and Palawan.
2. **More curated countries.** 21 are curated so far. A JSON or Google Sheet → `trivia.js` script would make it easy for non-developers to add facts.
3. **Auto-generated "did you know" facts** from Wikidata SPARQL (highest point, UNESCO sites, inception dates, and so on). They are structured and sourced, so they can run for every country.
4. **Textured Earth mode** (satellite or night lights) using [globe.gl](https://github.com/vasturiano/globe.gl) / three.js, keeping the same data and card UI.
5. **Shareable deep links** such as `#/country/PH/fact/3`.
6. **Quiz mode**: "Find the country where…" using the same facts.
