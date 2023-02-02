---
title: PlayMusic - Anforderungen
permalink: /docs/method/skills/PlayMusic/requirements/
---

Der Skill PlayMusic muss den vorher festgelegten Anforderungen genügen. Aufgrund sowohl ihrer inhaltlichen als auch funktionalen Ähnlichkeit wurden F-04 und F-05 zu einem Skill zusammengefasst. Hier sind diese sortiert ausgeführt. Falls diese nicht implementiert wurden, ist dies mit einem Kreuz markiert. Mit einem Strich sind Anforderungen markiert, welche zwar erfüllt werden, aber noch verbessert werden könnten. 

## Nichtfunktionale Anforderungen

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|--------|------------------------------------------------------------------------|:---:|
| NF-003 | Die Sprach-zu-Text Komponente muss auf deutsche Sprache ausgelegt sein | ✔ |
| NF-004 | Die Skills müssen sprachunabhängig entwickelt werden                   | ➖ |
| NF-005 | Die Skills müssen unabhängig von einander Funktionieren                | ✔ |

Die Anforderung NF-004 ist bedingt durch die Sprachabhängigkeit der Sender nur teilweise erfüllt. Diese publizieren Informationen zum aktuell gesendeten nur auf der Sprache des Programms. Das Parsen dieser Informationen lässt sich deshalb leider nicht sprachunabhängig umsetzen. Alle restlichen Sprachbefehle erfüllen NF-004.


## Funktionale Anforderungen für Musik

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|-------|-----------------------------------------------------------------------------------------------------|:---:|
| F-040 | Das System muss Nutzenden die Möglichkeit bieten Musik einzuschalten                                | ✔ |
| F-041 | Das System muss Nutzenden die Möglichkeit bieten Musik auszuschalten                                | ✔ |
| F-042 | Das System muss Nutzenden die Möglichkeit bieten einzelne Lieder auszuwählen                        | ✔ |
| F-043 | Das System muss Nutzenden die Möglichkeit bieten Lieder zur Abspielung zur Verfügung zu stellen     | ✔ |
| F-044 | Das System muss Nutzenden die Möglichkeit bieten sich alle abspielbaren Lieder auszugeben           | ✔ |
| F-045 | Das System muss Nutzenden die Möglichkeit bieten sich ausgeben zu lassen was gerade abgespielt wird | ✔ |

## Funktionale Anforderungen für Radio

| Identifikator | Beschreibung                                                                                                  | Umgesetzt |
|-------|----------------------------------------------------------------------------------------------------------------|:---:|
| F-050 | Das System muss Nutzenden die Möglichkeit bieten Radio einzuschalten                                           | ✔ |
| F-051 | Das System muss Nutzenden die Möglichkeit bieten Radio auszuschalten                                           | ✔ |
| F-052 | Das System muss Nutzenden die Möglichkeit bieten Radiosender zu wechseln                                       | ✔ |
| F-053 | Das System muss Nutzenden die Möglichkeit bieten ein Radiosender auszuwählen                                   | ✔ |
| F-054 | Das System muss Nutzenden die Möglichkeit bieten ein Radiosender hinzuzufügen                                  | ✔ |
| F-055 | Das System muss Nutzenden die Möglichkeit bieten sich verfügbare Radiosender anzeigen zu lassen                | ✔ |
| F-056 | Das System muss Nutzenden die Möglichkeit bieten sich ausgeben zu lassen was gerade abgespielt wird            | ✔ |
| F-057 | Das System muss Nutzenden die Möglichkeit bieten sich ausgeben zu lassen welcher Sender gerade abgespielt wird | ✔ |
