---
title: Herausforderungen bei der Entwicklung
permalink: /docs/method/difficulties
---

Im Entwicklungsprozess dieses Projektes gab es einige Schwierigkeiten. Hier werden deren Problematik und wie diese Überwunden wurden erklärt. Es wird auch auf Schlüsse welche für weitere Projekte gezogen wurden eingegangen. 

## Ändern des Standardnutzers des Raspberry Pis

Ganz zu Beginn des Projektes wurde bei der Ersteinrichtung des Pis der Standardnutzer `pi` geändert. Dies führte zu eine Reihe an Problemen, welche schwierig zu identifizieren waren. <br>
Eins der Probleme war, das Zigbee2MQTT bei der Installation Berechtigungen an den Nutzer `pi` vergibt. Wird der Nutzer jedoch geändert, muss dies auch angepasst werden. Außerdem startet die dort zur Verfügung gestellte Konfigurationsdatei, welche es ermöglicht Zigbee2MQTT als Hintergrundprogramm auszuführen, das Programm mit dem Nutzer `pi`. Wenn dies nicht angepasst wird, kann Zigbee2MQTT nicht starten. Da Hintergrundprogramme jedoch nur nach expliziter Aufforderung Protokolle anzeigen, war dieser Fehler schwierig zu finden. <br>
Ein weiteres Problem stellte die Audiowiedergabe dar. Selbst wenn der Nutzer `pi` auf dem System nicht existiert, erhält dieser die alleinigen Rechte mit `aplay` Audio abzuspielen. `aplay` ist das vorinstallierte Terminal-Audioausgabeprogramm. Das wird sowohl von Rhasspy als auch von dem PlayMusic-Skill verwendet. Dieses Problem kann zwar mit der Ausführung des Systems als Administrator gelöst werden, das erzeugt allerdings ein Sicherheitsproblem da immer nur so viele Rechte erhalten sollten, wie zwingend notwendig ist. <br>
Gelöst wurde dieses Problem indem der geänderte Nutzer zur `audio` Gruppe hinzugefügt wurde. In der [Installationsanleitung](../installation/instructions.md#rhasspy) ist dies vermerkt. <br>
Für zukünftige Projekte sollte der Standardnutzer nur geändert werden, wenn es aus Sicherheitsgründen zwingend nötig ist. 

## Probleme bei der Entwicklung und der Umgang mit diesen

Bei der Entwicklung sind immer wieder Probleme im Programmcode aufgetaucht. Teilweise waren diese schwer recherchierbar und haben den Entwicklungsprozess sehr ins Stocken geraten lassen. Statt diese Probleme in die Dokumentation mit aufzunehmen und eine Anforderung nicht (vollständig) zu erfüllen, wurden diese über einen langwierigen Versuch und Irrtum Prozess gelöst. 
Im Nachhinein wurde erkannt, das nicht jedes Problem zwingend lösbar sein muss. In Zukunft sollte für die Lösung jedes Problems eine maximale Zeitspanne festgelegt werden. 

## Iteration der Installationsanleitung

In der ursprünglichen [Installationsanleitung](https://fwehn.github.io/pp-voiceassistant/docs/installation/) von Finn Wehn gab es einige Lücken. Diese mussten zunächst identifiziert und gelöst werden. Mit diesem Mehraufwand wurde nicht gerechnet. Die nötigen Ergänzungen sind in der [Installationsanleitung dieses Projektes](../installation/instructions.md) festgehalten. <br>
In Zukunft sollte zunächst das Projekt auf welchem aufgebaut werden soll ausführlich getestet werden, bevor sich dafür entschieden wird. 

## Vorgehensreihenfolge

Es wurde zunächst das Grundset an Skills konzipiert und danach erst das bestehende System evaluiert. Dies hatte zur Konsequenz, dass die konzipierten Skills nochmal überarbeitet werden mussten. Dies ist besonders ärgerlich, da die nötigen Änderungen in den Skills durch Rhasspy bedingt waren. Diese Arbeitsdopplung hätte durch eine ausführlichere Initialrecherche verhindert werden können. Allerdings wurden so Lösungsansätze für diese Probleme entdeckt. 

## Freie Benennung von Entitäten

Die freie Benennung von Entitäten wie Weckern, Timern, Listen und Szenen ist mit Rhasspy nicht möglich. Dies wurde in der [Evaluation](../method/evaluation/eval.md#statische-slots) erkannt. Wie schon im [Zwischenfazit](../method/evaluation/conclusion.md) angemerkt und erklärt, ist es mit dem verwendeten Sprachmodell nicht möglich dieses Problem zu lösen. Deshalb wurde an der Stelle die Entwicklung abgebrochen und die Anforderungen iteriert. 