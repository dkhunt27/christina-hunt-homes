# CLAUDE.md

Christina Hunt Homes: a client-facing realtor site for Christina Hunt (Real Estate One,
Southeast Michigan). React + Vite + TypeScript + MUI + TanStack Query + Supabase. It follows
the conventions of `lo30-react-supabase`. The design handoff is in `docs/design/`
(README, prototype HTML, screenshots); the prototype is the source of truth for look and copy.

## Commands

- `npm run dev` — Vite dev server
- `npm test` — Vitest (pure-logic files opt into `// @vitest-environment node`)
- `npm run lint` — `tsc -b` + Biome (`npm run lint:fix` to apply fixes). No eslint/prettier.
- `npm run build` — typecheck + production build

## Layout

- `src/app.tsx` — providers (Query → Season → Toast → Auth → SiteState) and lazy routes
- `src/routes.ts` — every path (`ROUTES`) and path helpers. Never hardcode a path string.
- `src/pages/` — routed pages, `export default` for `React.lazy`; co-located sections live in
  a folder named after the page (`pages/home/`, `pages/listing/`, …)
- `src/components/` — shared components (named exports), including the site chrome in
  `site-layout.tsx`
- `src/theme/` — `seasons.ts` (THEMES, SEASON_COPY, FX, `getSeason`), `season-provider.tsx`
  (writes `--bg`, `--acc`, … to `:root`, debug override), `create-site-theme.ts` (MUI theme),
  `tokens.ts` (fixed colors, `SV` seasonal CSS vars, shared `sx` fragments)
- `src/data/` — sample content lifted from the prototype (listings, towns, recipes, …)
- `src/lib/` — pure helpers (`format`, `listing-filters`, `commute`, `storage`) and
  `lib/db/*-db.ts`, the only code that touches the Supabase client
- `supabase/migrations/` — schema + RLS for synced client data and leads

## Conventions

- kebab-case files and folders; named exports except lazy-loaded pages
- MUI with `sx`. Seasonal colors go through `SV.*` (CSS variables) so they animate on season
  change; fixed colors through `COLORS.*`. Design widths are content widths, so columns use
  `PageSection` / `columnMaxWidth()`, which add the 24px gutters back.
- Components call `lib/db/*` (wrapped in TanStack Query), never `supabase` directly. Query keys
  come from `QK` in `src/lib/query-keys.ts`.
- Biome: double quotes, semicolons, trailing commas, 2-space indent, 100-char lines.

## Data and auth

- Local-first: hearts, saved searches, tour notes, takes and check-offs live in localStorage
  under `chuntHome_v2` (`src/lib/storage.ts`, `contexts/site-state-context.tsx`).
- Phone OTP sign-in via Supabase Auth (`hooks/use-auth.tsx`). `requireSignIn(reason, action)`
  runs the action now, or after the code is verified. On sign-in the account's rows are merged
  with the device's (`lib/user-state-sync.ts`) and later changes are pushed after a short pause.
- Without `VITE_SUPABASE_*` env vars the site runs on sample data and sign-in is a demo
  (any 6-digit code). Leads are then logged, not stored.
- The seasonal debug panel renders only with `?debug` in the URL or `VITE_SHOW_THEME_DEBUG=true`.

## Still sample / placeholder

- Listings: `lib/idx.ts` serves `data/listings.ts`; replace with the Realcomp IDX vendor feed.
- Drive times: `lib/commute.ts` estimates from map position; replace with Mapbox/Google matrix.
- Map: `pages/search/listing-map.tsx` uses placeholder tiles and x/y pins.
- Partner takes (`pages/saved/saved-listing.tsx`) and home values (`lib/home-value.ts`) are
  derived from a hash, as in the prototype.
- Pros' business names, lender/title names, photos, phone number and email are placeholders.
