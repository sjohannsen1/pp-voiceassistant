---
title: SDK
permalink: /docs/sdk/
---

Ich habe, für die Entwicklung neuer Skills, ein eigenes SDK (**S**oftware **D**evelopment **K**it) erstellt.  
Dieses kümmert sich, in Zusammenarbeit mit dem "Skillmanager", um nützliche Funktionen wie zum Beispiel die Sprachausgabe, oder aber den Umgang mit [Antwortsätzen](./locales.md#Antwortsätze).  

# Konfiguration und Initialisierung

``config``  

````javascript
let configObject = {
    mqtt: 'localhost',
    intentHandler: () => {}
}
````

``init``

# Sitzungsdaten

````javascript
let sessionData = {
    siteId: "default",
    sessionId: "",
    answer: ""
};
````

# Sprachausgabe

``say``

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
