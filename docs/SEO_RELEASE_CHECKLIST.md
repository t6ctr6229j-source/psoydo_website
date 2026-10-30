# SEO Release Checklist

## Vor Veröffentlichung auf psoydo.com

- Alle kanonischen, endungslosen URLs liefern direkt HTTP 200.
- `scripts/check_pages_routes.py` besteht gegen `wrangler pages dev`; alte `.html`-Adressen leiten mit erhaltenen Abfrageparametern weiter.
- HTTPS ohne Redirect-Schleifen.
- https://psoydo.com/de/ ist die kanonische Startseite.
- https://psoydo.com/sitemap.xml ist öffentlich erreichbar.
- https://psoydo.com/robots.txt ist öffentlich erreichbar.
- og-image.png ist unter https://psoydo.com/og-image.png erreichbar.
- Keine Stage-/GitHub-Pages-URL wird als Canonical ausgegeben.

## Direkt nach Veröffentlichung

1. Bestehende Domain-Property in Google Search Console öffnen; Zugriff und richtige Property prüfen.
2. Die aktualisierte sitemap.xml in der bestehenden Property prüfen und bei Bedarf erneut einreichen.
3. URL-Prüfung für:
   - /de/
   - /de/produkt
   - /de/technologie
   - /de/architektur
   - /de/anwendungsfaelle
   - /de/sicherheit
   - /de/preise
4. Live-Test der URL durchführen und Indexierung für die wichtigsten Seiten anstoßen.
5. Prüfen, dass Impressum und Datenschutz als noindex erkannt werden.
6. Rich Results Test / Schema Validator für Startseite und Preise ausführen.
7. Social Preview für LinkedIn und andere relevante Plattformen prüfen.
8. Nach Einwilligung GA4-Empfang und Property-Zuordnung im Konto prüfen. Nur `generate_lead` als primäres Lead-Schlüsselereignis konfigurieren; Details in `MEASUREMENT.md`.

## Nach 2–6 Wochen

- Search Console: Impressionen, Klicks, CTR und Suchanfragen je URL prüfen.
- Queries clustern: Pseudonymisierung, personenbezogene Daten + KI, Geschäftsgeheimnisse + KI, konkrete Use Cases.
- Titles/Descriptions nur anhand echter Query-/CTR-Daten weiter optimieren.
- Neue Landingpages aus docs/SEO_CONTENT_PLAN.md priorisieren.
- Keine Keyword-Seite veröffentlichen, wenn sie keine eigenständige Suchintention und keinen fachlichen Mehrwert hat.
