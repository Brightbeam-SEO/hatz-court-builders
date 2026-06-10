# Sanity live setup (Zen Day Spa / Vercel)

The site and homepage can already be deployed on Vercel; this doc ties **Sanity Studio** content to what visitors see. Pick **one** update strategy, or combine them if you know why you need both.

---

## 1. Environment variables (Vercel + local)

Set these in **Vercel → Project → Settings → Environment Variables** (Production at minimum), and mirror them in **`.env.local`** for local Next + Studio.

| Variable | Notes |
|----------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | From [sanity.io/manage](https://www.sanity.io/manage) → your project. Required: without it the app does not load Sanity (`getSanityClient()` stays unset). |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | e.g. `2024-01-01` unless your project uses another pinned version. |
| `SANITY_REVALIDATE_SECRET` | Long random string. **Only needed** if you use **On-demand revalidation** (section A below). |

After changing any `NEXT_PUBLIC_*` value, **redeploy** the Vercel project.

**Optional:** `SANITY_STRICT_MODE=true` — fail builds/requests if Sanity is unavailable (default is a softer fallback).

---

## 2. Sanity API: CORS

In Sanity Manage → **API** → **CORS origins**, add:

- `http://localhost:3000` (Next.js dev)
- `http://localhost:3333` (local Studio: `npm run studio`)
- `https://<your-vercel-host>.vercel.app` and your **custom domain** (if any)

---

## 3. Studio (edit content)

From the repo root:

```bash
npm run studio
```

Open `http://localhost:3333`, sign in if prompted. Your desk lists **Site settings**, **Home page**, **Contact Page**, **FAQ Page**, etc. — publish changes there as usual.

---

## A. On-demand revalidation (recommended: fast, no full rebuild)

Uses the built-in route: `src/app/api/revalidate/sanity/route.ts`. Sanity calls your **Next** URL with a secret; Next **revalidates** cached paths (no full Vercel build).

1. In Sanity Manage → **API** → **Webhooks** → **Create webhook**.
2. **URL:** `https://<your-production-domain>/api/revalidate/sanity?secret=<SANITY_REVALIDATE_SECRET>`  
   Use the **same** `SANITY_REVALIDATE_SECRET` as in Vercel.
3. **HTTP method:** `POST`
4. **Triggers:** create, update, delete (as you prefer).
5. **Filter / projection:**  
   - Minimal example from an older setup: filter `_type == "homePage"` and projection `{ "_type": _type }` — enough to refresh `/`.  
   - The route also handles **`blogPost`** and **`locationPage`** slugs. Easiest approach: **no GROQ filter** (or a filter that includes every `_type` you edit in Studio) so all relevant publishes trigger revalidation.
6. Save, then publish a small change in Studio and confirm the live site updates (you may need one refresh).

---

## B. Full redeploy on every Sanity change (Vercel Deploy Hook)

Use this if you want **every** CMS publish to start a **new Vercel deployment** (full build). Slower and uses build minutes, but simple and guarantees a clean build.

### B1. Create a Deploy Hook (Vercel)

1. Vercel → your project (**zen-day-spa**) → **Settings** → **Git**.
2. Open **Deploy Hooks**.
3. **Name:** e.g. `Sanity_content_deploy` (any label you recognize).
4. **Branch:** `main` (or whichever branch Production tracks).
5. Click **Create Hook**, then **Copy** the generated URL (`https://api.vercel.com/v1/integrations/deploy/...`).

### B2. Create a webhook (Sanity)

1. [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **Webhooks** → **Create webhook**.
2. **Name:** match the hook name above (optional, for clarity).
3. **URL:** paste the **Vercel Deploy Hook** URL from B1.
4. **Triggers:** enable **create**, **update**, and **delete** (or the subset you want).
5. **HTTP method:** `POST` (Vercel deploy hooks expect POST).
6. Save.

Publishing in Studio will queue a Vercel deployment; check **Deployments** in Vercel to confirm.

**Note:** You do **not** put `SANITY_REVALIDATE_SECRET` on this URL — the deploy hook URL already contains Vercel’s trigger token. You can use **only B**, **only A**, or **both**; using both fires a revalidation **and** a deploy on each matching webhook, which is usually redundant—pick **A** for day-to-day CMS edits unless you specifically need full rebuilds.

---

## 4. Verify end-to-end

1. Open the **live** site (e.g. `https://zen-day-spa.vercel.app` or your domain).
2. In Studio, change visible copy on **Home page** (or another wired document) and **Publish**.
3. If you use **A:** refresh the affected page once (or wait for CDN). If you use **B:** wait for the new deployment to finish, then hard-refresh.

---

## Reference: what the revalidate route does

`POST /api/revalidate/sanity` (with correct `?secret=`) inspects the webhook JSON and calls `revalidatePath` for:

- `/` when `_type` is missing or `homePage`
- `/blog` and `/blog/[slug]` for `blogPost`
- `/{slug}` for `locationPage`

So your Sanity webhook payload should include `_type` (Sanity’s default webhook body usually does).

---

## Notes

- If Sanity is unreachable, the app can fall back to local static data unless `SANITY_STRICT_MODE=true`.
- **Seed scripts** (`npm run seed:sanity-home`, etc.) need a logged-in Sanity CLI user; see `package.json` scripts.
