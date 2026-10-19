"""
Sanity-check data/trivia.js.

For every fact it
  - confirms the Wikipedia article exists (via the Wikipedia REST API),
  - compares the pin position with the article's coordinates (warns if > 75 km),
  - fetches every extra source URL and prints the page title so you can
    eyeball that e.g. a UNESCO id points at the right site.

This does NOT prove the wording of a fact is correct - read the linked
sources for that. It catches broken links, typos and misplaced pins.

Usage:  python tools/verify-sources.py
"""
import json
import math
import pathlib
import re
import subprocess
import sys
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
UA = {"User-Agent": "globe-trivia-verify/1.0 (https://github.com/ChimCatz/globe-jss-with-data)"}


def load_trivia():
    # trivia.js is a JS object literal, so let Node evaluate it.
    js = "global.window={};require(process.argv[1]);process.stdout.write(JSON.stringify(window.TRIVIA))"
    out = subprocess.run(["node", "-e", js, str(ROOT / "data" / "trivia.js")],
                         capture_output=True, text=True, check=True, encoding="utf-8")
    return json.loads(out.stdout)


def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.read().decode("utf-8", "replace")


def km(a, b):
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(h))


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    trivia = load_trivia()
    problems = 0
    for cid, facts in trivia.items():
        for f in facts:
            tag = f"[{cid}] {f['title']}"
            title = urllib.parse.quote(f["wiki"].replace(" ", "_"), safe="")
            try:
                _, body = get(f"https://en.wikipedia.org/api/rest_v1/page/summary/{title}")
                s = json.loads(body)
                c = s.get("coordinates")
                if c:
                    d = km((f["lat"], f["lon"]), (c["lat"], c["lon"]))
                    flag = "WARN" if d > 75 else "ok  "
                    problems += d > 75
                    print(f"{flag} {tag}: wiki ok, pin {d:.0f} km from article coords")
                else:
                    print(f"ok   {tag}: wiki ok (article has no coordinates)")
            except Exception as e:  # noqa: BLE001
                problems += 1
                print(f"FAIL {tag}: wikipedia '{f['wiki']}' -> {e}")

            for src in f.get("sources", []):
                try:
                    status, html = get(src["url"])
                    m = re.search(r"<title>(.*?)</title>", html, re.S | re.I)
                    print(f"       {status} {src['url']} -> {m.group(1).strip() if m else '?'}")
                except Exception as e:  # noqa: BLE001
                    problems += 1
                    print(f"FAIL   {src['url']} -> {e}")
    print(f"\n{problems} problem(s)")


if __name__ == "__main__":
    main()
