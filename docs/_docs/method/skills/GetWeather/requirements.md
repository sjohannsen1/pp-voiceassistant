---
title: Anforderungen
permalink: /docs/method/skills/GetWeather/requirements/
---

Der GetWeather Skill muss den vorher festgelegten Anforderungen genügen. Hier sind diese sortiert ausgeführt. Falls diese nicht implementiert wurden, ist dies mit einem Kreuz markiert. Mit einem Strich sind Anforderungen markiert, welche zwar erfüllt werden, aber noch verbessert werden könnten. 

## Nichtfunktionale Anforderungen

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|--------|------------------------------------------------------------------------|:---:|
| NF-003 | Die Sprach-zu-Text Komponente muss auf deutsche Sprache ausgelegt sein | ✔ |
| NF-004 | Die Skills müssen sprachunabhängig entwickelt werden                   | ✔ |
| NF-005 | Die Skills müssen unabhängig von einander Funktionieren                | ✔ |

Der Skill ist zwar sprachunabhängig implementiert, allerdings sind die Wetterwarnungen ausschließlich auf Deutschland bezogen. Es wird zur Ermittlung der Warnungen Informationen des Bundesamt für Bevölkerungsschutz und Katastrophenhilfe genutzt. Diese Behörde veröffentlicht lediglich Warnungen zu Deutschland heraus. Es hätte hier eine API für gesammelte Warnungen für mehrere Länder genutzt werden, allerdings wurde davon abgesehen da diese aus einen inoffiziellen Quelle stammen würden. Falls diese Funktion im Ausland genutzt werden sollte, müsste diese angepasst werden. 


## Funktionale Anforderungen

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---:|
| F-070   | Das System muss Nutzenden die Möglichkeit bieten sich das aktuelle Wetter ausgeben zu lassen                                                                        | ✔ |
| F-071   | Das System muss Nutzenden die Möglichkeit bieten sich das aktuelle Wetterwarnungen ausgeben zu lassen                                                               | ✔ |
| F-072   | Das System muss Nutzenden die Möglichkeit bieten sich Wettervorhersagen für einen eigens bestimmten Tag ausgeben zu lassen                                          | ✔ |
| F-073   | Das System muss Nutzenden die Möglichkeit bieten sich auf markantes Wetter für einen eigens bestimmten Tag hinweisen zu lassen                                      | ✔ |
| F-074   | Das System soll Nutzenden die Möglichkeit bieten sich auf Niederschlag in einem eigens festgelegten Zeitraum hinweisen zu lassen                                    | ✔ |
| F-074-1 | Das System kann Nutzenden die Möglichkeit bieten sich auf Regen in einem eigens festgelegten Zeitraum hinweisen zu lassen                                           | ➖ |
| F-074-2 | Das System kann Nutzenden die Möglichkeit bieten sich auf Schnee in einem eigens festgelegten Zeitraum hinweisen zu lassen                                          | ➖ |
| F-076   | Das System soll Nutzenden die Möglichkeit bieten sich auf Unterschreitung einer gewählten Grenztemperatur in einem eigens festgelegtem Zeitraum hinweisen zu lassen | ✔ |

F-074-1 und F-074-2 wurden nicht einzeln implementiert. Regen und Schnee sind zu Niederschlag zusammengefasst worden, da die API dies auch so berichtet. Als Verbesserung könnte eine andere API verwendet werden oder die Niederschlagswahrscheinlichkeit mit der Wettervorhersage verglichen werden.