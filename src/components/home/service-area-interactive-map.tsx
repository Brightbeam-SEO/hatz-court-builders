"use client";

import L from "leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { getServiceAreaBoundaryOrDefault } from "@/lib/service-area-boundaries-data";
import { BUSINESS } from "@/lib/business";
import type { ServiceAreaRegion } from "@/lib/service-area-cities";
import {
  SERVICE_AREA_OFFICE_PIN_CENTERS,
  SERVICE_AREA_REGION_MAP_DEFAULTS,
} from "@/lib/service-area-map-locations";

const MAP_PIN_LABEL = BUSINESS.nameShort;

const TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

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

const SCOTTSDALE_MAP_CENTER = SERVICE_AREA_OFFICE_PIN_CENTERS.scottsdale;

function createOfficePinIcon(label: string) {
  return L.divIcon({
    className: "service-area-map-pin-wrap",
    html: `<div class="service-area-map-marker">
    <p class="service-area-map-marker-label">${label}</p>
    <svg width="36" height="48" viewBox="0 0 36 48" aria-hidden="true" focusable="false">
      <path d="M18 2C9.8 2 3 8.5 3 16.2c0 9.8 15 29.8 15 29.8s15-20 15-29.8C33 8.5 26.2 2 18 2z" fill="#12549B" stroke="rgba(21,21,21,0.2)" stroke-width="1"/>
      <circle cx="18" cy="15" r="5" fill="#ffffff"/>
    </svg>
  </div>`,
    iconSize: [260, 88],
    iconAnchor: [130, 88],
  });
}

function clearLeafletContainerId(node: HTMLElement) {
  const el = node as HTMLElement & { _leaflet_id?: number };
  if (el._leaflet_id != null) {
    delete el._leaflet_id;
  }
}

function focusCityOnMap(map: L.Map, cityId: string) {
  const boundary = getServiceAreaBoundaryOrDefault(cityId);
  const fitPadding: L.FitBoundsOptions = { padding: [36, 36], maxZoom: 13 };

  const layer = L.geoJSON(boundary, {
    style: () => CITY_OUTLINE_STYLE,
  }).addTo(map);
  map.fitBounds(layer.getBounds(), fitPadding);
  return layer;
}

function getRegionCenter(region: ServiceAreaRegion) {
  return SERVICE_AREA_REGION_MAP_DEFAULTS[region].center;
}

function getRegionOfficePin(region: ServiceAreaRegion) {
  if (region === "arizona") {
    return {
      lat: SCOTTSDALE_MAP_CENTER.lat,
      lng: SCOTTSDALE_MAP_CENTER.lng,
      label: `${MAP_PIN_LABEL} Scottsdale`,
    };
  }
  return {
    lat: SERVICE_AREA_OFFICE_PIN_CENTERS.boise.lat,
    lng: SERVICE_AREA_OFFICE_PIN_CENTERS.boise.lng,
    label: `${MAP_PIN_LABEL} Boise`,
  };
}

export function ServiceAreaInteractiveMap({
  activeCityId,
  region = "idaho",
}: {
  activeCityId: string;
  region?: ServiceAreaRegion;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const outlineLayerRef = useRef<L.Layer | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const regionRef = useRef(region);

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

      const regionDefaults = SERVICE_AREA_REGION_MAP_DEFAULTS[regionRef.current];
      const officePin = getRegionOfficePin(regionRef.current);

      const map = L.map(container, {
        center: [regionDefaults.center.lat, regionDefaults.center.lng],
        zoom: regionDefaults.zoom,
        scrollWheelZoom: true,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer(TILE_URL).addTo(map);
      markerRef.current = L.marker([officePin.lat, officePin.lng], {
        icon: createOfficePinIcon(officePin.label),
        title: officePin.label,
      }).addTo(map);
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
    regionRef.current = region;
    const map = mapRef.current;
    if (!map) return;

    const officePin = getRegionOfficePin(region);
    if (markerRef.current) {
      markerRef.current.setLatLng([officePin.lat, officePin.lng]);
      markerRef.current.setIcon(createOfficePinIcon(officePin.label));
    }

    const regionCenter = getRegionCenter(region);
    map.setView([regionCenter.lat, regionCenter.lng], SERVICE_AREA_REGION_MAP_DEFAULTS[region].zoom, {
      animate: true,
    });
  }, [region]);

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
      aria-label={`${MAP_PIN_LABEL} service area map`}
    />
  );
}
