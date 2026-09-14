# Publication Boundaries

## Goal

Publish enough evidence for recruiters and engineering reviewers to evaluate the work without exposing internal client material, credentials, infrastructure details or speculative capabilities.

## Public allowlist

- Application source required to build the portfolio edition.
- Curated root `README.md` and documents indexed by `docs/README.md`.
- Automated tests and configuration needed to verify documented behavior.
- Brand assets explicitly approved for portfolio use.
- Links to public production surfaces and owner-approved Figma views.
- `LICENSE-NOTICE.md` and authorship disclosure.

## Exclude from the public branch

- `AGENTS.md`, `.claude/` and AI-agent execution configuration.
- Historical SEO consultant notes and speculative roadmaps.
- DNS, domain registrar, hosting-provider dashboard or infrastructure screenshots.
- Environment files, credentials, access tokens and local machine paths.
- Client financial, pricing, customer, contract or private operational information.
- Unapproved source research documents and working files.
- Third-party photographs or marks without confirmed publication rights.
- Generated build output, `node_modules/` and temporary files.

## Git history risk

Deleting a file from the current branch does not remove it from prior commits. Before publication, Gate 5 must scan the complete history for secrets and private material.

If the preserved client history contains content unsuitable for a public repository, publish a clean portfolio branch or repository with curated history while retaining the original isolated clone locally for attribution evidence. Do not push the preserved history by default.

## Claims policy

Use:

- verified implementation facts;
- clearly labeled local validation results;
- owner-confirmed authorship statements;
- public URLs with a review date;
- qualitative outcomes supported by visible artifacts.

Do not use:

- invented business impact;
- compliance claims without an audit or certificate;
- planned integrations described as shipped;
- accessibility or performance scores without final measurements;
- AI-generated output presented as independent ownership.

## AI attribution

Recommended wording:

> Giomar Maestre directed the product, brand, design and technical decisions. Builder.io, Claude, Codex and related tools assisted selected exploration, documentation and implementation tasks under his review.

This language preserves authorship while accurately acknowledging the workflow.

## Gate 6 publication checklist

- [x] Revalidate on Node.js `22.22.3 LTS`.
- [x] Run tests, production build and dependency audit.
- [x] Run a complete working-tree and Git-history secret scan.
- [x] Audit tracked files against this allowlist and denylist.
- [x] Confirm all visual-asset rights and replace unavailable references.
- [x] Complete desktop and mobile browser UAT for both product surfaces.
- [ ] Complete keyboard, focus, contrast, landmark and accessible-name checks.
- [ ] Validate external links, HTTP statuses, metadata and canonical URLs in production.
- [ ] Capture approved Figma and production evidence.
- [x] Decide between preserved history and a clean public-history branch.
- [ ] Obtain owner approval for the exact final diff.
- [ ] Configure the personal GitHub remote only after approval.
- [ ] Commit and push only with explicit authorization.
