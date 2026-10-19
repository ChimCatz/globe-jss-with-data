"""
Sanity-check data/tech-trivia.js.

  - every fact's source key resolves to a URL in the Source Key table,
  - every fact's highlight phrase appears in its sentence,
  - every source URL loads; the page title is printed so you can eyeball
    that each key points at the right page.

This does NOT prove the wording of a fact is correct - read the linked
sources for that. It catches broken links and data-entry slips.

Usage:  python tools/verify-sources.py [--offline]
"""
import json
import pathlib
import re
import sys
import urllib.request
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parent.parent
UA = {"User-Agent": "Mozilla/5.0 (globe-trivia-verify/2.0; https://github.com/ChimCatz/globe-jss-with-data)"}


def load():
    text = (ROOT / "data" / "tech-trivia.js").read_text(encoding="utf-8")
    return json.loads(text[text.index("=") + 1:].rstrip().rstrip(";"))


def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.read(400_000).decode("utf-8", "replace")


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    data = load()
    sources = data["meta"]["sources"]
    problems = 0
    used = Counter()

    for cca3, facts in data["byCca3"].items():
        for f in facts:
            used[f["src"]] += 1
            if f["src"] not in sources:
                problems += 1
                print(f"FAIL [{cca3} #{f['n']}] unknown source key {f['src']}")
            if f["hl"] not in f["t"]:
                problems += 1
                print(f"FAIL [{cca3} #{f['n']}] highlight {f['hl']!r} not in {f['t']!r}")

    print(f"{sum(used.values())} facts, {len(data['byCca3'])} places, {len(used)} source keys in use\n")
    if "--offline" in sys.argv:
        print(f"{problems} problem(s)")
        return

    for key, src in sources.items():
        try:
            status, html = get(src["url"])
            m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
            title = re.sub(r"\s+", " ", m.group(1)).strip() if m else ("(PDF)" if html.startswith("%PDF") else "?")
            print(f"ok   {key:8} {status} ({used[key]} facts) {title[:90]}")
        except Exception as e:  # noqa: BLE001
            problems += 1
            print(f"FAIL {key:8} ({used[key]} facts) {src['url']} -> {e}")
    print(f"\n{problems} problem(s)")


if __name__ == "__main__":
    main()
