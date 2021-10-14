---
title: Rhasspy
permalink: /docs/rhasspy/
---

# Neue Intents

**Problem: Wie hinterlegt man die Intents eines Skills bei Rhasspy, sodass die Spracherkennung und die Intent-Erkennung damit arbeiten können.**  

Lösung: Ich nutze die [Rhasspy-Api](https://rhasspy.readthedocs.io/en/latest/reference/#http-api), um neue Intents zu hinterlegen und Rhasspy neu zu trainieren.

## Neue Intents hinzufügen
### Sätze
Neue Sätze/Intents kann man unter ``http://<host-ip>:12101/api/sentences`` registrieren.  
Diese werden dann unter ``<Pfad des Profils>/intents/<Intentname>`` gespeichert.  
Dazu werden folgende Daten an obigen Endpoint gepostet:
````json
{
  "intents/<Name des Intents>.ini" : "[<Name des Intents>]\n<Sätze mit '\n' separiert>"
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
    
    "Alternative n"
  ]
}
````

## Rhasspy trainieren
Um die Änderungen wirksam zu machen, muss man nach den obigen Anfragen eine weitere Anfrage an folgenden Endpoint senden: ``http://<host-ip>:12101/api/train``
