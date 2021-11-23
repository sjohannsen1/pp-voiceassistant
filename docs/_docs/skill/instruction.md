---
title: Anleitung
permalink: /docs/skills/instruction/
redirect-from:
- /docs/skills/locales/instruction.md
- /docs/skills/sdk/instruction.md
- /docs/client/skills/instruction.md
- /docs/evaluation/skills/instruction.md
---

## Aufbau eines Befehls

Basierend auf dem Befehls-Aufbau von [Alexa](./../evaluation/amazonalexa.md) und dem [Google Assistant](./../evaluation/googleassistant.md) habe ich mich dazu entschlossen, einen sehr ähnlichen, wenn nicht sogar den gleichen Aufbau vorauszusetzen.  
Daher sieht der Aufbau der Befehle wie folgt aus:

``<Wake Word> <Launch> <Invocation> <Utterance>``

- ``Wake Word``: Das Wake Word ist das Wort, mit welchem man den Sprachassistenten "aufwecken" kann. Dieses wird von Rhasspy vorausgesetzt.
- ``Launch``: Hierbei handelt es sich um eine Sammlung an Füllwörtern, welche in der [``defaults.js``](https://github.com/fwehn/pp-voiceassistant/blob/main/src/client/defaults.json) definiert wurden.
- ``Invocation``: Das ist der Name, mit dem man den Skill auswählt, z.B. ``Hallo Welt`` für [HelloWorld](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/public/HelloWorld/latest/src/index.js).
- ``Utterance``: Utterance ist der Unterbefehl, welcher die einzelnen Funktionen eines Skills darstellt.


## Ordner anlegen

Ich habe mich für folgende Ordnerstruktur (am Beispiel des [HelloWorld](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/public/HelloWorld/latest/src/index.js) Skills) entschieden.  
Diese ähnelt sehr stark der Struktur von Amazon.

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
In der ``manifest.json`` werden, für den Skill wichtige, Angaben gespeichert, wie z.B. verschiedene [npm-dependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies), die für den Skill benötigt werden.  
Oder Variablen, welche der Endnutzer über das [Webinterface](./../client/webinterface.md#config-variablen) einstellen soll.

Im Unterordner ``locales`` befinden sich die Dateien, welche den Aufbau eines Befehls definieren. Dabei handelt es sich bei jeder Datei um eine jeweilige Sprache bzw. Lokalisierung.

``de_DE.json`` -> deutscher Befehl  
``en_US.json`` -> amerikanisches Englisch

Die Dateien sind im JSON Format geschrieben.  
Den Aufbau einer solchen Datei findet man [hier](./locales.md).

Im Unterordner ``src`` befindet sich der gesamte Code des Befehls, welcher in JavaScript geschrieben sein muss.  
Dazu wird eine Datei mit dem Namen ``index.js`` benötigt.  
Ich habe ein [SDK](https://github.com/fwehn/pp-voiceassistant/tree/main/src/sdk) erstellt welches die Kommunikation zwischen Skill und Rhasspy übernimmt.  
Wie man dieses SDK benutzt habe ich [hier](./sdk.md) näher beschrieben.

Um die Erstellung neuer Skills zu vereinfachen, habe ich einen [Dummy](https://github.com/fwehn/pp-voiceassistant/tree/main/src/server/public/_dummy) erstellt, aus dem man leicht einen neuen Skill anlegen kann.  