---
title: Anleitung
permalink: /docs/method/develop-skills/instruction/
---

Wie Skills für dieses System erstellt werden, hat [Finn Wehn erklärt](https://fwehn.github.io/pp-voiceassistant/docs/create-skills/instruction/). 
Da das [System iteriert wurde](../evaluation/iteration) werden die Änderungen hier erklärt.

## Konfigurations- oder Speicherdateien

Benötigt ein Skill Konfigurationsdateien oder legt während der Benutzung eine Speicherdatei an, muss dafür ein Ordner erstellt werden. 
Dort werden die Konfigurationsdateien gespeichert. 

```
HelloWorld   
│
├── 1.0
│   ├── manifest.json
│   │
│   ├── locales
│   │   ├── de_DE.json
│   │   └── en_US.json
|   |
│   ├── savefiles
|   |
│   └── src
│       └── index.js
│
└── <other-version-tag>
    ...
```
*Adaptiert aus [der Dokumentation von Finn Wehn](https://fwehn.github.io/pp-voiceassistant/docs/create-skills/instruction/)*