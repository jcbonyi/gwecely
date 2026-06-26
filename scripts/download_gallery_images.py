"""Refresh gallery images from Pinterest + local brand/product assets."""
from __future__ import annotations

import os
import shutil
import urllib.request

ROOT = r"c:\Users\Administrator\Desktop\ADTAPP\gwecely\client\public"
GALLERY = os.path.join(ROOT, "gallery")
UA = {"User-Agent": "Mozilla/5.0", "Referer": "https://www.pinterest.com/"}

# Pinterest — https://www.pinterest.com/
PINTEREST: dict[str, str] = {
    "landcruiser-restore.jpg": "https://i.pinimg.com/736x/b1/60/35/b16035ea8f4d7b9bf343638cf8a3951e.jpg",
    "corolla-spot-repair.jpg": "https://i.pinimg.com/736x/ae/c5/4d/aec54d9a050bc39e499c986be74cac1f.jpg",
    "dmax-dent-removal.jpg": "https://i.pinimg.com/736x/69/7d/34/697d340e32e4ab6fc575815accb20c07.jpg",
    "golf-gti-restore.jpg": "https://i.pinimg.com/736x/64/47/9f/64479fd3a509d173c215d6984411709d.jpg",
    "mercedes-respray.jpg": "https://i.pinimg.com/736x/51/6e/16/516e164659c8c258d3cde18ba191dbb6.jpg",
    "gearbox-rebuild.jpg": "https://i.pinimg.com/736x/bd/98/c4/bd98c44f7d849878a958ba668464a60f.jpg",
    "hilux-body-repair.jpg": "https://i.pinimg.com/736x/a8/cf/c1/a8cfc1e188a6b9648dd4b72f58593f8b.jpg",
}

LOCAL_COPIES: dict[str, str] = {
    "panel-closeup.jpg": os.path.join(ROOT, "brand", "page9_img2.jpeg"),
    "paint-spray.jpg": os.path.join(ROOT, "services", "panel-beating-spray-painting.jpg"),
    "engine-overhaul.jpg": os.path.join(ROOT, "brand", "page7_img4.jpeg"),
    "wheel-brake-service.jpg": os.path.join(ROOT, "products", "brake-disc.jpg"),
}


def download(url: str, dest: str) -> None:
    req = urllib.request.Request(url, headers=UA)
    data = urllib.request.urlopen(req, timeout=30).read()
    with open(dest, "wb") as f:
        f.write(data)


def main() -> None:
    os.makedirs(GALLERY, exist_ok=True)
    for name, src in LOCAL_COPIES.items():
        shutil.copy2(src, os.path.join(GALLERY, name))
        print("copy", name)
    for name, url in PINTEREST.items():
        dest = os.path.join(GALLERY, name)
        download(url, dest)
        print("ok", name, os.path.getsize(dest))


if __name__ == "__main__":
    main()
