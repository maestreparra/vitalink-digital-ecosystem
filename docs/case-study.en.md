# VitaLink Digital Ecosystem

## From zero-brand brief to a bilingual, multi-service logistics platform

VitaLink began without a consolidated digital identity or a product structure capable of explaining its growing service portfolio. I led the work end to end: research, positioning, brand direction, information architecture, content strategy, UX/UI, design-system planning, frontend architecture, implementation, repository delivery, and deployment coordination.

The result is one coherent digital ecosystem with two related but distinct experiences:

- **VitaLink Courier:** medical courier and healthcare-logistics information for Greater Tampa Bay.
- **VitaLink Express:** same-day, regional, specialized cargo, document, and e-commerce delivery information.

## Project snapshot

| Area | Detail |
|---|---|
| Role | Lead Product Designer & UX Engineer |
| Scope | Brand, product strategy, UX/UI, content, design system, frontend, SEO architecture and delivery |
| Product surfaces | VitaLink Courier and VitaLink Express |
| Primary users | Healthcare teams, organizations and customers evaluating delivery services |
| Languages | English and Spanish |
| Design | Figma, documented tokens, reusable component model and responsive specifications |
| Engineering | Angular, TypeScript, RxJS, Tailwind CSS, SSR/prerendering and Express |
| Delivery | Git-based workflow and managed cloud deployment coordination |

## The challenge

The company needed more than a visual refresh. It needed a clear service architecture, a credible identity and a technical foundation that could support both a specialized medical-courier proposition and a broader Express offer.

The product had to solve four connected problems:

1. Explain complex and trust-sensitive services without overwhelming visitors.
2. Give the medical and Express offers distinct contexts without fragmenting the brand.
3. Support English and Spanish from a shared interface and content structure.
4. Make route metadata, canonical URLs and HTTP behavior work correctly across two production domains.

## My contribution

I owned the product and design direction from the initial concept through implementation. The client supplied the operational expertise, service catalogue and approvals; I transformed that business knowledge into the digital product.

My work included:

- Brand analysis, logo direction, visual identity and photographic direction.
- Competitive review, positioning, service organization and content strategy.
- Information architecture for the main and Express experiences.
- User flows, responsive page structures and bilingual interaction copy.
- Figma foundations, reusable component specifications and handoff documentation.
- Angular application architecture and frontend implementation.
- Multi-domain route behavior, SSR/prerender strategy and SEO metadata.
- Repository organization, deployment coordination and final technical stabilization.

## Process

### 1. Discovery and positioning

I consolidated the client's services, audience, trust requirements and growth goals into a structured product brief. Research artifacts covered brand analysis, competitor positioning, acquisition strategy, tone of voice, multichannel communication and technical options.

The central positioning decision was to preserve **VitaLink** as the trust anchor while allowing **Courier** and **Express** to communicate different service contexts.

### 2. Information architecture and content

The experience was organized around the questions customers need answered before contacting dispatch:

- What type of delivery is available?
- Is the service appropriate for my organization or shipment?
- Where does the company operate?
- What credentials and trust signals are relevant?
- How do I move from evaluation to direct contact?

The resulting route model separates stable landing pages from dynamic Express service and sector detail pages.

### 3. Design system and responsive behavior

I defined a reusable visual system with:

- Navy, red, lavender and semantic color roles.
- Montserrat for display typography and Inter for body content.
- Spacing, radius, elevation and typography scales.
- Reusable buttons, inputs, cards, navigation, modal and content patterns.
- Seven mobile-first breakpoint thresholds from compact mobile to wide desktop.

The source Figma file documents the visual direction and component work. Node-level public evidence will be captured during final publication QA because the shared file currently requires a signed-in Figma session.

### 4. One architecture, two product surfaces

Instead of maintaining two disconnected applications, I designed a shared Angular codebase with host- and route-aware behavior.

- Shared navigation, footer, localization and contact patterns reduce duplication.
- Main and Express routes retain distinct canonical origins and product identity.
- Known static routes are prerendered; parameterized detail routes use server rendering.
- Unknown routes return an actual HTTP `404` rather than a successful SPA shell.
- English and Spanish resources contain `478` matching leaf values, with automated key-parity validation.

This decision improved maintainability while preserving clear customer-facing separation.

### 5. Honest conversion behavior

The quote experience validates data in the browser and then asks the user to choose an explicit WhatsApp or SMS handoff. It does not claim that a request reached a backend when no backend transmission exists.

That correction matters because trustworthy UX includes accurately representing system state—not only making an interface feel complete.

## Technical stabilization

The portfolio edition includes a dedicated stabilization pass:

- Expanded the automated suite from `1` to `27` passing tests.
- Reduced the initial raw bundle from `665.64 kB` to `509.57 kB` through route-level lazy loading—approximately `23.5%`.
- Produced `21` prerendered routes in the validated production build.
- Corrected Express route status handling and multi-domain canonical URLs.
- Removed unused declared dependencies and reached `0` reported npm audit vulnerabilities at the validation point.
- Pinned the intended runtime to Node.js `22.22.3 LTS`.

These are engineering validation results, not claims about conversion, revenue, traffic or customer satisfaction.

## Outcome

The work transformed a broad operational brief into a coherent, bilingual digital ecosystem connecting brand, service design and frontend delivery. The product is publicly represented through the live VitaLink Courier and VitaLink Express experiences, while this repository exposes the technical decisions and validation boundaries behind the implementation.

### Live references

- [VitaLink Courier](https://www.vitalinkcouriers.com/)
- [VitaLink Express](https://express.vitalinkcouriers.com/express)
- [Figma design file](https://www.figma.com/design/ORBLgTs7eKP0TwfxmIa1uC/VitaLink?node-id=2-3)
- [Figma components](https://www.figma.com/design/ORBLgTs7eKP0TwfxmIa1uC/VitaLink?node-id=2-7)

## Authorship and AI-assisted workflow

I directed the project and made the product, brand, design and technical decisions. Builder.io, Claude, Codex and related tools assisted selected exploration, documentation and implementation tasks under my review. AI accelerated execution; it did not replace product ownership, client validation or final judgment.

The client owns its business, operational information, services and approved brand implementation. The portfolio edition uses curated public history while private source history remains isolated for attribution evidence.

## Current limitations

- The repository does not include backend quote submission, payments, tracking or operational integrations.
- Analytics outcomes, Lighthouse scores and complete WCAG conformance are not claimed without a final production audit.
- Approved brand assets used by the interface are stored locally in this portfolio edition.
- Browser-based responsive, accessibility and link UAT remains part of the publication gate.

See [Evidence register](./evidence-register.md) for the source and confidence level behind every major claim.
