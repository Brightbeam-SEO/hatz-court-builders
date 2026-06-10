"""
Batch-process client marketing photos: optional upscale, PNG export,
standardized filenames, outputs under each folder's 'Finished PNG Outputs'.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

from PIL import Image

try:
    from pillow_heif import register_heif_opener

    register_heif_opener()
except Exception:  # pragma: no cover
    pass

OUTPUT_DIR_NAME = "Finished PNG Outputs"
MIN_SHORT_SIDE = 1600
TARGET_SHORT_SIDE = 1920
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".heic", ".heif"}

INVALID_WIN_CHARS = re.compile(r'[\\/:*?"<>|]+')


def normalize_unicode_filename(s: str) -> str:
    """Normalize fancy dashes so parsing matches Windows filenames."""
    return (
        s.replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2212", "-")
        .replace("\ufffd", "-")
    )


def sanitize_part(s: str) -> str:
    s = INVALID_WIN_CHARS.sub("-", s)
    s = " ".join(s.split())
    return s.strip(" -")


# Path budget: longest output dir path here is roughly 65 chars
# ("c:\Users\Lenovo\Downloads\HATZ Scottsdale\Finished PNG Outputs\"),
# so 195 chars for the basename keeps the full path under Windows MAX_PATH (260).
MAX_WIN_BASENAME_CHARS = 195


def strip_trailing_location(description: str, location: str) -> str:
    """Avoid duplicating city/state when it appears inside the keyword description."""
    loc = sanitize_part(location)
    if not loc:
        return sanitize_part(description)
    desc = sanitize_part(description)
    pattern = re.compile(re.escape(f" - {loc}") + r"\s*$", re.I)
    prev = None
    while prev != desc:
        prev = desc
        desc = pattern.sub("", desc).strip(" -")
    return desc


def build_filename(description: str, location: str, company: str) -> str:
    desc_s = sanitize_part(description)
    loc_s = sanitize_part(location)
    comp_s = sanitize_part(company)
    desc_s = strip_trailing_location(desc_s, loc_s)
    tail_parts = [p for p in (loc_s, comp_s) if p]
    tail = (" - " + " - ".join(tail_parts)) if tail_parts else ""
    ext = ".png"
    full = f"{desc_s}{tail}{ext}"
    if len(full) <= MAX_WIN_BASENAME_CHARS:
        return full
    reserve = len(tail) + len(ext) + 3  # "..." token
    max_desc = MAX_WIN_BASENAME_CHARS - reserve
    if max_desc < 24:
        max_desc = 24
    trimmed = desc_s[:max_desc].rsplit(" ", 1)[0].strip(" -")
    if not trimmed:
        trimmed = desc_s[:max_desc].rstrip(" -")
    return f"{trimmed}...{tail}{ext}"


def maybe_upscale(img: Image.Image) -> tuple[Image.Image, bool]:
    w, h = img.size
    short = min(w, h)
    if short >= MIN_SHORT_SIDE:
        return img, False
    scale = TARGET_SHORT_SIDE / short
    nw, nh = int(round(w * scale)), int(round(h * scale))
    return img.resize((nw, nh), Image.Resampling.LANCZOS), True


def unique_path(dir_path: Path, stem: str) -> Path:
    base = dir_path / stem
    if not base.exists():
        return base
    name = stem[:-4] if stem.lower().endswith(".png") else stem
    for i in range(2, 1000):
        candidate = dir_path / f"{name} ({i}).png"
        if not candidate.exists():
            return candidate
    raise RuntimeError("Too many duplicate names")


def parse_208(stem: str, company: str) -> tuple[str, str, str]:
    parts = [p.strip() for p in stem.split(" - ") if p.strip()]
    if parts and parts[0].lower().startswith("208 specialties"):
        parts = parts[1:]
    loc_keywords = ("Idaho", "Meridian", "Eagle", "McCall", "Boise")
    location = ""
    loc_idx = -1
    for i, p in enumerate(parts):
        if any(k.lower() in p.lower() for k in loc_keywords):
            location = p
            loc_idx = i
            break
    if loc_idx < 0:
        core = " - ".join(parts)
        location = "Idaho"
    else:
        core = " - ".join(parts[:loc_idx] + parts[loc_idx + 1 :])
    core = core or "completed patio transformation project"
    prefix = "Idaho landscaping hardscape contractor portfolio showcasing "
    description = prefix + core
    description = strip_trailing_location(description, location or "Idaho")
    description = re.sub(r"\s*-\s*208\s+Specialties\s*$", "", description, flags=re.I).strip(" -")
    return description, location or "Idaho", company


def parse_hat_z_description_location(stem: str, company: str) -> tuple[str, str, str]:
    """Filenames like '... - Scottsdale AZ - Hatz Court Builders'."""
    if stem.lower().endswith(".jpg"):
        stem = stem[:-4]
    parts = [p.strip() for p in stem.split(" - ") if p.strip()]
    if len(parts) >= 3 and parts[-1].lower().startswith("hatz"):
        return parts[0], parts[1], company
    return stem, "Scottsdale AZ", company


def strip_company_sol(stem: str) -> str:
    return re.sub(
        r"\s*(Sol Pressure Washing|by\s+Sol Pressure Washing)\s*",
        " ",
        stem,
        flags=re.I,
    ).strip(" -")


def name_for_gpm(stem: str, company: str, default_loc: str) -> tuple[str, str, str]:
    low = stem.lower()
    if "mls" in low:
        m = re.search(r"mls[- ]?(\d+)", low)
        num = m.group(1) if m else ""
        variants = {
            "9": "MLS marketing photo curb appeal front elevation siding roof driveway landscaping exterior daytime ",
            "17": "MLS exterior backyard patio landscaping irrigation fence rental ready turnover photography ",
            "34": "MLS twilight style exterior residential facade windows porch walkway mulch beds photo ",
        }
        tail = variants.get(num, "MLS rental property exterior architectural marketing photography series ")
        desc = (tail + f"frame MLS-{num}").strip()
        return desc, default_loc, company
    if "backyard" in low:
        return (
            "Managed rental backyard lawn irrigation fence shade trees outdoor living space turnover documentation photo ",
            default_loc,
            company,
        )
    if re.fullmatch(r"copy of \d+\.?", low.replace(".jpg", "").replace(".jpeg", "")):
        return (
            "Multifamily investment property exterior siding gutters roofline HOA curb appeal portfolio documentation ",
            default_loc,
            company,
        )
    return sanitize_part(stem.replace("Copy of ", "")), default_loc, company


def name_for_frs_cryptic(stem: str, default_location: str, company: str, folder_key: str, idx: int) -> tuple[str, str, str]:
    """Keyword-rich roofing/siding descriptions from messy export names."""
    base = Path(stem).stem
    base = re.sub(r"^[a-zA-Z0-9]{12,}_", "", base)
    low_base = base.lower()
    base = base.replace("Copyof", "Copy of ").replace("Copy ofCopyof", "Copy of ")
    base = re.sub(r"([a-z])([A-Z])", r"\1 \2", base)
    base = base.replace("_", " ").replace("-", " ")
    base = re.sub(r"\s+", " ", base).strip()

    boise_templates = [
        "Residential architectural shingle roof ridge vent flashing drip edge chimney penetration jobsite progress photo ",
        "Steep slope re-roof tear off ice and water shield synthetic underlayment crew safety harness detail ",
        "Standing seam metal roofing panel clips thermal movement clips ridge cap residential curb appeal upgrade ",
        "Garage flat roof low slope tapered insulation TPO corner flashing parapet wall drainage photo ",
        "Roof replacement debris containment magnet sweep neighboring homes protection best practices documentation ",
    ]
    provo_templates = [
        "Asphalt shingle roof replacement valley metal drip edge starter course starter strip contractor workmanship ",
        "Steep pitch residential roof deck inspection moisture barrier synthetic felt overlap seams detail ",
        "Roof tear off daylight attic ventilation baffles intake exhaust balanced airflow ridge vent cut photo ",
        "Composite shingle color blend staggered courses nail pattern manufacturer warranty compliant install ",
        "Starter strip eaves rakes waterproofing leak prevention ice dam mitigation cold climate roofing ",
    ]

    if re.search(r"boise\s*id", stem, re.I):
        loc = "Boise ID"
        head = re.sub(r"\s*-\s*Boise\s*ID.*$", "", stem, flags=re.I).strip()
        head = re.sub(r"\s*by\s+Flux.*$", "", head, flags=re.I).strip()
        if head and len(head) > 12:
            desc = (
                "Commercial industrial roofing upgrade contractor portfolio featuring "
                + sanitize_part(head).lower()
            )
        else:
            desc = f"Scene {idx + 1} " + boise_templates[idx % len(boise_templates)]
        return sanitize_part(desc), loc, company

    templates = provo_templates if "provo" in folder_key else boise_templates
    desc = f"Scene {idx + 1} " + templates[idx % len(templates)]
    return sanitize_part(desc), default_location, company


def name_for_frs_descriptive(stem: str, company: str, folder_key: str, idx: int) -> tuple[str, str, str]:
    stem_clean = re.sub(r"\s*by\s+Flux Boise Roofing.*$", "", stem, flags=re.I).strip()
    stem_clean = re.sub(r"Flux Boise Roofing\s*&\s*Siding", "", stem_clean, flags=re.I).strip(" -")
    loc_match = re.search(r"Boise\s*ID", stem_clean, re.I)
    if loc_match:
        loc = "Boise ID"
        before = stem_clean[: loc_match.start()].strip(" -")
        after = stem_clean[loc_match.end() :].strip(" -")
        desc_parts = [sanitize_part(before)]
        if after:
            desc_parts.append(sanitize_part(after.lstrip("- ")))
        core = " - ".join(p for p in desc_parts if p)
        keyword_lead = (
            "Commercial roof replacement contractor photo leak-free warranty-grade installation showing "
        )
        description = keyword_lead + core if core else keyword_lead.strip()
        return sanitize_part(description), loc, company
    return name_for_frs_cryptic(stem, "Provo Utah", company, folder_key, idx)


def name_for_pcc(stem: str, location_city: str, company: str) -> tuple[str, str, str]:
    raw_stem = Path(stem).stem
    base = raw_stem.lower().replace("_", "-").replace(" ", "-")
    while "--" in base:
        base = base.replace("--", "-")
    if base.startswith("solid-top"):
        tail = base[len("solid-top") :].strip("-")
        desc = (
            "Solid alumawood style insulated patio roof backyard shade structure beam column attachment "
            f"detail gallery photo series {tail} "
        )
    elif base.startswith("insulated"):
        tail = base[len("insulated") :].strip("-")
        desc = (
            "Foam insulated patio cover ceiling fan outdoor living room snow load engineered patio roof "
            f"panel close-up documentation {tail} "
        )
    elif base.startswith("lattice"):
        tail = base[len("lattice") :].strip("-")
        desc = (
            "Open lattice pergola patio roof partial shade climbing plants outdoor dining ambiance "
            f"custom patio cover photo {tail} "
        )
    elif base.startswith("4k"):
        tail = base[len("4k") :].strip("-")
        desc = (
            "Heavy-duty engineered beam long-span patio cover outdoor kitchen BBQ shade structure "
            f"premium patio roof upgrade photo {tail} "
        )
    else:
        desc = (
            "Custom attached patio cover backyard shade outdoor entertaining aluminum patio roof detail "
            + sanitize_part(raw_stem.replace("-", " "))
            + " "
        )
    return sanitize_part(desc), location_city, company


def name_for_hdt(stem: str, company: str) -> tuple[str, str, str]:
    base = Path(stem).stem
    low = base.lower()
    loc = "Treasure Valley Idaho"
    if "meridian" in low:
        loc = "Meridian Idaho"
        desc = (
            "Curved gunite swimming pool tanning ledge bubblers LED color lighting Meridian backyard "
            "resort pool builder portfolio photo "
        )
    elif "middleton" in low:
        loc = "Middleton Idaho"
        desc = (
            "Rock waterfall grotto spa spillway freeform luxury pool stone coping outdoor living "
            "Middleton Idaho custom pool photo "
        )
    elif "commercial" in low:
        desc = (
            "Commercial aquatic amenity resort deck lounge seating umbrella holes towel stations "
            "pool surfacing contractor showcase photo "
        )
        loc = "Treasure Valley Idaho"
    elif "helix" in low:
        desc = (
            "Modern geometric helix spillway spa raised bond beam glass tile waterline vanishing edge "
            "concept pool designer visualization photo "
        )
        loc = "Treasure Valley Idaho"
    elif low.startswith("swimming pool"):
        desc = (
            "Custom pool shell coping plaster interior swim lane bench umbrella sleeve backyard "
            + sanitize_part(base)
            + " marketing hero render "
        )
        loc = "Treasure Valley Idaho"
    else:
        desc = sanitize_part(base.replace("Copy of ", ""))
    return desc, loc, company


def name_for_wcb(stem: str, company: str) -> tuple[str, str, str]:
    base = Path(stem).stem
    m = re.match(r"^(.+?)-(\d+)\s*$", base)
    if m:
        addr, seq = m.group(1).strip(), m.group(2)
        addr_clean = re.sub(r"-\d{8}$", "", addr)
        low_addr = addr_clean.lower()
        if "16th" in low_addr:
            scene = "North End Boise craftsman trim siding scaffolding window install jobsite progress shot"
        elif "collister" in low_addr:
            scene = "Boise Bench contemporary envelope flashing exterior insulation window package detail"
        elif "suntree" in low_addr:
            scene = "South Boise new build stone wainscot stucco craftsman contemporary hybrid facade photo"
        elif "hill road" in low_addr:
            scene = "Boise Bench hillside cedar batten steep driveway luxury home exterior reveal"
        else:
            scene = "Treasure Valley custom residential framing siding builder site progress photo"
        desc = f"Frame {seq} {scene}"
        loc = f"{addr_clean} Boise Idaho"
        return sanitize_part(desc), loc, company
    return sanitize_part(base), "Boise Idaho", company


AMAR_KEYWORD_SCENES = [
    "Lift bay exhaust muffler catalytic converter hangers clamps weld seam technician workspace photo ",
    "Brake rotor caliper pad service hydraulic flush lug torque patterned concrete shop interior photo ",
    "Suspension alignment rack coilover control arm bushing diagnostic underside sedan SUV photo ",
    "Pickup fleet turbocharger intake manifold coolant hose preventative maintenance service bay photo ",
    "Stainless mandrel bent exhaust polished tip dual outlet aftermarket sound tuning shop detail photo ",
]

ZDS_KEYWORD_SCENES = [
    "Relaxation lounge aromatherapy candles couples massage suite dimmable ambiance spa interior photo ",
    "Facial treatment room steam cleanse extraction hydration skincare therapist LED glow facial photo ",
    "Hot stone massage heated basalt stones fascia Swedish blend drapery heated table wellness photo ",
    "Manicure pedicure nail soak polish ventilation sanitation spa chair plumbing fixture detail photo ",
    "Hydrotherapy tub jets chromatherapy sauna cedar benches robe hooks locker spa amenity photo ",
]

SOL_MOBILE_SCENES = [
    "Commercial cold water surface cleaner reclaim vacuum gum stain removal night washing fleet photo ",
    "Gas station canopy diesel spill lift storefront sidewalks sodium recovery tank contractor wash photo ",
    "Parking garage oil hydroxide surface cleaner boom containment downstream filtration washing photo ",
    "Restaurant dumpster pad grease enzyme foam degrease odor neutralizer night service wash photo ",
]


def derive_name(
    folder: Path,
    src_path: Path,
    company: str,
    extra: dict,
    idx: int,
) -> tuple[str, str, str]:
    stem = src_path.stem
    full = normalize_unicode_filename(src_path.name)
    key = folder.name.lower()

    if key == "gpm":
        return name_for_gpm(full.rsplit(".", 1)[0], company, extra["default_loc"])

    if key == "208":
        return parse_208(full.rsplit(".", 1)[0], company)

    if key == "frs provo":
        if re.search(r"flux|roofing|siding|tpo|metal|vinyl", full, re.I) and len(full) > 40:
            return name_for_frs_descriptive(full.rsplit(".", 1)[0], company, key, idx)
        return name_for_frs_cryptic(full, "Provo Utah", company, key, idx)

    if key == "frs boise":
        return name_for_frs_cryptic(full, "Boise Idaho", company, key, idx)

    if key == "hatz scottsdale":
        return parse_hat_z_description_location(full.rsplit(".", 1)[0], company)

    if key == "amar":
        num = re.search(r"(\d{4,})", full)
        tag = num.group(1) if num else stem
        scene = AMAR_KEYWORD_SCENES[idx % len(AMAR_KEYWORD_SCENES)]
        desc = scene + f"capture IMG {tag} "
        return sanitize_part(desc), extra["default_loc"], company

    if key == "hdt":
        return name_for_hdt(full, company)

    if key == "pcc las vegas":
        return name_for_pcc(full, "Las Vegas Nevada", company)

    if key == "pcc st george":
        return name_for_pcc(full, "St George Utah", company)

    if key == "zds":
        num = re.search(r"(\d{4,})", full)
        tag = num.group(1) if num else stem
        scene = ZDS_KEYWORD_SCENES[idx % len(ZDS_KEYWORD_SCENES)]
        desc = scene + f"still IMG {tag} "
        return sanitize_part(desc), extra["default_loc"], company

    if key == "wcb":
        return name_for_wcb(full, company)

    if key == "sol":
        if src_path.suffix.lower() == ".mov":
            raise ValueError("skip_video")
        if src_path.suffix.lower() in (".heic", ".heif"):
            num = re.search(r"IMG[_ ]?(\d+)", full, re.I)
            tag = num.group(1) if num else stem
            scene = SOL_MOBILE_SCENES[idx % len(SOL_MOBILE_SCENES)]
            desc = scene + f"archive IMG {tag} "
            return sanitize_part(desc), extra["default_loc"], company
        base = full.rsplit(".", 1)[0]
        loc = "Boise ID"
        if "Boise" in base:
            loc_m = re.search(r"(Boise\s*ID)", base, re.I)
            if loc_m:
                loc = loc_m.group(1).replace("  ", " ").strip()
        rest = strip_company_sol(base)
        rest = re.sub(r"\s*Boise\s*ID\s*$", "", rest, flags=re.I).strip(" -")
        low_rest = rest.lower()
        if "gas station" in low_rest or "surface" in low_rest:
            desc = (
                "Nighttime gas station forecourt concrete fuel island canopy LED spill cleanup "
                "commercial pressure washing brightwork photo featuring "
                + sanitize_part(rest)
            )
        elif "window" in low_rest or "glass" in low_rest or "ladder" in low_rest:
            desc = (
                "Interior vaulted ceiling streak-free window cleaning ladder high dusting cabin glass "
                "sunbeam glare control photo featuring "
                + sanitize_part(rest)
            )
        else:
            desc = sanitize_part(rest) or (
                "Residential driveway sidewalk algae moss sodium softwash exterior cleaning contractor photo "
            )
        return sanitize_part(desc), loc, company

    return sanitize_part(stem), extra.get("default_loc", ""), company


def process_folder(folder: Path, company: str, extra: dict) -> list[str]:
    out_dir = folder / OUTPUT_DIR_NAME
    out_dir.mkdir(exist_ok=True)
    logs: list[str] = []

    for entry in sorted(folder.iterdir()):
        if entry.is_file() and entry.suffix.lower() in {".mov", ".mp4"}:
            logs.append(f"SKIP video: {entry.name}")

    sources = sorted(
        p
        for p in folder.iterdir()
        if p.is_file() and p.suffix.lower() in IMAGE_EXTENSIONS
    )

    for idx, src in enumerate(sources):
        try:
            desc, loc, comp = derive_name(folder, src, company, extra, idx)
            out_stem = build_filename(desc, loc, comp)
            dest = unique_path(out_dir, out_stem)
        except ValueError as e:
            if str(e) == "skip_video":
                logs.append(f"SKIP video: {src.name}")
            else:
                logs.append(f"ERROR naming {src.name}: {e}")
            continue
        except Exception as e:
            logs.append(f"ERROR naming {src.name}: {e}")
            continue

        try:
            with Image.open(src) as im:
                im = im.convert("RGBA") if im.mode in ("P", "PA") else im.convert("RGB")
                im_proc, upscaled = maybe_upscale(im)
                im_proc.save(dest, format="PNG", optimize=True)
            logs.append(f"OK: {src.name} -> {dest.name}" + (" [upscaled]" if upscaled else ""))
        except Exception as e:
            logs.append(f"FAIL {src.name}: {e}")

    return logs


def main() -> int:
    clients: list[tuple[str, str, dict]] = [
        (r"c:\Users\Lenovo\Downloads\GPM", "Greenbelt Property Management", {"default_loc": "Treasure Valley Idaho"}),
        (r"c:\Users\Lenovo\Downloads\208", "208 Specialties", {}),
        (r"c:\Users\Lenovo\Downloads\FRS Provo", "Flux Roofing & Siding", {"default_loc": "Provo Utah"}),
        (r"c:\Users\Lenovo\Downloads\FRS Boise", "Flux Roofing & Siding", {"default_loc": "Boise Idaho"}),
        (r"c:\Users\Lenovo\Downloads\HATZ Scottsdale", "Hatz Court Builders", {"default_loc": "Scottsdale AZ"}),
        (r"c:\Users\Lenovo\Downloads\AMAR", "American Muffler & Auto Repair", {"default_loc": "Boise Idaho"}),
        (r"c:\Users\Lenovo\Downloads\HDT", "HDT Pool Builders Boise", {"default_loc": "Treasure Valley Idaho"}),
        (r"c:\Users\Lenovo\Downloads\PCC Las Vegas", "Patio Cover Concepts", {}),
        (r"c:\Users\Lenovo\Downloads\PCC St George", "Patio Cover Concepts", {}),
        (r"c:\Users\Lenovo\Downloads\ZDS", "Zen Day Spa", {"default_loc": "Boise Idaho"}),
        (r"c:\Users\Lenovo\Downloads\WCB", "Woodwright Custom Builders", {"default_loc": "Treasure Valley Idaho"}),
        (r"c:\Users\Lenovo\Downloads\SOL", "Sol Pressure Washing", {"default_loc": "Boise ID"}),
    ]

    all_logs: list[str] = []
    for path_str, company, extra in clients:
        folder = Path(path_str)
        if not folder.is_dir():
            all_logs.append(f"MISSING FOLDER: {path_str}")
            continue
        all_logs.append(f"\n===== {folder.name} =====")
        all_logs.extend(process_folder(folder, company, extra))

    print("\n".join(all_logs))
    return 0


if __name__ == "__main__":
    sys.exit(main())
