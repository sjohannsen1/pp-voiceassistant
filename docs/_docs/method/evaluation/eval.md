---
title: Evaluation des Skillverwaltungssystems
permalink: /docs/method/evaluation/eval/
---

Das Skillverwaltungssystem von Finn Wehn wurde im Hinblick auf die Umsetzung der ermittelten Anforderungen evaluiert. 
Dazu wurde die Version vom 8. April 2022 verwendet. <br>

## Rhasspy Instanz

Bis auf die Verwendung von externem MQTT sind keine Einstellungen für Rhasspy vorgegeben. Für die Evaluation sind die von Rhasspy für die Sprache Deutsch empfohlenen Einstellungen verwendet worden.

## Sprachunabhängigkeit

Jeder Skill der von diesem System verwaltet wird, besteht aus einer oder mehreren locale-Dateien, einer Manifest-Datei und dem eigentlichen Code. In jeder locale-Datei werden alle Intents, Antworten und Slots einer Sprache festgelegt. Außerdem werden dort die Funktionen mit den Intents verknüpft. Die Funktionen werden in der Quellcode-Datei implementiert. In den Funktionen wird keine Sprache verarbeitet. Eingaben über Slots können von Rhasspy nach festgelegtem Schema ersetzt werden. So können beispielsweise die Zustände "an" und "aus" von Smarten Geräten in die Werte "0" und "1" übersetzt werden. Die Antworten des Sprachassistenten werden mithilfe der definierten Sätze in den locale-Dateien generiert. Falls Variablen in der Antwort mit ausgegeben werden sollen, werden diese von der CustomSDK in die Antwort eingefügt. In der Manifest-Datei befinden sich die NodeJS-Module, die ein Skill verwendet, Optionen, welche von Nutzenden ausgefüllt werden müssen und die Version des Skills. Die Optionen sind Eingaben, welche vom Skill benötigt werden um zu funktionieren. Ein API-Key oder die Stadt, für die das Wetter abgefragt werden soll, sind Beispiele für Optionen.

## NodeJS-Module

NodeJS-Module sind Bibliotheken an Funktionen, welche Programmen durch das Framework NodeJS zur Verfügung gestellt werden. Falls Skills davon welche verwenden, müssen sie bei der Installation mitinstalliert werden. Dies muss einzeln für jeden Skill durchgeführt werden. Dazu ist ein Zugriff auf das Terminal des Geräts, auf welchem der Sprachassistent läuft nötig. Wird das nicht vor Installation des Skills gemacht, bricht das Programm ab und lässt sich nicht wieder neu starten. Erst wenn, entweder die Module installiert wurden oder die Skilldateien gelöscht und der Skill aus der Liste mit verfügbaren Skills gelöscht wurde, lässt sich das Programm wieder verwenden. Die benötigten Module sind in der Manifest-Datei der einzelnen Skills festgehalten.

## Umgebungsvariablen

Umgebungsvariablen sind Variablen, welche nur innerhalb einer bestimmten Umgebung zur Verfügung stehen. Außenstehende Programme können diese nicht verwenden. Sie sind auch nützlich, falls der Quellcode veröffentlicht werden soll, es aber geheime Daten gibt, welche nicht mit veröffentlicht werden sollen. Beispielsweise Passwörter können so geheimgehalten werden. In den Programmen wird dann die Umgebungsvariable referenziert und diese in einer eigenen Datei, welche nicht mit veröffentlicht wird, eingetragen. Nach Installation nach Anleitung waren die Umgebungsvariablen nicht erreichbar. Dies führte zwar zunächst zu keinen Problemen, da es zu diesen Variablen im Quellcode je alternative Werte gab. Als diese jedoch geändert werden sollten, ist dieses Problem aufgefallen. 

## Fehlerbehandlung

Falls bei einer Funktion eines Skills ein Fehler auftreten sollte, biete die CustomSDK eine Funktion, die diesen Fehler auffängt. Dadurch bricht nicht das gesamte Programm, sondern nur die fehlerhafte Funktion ab. Der Fehler wird in der Konsole ausgegeben und der Sprachassistent gibt eine generische Fehlermeldung aus. Diese Fehlermeldung gibt keinerlei Aufschluss über die Ursache des Fehlers, sondern merkt nur an, dass der aufgerufene Skill momentan Probleme bereitet. 

## Statische Slots

Das Skillverwaltungssystem verwendet fast ausschließlich statische Slots. Dies bedeutet, dass alle möglichen Slotwerte bereits bei Aktivierung des Skills festgelegt sein müssen. Wenn ein Skill entwickelt wird, in dem auf Nutzende zugeschnittene Slots verwendet werden, muss dieser die locale-Datei verändern. In dieser Datei werden alle Intents, Antworten und Slots festgelegt. Außerdem werden dort die Intents mit den Funktionen verknüpft. Passiert bei dem Eintragen der personalisierten Slots nun ein Fehler, besteht das Risiko, dass Intents oder sogar der gesamte Skill nicht mehr funktionieren. <br>

Die einzige Ausnahme bildet der Slot `zigbeeDevices`. Dieser wird mit den Namen aller Zigbee2MQTT bekannten Geräte und Gruppen gefüllt. Die Einträge in diesem Slot werden jedem Skill zugänglich in dem Konfigurationsobjekt gespeichert. <br>

Des Weiteren ist es auch nicht möglich, freie Eingaben zu tätigen. Wenn Rhasspy ein Wort nicht kennt, kann es dies auch nicht erkennen. Somit ist das freie Benennen von Dingen nicht möglich. 

## Statische Intents

Es können zwar in den Intents optionale Wörter, Satzteile oder Alternativen angegeben werden, aber nicht angegebene Änderungen kann Rhasspy nicht korrekt erkennen. Auch Rechtschreibung ist essentiell für die korrekte Intent-Erkennung.

## Detailseite

Das System verfügt über eine Weboberfläche. Dort können Skills verwaltet werden. Des Weiteren kann dort von jedem Skill eine Übersichtsseite mit allen Intents, Slots und Slotwerten und einer kurzen Beschreibung eingesehen werden. Dort können auch die Optionen eingetragen werden.
Alle Einträge des Slots `zigbeeDevices` werden auf der Detailseite jedes Skills ausgegeben. Dies kann zu Verwirrung führen, da nicht jeder Skill auf diese reagiert. 

