# Focused product / architecture content review — 2026-11-14

Continuation of draft PR #41. No new pages, no production deployment, no CSS,
JavaScript, images, branding, pricing or security configuration changes.

## Changed

- Product: make pilot acceptance questions and limits explicit; link to the data-flow explanation.
- Architecture: express the existing diagram as one readable text sequence; explain that the payload still needs review and that model names are possible targets, not promised integrations.
- AI pseudonymization article: link directly to the relevant product limits and data-flow sections; describe customer-server installation and annual licensing without asserting a SaaS evaluation offering. Align visible and structured modification dates.

## Evidence / claim boundaries

The sources are the repository's existing public product material, not an independently tested application implementation:

| Statement | Existing evidence |
|---|---|
| Customer servers and annual license; evaluation scope to be agreed | Explicit user decision of 2026-10-27; no SaaS-pilot exception independently confirmed |
| Human review and conscious release; no perfection guarantee | Agent brief PIF principles and claims discipline; `de/sicherheit.html#freigabe` |
| Original, mapping, pseudonymized payload and controlled return | Existing architecture diagram/data-state sections and product closed loop |
| Test detection, missed/unnecessary replacements, context and effort | Existing `de/technologie.html#evaluation` and security evidence grid |
| Confidential contents / indirect clues may remain | Existing `de/ki-pseudonymisierung.html#abschnitt-3` and synthetic demo caveat |
| Model families are illustrative targets, not verified integrations | Existing architecture labels “mögliches Zielmodell”; brief prohibits unsupported implementation details |

No accuracy figure, new file format, compatibility promise, SLA, deployment proof,
customer result, certification or legal compliance guarantee was added. Exact
mapping storage, roles, keys, logging, supported platforms and integrations still
need implementation documentation for the specific deployment. Pre-existing
commercial statements elsewhere were left unchanged, not independently re-approved.

## Verification

Local static site QA (22 pages), SEO semantics, authorship/date consistency,
JavaScript syntax, 16 consent lifecycle tests and release packaging passed.
Existing full Website QA CI will recheck the resulting commit, including no-JS
mobile/desktop and layout tests. CI status must be checked before release.

Neither these content changes nor lab test scores establish Seobility 100/100,
search rankings, AI citations or qualified leads. Those require observation after
an approved release.

## Commercial-copy conflict identified before publication

The user explicitly specified annual licensing, installation on customer servers,
and no SaaS offering on 2026-10-27:
https://chatgpt.com/c/6ae05dbb-3ec0-83ed-b5b6-d833365118f4?messageId=d8be70a3-c012-4077-be2c-502e889a4399

The existing product/architecture pages and agent brief describe a limited SaaS
pilot. That wording predates this content change and was present in merged PR
#39 on 2026-10-30. Repository wording, including the brief's phrase
"user-approved", is not evidence of a separately verified owner decision.
No explicit later SaaS-pilot exception was confirmed in the reviewed messages.
The general 2026-10-29 release instruction does not settle that product-model
ambiguity.

The newly added SaaS-evaluation sentence in the AI pseudonymization article was
therefore removed before publication and replaced by customer-server annual
licensing plus evaluation scope to be agreed. Existing SaaS passages elsewhere
remain an unresolved commercial-copy conflict, not a confirmed offering.
Resolve that conflict with the owner before publishing any broader pilot claims.
This correction makes no live changes and does not alter those older passages.
