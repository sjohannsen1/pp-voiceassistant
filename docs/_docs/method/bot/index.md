---
title: 
permalink: /docs/method/bot/index/
---

Um eine alternative Kommunikationsmöglichkeit mit dem Assistenten zu schaffen, wurde ein Chatbot erstellt. Dieser läuft über die Anwendung Discord. Das Konzept dieses Chatbots kann durch kleine Änderungen auch auf andere Plattformen angewandt werden. Dafür müssen lediglich die plattformspezifischen Ereignisse und Eigenschaften angepasst werden. <br>

## Funktionen

Der Bot funktioniert nach dem Publish/Subscribe Pattern. Um den Bot zu abonnieren, muss diesem eine Nachricht geschrieben werden. Diese Interaktion nimmt der Bot in seine Liste an Nutzenden auf. Erhält der Bot nun eine Nachricht von Rhasspy oder einem Skill, leitet dieser die an alle Nutzenden aus der Liste weiter. <br>

Skills können auch Nachrichten zur Weiterleitung an Abonnenten an den Bot senden. Dazu abonniert der Bot das MQTT Topic `bot`. So können für Rhasspy zu lange oder falsch formatierte Nachrichten ausgegeben werden. Ein Beispiel dafür sind Wetterwarnungen im GetWeather Skill. Der Titel der Warnungen wird von Rhasspy ausgegeben. Die Beschreibung dieser ist allerdings lang und voller Satzzeichen. Die Satzzeichen würden von Rhasspy mit ausgesprochen werden, weshalb diese aus dem Text entfernt werden müssten. Der Bot kann die Beschreibung ohne Probleme als Nachricht versenden. <br>

Außerdem besteht so die Möglichkeit Informationen zu exportieren. Beispielsweise der Listenskill verwendet diese Funktion. So können alle Listeneinträge auch schriftlich erhalten werden. <br>

Schriftliche Benachrichtigungen haben auch den Vorteil, dass sie auch zeitverzögert eingesehen werden können. So kann zum Beispiel die Nachricht des Automatisierungsskill das die Waschmaschine fertig ist nicht verpasst und kann auch unterwegs empfangen werden.

Es ist auch möglich einzeln mit dem Bot zu interagieren. Falls dem Bot einer seiner Befehle direkt geschrieben wird, antwortet dieser auch nur in dieser Interaktion. <br>


### Interaktion mit Rhasspy

Der Bot reagiert auf die gleichen Sätze wie Rhasspy und leitet diese über MQTT daran weiter. Dort werden die wie ein Sprachbefehl verarbeitet. Auch Antworten des Assistenten empfängt der Bot und leitet sie an seine Abonnenten weiter.<br>

### Hinzufügen neuer Sloteinträge

Außerdem kann der Bot neue Radiosender und Lieder zu dem Skill "PlayMusic" hinzufügen. Dazu fordert den Interaktionspartner dazu auf, alle für die Konfiguration nötigen Daten zu senden. Erhält er die dann als Antwort werden die in die Konfigurationsdatei gespeichert. Diese werden dabei nicht kontrolliert, also ist es wichtig das dem Bot nur korrekte Daten gesendet werden. Falls doch Fehler geschehen, müssen diese manuell aus der Konfigurationsdatei gelöscht werden. Die erhaltenen Radiosender und Lieder werden auch an die zugehörigen Slots bei Rhasspy gesendet <br>
Ist der Skill nicht installiert, antwortet der Bot mit einer Fehlermeldung.

#### Nachrichten an den Bot

Deabonnieren: Nachricht muss `deabonnieren`, `unsubscribe` oder `benachrichtigungen aus` enthalten <br>
Informationen über das Format für neue Radiosender erhalten: Nachricht muss `neuer Radiosender` enthalten <br>
Neuen Radiosender einspeichern: `name: sendername url: url.de` <br>
Informationen über das Format für neue Radiosender erhalten: Nachricht muss `neuer Song` oder `neues Lied` enthalten <br>
Neues Lied einspeichern: `name: sendername artist: name path: pfad_zu_datei` <br>

