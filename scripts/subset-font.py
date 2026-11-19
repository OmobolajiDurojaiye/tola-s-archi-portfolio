"""Subset Bricolage Grotesque variable (wght + wdth + opsz) to the glyphs this site uses.
Target: single woff2 under 45KB."""
import sys
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.varLib import instancer

SRC = "node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2"
OUT = "public/fonts/bricolage-var.woff2"

text = (
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    " .,:;!?'\"()/@#&*+-=_%"
    "\u00b7\u2019\u00d7\u00a9"
)

wght = tuple(float(x) for x in sys.argv[1:3]) if len(sys.argv) > 2 else (300.0, 800.0)
wdth = tuple(float(x) for x in sys.argv[3:5]) if len(sys.argv) > 4 else (75.0, 100.0)
opsz = tuple(float(x) for x in sys.argv[5:7]) if len(sys.argv) > 6 else (12.0, 96.0)

font = TTFont(SRC)
print("axes:", [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in font["fvar"].axes])

limits = {}
for a in font["fvar"].axes:
    if a.axisTag == "wght":
        limits["wght"] = (max(a.minValue, wght[0]), None, min(a.maxValue, wght[1]))
    elif a.axisTag == "wdth":
        limits["wdth"] = (max(a.minValue, wdth[0]), None, min(a.maxValue, wdth[1]))
    elif a.axisTag == "opsz":
        limits["opsz"] = (max(a.minValue, opsz[0]), None, min(a.maxValue, opsz[1]))

font = instancer.instantiateVariableFont(font, {k: (v[0], v[2]) for k, v in limits.items()})

opts = subset.Options()
opts.flavor = "woff2"
opts.layout_features = ["kern", "liga", "calt", "tnum"]
opts.name_IDs = ["*"]
opts.hinting = False
opts.desubroutinize = True
opts.notdef_outline = True
sub = subset.Subsetter(options=opts)
sub.populate(text=text)
sub.subset(font)

import os
os.makedirs("public/fonts", exist_ok=True)
font.flavor = "woff2"
font.save(OUT)
print("saved", OUT, round(os.path.getsize(OUT) / 1024, 1), "KB")
