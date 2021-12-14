---
title: Willkommen
permalink: /docs/home/
redirect_from: /docs/index.html
---

## Worum geht's?
In diesem Praxisprojekt geht es darum, für die Opensource-Lösung Rhasspy ein modulares System für die einfache Erstellung neuer Funktionen zu entwickeln.  
Das System soll einer vereinfachten Version von [Amazons Skills-System](https://www.amazon.de/b?ie=UTF8&node=10068460031) ähneln.  
Dazu soll eine Anwendung lokal auf dem Rhasspy-Host laufen, welche dann wiederum mittels eines Skillservers oder durch lokale Installation neue Funktionen für den Sprachassistenten zur Verfügung stellt.  
Für etwaige Entwickler soll es möglichst leicht sein, neue Skills zu entwickeln und zu testen.  
Dazu stelle ich ein SDK (Software Development Kit) zur Verfügung, welches einige nützliche Funktionen enthält, die die Entwickler nutzen können (wie z.B. eine Funktion für die Sprachausgabe).  
Für den jeweiligen Endnutzer stellt das System neben dem CLI (Command Line Interface) auch ein Webinterface zur Verfügung, um möglichst leicht neue Skills zu finden, zu installieren und zu verwalten.  

[//]: # (TODO links zu den jeweiligen genannten seiten einfügen)

## Installation
Voraussetzung für die unten genannten Schritte sind eine [Rhasspy-Instanz](https://rhasspy.readthedocs.io/en/latest/installation/) und ein [MQTT-Broker](https://mqtt.org/software/#servers-brokers) (in meinem Fall ein [Mosquitto-Broker](https://mosquitto.org/)).  
  
Dieses Projekt umfasst zwei NodeJS-Projekte: Den Skillmanager (Client) und einen Skillserver.  
Der Skillserver ist dabei rein optional. Er stellt eine Möglichkeit dar Skills zu [installieren](./client/skillmanager.md#online).  
Beide Applikationen können auf demselben Host installiert werden wie Rhasspy, müssen es jedoch nicht.  
Lediglich der Client benötigt eine Verbindung zur Rhasspy-Instanz.

### Client

Für die Installation des Clients gibt es zwei verschiedene Möglichkeiten: 
- Mit [NodeJS bzw. npm](#nodejs)
- Mit [Docker](#docker)


#### NodeJS
Zunächst muss man [NodeJS](https://nodejs.org/en/download/) (in meinem Fall version "17.0.0") installieren.  
Dann kann man sich die Verzeichnisse ["src/client"](https://github.com/fwehn/pp-voiceassistant/tree/main/src/client) und ["src/sdk"](https://github.com/fwehn/pp-voiceassistant/tree/main/src/sdk) herunterladen.  
Ich empfehle dabei die Ordnerstruktur beizubehalten, da das SDK im [``package.json``] des Clients als ``dependency`` mit einem relativen Pfad angegeben ist.  
Dieser lässt sich jedoch leicht ändern, möchte man das SDK an einer anderen Stelle ablegen.  

Hat man alle benötigten Verzeichnisse heruntergeladen, muss man noch eine JSON-Datei mit dem Namen ``skillCOnfigs.json`` im Verzeichnis des Clients anlegen, die ein leeres JSON objekt (``{}``) enthält.  

#### Docker
Im Verzeichnis ["src"](https://github.com/fwehn/pp-voiceassistant/tree/main/src) befindet sich ein [Dockerfile](https://github.com/fwehn/pp-voiceassistant/blob/main/src/Dockerfile), welches der erstellung eines Docker-Images dient.  
Die Pfade im Dockerfile müssen ggf. Angepasst werden.  

[//]: # (TODO anleitung zum erstellen eines images/containers verlinken/erstellen)

#### Env-Variablen

Damit man den Client in der eigenen individuellen Umgebung nutzen kann, gibt es einige Umgebungsvariablen (unter NodeJS .env):  

- ``SERVER``: Adresse des Skillservers (default: ``localhost:3000``)
- ``RHASSPY``: Adresse der Rhasspy-Instanz (default: ``localhost:12101``)
- ``PORT``: Port, über den das Webinterface erreichbar sein soll (default: ``12102``)
- ``MQTTHOST``: Adresse des MQTT-Brokers (default: ``localhost``)
- ``MQTTPORT``: Port, über den der MQTT-Broker erreichbar ist (default: ``1883``)
- ``LOCALE``: Sprache, auf der der Client arbeiten soll (default: ``de_DE``)

[//]: # (TODO link zu dotenv anleitung)
[//]: # (TODO beschreibungen verbessern)

### Server
#### NodeJS
#### Docker
- [Dockerfile](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/Dockerfile)
#### Env-Variablen



[//]: # (## Docker-Compose)