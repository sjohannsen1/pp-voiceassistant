---
title: Rhasspy
permalink: /docs/client/rhasspy/
---

## Neue Intents hinzufügen
**Problem: Wie hinterlegt man die Intents eines Skills bei Rhasspy, sodass die Spracherkennung und die Intent-Erkennung damit arbeiten können.**

Lösung: Ich nutze die [Rhasspy-Api](https://rhasspy.readthedocs.io/en/latest/reference/#http-api), um neue Intents zu hinterlegen und Rhasspy neu zu trainieren.
### Sätze
Neue Sätze/Intents kann man unter ``http://<host-ip>:12101/api/sentences`` registrieren.  
Diese werden dann unter ``<Pfad des Profils>/intents/<Intentname>`` gespeichert.  
Dazu werden folgende Daten an obigen Endpoint gepostet:
````json
{
  "intents/<Name des Intents>.ini" : "[<Name des Intents>]\n<Sätze jeweils mit '\n' separiert>"
}
````

### Slots
Neue Slots kann man unter ``http://<host-ip>:12101/api/slots`` registrieren.  
Dazu werden folgende Daten an obigen Endpoint gepostet:
````json
{
  "slots/<Name des Slots>": [
    "<Alternative 1>", 
    "<Alternative 2>",
    "<Alternative 3>",
    
    "<Alternative n>"
  ]
}
````

## Rhasspy trainieren
Um die Änderungen wirksam zu machen, muss man nach den obigen Anfragen eine weitere Anfrage an folgenden Endpoint senden: ``http://<host-ip>:12101/api/train``


## Base/Satellite
Für die Arbeit an diesem Projekt brauchte ich eine Rhasspy Instanz, mit der ich meinen Code testen konnte.  
Da ich mir vor ein paar Monaten einen [Docker-Swarm](https://docs.docker.com/engine/swarm/) Cluster aus mehreren [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) gebaut habe, habe ich mich dazu entschlossen, Rhasspy in einem [Base/Satellite-Setup](https://rhasspy.readthedocs.io/en/latest/tutorials/#server-with-satellites) zu betreiben.  

[//]: #basesatellite (TODO my test todo item)

