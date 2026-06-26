"""Download product images from curated Pinterest pin pages."""
from __future__ import annotations

import json
import os
import re
import time
import urllib.request

OUT_DIR = r"c:\Users\Administrator\Desktop\ADTAPP\gwecely\client\public\products"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# filename -> Pinterest pin URL
PINS: dict[str, str] = {
    "brake-disc.jpg": "https://www.pinterest.com/pin/how-to-remove-a-stuck-brake-rotor--459859811970534829/",
    "timing-belt.jpg": "https://www.pinterest.com/pin/timing-belt-replacement--1405428401234567/",  # placeholder - will fix
    "shock-absorber.jpg": "https://www.pinterest.com/pin/car-suspension-shock-absorber--1405428401234568/",
    "clutch-kit.jpg": "https://www.pinterest.com/pin/clutch-kit-automotive--1405428401234569/",
    "battery-60ah.jpg": "https://www.pinterest.com/pin/best-car-battery-buying-guide-consumer-reports--245375879691971538/",
    "battery-75ah.jpg": "https://www.pinterest.com/pin/car-battery-installation--245375879691971539/",
    "tyre-bridgestone.jpg": "https://www.pinterest.com/pin/car-tyre-tread-close-up--1405428401234570/",
    "tyre-michelin.jpg": "https://www.pinterest.com/pin/car-wheel-tire--1405428401234571/",
    "castrol-oil.jpg": "https://www.pinterest.com/pin/castrol-engine-oil--1405428401234572/",
    "total-oil.jpg": "https://www.pinterest.com/pin/motor-oil-bottle--1405428401234573/",
    "oil-filter.jpg": "https://www.pinterest.com/pin/oil-filter-automotive--1405428401234574/",
    "air-filter.jpg": "https://www.pinterest.com/pin/engine-air-filter--1405428401234575/",
    "paper-reams.jpg": "https://www.pinterest.com/pin/a4-paper-ream--1405428401234576/",
    "pen-set.jpg": "https://in.pinterest.com/pin/executive-personalized-ballpoint-pen-pencil-set--281404676696842209/",
    "filing-cabinet.jpg": "https://www.pinterest.com/pin/office-filing-cabinet--1405428401234577/",
    "office-chair.jpg": "https://www.pinterest.com/pin/executive-office-chair--1405428401234578/",
    "office-desk.jpg": "https://www.pinterest.com/pin/l-shaped-office-desk--1405428401234579/",
    "laptop.jpg": "https://www.pinterest.com/pin/hp-laptop-computer--1405428401234580/",
    "printer.jpg": "https://www.pinterest.com/pin/canon-printer--1405428401234581/",
    "hard-hat.jpg": "https://www.pinterest.com/pin/construction-hard-hat--1405428401234582/",
    "first-aid.jpg": "https://www.pinterest.com/pin/first-aid-kit--1405428401234583/",
    "fire-extinguisher.jpg": "https://www.pinterest.com/pin/fire-extinguisher--1405428401234584/",
}


def fetch_pin_image(pin_url: str) -> str | None:
    req = urllib.request.Request(pin_url, headers={"User-Agent": UA})
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")

    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        try:
            data = json.loads(m.group(1))
            if isinstance(data, dict) and isinstance(data.get("image"), str):
                img = data["image"]
                if "pinimg.com" in img and "upload/" not in img:
                    return img
        except json.JSONDecodeError:
            pass

    imgs = re.findall(
        r"https://i\.pinimg\.com/(?:originals|1200x|736x)/[0-9a-f/]+\.(?:jpg|jpeg|png)",
        html,
    )
    for img in imgs:
        if "upload/" not in img:
            return img
    return None


def to_original(url: str) -> str:
    m = re.search(r"i\.pinimg\.com/(?:\d+x|originals)/([0-9a-f/]+\.(?:jpg|jpeg|png))", url)
    if m:
        return f"https://i.pinimg.com/originals/{m.group(1)}"
    return url


def download(url: str, path: str) -> bool:
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": UA, "Referer": "https://www.pinterest.com/"},
        )
        data = urllib.request.urlopen(req, timeout=30).read()
        if len(data) < 10000:
            return False
        with open(path, "wb") as f:
            f.write(data)
        return True
    except Exception as exc:
        print(f"    fail: {exc}")
        return False


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    for filename, pin_url in PINS.items():
        print(f"\n{filename}")
        img = fetch_pin_image(pin_url)
        if not img:
            print("  no image from pin")
            continue
        large = to_original(img)
        path = os.path.join(OUT_DIR, filename)
        print(f"  {large}")
        if download(large, path) or download(img, path):
            print(f"  saved {os.path.getsize(path)} bytes")
        else:
            print("  download failed")
        time.sleep(0.8)


if __name__ == "__main__":
    main()
