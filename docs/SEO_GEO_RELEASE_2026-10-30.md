# SEO/GEO release, 2026-10-30

Base: `b5e1c96ba3337a08393ae334c62cabc6282d9a88` on `main`. This release preserves the approved layout, native motion, motion pause, demonstration, Easter eggs and removal of the decorative hero P.

## Public URL contract

Cloudflare Pages serves physical `de/*.html` files under extensionless public URLs. The home URL remains `https://psoydo.com/de/`. Canonicals, Open Graph URLs, schema IDs/URLs, sitemap and local links now use those actual direct-200 URLs. Existing `.html` addresses keep their permanent native Pages redirect and preserve query strings. The Apache fallback package uses the same public URL contract without changing the source filenames.

`scripts/check_pages_routes.py` checks all 20 sitemap URLs, legacy HTML aliases, query preservation, legal-page noindex, robots, sitemap and real 404 responses against `wrangler pages dev`. CI uses this runtime for browser checks and Lighthouse as well. `scripts/check_routes.py` separately retains actual Apache fallback validation.

## Approved business model

The user's current instruction establishes annual licenses installed on customer laptops or servers. Product, architecture, pricing, homepage, FAQ and structured descriptions agree with that model. The existing one-user, 30-day, EUR 990 net pilot remains a clearly limited SaaS demo for evaluation, without automatic conversion to an ongoing SaaS subscription. Annual prices are unchanged.

No private-cloud availability, supported operating systems, installation readiness, capacity, entitlement or release date is invented. Technical prerequisites, setup and the actual operating boundary remain matters for the concrete offer. Conceptual editorial discussions of on-premises and private cloud do not constitute a product availability promise.

## Editorial trust and dates

The pseudonymization article and AI data-release checklist now cite the GDPR text and the German supervisory authorities' AI guidance. Actual substantive modifications receive a 2026-10-30 modification date. Existing publication dates and confirmed author identities stay intact. No personal author is invented for the checklist, and no fictional case, customer endorsement, benchmark or evaluation is added.

## Measurement

The approved GA4 ID stays unchanged. Production-host and consent gates remain in force. Confirmed Tally completions add the standard `generate_lead` event after origin, iframe source, form ID and submission-ID validation, with replay protection and no form fields/IDs sent to analytics. External referral attribution is limited to the origin. The privacy notice and `MEASUREMENT.md` describe the actual explicit integration.

Zero rows in an external report do not identify a client-code cause. The source tests cannot establish provider account ownership, stream mapping or actual event receipt. Those checks require the authenticated Google account. Only `generate_lead` is intended as the primary lead key event.

## Remaining inputs

- Authenticated GA4 verification of stream/property mapping, event receipt and primary key-event configuration.
- Confirmed editorial responsibility if a personal byline is desired for the checklist.
- Approved real product evaluation or customer evidence before publishing claims of measured effectiveness or customer outcomes.

No rankings, indexing counts, guaranteed AI citations or search-visibility uplift are claimed by this release.
