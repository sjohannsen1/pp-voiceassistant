---
title: Manifest
permalink: /docs/skills/manifest/
---

Hier wird der Aufbau der ``manifest.json`` beschrieben.  
Welche Angaben müssen vorhanden sein?  
Wie kann ich Optionen definieren und welche Typen stehen dafür bereit?  

## Beispiel
Ich werde die einzelnen Angaben an folgendem Beispiel aus dem [GetWeather](https://github.com/fwehn/pp-voiceassistant/tree/main/src/server/skills/GetWeather) Skill erklären:   

````json
{
  "version": "1.0",
  "dependencies": {
    "axios": "^0.23.0"
  },
  "options": [
    {
      "name": "APIKey",
      "type": "String",
      "default": "Enter your API-Key here, please."
    },
    {
      "name": "city",
      "type": "Number",
      "default": 51789
    },
    {
      "name": "country",
      "type": "String",
      "default": "DE"
    },
    {
      "name": "language",
      "type": "String",
      "default": "de"
    },
    {
      "name": "units",
      "type": "String",
      "default": "metric",
      "choices": ["standard","metric", "imperial"]
    }
  ]
}
````
*[skills/GetWeather](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/skills/GetWeather/1.0/manifest.json)*

## Version
Unter dem Punkt ``version`` steht ganz einfach der Tag der jeweiligen Version des Skills.  
Dieser Tag sollte mit dem Verzeichnis der jeweiligen Version übereinstimmen.   

## Abhängigkeiten
Unter ``dependencies`` stehen alle vom Skill benötigten Abhängigkeiten.   
Dabei handelt es sich bei diesen Abhängigkeiten um [npm-Dependencies]().   
Zurzeit müssen diese noch manuell installiert werden, das soll jedoch in Zukunft automatisch passieren.

[//]: # (TODO link zu dependencies)

## Optionen
Damit man den eigenen Skill auf die Bedürfnisse des jeweiligen Endnutzers anpassen kann, gibt es die Optionen.  
Diese können unter dem Punkt ``options`` definieren.  
Später können diese Optionen dann über das [Webinterface] angepasst werden.  
In obigem Beispiel kann man dann zum Beispiel einen eigenen API-Key oder den eigenen Wohnort angeben.  
  
Um eine Option zu definieren, muss man drei Felder definieren:  
- ``name``: Der Name, der im Webinterface steht und unter dem man im Code die Option auslesen kann.
- ``type``: Das bestimmt den Typen der Option, z.B. ``String`` oder ``Number``.  
- ``default``: Beschreibt den Standardwert, welcher durch den Entwickler vorgegeben werden kann.

[//]: # (TODO Typen auflisten und choices)