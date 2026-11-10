create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  whatsapp text not null check (char_length(whatsapp) between 7 and 20),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  business_name text not null check (char_length(business_name) between 1 and 160),
  offer text not null,
  package_interest text not null,
  description text not null check (char_length(description) between 5 and 2000),
  design_reference text default '',
  consent boolean not null check (consent),
  source text,
  user_agent text
);

alter table public.enquiries enable row level security;

-- Anonymous visitors may INSERT only; nothing can be read back with the public key.
create policy "anon can insert enquiries" on public.enquiries
  for insert to anon with check (true);
