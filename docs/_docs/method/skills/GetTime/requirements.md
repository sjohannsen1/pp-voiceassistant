---
title: GetTime - Anforderungen
permalink: /docs/method/skills/GetTime/requirements/
---

Der GetTime Skill muss den vorher festgelegten Anforderungen genügen. Hier sind diese sortiert ausgeführt. Falls diese nicht implementiert wurden, ist dies mit einem Kreuz markiert. Mit einem Strich sind Anforderungen markiert, welche zwar erfüllt werden aber noch verbessert werden könnten. 

## Nichtfunktionale Anforderungen

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|--------|------------------------------------------------------------------------|:---:|
| NF-003 | Die Sprach-zu-Text Komponente muss auf deutsche Sprache ausgelegt sein | ✔ |
| NF-004 | Die Skills müssen sprachunabhängig entwickelt werden                   | ✔ |
| NF-005 | Die Skills müssen unabhängig von einander Funktionieren                | ✔ |


## Funktionale Anforderungen für Wecker

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|---------------|---------------------------------------------------------------------------------------------------------------|:---------:|
| F-010         | Das System muss Nutzenden die Möglichkeit bieten einen Wecker zu stellen                                      | ✔         |
| F-011         | Das System muss Nutzenden die Möglichkeit bieten den Wecker an eigens Festgelegten Zeitpunkten zu wiederholen | ✔         |
| F-012         | Das System muss Nutzenden die Möglichkeit bieten gespeicherte Wecker anzuzeigen                               | ✔         |
| F-013         | Das System muss Nutzenden die Möglichkeit bieten gestellte Wecker anzuzeigen                                  | ✔         |
| F-014         | Das System muss Nutzenden die Möglichkeit bieten Wecker zu aktivieren                                         | ✔         |
| F-015         | Das System muss Nutzenden die Möglichkeit bieten Wecker zu deaktivieren                                       | ✔         |
| F-016         | Das System muss zur ausgewählten Uhrzeit den Nutzenden durch ein Tonsignal wecken                             | ✔         |
| F-017-1       | Das System muss Nutzenden die Möglichkeit bieten das Tonsignal auszuwählen                                    | ✔         |
| F-017-2       | Das System kann Nutzenden die Möglichkeit bieten die Lautstärke des Tonsignal festzulegen                     | ✔         |
| F-017-3       | Das System soll Nutzenden die Möglichkeit bieten das Tonsignal für ein bestimmtes Zeitintervall auszuschalten | ✔         |
| F-017-4       | Das System muss nach Ablauf des Zeitintervalls das Tonsignal erneut abspielen                                 | ✔         |

## Funktionale Anforderungen für Timer

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|---------|---------------------------------------------------------------------------------------------------|:---:|
| F-020   | Das System muss Nutzenden die Möglichkeit bieten eine Zeitschaltuhr zu stellen                    | ✔ |
| F-020-1 | Das System muss Nutzenden die Möglichkeit bieten gestellte Zeitschaltuhren abzufragen             | ✔ |
| F-020-2 | Das System muss Nutzenden die Möglichkeit bieten eine gestellte Zeitschaltuhr zu verlängern       | ✔ |
| F-023   | Das System muss Nutzenden die Möglichkeit bieten sich die verbleibende Zeit ausgeben zu lassen    | ✔ |
| F-024   | Das System muss Nutzenden bei Ablauf der Zeitschaltuhr durch ein Tonsignal benachrichtigen        | ✔ |
| F-024-1 | Das System soll Nutzenden die Möglichkeit bieten bei Ablauf der Zeitschaltuhr diese zu Verlängern | ✔ |
| F-025   | Das System muss Nutzenden die Möglichkeit bieten die Zeitschaltuhr vor Ablauf zu löschen          | ✔ |
| F-026   | Das System muss Nutzenden die Möglichkeit bieten die Zeitschaltuhr vor Ablauf anzuhalten          | ✔ |
