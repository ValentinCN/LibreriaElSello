create table if not exists categories (
  id bigint generated always as identity primary key,
  slug text unique not null,
  nombre text not null,
  orden int default 0
);

create table if not exists products (
  id bigint generated always as identity primary key,
  nombre text not null,
  descripcion text,
  categoria_id bigint references categories(id) on delete set null,
  precio numeric,
  imagen_url text,
  activo boolean not null default true,
  destacado boolean default false,
  orden int default 0,
  created_at timestamptz default now()
);

alter table categories enable row level security;
alter table products enable row level security;

create policy "public read categories" on categories for select using (true);
create policy "public read active products" on products for select using (activo = true);
