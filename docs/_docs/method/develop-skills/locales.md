---
title: Locales
permalink: /docs/method/develop-skills/locales/
---

Der Aufbau einer locale Datei hat sich geändert. Wie genau diese erstellt werden, ist [hier von Finn Wehn erklärt](https://fwehn.github.io/pp-voiceassistant/docs/create-skills/locales/). Hier werden lediglich die Änderungen festgehalten. <br>

## Beispiel: Lists

```
{
  "invocation": "Listen",
  "description": "Ein Skill um Listen zu erstellen und zu verwalten",
  "intents": [
    {
      "sentences": ["Exportiere [ die Liste ] ($slots/list_names){list_names}", "schicke  [ die liste ] ($slots/list_names){list_names} an ( mein Handy | meinen Bot | meinen Rechner | meinen Computer )"],
      "function": "exportList",
      "args": ["list_names"],
      "answer": ["Ok exportiert", "# Inhalt: #", "#: Noch kein Inhalt vorhanden"],
      "fail": ["Die Liste # existiert nicht"]
    },
  ],
   "slots": {
    "list_items": ["_"],
    "list_names": ["_"]
  }
}
```
*Ausschnitt aus [Lists/de_DE.json](../../../../src/client/skills/Lists/1.0/locales/de_DE.json)*

## Intents

### Answer

Wenn Funktionen eine Antwort zurückgeben, sollten alle Antwortmöglichkeiten hier definiert werden. Falls Daten aus der Funktion in die Antwort eingefügt werden sollen, werden diese Stellen mit Platzhaltern (hier: #) markiert. So wird die Sprachneutralität gewährleistet. <br> 
Bei diesem Beispiel existieren drei Antwortmöglichkeiten. Die Erste wird bei Erfolg der Funktion ausgegeben. Mit der Zweiten wird die Antwort an den Bot definiert. Diese wird mit dem Listennamen und dem Inhalt gefüllt. Die Dritte wird ausgegeben, falls die Liste noch leer ist und enthält den Namen der Liste. 

### Fail

Hier muss eine Liste an Fehlermeldungen angegeben werden. Diese können genauso wie die Antworten mit Daten aus der Funktion befüllt werden. <br>
Die Fehlermeldung wird hier ausgegeben, falls die erforderte Liste nicht existiert. Dabei wird der Name der Liste mit ausgegeben.

### Slots

Dort werden alle Slots, welche von einem Skill benötigt werden, definiert. Die Slots können dabei [Substitutionen](https://rhasspy.readthedocs.io/en/latest/training/#substitutions) enthalten. <br>
In diesem Beispiel werden zwei dynamische Slots verwendet. Diese müssen hier initialisiert werden, da Rhasspy sonst abbricht. Die Initialwerte sind dabei egal, denn bei Aktivierung des Skills oder des Systems werden die Konfigurationsdateien ausgelesen und die Slots mit diesen Werten gefüllt.