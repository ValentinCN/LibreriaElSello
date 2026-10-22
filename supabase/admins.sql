-- Migration: tabla admins + función is_admin() (Fase 3A — seguridad backend)
-- Correr a mano en el SQL Editor de Supabase (igual que los anteriores).

create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
-- Sin políticas para anon ni authenticated a propósito: nadie lee/escribe esta
-- tabla vía PostgREST. Solo is_admin() (security definer) la consulta.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

revoke execute on function public.is_admin() from public;
revoke execute on function public.is_admin() from anon;
grant execute on function public.is_admin() to authenticated;

-- Reemplazá MI_EMAIL por tu email real y descomentá para darte de alta como admin:
-- insert into public.admins (user_id) select id from auth.users where email = 'MI_EMAIL';
