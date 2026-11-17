# SEO: Dokumentvorbereitung und getrennte Seitenintentionen

Basis: main 25e683ffdf664640e157ec595ac51484b2259984, einschließlich PR51. Nur Branch und Draft-PR; kein Merge, keine Veröffentlichung, kein Deployment.

## Änderungen und Einordnung

- Anwendungsfälle: Übersicht und Auswahl einer Aufgabe; eigener Title, H1 und Einstieg mit Link zum Freigabeprozess. Vertragsbeispiel grenzt Psoydo von juristischer Bewertung ab.
- KI-Datenfreigabe: konkreter Ablauf vom Original zur geprüften Arbeitsfassung, lokale Vorbereitung und Links zu Formaten, Grenzen, Architektur und Sicherheitskontrollen.
- Produkt: Dokumente für KI pseudonymisieren / On-Premises in Title und Einstieg; dokumentierte Formate sichtbar benannt. Bestehende synthetische Demo und Erkennungsgrenzen erhalten, passende interne Links ergänzt.
- Personenbezogene Daten: Entfernen unnötiger Angaben gegenüber konsistenten Ersatzwerten erklärt; vollständig fiktives Vorher-Nachher-Beispiel ergänzt. Artikel-, Open-Graph- und sichtbares Änderungsdatum synchronisiert.
- Vertragsanalyse: neuer Crawl-Hinweis vom 17.11. (22:35 CET) berücksichtigt; Einleitung erklärt natürlich, wie sensible Vertragsdaten vor einer KI-Vertragsanalyse pseudonymisiert und geprüft werden. PR51-Beispiel und übrige Entscheidungshilfen bleiben erhalten.
- Insights: Themen und Artikel behalten ihre nützlichen H2/H3. Katalog-Wrapper ist ein neutrales div statt einer zusätzlichen section mit gleichrangigen Untersektionen; bestehende Gestaltung und alle Überschriften bleiben erhalten. Vertragslink präzisiert. Die reine Überschriftenanzahl ist kein Grund zum Löschen sinnvoller Orientierung.
- Browser-Screenshot-Matrix um die bislang fehlende KI-Datenfreigabe auf Desktop und Mobile ergänzt.

## Belege und Grenzen

Produktformate stammen aus de/produkt.html (Word, Excel, PowerPoint, PDF einschließlich OCR, E-Mails und tabellarische Daten). Kundeninstallation/Jahreslizenz und zeitlich begrenzte SaaS-Evaluation stehen im Website Agent Brief und den bestehenden Produkt-/Architekturseiten. Keine zusätzliche DE/EN-Unterstützung, Plattform, Leistungs- oder Qualitätsgarantie ergänzt. Offlinefähigkeit ist im Auftrag genannt, wird hier nicht als neue pauschale Betriebszusage ausgebaut.

PR51 hat Verträge, On-Premises/Private Cloud und Anonymisierung/Pseudonymisierung bereits differenziert. Diese Inhalte werden nicht dupliziert. Preise, Formular, CSS, JavaScript und Produktionskonfiguration bleiben unverändert.

Seobility 15.11.: 98% gesamt; neuer Crawl 17.11.: 98% gesamt, Meta 99 / Struktur 98 / Inhalt 97. Überschneidungs- und H1-Wortmeldungen sind Prüfhinweise, keine bewiesene Kannibalisierung oder Rankingursache. GSC 18.10.–14.11. (184 Impressionen, 0 Klicks) ist eine kleine historische Stichprobe vor diesen Änderungen. Keine Suchvolumen- oder Wirkungsbehauptung.

EUR-Lex (Crawler 202) und Adobe (Crawler 403) werden nicht allein wegen dieser Antworten entfernt. Keine neue rechtliche Aussage oder Quellenersetzung. Historische .html-Impressionen belegen keinen aktuellen Canonical-Fehler. Statische Prüfungen bestätigen endungslose Canonicals, Sitemap und interne Links; Apache-Regeln und Pages-Paket behalten Legacy-Routing bei. Laufzeitprüfung erfolgt über die bestehende PR-CI.

## Validierung

Lokal: qa_site.py (25 Seiten), check_seo.py, check_authorship.py (14 Artikel), node --check app.js, 16 Consent-Lifecycle-Checks, Release-Paket (46 Dateien, Referenzen und Prüfsummen) und git diff --check bestanden. Nach finaler Textänderung erneut prüfen.

Lokale Laufzeitgrenzen: Apache nicht installiert; Chromium scheitert an socket() Operation not permitted; Wrangler 4.156.0 an uv_interface_addresses/Systemfehler 1. Keine erfolgreichen lokalen Rendering-/HTTP-Routingtests behauptet. Website QA im Draft-PR führt Apache-/Pages-Routing, Lighthouse und Browserchecks bei 390/1440 px aus; dessen Ergebnisse und Screenshotkontrolle werden im PR nachgetragen. Tatsächliche Produktion und SEO-Wirkung sind dadurch nicht bestätigt.
