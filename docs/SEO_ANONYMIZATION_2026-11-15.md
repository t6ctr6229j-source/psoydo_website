# Anonymization search-intent expansion

Requested by Florian, 2026-11-15. Preserve Psoydo positioning as pseudonymization, never assert automatic anonymity.

## Intent map (German language, Germany)
- P1: daten für chatgpt anonymisieren; daten anonymisieren ki; texte anonymisieren ki → /de/daten-fuer-chatgpt-anonymisieren. Action intent: prepare a minimal prompt before sending original data.
- P1: pdf anonymisieren ki; dokumente anonymisieren ki → /de/pdf-anonymisieren-ki. File-control intent: true redaction, hidden content, final output checks.
- P1: excel daten anonymisieren → /de/excel-daten-anonymisieren-ki. Table intent: quasi-identifiers, small groups, free text and hidden workbook content.
- P2: anonymisierung ki → use the preparation cluster and monitor landing-page relevance; do not create a fourth near-duplicate article.
- P2: anonymisierung pseudonymisierung unterschied → existing /de/anonymisierung-vs-pseudonymisierung remains the definition pillar.

These are editorial priorities based on relevance and task fit, not measured volume rankings. Ahrefs Keywords Explorer request (DE, eight terms, 2026-11-15) returned Insufficient plan. Search volume is unknown, not zero. German-language web results showed guides and products targeting document anonymization before ChatGPT/AI; this supports terminology relevance, not the claim that most searchers use this term. No new GSC demand claim. No subscription changes.

## Sources and guardrails
- DSK, Künstliche Intelligenz und Datenschutz, 6 May 2024: https://www.datenschutzkonferenz-online.de/media/oh/20240506_DSK_Orientierungshilfe_KI_und_Datenschutz.pdf
- EDPB 01/2025 landing: https://www.edpb.europa.eu/documents/guideline/guidelines-012025-on-pseudonymisation_en. Checked 2026-11-15: v1, public consultation closed; linked PDF says adopted for public consultation. Do not present as final guidance.
- Adobe: https://helpx.adobe.com/de/acrobat/desktop/protect-documents/redact-pdfs/redacting-sanitizing.html. Redaction and sanitization are distinct controls.
- Microsoft: https://support.microsoft.com/de-de/office/collab-files/remove-hidden-data-and-personal-information-by-inspecting-documents-presentations-or-workbooks. Inspector has limits, does not prove anonymization.
- Product truth: docs/WEBSITE_AGENT_BRIEF.md; /de/produkt. Production customer-controlled installation and annual license; limited SaaS evaluation distinct. No invented extraction/OCR/metadata processing promise.

## Implementation and validation
Three distinct articles with fictional examples/checklists, each over 600 words in its article body. Existing styles/logos/colors retained. Hub cards and ItemList synchronized; definition pillar contextual links; sitemap and static QA inventory updated. Browser capture inventory includes each new page at 390px and 1440px.

Local static site QA, authorship and SEO semantics passed. Independent factual/claims review found no blockers. Browser launch locally was blocked by sandbox socket permission, so exact-head CI and browser artifact review remain publication gates. A draft PR is not a live deployment. Measure later through Search Console and rank tracking; an audit score is not proof of organic ranking or traffic gains.
