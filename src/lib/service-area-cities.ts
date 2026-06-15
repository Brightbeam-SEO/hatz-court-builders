/** Service-area cities grouped by Idaho (Boise) and Arizona (Scottsdale) regions. */
export type ServiceAreaRegion = "idaho" | "arizona";

export type ServiceAreaCity = {
  id: string;
  label: string;
  region: ServiceAreaRegion;
};

export const SERVICE_AREA_REGIONS: { id: ServiceAreaRegion; label: string }[] = [
  { id: "idaho", label: "Boise" },
  { id: "arizona", label: "Scottsdale" },
];

export const SERVICE_AREA_CITIES: ServiceAreaCity[] = [
  { id: "boise", label: "Boise", region: "idaho" },
  { id: "meridian", label: "Meridian", region: "idaho" },
  { id: "nampa", label: "Nampa", region: "idaho" },
  { id: "caldwell", label: "Caldwell", region: "idaho" },
  { id: "middleton", label: "Middleton", region: "idaho" },
  { id: "star", label: "Star", region: "idaho" },
  { id: "eagle", label: "Eagle", region: "idaho" },
  { id: "kuna", label: "Kuna", region: "idaho" },
  { id: "ketchum", label: "Ketchum", region: "idaho" },
  { id: "mccall", label: "McCall", region: "idaho" },
  { id: "mountain-home", label: "Mountain Home", region: "idaho" },
  { id: "homedale", label: "Homedale", region: "idaho" },
  { id: "phoenix", label: "Phoenix", region: "arizona" },
  { id: "scottsdale", label: "Scottsdale", region: "arizona" },
  { id: "fountain-hills", label: "Fountain Hills", region: "arizona" },
  { id: "mesa", label: "Mesa", region: "arizona" },
  { id: "gilbert", label: "Gilbert", region: "arizona" },
  { id: "chandler", label: "Chandler", region: "arizona" },
  { id: "glendale", label: "Glendale", region: "arizona" },
  { id: "tempe", label: "Tempe", region: "arizona" },
  { id: "peoria", label: "Peoria", region: "arizona" },
  { id: "arcadia", label: "Arcadia", region: "arizona" },
  { id: "anthem", label: "Anthem", region: "arizona" },
];

export const DEFAULT_SERVICE_AREA_REGION: ServiceAreaRegion = "idaho";

export const DEFAULT_SERVICE_AREA_CITY_BY_REGION: Record<ServiceAreaRegion, string> = {
  idaho: "boise",
  arizona: "scottsdale",
};

/** @deprecated Use `DEFAULT_SERVICE_AREA_CITY_BY_REGION.idaho` */
export const DEFAULT_SERVICE_AREA_CITY_ID = DEFAULT_SERVICE_AREA_CITY_BY_REGION.idaho;

export function getCitiesForRegion(region: ServiceAreaRegion): ServiceAreaCity[] {
  return SERVICE_AREA_CITIES.filter((city) => city.region === region);
}

export function getServiceAreaCity(id: string): ServiceAreaCity {
  return SERVICE_AREA_CITIES.find((c) => c.id === id) ?? SERVICE_AREA_CITIES[0]!;
}

export function getServiceAreaCityRegion(cityId: string): ServiceAreaRegion {
  return getServiceAreaCity(cityId).region;
}
