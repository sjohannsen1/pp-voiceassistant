---
title: Lists - Anforderungen
permalink: /docs/method/skills/Lists/requirements/
---

Der Listenskill muss den vorher festgelegten Anforderungen genügen. Hier sind diese sortiert ausgeführt. Falls diese nicht implementiert wurden, ist dies mit einem Kreuz markiert. Mit einem Strich sind Anforderungen markiert, welche zwar erfüllt werden aber noch verbessert werden könnten. 

## Nichtfunktionale Anforderungen

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|--------|------------------------------------------------------------------------|:---:|
| NF-003 | Die Sprach-zu-Text Komponente muss auf deutsche Sprache ausgelegt sein | ✔ |
| NF-004 | Die Skills müssen sprachunabhängig entwickelt werden                   |  ✔|
| NF-005 | Die Skills müssen unabhängig von einander Funktionieren                | ✔ |

## Funktionale Anforderungen

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------|:---:|
| F-060   | Das System muss Nutzenden die Möglichkeit bieten eine Liste zu erstellen                                                                      | ✔ |
| F-061   | Das System muss Nutzenden die Möglichkeit bieten Listen zu verwalten                                                                          | ✔ |
| F-062   | Das System muss Listen automatisch benennen                                                                                                   | ➖ |
| F-063   | Das System muss Nutzenden die Möglichkeit bieten Listen zu bearbeiten                                                                         | ✔ |
| F-064   | Das System muss Nutzenden die Möglichkeit bieten Listen zu löschen                                                                            | ✔ |
| F-065   | Das System muss Nutzenden die Möglichkeit bieten Listen an ein Gerät zu senden                                                                | ✔ |
| F-066   | Das System muss Nutzenden die Möglichkeit bieten Artikel aus einer festgelegten Auswahl zu Listen hinzuzufügen                                | ➖ |
| F-067   | Das System kann Nutzenden die Möglichkeit bieten Artikel von Listen zu löschen                                                                | ✔ |
| F-068   | Das System kann Nutzenden die Möglichkeit bieten Artikel automatisch zu Listen hinzuzufügen                                                   | ❌ |
| F-068-1 | Das System kann Nutzenden die Möglichkeit bieten für Produkte ein Nutzungsintervall einzustellen und sie so automatisch hinzufügen zu lassen | ❌ |
| F-068-2 | Das System kann Nutzenden die Möglichkeit bieten Zutaten für ein ausgewähltes Rezept automatisch zu einer Liste hinzufügen zu lassen          | ❌ |

Funktion F-062 und F-066 sind Verbesserungswürdig. Da Rhasspy nur bekannte Wörter und Phrasen verstehen kann, ist es in F-062 nicht möglich den Listen eigene Namen zu geben. Deshalb werden sie automatisch fortlaufend nummeriert benannt. Sie werden also als "Liste #" gespeichert. Ähnlich ist es bei F-066. Dort müssen vor Benutzung des Skills alle möglichen Einträge in einer Konfigurationsdatei aufgelistet werden. <br>

Funktion F-068 und beide Unterfunktionen wurden nicht implementiert, da sie niedrig priorisiert waren und der Entwicklungsaufwand so nicht gerechtfertigt war. Aufgrund mangelnder Existenz einer deutschsprachigen Rezept API hätten bei F-068-2 vor Inbetriebnahme alle Rezepte eingerichtet werden müssen. 