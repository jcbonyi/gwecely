"""Download product images from Pinterest search results."""
from __future__ import annotations

import json
import os
import re
import time
import urllib.parse
import urllib.request

OUT_DIR = r"c:\Users\Administrator\Desktop\ADTAPP\gwecely\client\public\products"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

PRODUCTS = [
    ("brake-disc.jpg", "car brake disc rotor close up"),
    ("timing-belt.jpg", "timing belt kit automotive"),
    ("shock-absorber.jpg", "car shock absorber suspension"),
    ("clutch-kit.jpg", "clutch kit automotive parts"),
    ("battery-60ah.jpg", "car battery 12v automotive"),
    ("battery-75ah.jpg", "heavy duty car battery SUV"),
    ("tyre-bridgestone.jpg", "car tyre close up tread"),
    ("tyre-michelin.jpg", "performance car tire wheel"),
    ("castrol-oil.jpg", "castrol engine oil bottle"),
    ("total-oil.jpg", "motor engine oil bottle 5 liter"),
    ("oil-filter.jpg", "oil filter automotive part"),
    ("air-filter.jpg", "engine air filter automotive"),
    ("paper-reams.jpg", "A4 printing paper ream stack"),
    ("pen-set.jpg", "executive ballpoint pen set"),
    ("filing-cabinet.jpg", "office filing cabinet 4 drawer"),
    ("office-chair.jpg", "executive office chair ergonomic"),
    ("office-desk.jpg", "L shape office desk modern"),
    ("laptop.jpg", "HP laptop computer 15 inch"),
    ("printer.jpg", "canon inkjet printer all in one"),
    ("hard-hat.jpg", "construction safety hard hat helmet"),
    ("first-aid.jpg", "first aid kit workplace"),
    ("fire-extinguisher.jpg", "CO2 fire extinguisher red"),
]


def fetch(url: str, timeout: int = 30) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=timeout).read().decode("utf-8", errors="ignore")


def extract_pin_images(html: str) -> list[str]:
    urls: list[str] = []

    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        try:
            data = json.loads(m.group(1))
            if isinstance(data, dict) and isinstance(data.get("image"), str):
                urls.append(data["image"])
        except json.JSONDecodeError:
            pass

    for pattern in (
        r"https://i\.pinimg\.com/originals/[0-9a-f/]+\.(?:jpg|jpeg|png)",
        r"https://i\.pinimg\.com/1200x/[0-9a-f/]+\.(?:jpg|jpeg|png)",
        r"https://i\.pinimg\.com/736x/[0-9a-f/]+\.(?:jpg|jpeg|png)",
    ):
        urls.extend(re.findall(pattern, html))

    cleaned: list[str] = []
    seen: set[str] = set()
    for u in urls:
        u = u.split("}")[0].split(")")[0]
        if "upload/" in u or "_RS/" in u or "/30x30" in u or "/75x75" in u:
            continue
        if u not in seen:
            seen.add(u)
            cleaned.append(u)
    return cleaned


def to_large(url: str) -> str:
    if "/originals/" in url:
        return url
    m = re.search(r"i\.pinimg\.com/\d+x/([0-9a-f/]+\.(?:jpg|jpeg|png))", url)
    if m:
        return f"https://i.pinimg.com/originals/{m.group(1)}"
    return url


def download(url: str, path: str) -> bool:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://www.pinterest.com/"})
        data = urllib.request.urlopen(req, timeout=30).read()
        if len(data) < 8000:
            return False
        with open(path, "wb") as f:
            f.write(data)
        return True
    except Exception as exc:
        print(f"    download fail: {exc}")
        return False


def search_pinterest(query: str) -> list[str]:
    q = urllib.parse.quote(query)
    url = f"https://www.pinterest.com/search/pins/?q={q}"
    html = fetch(url)
    return extract_pin_images(html)


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    results: dict[str, str] = {}

    for filename, query in PRODUCTS:
        out_path = os.path.join(OUT_DIR, filename)
        print(f"\n{filename} <- {query}")

        if os.path.exists(out_path) and os.path.getsize(out_path) > 15000:
            print("  skip (already exists)")
            results[filename] = out_path
            continue

        candidates = search_pinterest(query)
        print(f"  found {len(candidates)} candidates")
        saved = False
        for candidate in candidates[:12]:
            large = to_large(candidate)
            print(f"  try {large[:80]}...")
            if download(large, out_path):
                print(f"  OK ({os.path.getsize(out_path)} bytes)")
                results[filename] = out_path
                saved = True
                break
            # fallback to smaller
            if candidate != large and download(candidate, out_path):
                print(f"  OK smaller ({os.path.getsize(out_path)} bytes)")
                results[filename] = out_path
                saved = True
                break

        if not saved:
            print("  FAILED")

        time.sleep(1.2)

    print("\n=== Summary ===")
    for filename, _ in PRODUCTS:
        path = os.path.join(OUT_DIR, filename)
        status = f"{os.path.getsize(path)} bytes" if os.path.exists(path) else "MISSING"
        print(f"{filename}: {status}")


if __name__ == "__main__":
    main()
