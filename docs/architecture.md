# Technical Architecture

## Purpose

This document explains the architecture visible in the portfolio edition. It describes implemented behavior only; planned integrations are excluded.

## System view

```text
Browser or crawler
        │
        ▼
Angular SSR host / Express
        │
        ├── Host + route detection ──► VitaLink Courier surface
        │                              www.vitalinkcouriers.com
        │
        └── Host + route detection ──► VitaLink Express surface
                                       express.vitalinkcouriers.com/express
        │
        ▼
Angular router
        ├── Prerendered static routes
        ├── Server-rendered parameter routes
        └── HTTP 404 wildcard
        │
        ▼
Shared presentation and platform services
        ├── Header / footer / language modal
        ├── TranslationService + translation pipe
        ├── SiteDetectionService
        ├── SeoService
        └── MessageModalService
```

## Product surfaces

| Surface | Canonical origin | Route family | Purpose |
|---|---|---|---|
| VitaLink Courier | `https://www.vitalinkcouriers.com` | `/`, `/about`, `/services`, `/sam-gov`, `/certifications`, `/faq`, `/contact` | Medical courier and healthcare-logistics information |
| VitaLink Express | `https://express.vitalinkcouriers.com` | `/express/**` | General and specialized delivery information |

The architecture uses one codebase and shared components while preserving site-aware navigation, metadata and structured data.

## Rendering strategy

| Route class | Rendering mode | Reason |
|---|---|---|
| Known main pages | Prerender | Stable public content and crawler-ready HTML |
| Express landing, services, codes and contact | Prerender | Stable public content |
| Express service details | Server | Parameterized route |
| Express sector details | Server | Parameterized route |
| Unknown routes | Server with `404` | Correct HTTP semantics |

The authoritative configuration is in `src/app/app.routes.server.ts`. Browser routes and SEO data live in `src/app/app.routes.ts`.

## Multi-domain SEO

`SeoService` resolves the active site from route configuration or the current URL and applies:

- page title and description;
- robots directives;
- canonical URL;
- Open Graph and Twitter metadata;
- site-aware `LocalBusiness` and `WebSite` JSON-LD.

Pure helper functions are exported for deterministic unit testing:

- `resolveSeoSite`
- `normalizeRoutePath`
- `buildAbsoluteUrl`

## Localization

The application uses local JSON resources rather than a third-party runtime package.

```text
src/assets/i18n/
├── en.json   478 leaf values
└── es.json   478 leaf values
```

An automated test verifies structural key parity. This does not prove translation quality, text expansion fit or linguistic QA; those require browser and content review.

## Contact handoff

```text
User completes form
        │
        ▼
Angular local validation
        │ invalid
        ├────────► inline validation feedback
        │
        │ valid
        ▼
Explicit handoff notice
        │
        ├────────► WhatsApp action
        └────────► SMS action
```

No backend submission is implemented. The UI communicates this boundary and does not display a false server-success state.

## Route-level loading

Page components load through `loadComponent`, keeping feature code out of the initial route bundle until needed. During Gate 3 this reduced the initial raw bundle from `665.64 kB` to `503.89 kB`.

## Repository structure

```text
src/app/
├── components/       Shared navigation, footer and modal UI
├── guards/           Express host entry behavior
├── pages/            Main and Express product surfaces
├── pipes/            Translation pipe
├── services/         Localization, site detection, SEO and messaging
├── app.routes.ts     Browser routes and SEO metadata
└── app.routes.server.ts
                      SSR, prerender and status strategy
```

## Automated validation

| Area | Current evidence |
|---|---|
| Application smoke behavior | `src/app/app.spec.ts` |
| SSR route configuration | `src/app/app.routes.server.spec.ts` |
| Canonical URL helpers | `src/app/services/seo.service.spec.ts` |
| Contact-state integrity | `src/app/pages/contact/contact.spec.ts` |
| Translation key parity | `src/app/services/translation-parity.spec.ts` |

Validation commands:

```bash
npm ci
npm run test:ci
npm run build
npm audit
```

Final browser UAT and Node.js `22.22.3 LTS` revalidation are publication-gate work.
