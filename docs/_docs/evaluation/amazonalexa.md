---
title: Amazon Alexa
permalink: /docs/evaluation/amazon-alexa/
---

## Befehlsstruktur
Ein Befehl bei Alexa ist wie folgt aufgebaut:  
``<wake word>, <launch> <Invocation name> <utterance>``  
Was die einzelnen Teile des Befehls bedeuten, habe ich [hier](./../skill/instruction.md#aufbau-eines-befehls) etwas ausführlicher beschrieben.  



## Ordnerstruktur

````
<Skill Directory>/
├── .ask/
├── lambda/
└── skill-package/
    │── build/
    │   └── *.json files       
    │── conversations/
    │   └── *.acdl files   
    │── interactionModels/
    │   └── custom/
    │       └── < locale name >.json
    │       └── < another locale name >.json    
    │       └── ... 
    │── response
    │   │── display/
    │   │   │── < Folder for an APL document >
    │   │   │   └── document.json 
    │   │   │── < Folder for another APL document >
    │   │   │    └── document.json   
    │   │   └── < More folders for APL documents>        
    │   └── prompts/
    │       │── < Folder for an APLA document >
    │       │   └── document.json 
    │       │── < Folder for another APLA document >
    │       │    └── document.json 
    │       └── < More folders for APL documents>                 
    └── skill.json
````
*Aus der [Dokumentation](https://developer.amazon.com/en-US/docs/alexa/conversations/acdl-understand-directory-structure.html) von Alexa Conversations (Beta)*

## SDK
- was stellt das ``ask`` alles bereit?

## 
- NodeJS oder Python
- Übernehmen tue ich:
  - Befehlsaufbau
  - Aufteilung in verschiedene locales files
  - Auch ich stelle sdk bereit mit einigen utility funktionen
- nicht übernehmen tue ich:
  - aufteilung von ein- und ausgabe in verschiedene directories
  - audio format -> bei mir ist es sehr viel simpler
  - sdk ist nicht bei jedem skill extra dabei

## Quellen

[Alexa Dev Course (Ger)](https://www.youtube.com/playlist?list=PL2KJmkHeYQTNIYkWM6E4hMXZMk9PRYYn3)  
[Alexa Dev Course (Eng)](https://www.youtube.com/playlist?list=PL2KJmkHeYQTO65ko4I--OC-7CC_Cjg8sS)  