# B-Side Website — Agent Guide

This is the public frontend for [b-side.ms](https://b-side.ms). It is a Next.js **Pages Router** app that renders content from a separate Payload CMS.

Read this file before changing routing, CMS fetching, env vars, Docker, or anything that touches the sister repo.

Planned work lives in [ROADMAP.md](./ROADMAP.md). Implement it in small PRs, not as one change.

Sister CMS repo: [bside-ms/bside_payload](https://github.com/bside-ms/bside_payload). That repo has its own `AGENTS.md`. Treat the two as one system.

## What lives where

| Piece     | Repo / host                                                         | Public URL                 | Runtime                                           |
| --------- | ------------------------------------------------------------------- | -------------------------- | ------------------------------------------------- |
| Website   | this repo                                                           | `https://b-side.ms`        | Next.js 14 Pages Router, port **3001**            |
| CMS       | [bside-ms/bside_payload](https://github.com/bside-ms/bside_payload) | `https://cms.b-side.ms`    | Payload 3 on Next.js 15 App Router, port **3000** |
| MongoDB   | server only (not in this repo)                                      | `127.0.0.1:27017`          | `mongo:4.4.6`                                     |
| Login     | external Keycloak                                                   | `https://login.b-side.ms`  | used by CMS admin, not by this website            |
| Analytics | Matomo                                                              | `https://lernen.b-side.ms` | site id `4` in production                         |
| Mail      | `mail.b-side.ms`                                                    | SMTP 465                   | contact form                                      |

The website never talks to Mongo. It only talks to the CMS over HTTP (`PAYLOAD_URL` / `NEXT_PUBLIC_PAYLOAD_URL`).

## Local development

Package manager is **npm** (this repo). The CMS uses **Yarn 4**. Do not mix them.

```bash
cp .env.skel .env
# point PAYLOAD_URL at a running CMS, usually http://localhost:3000
npm install
npm run dev          # http://localhost:3001
```

Assume sibling clones (`bside_website` next to `bside_payload`). The CMS runs on port 3000, this app on 3001. Pages 404 when the CMS is down. On an empty local database `/kultur`, `/quartier` and `/bside/kollektiv` also 404, because they use hardcoded production Mongo ids.

CMS admin login goes through Keycloak (`CLIENT_SECRET`). Without it there is no admin UI locally.

Set the same `REVALIDATION_KEY` in the CMS `.env` and here (`.env.skel` has a matching example value), otherwise publish in the CMS does not refresh this app.

Useful scripts: `npm run lint`, `npm run prettier`, `npm run tsc`.

UI components live in `components/ui` (shadcn). Add new ones with `npx shadcn add <name>`, then fix formatting and the `cn` import.

For a full local stack, start Mongo + CMS from [bside-ms/bside_payload](https://github.com/bside-ms/bside_payload) first, then this app.

## How content reaches the page

1. Editors change content in Payload admin (`/admin` on the CMS).
2. This app fetches Payload REST at **build time** and again on **ISR revalidate**.
3. Almost every page uses `getStaticProps` with `revalidate: 60` (404 and `/kontakt` use `300`). That is only the fallback.
4. **On-demand revalidation:** on publish the CMS calls `POST /api/revalidate` (`pages/api/revalidate.ts`) with the header `x-revalidation-key`. The value must equal `REVALIDATION_KEY` here and in the CMS `.env`. The website always revalidates the core paths (`lib/revalidate/corePaths.ts`, DE and `/en`) and the extra `paths` the CMS sends (page breadcrumb URL, event/news slug, circle name). Draft-only saves are skipped. The CMS logs a line `[revalidateWebsite]` when the website answers with an error. A key mismatch gives `401` and the site silently falls back to 60s ISR, so check the CMS log first. `NEXT_PRIVATE_REVALIDATION_KEY` is a dead leftover.
5. Live Preview uses `@payloadcms/live-preview-react` and `NEXT_PUBLIC_PAYLOAD_URL`. Drafts are only fetched when preview mode sends a real API key.

Server-side fetch helper: `lib/payload/getPayloadResponse.ts`.

- Production reads: `Authorization: ${PAYLOAD_API_COLLECTION} API-Key none` plus public `isUserOrPublished` on the CMS. Published docs are readable without a real key.
- Preview / drafts: same header with the real `PAYLOAD_API_KEY`. Production `PAYLOAD_API_COLLECTION` is the slug `api-users`. The local `.env.skel` value `'Api User'` is the label, not the slug. Prefer `api-users`.
- Client-side POSTs (contact form archive, 404 logger) go through `lib/payload/createPayloadEntry.ts` to `NEXT_PUBLIC_PAYLOAD_URL`. Those CMS collections allow public `create`.

`types/payload/payload-types.ts` is a **manually copied** Payload generate output. That is the current official workflow, even if it is awkward. Source of truth is [bside-ms/bside_payload](https://github.com/bside-ms/bside_payload) (`yarn generate:types`). After a CMS schema change, regenerate there and copy the file here in the same change set. Do not hand-edit the generated file. Do not invent a shared package unless someone explicitly wants that migration.

## Content model → routes

CMS collections / globals and the pages that render them:

| CMS                                                  | Website route                                          | Notes                                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Global `start-page` + Page `slug=home` + latest News | `/`                                                    | `pages/index.tsx`                                                                                   |
| Global `about-bside` + Page `slug=bside`             | `/bside`                                               | extra hardcoded house graphic                                                                       |
| Organisation `647e605b7054a955522b2471`              | `/bside/kollektiv`                                     | B-Side Kollektiv. ID is hardcoded                                                                   |
| Organisation `647e60a67054a955522b24ad`              | `/kultur`                                              | Kultur e.V. ID is hardcoded                                                                         |
| Organisation `647e60bd7054a955522b24cb`              | `/quartier`                                            | B-Side GmbH. ID is hardcoded                                                                        |
| Circles                                              | `/kreise/[slug]`                                       | slug = `kebabCase(name)`                                                                            |
| Circle URL aliases                                   | `/kultur/:slug`, `/quartier/:slug`, `/kollektiv/:slug` | Next rewrites to `/kreise/:slug`                                                                    |
| Events                                               | `/events`, `/events/[slug]`, `/events/history`         | slug = `{last4OfId}-{kebabCase(slug\|title)}`                                                       |
| News                                                 | `/news`, `/news/[slug]`, `/news/pages/[page]`          | same `{last4}-{kebab}` pattern                                                                      |
| Pages (nested docs)                                  | `/[...slug]`                                           | breadcrumbs URL; some slugs are reserved                                                            |
| Global `event-page` / `event-archive`                | events index / history                                 |                                                                                                     |
| Global `banner`                                      | header banner via `/api/banner`                        | dismiss state is localStorage keyed by `bannerId`                                                   |
| Redirects collection                                 | `middleware.ts`                                        | fetched at request time, cached for 60s. Static `/bio` and the IE redirect stay in `next.config.js` |
| `contact-forms`                                      | written by the website after mail send                 | admin-only read                                                                                     |
| `not-found-pages`                                    | written by `pages/404.tsx`                             | skipped on localhost                                                                                |

Reserved slugs that must **not** be handled by `pages/[...slug].tsx`: `bside`, `home`, `kultur`, `spenden`, `hansawerkstatt-spenden`, `festival-spenden`, `quartier`, `alles-auf-neu`. Those have dedicated files under `pages/`.

Hardcoded organisation IDs are production Mongo IDs. Do not invent new ones. If an organisation page is added, you need both a CMS org and a dedicated page (or a generic lookup). Changing an org id in Mongo without updating these files breaks `/kultur`, `/quartier`, `/bside/kollektiv`.

Circle public URLs use the organisation `shortName` as the first path segment (`/kultur/faltenrock`, `/quartier/b-side-cafe`, `/kollektiv/...`). The rewrite layer maps those back to `/kreise/:slug`. Canonical URLs in circle pages follow `/{shortName}/{kebabCase(name)}`.

## Blocks

CMS block slugs must stay in sync with `components/blocks/reusableLayout/ReusableBlocks.tsx`:

| CMS block slug   | Website component                                                 |
| ---------------- | ----------------------------------------------------------------- |
| `callToAction`   | `CallToActionBlock`                                               |
| `content`        | `ContentBlock`                                                    |
| `mediaBlock`     | `MediaBlock`                                                      |
| `mediaContent`   | `MediaContentBlock`                                               |
| `headlineBlock`  | `HeadlineBlock`                                                   |
| `circleOverview` | `CircleOverviewBlock` (needs `circles` prop from the page)        |
| `eventOverview`  | `EventsOverviewBlock` (needs `eventsOnPage` filter from the page) |
| `teaser`         | `TeaserBlock`                                                     |
| `slider`         | `SliderBlock`                                                     |

Adding a block is a **cross-repo** change: define it in the CMS, attach it to the right collections/globals, regenerate types, copy types here, add a renderer. Unknown `blockType` is ignored with a console warning.

Rich text is Slate, not Lexical. Serialiser: `components/blocks/richTextBlock/serializeRichTextToHtml.tsx`.

## Routing, i18n, images

- Locales: `de` (default) and `en`. `localeDetection` is off. German URLs have no prefix; English is `/en/...`.
- Images: Next `images.remotePatterns` allow `cms.b-side.ms` and `localhost`. Media files are served by the CMS. Production image host must stay `cms.b-side.ms` unless both Next config and Traefik change.
- `output: 'standalone'` is required for the Docker image.
- Traefik on the server also redirects hostnames (`www`, `cafe`, `faltenrock`, `bewegungsraum`, `meckermost`, `hansawerkstatt`, `support`) onto specific paths. Those redirects are **not** in this repo. They live in `/srv/docker/b-side.ms/website/docker-compose.yml` on the server.

## Website API routes (`pages/api`)

| Route                                            | Role                                                                                      |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `/api/health`                                    | liveness                                                                                  |
| `/api/revalidate`                                | on-demand ISR, called by the CMS. `POST` with `x-revalidation-key`                        |
| `/api/banner`                                    | proxies CMS banner global                                                                 |
| `/api/contact/submit`                            | Turnstile + nodemailer to `{reason}@b-side.ms`                                            |
| `/api/events/all`, `/api/events/categoryFilters` | event listing helpers                                                                     |
| `/api/ics`                                       | calendar download                                                                         |
| `/api/screenshot`                                | Puppeteer screenshot of allowlisted b-side URLs (Chrome is installed in the Docker image) |
| `/api/notify`                                    | extra Matomo hit (SSR site id = `MATOMO_SITE_ID + 1`)                                     |

`next-auth` is in `package.json` but unused (see ROADMAP E3). Do not build features on it.

## Env vars

Two layers. **Build-time** `NEXT_PUBLIC_*` are baked into the client bundle by the GitHub Actions image build (values come from repository variables). **Runtime** secrets come from `website.env` on the server.

| Name                                        | When            | Purpose                                                                                     |
| ------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------- |
| `PAYLOAD_URL`                               | build + runtime | server-side CMS base URL                                                                    |
| `NEXT_PUBLIC_PAYLOAD_URL`                   | build           | client CMS URL (live preview, POSTs, image helper). Dockerfile sets this from `PAYLOAD_URL` |
| `NEXT_PUBLIC_IMAGE_URL`                     | dead            | leftover in the workflow and production `website.env`. Code uses `NEXT_PUBLIC_PAYLOAD_URL`  |
| `FRONTEND_URL` / `NEXT_PUBLIC_FRONTEND_URL` | build + runtime | public site URL                                                                             |
| `PAYLOAD_API_COLLECTION`                    | runtime         | must be `api-users`                                                                         |
| `PAYLOAD_API_KEY`                           | runtime         | draft/preview                                                                               |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`            | build           | Cloudflare Turnstile                                                                        |
| `TURNSTILE_SECRET_KEY`                      | runtime         | Turnstile verify                                                                            |
| `REVALIDATION_KEY`                          | runtime         | secret for `/api/revalidate`. Must equal the CMS `REVALIDATION_KEY`                         |
| `MAIL_*`                                    | runtime         | contact form                                                                                |
| `NEXT_PUBLIC_MATOMO_*`                      | build           | analytics                                                                                   |
| `PREVIEW_TOKEN`                             | dead            | leftover, unused                                                                            |
| `NEXT_PRIVATE_REVALIDATION_KEY`             | dead            | leftover, unused                                                                            |
| `PUPPETEER_EXECUTABLE_PATH`                 | runtime         | Chrome in the image                                                                         |
| `NEXT_ENV`                                  | runtime         | `production` on the server                                                                  |

Do not add a new `NEXT_PUBLIC_*` and only put it in `website.env`. It will be empty in the browser unless the Dockerfile `ARG`/`ENV` and the `build-args` in `.github/workflows/docker-image.yml` (plus a repository variable) also pass it. `middleware.ts` relies on the baked `NEXT_PUBLIC_PAYLOAD_URL` and `NEXT_PUBLIC_FRONTEND_URL`.

## Deploy

GitHub: `bside-ms/bside_website`. Production branch is `main`. A `dev` branch and `staging.b-side.ms` were sketched once and are not a live environment. Do not build features against a staging stack.

### What GitHub Actions do

`.github/workflows/docker-image.yml` runs on every push: `npm ci`, `npm run lint`, `npm run prettier`. On `main` it then builds the image and pushes `bsidems/bside-website:latest` and `bsidems/bside-website:<sha>` to Docker Hub. The images are public. Public build args (`PAYLOAD_URL`, `FRONTEND_URL`, Turnstile site key, Matomo) come from GitHub repository variables; only `DOCKERHUB_TOKEN` is a secret. Never pass real secrets as build args.

The build prerenders pages against the live CMS, so it takes about 8 minutes. `hooks/build` is a leftover from the old Docker Hub autobuild and is unused.

### Server

Path: `/srv/docker/b-side.ms/website/`

- `docker-compose.yml`: Traefik labels, image `bsidems/bside-website:latest`, cache volume
- `website.env`: runtime secrets
- `cache/`: mounted at `/app/.next/cache`

Container listens on **3001** because `package.json` `start` is `next start -p 3001`. The Dockerfile also sets `PORT=3000` and `EXPOSE 3000`; Traefik uses 3001. Do not "fix" the start port without changing Traefik.

Website Docker network: external `bside_website`.

This repo does not contain the server compose file. A compose change is a server change, not a git change, unless you explicitly add a copy here. Server files are owned by root; edit them with `sudo`.

**A merge to `main` does not deploy.** After the Actions build is green, deploy by hand from that directory:

```bash
docker compose up -d --pull always
```

That pulls `bsidems/bside-website:latest` and recreates the container if the image changed. If only `website.env` changed, add `--force-recreate`, because Compose does not notice env file changes. `docker compose down` is not required and only adds downtime. Never add `-v` to `down` (that would wipe the Next cache volume). Compare `docker compose images` with the tag on Docker Hub to see whether the server runs the newest image.

Deploy the website first, then the CMS (`/srv/docker/b-side.ms/cms/`, `docker compose up -d --pull always payload`).

CMS redirects are **not** baked into the image. `middleware.ts` reads them at request time and caches them for 60 seconds, so a change in the admin is live within a minute (verified locally) and `next build` does not need the CMS for redirects. A second, older path exists: `pages/[...slug].tsx` looks up redirects in `getStaticProps` and the CMS hook revalidates the redirect `from` path, so ordinary paths often work instantly. Paths rewritten by `next.config.js` (`/kultur/:slug`, `/quartier/:slug`, `/kollektiv/:slug`) never reach `[...slug]`; for those only the middleware (up to 60s) applies. Hostname redirects (`www`, `cafe`, ...) stay in the Traefik labels on the server.

## Decision rules

- Schema, access, admin UI, migrations, OAuth, media upload → CMS repo.
- Rendering, routing, SEO, contact mail, Traefik-facing website behaviour → this repo.
- New page type that editors should compose → CMS `pages` / blocks, then a route or `[...slug]` here. Do not hardcode long copy in React if it belongs in Payload.
- New organisation landing page → expect a hardcoded Mongo id unless you replace that pattern on purpose.
- Never commit secrets. `.env` and `website.env` stay off git.
- Do not run `task fix` / Docker-in-Docker workflows. This project runs tooling on the host.
- Do not introduce App Router here just because the CMS uses it. This app is Pages Router.
- Keep Payload 3 types and block slugs aligned across repos. A CMS-only field rename will type-break this app after the next type copy.
- Event/news URL format on the website is `{id.slice(-4)}-{kebab}`. The CMS uses the same format for live preview and for the revalidate paths. If you touch slugs, change both repos and keep old slugs resolving (`createEventSlugOld` exists for a reason).
- `identifier` on events/news is an `afterRead` computed last-4-of-id. It is not obviously persisted. `where[identifier][equals=...]` may not match stored docs; pages already fall back to scanning slugs. Do not build new lookup logic on `identifier` without verifying it is stored.

## Known traps

- Publish not live in seconds: check that `REVALIDATION_KEY` is identical in the CMS `.env` and `website.env`, and look at the CMS log for `[revalidateWebsite]`. After changing the key, recreate both containers.
- `NEXT_PUBLIC_IMAGE_URL`, `PREVIEW_TOKEN`, and `NEXT_PRIVATE_REVALIDATION_KEY` are dead. Do not wire new features to them.
- The website README "Live Release" section may still mention old image names. The live registry is `bsidems`.
- `PAYLOAD_CONFIG_PATH` on the **CMS** compose is a Payload v2 leftover; ignore it from this repo.
- GraphQL is disabled on the CMS. Use REST `/api/{collection}`.
- `validHostnames` in `lib/common/url.ts` still lists `staging.b-side.ms`. That host is not a live stack.
- Do not run `next dev` with a different Next version than `package.json` pins. It rewrites the tracked `next-env.d.ts` and breaks lint.
