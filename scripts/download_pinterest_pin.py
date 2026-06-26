import json
import os
import re
import urllib.request

PIN_URL = "https://www.pinterest.com/pin/38702878040505581/"
OUT_DIR = r"c:\Users\Administrator\Desktop\ADTAPP\gwecely\client\public\services"
OUT_FILE = os.path.join(OUT_DIR, "panel-beating-spray-painting.jpg")

req = urllib.request.Request(
    PIN_URL,
    headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"},
)
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")

candidates = []
for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
    try:
        data = json.loads(m.group(1))
        if isinstance(data, dict) and data.get("image"):
            candidates.append(data["image"])
    except json.JSONDecodeError:
        pass

for pattern in [
    r'https://i\.pinimg\.com/originals/[0-9a-f/]+\.(?:jpg|jpeg|png)',
    r'https://i\.pinimg\.com/1200x/[0-9a-f/]+\.(?:jpg|jpeg|png)',
]:
    candidates.extend(re.findall(pattern, html))

seen = set()
unique = []
for c in candidates:
    if c not in seen:
        seen.add(c)
        unique.append(c)

print("Candidates:")
for u in unique[:10]:
    print(" ", u)

# Prefer largest originals / 1200x
preferred = None
for u in unique:
    if "/originals/" in u or "/1200x/" in u:
        preferred = u
        break
if not preferred and unique:
    preferred = unique[0]

if not preferred:
    preferred = "https://i.pinimg.com/1200x/51/6e/16/516e164659c8c258d3cde18ba191dbb6.jpg"

print("Downloading:", preferred)
img_req = urllib.request.Request(preferred, headers={"User-Agent": "Mozilla/5.0"})
data = urllib.request.urlopen(img_req, timeout=30).read()
os.makedirs(OUT_DIR, exist_ok=True)
with open(OUT_FILE, "wb") as f:
    f.write(data)
print("Saved", OUT_FILE, len(data), "bytes")
