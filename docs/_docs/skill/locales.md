---
title: Locales
permalink: /docs/skills/locales/
---

Im Folgenden ist der Aufbau einer Locale-Datei, also einer Datei die zur Lokalisierung aber auch zur Definition des Aufbaus eines Befehls dient, beschrieben.  
Es werden die benötigten Angaben und deren Funktion erklärt.  


## Beispiel

Ich erkläre die Funktionen und Begriffe anhand folgenden Beispiels aus dem HelloWorld-Skill:  

````json
{
  "invocation": "Hallo Welt",
  "subcommands": [
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
*[HelloWorld/de_DE.json](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/skills/HelloWorld/1.0/locales/de_DE.json)*

## Invocation
Dieser Punkt bezeichnet den Namen des Befehls, unter dem man den Befehl ansprechen kann.  
Hier ist das "Hallo Welt".  
Man kann auch Invocation Names übersetzten.  
In der [``en_US.json``](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/skills/HelloWorld/1.0/locales/en_US.json) ist dieser Name zum Beispiel als "Hello World" definiert.  


## Subcommands
Unter diesem Punkt sind alle Unterbefehle aufgeführt.  
Jeder Befehl wird durch die folgenden Unterpunkte definiert:

### Utterance
Dies definiert den Aufbau des Unterbefehls.  
Die Syntax richtet sich dabei ganz nach der von [Rhasspy](https://rhasspy.readthedocs.io/en/latest/training/).  
Hier werden die [Slots](#slots) eingebunden, welche weiter unten definiert, und von der [Funktion](#function) verwendet werden.

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



