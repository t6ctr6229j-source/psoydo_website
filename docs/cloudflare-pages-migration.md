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
