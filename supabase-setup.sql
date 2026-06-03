-- =====================================================================
-- KAPSALON K&S — VOLLEDIGE DATABASE SETUP
-- Voer dit in één keer uit in de Supabase SQL Editor (nieuw project).
-- Maakt de tabellen, RLS-policies en wat voorbeeld-services aan.
-- =====================================================================

-- ---------- 1. SERVICES ----------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  duration_minutes int not null default 30,
  price_cents int not null default 0,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- 2. BOOKINGS ----------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  status text not null default 'pending'
    check (status in ('confirmed','pending','cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists bookings_start_at_idx on public.bookings (start_at);

-- =====================================================================
-- 3. ROW LEVEL SECURITY
-- =====================================================================
alter table public.services enable row level security;
alter table public.bookings enable row level security;

-- --- SERVICES: iedereen mag actieve services lezen ---
drop policy if exists "services_public_read" on public.services;
create policy "services_public_read"
  on public.services for select
  to anon, authenticated
  using (true);

-- --- SERVICES: alleen ingelogde eigenaar mag wijzigen ---
drop policy if exists "services_owner_write" on public.services;
create policy "services_owner_write"
  on public.services for all
  to authenticated
  using (true) with check (true);

-- --- BOOKINGS: publiek mag een reservering aanmaken (online boeken) ---
drop policy if exists "bookings_public_insert" on public.bookings;
create policy "bookings_public_insert"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

-- --- BOOKINGS: publiek mag lezen (nodig om bezette tijden te tonen) ---
drop policy if exists "bookings_public_read" on public.bookings;
create policy "bookings_public_read"
  on public.bookings for select
  to anon
  using (true);

-- --- BOOKINGS: eigenaar mag alles lezen/wijzigen (dashboard) ---
drop policy if exists "bookings_owner_all" on public.bookings;
create policy "bookings_owner_all"
  on public.bookings for all
  to authenticated
  using (true) with check (true);

-- =====================================================================
-- 4. VOORBEELD-SERVICES (pas namen/prijzen aan naar wens van K&S)
-- =====================================================================
insert into public.services (name, duration_minutes, price_cents, sort_order) values
  ('Knippen heren',          30, 2500, 1),
  ('Knippen dames',          45, 3500, 2),
  ('Knippen kinderen',       20, 1800, 3),
  ('Baard trimmen',          20, 1500, 4),
  ('Knippen + baard',        45, 3500, 5),
  ('Wassen, knippen, föhnen', 60, 4500, 6)
on conflict do nothing;

-- =====================================================================
-- 5. EIGENAAR-ACCOUNT
-- Maak je login aan via: Authentication → Users → "Add user".
-- BELANGRIJK: vink "Auto Confirm User" aan, anders kun je niet inloggen.
-- =====================================================================
