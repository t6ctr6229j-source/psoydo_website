# SEO / GEO release, 29 September 2026

## Verified baseline
Main: 6d11f04ad3d4240d954d826cc7a57874d203113b, including the published 26 September privacy/imprint changes. Live root and www returned HTTP 200 with a 344-byte meta-refresh stub; /de/ had the intended title and description already. HTTP was redirected to HTTPS by the hosting proxy. No active English site was configured.

## Search intent and URLs
- Sensitive data / general AI use: /de/ and /de/ki-pseudonymisierung.html.
- Personal data in ChatGPT: improved /de/personenbezogene-daten-ki.html.
- Anonymization versus pseudonymization: improved /de/anonymisierung-vs-pseudonymisierung.html.
- Business secrets: improved /de/geschaeftsgeheimnisse-ki.html.
- Legal: improved existing /de/ki-vertragsanalyse.html, no competing Legal landing page.
- Finance: new /de/ki-finanzberichte.html, interpreting internal financial reporting.
- HR: new /de/ki-mitarbeiterfeedback.html, thematic feedback analysis rather than personnel ratings.
- Clinic administration: new /de/ki-klinikverwaltung.html, administrative correspondence, no medical function or clinical suitability claimed.
- Discovery: /de/insights.html and /de/anwendungsfaelle.html, updated sitemap.

Fictional cases are labeled. Updated core/industry articles have visible publisher and publication/update dates, mirrored in Article markup. Existing article publication date is the verified initial release on 22 September; the three new articles use 29 September. No invented named authors, cases, certifications or performance figures.

## Routing
Production .htaccess (included in the release allowlist) returns 301 for root, explicit index aliases and www paths, preserving query strings. /de/ is canonical. HTTP-to-HTTPS remains managed by the hosting proxy; HTTP root can therefore require that proxy hop before the application root redirect. ErrorDocument retains an HTTP 404 and uses the branded page. Pages preview ignores .htaccess.

## Structured data and eligibility
The existing SoftwareApplication is retained. No duplicate Product or invented ratings were added. Provider/seller reference the wescaleIT AG entity. Organization data matches the confirmed imprint: Ulm business address, telephone and email; this is not a claim that the registered seat changed from Ostfildern.

Offer explicitly describes the 30-day cloud evaluation, EUR 990 net (PriceSpecification.valueAddedTaxIncluded=false), no automatic renewal and personal quotation/invoice/activation. FAQ answers are synchronized with the six visible answers. Article dates, headlines and publisher match visible content.

Validation: scripts/check_seo.py checks JSON-LD entity consistency, visible FAQ parity, canonical URLs, dates, pilot offer fields and contact/retired-form constraints. scripts/qa_site.py checks 21 pages, unique metadata, local links/assets and sitemap. scripts/check_routes.py exercises the real Apache .htaccess, including aliases, query strings, non-looping /de/ and a branded true 404. This is not a claim that Google's hosted Rich Results Test was run.

Rich-result applicability checked against official Google documentation on 29 September:
- FAQ rich results were discontinued on 7 May 2026. Schema.org FAQPage remains a vocabulary type; it is not a promise of a Google enhancement.
- SoftwareApplication rich results require a genuine review or aggregate rating. Neither has been supplied. We deliberately do not fabricate them to satisfy a test.
- Article and BreadcrumbList are appropriate to the editorial content. Actual Google recognition/indexing remains an account-side Search Console check, not an inferred deployment result.

References:
- https://developers.google.com/search/updates (May 8 and June 15, 2026)
- https://developers.google.com/search/docs/appearance/structured-data/software-app
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://schema.org/SoftwareApplication
- https://schema.org/PriceSpecification
- https://httpd.apache.org/docs/2.4/rewrite/remapping.html

## Editorial primary sources
- GDPR: https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de
- Official German reproduction consulted where EUR-Lex anti-bot blocked full text: https://amtliche-handbuecher.bundesfinanzministerium.de/ao/2026/Datenschutz-Grundverordnung/inhalt.html
- DSK guidance: https://www.datenschutzkonferenz-online.de/media/oh/20240506_DSK_Orientierungshilfe_KI_und_Datenschutz.pdf
- https://www.gesetze-im-internet.de/geschgehg/__2.html
- https://www.gesetze-im-internet.de/geschgehg/__4.html

## Preservation and publication
The current app.js and main contents of privacy/imprint are unchanged. Pilot contact remains mailto:info@wescaleit.com with the existing subject, works without JavaScript and does not reload Typeform. Consent is retained. No external inquiry is sent during tests.

At preparation time: release is not yet published. CI and live verification are recorded in the associated pull request and Actions runs. No indexing or AI visibility guarantee.
