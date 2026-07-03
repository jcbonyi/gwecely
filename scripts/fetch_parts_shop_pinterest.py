"""Fetch vehicle parts shop image from Pinterest.

Sources:
- https://www.pinterest.com/search/pins/?q=vehicle%20parts%20and%20accessories%20shop
- https://www.pinterest.com/ideas/car-spare-parts-shop-interior-design/896866056137/
"""
from __future__ import annotations

import os
import re
import urllib.parse
import urllib.request

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
ROOT = os.path.join(os.path.dirname(__file__), "..", "client", "public", "highlights")
OUT = os.path.join(ROOT, "parts-shop.jpg")

# Curated from Pinterest auto parts / spare parts shop ideas (pinimg.com)
PINIMG_CANDIDATES = [
    ("auto care store products display", "f2/d9/2d/f2d92df5d2526674e091471ec9417b39.jpg"),
    ("parts counter retail display", "b6/b8/c1/b6b8c1c8eb50edcc9fdd2e2b5645a426.jpg"),
    ("car shop shelves and tools", "ba/62/7f/ba627f4da910b34d82276a14c47a50ec.jpg"),
    ("store interior with shelving", "43/6a/55/436a55757b887d024105f56de3ba2907.jpg"),
    ("motor oil and lubricants aisle", "8f/84/d6/8f84d64ef387c255fc7eb74f5fc6437a.jpg"),
]

IDEA_PAGES = [
    "https://www.pinterest.com/ideas/car-spare-parts-shop-interior-design/896866056137/",
    "https://www.pinterest.com/carlosduarte0613/ideas-on-auto-parts-store-shelving/",
]


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")


def extract_236x_hashes(html: str) -> list[str]:
    hashes: list[str] = []
    for m in re.finditer(r"https://i\.pinimg\.com/236x/([0-9a-f/]+\.(?:jpg|jpeg|png))", html):
        hashes.append(m.group(1))
    seen: set[str] = set()
    out: list[str] = []
    for h in hashes:
        if h not in seen:
            seen.add(h)
            out.append(h)
    return out


def download_hash(path_hash: str, dest: str, max_bytes: int = 900_000) -> tuple[str, int] | None:
    for size in ("originals", "1200x", "736x", "564x"):
        url = f"https://i.pinimg.com/{size}/{path_hash}"
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": UA, "Referer": "https://www.pinterest.com/"},
            )
            data = urllib.request.urlopen(req, timeout=30).read()
            if 20_000 <= len(data) <= max_bytes:
                with open(dest, "wb") as f:
                    f.write(data)
                return url, len(data)
        except Exception:
            continue
    return None


def main() -> None:
    os.makedirs(ROOT, exist_ok=True)

    # Prefer curated auto-parts retail shots
    for label, path_hash in PINIMG_CANDIDATES:
        result = download_hash(path_hash, OUT)
        if result:
            url, size = result
            print(f"SAVED {OUT} ({size} bytes) — {label}")
            print(f"  {url}")
            return

    # Fallback: scrape Pinterest idea pages
    merged: list[str] = []
    seen: set[str] = set()
    for page in IDEA_PAGES:
        for h in extract_236x_hashes(fetch(page)):
            if h not in seen:
                seen.add(h)
                merged.append(h)

    for path_hash in merged:
        result = download_hash(path_hash, OUT)
        if result:
            url, size = result
            print(f"SAVED {OUT} ({size} bytes) — idea page")
            print(f"  {url}")
            return

    raise SystemExit("No suitable Pinterest image downloaded")


if __name__ == "__main__":
    main()
