# WEREWOLF ALPHA Admin Dashboard

Private admin web dashboard for the WEREWOLF ALPHA rider community. This app is separate from the public website and separate from the rider mobile app.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Supabase Auth
- Supabase Database
- Supabase Storage
- Zod validation
- Vercel-ready project structure

## Overview

This dashboard is designed for owner/admin/staff only. It supports:

- secure admin login
- role-guarded dashboard access
- rider creation and editing
- activation/deactivation of riders
- announcement creation and moderation
- chat moderation
- basic operations metrics

## Project Structure

```text
app/
  login/page.tsx
  dashboard/layout.tsx
  dashboard/page.tsx
  dashboard/riders/page.tsx
  dashboard/riders/new/page.tsx
  dashboard/riders/[id]/page.tsx
  dashboard/announcements/page.tsx
  dashboard/moderation/page.tsx
  dashboard/settings/page.tsx
  api/
    auth/login/route.ts
    auth/logout/route.ts
    riders/route.ts
    riders/[id]/route.ts
    announcements/route.ts
    moderation/route.ts
components/
lib/
types/
supabase/
```

## Install

```bash
npm install
```

## Environment

Create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Supabase Setup

Use the same Supabase project as the rider mobile app.

Required tables:

- `profiles`
- `announcements`
- `chat_messages`

This dashboard assumes the `profiles` table contains:

- `username`
- `login_email`
- `full_name`
- `role`
- `bike_name`
- `bike_model`
- `membership_status`

## Rider Creation Flow

The rider creation route uses the service role key only on the server:

1. admin submits the create rider form
2. server creates the Supabase auth user
3. server writes the matching `profiles` row
4. dashboard redirects back to the riders list

The service role key is never exposed in browser code.

## Announcements

- create announcement
- pin/unpin
- delete

## Moderation

- review recent chat records
- filter by type
- soft delete messages
- optionally delete linked storage media

## Local Development

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

## Deploy to Vercel

1. push this project to GitHub
2. import the repo into Vercel
3. add the three Supabase environment variables
4. deploy

## Security Notes

- middleware blocks unauthenticated access to `/dashboard`
- middleware checks for admin role and active membership
- admin-only server routes keep service-role work on the server
- no public signup is included
- rider accounts are not allowed into this panel

## Future Upgrades

- audit logs
- richer password reset workflow
- moderation notes
- storage browser
- event operations
- merch administration
