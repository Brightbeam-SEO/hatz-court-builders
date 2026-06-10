/** Google Maps embed for a city or area (service-area pages). */
export function googleMapsAreaEmbedSrc(placeQuery: string): string {
  const q = encodeURIComponent(placeQuery);
  return "https://maps.google.com/maps?q=" + q + "&hl=en&z=11&output=embed";
}

/** Default in-article map for service landings (Treasure Valley service area). */
export const EAGLE_AREA_MAP = {
  mapEmbedSrc: googleMapsAreaEmbedSrc("Treasure Valley, Idaho"),
  mapIframeTitle: "Map - Treasure Valley, Idaho",
} as const;

/** @deprecated Use EAGLE_AREA_MAP */
export const EAGLE_SPA_MAP = EAGLE_AREA_MAP;

/** In-article map for Boise service landings. */
export const BOISE_AREA_MAP = {
  mapEmbedSrc: googleMapsAreaEmbedSrc("Boise, ID"),
  mapIframeTitle: "Map - Boise, Idaho",
} as const;

/** In-article map for Nampa service landings. */
export const NAMPA_AREA_MAP = {
  mapEmbedSrc: googleMapsAreaEmbedSrc("Nampa, ID"),
  mapIframeTitle: "Map - Nampa, Idaho",
} as const;

/** Meridian office / primary service area. */
export const MERIDIAN_AREA_MAP = {
  mapEmbedSrc: googleMapsAreaEmbedSrc("Meridian, Idaho"),
  mapIframeTitle: "Map - Greenbelt Property Management, Meridian, Idaho",
} as const;

/** In-article map embed per city landing. */
export const CITY_MASSAGE_MAP_EMBEDS: Record<
  string,
  { mapEmbedSrc: string; mapIframeTitle: string }
> = {
  "massage-services-boise-id": BOISE_AREA_MAP,
  "massage-services-nampa-id": NAMPA_AREA_MAP,
  "massage-services-eagle-id": EAGLE_AREA_MAP,
  "massage-services-meridian-id": MERIDIAN_AREA_MAP,
  "massage-services-kuna-id": {
    mapEmbedSrc: googleMapsAreaEmbedSrc("Kuna, ID"),
    mapIframeTitle: "Map - Kuna, Idaho",
  },
  "massage-services-star-id": {
    mapEmbedSrc: googleMapsAreaEmbedSrc("Star, ID"),
    mapIframeTitle: "Map - Star, Idaho",
  },
  "massage-services-caldwell-id": {
    mapEmbedSrc: googleMapsAreaEmbedSrc("Caldwell, ID"),
    mapIframeTitle: "Map - Caldwell, Idaho",
  },
  "massage-services-middleton-id": {
    mapEmbedSrc: googleMapsAreaEmbedSrc("Middleton, ID"),
    mapIframeTitle: "Map - Middleton, Idaho",
  },
};
