import re
import urllib.request

url = "https://www.pinterest.com/pin/38702878040505581/"
req = urllib.request.Request(
    url,
    headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"},
)
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")

m = re.search(r'property="og:image" content="([^"]+)"', html)
if m:
    print("og:", m.group(1))

imgs = re.findall(r"https://i\.pinimg\.com/[^\s\"']+", html)
for u in sorted(set(imgs), key=len, reverse=True)[:15]:
    print(u)
