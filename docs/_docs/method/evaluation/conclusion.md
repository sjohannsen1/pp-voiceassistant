---
title: Zwischenfazit
permalink: /docs/method/evaluation/conclusion/
---

Mittels [Iteration](iteration.md) sind fast alle [identifizierten Probleme](eval.md) des Skillverwaltungssystems gelöst wurden. <br>

Das Problem der fehlenden Flexibilität in der Sprach- und Befehlserkennung könnte durch die Verwendung eines "Mixed Language Models" und einer flexibleren Sprachbefehlserkennung (Intentrecognition) gelöst werden. Dabei wird das individuell generierte Sprachmodell von Rhasspy mit einem größeren, vorgegebenen Sprachmodell nach einem definierten Verhältnis gemischt.  <br>
Das von Rhasspy individuelle generierte Sprachmodell ist ein statistisches Sprachmodell. Dabei generiert Rhasspy einen Intentgraph. Dies ist ein Groph aller möglichen Sätze jedes Intents mit allen unterschiedlichen Einträgen für die Slots. Basierend darauf kann nun für jede Wortabfolge eine Wahrscheinlichkeit errechnet werden. Mithilfe dieser Wahrscheinlichkeiten kann Rhasspy ähnlich klingende Wörter richtig interpretieren. 
Beispielsweise kann Rhasspy so entscheiden das "füge Beeren zu Liste 1 hinzu" der intendierte Satz war, selbst wenn das eigentlich gesagte sich eher wie "füge Bären zu Liste 1 hinzu" angehört hat. <br>
Wird die Einstellung "Mixed Language Models" genutzt, wird ein schon erstelltes, statistisches Sprachmodell, basierend auf der in Rhasspy eingestellten Sprache, mit dem individuell generierten gemischt. Dies hat den Vorteil, dass das Textkorpus, also die Sammlung an Sätzen mit welchen trainiert wird, deutlich umfassender wird. So können beispielsweise sowohl "schalte Lampe an" als auch "könntest du bitte die Lampe anschalten" erkannt werden, selbst wenn nur "schalte Lampe an" Teil der festgelegten Sätzen sind. Der Nachteil davon ist, dass die von Rhasspy benötigte Trainingszeit mit wachsender Größe des Sprachmodells stark ansteigt. Außerdem steigt mit der Menge an erkannten Sätzen der Aufwand der Intentrecognition. <br>
Auch für die Intentrecognition können verschiedene Programme verwendet werden. Diese gehen unterschiedlich mit unbekannten Wörtern um. Rigide Intentrecognition erkennt nur die Intents, welche in Rhasspy eingestellt wurden und ignorieren zusätzliche Wörter. Manche davon erkennen auch falsch geschriebene Wörter oder Änderungen in deren Reihenfolge richtig, in dem sie den der Eingabe ähnlichsten Intent erkennen. Flexiblere  Intentrecognition kann unbekannte und zusätzliche Wörter erkennen und sie sinngemäß einem Sprachbefehl zuordnen. Auch hier ist der Nachteil, dass mit steigender Flexibilität der Intentrecognition sowohl die Trainingszeit als auch die Erkennungzeit steigt. <br>

Basierend auf dieser Recherche wurden für Rhasspy folgende Einstellungen geändert: <br>

````
Intent Recognition: Fsticuffs
fuzzy: true
```` 

Dieses Programm ist zwar so rigide, das es die Trainingszeit und die Erkennungszeit nicht deutlich verlängert, aber es kann Intents auch trotz zusätzlicher Wörter erkennen. Die zusätzlichen Wörter werden ignoriert. <br>

Die richtige Erkennung von unbekannten Wörtern und der darauffolgenden richtigen Zuordnung zu Slots wird von Rhasspy nicht unterstützt. Es wäre allerdings möglich den Slot Eintrag aus dem transkribierten Text zu extrahieren. Dazu muss ein "Mixed Language Model" verwendet werden, da sonst die unbekannten Wörter nicht transkribiert werden. Da sich hier gegen ein solches Modell entschieden wurde, wurde dies nicht umgesetzt. <br>

Aufgrund der erkannten Limitationen von Rhasspy sind einige Funktionen angepasst oder entfernt worden. Die aktualisierte Anforderungsliste befindet sich [hier](../iterated-requirements.md)
