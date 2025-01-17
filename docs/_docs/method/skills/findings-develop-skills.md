---
title: Erkenntnisse zur Entwicklung von Skills
permalink: /docs/method/skills/findings-develop-skills/
---

## Sprachunabhängigkeit

Es sollte bei der Entwicklung von Skills auf Sprachunabhängigkeit geachtet werden. In dem Funktionalität streng von der Sprach Ein- und Ausgabe getrennt wird, können neue Sprachen zu einem Skill hinzugefügt werden ohne dass der Quellcode verändert werden muss. Bei dem verwendeten System ist es ausreichend, eine neue locale-Datei für die gewünschte Sprache zu erstellen und diese Sprache dann zu aktivieren. Es muss nur darauf geachtet werden, dass diese Datei nach dem Vorbild der anderen locale-Dateien erstellt wird.  

#### Slotsubstitutionen

Die Sprachunabhängigkeit wird durch Slotsubstitutionen durch Rhasspy unterstützt. Sloteinträge können so definiert werden, dass das erkannte Wort durch ein festgelegtes Wort ersetzt und so an den Skill überreicht wird. Dies ist beispielsweise für Farben nützlich, welche so direkt als ihre RGB-Darstellung an den Skill weitergegen werden.

## Fehlerbehandlung

Eine aussagekräftige Fehlerbehandlung ist wichtig. Dem Nutzenden sollte im Falle eines Fehlers sowohl die gesamte Fehlermeldung in Textform, als auch eine vereinfachte Form dieser von Rhasspy ausgegeben werden. So können diese Fehler direkt identifiziert und behandelt werden. Durch die vereinfachte Fehlermeldung ist es auch Personen mit mangelnden Technikkenntnissen möglich, sich Hilfe zu suchen. 

## Unabhängingkeit von Skills

Die Skills sollten voneinander unabhängig sein. Auch wenn Abhängigkeiten Codedopplungen in einzelnen Skills vermeiden könnten, sollte hiervon zwecks Modularität abgesehen werden. Dem Nutzenden wird so die volle Entscheidungsgewalt über die installierten und genutzten Skills gegeben. 

## Personalisierbarkeit

Die Schnittstelle zur Personalisierung von Skills sollte möglichst einfach gehalten werden. Ein Kriterium dafür ist, dass Fehler in der Personalisierung nicht zur Störung des Systems führen. Falls beispielsweise eine Eingabe falsch ist, sollte maximal die Funktionalität, die diese nutzt eingeschränkt sein. Noch besser wäre es, wenn diese Fehler sofort abgefangen werden und der Nutzende darauf aufmerksam gemacht wird. Ein anderes Kriterium ist, dass die Schnittstelle keinen direkten Eingriff in die Konfiguration des Skills erfordert. Es kann zwar die Möglichkeit gegeben werden, die Skills vor Inbetriebnahme mit personalisierten Einstellungen direkt zu füllen, bei Laufzeit des Skills sollte allerdings die Personalisierung über eine externe Schnittstelle vorgenommen werden.  
Im vorliegenden System gibt es beispielsweise die Möglichkeit, vor Installation eines Skills diesen mithilfe einer Konfigurationsdatei mit personalisierten Daten zu füllen. Soll diese Datei zu Laufzeit erweitert werden, ist es nicht nötig direkt darauf und somit auf den Raspberry Pi zuzugreifen, sondern es kann der Chatbot genutzt werden. 

## Antworten

Bei der Definition der Antworten des Sprachassistenten sollte möglichst die Nutzereingabe aufgegriffen und wiederholt werden. So kann ausgeschlossen werden, dass der Sprachassistent den Nutzenden falsch verstanden hat und so ein Fehler unterlaufen ist. Löst der Intent eine Aktion aus, aus der das Verstandene erkennbar ist, ist dies nicht nötig. Beispielsweise wenn Lampen gesteuert werden sollen, kann an der veränderten Einstellung der Lampe erkannt werden, was der Sprachassistent verstanden hat.