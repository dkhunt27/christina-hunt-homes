-- Christina Hunt Homes: client data synced after phone sign-in, plus anonymous leads.
-- Visitors without an account keep the same data in localStorage (key `chuntHome_v2`);
-- src/lib/user-state-sync.ts merges it into these tables on sign-in.

-- Hearts --------------------------------------------------------------------
create table public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  listing_id text not null,
  take text check (take in ('Love it', 'Maybe', 'Pass')),
  alerts_on boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

-- Saved searches ("Text me new matches") -------------------------------------
-- `id` is text because ids are minted on the device before the visitor signs in.
create table public.saved_searches (
  user_id uuid not null references auth.users (id) on delete cascade,
  id text not null,
  name text not null,
  filters jsonb not null,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

-- Tour notes: 4 categories rated 1-5 plus free text --------------------------
create table public.tour_notes (
  user_id uuid not null references auth.users (id) on delete cascade,
  listing_id text not null,
  ratings jsonb not null default '{}'::jsonb,
  text text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

-- Checklist and chore check-offs ---------------------------------------------
create table public.checklist_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  key text not null,
  done boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

-- Partner sharing ------------------------------------------------------------
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  partner_id uuid references auth.users (id) on delete set null,
  share_code text not null unique,
  created_at timestamptz not null default now(),
  unique (owner_id)
);

-- My Hub: deal tracker (entered by Christina) --------------------------------
create table public.deals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  address text not null,
  close_date date,
  steps jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- My Hub: home value tracker + home-iversary texts ---------------------------
create table public.owned_homes (
  user_id uuid primary key references auth.users (id) on delete cascade,
  address text not null,
  anniversary_date date,
  created_at timestamptz not null default now()
);

-- Leads: home-worth requests, Porch Report signups, tour requests ------------
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('home_worth', 'porch_report', 'tour')),
  contact text not null,
  address text,
  listing_id text,
  tour_date date,
  user_id uuid default auth.uid() references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Row level security ---------------------------------------------------------
alter table public.favorites enable row level security;
alter table public.saved_searches enable row level security;
alter table public.tour_notes enable row level security;
alter table public.checklist_progress enable row level security;
alter table public.partners enable row level security;
alter table public.deals enable row level security;
alter table public.owned_homes enable row level security;
alter table public.leads enable row level security;

create policy "own favorites" on public.favorites
  for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "own saved searches" on public.saved_searches
  for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "own tour notes" on public.tour_notes
  for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "own checklist progress" on public.checklist_progress
  for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "own partner links" on public.partners
  for all to authenticated
  using ((select auth.uid()) in (owner_id, partner_id))
  with check ((select auth.uid()) = owner_id);

-- Clients read their own deal; Christina edits deals with the service role.
create policy "read own deals" on public.deals
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "own home" on public.owned_homes
  for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Anyone can leave a lead; nobody reads leads through the API.
create policy "anyone can create leads" on public.leads
  for insert to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));

create index saved_searches_user_idx on public.saved_searches (user_id);
create index deals_user_idx on public.deals (user_id);
create index leads_created_idx on public.leads (created_at desc);
