import type { Season } from "../types";

export const CHORES: Record<Season, string[]> = {
  fall: [
    "Clean gutters once the leaves drop",
    "Swap the furnace filter",
    "Shut off and drain outdoor faucets before first freeze",
    "Test smoke and CO detectors",
    "Reverse ceiling fans to clockwise",
  ],
  winter: [
    "Keep the heat steady to prevent frozen pipes",
    "Check for ice dams after big snows",
    "Salt and shovel walkways for guests",
    "Swap the furnace filter again",
  ],
  spring: [
    "Check the sump pump before heavy rains",
    "Look for shingles lost over winter",
    "Service the A/C",
    "Clean window screens",
  ],
  summer: [
    "Check deck boards and re-seal if needed",
    "Trim trees away from the roof",
    "Clean the dryer vent",
    "Water the foundation plantings during dry spells",
  ],
};
