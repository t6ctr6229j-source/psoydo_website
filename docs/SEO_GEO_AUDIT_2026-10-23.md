# SEO- und GEO-Bestandsaufnahme: Psoydo

**Stand:** 23.10.2026. **Zielmarkt:** Deutschland. **Status:** ausschließlich Vorschläge im Branch, kein Merge, keine Veröffentlichung.
**Quellen:** produktive Cloudflare-Pages-Konfiguration und Live-HTML, GitHub-Repository, Google Search Console über Windsor.ai (Search Analytics 22.09.–19.10.2026), GA4 für denselben Zeitraum, veröffentlichte Projektunterlagen.

## Ziel und Positionierung

Psoydo soll Unternehmen erreichen, die externe KI mit sensiblen Unternehmensdaten nutzen möchten, ohne Originalidentitäten ungeprüft an das Zielmodell zu geben. Die Software ersetzt direkte Identifikatoren mit konsistenten Pseudonymen, bietet einen Review vor der Freigabe und kann auf Hinweise auf mögliche Geschäftsgeheimnisse prüfen. **Keine pauschale Freigabe personenbezogener Daten; Pseudonymisierung ist keine Anonymisierung.** Vertriebsseitig ist ein 30-Tage-SaaS-Pilot mit einem Nutzer und 990 Euro netto dokumentiert.

## Messbarer Ausgangszustand

- Search Console (Domain-Property `sc-domain:psoydo.com`): 14 Impressionen, 0 Klicks im 28-Tage-Fenster. Nur die Suchanfrage `psoydo` wurde mit 2 Impressionen in der abgerufenen Suchabfragen-Tabelle offengelegt. Query-Tabellen sind nicht vollständig, insbesondere bei sehr geringen Volumina.
- Hauptseiten mit Impressionen: /de/ (7), /en/ (5, historischer/weitergeleiteter Pfad), /de/produkt.html (3), /de/technologie.html (3), /de/insights.html (2), /de/ki-pseudonymisierung.html (2), /de/architektur.html (1). Werte können sich wegen überlappender Zeilen/Anonymisierung von aggregierten Gesamtdaten unterscheiden.
- GA4 (Property Psoydo): 3 erfasste Sitzungen im Zeitraum, 0 als Key Event erfasste Conversions. Consent-Abhängigkeit und geringe Fallzahl unbedingt berücksichtigen.
- Sitemap vor diesem Branch: 19 Inhalts-URLs unter /de/; Google Search Console meldete die aktuelle `https://psoydo.com/sitemap.xml` mit 19 eingereichten URLs und ohne gemeldete Sitemap-Fehler; ältere `https://www.psoydo.com/sitemap.xml` war zusätzlich historisch erfasst.
- Live-Startseite: HTTP 200, Meta Robots index/follow, Canonical `https://psoydo.com/de/`, Schema.org mit Organization, WebSite, WebPage, SoftwareApplication, Offer und FAQPage.
- Cloudflare Pages baut aus `main` mit `scripts/build-cloudflare-pages.sh`; Produktionsdomain `psoydo.com`; Preview-Hosts sind separat gegen Indexierung geschützt. Die /en/- und Root-Redirects werden im Build über `_redirects` erzeugt.

## Seitentypen und Keyword-Zuordnung

| Suchintention / mögliches Keyword | Kanonische Zielseite | Funktion |
| --- | --- | --- |
| Pseudonymisierung für KI, Unternehmensdaten sicher mit KI nutzen | /de/ | Marke und Angebotseinstieg |
| Sensible Daten für KI pseudonymisieren, Pseudonymisierungssoftware | /de/produkt.html | Produktentscheidung |
| Was ist Pseudonymisierung für KI, konsistente Ersatzwerte | /de/ki-pseudonymisierung.html | Fachliche Erklärung |
| Welche Daten darf ich an KI geben, KI-Datenfreigabe prüfen | /de/ki-datenfreigabe.html **neu im PR** | Entscheidungs- und Prüfcheckliste |
| Personenbezogene Daten in ChatGPT eingeben | /de/personenbezogene-daten-ki.html | Datenschutzrechtliche Fragen ohne pauschale Freigabe |
| Anonymisierung vs. Pseudonymisierung | /de/anonymisierung-vs-pseudonymisierung.html | Begriffsunterschiede |
| Geschäftsgeheimnisse in KI schützen | /de/geschaeftsgeheimnisse-ki.html | Vertrauliche Unternehmensinformationen |
| KI on-premises / Private Cloud | /de/ki-on-premises-private-cloud.html | Betriebsmodellvergleich |
| KI Vertragsanalyse mit sensiblen Daten | /de/ki-vertragsanalyse.html | Anwendungsfall |
| Support-Tickets mit KI auswerten | /de/ki-support-tickets.html | Anwendungsfall |
| Logs mit KI analysieren | /de/ki-log-analyse.html | Anwendungsfall |
| Finanzberichte mit KI auswerten | /de/ki-finanzberichte.html | Anwendungsfall |
| Mitarbeiterfeedback mit KI auswerten | /de/ki-mitarbeiterfeedback.html | Anwendungsfall |
| KI in der Klinikverwaltung | /de/ki-klinikverwaltung.html | Anwendungsfall |
| Sichere KI-Architektur und Datenflüsse | /de/architektur.html | Technische Einordnung |
| Kontextbezogene Pseudonymisierung / Erkennung | /de/technologie.html | Technisches Verständnis |
| Sensible Daten vor externer KI schützen | /de/sicherheit.html | Vertrauen und Kontrollpunkte |
| KI-Use-Cases mit sensiblen Daten | /de/anwendungsfaelle.html | Überblick und Weiterleitung |
| Psoydo Pilot / Preise | /de/preise.html | Kaufnahe Entscheidung |
| Wissen über KI und sensible Daten | /de/insights.html | Content-Hub |

**Rechtstexte:** /de/datenschutz.html und /de/impressum.html sind vorhanden und nicht als Akquiseseiten zu behandeln. Root `index.html` führt nach /de/. **Wichtig:** Keine internationalen Keywords priorisieren, solange Deutschland vorgegeben ist.

## Wettbewerb und Chancen: bewusst noch nicht quantifiziert

- Direkte Lösungsbegriffe: `Pseudonymisierung für KI`, `Unternehmensdaten für ChatGPT pseudonymisieren`, `KI Pseudonymisierung Software`. Suchintention prüfen: Toolkauf oder Informationsbedarf?
- Problembegriffe: `vertrauliche Daten in ChatGPT`, `KI Vertragsanalyse Datenschutz`, `Support Tickets KI Datenschutz`, `Geschäftsgeheimnisse ChatGPT`. Als Teilmenge der Bestandsseiten adressieren.
- Zusätzliche Hypothese: `KI-Datenfreigabe Checkliste` und Varianten. Abweichende Suchbegriffe zuerst in realen Google-Suchergebnissen und Keyword-Datenbanken validieren.
- Öffentlich sichtbarer Wettbewerbs-/Alternativbereich: `https://pseudonymisierer.de/dokumentation` dokumentiert u. a. einen LLM-Proxy; keine Behauptung über dessen kommerzielle Relevanz oder Rankingposition.
- **Kein belastbar gemessenes Suchvolumen / Keyword-Difficulty für neue Kandidaten.** Ohne gesondertes Keyword-Tool darf eine geringe Konkurrenz nicht behauptet werden.

## Umsetzungen im Branch

1. Startseitentitel und Description beschreiben die Pseudonymisierung vor externer KI klarer. Der charakteristische H1 „Die beste KI. Ohne deine echten Daten.“ bleibt unverändert.
2. Produktseite trägt eine stärker lösungsorientierte Bezeichnung, ergänzt eine knappe Nutzenerklärung und verlinkt die technische Erklärung.
3. Neue, eigenständige KI-Datenfreigabe-Checkliste für Unternehmen, ohne datenschutzrechtliche Garantien.
4. Neue interne Einstiege aus Startseite, Insights und Sicherheit; Sitemap um die Seite ergänzt.
5. Keine erfundenen Kundencases, Rankings, Zertifizierungen oder Leistungsnachweise. Keine CSS-, Design- oder DNS-Änderung.

## Offene Freigaben und technische Grenzen

- Welche zwei bis drei realen anonymisierbaren Pilotprojekte/Cases dürfen mit Freigabe und Ergebnis veröffentlicht werden? Diese Erkenntnisse wären im GEO-Kontext wesentlich stärker als synthetische Erfolgsgeschichten.
- Welche Dateiformate, Integrationen, Betriebsmodelle und Protokoll-/Sicherheitsmerkmale sind für die aktuelle **freigegebene** Produktversion nachweisbar? Ohne Bestätigung keine zusätzlichen Produktversprechen.
- Liegen Pilot-AVV, Datenschutzinformationen und freigegebene Produkt-Screenshots für jeden neuen Fall vor?
- Eine belastbare Conversion ist aktuell nicht messbar: `app.js` meldet bereits ein consent-gesteuertes Ereignis `psoydo_pilot_email_click`; das ist **nur Klickabsicht**, keine abgesandte E-Mail. Die Konfiguration als Key Event bzw. ein echtes Formularabschluss-Ereignis bedarf eines abgestimmten Prozesses und GA4-Zugriffs.
- Core Web Vitals (LCP, INP, CLS), echte SERP-Schwierigkeit, Page-Index-Inspection und AI-Antwortzitationen sind hier nicht quantitativ gemessen. Einträge in einer Sitemap beweisen keine Indexierung.
- Falls neue Landingpages künftig als Artikel mit Datum oder Autor erscheinen sollen, tatsächliche Freigabe-/Publikationsdaten und Autorenschaft vor Veröffentlichung abgleichen.

## Abnahme vor Merge

`python scripts/qa_site.py`, `python scripts/check_seo.py`, `python scripts/check_routes.py`, `node --check app.js`, `sh scripts/build-cloudflare-pages.sh`; außerdem mobile und Desktop-Visual-QA, Consent/GA4, robots, Canonical, JSON-LD, FAQ-Schema, Sitemap, Weiterleitungen. Bestehende CI ist maßgeblich. Keine produktive Veröffentlichung ohne Review.
