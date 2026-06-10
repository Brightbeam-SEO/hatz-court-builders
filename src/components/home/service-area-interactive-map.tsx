"use client";

import L from "leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { getServiceAreaBoundary } from "@/lib/service-area-boundaries-data";
import { BUSINESS } from "@/lib/business";
import { DEFAULT_SERVICE_AREA_CITY_ID } from "@/lib/service-area-cities";

const { lat, lng } = BUSINESS.mapCenter;

const MAP_PIN_LABEL = "Greenbelt Property Management Meridian";

const TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

const CITY_OUTLINE_STYLE: L.PathOptions = {
  color: "#12549B",
  weight: 3,
  opacity: 0.95,
  fillColor: "#12549B",
  fillOpacity: 0.12,
  dashArray: "7 5",
  interactive: false,
  className: "service-area-city-outline",
};

const officePinIcon = L.divIcon({
  className: "service-area-map-pin-wrap",
  html: `<div class="service-area-map-marker">
    <p class="service-area-map-marker-label">${MAP_PIN_LABEL}</p>
    <svg width="36" height="48" viewBox="0 0 36 48" aria-hidden="true" focusable="false">
      <path d="M18 2C9.8 2 3 8.5 3 16.2c0 9.8 15 29.8 15 29.8s15-20 15-29.8C33 8.5 26.2 2 18 2z" fill="#12549B" stroke="rgba(21,21,21,0.2)" stroke-width="1"/>
      <circle cx="18" cy="15" r="5" fill="#ffffff"/>
    </svg>
  </div>`,
  iconSize: [260, 88],
  iconAnchor: [130, 88],
});

function clearLeafletContainerId(node: HTMLElement) {
  const el = node as HTMLElement & { _leaflet_id?: number };
  if (el._leaflet_id != null) {
    delete el._leaflet_id;
  }
}

function focusCityOnMap(map: L.Map, cityId: string) {
  const geometry = getServiceAreaBoundary(cityId);

  const layer = L.geoJSON(geometry, {
    style: () => CITY_OUTLINE_STYLE,
  }).addTo(map);

  map.fitBounds(layer.getBounds(), { padding: [36, 36], duration: 0.85, maxZoom: 13 });

  return layer;
}

export function ServiceAreaInteractiveMap({
  activeCityId = DEFAULT_SERVICE_AREA_CITY_ID,
}: {
  activeCityId?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const outlineLayerRef = useRef<L.GeoJSON | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const destroyMap = () => {
      outlineLayerRef.current = null;
      markerRef.current = null;
      const instance = mapRef.current;
      mapRef.current = null;
      if (instance) {
        instance.remove();
      }
      clearLeafletContainerId(container);
    };

    const initMap = () => {
      if (cancelled || mapRef.current) return;

      const { width, height } = container.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;

      clearLeafletContainerId(container);

      const map = L.map(container, {
        center: [lat, lng],
        zoom: BUSINESS.mapDefaultZoom,
        scrollWheelZoom: true,
        zoomControl: true,
      });

      L.tileLayer(TILE_URL, { attribution: TILE_ATTRIBUTION }).addTo(map);
      markerRef.current = L.marker([lat, lng], { icon: officePinIcon, title: MAP_PIN_LABEL }).addTo(
        map,
      );
      outlineLayerRef.current = focusCityOnMap(map, activeCityId);

      mapRef.current = map;
      requestAnimationFrame(() => {
        mapRef.current?.invalidateSize();
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
        return;
      }
      initMap();
    });

    resizeObserver.observe(container);
    const frameId = requestAnimationFrame(initMap);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      destroyMap();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (outlineLayerRef.current) {
      map.removeLayer(outlineLayerRef.current);
      outlineLayerRef.current = null;
    }

    outlineLayerRef.current = focusCityOnMap(map, activeCityId);
  }, [activeCityId]);

  return (
    <div
      ref={containerRef}
      className="service-area-leaflet-map absolute inset-0 h-full w-full min-h-[12rem]"
      aria-label={MAP_PIN_LABEL}
    />
  );
}
