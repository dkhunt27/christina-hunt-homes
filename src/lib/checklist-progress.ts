import { CHECKLISTS } from "../data/checklists";
import type { ChecklistKey, Season } from "../types";

/** Storage key for one checklist item, e.g. `buy-0-2`. Matches the prototype. */
export function checklistItemKey(tab: ChecklistKey, phase: number, item: number) {
  return `${tab}-${phase}-${item}`;
}

/** Storage key for one seasonal chore, e.g. `chore-fall-1`. */
export function choreKey(season: Season, index: number) {
  return `chore-${season}-${index}`;
}

export function checklistProgress(tab: ChecklistKey, checks: Record<string, boolean>) {
  let total = 0;
  let done = 0;
  CHECKLISTS[tab].forEach((phase, pi) => {
    phase.items.forEach((_, ii) => {
      total++;
      if (checks[checklistItemKey(tab, pi, ii)]) done++;
    });
  });
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}
