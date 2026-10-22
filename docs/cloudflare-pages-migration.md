# Psoydo: independent Cloudflare Pages staging

- Zone `psoydo.com` has been added in Cloudflare Free, initially pending. **DO NOT change registrar nameservers yet.**
- GitHub source `t6ctr6229j-source/psoydo_website`, preview branch `cloudflare/pages-preview-20261021`.
- Cloudflare Pages name: `psoydo-website`, build command `sh scripts/build-cloudflare-pages.sh`, output folder `cf-dist`.
- Build extracts the existing SHA-verified United Domains release archive and removes Apache-specific `.htaccess`.
- Cloudflare `_redirects` preserves root, `/en`, retired legal translations, and `/de/index.html` canonical aliases.
- Preview `*.pages.dev` hostnames are `noindex` via host-scoped `_headers`. Do not let this apply to the later production custom domain.
- All automatic imported A/AAAA records are DNS-only; existing MX and SPF retained. Independently compare the complete authoritative United Domains zone (including subdomains and TXT records) before any nameserver delegation.
- Check the lightbox, every SEO use case, scripts/consent, routing and analytics in preview. No live DNS changes were made here.
- Psoydo's Apache security PR #28 is separate: merge it only after passing Apache route QA and confirming its compatibility with the current host.

Cloudflare Git connection smoke test: 2026-10-21. This commit should trigger the independent Pages preview deployment; it does not touch DNS or the current United Domains website.

## DNS records verified against United Domains (2026-10-22)
- Source: user's one-page United Domains DNS overview showing "Alle Subdomains" for `psoydo.com`. Verified all recorded values/hostnames/types/priorities against the pending Cloudflare zone, not only the total count.
- 8 / 8 records match (2 A, 2 AAAA, 2 MX, 2 TXT); no missing or surplus records, and no modifications were needed.
- Any imported web/other A, AAAA or CNAME records are **DNS-only**. All three Cloudflare zones are still pending and the registrar is still delegated to United Domains; this documentation does not authorize an immediate registrar change.
- Cloudflare has automatic TTL on previously scanned records versus United Domains's 600/3600 seconds. This changes caching interval, not destinations, record types, MX priorities or service functionality.
- Cloudflare DNSSEC remains disabled in this pending zone. Recheck DS at the parent registry immediately before making a nameserver change; the successful preview-branch preflight is not a permanent guarantee.
- Cutover sequence: check DNS immediately beforehand; owner changes nameservers only once approved; verify zone activation, first keep origin DNS-only; link Cloudflare Pages production domains and TLS, set and verify canonical redirects, preserve privacy and mail handling, verify production paths and analytics consent; retain United Domains webspace until acceptance.
