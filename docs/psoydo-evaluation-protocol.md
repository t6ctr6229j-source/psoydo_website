# Psoydo: Protokoll für eine nachvollziehbare Evaluation

Erstellt am 4. November 2026. Interne Arbeitsvorlage, nicht Bestandteil des öffentlichen Website-Pakets.

**Status: vorbereitet, nicht ausgeführt.** Dieses Dokument enthält weder Testergebnisse noch einen Produktbenchmark. Die Website-Animation und die gekürzten Produktbeispiele ersetzen keinen Test der tatsächlichen Software.

## 1. Fragestellung und Verantwortliche

| Feld | Eintrag vor dem Test |
| --- | --- |
| Testkennung | Auszufüllen |
| Konkreter Use Case und gewünschte Analyse | Auszufüllen |
| Prüfverantwortung und fachliche Gegenprüfung | Auszufüllen |
| Produktversion, Build und Testdatum | Auszufüllen |
| Einstellungen und verwendete Komponenten | Auszufüllen, nur intern dokumentieren |
| Testumgebung und erlaubte Datenwege | Auszufüllen |
| Freigabe des Testdatensatzes für diese Umgebung | Auszufüllen und Nachweis intern ablegen |
| Vorab festgelegte Abnahmekriterien | Auszufüllen |
| Umgang mit Auffälligkeiten und Abbruchkriterien | Auszufüllen |

Die erste Abstimmung kann mit synthetischen Beispielen erfolgen. Vor einem Upload müssen Daten, Zweck, Umgebung und erforderliche Vereinbarungen geklärt sein. Sensible Originale oder Zuordnungen gehören weder ins Website-Kontaktformular noch in das öffentliche Website-Repository.

## 2. Testbasis festhalten

1. Stelle einen festen Datensatz zusammen, der den geplanten Use Case abbildet. Notiere Formate, Sprachen, Umfang und Besonderheiten wie Tabellen, Scans, Stempel oder schlechte Texterkennung. Eine reine Auswahl einfacher Dokumente bildet schwierige Fälle nicht ab.
2. Vergib neutrale Dokument- und Fallkennungen. Halte die Version oder Prüfsumme jeder Eingabedatei intern fest, damit spätere Durchläufe dieselbe Basis verwenden können.
3. Markiere vor dem Softwarelauf jedes zu schützende Vorkommen in den Originalen. Halte Dokument, Position, erwartete Kategorie und erwartete Behandlung fest. Notiere auch wichtige Informationen, die für die Analyse erhalten bleiben müssen.
4. Kennzeichne Wiederholungen derselben Entität innerhalb eines Falls. Prüfe etwa abgekürzte Namen und Schreibvarianten nur dann zusammen, wenn die Zuordnung fachlich belegt ist.
5. Lasse die Soll-Markierungen fachlich gegenprüfen. Uneindeutige Stellen werden vor der Auswertung geklärt oder gesondert als offene Referenz markiert. Sie werden nicht stillschweigend als Treffer gezählt.
6. Lege vorab fest, welche Abweichungen einen Fall stoppen und welche Nachkontrolle erforderlich ist. Die Kriterien richten sich nach dem Use Case. Diese Vorlage setzt keine pauschale akzeptable Fehlerquote.

| Dokumentkennung | Fallkennung | Format / Sprache | Umfang und Qualität | Eingabeversion / Prüfsumme | Soll-Markierungen gegengeprüft |
| --- | --- | --- | --- | --- | --- |
| Auszufüllen | Auszufüllen | Auszufüllen | Auszufüllen | Auszufüllen | Auszufüllen |

## 3. Softwarelauf und Ergebnisvergleich

1. Halte Produktstand, Einstellungen, Start und Ende des Laufs fest. Bewahre die erste unveränderte Ausgabe getrennt von späteren Korrekturen auf.
2. Vergleiche die erste Ausgabe mit den vorab geprüften Soll-Markierungen. Dokumentiere jede Abweichung mit neutraler Dokumentkennung und Position. Kopiere keine echten Identitäten in öffentliche Auswertungen.
3. Erfasse übersehene Soll-Stellen, unnötige Ersetzungen und falsche Einordnungen getrennt. Ein lediglich angezeigter Warnhinweis ist noch keine korrekt pseudonymisierte Ausgabe.
4. Prüfe die Konsistenz der Pseudonyme innerhalb des Falls: dieselbe Entität darf nicht unbemerkt als mehrere Identitäten behandelt werden; verschiedene Entitäten dürfen nicht unbemerkt zusammenfallen.
5. Prüfe, ob die für die Aufgabe benötigten Zusammenhänge, Zahlen und Aussagen erhalten bleiben. Dokumentiere Beeinträchtigungen der fachlichen Nutzbarkeit gesondert.
6. Prüfe zusätzlich freizugebende Inhalte, die nicht allein über direkte Identifikatoren bewertet werden können. Eine Erkennungsquote entscheidet nicht über die Zulässigkeit der Weitergabe des gesamten Inhalts.
7. Erfasse Zeit und Art der menschlichen Nachkontrolle sowie jede Korrektur. Bewerte anschließend die korrigierte Ausgabe getrennt. Das korrigierte Ergebnis darf die Leistung des ersten Softwarelaufs nicht ersetzen.
8. Halte Abbrüche, nicht verarbeitbare Dateien und Ausschlüsse mit Begründung fest. Sie dürfen nicht unbemerkt aus dem Gesamtergebnis verschwinden.

| Laufkennung | Dokument / Position | Soll-Behandlung | Tatsächliche Behandlung | Fehlerart oder korrekt | Korrektur / offene Frage |
| --- | --- | --- | --- | --- | --- |
| Auszufüllen | Auszufüllen | Auszufüllen | Auszufüllen | Auszufüllen | Auszufüllen |

## 4. Auswertung ohne Scheingenauigkeit

Zähleinheit ist zunächst jedes vorab markierte Vorkommen an einer konkreten Dokumentstelle. Die Zahl unterschiedlicher Personen oder Unternehmen ist eine separate Größe und darf nicht mit diesen Vorkommen vermischt werden. Zählregeln für überlappende oder nur teilweise behandelte Stellen müssen vor der Auswertung feststehen.

| Kennzahl | Definition | Ergebnis und Bezug |
| --- | --- | --- |
| Geprüfter Umfang | Anzahl Fälle und Dokumente, Formate, Sprachen und Qualitätsgruppen | Auszufüllen |
| Zu schützende Soll-Stellen | Vorab markierte und gegengeprüfte Vorkommen | Auszufüllen |
| Korrekt behandelte Soll-Stellen | Erwartete Behandlung in der ersten Ausgabe erfüllt | Auszufüllen |
| Übersehene oder unzureichend behandelte Soll-Stellen | Erwartete Behandlung in der ersten Ausgabe nicht erfüllt | Auszufüllen |
| Unnötige Ersetzungen | Ersetzte Stellen, deren Inhalt nach der Referenz erhalten bleiben sollte | Auszufüllen |
| Inkonsistente Zuordnungen | Wiederholungen oder verschiedene Entitäten unzutreffend zugeordnet | Auszufüllen |
| Beeinträchtigte fachliche Aussagen | Inhalt für den vereinbarten Analysezweck unbrauchbar oder verändert | Auszufüllen |
| Nachkontrolle | Zeit je Fall, nötige Korrekturen und offene Punkte | Auszufüllen |
| Technische Grenzen | Nicht verarbeitbare Dateien, Abbrüche und Ausschlüsse | Auszufüllen |

Eine Abdeckungsquote lässt sich als korrekt behandelte Soll-Stellen geteilt durch alle geprüften Soll-Stellen berechnen. Falls die Soll-Stellenzahl null ist, lautet das Ergebnis „nicht berechenbar“. Eine solche Quote wird immer zusammen mit Zähler, Nenner, Fehlerarten und Testumfang berichtet. Sie ist keine allgemeine Genauigkeits- oder Schutzgarantie.

Werte nach Format, Sprache und Dokumentqualität getrennt aus, bevor du sie zusammenfasst. Kleine oder ungleich zusammengesetzte Stichproben werden entsprechend beschrieben. Ein einzelner gut funktionierender Demonstrationsfall ist keine Aussage über einen anderen Datenbestand.

## 5. Entscheidung und Wiederholbarkeit

| Entscheidungsfeld | Eintrag nach dem Test |
| --- | --- |
| Welche vorab festgelegten Kriterien sind erfüllt? | Auszufüllen, mit Ergebnisnachweis |
| Welche Kriterien sind offen oder nicht erfüllt? | Auszufüllen |
| Welche Nachkontrolle bleibt im vorgesehenen Betrieb nötig? | Auszufüllen |
| Welche Daten oder Anwendungsfälle sind ausgeschlossen? | Auszufüllen |
| Entscheidung, Verantwortliche und Datum | Auszufüllen |
| Nächster Test nach Produkt- oder Einstellungsänderung | Auszufüllen |

Ein Wiederholungslauf verwendet die dokumentierte Testbasis und festgelegte Zählregeln. Änderungen am Datensatz oder an der Referenz werden versioniert und kenntlich gemacht. Lerneffekte aus bekannten Testfällen werden von Ergebnissen an einer zusätzlich zurückgehaltenen, noch nicht verwendeten Testauswahl getrennt.

## 6. Voraussetzungen für eine Veröffentlichung

- Produktversion, Testdatum, Testumfang und Methode sind genannt.
- Zahlen stimmen mit den intern aufbewahrten Ergebnissen überein.
- Fehlerarten, Nachkontrolle, Ausschlüsse und Grenzen bleiben sichtbar.
- Kundennamen, Zitate und Ergebnisangaben sind für die konkrete Veröffentlichung freigegeben; eine interne Prüfung allein erteilt keine Veröffentlichungsfreigabe.
- Es werden keine Rohdaten, Zuordnungstabellen, vertraulichen Implementierungsdetails oder identifizierbaren Originaldokumente veröffentlicht.
- Der Text bezeichnet nur den tatsächlich geprüften Use Case und vermeidet eine Hochrechnung auf allgemeine Produktleistung.

Offen bis zur tatsächlichen Durchführung: Testdaten, produktiver Softwarezugang, bestätigter Produktstand, ausgefüllte Ergebnisse und Freigabe. Die Website-Tests prüfen Darstellung und Messlogik, nicht die Pseudonymisierungsleistung der Software.
