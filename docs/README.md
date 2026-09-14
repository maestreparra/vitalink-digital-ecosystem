# Portfolio Documentation

This directory contains the public, recruiter-facing documentation for the VitaLink Digital Ecosystem portfolio edition.

## Start here

- [Case study — English](./case-study.en.md)
- [Caso de estudio — Español](./case-study.es.md)
- [Technical architecture](./architecture.md)
- [Evidence register](./evidence-register.md)
- [Publication boundaries](./publication-boundaries.md)

## Review paths

### Product design review

Read the English or Spanish case study, then review the Figma reference and production surfaces linked from it.

### UX engineering review

Read [Technical architecture](./architecture.md), then inspect:

- `src/app/app.routes.ts`
- `src/app/app.routes.server.ts`
- `src/app/services/seo.service.ts`
- `src/app/services/site-detection.service.ts`
- `src/app/pages/contact/contact.ts`
- the adjacent `*.spec.ts` files

### Evidence and claims review

Use [Evidence register](./evidence-register.md) to distinguish verified repository facts, owner-provided evidence, live references, and work still pending final publication QA.

## Documentation policy

Historical client planning, deployment screenshots, DNS configuration, consultant notes, and speculative roadmaps are intentionally excluded from the public documentation layer. Their exclusion prevents internal context and unimplemented concepts from being mistaken for current product capabilities.
