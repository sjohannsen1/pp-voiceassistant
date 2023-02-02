---
title: GetTime Skill
permalink: /docs/method/skills/GetTime/index/
---

Bei GetTime handelt es sich um einen Uhr Skill. Dabei wurde der von [Finn Wehn erstellten Skill](https://fwehn.github.io/pp-voiceassistant/docs/skills/GetTime/) um eine Wecker- und eine Zeitschaltuhrfunktion erweitert. Die Funktionalität dieser ist angelehnt an der von handelsüblichen Weckern und Zeitschaltuhren. 

### Installation

Dieser Skill benötigt keine weitere Hardware oder Services. Es kann lediglich die Benachrichtigung festgelegt werden. Falls diese nicht verändert wird, ist diese mit "Zeit ist abgelaufen" voreingestellt.

### Wecker

Mit dem Wecker können Erinnerungen für ausgewählte Uhrzeiten gestellt werden. Wenn ein Wochentag angegeben wird, wird dieser Wecker an diesem jede Woche wiederholt. Es gibt auch die Möglichkeit, einen Wecker für jeden Werktag zu stellen. Wenn ein Wecker klingelt, also die Uhrzeit erreicht ist, wird eine Benachrichtigung ausgelöst. Was diese Benachrichtigung ist, kann in den Optionen dieses Skills festgelegt werden. Ist ein Wecker abgelaufen, kann dieser mit Snooze verlängert werden. Dabei kann entweder die Dauer um die verlängert werden soll angegeben werden oder standardmäßig um fünf Minuten verlängert werden. Wenn diese Zeit verstrichen ist, wird erneut eine Benachrichtigung ausgelöst. Es können auch alle Wecker ausgegeben werden und Wecker für eine bestimmte Uhrzeit oder einen bestimmten Tag gelöscht werden. Die Wecker werden in einer Datei gespeichert und automatisch ausgelesen und gestellt. So wird gewährleistet, dass auch bei Unterbrechungen im Programm die wiederholenden Wecker gestellt werden. <br>

### Sprachbefehle

... `start` [ GetTime ] stelle einen Wecker [ für | auf ] `0 bis 23` Uhr `0 bis 59` <br>
... `start` [ GetTime ] stelle einen Wecker für [ jeden ] `Wochentag` um `0 bis 23` Uhr `0 bis 59` <br>
... `start` [ GetTime ] Snooze <br>
... `start` [ GetTime ] Snooze für `1 bis 15` Minuten <br>
... `start` [ GetTime ] Lösche den Wecker für `0 bis 23` Uhr `0 bis 59` <br>
... `start` [ GetTime ] Lösche den Wecker für `0 bis 23` Uhr `0 bis 59` am  `Wochentag` <br>
... `start` [ GetTime ] Lösche den Wecker am  `Wochentag` <br>
... `start` [ GetTime ] Welche Wecker [ gibt es | habe ich gestellt | sind gestellt ] <br>


### Slots

Bei dem Wecker werden vier verschiedene Slots genutzt. <br>
`alarm_hours` kann Werte von 0 bis 23 annehmen und beschreibt die Stundenzahl der Weckuhrzeit.<br>
`alarm_minutes` kann Werte von 0 bis 59 annehmen und beschreibt die Minutenzahl der Weckuhrzeit.<br>
`snooze` kann Werte von 1 bis 15 annehmen und beschreibt die Anzahl der Minuten, die gesnoozed werden soll.<br>
`alarm_repeat` kann entweder den Namen eines Wochentags annehmen oder "Werktags". Dies beschreibt die Tage an denen Wecker wiederholt werden sollen.<br>

### Timer

Der Timer kann genutzt werden, um Zeitschaltuhren zu stellen. Die Dauer dieser wird beim Stellen festgelegt. Wenn die Uhr abläuft, wird eine Benachrichtigung ausgelöst. Auch hier kann durch Snooze der Timer verlängert werden. Außerdem kann jederzeit abgefragt werden, wie viel Zeit noch verbleibt. Der Timer kann auch vor Ablauf gestoppt und gelöscht werden.

### Sprachbefehle

... `start` [ GetTime ] stelle einen Timer [ für | auf ]  `1 bis 240`  Minuten <br>
... `start` [ GetTime ] stelle einen Timer [ für | auf ] `0 bis 240` Minuten und `0 bis 59` Sekunden <br>
... `start` [ GetTime ] Snooze <br>
... `start` [ GetTime ] Snooze für `1 bis 15` Minuten <br>
... `start` [ GetTime ] wie lange noch <br>
... `start` [ GetTime ] wie lange läuft der Timer noch <br>
... `start` [ GetTime ] stoppe den Timer <br>
... `start` [ GetTime ] stop <br>

### Slots 

Der Timer benutzt zwei verschiedene Slots. <br>
`minutes` kann Werte von 0 bis 240 annehmen und beschreibt die Anzahl der Minuten für die der Timer gestellt werden soll.<br>
`seconds` kann Werte von 0 bis 59 annehmen und beschreibt die Anzahl der Sekunden für die der Timer gestellt werden soll.<br>

