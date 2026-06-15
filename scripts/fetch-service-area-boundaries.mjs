/**
 * Fetch simplified city/admin boundaries from Nominatim and save as GeometryCollection JSON.
 * Usage: node scripts/fetch-service-area-boundaries.mjs [city-id ...]
 */
import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("src/data/service-area-boundaries");

/** @type {Record<string, string>} */
const CITY_QUERIES = {
  fruitland: "Fruitland, Idaho, USA",
  "sun-valley": "Sun Valley, Blaine County, Idaho, USA",
  hailey: "Hailey, Idaho, USA",
  ketchum: "Ketchum, Idaho, USA",
  stanley: "Stanley, Idaho, USA",
  mccall: "McCall, Idaho, USA",
  "twin-falls": "Twin Falls, Idaho, USA",
  "mountain-home": "Mountain Home, Idaho, USA",
  homedale: "Homedale, Idaho, USA",
  phoenix: "Phoenix, Arizona, USA",
  scottsdale: "Scottsdale, Arizona, USA",
  "fountain-hills": "Fountain Hills, Arizona, USA",
  mesa: "Mesa, Arizona, USA",
  gilbert: "Gilbert, Arizona, USA",
  chandler: "Chandler, Arizona, USA",
  glendale: "Glendale, Arizona, USA",
  tempe: "Tempe, Arizona, USA",
  peoria: "Peoria, Arizona, USA",
  arcadia: "Arcadia, Phoenix, Arizona, USA",
  anthem: "Anthem, Maricopa County, Arizona, USA",
};

const USER_AGENT = "HatzCourtBuilders/1.0 (service-area-boundary-fetch)";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function simplifyRing(ring, tolerance = 0.0015) {
  if (ring.length <= 4) return ring;

  function perpendicularDistance(point, lineStart, lineEnd) {
    const [x, y] = point;
    const [x1, y1] = lineStart;
    const [x2, y2] = lineEnd;
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dx === 0 && dy === 0) return Math.hypot(x - x1, y - y1);
    const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
    const projX = x1 + t * dx;
    const projY = y1 + t * dy;
    return Math.hypot(x - projX, y - projY);
  }

  function dp(points, start, end, tol, out) {
    let maxDist = 0;
    let index = 0;
    for (let i = start + 1; i < end; i++) {
      const dist = perpendicularDistance(points[i], points[start], points[end]);
      if (dist > maxDist) {
        maxDist = dist;
        index = i;
      }
    }
    if (maxDist > tol) {
      dp(points, start, index, tol, out);
      out.push(points[index]);
      dp(points, index, end, tol, out);
    }
  }

  const result = [ring[0]];
  dp(ring, 0, ring.length - 1, tolerance, result);
  result.push(ring[ring.length - 1]);
  return result;
}

function flattenToPolygons(geometry) {
  const polygons = [];
  if (!geometry) return polygons;

  if (geometry.type === "Polygon") {
    polygons.push({
      type: "Polygon",
      coordinates: geometry.coordinates.map((ring) => simplifyRing(ring)),
    });
    return polygons;
  }

  if (geometry.type === "MultiPolygon") {
    for (const poly of geometry.coordinates) {
      polygons.push({
        type: "Polygon",
        coordinates: poly.map((ring) => simplifyRing(ring)),
      });
    }
    return polygons;
  }

  if (geometry.type === "GeometryCollection") {
    for (const g of geometry.geometries ?? []) {
      polygons.push(...flattenToPolygons(g));
    }
  }

  return polygons;
}

function scoreResult(result, query) {
  let score = 0;
  const name = (result.display_name ?? "").toLowerCase();
  const qCity = query.toLowerCase().split(",")[0].trim();

  if (name.includes(qCity)) score += 10;
  if (result.class === "boundary" && result.type === "administrative") score += 8;
  if (result.class === "place") score += 6;
  if (result.geojson) score += 5;
  if (result.importance) score += result.importance;

  return score;
}

async function fetchBoundary(cityId, query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("polygon_geojson", "1");
  url.searchParams.set("limit", "8");
  url.searchParams.set("addressdetails", "1");

  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  });

  if (!res.ok) throw new Error(`Nominatim ${res.status} for ${cityId}`);

  const results = await res.json();
  if (!Array.isArray(results) || results.length === 0) {
    throw new Error(`No results for ${cityId} (${query})`);
  }

  const ranked = [...results].sort((a, b) => scoreResult(b, query) - scoreResult(a, query));
  const best = ranked.find((r) => r.geojson) ?? ranked[0];

  if (!best?.geojson) throw new Error(`No polygon for ${cityId} (${query})`);

  const polygons = flattenToPolygons(best.geojson);
  if (polygons.length === 0) throw new Error(`Could not flatten geometry for ${cityId}`);

  return { type: "GeometryCollection", geometries: polygons };
}

async function main() {
  const requested = process.argv.slice(2);
  const cityIds = requested.length > 0 ? requested : Object.keys(CITY_QUERIES);

  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const cityId of cityIds) {
    const query = CITY_QUERIES[cityId];
    if (!query) {
      console.warn(`Skip unknown city id: ${cityId}`);
      continue;
    }

    const outPath = path.join(OUT_DIR, `${cityId}.json`);
    try {
      console.log(`Fetching ${cityId}…`);
      const data = await fetchBoundary(cityId, query);
      await fs.writeFile(outPath, JSON.stringify(data));
      console.log(`  ✓ ${cityId} (${data.geometries.length} polygon(s))`);
    } catch (err) {
      console.error(`  ✗ ${cityId}: ${err.message}`);
    }

    await sleep(1100);
  }
}

main();
