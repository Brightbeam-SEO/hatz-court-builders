import type { GeoJSON } from "geojson";
import boise from "@/data/service-area-boundaries/boise.json";
import caldwell from "@/data/service-area-boundaries/caldwell.json";
import eagle from "@/data/service-area-boundaries/eagle.json";
import gardenCity from "@/data/service-area-boundaries/garden-city.json";
import kuna from "@/data/service-area-boundaries/kuna.json";
import meridian from "@/data/service-area-boundaries/meridian.json";
import middleton from "@/data/service-area-boundaries/middleton.json";
import nampa from "@/data/service-area-boundaries/nampa.json";
import star from "@/data/service-area-boundaries/star.json";
import { DEFAULT_SERVICE_AREA_CITY_ID } from "@/lib/service-area-cities";

/** Simplified OSM administrative boundaries (≈3% mapshaper simplify). */
export const SERVICE_AREA_BOUNDARIES: Record<string, GeoJSON.GeoJSON> = {
  meridian: meridian as GeoJSON.GeoJSON,
  boise: boise as GeoJSON.GeoJSON,
  eagle: eagle as GeoJSON.GeoJSON,
  star: star as GeoJSON.GeoJSON,
  "garden-city": gardenCity as GeoJSON.GeoJSON,
  kuna: kuna as GeoJSON.GeoJSON,
  nampa: nampa as GeoJSON.GeoJSON,
  caldwell: caldwell as GeoJSON.GeoJSON,
  middleton: middleton as GeoJSON.GeoJSON,
};

export function getServiceAreaBoundary(cityId: string): GeoJSON.GeoJSON {
  return SERVICE_AREA_BOUNDARIES[cityId] ?? SERVICE_AREA_BOUNDARIES[DEFAULT_SERVICE_AREA_CITY_ID];
}
