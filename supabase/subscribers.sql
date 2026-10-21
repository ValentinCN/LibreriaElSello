-- Migration: newsletter opt-in subscribers
create table if not exists subscribers (
  id         uuid        primary key default gen_random_uuid(),
  email      text        unique not null,
  consent    boolean     not null default false,
  consent_at timestamptz,
  source     text,
  status     text        not null default 'active',
  created_at timestamptz not null default now()
);

alter table subscribers enable row level security;

-- Anyone can subscribe (insert only — no read for anon)
create policy "anon insert subscribers" on subscribers
  for insert to anon with check (true);

-- Admin dashboard can read the list
create policy "authenticated read subscribers" on subscribers
  for select to authenticated using (true);
