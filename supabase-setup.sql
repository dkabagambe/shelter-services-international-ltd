-- ============================================================
-- Kenya Export Emporium — Supabase Database Setup
-- Run this in your Supabase project: Dashboard → SQL Editor
-- ============================================================

-- ── 1. Profiles (extends Supabase auth.users) ─────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  full_name  text not null default '',
  role       text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── 2. Products ────────────────────────────────────────────────
create table if not exists public.products (
  id        uuid primary key default gen_random_uuid(),
  name      text not null,
  image     text not null default '',
  price     numeric(10,2) not null default 0,
  unit      text not null default 'kg',
  tagline   text not null default '',
  min_order text not null default '',
  badge     text,
  category  text not null check (category in ('fruits', 'vegetables', 'meat')),
  rating    numeric(3,1) not null default 4.8,
  reviews   integer not null default 0,
  in_stock  boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── 3. Orders ──────────────────────────────────────────────────
create table if not exists public.orders (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references auth.users(id) on delete set null,
  customer_name     text not null,
  customer_email    text not null,
  customer_phone    text not null,
  customer_company  text,
  country           text not null,
  city              text,
  notes             text,
  items             jsonb not null default '[]',
  total_price       numeric(10,2) not null default 0,
  total_qty         numeric(10,2) not null default 0,
  status            text not null default 'pending'
                    check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  created_at        timestamptz not null default now()
);

-- ── 4. Row-Level Security ──────────────────────────────────────

-- Profiles: users can read/update only their own row; admins can read all
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Products: anyone can read; only admins can write
alter table public.products enable row level security;

create policy "Anyone can view products"
  on public.products for select
  using (true);

create policy "Admins can insert products"
  on public.products for insert
  with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update products"
  on public.products for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete products"
  on public.products for delete
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Orders: customers see only their own; admins see all
alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Admins can view all orders"
  on public.orders for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Anyone can place an order"
  on public.orders for insert
  with check (true);

create policy "Admins can update orders"
  on public.orders for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete orders"
  on public.orders for delete
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── 5. Storage bucket for product images ──────────────────────
-- Run this separately in Supabase Dashboard → Storage → New Bucket
-- Bucket name: product-images  (public: true)
-- Or use the SQL below if your Supabase project supports it:
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Admins can upload product images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images' and
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete product images"
  on storage.objects for delete
  using (
    bucket_id = 'product-images' and
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── 6. Make yourself admin ─────────────────────────────────────
-- After signing up in the app, run this with your email:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your@email.com';
