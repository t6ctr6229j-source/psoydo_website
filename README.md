# Psoydo Website

Website repository for psoydo.com.

## Canonical website

The production website lives at the repository root. There is no separate `preview/` copy.

- `/de/` — landing page
- `/de/produkt` — product workflow
- `/de/technologie` — PIF / technology
- `/de/architektur` — deployment and trust boundaries
- `/de/anwendungsfaelle` — illustrative use cases
- `/de/sicherheit` — controls and security
- `/de/preise` — pricing and 30-day evaluation
- `/de/insights` — editorial hub, eleven topic articles and the AI data-release checklist
- `/de/impressum` / `/de/datenschutz` — legal pages

Repository: `t6ctr6229j-source/psoydo_website` (renamed from `psoydo`).

Cloudflare Pages deploys the production website from `main`.

- Canonical production URL: https://psoydo.com/de/
- Public content URLs are extensionless; physical HTML filenames remain in this repository.

Canonical, sitemap and social URLs intentionally use `psoydo.com`, not the repository name. Use the existing Search Console property for post-release verification; see `docs/SEO_RELEASE_CHECKLIST.md`.

See `docs/SEO_GEO_RELEASE_2026-10-30.md` for the current URL, product-copy and measurement changes. Older launch documents describe historical releases.

For United Domains upload preparation, run `python scripts/build_release.py`. The ZIP and checksum manifest are written to `dist/`. See `docs/UNITED_DOMAINS_DEPLOYMENT.md` for the upload procedure and `.github/workflows/release-package.yml` for artifact generation; this does not deploy automatically.

## Quality controls

- `scripts/qa_site.py` — dependency-free static checks
- `scripts/check_pages_routes.py` — canonical and legacy routes against the Cloudflare Pages runtime
- `.github/workflows/website-qa.yml` — syntax, smoke, Lighthouse and browser QA
- `docs/WEBSITE_AGENT_BRIEF.md` — product, claims and design guardrails
- `docs/OVERNIGHT_BUILD_STATE.md` — bounded iterative build state

Motion respects `prefers-reduced-motion`; `?motion=1` can be used for explicit visual QA.
