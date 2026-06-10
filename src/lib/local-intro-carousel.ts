import { gpmPick } from "@/lib/gpm-pick-gallery";

/**
 * Home `LocalIntroSection` arc carousel — Hatz Court Builders project photos.
 */
export const LOCAL_INTRO_CAROUSEL_PATHS = [
  gpmPick("backyard pickleball basketball dual sport court"),
  gpmPick("outdoor multi court acrylic surfacing"),
  gpmPick("indoor hardwood basketball court gym interior"),
  gpmPick("backyard gray basketball court installation"),
  gpmPick("modular court tile custom logo branding"),
  gpmPick("tennis court resurface blue green acrylic"),
  gpmPick("multi sport outdoor backyard court"),
  gpmPick("outdoor multi court pickleball basketball tennis"),
] as const;

export const LOCAL_INTRO_ARC_CENTER_SLOT_IMAGE_SRC = LOCAL_INTRO_CAROUSEL_PATHS[0];
export const LOCAL_INTRO_ARC_RIGHT_SLOT_IMAGE_SRC = LOCAL_INTRO_CAROUSEL_PATHS[1];
