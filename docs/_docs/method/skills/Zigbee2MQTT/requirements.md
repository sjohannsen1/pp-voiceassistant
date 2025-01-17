---
title: Anforderungen
permalink: /docs/method/skills/Zigbee2MQTT/requirements/
---

Der Smarthomeskill muss den vorher festgelegten Anforderungen genügen. Hier sind diese sortiert ausgeführt. Falls diese nicht implementiert wurden, ist dies mit einem Kreuz markiert. Mit einem Strich sind Anforderungen markiert, welche zwar erfüllt werden, aber noch verbessert werden könnten. 

## Nichtfunktionale Anforderungen

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|--------|------------------------------------------------------------------------|:---:|
NF-002 |	Das System muss Smart-Home Geräte steuern können | ✔ |
| NF-003 | Die Sprach-zu-Text Komponente muss auf deutsche Sprache ausgelegt sein | ✔ |
| NF-004 | Die Skills müssen sprachunabhängig entwickelt werden                   | ✔ |
| NF-005 | Die Skills müssen unabhängig von einander Funktionieren                | ✔ |


## Funktionale Anforderungen

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|---------|--------------------------------------------------------------------------------------------------------------------------|:---:|
| F-030   | Das System muss Nutzenden die Möglichkeit bieten Smarte Geräte zu steuern                                                | ✔ |
| F-031   | Das System muss Nutzenden die Möglichkeit bieten Smarte Geräte einzuschalten                                             | ✔ |
| F-032   | Das System muss Nutzenden die Möglichkeit bieten Smarte Geräte auszuschalten                                             | ✔ |
| F-033   | Das System muss Nutzenden die Möglichkeit bieten sich den Zustand Smarter Geräte ausgeben zu lassen                      | ✔ |
| F-034   | Das System muss Nutzenden die Möglichkeit bieten die Einstellung von Smarten Geräten in Szenen zu speichern              | ✔ |
| F-034-1 | Das System muss Nutzenden die Möglichkeit bieten die gespeicherten Szenen zu verwalten                                   | ✔ |
| F-034-2 | Das System muss Nutzenden die Möglichkeit bieten sich die Szenen ausgeben zu lassen                                      | ✔ |
| F-034-3 | Das System muss Szenen automatisch benennen                                                                              | ➖ |
| F-034-4 | Das System muss Nutzenden die Möglichkeit bieten die Szenen zu löschen                                                   | ✔ |
| F-034-5 | Das System muss Nutzenden die Möglichkeit bieten die Szenen durch ihren Namen auszuwählen                                | ✔ |
| F-034-6 | Das System muss Nutzenden die Möglichkeit bieten die Szenen zu bearbeiten                                                | ✔ |
| F-035   | Das System muss Nutzenden die Möglichkeit bieten Smarte Geräte in Gruppen zu speichern                                   | ✔ |
| F-035-1 | Das System muss Nutzenden die Möglichkeit bieten sich gespeicherte Gruppen ausgeben zu lassen                            | ✔ |
| F-035-2 | Das System muss Nutzenden die Möglichkeit bieten Smarte Geräte aus Gruppen zu Löschen                                    | ✔ |
| F-035-3 | Das System muss Nutzenden die Möglichkeit bieten Gruppen zu steuern                                                      | ✔ |
| F-035-4 | Das System muss Nutzenden die Möglichkeit bieten Gruppen einzuschalten                                                   | ✔ |
| F-035-5 | Das System muss Nutzenden die Möglichkeit bieten Gruppen auszuschalten                                                   | ✔ |
| F-035-6 | Das System muss Nutzenden die Möglichkeit bieten die Einstellung von Gruppen in Szenen zu speichern                      | ✔ |
| F-036   | Das System muss Nutzenden die Möglichkeit bieten Smarte Leuchten zu steuern                                              | ✔ |
| F-036-1 | Das System muss Nutzenden die Möglichkeit bieten die Helligkeit von Smarten Leuchten einzustellen                        | ✔ |
| F-036-2 | Das System muss Nutzenden die Möglichkeit bieten die Farbtemperatur von Smarten Leuchten einzustellen                    | ✔ |
| F-036-3 | Das System muss Nutzenden die Möglichkeit bieten die Lichtfarbe von Smarten Leuchten einzustellen                        | ✔ |
| F-036-4 | Das System muss Nutzenden die Möglichkeit bieten sich die Helligkeit Smarter Leuchten ausgeben zu lassen                 | ✔ |
| F-037   | Das System muss Nutzenden die Möglichkeit bieten Gruppen von Smarte Leuchten zu steuern                                  | ✔ |
| F-037-1 | Das System muss Nutzenden die Möglichkeit bieten die Helligkeit von Gruppen von Smarten Leuchten einzustellen            | ✔ |
| F-037-2 | Das System muss Nutzenden die Möglichkeit bieten die Farbtemperatur von Gruppen von Smarten Leuchten einzustellen        | ✔ |
| F-037-3 | Das System muss Nutzenden die Möglichkeit bieten die Lichtfarbe von Gruppen von Smarten Leuchten einzustellen            | ✔ |
| F-037-4 | Das System muss Nutzenden die Möglichkeit bieten sich die Helligkeit von Gruppen von Smarten Leuchten ausgeben zu lassen | ✔ |

Da Rhasspy nur bekannte Wörter und Phrasen verstehen kann, ist es in F-062 nicht möglich den Szenen eigene Namen zu geben. Deshalb werden sie automatisch fortlaufend nummeriert benannt. Sie werden also als "Szene #" gespeichert.