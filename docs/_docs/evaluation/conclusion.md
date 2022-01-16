---
title: Zwischenfazit
permalink: /docs/evaluation/conclusion/
---

Basierend auf meiner Recherche zu den drei verschiedenen Systemen (Amazon Alexa, Google Assistant und Home Assistant), habe ich versucht die für mich jeweils passenden Herangehensweisen zu übernehmen und zu kombinieren.  
Ich habe mich dazu entschlossen sowohl den Befehlsaufbau, als auch einige Teile der Ordnerstruktur zu übernehmen.  

## Befehlsstruktur

Mein Befehlsaufbau gleicht daher dem von Alexa und dem Google Assistant:  
``<wake word>, <launch> <Invocation name> <utterance>``
Bei obigen Sprachassistenten gibt es einige Variationen in der Reihenfolge, allerdings müssen die einzelnen Teile immer vorhanden sein und ein Befehl mit dem Wake Word beginnen.  
Letzteres wird auch von Rhasspy vorausgesetzt, da der Sprachassistent nicht dauerhaft auf jeden Befehl hören soll, sondern erst wenn er mit dem Wake Word "aufgeweckt" wird.  


## Orderstruktur

Ein Großteil meines Systems ähnelt dem System von Amazon.  
So teile auch ich die verschiedenen Sprachen in einzelne Dateien mit der jeweiligen ``locale``-Bezeichnung auf (``de_DE.json`` für Deutsch).  
Diese Dateien befinden sich in dem Verzeichnis ``<SkillName>/<SkillVersion>/locales``.   
Im verzeichnis ``<SkillName>/<SkillVersion>/src`` befindet sich mein Code, welcher in JavaScript geschrieben ist, da mir diese Sprache liegt und ich in der Vergangenheit auch schon andere Projekte mit NodeJS realisiert habe.  
Wie alle anderen Systeme auch, stelle ich ein sdk zur verfügung, welches sich in erster Linie um die kommunikation mit Rhasspy kümmert, aber auch einige Funktionen meines eigenen Systems bietet (mehr dazu [hier](./../skill/sdk.md)).  
Für einige Metadaten und Abhängigkeiten habe ich mich dazu entschlossen, eine ``manifest.json`` ähnlich der des Home Assistant vorauszusetzen.  
In dieser Datei befinden sich Angaben zum Skill, des Abhängigkeiten anderer "npm-packages" und Angaben zu vom Nutzer änderbaren Optionen.


[//]: # ()
[//]: # (- am ehesten an alexa angelehnt)

[//]: # (- )