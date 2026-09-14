# Evidence Register

## Confidence labels

- **Verified:** observed directly in the portfolio repository or through a completed local validation.
- **Public reference:** visible through a public production URL at the review point.
- **Owner-provided:** supplied or confirmed by the project owner; not independently proven by this repository alone.
- **Pending publication QA:** requires final browser, rights or account-authenticated validation.

## Claim register

| ID | Claim or evidence | Source | Confidence | Public use |
|---|---|---|---|---|
| E01 | Giomar Maestre directed product, brand, UX/UI and implementation work | Owner confirmation plus isolated source-history evidence | Owner-provided + repository-supported | Authorship narrative with client contribution disclosure |
| E02 | The public portfolio edition will use a curated clean history without client repository metadata | Gate 6 publication decision and final public-history inspection | Pending publication QA | Privacy boundary; not an authorship metric |
| E03 | Main and Express are delivered from one Angular application | `src/app/app.routes.ts`, shared components and services | Verified | Architecture narrative |
| E04 | English and Spanish resources each contain 478 leaf values | `src/assets/i18n/en.json`, `src/assets/i18n/es.json` | Verified | Localization scope; not proof of linguistic quality |
| E05 | Seven responsive thresholds are configured | `tailwind.config.js` | Verified | Responsive-system scope; not proof of perfect behavior |
| E06 | 27 automated tests pass | `npm run test:ci` during Gate 6A | Verified | Technical validation |
| E07 | Production build generates 21 prerendered routes | `npm run build` during Gate 6A | Verified | Rendering validation |
| E08 | Initial raw bundle changed from 665.64 kB to 509.57 kB | Before stabilization and Gate 6A build output | Verified | Approximately 23.5% technical reduction |
| E09 | npm audit reported zero vulnerabilities for the full and production dependency sets | `npm audit --audit-level=high`; `npm audit --omit=dev --audit-level=high` during Gate 6A | Verified snapshot | Time-bound dependency result |
| E10 | Main and Express valid routes return 200, unknown routes return 404, and host boundaries redirect with 301 locally | Local SSR request matrix during Gate 6A | Verified locally | Portfolio-edition HTTP behavior |
| E11 | Main and Express use different canonical origins | SSR HTML inspection and `SeoService` tests | Verified locally | Multi-domain SEO decision |
| E12 | VitaLink Courier production experience is live | `https://www.vitalinkcouriers.com/` | Public reference | Live-product link |
| E13 | VitaLink Express production experience exists | Owner-provided URL | Owner-provided; final browser QA pending | Live-product link with Gate 5 recheck |
| E14 | Figma source and component nodes exist | Owner-provided Figma URLs | Owner-provided; signed-in inspection pending | Design links; screenshots pending |
| E15 | Brand, communication, design-system and deployment documentation exists outside the public repo | Supplied research and final-project directories | Verified inventory | Evidence of process depth; raw files excluded |
| E16 | The client approved portfolio publication | Owner confirmation | Owner-provided | Publication basis; retain written approval separately |

## Claims intentionally not made

- Conversion, revenue, lead-volume or SEO-ranking increases.
- Verified Lighthouse score.
- Complete WCAG conformance.
- PWA support.
- Backend quote delivery, payments or real-time tracking.
- Live analytics, CRM or logistics-platform integrations.
- Full linguistic QA merely because translation keys match.

## Visual evidence plan

| Sequence | Artifact | Purpose | Status |
|---|---|---|---|
| 01 | Branded case-study cover | Establish project identity and personal role | SVG/PNG source prepared in Gate 4 |
| 02 | Zero-to-ecosystem scope diagram | Explain the end-to-end ownership | Documented; final graphic pending |
| 03 | BrandBook selection | Show logo, color, typography and photography direction | Source available; rights/selection review pending |
| 04 | Figma foundations | Show variables, styles and tokens | Authenticated capture pending |
| 05 | Figma components | Show reusable component work | Authenticated capture pending |
| 06 | VitaLink Courier desktop/mobile | Show the medical-courier surface | Browser capture pending |
| 07 | VitaLink Express desktop/mobile | Show the Express surface | Browser capture pending |
| 08 | Architecture diagram | Explain shared codebase and multidomain behavior | Available in `architecture.md` |
| 09 | Contact-state sequence | Demonstrate honest system feedback | Available in `architecture.md`; visual capture pending |
| 10 | Validation summary | Present tests, bundle and audit results | Verified data ready for graphic treatment |

## Evidence handling rule

Every portfolio caption must identify whether it shows research, a design specification, implemented code, a local validation or the live production product. Planned concepts must never be presented as shipped functionality.
