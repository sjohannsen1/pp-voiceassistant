---
title: Listen
permalink: /docs/method/skills/Lists/index/
---

Lists in ein Skill, mit welchem Listen erstellt und verwaltet werden können. Diese werden automatisch fortlaufend nummeriert benannt und können auch gespeichert und an den Bot gesendet werden. 

### Installation 

Da Rhasspy nur bekannte Eingaben verstehen kann, müssen mögliche Listeneinträge in die Datei `list_items` eingetragen werden. 

### Sprachbefehle

... `start` Listen Erstelle eine neue Liste <br>
... `start` Listen neue Liste <br>
... `start` Listen Füge `list_items` (zur  [ Liste ]  | zu ) `list_names` hinzu
... `start` Listen Lösche [ die Liste ] `list_names`
... `start` Listen Exportiere [ die Liste ] `list_names`
... `start` Listen schicke  [ die Liste ] `list_names` an ( mein Handy | meinen Bot | meinen Rechner | meinen Computer )
... `start` Listen ( speicher | speichere | speichern ) [ die Listen ] 
... `start` Listen [ Entferne | Streiche | Lösche } `list_items`  von [ Liste ]  `list_names`

### Slots

Lists verwendet zwei verschiedene dynamische Slots. `list_names` enthält die Namen aller erstellten Listen. Wird eine neue erstellt, wird dieser aktualisiert, indem es an Rhasspy gesendet wird. 

`list_items` enthält alle möglichen Listeneintrage
`list_names` enthält die Namen aller erstellten Listen