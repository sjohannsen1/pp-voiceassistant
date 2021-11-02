---
title: Struktur
permalink: /docs/structure/
---

## Aufbau eines Befehls

Basierend auf dem Befehls-Aufbau von [Alexa](./../evaluation/amazonalexa.md) und dem [Google Assistant](./../evaluation/googleassistant.md) habe ich mich dazu entschlossen, einen sehr ähnlichen, wenn nicht sogar den gleichen Aufbau vorauszusetzen.  
Daher sieht der Aufbau der Befehle wie folgt aus:

``<Wake Word> <Launch> <Invocation> <Utterance>``

- ``Wake Word``: Das Wake Word ist das Wort, mit welchem man den Sprachassistenten "aufwecken" kann. Dieses wird von Rhasspy vorausgesetzt.
- ``Launch``: Hierbei handelt es sich um eine Sammlung an Füllwörtern, welche in der [``defaults.js``](https://github.com/fwehn/pp-voiceassistant/blob/main/src/client/defaults.json) definiert wurden.
- ``Invocation``: Das ist der Name, mit dem man den Skill auswählt, z.B. ``Hallo Welt`` für [HelloWorld](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/public/HelloWorld/latest/src/index.js).
- ``Utterance``: Utterance ist der Unterbefehl, welcher die einzelnen Funktionen eines Skills darstellt.

## Ordnerstruktur eines Skills

Ich habe mich für folgende Ordnerstruktur am Beispiel des [HelloWorld](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/public/HelloWorld/latest/src/index.js) Skills entschieden.

```
HelloWorld   
│
├── latest
│   ├── manifest.json
│   │
│   ├── locales
│   │   ├── de_DE.json
│   │   └── en_US.json
│   │
│   └── src
│       └── index.js
│
└── <other-version-tag>
    ...
```

Jede Version eines Skills wird durch einen Ordner dargestellt.  
In jedem diese Ordner gibt es eine ``manifest.json`` und die beiden Unterordner ``src`` und ``locales``.  
In der ``manifest.json`` werden für den Skill wichtige Angaben gespeichert, wie z.B. verschiedene [npm-dependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies), die für den Skill benötigt werden.


Im Unterordner ``locales`` befinden sich die Dateien, welche den Aufbau eines Befehls definieren. Dabei handelt es sich bei jeder Datei um eine jeweilige Sprache bzw. Lokalisierung. 

``de_DE.json`` -> deutscher Befehl  
``en_US.json`` -> amerikanisches Englisch  

Die Dateien sind im JSON Format geschrieben.  
Den Aufbau einer solchen Datei findet man [hier](./locales.md).

Im Unterordner ``src`` befindet sich der gesamte Code des Befehls.  


