import base64
import re
from collections import deque
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageOps

SOURCE_SVG = Path(r"c:\Users\Lenovo\Downloads\gpm favicon logo final.svg")
ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"
ICON_MARK = PUBLIC / "gpm-favicon-icon.png"

BRAND_GREEN = (14, 103, 52)
WHITE = (255, 255, 255)

SVG_CLIP = (0, 13, 375, 337.742188)
SVG_MATRIX = (0.209122, 0, 0, 0.209212, -173.250541, 12.990287)


def extract_embedded_png(svg_text: str) -> Image.Image:
    match = re.search(r'data:image/png;base64,([^"]+)"', svg_text)
    if not match:
        raise RuntimeError("No embedded PNG found in SVG")
    return Image.open(BytesIO(base64.b64decode(match.group(1)))).convert("RGBA")


def svg_region_to_image_crop(image: Image.Image) -> Image.Image:
    sx, _, _, sy, tx, ty = SVG_MATRIX
    x0, y0, x1, y1 = SVG_CLIP
    left = int((x0 - tx) / sx)
    top = int((y0 - ty) / sy)
    right = int((x1 - tx) / sx)
    bottom = int((y1 - ty) / sy)
    return image.crop((left, top, right, bottom))


def icon_only_crop(image: Image.Image) -> Image.Image:
    gray = ImageOps.grayscale(image)
    width, height = gray.size
    row_bright = [
        sum(1 for x in range(width) if gray.getpixel((x, y)) > 30) for y in range(height)
    ]
    max_bright = max(row_bright) if row_bright else 0
    bright_rows = [i for i, count in enumerate(row_bright) if count > 20]
    if not bright_rows:
        return image

    icon_top = bright_rows[0]
    text_start = height
    for y in range(int(height * 0.55), height - 10):
        if row_bright[y] > max_bright * 0.55:
            prev = row_bright[max(0, y - 24) : y]
            if prev and max(prev) < max_bright * 0.45:
                text_start = y - 8
                break
    if text_start >= height:
        text_start = int(height * 0.68)

    return image.crop((0, icon_top, width, max(icon_top + 1, text_start)))


def is_green(r: int, g: int, b: int) -> bool:
    return g > r + 15 and g > b + 15 and g > 50


def flood_transparent_background(image: Image.Image, tolerance: int = 18) -> Image.Image:
    img = image.copy().convert("RGBA")
    pixels = img.load()
    width, height = img.size
    visited = [[False] * width for _ in range(height)]

    def is_background(r: int, g: int, b: int, a: int) -> bool:
        return a > 200 and r > 255 - tolerance and g > 255 - tolerance and b > 255 - tolerance

    queue: deque[tuple[int, int]] = deque()
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= width or y >= height or visited[y][x]:
            continue
        visited[y][x] = True
        r, g, b, a = pixels[x, y]
        if not is_background(r, g, b, a):
            continue
        pixels[x, y] = (255, 255, 255, 0)
        queue.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    return img


def monochrome_to_brand(image: Image.Image) -> Image.Image:
    gray = ImageOps.grayscale(image)
    width, height = gray.size
    mask = gray.point(lambda v: 255 if v > 30 else 0).convert("L")

    green_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    green_layer.paste(Image.new("RGBA", (width, height), (*BRAND_GREEN, 255)), mask=mask)

    holes = Image.new("L", (width, height), 0)
    hole_pixels = holes.load()
    mask_pixels = mask.load()
    visited = [[False] * width for _ in range(height)]

    for start_y in range(height):
        for start_x in range(width):
            if visited[start_y][start_x] or mask_pixels[start_x, start_y] > 128:
                continue
            touches_edge = False
            queue: deque[tuple[int, int]] = deque([(start_x, start_y)])
            visited[start_y][start_x] = True
            component: list[tuple[int, int]] = []

            while queue:
                x, y = queue.popleft()
                component.append((x, y))
                if x in (0, width - 1) or y in (0, height - 1):
                    touches_edge = True
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < width and 0 <= ny < height and not visited[ny][nx]:
                        visited[ny][nx] = True
                        if mask_pixels[nx, ny] <= 128:
                            queue.append((nx, ny))

            if not touches_edge and len(component) > 40:
                for x, y in component:
                    hole_pixels[x, y] = 255

    white_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    white_layer.paste(Image.new("RGBA", (width, height), (*WHITE, 255)), mask=holes)

    output = Image.alpha_composite(green_layer, white_layer)
    bbox = output.getbbox()
    return output.crop(bbox) if bbox else output


def colorize_brand(image: Image.Image) -> Image.Image:
    img = flood_transparent_background(image)
    pixels = img.load()
    width, height = img.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a < 10:
                continue
            if is_green(r, g, b):
                pixels[x, y] = (*BRAND_GREEN, a)
            elif r > 200 and g > 200 and b > 200:
                pixels[x, y] = (*WHITE, a)
            else:
                pixels[x, y] = (r, g, b, 0)

    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def fit_square(image: Image.Image, size: int, content_ratio: float = 0.82) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    target = int(size * content_ratio)
    scale = min(target / image.width, target / image.height)
    new_w = max(1, int(image.width * scale))
    new_h = max(1, int(image.height * scale))
    resized = image.resize((new_w, new_h), Image.Resampling.LANCZOS)
    offset = ((size - new_w) // 2, (size - new_h) // 2)
    canvas.paste(resized, offset, resized)
    return canvas


def save_png(image: Image.Image, path: Path, size: int) -> None:
    fit_square(image, size).save(path, format="PNG", optimize=True)


def save_svg(source: Image.Image, path: Path, size: int = 512) -> None:
    png = fit_square(source, size)
    buffer = BytesIO()
    png.save(buffer, format="PNG", optimize=True)
    encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
    svg = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">'
        f'<image width="{size}" height="{size}" href="data:image/png;base64,{encoded}"/>'
        "</svg>"
    )
    path.write_text(svg, encoding="utf-8")


def build_source() -> Image.Image:
    if ICON_MARK.exists():
        return colorize_brand(Image.open(ICON_MARK).convert("RGBA"))

    if not SOURCE_SVG.exists():
        raise FileNotFoundError(f"Missing favicon source: {SOURCE_SVG}")

    svg_text = SOURCE_SVG.read_text(encoding="utf-8", errors="ignore")
    embedded = extract_embedded_png(svg_text)
    clipped = svg_region_to_image_crop(embedded)
    icon_only = icon_only_crop(clipped)
    sample = icon_only.getpixel((icon_only.width // 2, icon_only.height // 2))
    if is_green(*sample[:3]):
        return colorize_brand(icon_only)
    return monochrome_to_brand(icon_only)


def main() -> None:
    source = build_source()
    print(f"Source icon: {source.size}")

    png_sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "favicon-48x48.png": 48,
        "favicon-96x96.png": 96,
        "apple-touch-icon.png": 180,
        "favicon-192x192.png": 192,
    }

    for name, size in png_sizes.items():
        save_png(source, PUBLIC / name, size)

    ico_sizes = [16, 32, 48]
    ico_images = [fit_square(source, size) for size in ico_sizes]
    ico_images[0].save(
        PUBLIC / "favicon.ico", format="ICO", sizes=[(size, size) for size in ico_sizes]
    )

    save_svg(source, PUBLIC / "favicon.svg")
    save_svg(source, APP / "icon.svg")
    save_png(source, APP / "icon.png", 96)
    fit_square(source, 48).save(APP / "favicon.ico", format="ICO", sizes=[(48, 48)])
    save_png(source, APP / "apple-icon.png", 180)

    print("Done")


if __name__ == "__main__":
    main()
