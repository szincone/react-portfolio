#!/usr/bin/env python3
"""Build assets/sprites.png + assets/sprites.json from assets/raw/.

Pipeline: chroma-key magenta -> binary alpha -> split frames by content
islands -> group-uniform downscale (nearest) with shared bottom baseline ->
shelf-pack atlas -> JSON manifest. Clouds are synthesized (no raw art).

Run from the repo root:  python3 tools/build_sprites.py
"""
import json
import os
import sys

from PIL import Image, ImageEnhance

RAW = "assets/raw"
OUT_PNG = "assets/sprites.png"
OUT_JSON = "assets/sprites.json"
PAD = 2  # atlas padding to prevent sampling bleed


# ---------------------------------------------------------------- chroma key

def chroma_key(im):
    """Magenta background -> transparent, binary alpha for crisp pixels."""
    im = im.convert("RGB")
    px = im.load()
    w, h = im.size
    # sample background reference from the corners
    refs = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    opx = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            bg = False
            for rr, rg, rb in refs:
                if (r - rr) ** 2 + (g - rg) ** 2 + (b - rb) ** 2 < 100 ** 2:
                    bg = True
                    break
            # edge fringe: anything still strongly magenta-tinted
            if not bg and r > g + 60 and b > g + 60:
                bg = True
            if not bg:
                opx[x, y] = (r, g, b, 255)
    return out


def trim(im):
    box = im.getbbox()
    return im.crop(box) if box else im


def split_islands(im, expected):
    """Split a keyed sheet into frames using fully-transparent column gaps."""
    w, h = im.size
    alpha = im.getchannel("A")
    apx = alpha.load()
    occupied = [any(apx[x, y] for y in range(h)) for x in range(w)]
    runs = []
    start = None
    for x, occ in enumerate(occupied + [False]):
        if occ and start is None:
            start = x
        elif not occ and start is not None:
            runs.append((start, x))
            start = None
    # merge slivers (stray pixels) into the nearest real island
    runs = [r for r in runs if r[1] - r[0] > 8]
    if len(runs) != expected:
        raise SystemExit(
            f"island split: expected {expected} frames, found {len(runs)}: {runs}")
    return [trim(im.crop((a, 0, b, h))) for a, b in runs]


# ---------------------------------------------------------- group normalize

def normalize_group(frames, target_h):
    """Uniform-scale a frame group to target_h (tallest frame defines the
    scale so relative pose sizes survive), bottom-aligned on the baseline."""
    max_h = max(f.height for f in frames)
    scale = target_h / max_h
    out = []
    for f in frames:
        nw = max(1, round(f.width * scale))
        nh = max(1, round(f.height * scale))
        scaled = f.resize((nw, nh), Image.NEAREST)
        canvas = Image.new("RGBA", (nw, target_h), (0, 0, 0, 0))
        canvas.paste(scaled, (0, target_h - nh))
        out.append(canvas)
    return out


# ------------------------------------------------------------------- clouds

CLOUD_1 = [
    "......########......",
    "....############....",
    "..################?.",
    ".##################.",
    "####################",
    ".+++++++++++++++++!.",
]
CLOUD_2 = [
    "....######...........",
    "..##########....####.",
    ".############..######",
    "######################",
    ".++++++++++++++++++++.",
]

CLOUD_COLORS = {"#": (255, 255, 255, 255), "?": (255, 255, 255, 255),
                "!": (219, 238, 254, 255), "+": (219, 238, 254, 255)}

# pixel page/document icon for the resume block, in the icon-pack style
PAGE_TEMPLATE = [
    ".########...",
    ".#wwwwww##..",
    ".#wwwwww#w#.",
    ".#wwwwww###.",
    ".#wwwwwwww#.",
    ".#w~~~~~ww#.",
    ".#wwwwwwww#.",
    ".#w~~~~~ww#.",
    ".#wwwwwwww#.",
    ".#w~~~~www#.",
    ".#wwwwwwww#.",
    ".##########.",
]

PAGE_COLORS = {"#": (52, 63, 84, 255), "w": (248, 250, 252, 255),
               "~": (139, 156, 178, 255)}

# pixel trophy icon for the Brawlux block, in the icon-pack style
TROPHY_TEMPLATE = [
    "..OOOOOOO..",
    ".OGGGGGGGO.",
    "OOGGGGGGGOO",
    "OGOGGGGGOGO",
    "OGOGGGGGOGO",
    ".OOGGGGGOO.",
    "..OGGGGGO..",
    "...OGGGO...",
    "....OGO....",
    "...OOGOO...",
    "..OGGGGGO..",
    "..OOOOOOO..",
]

TROPHY_COLORS = {"O": (52, 63, 84, 255), "G": (247, 197, 49, 255)}


def synth_bitmap(template, colors, px_size):
    h = len(template)
    w = max(len(row) for row in template)
    im = Image.new("RGBA", (w * px_size, h * px_size), (0, 0, 0, 0))
    p = im.load()
    for y, row in enumerate(template):
        for x, ch in enumerate(row):
            color = colors.get(ch)
            if color:
                for dy in range(px_size):
                    for dx in range(px_size):
                        p[x * px_size + dx, y * px_size + dy] = color
    return im


def synth_cloud(template, px_size=3):
    return synth_bitmap(template, CLOUD_COLORS, px_size)


# -------------------------------------------------------------------- atlas

def pack(named_frames):
    """Shelf-pack {name: [frames]} into one atlas; returns (atlas, manifest)."""
    entries = []  # (name, idx, frame)
    for name, frames in named_frames.items():
        for i, f in enumerate(frames):
            entries.append((name, i, f))
    entries.sort(key=lambda e: -e[2].height)
    max_w = 512
    x = y = shelf_h = 0
    placements = {}
    for name, i, f in entries:
        if x + f.width + PAD > max_w:
            x = 0
            y += shelf_h + PAD
            shelf_h = 0
        placements[(name, i)] = (x, y)
        x += f.width + PAD
        shelf_h = max(shelf_h, f.height)
    atlas_h = y + shelf_h
    atlas = Image.new("RGBA", (max_w, atlas_h), (0, 0, 0, 0))
    manifest = {}
    for name, frames in named_frames.items():
        rects = []
        for i, f in enumerate(frames):
            px, py = placements[(name, i)]
            atlas.paste(f, (px, py))
            rects.append({"x": px, "y": py, "w": f.width, "h": f.height})
        manifest[name] = {"frameCount": len(frames), "frames": rects}
    return atlas, manifest


def verify_no_magenta(atlas):
    px = atlas.load()
    bad = []
    for y in range(atlas.height):
        for x in range(atlas.width):
            r, g, b, a = px[x, y]
            if a > 0 and r > g + 80 and b > g + 80:
                bad.append((x, y, (r, g, b, a)))
    if bad:
        raise SystemExit(f"magenta fringe remains: {len(bad)} px, e.g. {bad[:5]}")


# --------------------------------------------------------------------- main

def main():
    keyed = {}
    for name in ["sawyer-walk", "sawyer-idle", "sawyer-jump", "cat-brown",
                 "cat-gray", "nikki-bike", "blocks", "icons", "ground"]:
        keyed[name] = chroma_key(Image.open(f"{RAW}/{name}.png"))

    walk = split_islands(keyed["sawyer-walk"], 4)
    idle = split_islands(keyed["sawyer-idle"], 2)
    jump = [trim(keyed["sawyer-jump"])]
    # every Sawyer pose is drawn facing right in the source art (like the
    # cats); the runtime mirrors him to face left when he heads left
    # one scale across every Sawyer pose so walk/idle/jump stay proportional
    sawyer = normalize_group(walk + idle + jump, 64)
    walk, idle, jump = sawyer[:4], sawyer[4:6], sawyer[6:]

    cat_brown = normalize_group(split_islands(keyed["cat-brown"], 2), 40)
    cat_gray = normalize_group(split_islands(keyed["cat-gray"], 2), 40)

    # ambient cyclist; source art faces left, so mirror her to face right like
    # everyone else (runtime flips her back to ride leftward). Total height
    # 106px so the rider's body (~90% of the sprite, the rest is wheels below
    # her feet) lands near Sawyer-man's on-screen height.
    nikki_frames = [f.transpose(Image.FLIP_LEFT_RIGHT)
                    for f in split_islands(keyed["nikki-bike"], 2)]
    nikki_bike = normalize_group(nikki_frames, 106)

    dim, bright = split_islands(keyed["blocks"], 2)
    # push the plain block towards muted stone-gold so glowing link
    # blocks stand apart at a glance
    dim = ImageEnhance.Color(ImageEnhance.Brightness(dim).enhance(0.78)).enhance(0.8)
    block_plain = normalize_group([dim], 48)
    # glow pulse: bright frame + a brightened copy of it
    brighter = ImageEnhance.Brightness(bright).enhance(1.18)
    block_link = normalize_group([bright, brighter], 48)

    icons = split_islands(keyed["icons"], 3)  # scroll, envelope, briefcase
    icons = [normalize_group([i], 24)[0] for i in icons]
    icon_page = synth_bitmap(PAGE_TEMPLATE, PAGE_COLORS, 2)  # 24px tall
    icon_brawlux = synth_bitmap(TROPHY_TEMPLATE, TROPHY_COLORS, 2)  # 24px tall

    ground = trim(keyed["ground"])
    gscale = 48 / ground.height
    ground = ground.resize(
        (max(1, round(ground.width * gscale)), 48), Image.NEAREST)

    clouds = [synth_cloud(CLOUD_1), synth_cloud(CLOUD_2)]

    named = {
        "sawyer-walk": walk,
        "sawyer-idle": idle,
        "sawyer-jump": jump,
        "cat-brown": cat_brown,
        "cat-gray": cat_gray,
        "nikki-bike": nikki_bike,
        "block-plain": block_plain,
        "block-link": block_link,
        "icon-scroll": [icons[0]],
        "icon-envelope": [icons[1]],
        "icon-briefcase": [icons[2]],
        "icon-page": [icon_page],
        "icon-brawlux": [icon_brawlux],
        "cloud-1": [clouds[0]],
        "cloud-2": [clouds[1]],
        "ground": [ground],
    }

    atlas, manifest = pack(named)
    verify_no_magenta(atlas)

    fps = {"sawyer-walk": 8, "sawyer-idle": 2, "sawyer-jump": 1,
           "cat-brown": 5, "cat-gray": 4, "nikki-bike": 6, "block-link": 3}
    for name, meta in manifest.items():
        meta["fps"] = fps.get(name, 0)

    os.makedirs(os.path.dirname(OUT_PNG), exist_ok=True)
    atlas.save(OUT_PNG, optimize=True)
    with open(OUT_JSON, "w") as fh:
        json.dump({"image": "sprites.png", "sprites": manifest}, fh, indent=1)
    kb = os.path.getsize(OUT_PNG) / 1024
    print(f"atlas {atlas.size[0]}x{atlas.size[1]} -> {OUT_PNG} ({kb:.1f} KB)")
    for name, meta in manifest.items():
        f0 = meta["frames"][0]
        print(f"  {name}: {meta['frameCount']}f {f0['w']}x{f0['h']}")


if __name__ == "__main__":
    sys.exit(main())
