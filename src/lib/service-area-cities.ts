/** Treasure Valley cities shown on the home service-area map. */
export type ServiceAreaCity = {
  id: string;
  label: string;
};

export const SERVICE_AREA_CITIES: ServiceAreaCity[] = [
  { id: "meridian", label: "Meridian" },
  { id: "boise", label: "Boise" },
  { id: "eagle", label: "Eagle" },
  { id: "star", label: "Star" },
  { id: "garden-city", label: "Garden City" },
  { id: "kuna", label: "Kuna" },
  { id: "nampa", label: "Nampa" },
  { id: "caldwell", label: "Caldwell" },
  { id: "middleton", label: "Middleton" },
];

export const DEFAULT_SERVICE_AREA_CITY_ID = "meridian";

export function getServiceAreaCity(id: string): ServiceAreaCity {
  return SERVICE_AREA_CITIES.find((c) => c.id === id) ?? SERVICE_AREA_CITIES[0];
}
