# SEO decision guides — 2026-11-17

## Scope and baseline

Based on current main `e8a43ae518d2d9d70f947e771db93b5ed4137f1d` (PR #50). No historical workspace files used. No AGENTS.md or .agents/skills exists in this checkout; README, WEBSITE_AGENT_BRIEF, current/superseded build-state notes and SEO release checklist reviewed. Fresh branch for the explicitly authorized task, not the superseded PR #2 iteration branch.

Four existing pages changed, with existing layout, styles, branding and PR #50 product/pilot links preserved:
- Contract analysis: sharpen metadata and introduction around preparation by pseudonymization; distinguish contract management and legal review; add a fully fictional before/after illustration, not a processing result or accuracy claim.
- On-premises/private cloud: concrete decisions about outbound data, local control and operator access; separate the documented customer installation and limited SaaS evaluation from unconfirmed private-cloud/offline capabilities.
- Anonymization vs pseudonymization: choose by purpose, need for reassignment and residual identifiability; deleting the mapping alone does not establish anonymity.
- Pricing: explicit pricing headline, evaluation instead of a promised proof of benefit, and the actual personal inquiry/offer/invoice/activation route. Prices, conditions and structured Offer unchanged.

## Product evidence on this main

| Statement | Repository evidence | Limits |
| --- | --- | --- |
| Consistent replacements and controlled return to original context | de/produkt.html, product logic and workflow; docs/WEBSITE_AGENT_BRIEF.md | No error-free recognition or automatic release claim. |
| Human review before release | de/produkt.html, Sichtabgleich and quality sections; agent brief | Fictional contract illustration is not live output. |
| Customer installation with annual license, limited SaaS evaluation | de/produkt.html; de/preise.html; agent brief | No private-cloud availability, offline guarantee or additional platform support promised. |
| Pilot EUR 990 net / 30 days; Team EUR 9,900, Business EUR 24,900, Enterprise from EUR 49,900 annually | Existing de/preise.html and agent brief | Unchanged; integrations, services and technical requirements remain subject to the offer. |
| Personal inquiry and agreed data before pilot | de/preise.html and article CTA; de/index.html#register | No instant checkout/provisioning promise. Tally is click-to-load, email fallback exists; no lead submitted. |
| Pseudonymization is not anonymity | Existing comparison article and its GDPR Article 4(5)/Recital 26 source; agent brief | No legal opinion or blanket permission to disclose; residual identifiers and business secrets require review. |

## URL and measurement findings

Physical de/ki-vertragsanalyse.html remains the source. Canonical, og:url, JSON-LD, sitemap and internal links use /de/ki-vertragsanalyse. Apache fallback redirects existing .html aliases; Cloudflare Pages normalizes them in its runtime. The existing check_pages_routes.py tests all indexable .html aliases (308 with preserved query) and canonical 200 responses. No proven configuration defect, so no routing migration or security change.

User-provided GSC November 1–14: contract page 65 impressions, legacy .html 8, on-premises 35, comparison 25, zero organic clicks. This predates PR #50 and proves neither a live routing error nor the effect of PR #50. Seobility's branded price query at position 14 on /de/anwendungsfaelle supports clearer price intent, not a ranking guarantee. Earlier cloud HTTP 403 responses do not establish general site downtime. No Cloudflare security rules changed.

## Validation

Passed locally:
- python scripts/qa_site.py — 25 public pages, assets, CTAs, schema, pricing and sitemap.
- python scripts/check_seo.py — canonical/internal-link/schema consistency and product/price semantics.
- python scripts/check_authorship.py — 14 article dates/authorship; all three changed articles dated November 17.
- node --check app.js; node scripts/check-consent-lifecycle.cjs — 16 behavioral checks.
- sh scripts/build-cloudflare-pages.sh — 46 public files; references and archive checksums verified. Local build only.
- git diff --check.

Local environment limits: Apache routing test cannot start because /usr/sbin/apache2 is absent. Wrangler 4.156.0 cannot start here (uv_interface_addresses, system error 1), so the subsequent Pages route check has no running server. Chromium launch is blocked by a socket permission error before any page renders. These are not successful route/rendering checks or evidence of a website defect. Existing PR Website QA provides real Apache/Pages routing, Lighthouse, registration checks and desktop/mobile screenshots including all four edited pages. Review its result and artifacts before any later release.

No merge, deployment, DNS, indexing request or external form submission authorized or performed. After a separately approved release, compare the same query/device/date cohorts; no uplift claimed.
