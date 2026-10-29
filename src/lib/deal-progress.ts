import { SAMPLE_DEAL } from "../data/deal";
import type { Deal } from "./db/deals-db";
import { addDays } from "./format";

const DAY_MS = 86_400_000;

export function sampleDeal(today = new Date()): Deal {
  return {
    address: SAMPLE_DEAL.address,
    steps: SAMPLE_DEAL.steps.map((s) => ({
      title: s.title,
      desc: s.desc,
      date: addDays(s.offset, today),
    })),
  };
}

/** Index of the first step still ahead of today; steps before it are done. */
export function currentStepIndex(deal: Deal, today = new Date()) {
  const i = deal.steps.findIndex((s) => s.date.getTime() > today.getTime());
  return i === -1 ? deal.steps.length - 1 : i;
}

export function dealProgress(deal: Deal, today = new Date()) {
  const first = deal.steps[0].date.getTime();
  const close = deal.steps[deal.steps.length - 1].date.getTime();
  const span = Math.max(close - first, 1);
  return {
    daysLeft: Math.max(0, Math.round((close - today.getTime()) / DAY_MS)),
    closeDate: deal.steps[deal.steps.length - 1].date,
    pct: Math.min(100, Math.max(0, ((today.getTime() - first) / span) * 100)),
  };
}
