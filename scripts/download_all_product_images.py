"""Download all shop product images from curated Pinterest (pinimg.com) URLs."""
from __future__ import annotations

import os
import urllib.request

OUT = r"c:\Users\Administrator\Desktop\ADTAPP\gwecely\client\public\products"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Images sourced from Pinterest pins — https://www.pinterest.com/
DIRECT: dict[str, str] = {
    "brake-disc.jpg": "https://i.pinimg.com/originals/59/ae/ce/59aece28a440d90695c26fccc5e99f3b.jpg",
    "timing-belt.jpg": "https://i.pinimg.com/originals/e7/1a/69/e71a695a8efccabe4ff04ad1f784749f.jpg",
    "shock-absorber.jpg": "https://i.pinimg.com/originals/ab/37/37/ab37378d6ff722a802ca74b5a3dfb713.jpg",
    "clutch-kit.jpg": "https://i.pinimg.com/originals/bd/98/c4/bd98c44f7d849878a958ba668464a60f.jpg",
    "battery-60ah.jpg": "https://i.pinimg.com/originals/28/51/16/28511620c76130e626f1501489493c6d.jpg",
    "battery-75ah.jpg": "https://i.pinimg.com/originals/28/51/16/28511620c76130e626f1501489493c6d.jpg",
    "tyre-bridgestone.jpg": "https://i.pinimg.com/originals/b9/01/76/b90176a5b80399606e1d363915c28252.jpg",
    "tyre-michelin.jpg": "https://i.pinimg.com/originals/c1/4a/b7/c14ab7b42226f376026bf1c1958e1402.jpg",
    "castrol-oil.jpg": "https://i.pinimg.com/originals/e2/8f/b2/e28fb26475f2c3cc69fdbdd4c89fb9f6.jpg",
    "total-oil.jpg": "https://i.pinimg.com/originals/76/fe/41/76fe41e93ae83b8b2747e93d5138a0ac.jpg",
    "oil-filter.jpg": "https://i.pinimg.com/originals/17/89/af/1789af2df524542e0b79c8d25f3d14fd.jpg",
    "air-filter.jpg": "https://i.pinimg.com/originals/63/79/d9/6379d98ecc9da7685315619e9fbe05fe.jpg",
    "paper-reams.jpg": "https://i.pinimg.com/originals/6f/51/89/6f5189e2c24c4f03517ebfbeac193ba5.jpg",
    "pen-set.jpg": "https://i.pinimg.com/originals/97/f1/56/97f15649fa5598caec9caf99dfd644c6.jpg",
    "filing-cabinet.jpg": "https://i.pinimg.com/originals/88/43/0f/88430f09b7a5b432c1089af2b8572884.jpg",
    "office-chair.jpg": "https://i.pinimg.com/originals/53/a3/53/53a3539b3ce0260431aeba4d0ddab3d8.jpg",
    "office-desk.jpg": "https://i.pinimg.com/originals/0d/a8/60/0da860199b84ae95d03b9a3f88e75414.jpg",
    "laptop.jpg": "https://i.pinimg.com/originals/f2/bd/59/f2bd59f68a1c5de0f042171e10a5ca42.jpg",
    "printer.jpg": "https://i.pinimg.com/originals/96/c0/93/96c093314d46eef725575ccda046589b.jpg",
    "hard-hat.jpg": "https://i.pinimg.com/originals/3a/66/70/3a6670600a751d3057b71676e089bb7c.jpg",
    "first-aid.jpg": "https://i.pinimg.com/originals/ed/a9/ad/eda9adad2641b99df0c3371a9db079e7.jpg",
    "fire-extinguisher.jpg": "https://i.pinimg.com/originals/c5/da/1a/c5da1a751720982afb02bad12843879f.jpg",
}


def download(url: str, path: str) -> int:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://www.pinterest.com/"})
    data = urllib.request.urlopen(req, timeout=30).read()
    with open(path, "wb") as f:
        f.write(data)
    return len(data)


def main() -> None:
    os.makedirs(OUT, exist_ok=True)

    for name, url in DIRECT.items():
        path = os.path.join(OUT, name)
        try:
            size = download(url, path)
            print(f"OK {name} ({size})")
        except Exception as exc:
            print(f"FAIL {name}: {exc}")


if __name__ == "__main__":
    main()
