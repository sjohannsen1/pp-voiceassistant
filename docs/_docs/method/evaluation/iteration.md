---
title: Änderungen am Skillverwaltungssystem
permalink: /docs/method/evaluation/iteration/
---

Das Skillverwaltungssystem von Finn Wehn wurde iteriert. So wurde versucht alle identifizierten Probleme zu lösen. 

## Sprachunabhängigkeit

Wie in der Evaluation angemerkt, war die Sprachunabhängigkeit schon gegeben. Um mehrere verschiedene Antworten von einem Skill zu ermöglichen, wurde die einzelne Antwort durch eine Liste an Antworten ersetzt. Wenn nun eine Antwort generiert werden soll, muss ein Index mit angegeben werden. Die Funktion zur Generation wurde um diesen Parameter erweitert. <br>

Außerdem ist eine Funktion zur Generation von Aufzählungen aus Listen hinzugefügt worden.

## NodeJS-Module

Bei der Installation eines Skills wird nun die Manifest-Datei eingelesen, die Module daraus extrahiert und dann installiert. Erst danach wird die Installation des Skills fortgesetzt. Dazu wurde eine neue Funktion des Skillmanagers erstellt und von der Weboberfläche sowie der Befehlszeilenschnittstelle verwendet. 

## Umgebungsvariablen

Um die Umgebungsvariablen für das Programm zugänglich zu machen, wurden die Skripte zum Starten des Clients und des Servers um die Initialisierung des "dotenv"-Moduls erweitert. Dieses lädt die Variablen in die Prozessumgebung, sodass Programme auf diese zugreifen können.

## Fehlerbehandlung

Um ausschlagkräftigere Fehlermeldungen zu ermöglichen und dennoch sprachunabhängigen Code beizubehalten, wurde jeder Sprachbefehl um eine Liste an Fehlermeldungen erweitert. Diese orientieren sich am Vorbild der Antworten. Deswegen wurde in der CustomSDK eine Funktion zur Generation von Fehlermeldungen eingerichtet. Tritt nun ein Fehler auf kann er von der Fehlerbehandlung der CustomSDK aufgefangen werden und eine Fehlernachricht generiert und von Rhasspy gesagt werden. Es wird weiterhin der eigentliche Fehler in der Konsole ausgegeben.

## Dynamische Slots

Dynamische Slot-Einträge können sowohl beim Aktivieren von Skills Konfigurationsdateien ausgelesen und an Rhasspy gepostet werden als auch durch einen Chatbot hinzugefügt werden. Um dies umzusetzen, musste zunächst das Konfigurationsobjekt der CustomSDK um Liste mit den dynamischen Slots der einzelnen Skills erweitert werden. Die Namen der Slots werden aus den Manifest-Datei jedes Skills ausgelesen und das Konfigurationsobjekt beim Laden der Skills damit gefüllt. Die Werte, die die Slots annehmen können, werden aus Rhasspy ausgelesen und anhand der vorher ermittelten Namen in die Liste einsortiert. Außerdem erhält das Konfigurationsobjekt eine Funktion zum Posten der Slots. Wenn nun ein neuer Slot-Eintrag hinzugefügt werden soll, wird dieser zunächst an Rhasspy gepostet. Danach wird Rhasspy neu trainiert und die Werte im Konfigurationsobjekt  aktualisiert. <br>

In den locale-Dateien jedes Skills müssen die Slots trotzdem eingetragen werden. Da die Werte sofort überschrieben werden, kann dort als Platzhalter ein Unterstrich angegeben werden. Wenn dieser Eintrag vergessen wird, lässt sich Rhasspy nicht trainieren. <br>

Aus dem Slot `zigbeeDevices` wurden die Gruppen entfernt. Diese werden nun in einem separaten Slot namens `zigbee_groups` gespeichert. Wie der ursprüngliche Slot erhalten diese auch einen Eintrag im Konfigurationsobjekt der CustomSDK. Durch diese Änderungen können nun Gruppen im Skill Zigbee2MQTT verwaltet werden.

## Detailseite

Mithilfe der Eigenschaft custom_slots des Konfigurationsobjektes, welche die dynamischen Slots nach Skill geordnet enthält, können diese jedem Skill eindeutig zugeordnet werden. Wird nun die Detailseite aufgerufen, werden die Slots dort ausgelesen. Gibt es für einen Slot mehr als fünf Einträge, wird eine zufällige Auswahl daraus angezeigt. Die weiteren Einträge der Detailseite sind beibehalten worden.