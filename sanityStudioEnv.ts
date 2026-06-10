/**
 * Studio env for Sanity/Vite static replacement: each value must be a direct
 * `process.env.SANITY_STUDIO_*` reference (no dynamic keys, no `??` with other env names).
 * @see https://www.sanity.io/docs/studio/environment-variables
 */
export const studioProjectId = process.env.SANITY_STUDIO_PROJECT_ID;
export const studioDataset = process.env.SANITY_STUDIO_DATASET;
