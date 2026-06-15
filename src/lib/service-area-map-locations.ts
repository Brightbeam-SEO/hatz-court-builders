import type { ServiceAreaRegion } from "@/lib/service-area-cities";
import { getServiceAreaCityCenter } from "@/lib/service-area-boundaries-data";

const boiseCenter = getServiceAreaCityCenter("boise") ?? { lat: 43.615, lng: -116.2146 };
const scottsdaleCenter = getServiceAreaCityCenter("scottsdale") ?? { lat: 33.4942, lng: -111.9261 };

/** Map defaults when focusing a region before a city boundary loads. */
export const SERVICE_AREA_REGION_MAP_DEFAULTS: Record<
  ServiceAreaRegion,
  { center: { lat: number; lng: number }; zoom: number }
> = {
  idaho: { center: boiseCenter, zoom: 10 },
  arizona: { center: scottsdaleCenter, zoom: 10 },
};

export const SERVICE_AREA_OFFICE_PIN_CENTERS = {
  boise: boiseCenter,
  scottsdale: scottsdaleCenter,
} as const;
