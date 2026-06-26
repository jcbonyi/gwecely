"""Download curated Pinterest product images (pinimg.com)."""
from __future__ import annotations

import os
import urllib.request

OUT = r"c:\Users\Administrator\Desktop\ADTAPP\gwecely\client\public\products"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Sourced from Pinterest pins — https://www.pinterest.com/
IMAGES: dict[str, str] = {
    "brake-disc.jpg": "https://i.pinimg.com/originals/59/ae/ce/59aece28a440d90695c26fccc5e99f3b.jpg",
    "timing-belt.jpg": "https://i.pinimg.com/originals/e7/1a/69/e71a695a8efccabe4ff04ad1f784749f.jpg",
    "shock-absorber.jpg": "https://i.pinimg.com/originals/ab/37/37/ab37378d6ff722a802ca74b5a3dfb713.jpg",
    "clutch-kit.jpg": "https://i.pinimg.com/originals/bd/98/c4/bd98c44f7d849878a958ba668464a60f.jpg",
    "battery-60ah.jpg": "https://i.pinimg.com/originals/28/51/16/28511620c76130e626f1501489493c6d.jpg",
    "battery-75ah.jpg": "https://i.pinimg.com/originals/b1/ec/39/b1ec39deae2df769b416cc3d33295aaf.jpg",
    "tyre-bridgestone.jpg": "https://i.pinimg.com/originals/b9/01/76/b90176a5b80399606e1d363915c28252.jpg",
    "tyre-michelin.jpg": "https://i.pinimg.com/originals/c1/4a/b7/c14ab7b42226f376026bf1c1958e1402.jpg",
    "castrol-oil.jpg": "https://i.pinimg.com/originals/e2/8f/b2/e28fb26475f2c3cc69fdbdd4c89fb9f6.jpg",
    "total-oil.jpg": "https://i.pinimg.com/originals/16/d9/da/16d9da055e8d4a2797278b769396d640.jpg",
    "oil-filter.jpg": "https://i.pinimg.com/originals/17/89/af/1789af2df524542e0b79c8d25f3d14fd.jpg",
    "air-filter.jpg": "https://i.pinimg.com/originals/e7/1a/69/e71a695a8efccabe4ff04ad1f784749f.jpg",
    "paper-reams.jpg": "https://i.pinimg.com/originals/6f/51/89/6f5189e2c24c4f03517ebfbeac193ba5.jpg",
    "pen-set.jpg": "https://i.pinimg.com/originals/97/f1/56/97f15649fa5598caec9caf99dfd644c6.jpg",
    "filing-cabinet.jpg": "https://i.pinimg.com/originals/88/43/0f/88430f09b7a5b432c1089af2b8572884.jpg",
    "office-chair.jpg": "https://i.pinimg.com/originals/53/a3/53/53a3539b3ce0260431aeba4d0ddab3d8.jpg",
    "office-desk.jpg": "https://i.pinimg.com/originals/0d/a8/60/0da860199b84ae95d03b9a3f88e75414.jpg",
    "laptop.jpg": "https://i.pinimg.com/originals/16/d9/da/16d9da055e8d4a2797278b769396d640.jpg",
    "printer.jpg": "https://i.pinimg.com/originals/ed/1c/f0/ed1cf04d7ce68c8db8b329a49732e293.jpg",
    "hard-hat.jpg": "https://i.pinimg.com/originals/fa/ea/a9/faeaa9b374dbfc3647a5d8f07d453911.jpg",
    "first-aid.jpg": "https://i.pinimg.com/originals/ed/a9/ad/eda9adad2641b99df0c3371a9db079e7.jpg",
    "fire-extinguisher.jpg": "https://i.pinimg.com/originals/c5/da/1a/c5da1a751720982afb02bad12843879f.jpg",
}

# Fix wrong mappings — fetch from pin pages below
PIN_FETCH = {
    "air-filter.jpg": "https://www.pinterest.com/pin/baldwin-filters-automotive-air-filter-738-od-2078-oal-pa2615--455708056080190784/",
    "office-desk.jpg": "https://www.pinterest.com/pin/latitude-run-60inch-lshape-office-computer-desk-black-and-walnut-wayfair-canada--4597401266342107136/",
    "laptop.jpg": "https://www.pinterest.com/pin/hp-everyday-a4-ream-box-of-5--201254677094593843/",  # wrong - use computer store
    "printer.jpg": "https://ca.pinterest.com/pin/motomaster-mch9972-oil-filter--362469470033569757/",  # placeholder fetch
    "hard-hat.jpg": "https://www.pinterest.com/pin/hard-hat-and-work-boots-stock-photo-image-of-protective-24001310--612771093052408818/",
    "total-oil.jpg": "https://www.pinterest.com/pin/3428245-castrol-gtx-sncf-15w40-mineral-engine-oil-4l-for-proton-perodua-honda-toyota-nissan-hyundai-lexus-in-2025--4594445778686208000/",
}
