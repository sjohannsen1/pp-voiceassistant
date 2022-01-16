---
title: Amazon Alexa
permalink: /docs/evaluation/amazon-alexa/
---

Einer der meist verbreitetsten Sprachassistenten ist Amazons Alexa, welcher auf sämtlichen Amazon Geräten, wie dem FireTV oder der gesamten Echo-Reihe verfügbar ist.  
Amazon stellt dabei eine sehr große Bibliothek aus sog. Skills zur Verfügung und ermöglicht es Entwicklern recht einfach neue Skills zu erstellen und zu veröffentlichen.   

Als Entwickler gibt es viele verschiedene Möglichkeiten einen Skill zu entwickeln, zum Beispiel als [AWS Lambda Function](https://developer.amazon.com/en-US/docs/alexa/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html) oder als HTTPS Web-Service.  
Ich beschränke mich auf [Alexa Hosted Skills] mit der Programmiersprache JavaScript (in NodeJS).  



## Befehlsstruktur
Ein Befehl bei Alexa ist wie folgt aufgebaut:  
``<wake word>, <launch> <Invocation name> <utterance>``  
Was die einzelnen Teile des Befehls bedeuten, habe ich [hier](./../skill/instruction.md#aufbau-eines-befehls) etwas ausführlicher beschrieben.  
Die einzelnen Teile eines Befehls können auch in anderer Reihenfolge auftreten, sodass der Invocation Name nach der Utterance kommt.  
Amazon stellt dazu einige Füllwörter bereit, welche genutzt werden können, um einen natürlich klingenden Satz zu bilden.  


## Ordnerstruktur

Ein Alexa Skill ist wie folgt aufgebaut:  

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

Da dieser Aufbau für sehr viele unterschiedliche Skills funktionieren muss und Alexa sehr viele Funktionen bietet, fokussiere ich mich hier auf einige wenige Unterverzeichnisse.  

````
<Skill Directory>/
├── .ask/
├── lambda/
└── skill-package/
    │── build/
    │   └── *.json files       
    └── interactionModels/
        └── custom/
            └── < locale name >.json
            └── < another locale name >.json    
            └── ...               
````

Im Verzeichnis ``response/display`` befinden sich Daten für Alexa-Geräte mit einem Display (z.B. [Echo Show]).  
Im Rahmen dieses Projektes beschränke ich mich jedoch lediglich auf eine Audio-Wiedergabe.  
Das Verzeichnis ``response/prompt`` beinhaltet Antworten für Alexa Conversations Description Language (ACDL), welche sich jedoch zurzeit für viele Sprachen noch im Beta Status befindet.  
Daher beachte ich auch das Verzeichnis ``skill-package/conversations`` nicht.  
Bei der Datei ``skill.json`` handelt es sich um einige Metadaten, die in erster Linie auch für Alexa Conversations relevant sind.  

Durch diese Vereinfachung erhalte ich eine kompaktere Ordnerstruktur, welche eher dem Umfang meines Projekts entspricht.  


- ``.ask``: In diesem Verzeichnis befindet sich Amazons SDK, das **A**lexa **S**kills **K**it.
- ``lambda``: Hier befindet sich die tatsächliche Logik, in Form eines NodeJS-Projekts mit ``package.json`` und den jeweiligen JavaScript-Dateien.
- ``skill-package``: 
  - ``build``: Dieses Verzeichnis wird vom Alexa Backend erstellt und verwaltet.
  - ``interactionModels``: Hierbei handelt es sich um den Aufbau der verschiedenen Befehle, Intents und Slots.  

## Interaction Model

Den Aufbau eines Interaction Models beschriebe ich an Amazons [Beispiel aus ihrer Dokumentation](https://developer.amazon.com/en-US/docs/alexa/smapi/interaction-model-schema.html#sample-interaction-model-schema).  
Der Einfachheit halber habe ich das Beispiel Interaction Model in einzelne Abschnitte unterteilt.  

### Language Model

Der erste Abschnitt wird für mein Projekt wahrscheinlich am wichtigsten sein, da es sich hier um die Definition eines einfachen Befehlsaufrufs handelt.  
Bei Amazon nennt sich das ein sog. "Language Model".  
Befehle, die hier definiert werden, sind für den einfachen Aufruf gedacht.  
Das heißt, dass Alexa keinerlei Rückfragen stellt:  

````json
{
  "interactionModel": {
    "languageModel": {
      "invocationName": "my space facts",
      "modelConfiguration": {
        "fallbackIntentSensitivity": {
          "level": "LOW"
        }
      },
      "intents": [],
      "types": []
    },
    "dialog": {},
    "prompts": []
  }
}
````
*Vereinfachtes ``interactionModel`` von der offiziellen Amazon [Dokumentation](https://developer.amazon.com/en-US/docs/alexa/smapi/interaction-model-schema.html#sample-interaction-model-schema)*

Der Invocation Name beschreibt den Namen des Skills innerhalb eines Befehls.  
In diesem Fall geht es darum, Informationen über das Weltall zu erlangen.  
Ein befehl könnte also anfangen mit:  
- "Alexa, open ``my space facts``"
- "Alexa, use ``my space facts`` to ..."  

Dieser Invocation Name muss nicht mit dem tatsächlichen Namen des Skills übereinstimmen und wird ggf. in die verschiedenen Sprachen übersetzt.  


#### Intents

Damit man nicht für jeden Befehl einen eigenen Skill anlegen muss, gibt es die Intents.  
Diese werden unter dem Punkt ``intents`` als eine Liste von JSON-Objekten angelegt:  

````json
[
  {
    "name": "AMAZON.CancelIntent",
    "samples": []
  },
  {
    "name": "AMAZON.HelpIntent",
    "samples": []
  },
  {
    "name": "AMAZON.StopIntent",
    "samples": []
  },
  {
    "name": "AMAZON.FallbackIntent",
    "samples": []
  },
  {
    "name": "AMAZON.StartOverIntent",
    "samples": []
  },
  {
    "name": "GetNewFactIntent",
    "slots": [],
    "samples": [
      "Give me a fact",
      "tell me a fact"
    ]
  },
  {
    "name": "GetTravelTime",
    "slots": [
      {
        "name": "DepartingPlanet",
        "type": "Planet",
        "samples": [
          "I'm starting from {DepartingPlanet} ",
          "{DepartingPlanet} ",
          "I'm going from {DepartingPlanet} to {ArrivingPlanet} "
        ]
      },
      {
        "name": "ArrivingPlanet",
        "type": "Planet",
        "samples": [
          "I'm going to {ArrivingPlanet} ",
          "{ArrivingPlanet} "
        ]
      }
    ],
    "samples": [
      "calculate travel time",
      "how long does it take to travel from {DepartingPlanet} to {ArrivingPlanet} "
    ]
  }
]
````
*Ausschnitt von ``interactionModel.intents``*

Mit diesen Objekten werden die jeweiligen Befehlsaufrufe definieren.  
In obigen Beispiel sind das einige Amazoneigene Intents wie zum Beispiel ``AMAZON.CancelIntent`` oder ``AMAZON.FallbackIntent``, aber auch zwei eigene Intents (``GetNewFactIntent`` und ``GetTravelTime``).  
Unter dem Punkt ``samples`` werden die einzelnen Sätze definiert, mit denen man den Befehl aufrufen kann:

- ``GetNewFactIntent`` > "Alexa, use ``my space facts`` to ``tell me a fact``"  
- ``GetTravelTime`` > "Alexa,``calculate travel time`` with ``my space facts``"



#### Slots

Da die Möglichkeiten mit obigen Befehlen sehr beschränkt wären, kann man in den Intents sog. Slots verwenden.  
Dabei handelt es sich um vordefinierte Variablen eines bestimmten Typs.  
Es gibt einige Typen, die Amazon bereitstellt wie zum Beispiel für Zahlen oder Daten.  
Allerdings gibt es auch die Möglichkeit, eigene Typen zu definieren.  
In obigem Beispiel wird der Typ ``Planet`` verwendet.  
Dieser wurde unter dem Punkt ``types`` mit den Namen der Planeten unseres Sonnensystems definiert.  

````json
{
  "name": "Planet",
  "values": [
    {
      "name": {
        "value": "Mercury"
      }
    },
    {
      "name": {
        "value": "Venus"
      }
    },
    {
      "name": {
        "value": "Earth"
      }
    },
    {
      "name": {
        "value": "Mars"
      }
    },
    {
      "name": {
        "value": "Jupiter"
      }
    },
    {
      "name": {
        "value": "Saturn"
      }
    },
    {
      "name": {
        "value": "Uranus"
      }
    },
    {
      "name": {
        "value": "Neptune"
      }
    },
    {
      "name": {
        "value": "Pluto"
      }
    }
  ]
}
````
*Ausschnitt von ``interactionModel.types[0]``*

Die Slots werden bei den Intents in geschweiften Klammern verwendet.  
Ein Beispielbefehl könnte also wie folgt aussehen: 

- ``GetTravelTime`` > "Alexa, ask ``my space facts`` ``how long does it take to travel from Mercury to Venus``"

### Dialog und Prompts

Unter dem Punkt ``dialog`` finden sich Angaben zu Alexas Dialog-System.  
Dabei werden einige Intents definiert, welche Slots nutzen.  
Wird dann beim Aufruf ein Slot nicht genannt (zum Beispiel ein Planet), so kann man unter ``prompts`` sätze definieren, mit denen Alexa nach den jeweiligen Slots fragt.  

Ein solches Dialogsystem sprengt allerdings den Rahmen dieses Projekts, daher werd ich nicht näher auf dieses System eingehen. 

## ASK - Alexa Skills Kit

Damit ein Entwickler die vielen Funktionen von Alexa nutzen kann, stellt Amazon das sog. *A*lexa *S*kills *K*it (kurz "ask") zur Verfügung.  
Dieses Kit kümmert sich um die Kommunikation zwischen dem Skill und der Alexa Umgebung, um den Build-Prozess und stellt Test- und Monitoring-Funktionen zur Verfügung.  
Man kann darüber auf die unter im [Interaction Model](#interaction-model) definierten Intents und Validierungen zugreifen und es liegt jedem Skill zu grunde.  
Es ist für NodeJS, Java und Python verfügbar.  

