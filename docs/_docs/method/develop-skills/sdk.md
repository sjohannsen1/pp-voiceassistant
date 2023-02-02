---
title: SDK
permalink: /docs/method/develop-skill/sdk
---

Die CustomSDK von Finn Wehn wurde iteriert. [Die ursprüngliche SDK ist hier dokumentiert.](https://fwehn.github.io/pp-voiceassistant/docs/create-skills/sdk/) Die Änderungen werden hier beschrieben. <br>

## Konfigurationsobjekt

```
let configObject = {
    mqtt: 'localhost',
    intentHandler: () => {},
    variables: {},
    zigbeeTopic: "",
    zigbeeUpdater: () => {},
    zigbeeDevices: [],
    zigbeeGroups: [],
    postSlots: () => {},
    customSlots: [] 
}
```
*[sdk/index.js](../../../../src/sdk/index.js)* <br>

Die Eigenschaften `zigbeeDevices` und `zigbeeGroups` enthalten alle Zigbee Devices und alle in Zigbee2MQTT eingerichteten Gruppen. <br>
Die Eigenschaft `postSlots` erhält eine Funktion zum Registrieren von neuen Sloteinträgen an Rhasspy. Dabei muss der Slotname und die neuen Einträge übergeben werden. Außerdem kann optional festgelegt werden, ob die existierenden Einträge mit den neuen Überschrieben werden sollen. <br>
Die Eigenschaft `customSlots` ist eine Liste mit allen dynamischen Slots. Diese ist nach Skills sortiert. Ausschließlich die Detailseite nutzt diese Eigenschaft.

## Sessiondata

```
let sessionData = {
    siteId: "default",
    sessionId: "",
    skill: "",
    answer: "",
    fail: ""
}
```
*[sdk/index.js](../../../../src/sdk/index.js)* <br>

Die `sessionData` erhält zusätzlich noch eine Eigenschaft `fail`. Dort werden die Fehlermeldungen `fail` aus den Manifest Dateien der Skills zur Laufzeit festgehalten.

## Antwort und Fehler generieren

```
function generateFailResponse(vars = [""], index=0, separator = "#"){
    let parts = sessionData.fail[index].split(separator);
    let answer = parts[0];
    for (let i = 1; i < parts.length; i++){
        if(!vars[i-1]){
            answer = answer + parts[i]
            return answer
        }
        answer = answer + vars[i-1] + parts[i];
    }
    return answer;
}
```
*[sdk/index.js](../../../../src/sdk/index.js)* <br>

Die Funktionen zur Generation von Antwort und Fehlermeldung sind bis auf die verwendete Eigenschaft der `sessionData` identisch. Sie erhalten eine Liste `vars` an einzusetzenden Wörtern und fügen sie in den durch den `index` definierten Satz ein. Dieser Satz wird dann zurückgegeben. <br>

## Aufzählung generieren 

```
function generateEnum(list, join = "und"){
    let enumeration=""
        if(list.length>1){
            for (let index = 0; index < list.length; index++){
            if(!list[index+1]){
                enumeration+=` ${join} ${list[index]}`
                return enumeration
            }
            else
              enumeration+=` ${list[index]}`
          }
        }
        else{
            enumeration=list[0] 
            return enumeration   
        }  
}
```
*[sdk/index.js](../../../../src/sdk/index.js)* <br>

Diese Funktion erhält eine Liste `list` an Wörtern und generiert daraus eine, mit den Verbindungswort `join` verbundene, Aufzählung. Diese wird zurückgegeben. 
<br>
