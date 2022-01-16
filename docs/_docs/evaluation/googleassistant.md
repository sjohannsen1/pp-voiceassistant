---
title: Google Assistant
permalink: /docs/evaluation/google-assistant/
---

Beim Google Assistant heißen die Funktionen Google Actions.  
Actions können auf viele verschiedene Arten erstellt und verwendet werden.  

## Befehlsstruktur

Bei Google Actions gibt es keine "richtige" Befehlsstruktur, vielmehr verschiedene Varianten einen Satz zu interpretieren.  
Google nutzt nämlich ein NLU-Technik (**N**atural **L**anguage **U**nderstanding) um aus einem Set aus Sätzen ein KI-Modell zu trainieren.  
Anhand dieses Modells kann der Google Assistant dann ermitteln, um welche Action es sich handelt.  
Als Entwickler muss man mindestens zehn verschiedene Varianten eines Intents angeben.  

[//]: # (``<wake word>, <launch> <Invocation name> <utterance>``)

## Ordnerstruktur 

````
<Action-Verzeichnis>   
│
├── actions/
├── custom/
│   ├── global/
│   ├── intents/
│   ├── scenes/
│   └── types/
├── settings/
└── manifest.yaml
````

## Entwicklung

Google Actions basiert auf Javascript und verwendet einige Firebase-Ressourcen.  
Es gibt viele verschiedene Möglichkeiten, Google Actions zu erstellen.  
Von Google werden zwei Varianten empfohlen:
- Mit der Actions Console
- Mit dem Actions-SDK

[//]: # (TODO link zur actions console)
[//]: # (TODO link zum actions sdk)

### Actions Console

Bei Actions Console handelt es sich um eine UI-Basierte IDE, welche sofort über einen Browser abrufbar ist.  
Hier kann man dann neue Projekte erstellen.  
Dazu wählt man zu Beginn eine aus fünf verschiedenen Kategorien aus.  
Diese Kategorien sind ``Smart Home``, ``Food Ordering``, ``Game``, ``Story Telling`` und ``Education``.  
Dabei erstellt Google ein vorgefertigtes Template, bei dem bereits einige Intents und Antworten hinterlegt sind.   
Man hat jedoch auch die Möglichkeit ein leeres Projekt anzulegen, wenn keine der Kategorien auf die Anwendung passt.  
Dazu wählt man ``Custom``.
  
Egal wie man seine Anwendung entwickeln möchte, dieser Erstellungsprozess ist für alle Varianten gleich.  
In der Actions Console kann man sehr schnell die individuelle Action erstellen.  
Die IDE ist sehr stark UI-basiert und man hat für jede Option einen Button oder ein Eingabefeld.  
Dadurch können jedoch auch einige Limitationen in der Funktion der Action entstehen.  


### Actions-SDK

Beim Actions-SDK handelt es sich in erster Linie um ein CLI, welches der Erstellung und Synchronisation einer Action dient.  
Beim Code selbst handelt es sich um ``.yaml``-Dateien, welche je nach Verzeichnis und gesetzter Variablen zum Beispiel eine Szene, ein Intent oder ein Slot sein kann.  
Sämtliche Einstellungen in der Actions Console sind Darstellungen jener ``.yaml``-Dateien.  

### Sonstige Möglichkeiten

Möchte man keine der Beiden oben genannten Möglichkeiten nutzen, so kann man die Action auch mittels Dialogflow oder einem eigenen Server umsetzten.  
Um den eigenen Server zu nutzen, kann man in der Actions Console einen Webhook definieren, an welchen dann die Daten gesendet werden.  
Als Backend kann man dann sämtliche Sprachen verwenden, die Webhooks unterstützen.  


