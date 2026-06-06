-- =============================================================================
-- The Daily Grid — Supabase setup. Run once in the Supabase SQL Editor.
-- =============================================================================

create table if not exists public.crossword_progress (
  user_id     text        not null,
  puzzle_date date        not null,
  data        jsonb       not null default '{}'::jsonb,  -- { grid, solved, ts }
  updated_at  timestamptz not null default now(),
  primary key (user_id, puzzle_date)
);

alter table public.crossword_progress enable row level security;

-- ---------------------------------------------------------------------------
-- RECOMMENDED: logged-in users (Supabase Auth). Each user sees only their rows.
-- The page sends auth.uid() (a uuid) as text, which matches user_id::text.
-- ---------------------------------------------------------------------------
create policy "own rows - select"
  on public.crossword_progress for select
  using (auth.uid()::text = user_id);

create policy "own rows - upsert insert"
  on public.crossword_progress for insert
  with check (auth.uid()::text = user_id);

create policy "own rows - upsert update"
  on public.crossword_progress for update
  using (auth.uid()::text = user_id)
  with check (auth.uid()::text = user_id);

-- ---------------------------------------------------------------------------
-- OPTIONAL: allow ANONYMOUS visitors (no login) to save progress under a
-- random browser id. Less strict — anyone could read another anon id's row if
-- they knew it. Uncomment ONLY if you want guest progress without auth, and
-- comment out the three policies above (they'd block the anon role).
-- ---------------------------------------------------------------------------
-- create policy "anon read/write" on public.crossword_progress
--   for all to anon using (true) with check (true);
