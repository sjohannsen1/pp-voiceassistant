---
title: Chatbot - Anforderungen
permalink: /docs/method/bot/requirements/
---

## Nichtfunktionale Anforderungen

| Identifikator | Beschreibung                                                                     | Umgesetzt |
|---------------|----------------------------------------------------------------------------------|:-----------:|
| NF-006        | Das System muss auch bei schlechten Geräuschverhältnissen funktionstüchtig sein | ✔         |
| NF-007        | Das System muss eine alternative Interaktionsmöglichkeit bereitstellen           | ✔         |


## Funktionale Anforderungen

| Identifikator | Beschreibung                                                                                            | Umgesetzt |
|---------------|---------------------------------------------------------------------------------------------------------|:-----------:|
| F-001         | Das System muss eine Schnittstelle zur nonverbalen Kommunikation bieten                                 | ✔         |
| F-001-1       | Das System muss eine Schnittstelle zur schriftlichen Interaktion bieten                                 | ✔         |
| F-001-2       | Das System muss alle Ausgaben auch schriftlich tätigen können                                           | ✔         |
| F-001-3       | Das System muss eine Möglichkeit bieten rein schriftliche Ausgaben zu tätigen                           | ✔         |
| F-001-4       | Das System muss Nutzenden die Möglichkeit bieten ausgewählte Informationen auch schriftlich zu erhalten | ✔         |
| F-002         | Das System muss eine Schnittstelle zum Hinzufügen von Einträgen in Konfigurationsdateien bieten         | ➖         |
| F-003         | Das System muss eine Schnittstelle bieten um Ausgaben zeitverzögert sehen zu können                     | ✔         |
| F-004         | Das System muss Nutzenden diese Schnittstelle optional zur Verfügung stellen                            | ✔         |
| F-005         | Das System muss allen Nutzenden diese Schnittstelle gleichzeitig zur Verfügung stellen                  | ✔         |


Die Funktion F-002 wurde zwar umgesetzt, allerdings sollte eine Überprüfung der Daten vorgenommen werden bevor diese in den Dateien gespeichert werden. <br>