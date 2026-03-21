# 🌌 Interactive 3D Developer Portfolio

A next-generation, immersive 3D developer portfolio built with React, Three.js, React Three Fiber, and Framer Motion. Designed to offer a premium, highly interactive user experience through cinematic 3D glass physics, dynamic spatial rendering, and buttery-smooth spatial data visualization.

---

## ⚡ Key Features

*   **Cinematic 3D Neural Interface**: A continuously revolving icosahedron sphere showcasing dynamic point lighting, deep metallic standard materials, and dual wireframe accents.
*   **Spatial Glass Nodes (Anchor Expansion)**: Content sections (`Projects`, `Experience`, etc.) are rendered natively as internal 3D image arrays nested inside the sphere. 
*   **Physical Hover Physics**: Utilizing complex materials (`MeshPhysicalMaterial`), hovering triggers real-time light refraction, blur transmission, and fluidly scaled presence.
*   **Detachment Animations**: Elements seamlessly break orbit on click, independently flying via `gsap`/`lerp` physics toward the camera to physically act as the background anchor for the user interface.
*   **Premium Web Aesthetics**: Heavily integrates Glassmorphism, smooth scrolling (`Lenis`), responsive layouts (`Tailwind`), and hyper-smooth easing (`cubic-bezier(0.22, 1, 0.36, 1)`).

---

## 🛠 Tech Stack

*   **Logic & UI**: `React`, `Vite`
*   **3D Engine**: `Three.js`, `@react-three/fiber`, `@react-three/drei`
*   **Animations**: `Framer Motion`, Custom `useFrame` Lerping Math
*   **UI Components**: `react-icons`, `react-vertical-timeline-component`, `react-tilt`

---

## 🚀 Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production** 
   ```bash
   npm run build
   ```

---

## Supabase Setup

1. Create a local env file named `.env.local` and copy values from `.env.example`.

2. Open `.env.local` and set your Supabase values:
   - `SUPABASE_URL=https://yjvcjotugjmvdrzpdhkx.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY=your_service_role_key`
   - `UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url`
   - `UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token`

3. Contact form now submits to server endpoint:
   - `api/contact.js`
   - Includes validation, honeypot bot check, and IP-based rate limiting.

4. Run SQL migrations in Supabase SQL Editor (in order):
   - `supabase/migrations/20260320_001_create_contact_messages.sql`
   - `supabase/migrations/20260320_002_contact_messages_rls_and_view.sql`

   If you prefer one-shot SQL, use:
   ```sql
   create table if not exists public.contact_messages (
     id bigint generated always as identity primary key,
     name text not null,
     email text not null,
     message text not null,
     source text,
     ip text,
     created_at timestamptz not null default now()
   );
   ```

5. If you enable Row Level Security on this table, add an insert policy:
   ```sql
   alter table public.contact_messages enable row level security;

   create policy "Allow anonymous contact inserts"
   on public.contact_messages
   for insert
   to anon
   with check (true);
   ```

6. In Vercel, add these environment variables before redeploy:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

7. Query the recent dashboard-ready view:
   ```sql
   select * from public.recent_contact_messages;
   ```

The project now stores contact submissions through a server route so secrets stay off the browser, with Redis-backed rate limiting and fallback in-memory limiting if Redis is unavailable.

---

## 🧭 Contribution and Git Workflow

This repository includes a full, team-ready version control workflow.

- Contribution standards: see [CONTRIBUTING.md](CONTRIBUTING.md)
- Pull request checklist: see [.github/pull_request_template.md](.github/pull_request_template.md)
- Commit message template: see [.gitmessage.txt](.gitmessage.txt)

Set up the commit template once per local clone:

```bash
git config commit.template .gitmessage.txt
```

Recommended daily Git cycle:

```bash
git pull --rebase
git add <changed-files>
git commit
git push
```
