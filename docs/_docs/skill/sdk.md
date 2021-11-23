---
title: SDK
permalink: /docs/skills/sdk/
redirect-from:
- /docs/skills/instruction/sdk.md
- /docs/skills/locales/sdk.md
- /docs/client/skills/sdk.md
- /docs/evaluation/skills/sdk.md
---

Ich habe, für die Entwicklung neuer Skills, ein eigenes SDK (**S**oftware **D**evelopment **K**it) erstellt.  
Dieses kümmert sich, in Zusammenarbeit mit dem [Skillmanager](./../client/skillmanager.md), um nützliche Funktionen wie zum Beispiel die Sprachausgabe, oder aber den Umgang mit den [Antwortsätzen](./locales.md#Antwortsätze).  

## Konfiguration und Initialisierung

### Config

Im ``configObject`` werden einige Konfigurationen gespeichert.

````javascript
let configObject = {
    mqtt: 'localhost',
    intentHandler: () => {},
    variables: {}
}
````
*[sdk/index.js](https://github.com/fwehn/pp-voiceassistant/blob/main/src/sdk/index.js)*

Unter ``mqtt`` wird die Host-IP des [MQTT-Brokers](https://mqtt.org/) gespeichert, über den Rhasspy mit den einzelnen Komponenten kommuniziert.  
Über diesen Broker kommen auch alle [Intents](https://rhasspy.readthedocs.io/en/latest/intent-recognition/#mqtthermes) an, welche dann vom ``intentHandler`` verarbeitet werden.  
Diese Angaben werden vom [Skillmanager](./../client/skillmanager.md) mittels der ``config``-Funktion gesetzt.

````javascript
function config(options = {}){
    for (let i in options){
        if (!configObject.hasOwnProperty(i) || options[i] === undefined || options[i] === null) continue;

        configObject[i] = options[i];
    }
}
```` 
*[sdk/index.js](https://github.com/fwehn/pp-voiceassistant/blob/main/src/sdk/index.js)*

Bei dieser Funktion handelt es sich im Grunde um eine einfache Setter Funktion, welche jedoch darauf achtet, dass nur im ``configObject`` deklarierte Felder gesetzt werden.

### Init

Mit der ``init``-Funktion verbindet sich der [Skillmanager](./../client/skillmanager.md) mit dem MQTT-Broker und abonniert das Topic ``hermes/intent/#``, wodurch alle Intents entgegengenommen werden.

````javascript
async function init() {
    client = await mqtt.connect(`mqtt://${configObject.mqtt}`);

    client.on("connect", function () {
        client.subscribe('hermes/intent/#');

        client.on('message', (topic, message) => {
            let formatted = JSON.parse(message);
            sessionData["siteId"] = formatted.siteId;
            sessionData["sessionId"] = formatted.sessionId;

            configObject.intentHandler(topic, message);
        });
    });
}
````
*[sdk/index.js](https://github.com/fwehn/pp-voiceassistant/blob/main/src/sdk/index.js)*

Nachdem ein Intent erkannt wird, werden sofort einige Informationen im JavaScript-Objekt ``sessionData`` gespeichert und die Nachricht an den im ``configObject`` gespeicherten ``intentHandler`` weitergegeben.  

## Sitzungsdaten

Damit ein Skill-Entwickler sich nicht darum kümmern muss, über welchen Satelliten die Sprache ausgegeben wird, und auch in welcher Sitzung man sich derzeit befindet, gibt es die sog. ``sessionData``.

````javascript
let sessionData = {
    siteId: "default",
    sessionId: "",
    skill: "",
    answer: ""
};
````
*[sdk/index.js](https://github.com/fwehn/pp-voiceassistant/blob/main/src/sdk/index.js)*

Hier werden einige Informationen gespeichert, welche direkt von Rhasspy kommen, wie zum Beispiel die ``sessionId`` oder auch die ``siteId``.  
Diese werden unter anderem von der [``say``](#Sprachausgabe) Funktion genutzt, damit die Sprachausgabe auf dem Satelliten widergegeben wird, über welchen die Eingabe stattfand.  

Aber auch Informationen eines Skills werden hier gespeichert.  
So wird zum Beispiel basierend auf der ausgewählten Sprache, der Antwortsatz aus den jeweiligen JSON-Dateien ausgelesen.  

## Sprachausgabe

Die Funktion ``say`` kann genutzt werden, um einen Satz von Rhasspy sprechen zu lassen.

````javascript
function say(text = ""){
    let message = {
        text: text,
        siteId: sessionData["siteId"],
        sessionId: sessionData["sessionId"]
    };

    client.publish('hermes/tts/say', JSON.stringify(message));
}
````
*[sdk/index.js](https://github.com/fwehn/pp-voiceassistant/blob/main/src/sdk/index.js)*

Der Funktion wird lediglich ein String übergeben.  
Die restlichen Informationen bezieht sie über das ``sessionData``-Objekt.  
Zum Schluss werden die Daten als String auf das Topic ``hermes/tts/say`` veröffentlicht.   

### Beispiel

````javascript
const customSdk = require("@fwehn/custom_sdk");

function helloWorld(hello, world){
    customSdk.say(`${hello} ${world}`);
}
````
*[HelloWorld](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/public/HelloWorld/latest/src/index.js)*

Bei diesem Beispiel werden die beiden Strings ``hello`` und ``world`` aneinander gehangen und ausgegeben.

## Antwort generieren

Skill-Entwickler können [Antwortsätze]() in verschiedenen Sprachen definieren.  
Damit diese jedoch mit einigen Werten erweitert werden können, muss ein solcher Satz generiert werden.  
Dazu gibt der Entwickler einen Satz wie zum Beispiel ``Es ist # Uhr #`` (aus [GetTime](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/public/GetTime/latest/src/index.js)) an.  
Die Funktion ``generateAnswer`` ersetzt dann den Separator (standardmäßig ``#``) mit den Werten, die als Array übergeben werden.  

````javascript
function generateAnswer(vars = [""], separator = "#"){
    let parts = sessionData.answer.split(separator);
    let answer = parts[0];
    for (let i = 1; i < parts.length; i++){
        answer = answer + vars[i-1] + parts[i];
    }
    return answer;
}
````
*[sdk/index.js](https://github.com/fwehn/pp-voiceassistant/blob/main/src/sdk/index.js)*

Möchte der Entwickler das Zeichen ``#`` selbst benutzen kann er einen eigenen Separator verwenden, muss diesen jedoch auch der Funktion übergeben.  
Der jeweilige Satz wird vom [Skillmanager](./../client/skillmanager.md) in der jeweiligen Sprache geladen und mit der einfachen Setter-Funktion ``setAnswer`` im Objekt ``sessionData`` gespeichert.  
Von dort wird die Antwort ausgelesen.  

### Beispiel

````javascript
const customSdk = require("@fwehn/custom_sdk");

function getTime(){
    let time = new Date();
    let answer = customSdk.generateAnswer([time.getHours(), time.getMinutes()]);
    customSdk.say(answer);
}
````
*[GetTime](https://github.com/fwehn/pp-voiceassistant/blob/main/src/server/public/GetTime/latest/src/index.js)*

Hier wird der Satz ``Es ist # Uhr #`` um die aktuelle Stunde und die aktuelle Minute erweitert, also z.B. ``Es ist 11 Uhr 34``.  
Dieser Satz wird dann mit der ``say``-Funktion ausgegeben.

## Config Variablen 

Mit der Funktion [``config``](#config) wird nun das Feld ``variables`` in JS-Object ``configObject`` gesetzt.  
Beim Aufruf der Funktionen ``getVaraibles`` und ``getVariable`` werden nun die, zum im [``sessionData``](#sitzungsdaten) gespeicherten ``skill`` passenden, Variablen ausgelesen und zurückgegeben.

````javascript
function getAllVariables(){
    return new Promise((resolve, reject) => {
        try{
            let variables = configObject.variables[sessionData["skill"]];

            if (variables){
                resolve(variables);
            }else{
                reject("Variable undefined!");
            }
        }catch (e) {
            reject(e);
        }
    });
}
````
*[sdk/index.js](https://github.com/fwehn/pp-voiceassistant/blob/main/src/sdk/index.js)*

Bei der Funktion ``getVariable`` wird lediglich der Wert, der übergeben Variable, zurückgegeben.  