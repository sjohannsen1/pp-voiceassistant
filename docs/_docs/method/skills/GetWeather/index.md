---
title: GetWeather
permalink: /docs/method/skills/GetWeather/index/
---

Bei GetWeather handelt es sich um einen Wetterdienst Skill. Dabei wurde der von [Finn Wehn erstellten Skill](https://fwehn.github.io/pp-voiceassistant/docs/skills/GetWeather/) erweitert.

### Installation

Vor der Aktivierung dieses Skills müssen einige Optionen festgelegt werden. Die Postleitzahl, Region, Sprache und Land des Orts, für den der Wetterdienst genutzt werden soll, müssen eingetragen werden. Außerdem wird eine API-Key für OpenWeatherMap benötigt, um die Wetterdaten abzufragen.

### Wettervorhersagen

GetWeather kann Informationen zum Wetterbericht für bis zu fünf Tage in der Zukunft abfragen. Wenn das Wetter für den aktuellen Tag abgefragt wird, werden zusätzlich aktive amtliche Wetterwarnungen ausgegeben. Falls Wetterwarnungen vorliegen, wird bei aktivem Bot die genaue Beschreibung der Warnung übermittelt. Der Sprachassistent benachrichtigt lediglich über den Titel der Warnung. Zusätzlich ist es auch möglich, sich über bestimmte Wetterphänomene in einem Zeitraum zu informieren. Abfragbar sind markante Wetterbedingungen der nächsten fünf Tage, die Regenwahrscheinlichkeit der nächsten 1 bis 24 Stunden so wie ob die Temperatur in den nächsten 1 bis 24 Stunden unter einen Grenzwert fällt.

### Sprachbefehle

... `starte` [ den ] Wetterdienst wie [ ist ] das Wetter ( aktuell | gerade | jetzt ) [ ist ] <br>
... `starte` [ den ] Wetterdienst wie [ wird ] das Wetter in ( 1 bis 4 ) Tagen [ wird ] <br>
... `starte` [ den ] Wetterdienst wie [ wird ] das Wetter `tage` [ wird ] <br>
... `starte` [ den ] Wetterdienst ob es in den nächsten ( 1 bis 4) Tagen markantes Wetter gibt <br>
... `starte` [ den ] Wetterdienst ob es [ heute ] Wetterwarnungen gibt <br>
... `starte` [ den ] Wetterdienst ob es `tage` markantes Wetter gibt <br>
... `starte` [ den ] Wetterdienst ob es in den nächsten (0 bis 24) stunden ( regnet | schneit | regnet oder schneit | regnen soll ) <br>
... `starte` [ den ] Wetterdienst ob es in den nächsten ( 0 bis 24 ) stunden kälter als ( 0 bis 25 ) Grad wird <br>

### Slots

`day` kann Werte eins bis fünf annehmen und beschreibt die Anzahl der Tage, die der Tag für den abgefragt wird, in der Zukunft liegt <br>
`day_names` kann "heute", "morgen" oder "übermorgen" annehmen und beschreibt den Tag, für den die Wettervorhersage abgefragt wird. Wird in eine Zahl umgewandelt an den Skill weitergeleitet <br>
`hours` kann Werte zwischen null und 24 annehmen und beschreibt die Anzahl an Stunden, welche ein Wetterereignis in der Zukunft liegen soll <br>
`temp_limit` kann Werte zwischen null und 25 annehmen und beschreibt die Grenztemperatur ab welcher benachrichtigt werden soll <br>



