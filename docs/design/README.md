# Handoff: Christina Hunt Homes — Farmhouse Kitchen realtor site

## Overview
A client-facing realtor website for **Christina Hunt, Realtor® at Real Estate One, serving Southeast Michigan** (Wayne, Oakland, Macomb, Washtenaw, Livingston counties). Clients search MLS listings directly on Christina's site (via IDX) instead of the brokerage site, save homes with no account, and only sign in (phone + SMS code, no password) to sync, get alerts, or book tours. The site is "homey": seasonal recipes, home-maintenance chores, buy/sell/move checklists, town guides, and a **seasonal theme** that changes colors, copy, and a light falling-particle effect by time of year.

Target stack: **the existing React + Supabase codebase (`lo30-react-supabase`)**. Follow that repo's routing, component, styling, and Supabase conventions.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing intended look and behavior, not production code to copy. Recreate these designs in the React codebase using its established patterns and libraries. All listing data, testimonials, pros, and deal data in the prototype are **sample data**.

To view the prototype: open `Christina Hunt Homes - Seasonal.dc.html` in a browser (keep `support.js` and `Listing Card.dc.html` in the same folder). Markup is between `<x-dc>` tags; all logic + sample data are in the `<script data-dc-script>` class at the bottom (`LISTINGS`, `TOWNS`, `EVENTS`, `RECIPES`, `CHORES`, `CHECKLISTS`, `THEMES`, `FX`, etc.) — lift these data shapes directly.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions. Recreate pixel-close. Image areas are striped placeholders labeled with what goes there.

## Suggested React structure
```
src/
  theme/seasons.ts          THEMES, SEASON_COPY, FX config, getSeason(date)
  theme/SeasonProvider.tsx  sets CSS vars on :root, exposes season + debug override
  components/
    Header.tsx  SeasonBanner.tsx  GinghamStrip.tsx  ListingCard.tsx
    SeasonalFx.tsx  PhoneLoginModal.tsx  TextChristinaFab.tsx  DebugThemePanel.tsx  Toast.tsx
  pages/
    Home.tsx  Search.tsx  Listing.tsx  Towns.tsx  TownDetail.tsx
    Kitchen.tsx  Checklists.tsx  Saved.tsx  Hub.tsx
  data/  recipes.ts  chores.ts  checklists.ts  towns.ts  events.ts  pros.ts
  lib/   idx.ts (MLS feed client)  commute.ts  storage.ts (localStorage ⇄ Supabase sync)
```
Routes: `/`, `/search`, `/listing/:id`, `/towns`, `/towns/:slug`, `/kitchen`, `/todos`, `/saved`, `/hub`.

## Design Tokens

### Fixed colors
| Token | Hex | Use |
|---|---|---|
| ink | `#23211E` | text, primary buttons, borders, iron accents |
| body-muted | `#5E5444` | body copy |
| meta | `#7A6E5C` | captions, labels |
| card | `#FFFDF8` | card backgrounds |
| header/paper | `#FBF8F1` | header, frames, tags |
| line | `#E8DFCC` | card borders |
| line-strong | `#E0D4BC` | chips/inputs borders |
| placeholder stripes | `#EFE5D0` / `#F6EFE0` | 135° 10px stripes |
| chalkboard | `#2F3430` + `#8B6A4A` 10px frame | kitchen chores panel |
| wood footer | `#5B4330` + dark plank lines every 48px | footer |
| heart active | `#B5482F` | saved heart |
| warning | `#9E3B2C` | wire-fraud box |
| positive | `#4F7A3E` | value up |

### Seasonal CSS variables (set on `:root`)
| var | Fall (default) | Winter | Spring | Summer |
|---|---|---|---|---|
| `--bg` | `#F3ECDF` | `#F1F0EC` | `#F5F2EA` | `#F6F1E4` |
| `--acc` | `#E3A857` | `#B9CCD8` | `#E8B7C0` | `#F2D27A` |
| `--accSoft` | `#F4E0C2` | `#E1E9EE` | `#F5E3E6` | `#F7EBC6` |
| `--ink` (script/eyebrow color) | `#8A4B2E` | `#8E2F25` | `#7E4556` | `#7C5A2A` |
| `--panel` | `#7A4A2E` | `#2F4B3C` | `#566E51` | `#3F5F7A` |
| `--panelDeep` | `#643C24` | `#233A2E` | `#455A41` | `#324D63` |
| `--gingC` | `rgba(196,98,45,.45)` | `rgba(35,33,30,.6)` | `rgba(124,150,111,.5)` | `rgba(63,95,122,.42)` |
| `--gingB` | `#FBF8F1` | `#A8392B` (buffalo check) | `#FBF8F1` | `#FBF8F1` |

Season from month: Dec–Feb winter, Mar–May spring, Jun–Aug summer, Sep–Nov fall. Transitions: `background .4s`.

### Typography (Google Fonts)
- **Young Serif** 400 — headings. H1 hero `clamp(40px,5.4vw,62px)`/1.05; page H1 44px; section H2 34px; card titles 22–26px; prices 24px (cards), 44px (detail).
- **Caveat** 700 — handwritten eyebrows, 26–32px, line-height 1, color `var(--ink)`.
- **Figtree** 400/500/600/700 — UI + body. Body 15–18px, line-height 1.55–1.7. Small caps labels: 11–13px, 700, letter-spacing .08em, uppercase.
- Monospace (ui-monospace) 12–13px for image placeholder captions only.

### Shape & effects
- Radius: buttons/inputs 6px; cards 10px; large panels 12px; badges/tags 3px; chips 6px.
- Card hover: `translateY(-2px)` + `0 12px 30px rgba(80,60,30,.12)`, `.2s`.
- **Shiplap background**: `repeating-linear-gradient(180deg, transparent 0 63px, rgba(110,90,60,.12) 63px 64px)` over `var(--bg)`.
- **Gingham strip**: two linear-gradients (90deg and 180deg) of `var(--gingC)` 50%/transparent over `var(--gingB)`, `background-size: 10px 10px` (12px on recipe cards). Header strip has a 2px `#23211E` top border.
- **Arched hero photo**: `aspect-ratio:4/5; max-width:470px; border-radius:50% 50% 14px 14px / 40% 40% 14px 14px; outline:10px solid #FBF8F1; box-shadow:0 0 0 12px #23211E`.
- Status tag: `#FBF8F1` bg, 1px `#23211E` border, 11px/700 uppercase, .08em.
- Layout widths: content max 1200px (search 1400, checklists 960, hub 1100), 24px side padding. Grids use `repeat(auto-fit/auto-fill, minmax(min(100%, Npx), 1fr))` so everything reflows to mobile.

## Global elements
- **Season banner** (top, `var(--panel)` bg, 14px cream text): seasonal line + "See what's on near you →" (scrolls to Events on Towns page).
- **Sticky header** `#FBF8F1`: name (Young Serif 23px) + "REAL ESTATE ONE · SOUTHEAST MICHIGAN" (11px, .16em). Nav: Home, Find a home, Towns, Kitchen, To-dos, Saved (n), My Hub. Active item bg `var(--acc)`. Right: "Sign in with phone" outline button, or green dot + "Signed in · 1234". Gingham strip below.
- **Floating "Text Christina"** (fixed bottom-right, ink bg, 2px `var(--acc)` border): `sms:` link + "Usually replies within an hour".
- **Footer**: wood planks, 3 columns: contact; counties + Realcomp IDX disclaimer; Equal Housing + privacy note.
- **Toast** bottom-center, 3.2s.
- **Debug theme panel** (bottom-left, black, monospace): Auto / Spring / Summer / Fall / Winter override. **Only render when `?debug` is in the URL or an env flag is set** (prototype shows it by default via a tweak).

## Seasonal particle effect (`SeasonalFx`)
- Modes: `off` | `subtle` (default: 14 particles, absolutely positioned behind the home hero, `z-index:-1` in an `isolation:isolate` section) | `festive` (26 particles, fixed full-page layer, z 25, pointer-events none).
- Per season: fall leaves (`border-radius:0 100% 0 100%`, rust/gold/brown, 12–20px), winter snow (white circles 5–11px with `0 0 0 1px rgba(140,165,185,.45)` ring), spring petals (`60% 0 60% 0`, pinks), summer petals (golds).
- Each particle: outer span `animation: chFall {11–22s} linear {negative random delay} infinite` (translateY −40px → 110vh); inner span `chSway {3–6s} ease-in-out infinite` (±16px X, ±30° rotate). Opacity .6–.9 (subtle) / .45–.75 (festive). Deterministic pseudo-random positions.
- **Hide entirely under `prefers-reduced-motion: reduce`.**

## Screens

### Home
1. Hero (2-col, wraps): Caveat seasonal eyebrow; H1 "Come on in. Let's find *your place* in Southeast Michigan." (highlight = bottom 38% `var(--acc)`); intro; search bar (input + "Search homes"; Enter navigates); "Places I love:" chips (Detroit, Royal Oak, Ann Arbor, Plymouth, Grosse Pointe, Brighton, Rochester, Ferndale, Macomb County) → search prefilled. Right: arched porch photo (caption changes by season) + floating "Questions? Just text me." phone card.
2. "Just listed / Fresh on the market" — 3 ListingCards.
3. "Around here this {season}" — 3 events.
4. Recipe teaser (gingham top) + "Your to-do list" panel (`var(--panel)`) with Buy/Sell/Move progress bars.
5. "Curious what your home is worth?" (`var(--accSoft)`) address + mobile → confirmation; and **The Porch Report** monthly newsletter signup (email or phone).
6. "Stories from my clients" — 3 photo + quote cards.
7. Welcome video (framed 16:10, round play button) + "Hi, I'm Christina" bio + Text/Email buttons.

### Find a home
Title + count ("updated from the MLS every 15 minutes") + "Text me new matches" (saves search; requires phone sign-in). Filters: text query (matches area/city/address/county), max price, beds, type, county. **Commute bar**: within 20/30/45 min of Downtown Detroit / Downtown Ann Arbor / Troy / DTW Airport (prototype estimates by distance — implement with a real drive-time API, e.g. Mapbox Matrix or Google Distance Matrix, cached per listing). Cards show "28 min to Downtown Detroit" chip when commute is active. Right: sticky map with price pins (Mapbox/Google). Empty state with "Clear filters".

### Listing detail
Back link; photo mosaic (2fr/1fr, 3 tiles); status tag, price, address, "City, MI · County"; Save button; 4-stat strip (beds/baths/sqft/built); description; "Christina's notes" bullets; **Drive times** to the 4 destinations; **My tour notes** (4 categories × 5 tap-dots, textarea; average score shown; saved locally, shared with partner if invited); IDX disclaimer. Sticky sidebar: tour request (next 5 days picker → "Request a tour" → phone sign-in if needed → confirmation) and estimated payment (20% down, 30-yr 6.5%, +2.2%/yr taxes&ins, +$120). Bottom: **Homes like this one** (3 nearest by price).

### Towns
Grid of 8 town cards (Detroit, Royal Oak, Ann Arbor, Plymouth, Grosse Pointe, Brighton, Rochester, Ferndale) with county + live listing count. Town detail: county, name, tagline, description, "Search homes in X", photo, 4 fact cards (Schools, Typical range, Getting around, My favorite stop), that town's listings. Below: **Events this season** (4 per season) + **My go-to local pros** (8 categories; business names TBD by Christina). Price ranges are sample values.

### Kitchen
Season tabs (Fall/Winter/Spring/Summer; defaults to current). Recipe accordion cards (gingham band, photo, time/serves, note) → ingredients + numbered steps + "Print recipe card". Sticky chalkboard: seasonal chores checklist + link to pros.

### To-dos (Checklists)
Tabs: I'm buying / I'm selling / **Moving day**. Progress bar. Vertical timeline of phases (numbered circles, filled `var(--acc)` when complete), each with check-off items (text + tip). Moving day includes utilities (DTE / Consumers Energy, water, internet, trash), USPS + Michigan SOS address changes, and **printable box labels**. "Print this list" + "Stuck on a step? Text me". Print CSS hides header/footer/FAB.

### Saved
No-password sign-in prompt; **Shopping with someone?** → generates share link (partner sees hearts, notes, adds own take). Hearted homes: ListingCard + Love it / Maybe / Pass, partner's take ("You both love this one"), tour score, **price-drop texts on/off**. Saved searches list (View / Remove, live match count).

### My Hub (signed-in clients)
Locked state: explanation + "Sign in with phone" + "Preview with sample data". Unlocked:
- **Deal tracker**: address, days until closing, progress bar, 7-step timeline (Offer accepted → Earnest money → Inspection → Appraisal → Loan approval → Final walk-through → Closing) with dates/status, "What's next" panel, team contacts, wire-fraud warning.
- **Home value tracker**: enter address → estimate, % change, 12-month bar chart.
- **Home-iversary** note card; "Thinking of selling?" → seller list.

## Auth & Data (Supabase)
- **No account required** for hearts, checklists, tour notes, chore checks: store in `localStorage` (prototype key `chuntHome_v2`: `favs, searches, checks, notes, takes, alertsOff, partner, homeAddr`).
- **Phone OTP sign-in** (Supabase Auth phone provider + Twilio): triggered by "Text me new matches", "Request a tour", "Sync with my phone", My Hub. On sign-in, merge localStorage into Supabase tables and run the pending action.
- Suggested tables: `favorites(user_id, listing_id, take, alerts_on)`, `saved_searches(user_id, filters jsonb)`, `tour_notes(user_id, listing_id, ratings jsonb, text)`, `checklist_progress(user_id, key, done)`, `partners(owner_id, partner_id, share_code)`, `deals(user_id, address, steps jsonb)`, `owned_homes(user_id, address, anniversary_date)`, `leads(type, address, contact)` for home-worth + Porch Report + tours.
- **Alerts**: Supabase cron / Edge Function compares new IDX listings to `saved_searches` and price changes to `favorites`, sends SMS via Twilio. Anniversary texts yearly on `anniversary_date`.
- **IDX**: Realcomp MLS via an IDX/RESO Web API vendor; map to the `LISTINGS` shape (`id, address, area, city, county, price, beds, baths, sqft, type, year, status, lat/lng, photos[], desc`). Show the Realcomp disclaimer on search + detail + footer.
- Respect SMS consent: "Reply STOP anytime" copy on every phone capture.

## Assets
None bundled. All images are placeholders to replace: hero porch photo (one per season), headshot/welcome video, listing photos (from IDX), recipe dish photos, town photos, client story photos. Fonts from Google Fonts. No icons beyond text glyphs (♥ ♡ ✓ ▶ ▲).

## Files
- `Christina Hunt Homes - Seasonal.dc.html` — full prototype (all screens, logic, sample data).
- `Listing Card.dc.html` — reusable listing card.
- `support.js` — runtime needed only to open the prototype in a browser.
- `screenshots/` — reference captures of each screen (01–16, fall theme) and the winter/spring/summer themes (17–19). Captured at a narrow ~920px viewport, so the nav wraps to two lines; the bottom-left debug panel and bottom-right "Text Christina" button appear in every shot.
