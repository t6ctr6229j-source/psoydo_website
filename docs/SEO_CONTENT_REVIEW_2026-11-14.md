# Focused product / architecture content review — 2026-11-14

Continuation of draft PR #41. No new pages, no production deployment, no CSS,
JavaScript, images, branding, pricing or security configuration changes.

## Changed

- Product: make pilot acceptance questions and limits explicit; link to the data-flow explanation.
- Architecture: express the existing diagram as one readable text sequence; explain that the payload still needs review and that model names are possible targets, not promised integrations.
- AI pseudonymization article: link directly to the relevant product limits and data-flow sections; distinguish customer installation from the limited evaluation demo. Align visible and structured modification dates.

## Evidence / claim boundaries

The sources are the repository's existing public product material, not an independently tested application implementation:

| Statement | Existing evidence |
|---|---|
| Customer laptops/servers and annual license; limited SaaS evaluation | `docs/WEBSITE_AGENT_BRIEF.md` core product truth; existing `de/architektur.html#einsatzplanung` and `de/produkt.html` |
| Human review and conscious release; no perfection guarantee | Agent brief PIF principles and claims discipline; `de/sicherheit.html#freigabe` |
| Original, mapping, pseudonymized payload and controlled return | Existing architecture diagram/data-state sections and product closed loop |
| Test detection, missed/unnecessary replacements, context and effort | Existing `de/technologie.html#evaluation` and security evidence grid |
| Confidential contents / indirect clues may remain | Existing `de/ki-pseudonymisierung.html#abschnitt-3` and synthetic demo caveat |
| Model families are illustrative targets, not verified integrations | Existing architecture labels “mögliches Zielmodell”; brief prohibits unsupported implementation details |

No accuracy figure, new file format, compatibility promise, SLA, deployment proof,
customer result, certification or legal compliance guarantee was added. Exact
mapping storage, roles, keys, logging, supported platforms and integrations still
need implementation documentation for the specific deployment. Existing
commercial statements were preserved, not independently re-approved.

## Verification

Local static site QA (22 pages), SEO semantics, authorship/date consistency,
JavaScript syntax, 16 consent lifecycle tests and release packaging passed.
Existing full Website QA CI will recheck the resulting commit, including no-JS
mobile/desktop and layout tests. CI status must be checked before release.

Neither these content changes nor lab test scores establish Seobility 100/100,
search rankings, AI citations or qualified leads. Those require observation after
an approved release.
