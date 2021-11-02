---
title: Locales
permalink: /docs/locales/
---

````json
{
  "invocation": "Hallo Welt",
  "utterances": [
    {
      "utterance": "sag ($slots/hello){hello} ($slots/world){world}",
      "function": "helloWorld",
      "args": ["hello", "world"],
      "answer": ""
    },
    {
      "utterance": "sag ($slots/hello){hello}",
      "function": "hello",
      "args": ["hello"],
      "answer": ""
    }
  ],
  "slots": {
    "hello": ["Hallo", "Guten Tag"],
    "world": ["Welt", "Erde"]
  }
}
````
*[HelloWorld/de_DE.json](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/public/HelloWorld/latest/locales/de_DE.json)*

## Invocation
Dieser Punkt bezeichnet den Namen des Befehls, unter dem man den Befehl ansprechen kann.


## Utterances
Unter diesem Punkt sind alle Unterbefehle aufgeführt.
Jeder Befehl wird durch die folgenden Unterpunkte definiert:

### Utterance
Dies definiert den Aufbau des Unterbefehls.  
Die Syntax richtet sich dabei ganz nach der von [Rhasspy](https://rhasspy.readthedocs.io/en/latest/training/).  
Hier müssen auch alle [Slots](#slots) angegeben werden, die in der [Funktion](#function) des Unterbefehls benötigt werden.  

### Function
Hier ist die Funktion angegeben, die bei der Erkennung des Befehls ausgeführt werden soll.  
Diese Funktion muss im ``src`` Verzeichnis des jeweiligen Skills, in der Datei ``index.js`` definiert und mittels ``module.exports`` von außen verfügbar gemacht werden.  

### Args
Durch die ``Slots`` werden Argumente definiert, die in einem Unterbefehl genutzt werden können.  
Die Reihenfolge der Argumente im Satz kann sich von Sprache zu Sprache unterscheiden.  
Damit man nicht für jede Sprache eine eigene Funktion definieren muss, bei der sich lediglich die Parameter-Reihenfolge unterscheidet, gibt man unter ``args`` die gewünschte Reihenfolge an.  
Die Namen müssen mit den Namen der Slots im ``utterance`` Punkt übereinstimmen.  

### Antwortsätze
Für einige Funktionen ist es hilfreich einen Antwortsatz zu definieren.  
Bei diesem Satz können, mittels des [sdk](./sdk.md#antwort-generieren), Zeichen durch im Code generiert Variablen ersetzt werden.  
Der Satz wird dann vom TTS-System ausgesprochen.

## Slots
Hier werden alle Slots definiert die Rhasspy nicht bereits kennt.  
Dazu gibt man unter dem Slot-Namen alle möglichen Werte des Slots als Array an.  
Möchte man diese Slots verwenden, muss man sie unter ``utterance`` wie folgt angeben:  
``($slots/<Name des Slots>){Variablen Name}``



