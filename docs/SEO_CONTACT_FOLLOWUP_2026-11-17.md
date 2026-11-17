# SEO-Nachprüfung und direkte Kontaktaktionen

Basis: main 48c08b8f512d9de0ce684fd4f5a3e1e6fe64f15e (PR52 veröffentlicht). Auftrag: sinnvolle SEO-Restbefunde korrigieren, Telefon/E-Mail auf allen Seiten dauerhaft erreichbar machen und nach erfolgreicher Prüfung veröffentlichen.

## Konkrete Änderungen

- Produkt erläutert im Fließtext den On-Premises-Einsatz und warum der fachliche Zusammenhang verständlich bleibt.
- Anwendungsfälle benennt die KI-Anwendungsfälle im Einstieg; Datenfreigabe erklärt den Weg zur geprüften Fassung und die bewusste Entscheidung, Dokumente freizugeben. Keine Wiederholungsblöcke, neuen Leistungszusagen oder geänderten Freigaberegeln.
- PDF-Quellen: zwei im Crawl mit 403 gemeldete Adobe-HelpX-Ziele durch eine deutschsprachige offizielle Adobe-Experience-League-Anleitung ersetzt, die beide Themen abdeckt: echte Schwärzung sowie Bereinigung von Kommentaren, Metadaten und verborgenen Ebenen. Inhalt gelesen und HTTP 200 bestätigt am 17.11.2026. Quelle: https://experienceleague.adobe.com/de/docs/document-cloud-learn/acrobat-learning/advanced-tasks/protect/redact
- EUR-Lex unverändert: im aktuellen Crawl nicht beanstandet.
- Insights geprüft: nur Meldung zur Anzahl, null Struktur-, Leer- oder Doppelüberschriftenfehler. Themen-H2 und Artikel-H3 sind sinnvolle Navigation für Leser und Assistenztechnik. Keine Überschriften nur für einen Toolscore entfernt. Eine verbleibende Scorewarnung ist deshalb möglich.
- Feste Telefon-/E-Mail-Aktionen auf allen 25 deutschen Inhaltsseiten und 404. Verifizierte bestehende Footer-/Impressumsdaten: +49 731 40 32 13 75 und info@wescaleit.com (wescaleIT AG). Native tel:/mailto:-Links, keine Klickmessung, kein externer Dienst.
- Petrol/Mint, sichtbare Textlabels, dekorative lokale SVGs, sprechende zugängliche Namen, Fokusrahmen und mindestens 44px hohe Ziele. Mobile Safe-Area und Platz am Dokumentende berücksichtigt. Ausblendung bei Cookie-Dialog, geöffnetem Mobilmenü, Lightbox und sichtbarem Anfrageformular; Formularerkennung mit IntersectionObserver und Scroll-/Resize-Fallback.
- Keine englischen Inhaltsseiten vorhanden. Bestehende /en-Weiterleitungen führen zu deutschen Seiten mit Kontaktaktionen; keine neue Sprachversion erfunden. Root-index ist eine sofortige Weiterleitung; Kontaktaktionen stehen am Ziel.

## Prüfung

Statisch: qa_site.py, check_seo.py, check_authorship.py, JavaScript-Syntax, 16 Consent-Verhaltensprüfungen und Release-Paket einschließlich Referenzen/Prüfsummen. Neue Browserprüfung in bestehender Website-QA: alle deutschen Seiten, 390/1440px, native Kontaktziele, Mindestgrößen, Fokus, JavaScript-aus, Cookie-/Menü-/Formular-Freiraum, 404 und keine zusätzlichen externen Requests. Bestehende Apache-/Pages-Routingchecks decken auch alte englische Pfade ab.

Lokal bekannte Systembeschränkungen für Chromium/Pages-Runtime; reale Laufzeitchecks und Screenshots laufen in GitHub CI. Finale CI-, Sichtprüfungs-, Merge- und Veröffentlichungsnachweise werden im PR dokumentiert.

Ausgangspunkt Seobility-Crawl 16297939: gesamt 98, Technik 99, Struktur 98, Inhalt 96. Toolmeldungen sind Hinweise; weder 100% noch Rankingwirkung zugesagt. Bestehende Datenschutzkontrollen, Preise und Produktfunktionen bleiben erhalten.

Sitemap-Nachprüfung: lastmod der zehn am 17.11. redaktionell geänderten Seiten aus PR51, PR52 und diesem Paket auf 2026-11-17 korrigiert: Produkt, Anwendungsfälle, Insights, KI-Datenfreigabe, KI-Vertragsanalyse, personenbezogene Daten, PDF-Vorbereitung, Anonymisierung/Pseudonymisierung, On-Premises/Private Cloud und Preise. Reine gemeinsame Kontaktleistenänderungen setzen die übrigen redaktionellen Datumswerte nicht pauschal neu. Artikel-Veröffentlichungsdaten unverändert.
