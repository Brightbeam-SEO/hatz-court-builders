import type { GeoJSON } from "geojson";
import anthem from "@/data/service-area-boundaries/anthem.json";
import arcadia from "@/data/service-area-boundaries/arcadia.json";
import boise from "@/data/service-area-boundaries/boise.json";
import caldwell from "@/data/service-area-boundaries/caldwell.json";
import chandler from "@/data/service-area-boundaries/chandler.json";
import eagle from "@/data/service-area-boundaries/eagle.json";
import fountainHills from "@/data/service-area-boundaries/fountain-hills.json";
import fruitland from "@/data/service-area-boundaries/fruitland.json";
import gardenCity from "@/data/service-area-boundaries/garden-city.json";
import gilbert from "@/data/service-area-boundaries/gilbert.json";
import glendale from "@/data/service-area-boundaries/glendale.json";
import hailey from "@/data/service-area-boundaries/hailey.json";
import homedale from "@/data/service-area-boundaries/homedale.json";
import ketchum from "@/data/service-area-boundaries/ketchum.json";
import kuna from "@/data/service-area-boundaries/kuna.json";
import mccall from "@/data/service-area-boundaries/mccall.json";
import meridian from "@/data/service-area-boundaries/meridian.json";
import mesa from "@/data/service-area-boundaries/mesa.json";
import middleton from "@/data/service-area-boundaries/middleton.json";
import mountainHome from "@/data/service-area-boundaries/mountain-home.json";
import nampa from "@/data/service-area-boundaries/nampa.json";
import peoria from "@/data/service-area-boundaries/peoria.json";
import phoenix from "@/data/service-area-boundaries/phoenix.json";
import scottsdale from "@/data/service-area-boundaries/scottsdale.json";
import stanley from "@/data/service-area-boundaries/stanley.json";
import star from "@/data/service-area-boundaries/star.json";
import sunValley from "@/data/service-area-boundaries/sun-valley.json";
import tempe from "@/data/service-area-boundaries/tempe.json";
import twinFalls from "@/data/service-area-boundaries/twin-falls.json";
import { DEFAULT_SERVICE_AREA_CITY_BY_REGION } from "@/lib/service-area-cities";

/** Simplified OSM administrative boundaries. */
export const SERVICE_AREA_BOUNDARIES: Record<string, GeoJSON.GeoJSON> = {
  boise: boise as GeoJSON.GeoJSON,
  meridian: meridian as GeoJSON.GeoJSON,
  nampa: nampa as GeoJSON.GeoJSON,
  caldwell: caldwell as GeoJSON.GeoJSON,
  middleton: middleton as GeoJSON.GeoJSON,
  star: star as GeoJSON.GeoJSON,
  eagle: eagle as GeoJSON.GeoJSON,
  kuna: kuna as GeoJSON.GeoJSON,
  fruitland: fruitland as GeoJSON.GeoJSON,
  "sun-valley": sunValley as GeoJSON.GeoJSON,
  hailey: hailey as GeoJSON.GeoJSON,
  ketchum: ketchum as GeoJSON.GeoJSON,
  stanley: stanley as GeoJSON.GeoJSON,
  mccall: mccall as GeoJSON.GeoJSON,
  "twin-falls": twinFalls as GeoJSON.GeoJSON,
  "mountain-home": mountainHome as GeoJSON.GeoJSON,
  homedale: homedale as GeoJSON.GeoJSON,
  phoenix: phoenix as GeoJSON.GeoJSON,
  scottsdale: scottsdale as GeoJSON.GeoJSON,
  "fountain-hills": fountainHills as GeoJSON.GeoJSON,
  mesa: mesa as GeoJSON.GeoJSON,
  gilbert: gilbert as GeoJSON.GeoJSON,
  chandler: chandler as GeoJSON.GeoJSON,
  glendale: glendale as GeoJSON.GeoJSON,
  tempe: tempe as GeoJSON.GeoJSON,
  peoria: peoria as GeoJSON.GeoJSON,
  arcadia: arcadia as GeoJSON.GeoJSON,
  anthem: anthem as GeoJSON.GeoJSON,
  "garden-city": gardenCity as GeoJSON.GeoJSON,
};

export function hasServiceAreaBoundary(cityId: string): boolean {
  return cityId in SERVICE_AREA_BOUNDARIES;
}

export function getServiceAreaBoundary(cityId: string): GeoJSON.GeoJSON | undefined {
  return SERVICE_AREA_BOUNDARIES[cityId];
}

export function getServiceAreaBoundaryOrDefault(cityId: string): GeoJSON.GeoJSON {
  return (
    SERVICE_AREA_BOUNDARIES[cityId] ??
    SERVICE_AREA_BOUNDARIES[DEFAULT_SERVICE_AREA_CITY_BY_REGION.idaho]!
  );
}

type GeoCoord = number | number[] | number[][] | number[][][];

function walkCoordinates(coords: GeoCoord, visit: (lng: number, lat: number) => void): void {
  if (!Array.isArray(coords)) return;

  if (typeof coords[0] === "number" && typeof coords[1] === "number") {
    const [lng, lat] = coords as [number, number];
    visit(lng, lat);
    return;
  }

  for (const part of coords) {
    walkCoordinates(part as GeoCoord, visit);
  }
}

/** Geographic center of a city's boundary polygon (bounds midpoint). */
export function getServiceAreaCityCenter(cityId: string): { lat: number; lng: number } | undefined {
  const boundary = getServiceAreaBoundary(cityId);
  if (!boundary) return undefined;

  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  const visit = (lng: number, lat: number) => {
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
  };

  if (boundary.type === "GeometryCollection") {
    for (const geometry of boundary.geometries) {
      if ("coordinates" in geometry) {
        walkCoordinates(geometry.coordinates as GeoCoord, visit);
      }
    }
  } else if ("coordinates" in boundary) {
    walkCoordinates(boundary.coordinates as GeoCoord, visit);
  }

  if (minLat === Infinity) return undefined;

  return {
    lat: (minLat + maxLat) / 2,
    lng: (minLng + maxLng) / 2,
  };
}
