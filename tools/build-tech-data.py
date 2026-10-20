"""
Build data/tech-trivia.js from the "Global Tech & Data Trivia Dataset" Markdown file,
plus the "Round 2 Tech Trivia Dataset" when it is in the repo root.

The Markdown file holds a CSV block (country, trivia_number, trivia, tag, source)
and a Source Key table that maps each short source key to a publisher label and URL.
This script turns that into a <script>-loadable JS file keyed by ISO 3166-1 alpha-3
code (cca3, as used in data/countries.js) and, for every fact, works out:

  hl     the exact phrase to highlight in the sentence ("16.1%", "188th of 193" ...)
  hero   the headline figure shown big on the card ({p, v, s, d} or {x} for text)
  lab    a short caption for the headline figure
  cat    a category used for the colour and icon
  viz    data for a small chart (ring, rank bar, price/speed scale, dots, tiers)
  badge  a "record" sticker when the sentence states a world or regional extreme
  delta  growth, when the sentence says "up N%"
  ctx    where the value sits among the other places in this dataset

Round 2 rows cite a URL directly instead of a source key, and are mostly "firsts" rather
than statistics, so their headline figures, captions and categories are picked by hand in
tools/round2_cards.py. They are appended after a place's round 1 facts.

Usage:  python tools/build-tech-data.py ["path/to/dataset.md"]
        (defaults to the "Global Tech*Dataset*.md" file in the repo root)
"""
import csv
import datetime
import io
import json
import pathlib
import re
import sys
import urllib.parse

from round2_cards import CARDS as ROUND2_CARDS, HOSTS as ROUND2_HOSTS

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "tech-trivia.js"

# Dataset names that differ from the names in data/countries.js.
ALIASES = {
    "Cabo Verde": "CPV",
    "Côte d'Ivoire": "CIV",
    "Saint Helena": "SHN",
    "Sao Tome and Principe": "STP",
    "US Virgin Islands": "VIR",
    "Türkiye": "TUR",
    "Czech Republic": "CZE",
    "French Southern Territories": "ATF",
    "US Minor Outlying Islands": "UMI",
}
CITE = re.compile(r"\\\[\d+\\\]")  # escaped Markdown citations, e.g. "\[12\]"
YEAR = re.compile(r"\b(?:1[89]\d\d|20\d\d)\b")

CAT_BY_SOURCE = {
    "ITU": "internet", "PCBS": "internet", "OECD-K": "internet", "OECD-K2": "internet",
    "EGDI": "egov",
    "MOB": "mobile",
    "SPD": "speed", "SPD20": "speed", "STA23": "speed", "ITV": "speed",
    "BBP": "price", "BG26": "price", "VC26": "price",
    "CHA": "crypto", "DPRK": "crypto",
    "GCI": "cyber",
    "NVDA": "chips", "TSMC": "chips", "ASML": "chips", "SKH": "chips",
    "UPI": "economy", "CSO": "economy", "IOM": "economy", "IOM22": "economy", "GIB": "economy",
    "IMF-AI": "domain", "AI24": "domain", "TV": "domain",
    "TUS": "infra", "DCD-PF": "infra", "DCD-HO": "infra", "FLK": "infra", "SAM": "infra",
    "BEAD": "infra", "SURE": "infra",
}

# One-off facts whose headline figure can't be found by a generic rule.
# (country, trivia_number) -> (highlight phrase, hero, caption)
OVERRIDES = {
    ("Anguilla", 1): ("EC$87M", {"p": "EC$", "v": 87, "s": "M"}, ".ai domain sales in 2023"),
    ("Anguilla", 2): ("EC$105.5M", {"p": "EC$", "v": 105.5, "s": "M"}, ".ai domain income in 2024"),
    ("Tuvalu", 1): ("$5M a year", {"p": "$", "v": 5, "s": "M"}, "a year from the .tv domain"),
    ("India", 1): ("24,162 crore payments", {"p": "", "v": 24162, "s": " crore"}, "UPI payments in FY2025-26"),
    ("Ireland", 1): ("6,969 GWh", {"p": "", "v": 6969, "s": " GWh"}, "used by data centres in 2024"),
    ("Isle of Man", 1): ("14.2% of the economy", {"p": "", "v": 14.2, "s": "%"}, "of the economy is eGaming"),
    ("Isle of Man", 2): ("15.7% of the economy", {"p": "", "v": 15.7, "s": "%"}, "of the economy was eGaming"),
    ("Gibraltar", 1): ("about 30% of GDP", {"p": "~", "v": 30, "s": "%"}, "of GDP from online gambling"),
    ("Gibraltar", 2): ("4th-fastest broadband in the world", {"p": "#", "v": 4, "s": ""}, "fastest broadband in the world (2020)"),
    ("Greenland", 1): ("€125.3M", {"p": "€", "v": 125.3, "s": "M"}, "Tusass Connect subsea cable budget"),
    ("Guernsey", 1): ("£37.5M", {"p": "£", "v": 37.5, "s": "M"}, "island-wide fibre rollout"),
    ("Guernsey", 2): ("2Gbps symmetrical broadband", {"p": "", "v": 2, "s": " Gbps"}, "symmetrical broadband on sale"),
    ("Falkland Islands", 3): ("licensed Starlink", {"x": "Nov 2025"}, "Starlink satellite broadband licensed"),
    ("Samoa", 1): ("Starlink telecom licence", {"x": "Jan 2025"}, "Starlink telecom licence approved"),
    ("French Polynesia", 2): ("Natitua Sud subsea cable", {"x": "2023"}, "Natitua Sud subsea cable landed"),
    ("French Polynesia", 3): ("Honomoana subsea cable", {"x": "2023"}, "Honomoana subsea cable announced"),
    ("North Korea", 1): ("at least $2.02B", {"p": "$", "v": 2.02, "s": "B"}, "crypto stolen by state-linked hackers in 2025"),
    ("United States", 1): ("$215.9B", {"p": "$", "v": 215.9, "s": "B"}, "Nvidia record revenue, fiscal 2026"),
    ("Taiwan", 1): ("NT$3,809.05B", {"p": "NT$", "v": 3809.05, "s": "B"}, "TSMC revenue in 2025"),
    ("Netherlands", 1): ("€32.7B", {"p": "€", "v": 32.7, "s": "B"}, "ASML record sales in 2025"),
    ("South Korea", 1): ("97.15 trillion won", {"p": "₩", "v": 97.15, "s": "T"}, "SK hynix record revenue in 2025"),
    ("Kosovo", 1): ("98.6% of households", {"p": "", "v": 98.6, "s": "%"}, "of households had internet access"),
    ("Kosovo", 2): ("93%", {"p": "", "v": 93, "s": "%"}, "mobile broadband penetration"),
    ("Palestine", 1): ("92% of households", {"p": "", "v": 92, "s": "%"}, "of households had home internet"),
}

RANK = r"(?:No\.\s*1\b|\d+(?:st|nd|rd|th))"


def num(s):
    return float(s.replace(",", ""))


def decimals(s):
    return len(s.split(".")[1]) if "." in s else 0


def rank_value(s):
    return 1 if s.startswith("No") else int(re.match(r"\d+", s).group())


def parse_markdown(text):
    sources = {}
    in_table = False
    for line in text.splitlines():
        if line.startswith("## Source Key"):
            in_table = True
            continue
        if in_table:
            if line.startswith("## "):
                break
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if len(cells) == 3 and cells[0] not in ("Key", "---") and not set(cells[0]) <= {"-"}:
                sources[cells[0]] = {"label": cells[1], "url": cells[2].replace("&amp;", "&")}
    block = text.split("```csv", 1)[1].split("```", 1)[0]
    rows = list(csv.DictReader(io.StringIO(block.strip())))
    return sources, rows


def extract(row):
    """Return (hl, hero, lab, viz) for one fact using the per-category rules."""
    t, src, cat = row["trivia"], row["source"], row["cat"]
    key = (row["country"], int(row["trivia_number"]))
    if key in OVERRIDES:
        hl, hero, lab = OVERRIDES[key]
        viz = None
        if hero.get("s") == "%" and cat == "internet":
            viz = {"k": "ring", "v": hero["v"]}
        return hl, dict(hero), lab, viz

    if cat == "internet":
        m = re.search(r"(\d+(?:\.\d+)?)%", t)
        return m.group(0), {"p": "", "v": num(m.group(1)), "s": "%", "d": decimals(m.group(1))}, \
            "of people used the internet", {"k": "ring", "v": num(m.group(1))}

    if cat == "egov":
        m = re.search(r"last \((\d+)rd\)|(" + RANK + r")(?: of \d+)?", t)
        r = int(m.group(1)) if m.group(1) else rank_value(m.group(2))
        return m.group(0), {"p": "#", "v": r, "s": ""}, "of 193 in the UN E-Government Index", \
            {"k": "rank", "r": r, "n": 193}

    if cat == "mobile":
        m = re.search(r"\$(\d+\.\d+)(?:/GB)?", t)
        v = num(m.group(1))
        return m.group(0), {"p": "$", "v": v, "s": "", "d": decimals(m.group(1))}, \
            "for 1GB of mobile data", {"k": "scale", "id": "MOB", "v": v}

    if cat == "speed":
        m = re.search(r"(\d+(?:\.\d+)?) Mbps", t)
        v = num(m.group(1))
        viz = {"k": "scale", "id": "SPD", "v": v} if src == "SPD" else None
        return m.group(0), {"p": "", "v": v, "s": " Mbps", "d": decimals(m.group(1))}, \
            "average broadband speed", viz

    if cat == "price":
        m = re.search(r"\$(\d+(?:\.\d+)?)/month", t)
        v = num(m.group(1))
        viz = {"k": "scale", "id": "BBP", "v": v} if src == "BBP" else None
        return m.group(0), {"p": "$", "v": v, "s": "/mo", "d": decimals(m.group(1))}, \
            "average fixed broadband per month", viz

    if src == "CHA":
        m = re.search(RANK, t)
        r = rank_value(m.group(0))
        per_person = "per person" in t
        return m.group(0), {"p": "#", "v": r, "s": ""}, \
            "crypto adoption per person" if per_person else "Chainalysis crypto adoption index", \
            {"k": "dots", "r": r, "n": 20}

    if src == "GCI":
        return "Tier 1", {"x": "Tier 1"}, "ITU Global Cybersecurity Index 2024", {"k": "tier", "r": 1, "n": 5}

    if src == "BEAD":
        m = re.search(r"\$(\d+(?:\.\d+)?)M", t)
        return m.group(0), {"p": "$", "v": num(m.group(1)), "s": "M", "d": decimals(m.group(1))}, \
            "US BEAD broadband funding", None

    raise ValueError(f"No extraction rule for {key}: {t}")


BADGES = [
    (r"^Ranked No\. 1\b", lambda m: "World #1"),
    (r"^Ranked last", lambda m: "Ranked last"),
    (r"^(Cheapest|Fastest|Slowest|Most expensive)\b.* in the world", lambda m: {
        "Cheapest": "World's cheapest", "Fastest": "World's fastest",
        "Slowest": "World's slowest", "Most expensive": "World's priciest"}[m.group(1)]),
    (r"^Fastest broadband of all places", lambda m: "World's fastest"),
    (r"^Among the cheapest .* in the world", lambda m: "World top 10"),
    (r"^(\d+(?:st|nd|rd|th))[- ](cheapest|fastest|most expensive|slowest)\b.* in the world",
     lambda m: f"World's {m.group(1)} {'priciest' if m.group(2) == 'most expensive' else m.group(2)}"),
    (r"(\d+(?:st|nd|rd|th)) (cheapest|most expensive|priciest|slowest) in the world",
     lambda m: f"World's {m.group(1)} {'priciest' if m.group(2) == 'most expensive' else m.group(2)}"),
    (r"(\d+(?:st|nd|rd|th))-cheapest .* in the world", lambda m: f"World's {m.group(1)} cheapest"),
    (r"^(Cheapest|Fastest|Slowest|Most expensive)\b.* in (?:the )?([A-Z][\w ]+?) in \d{4}",
     lambda m: f"{m.group(2)}'s {'priciest' if m.group(1) == 'Most expensive' else m.group(1).lower()}"),
    (r"the priciest in (\w+)", lambda m: f"{m.group(1)}'s priciest"),
    (r"slowest in ([A-Z][\w ]+)$", lambda m: f"{m.group(1)}'s slowest"),
    (r"among (\w[\w ]*?)'s (fastest|priciest)", lambda m: f"Among {m.group(1)}'s {m.group(2)}"),
    (r"(\w+)'s (\d+(?:st|nd|rd|th)) cheapest", lambda m: f"{m.group(1)}'s {m.group(2)} cheapest"),
]


def parse_round2(text):
    """All CSV blocks of the Round 2 file (Block A + Block B)."""
    rows = []
    for block in text.split("```csv")[1:]:
        rows += csv.DictReader(io.StringIO(block.split("```", 1)[0].strip()))
    return rows


def source_label(url):
    u = urllib.parse.urlsplit(url)
    host = u.netloc.lower().removeprefix("www.")
    if host.endswith("wikipedia.org"):
        page = urllib.parse.unquote(u.path.rsplit("/", 1)[-1]).replace("_", " ")
        return f"Wikipedia: {page}"
    return ROUND2_HOSTS.get(host, host)


def round2_facts(rows, resolve, sources, facts):
    """Append the Round 2 rows to `facts`, registering one source key per URL."""
    key_by_url = {}
    seen = set()
    for row in rows:
        country = row["country"]
        n = int(row["trivia_number"])
        if (country, n) in seen:
            raise ValueError(f"Round 2 has {country} #{n} twice")
        seen.add((country, n))
        if (country, n) not in ROUND2_CARDS:
            raise ValueError(f"No card for Round 2 {country} #{n} - add it to tools/round2_cards.py")
        cat, hl, hero, lab, *badge = ROUND2_CARDS[(country, n)]
        text = row["trivia"].strip()
        if hl not in text:
            raise ValueError(f"Highlight {hl!r} not found in {country} #{n}: {text!r}")
        # some tags carry citations mid-word, e.g. "News\[23\]\[24\] Media"
        tag = re.sub(r"\s+", " ", CITE.sub("", row["tag"])).strip()
        url = CITE.sub("", row["source"]).strip()
        if not url.startswith("http"):
            raise ValueError(f"Round 2 {country} #{n} has no source URL: {row['source']!r}")
        if url not in key_by_url:
            key_by_url[url] = f"R2-{len(key_by_url) + 1}"
            sources[key_by_url[url]] = {"label": source_label(url), "url": url}
        if isinstance(hero, tuple):
            p, v, s = hero
            hero = {"p": p, "v": v, "s": s, "d": decimals(repr(v)) if isinstance(v, float) else 0}
        else:
            hero = {"x": hero}
        yr = YEAR.search(text)
        fact = {
            "t": text, "tag": tag, "src": key_by_url[url], "cat": cat,
            # the year chip, unless the headline already is that year
            "yr": yr.group(0) if yr and hero.get("x") != yr.group(0) else "",
            "hl": hl, "hero": hero, "lab": lab,
        }
        if hero.get("s") == "%":
            fact["viz"] = {"k": "ring", "v": hero["v"]}
        if badge:
            fact["badge"] = badge[0]
        place = facts.setdefault(resolve(country), [])
        fact["n"] = max((f["n"] for f in place), default=0) + 1
        place.append(fact)
    unused = set(ROUND2_CARDS) - seen
    if unused:
        raise ValueError(f"Cards without a Round 2 row: {sorted(unused)}")
    return len(seen)


def badge_for(text, src):
    for pat, make in BADGES:
        m = re.search(pat, text)
        if m:
            return make(m)
    if src == "CHA":
        return "Global top 20"
    return None


def main():
    md_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else next(ROOT.glob("Global Tech*Dataset*.md"))
    sources, rows = parse_markdown(md_path.read_text(encoding="utf-8"))

    countries_js = (ROOT / "data" / "countries.js").read_text(encoding="utf-8")
    profiles = json.loads(countries_js[countries_js.index("=") + 1:].rstrip().rstrip(";"))["byId"]
    by_name = {}
    for p in profiles.values():
        by_name[p["name"].lower()] = p["cca3"]
        by_name[p["official"].lower()] = p["cca3"]

    def resolve(name):
        cca3 = ALIASES.get(name) or by_name.get(name.lower())
        if not cca3:
            raise ValueError(f"Can't match {name!r} to data/countries.js")
        return cca3

    facts = {}
    for row in rows:
        # Some keys carry escaped Markdown citations, e.g. "ITU\[9\]".
        row["source"] = re.sub(r"\\\[\d+\\\]", "", row["source"]).strip()
        src = row["source"]
        if src not in sources:
            raise ValueError(f"Unknown source key {src!r} for {row['country']}")
        row["cat"] = CAT_BY_SOURCE[src]
        cca3 = resolve(row["country"])

        hl, hero, lab, viz = extract(row)
        if hl not in row["trivia"]:
            raise ValueError(f"Highlight {hl!r} not found in {row['trivia']!r}")
        if "v" in hero:
            hero.setdefault("d", decimals(repr(hero["v"])) if isinstance(hero["v"], float) else 0)
        yr = re.search(r"(?:FY)?20\d\d(?:[/-]\d{2}\b)?", row["trivia"])
        delta = re.search(r"\bup (\d+(?:\.\d+)?)%", row["trivia"])
        fact = {
            "n": int(row["trivia_number"]),
            "t": row["trivia"],
            "tag": row["tag"],
            "src": src,
            "cat": row["cat"],
            "yr": yr.group(0) if yr else "",
            "hl": hl,
            "hero": hero,
            "lab": lab,
        }
        if viz:
            fact["viz"] = viz
        b = badge_for(row["trivia"], src)
        if b:
            fact["badge"] = b
        if delta:
            fact["delta"] = num(delta.group(1))
        fact["_country"] = row["country"]
        facts.setdefault(cca3, []).append(fact)

    # Scales for the mini charts: the full range found in this dataset for that source.
    scales = {}
    for sid, label, unit, log, better in (
        ("MOB", "1GB of mobile data, 2023", "$", True, "low"),
        ("BBP", "Fixed broadband per month, 2024", "$", True, "low"),
        ("SPD", "Average broadband speed, 2024", " Mbps", False, "high"),
    ):
        pts = [(f["viz"]["v"], f["_country"]) for fs in facts.values() for f in fs
               if f.get("viz", {}).get("id") == sid]
        lo, hi = min(pts), max(pts)
        scales[sid] = {"label": label, "unit": unit, "log": log, "better": better,
                       "min": lo[0], "minName": lo[1], "max": hi[0], "maxName": hi[1]}

    # Context lines for the two sources that cover most places in the dataset.
    for sid, what, best, worst, beat in (
        ("ITU", "with ITU internet figures", "Highest", "Lowest", "Higher than"),
        ("MOB", "with mobile data prices", "Cheapest", "Priciest", "Cheaper than"),
    ):
        vals = [f["hero"]["v"] for fs in facts.values() for f in fs if f["src"] == sid]
        better = (lambda a, b: a > b) if sid == "ITU" else (lambda a, b: a < b)
        for fs in facts.values():
            for f in fs:
                if f["src"] != sid:
                    continue
                v = f["hero"]["v"]
                n = len(vals)
                if not any(better(x, v) for x in vals):
                    f["ctx"] = f"{best} of the {n} places {what} in this dataset"
                elif not any(better(v, x) for x in vals):
                    f["ctx"] = f"{worst} of the {n} places {what} in this dataset"
                else:
                    pct = max(1, round(100 * sum(better(v, x) for x in vals) / n))
                    f["ctx"] = f"{beat} {pct}% of the {n} places {what} in this dataset"

    for fs in facts.values():
        fs.sort(key=lambda f: f["n"])
        for f in fs:
            del f["_country"]

    titles = ["Global Tech & Data Trivia Dataset: 241 Countries and Territories, 2020-2026"]
    round2 = next(ROOT.glob("Round 2*Trivia*.md"), None)
    n2 = 0
    if round2:
        n2 = round2_facts(parse_round2(round2.read_text(encoding="utf-8")), resolve, sources, facts)
        titles.append("Round 2 Tech Trivia Dataset: Verified Items for Priority Territories, Antarctica and Major Tech Nations")
    # span of the years the facts talk about (leaving out forecasts such as "until 2028")
    this_year = datetime.date.today().year
    years = [int(y) for fs in facts.values() for f in fs for y in YEAR.findall(f["t"]) if int(y) <= this_year]

    payload = {
        "meta": {
            "title": titles[0],
            "titles": titles,
            "span": f"{min(years)}–{max(years)}",
            "facts": sum(len(v) for v in facts.values()),
            "places": len(facts),
            "sources": sources,
            "scales": scales,
        },
        "byCca3": facts,
    }
    body = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    OUT.write_text("/* Generated by tools/build-tech-data.py from the Global Tech & Data Trivia datasets - do not edit by hand */\n"
                   f"window.TECH_TRIVIA={body};\n", encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)}: {payload['meta']['facts']} facts for {len(facts)} places "
          f"({OUT.stat().st_size // 1024} KB), {n2} of them from Round 2")
    for k, s in scales.items():
        print(f"  scale {k}: {s['min']} ({s['minName']}) .. {s['max']} ({s['maxName']})")


if __name__ == "__main__":
    main()
