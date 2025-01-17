---
title: Automatisierung
permalink: /docs/method/skills/Automation/index/
---

Mit diesem Skill können Smart Home Automatisierungen genutzt werden. Die Besonderheit hierbei ist, das Intents nicht nur eine direkte Antwort auslösen, sondern auch einen automatisierten Ablauf starten. Zigbee2MQTT ist verantwortlich für die Kommunikation zwischen diesem Skill und den Geräten.

### Zusätzliche Hardware

Es wird ein Zigbee-Stick und mehrere Smart Home Geräte benötigt. <br>
Diese Geräte sind: <br>

Eine smarte Steckdose mit Stromverbrauchsmessung, hier wurde ein Aqara Smart Plug verwendet. <br>
Ein Bewegungsmelder, hier wurde ein Aqara Motion Sensor verwendet. <br>
Zwei Kontakt-Sensoren, hier wurden Sonoff Wireless Door/Window Sensoren verwendet. <br>
Eine Lampe, hier wurde ein Müller Licht Tint LED-Reflektor GU10 verwendet <br>
Ein Tastsensor, hier wurde ein Aqara Wireless Mini Switch verwendet <br>

### Installation

[Der Service Zigbee2MQTT muss installiert und die Geräte damit verbunden](../installation/Zigbee2MQTT) werden. Danach kann der Skill installiert werden.

### Einrichtung

Bevor der Skill aktiviert werden kann, müssen einige Optionen ausgefüllt werden. Es müssen die Postleitzahl, Sprache und Land von dem Ort in dem der Skill genutz werden eingetragen werden. Außerdem müssen die Namen der Zigbeegeräte und dem MQTT-Topic von Zigbee2MQTT entweder an die Standardeinstellungen angepasst oder die neuen Namen eingetragen werden. Es wird auch ein API-Key für OpenWeatherMap benötigt.

### Nachtlicht

Das Nachtlicht ist ein Zusammenspiel eines Bewegungsmelders, einer Lampe und einer API. Durch eine Anfrage an die API werden die tagesaktuellen Sonnenauf- und Sonnenuntergangszeiten ermittelt. Wenn nun der Bewegungsmelder ausgelöst wird, wird überprüft, ob es vor Sonnenauf- oder nach Sonnenuntergang ist. Ist dem so, wird die Lampe angeschaltet. Dieser Ablauf kann durch den Sprachassistenten gestartet oder gestoppt werden.

### Sprachbefehl

... `start` Automatisierung [ mach ] [ das ] Nachtlicht `state`

### Wäschebenachrichtigungen.

Der Stromverbrauch einer Waschmaschine wird mit einer Steckdose überwacht. Durch Beobachtung wurden Schwellenwerte ermittelt, die die Waschmaschine nur zu Beginn und am Ende des Programmes unter- beziehungsweise überschreitet. Somit lässt sich der Beginn und das Ende des Waschprogrammes feststellen. Wenn diese Beobachtung durch den Sprachassistenten gestartet wurde, wird über Beginn und Ende durch eine Benachrichtigung informiert. 

### Sprachbefehl

... `start` Automatisierung [ mach ] [ die ] Wäschebenachrichtigungen `state`

### Gefrierschrankbenachrichtigungen

An die Tür eines Gefrierschranks wird ein Kontakt-Sensor angebracht. Wenn die Tür geöffnet wird, startet ein Timer für 60 Sekunden. Steht nach Ablauf des Timers die Tür immer noch offen, kann das festgestellt werden. Ist Beobachtung durch den Sprachassistenten gestartet, wird durch offenstehen eine Benachrichtigung ausgelöst.

### Sprachbefehl

... `start` Automatisierung [ mach ] [ die ] Gefrierschrankbeobachtungen `state`

### Stumme Türklingel

An die Tür wird ein Tastsensor angebracht. Wenn dieser gedrückt wird und die Klingel aktiviert ist, wird eine Benachrichtigung an den Bot gesendet.

### Sprachbefehl

... `start` Automatisierung [ mach ] [ die ] stumme Klingel `state`

### Briefkastenbenachrichtigung

An den Briefkasten wird ein Kontakt-Sensor angebracht. Wird der Kontakt unterbrochen und sind die Benachrichtigungen aktiviert, wird eine Benachrichtigung ausgelöst. 

### Sprachbefehl

... `start` Automatisierung [ mach ] [ die ] Briefkasten Benachrichtigungen `state`


### Slots

`state` kann die Werte "an" oder "aus" annehmen und beschreibt den Zustand der Automatisierung. Dieser Slot wird mittels Substitution in boolesche Werte umgewandelt, so kann  die sprachunabhängige Implementierung des Skills gewährleistet werden. 
