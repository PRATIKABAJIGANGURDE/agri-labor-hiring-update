-- Create users table
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text check (role in ('farmer', 'worker')) not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS (Row Level Security)
alter table public.users enable row level security;

-- Create profiles table for additional user information
create table if not exists public.profiles (
  id uuid references public.users on delete cascade not null primary key,
  user_id uuid references public.users on delete cascade not null,
  bio text,
  location text,
  skills text[],
  experience text,
  hourly_rate decimal,
  availability boolean default true,
  phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create secure policies
create policy "Users can view their own profile"
  on public.users
  for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users
  for update
  using (auth.uid() = id);

create policy "Profiles are viewable by owner"
  on public.profiles
  for select
  using (auth.uid() = user_id);

create policy "Profiles are updatable by owner"
  on public.profiles
  for update
  using (auth.uid() = user_id);

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
