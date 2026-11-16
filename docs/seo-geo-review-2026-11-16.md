# Psoydo SEO/GEO review — 2026-11-16

## Evidence and limits
- Seobility project 1036609; completed crawl 16283767 on 2026-11-15 13:42:50 +01:00, 25 crawled pages. Overall 98, technical/meta 99, structure 98, content 98. This is a technical audit score, not a Google ranking or AI-answer score.
- Google.de rank tracking requested for 2026-11-16: default/desktop 43 keywords, all ranking_fetched=true. Two organic results: “ki log analyse” position 10 and “psoydo preise” position 14 (new), latter pointing to /de/anwendungsfaelle. Mobile: 43 measured, “ki klinikverwaltung” position 29. No position 1 in either returned set.
- rank=false for the other 41 desktop / 42 mobile queries means no detected rank in this measurement, not proof of deindexing, a ranking loss, or an unperformed measurement. Device, date, country and tracked set matter.
- Search Console property sc-domain:psoydo.com via Windsor: request 2026-10-19–2026-11-15 returned daily rows only through November 14. November 8–14: 130 impressions, 0 clicks. November 1–7: 51 impressions, 0 clicks. Small absolute base; recent data may still settle. The comparison is not a proven effect of any particular change.
- Query/page data for November 1–14: “vertragsanalyse ki” /de/ki-vertragsanalyse 17 impressions, average position 63.8824; “ki vertragsprüfung” same URL 12 impressions, average 41. These averages are not a current fixed SERP position. Some historical .html rows exist; those rows alone do not establish a live routing error.
- AI Overview table fields returned no own citation rank. Detailed check of desktop “pseudonymisierung software” on November 16 reports cited_urls=0. This is one measured Google AI Overview result, not a measurement of ChatGPT/Perplexity visibility in general.
- Crawl reports no blocked AI-search pages. Crawlability does not guarantee citation.

## Bounded change
Strengthen the contextual route from the already visible Log analysis and Contract analysis articles to the existing product workflow and pricing/pilot conditions. Preserve the existing approval-checklist and use-case links. Use descriptive anchor text, not additional speculative product claims or a new doorway page. Keep human review, suitability checks and the existing commercial terms unchanged.

## Audit warnings not gamed away
- Insights: heading-density warning. Article-card headings serve real navigation and accessibility; do not demote them just to increase a tool score.
- Cannibalization heuristic: /de/anwendungsfaelle and /de/ki-datenfreigabe share “Daten” / “sensible daten schützen ki”. Different intents (use-case overview vs approval checklist); this alone is not evidence that Google is switching ranking URLs adversely.
- External EUR-Lex response 202 and Adobe 403 in last crawl are not own-site 404s. Latest main already contains PR49's more precise Adobe links, newer than this crawl. Do not undo authoritative sources because a crawler is challenged.

## Validation
Based on main commit 836bfd1e58ea1cc2ee584068acc5e94b296dbce5.
Passed locally on latest-main checkout with changes: qa_site.py (25 pages), check_authorship.py (14 articles), check_seo.py, node --check app.js, check-consent-lifecycle.cjs (16 checks).
No design/CSS, pricing, legal, form, consent, DNS or account changes.
Full GitHub CI and deployment are separate gates. No ranking uplift or 100-point score claimed. Merge/deployment requires the repository's release authorization.

## Next measurement
After an approved release and recrawl, compare the same query/device/date cohorts. Monitor whether /de/preise replaces /de/anwendungsfaelle for branded price intent, and whether visible articles generate relevant onward visits or leads. Do not create more content until actual query evidence or a documented product gap justifies it.
