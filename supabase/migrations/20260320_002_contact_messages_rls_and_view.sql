alter table public.contact_messages enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'contact_messages'
      and policyname = 'Allow anonymous contact inserts'
  ) then
    create policy "Allow anonymous contact inserts"
    on public.contact_messages
    for insert
    to anon
    with check (true);
  end if;
end
$$;

create or replace view public.recent_contact_messages as
select
  id,
  name,
  email,
  message,
  source,
  ip,
  created_at
from public.contact_messages
order by created_at desc
limit 100;
