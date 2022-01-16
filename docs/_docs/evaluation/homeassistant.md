---
title: Home Assistant
permalink: /docs/evaluation/home-assistant/
---

Bei Home Assistant handelt es sich zwar nicht um einen Sprachassistenten, allerdings gibt es auch hier ein modulares System, um neue Funktionen hinzuzufügen.  


## Ordnerstruktur

Bei Home Assistant befinden sich alle Dateien, die zu einer Integration gehören in einem Verzeichnis, welches mit der Domain benannt ist.  
Die Domain ist in dem Fall ein einzigartiger Name, über den die Integration eindeutig identifizierbar ist.  

````
<Integration-Domain>   
├── manifest.json
└── __init__.py
````

In diesem Verzeichnis müssen lediglich zwei Dateien vorhanden sein:  

- ``manifest.json``: Beschreibt die Integration und gibt einige Abhängigkeiten an.
- ``__init__.py``: Pythoncode, der ausgeführt wird.  

Grundsätzlich wird eine Integration in der Sprache [Python](https://www.python.org/) (.py) geschrieben.  


````
<Integration-Domain>   
├── manifest.json
├── <Dateien für Geräteintegration (.py)>
├── <Dateien für Serviceintegration (.yaml)>
└── __init__.py
````

[//]: # (TODO weiterschreiben)

## Manifest

Wie in der Ordnerstruktur beschrieben, benötigt jede Integration eine Datei mit dem Namen ``manifest.json``.   

````json
{
  "domain": "your_domain_name",
  "name": "Your Integration",
  "documentation": "https://www.example.com",
  "dependencies": [],
  "codeowners": [],
  "requirements": [],
  "iot_class": "cloud_polling"
}
````
*Beispieldatei aus der offiziellen [Dokumentation](https://developers.home-assistant.io/docs/creating_integration_manifest/)*


In dieser Datei befinden sich einige Informationen über die Integration: 
- ``domain``: Eindeutig identifizierbarer Name der Integration und Name des Verzeichnisses.
- ``name``: Anzeigename in HomeAssistant.
- ``documentation``: Link zur Dokumentation der Integration.
- ``dependencies``:  Abhängigkeiten von anderen 
- ``codeowners``:  GitHub-Usernames oder Teamnamen, der Leute, die die Integration erstellt haben.
- ``requirements``:  Python libraries, die von der Integration genutzt werden.
- ``iot_class``:  Beschreibt die Art, mit der sich die Integration mit Geräten und Diensten verbindet.

Es gibt noch mehr mögliche Angaben.  
Eine ausführliche Liste gibt es [hier](https://developers.home-assistant.io/docs/creating_integration_manifest/).  

## Entity-System 

Damit nicht für jede Integration alles neu entwickelt werden muss, stellt Home Assistant ein sehr modulares und sehr komplexes Entity-System zur verfügung.  
Damit kann auf sehr viele Verschiedene Smart Home Geräte und Dienste zugreifen.  
Man kann jedoch auch eigene Entities erstellen.  

## Quellen 

[Home Assistant Docs](https://developers.home-assistant.io/docs/development_index)