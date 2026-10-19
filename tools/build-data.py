"""
Build the static data files used by the globe.

Downloads open, keyless sources and writes them as plain <script>-loadable
JS files so index.html also works when opened straight from disk (file://).

  data/world-110m.js  - low-detail country shapes (used while dragging)
  data/world-50m.js   - medium-detail country shapes (idle globe + zoomed map)
  data/countries.js   - basic profile for every country

Sources
  - world-atlas 2.0.2 (Natural Earth, public domain)   https://github.com/topojson/world-atlas
  - mledoze/countries @c2ac004 (ODbL)                  https://github.com/mledoze/countries
  - World Bank Open Data API (CC BY 4.0)               https://data.worldbank.org

Usage:  python tools/build-data.py
"""
import json
import pathlib
import urllib.request
from datetime import date

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data"

WORLD_ATLAS = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/{}"
MLEDOZE = "https://cdn.jsdelivr.net/gh/mledoze/countries@c2ac0049c14edcf2436c7aa1b2493222a020b462/countries.json"
WB_POP = "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&mrnev=1&per_page=400"
WB_COUNTRY = "https://api.worldbank.org/v2/country?format=json&per_page=400"


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "globe-trivia-build/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8")


def write_js(path, var, payload, header):
    body = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    path.write_text(f"/* {header} */\nwindow.{var}={body};\n", encoding="utf-8")
    print(f"wrote {path.relative_to(ROOT)} ({path.stat().st_size // 1024} KB)")


def main():
    DATA.mkdir(exist_ok=True)

    for res in ("110m", "50m"):
        topo = json.loads(fetch(WORLD_ATLAS.format(f"countries-{res}.json")))
        write_js(DATA / f"world-{res}.js", f"WORLD_{res.upper()}", topo,
                 f"world-atlas@2.0.2 countries-{res} - Natural Earth (public domain)")

    countries = json.loads(fetch(MLEDOZE))
    pop_rows = json.loads(fetch(WB_POP))[1]
    wb_rows = json.loads(fetch(WB_COUNTRY))[1]

    pop = {r["countryiso3code"]: (r["value"], r["date"]) for r in pop_rows if r.get("value")}
    wb = {r["id"]: r for r in wb_rows}

    out = {}
    for c in countries:
        cca3 = c["cca3"]
        w = wb.get(cca3, {})
        cap_ll = None
        if w.get("latitude") and w.get("longitude"):
            cap_ll = [round(float(w["latitude"]), 4), round(float(w["longitude"]), 4)]
        p = pop.get(cca3)
        key = c.get("ccn3") or cca3
        out[key] = {
            "name": c["name"]["common"],
            "official": c["name"]["official"],
            "cca2": c["cca2"],
            "cca3": cca3,
            "flag": c.get("flag", ""),
            "capital": c.get("capital", []),
            "capitalLatLng": cap_ll,
            "latlng": c.get("latlng"),
            "region": c.get("region", ""),
            "subregion": c.get("subregion", ""),
            "area": c.get("area"),
            "languages": list((c.get("languages") or {}).values()),
            "currencies": [f'{v.get("name")} ({k})' for k, v in (c.get("currencies") or {}).items()],
            "population": p[0] if p else None,
            "populationYear": p[1] if p else None,
        }

    meta = {
        "built": date.today().isoformat(),
        "sources": [
            {"label": "mledoze/countries @c2ac004, Sep 2026 (ODbL)", "url": "https://github.com/mledoze/countries"},
            {"label": "World Bank Open Data - population SP.POP.TOTL (CC BY 4.0)",
             "url": "https://data.worldbank.org/indicator/SP.POP.TOTL"},
        ],
    }
    write_js(DATA / "countries.js", "COUNTRY_DATA", {"meta": meta, "byId": out},
             "Country profiles - mledoze/countries (ODbL) + World Bank (CC BY 4.0)")


if __name__ == "__main__":
    main()
