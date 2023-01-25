---
title: Was ist das Skillverwaltungssystem?
permalink: /docs/method/evaluation/index/
---

Bei Sprachassistenten handelt es sich um natürlichsprachliche Dialogsysteme. Sie erledigen Aufgaben für Nutzende durch Reaktion auf ihre Anfragen. Dabei gehen sie nach einem immer gleichen Schema vor. <br>

1. `Audio Input:` Der Sprachassistent nimmt kontinuierlich Audiomitschnitte auf.
2. `Wake Word:`   Das Aktivierungswort des Sprachassistenten. Erkennt der dies, wird der folgende Audiomitschnitt ausgewertet.
3. `Speech to Text:` Die Audiomitschnitt wird mithilfe eines Sprachmodells transkribiert.
4. `Intent Recognition:` Aus der transkribierte Eingabe wird ein Sprachbefehl erkannt. Dabei werden auch Slotswerte extrahiert und mit dem Namen des Slots verbunden.
5. `Intent Handling:` Der Sprachbefehl wird an den zugehörigen Skill weitergeleitet und dort verarbeitet.
6. `Text to Speech:` Falls der Skill eine Antwort auslöst, wird dieser in Textform vom Skill an das Text to Speech System weitergeleitet. Dort wird dieser in Sprache umgewandelt.
7. `Audio Ausgabe:` Die zu Sprache umgewandelte Antwort wird abgespielt. 

Das Skillverwaltungssystem von Finn Wehn übernimmt dabei den fünften Schritt. Dazu bekommt es von Rhasspy über das Protokoll MQTT den erkannten Sprachbefehl (Intent) und die zugehörigen Slots. Das System leitet dies an den zugehörigen Skill weiter. Dieser verarbeitet dies und sendet, falls es eine Antwort gibt, eine Nachricht per MQTT zurück an Rhasspy. Dort kann diese Nachricht dann in Schritt sechs weiterverarbeitet werden.

Des Weiteren bietet das System eine Weboberfläche und eine Befehlszeilenschnittstelle über welche neue Skills hochgeladen, gelöscht, aktiviert und deaktiviert werden können. Dort können auch Details über Skills eingesehen und Optionen festgelegt werden.

Die dort hochgeladen und aktiviert werden von System verarbeitet. Die Intents und Slots der neuen Skills werden dann an Rhasspy gesendet und dort registriert. Werden Skills im System deaktiviert und gelöscht, werden diese auch aus Rhasspy entfernt. 
