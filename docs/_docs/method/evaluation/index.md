---
title: Was ist das Skillverwaltungssystem?
permalink: /docs/method/evaluation/index/
---

Mit einem Skillverwaltungssystem werden Skills für einen Sprachassistenten verwaltet und diesem zur Verfügung gestellt. Im Ablaufschema des verwendeten Sprachassistenzframeworks `Rhasspy` übernimmt das System von Finn Wehn dabei den Schritt `Intent Handling`. Dazu bekommt es von Rhasspy über das Protokoll MQTT den erkannten Sprachbefehl (Intent) und die zugehörigen Slots. Das System leitet dies an den zugehörigen Skill weiter. Dieser verarbeitet dies und sendet, falls es eine Antwort gibt, eine Nachricht per MQTT zurück an Rhasspy. Dort kann diese Nachricht dann in Schritt `Text to Speech` weiterverarbeitet werden.
<br>
Des Weiteren bietet das System eine Weboberfläche und eine Befehlszeilenschnittstelle, über welche neue Skills hochgeladen, gelöscht, aktiviert und deaktiviert werden können. Dort können auch Details über Skills eingesehen und Optionen festgelegt werden.
<br>
Die dort hochgeladenen und aktivierten Skills werden von System verarbeitet. Die Intents und Slots der neuen Skills werden dann an Rhasspy gesendet und dort registriert. Werden Skills im System deaktiviert und gelöscht, werden diese auch aus Rhasspy entfernt.
