# Psoydo search snippets and crawl hygiene, 2026-11-07

Baseline: `d49e166cee0be5fb16e5062027e19bc0fcb16410` on `main`.

## Bounded changes

- Shorten the Insights title from 65 to 49 characters. Keep its HTML title, social titles and CollectionPage name aligned.
- Shorten the Klinikverwaltung description from 167 to 152 characters, Finanzberichte from 164 to 145 and Mitarbeiterfeedback from 161 to 143. Preserve the fictional-example qualification and the medical-decision limitation. Keep each description identical in HTML, Open Graph, Twitter and Article metadata.
- Add a narrow robots exclusion for `/cdn-cgi/l/email-protection`. This is a Cloudflare utility endpoint, not a missing website page. The injected decoder script remains crawlable. All content, assets, canonicals, the sitemap and their existing publication/modification dates remain unchanged.
- Strengthen the existing checks with editorial title/description limits of 60/160 characters, description consistency and the narrow robots exclusion. These limits reduce overlong snippets; they do not guarantee how Google will render or rewrite a result.

## Email protection finding

Cloudflare Email Address Obfuscation is enabled. A raw request to its email-protection endpoint returns 404, while the live browser resolves the pilot and footer contact links to the intended `mailto:` destinations. No email was sent and no form was submitted during this check.

Cloudflare documents that `/cdn-cgi/` endpoints are managed by Cloudflare, that crawler errors on these endpoints do not affect rankings, and recommends a robots exclusion. This release excludes only the email landing endpoint rather than the entire utility directory. It does not disable email protection, alter WAF settings, change CSP or turn the utility URL into a website content page.

Reference: https://developers.cloudflare.com/fundamentals/reference/cdn-cgi-endpoint/

## Validation record

- `python3 scripts/qa_site.py`: passed for 22 public content pages.
- `python3 scripts/check_seo.py`: passed, including the new metadata and robots checks.
- `python3 scripts/check_authorship.py`: passed for all 11 articles.
- `node --check app.js`: passed; application code is unchanged.
- `node scripts/check-consent-lifecycle.cjs`: all 12 isolated checks passed without Google traffic.
- `sh scripts/build-cloudflare-pages.sh`: passed; 43-file public package and checksums verified.
- Live browser baseline: pilot and footer email links resolve to `mailto:info@wescaleit.com`, with the pilot subject preserved. Analytics consent was not granted.
- Full routing, Lighthouse and browser gates run in the pull request for the exact release commit. Merge is contingent on their success. Cloudflare deployment and live response checks are separate post-merge steps, not implied by the local checks above.

Authenticated reporting was checked separately. Search performance and sitemap processing do not establish current URL index coverage. An empty recent GA4 report is not proof of zero visitors or leads; property/stream assignment and event reception still require direct account evidence. No measurement ID, consent logic or conversion configuration was changed speculatively.
