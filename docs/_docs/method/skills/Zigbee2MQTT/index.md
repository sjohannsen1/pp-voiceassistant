---
title: Zigbee2MQTT Skill
permalink: /docs/method/skills/Zigbee2MQTT/index/
---

Mit diesem Skill können Zigbee Geräte gesteuert werden. Dies sind Smarthome-Geräte, welche über das Protokoll ZigBee kommunizieren. Unter Verwendung des Services ZigBee2MQTT sind dieses auch über MQTT ansteuerbar. Dabei verwaltet ZigBee2MQTT die Geräte. 

### Zusätzliche Hardware

Für diesen Skill wird zusätzliche Hardware benötigt. Um mit Zigbee kommunizieren zu können, muss ein Zigbee Stick verwendet werden. Für dieses Projekt wurde ein ConBee II Stick benutzt. Außerdem sind Smarthome-Geräte unabdingbar. 

### Installation

Für diesen Skill muss der [Service Zigbee2MQTT zusätzlich installiert und alle Geräte damit verbunden werden](../installation/Zigbee2MQTT).
Wenn das alles installiert und verbunden wurde, kann der Skill installiert und aktiviert werden. 

### Sprachbefehle 

... `start` [mein] Smarthome schalte [mein | meine | die | das | den] `zigbee_devices` `state` <br>
... `start` [mein] Smarthome um [mein | meine | die | das | den] `zigbee_devices` `state` zu schalten <br>
... `start` [mein] Smarthome Ist  [gerade] `zigbee_devices` `state` <br>
... `start` [mein] Smarthome [ Um | Speichere ] die Einstellung von `zigbee_devices` [ zu speichern ]
... `start` [mein] Smarthome [ Um | stelle ] die Szene `zigbee_scenes` [ ein | einzustellen ]

### Sprachbefehle für Gruppen 

... `start` [mein] Smarthome [ Um | Füge ] `zigbee_devices` zu `zigbee_groups` [ hinzu | hinzuzufügen ] <br>
... `start` [mein] Smarthome [ Um | Lösche | Entferne ] `zigbee_devices` [ von | aus ] `zigbee_groups` [ zu löschen ] <br>
... `start` [mein] Smarthome  Welche Gruppen [ gibt es | sind gespeichert ] <br>
... `start` [mein] Smarthome [ Liste | Nenne mir | Gib mir ] alle Gruppen [ auf | aus ] <br>
... `start` [mein] Smarthome schalte [mein | meine | die | das | den] `zigbee_groups` `state` <br>
... `start` [mein] Smarthome um [mein | meine | die | das | den] `zigbee_groups` `state` zu schalten <br>
... `start` [mein] Smarthome Ist  [gerade] `zigbee_groups` `state` <br>
... `start` [mein] Smarthome [ Um | Speichere ] die Einstellung von `zigbee_groups` [ zu speichern ] <br>

### Sprachbefehle für Lampen

... `start` [mein] Smarthome [ schalte | um ] [ mein | meine | die | das | den ] `zigbee_devices` auf `0 bis 100` Prozent [ Helligkeit ] [ zu ] [machen | schalten] <br>
... `start` [mein] Smarthome [ schalte | um | Mache] [ das Licht von ] `zigbee_devices` `brightness_change` [ zu ] [ machen | schalten ] <br>
... `start` [mein] Smarthome [ schalte | um | Mache] [ das Licht von ] `zigbee_devices` `light_temp` [ zu ] [ machen | schalten ] <br>
... `start` [mein] Smarthome [ schalte | um | Mache ] [ das Licht von ] `zigbee_devices` `temp_change` [ zu ] [ machen | schalten ] <br>
... `start` [mein] Smarthome [ schalte | um | Mache ] [ das Licht von ] `zigbee_devices` `light_color` [ zu ] [machen | schalten] <br>
... `start` [mein] Smarthome Wie hell ist `zigbee_devices` [ gerade | aktuell ] <br>

### Sprachbefehle für Gruppen von Lampen

... `start` [mein] Smarthome [ schalte | um ] [ mein | meine | die | das | den ] `zigbee_groups` auf `0 bis 100` Prozent [ Helligkeit ] [ zu ] [machen | schalten] <br>
... `start` [mein] Smarthome [ schalte | um | Mache] [ das Licht von ] `zigbee_groups`  `brightness_change` [ zu ] [ machen | schalten ] <br>
... `start` [mein] Smarthome [ schalte | um | Mache] [ das Licht von ] `zigbee_groups` `light_temp` [ zu ] [ machen | schalten ] <br>
... `start` [mein] Smarthome [ schalte | um | Mache ] [ das Licht von ] `zigbee_groups`  `temp_change` [ zu ] [ machen | schalten ] <br>
... `start` [mein] Smarthome [ schalte | um | Mache ] [ das Licht von ] `zigbee_groups`  `light_color` [ zu ] [machen | schalten] <br>
... `start` [mein] Smarthome Wie hell ist `zigbee_groups` [ gerade | aktuell ] <br>

### Slots

Dieser Skill verwendet neben mehreren statischen Slots auch drei dynamische. Diese sind `zigbee_devices`, `zigbee_groups` und `zigbee_scenes`. Die Zigbee Geräte und Gruppen werden von Zigbee2MQTT über MQTT mitgeteilt und dann an Rhasspy gesendet. Dazu abonniert das Skillsystem das Topic "Zigbee2MQTT/Bridge". Hier werden bei Änderungen oder Starten von Zigbee2MQTT alle verbundenen Geräte und alle bekannten Gruppen veröffentlicht. Wenn eine Nachricht ankommt, werden die Namen der Geräte und Gruppen extrahiert und als Slots an Rhasspy gesendet. Auch das "Config" Objekt erhält eine Liste mit Gruppen und eine mit Geräten. <br>
Anders ist es bei `zigbee_scenes`. Szenen sind gespeicherte Konfigurationen von Geräten, welche mit einem Namen und einer Identifikationsnummer (ID) versehen werden und so wieder aufgerufen werden können. Zigbee2MQTT speichert diese Szenen zwar, bietet aber keine Schnittstelle um die gespeicherten Szenen auszugeben. Deshalb muss der Skill gespeicherte Szenen eigens speichern und verwalten. Wird nun also eine Szene neu erstellt, werden Name und ID generiert und an Zigbee2MQTT gesendet. Der Skill speichert diese Daten in einer Datei und sendet den Namen der Szene an Rhasspy, wo sie zu diesem Slot hinzugefügt wird. Wird eine Szene aufgerufen, erkennt Rhasspy den Namen und der Skill kann anhand der Datei die zugehörige ID ermitteln. Wenn diese dann an Zigbee2MQTT gesendet wird, kann die Szene aufgerufen werden. <br>

Die restlichen Slots nutzen Substitutionen, um sprachabhängige Eingaben als sprachunabhängigen Parameter an den Skill weiter zu geben. Beispielsweise werden die Farbnamen in `light_color` mit der zugehörigen Hexadezimal Representation im RGB-Farbraum ersetzt. <br>

`zigbee_devices` kann die Namen aller Zigbee2MQTT bekannten Geräte annehmen. <br>
`zigbee_groups`  kann die Namen aller Zigbee2MQTT bekannten Gruppen annehmen. <br>
`zigbee_scenes`  kann die Namen aller Zigbee2MQTT bekannten Szenen annehmen. <br>
`state` kann "ein", "an", "aus" sein und beschreibt den Zustand des Geräts. <br>

`brightness` kann Werte von 0 bis 100 annehmen und beschreibt die Helligkeit einer Lampe in Prozent. <br>
`brightness_change` kann entweder "heller" oder "dunkler" sein und beschreibt die Änderung der Helligkeit einer Lampe. <br> 
`light_temp` kann entweder "kalt", "warm" oder "neutral" sein und beschreibt die Lichttemperatur einer Lampe. <br>
`temp_change` kann entweder "kälter", "wärmer", "röter" oder "blauer" sein und beschreibt die Änderung der Lichttemperatur einer Lampe. <br>
`light_color` kann den Namen einer Farbe annehmen und beschreibt die Farbe des Lichts einer Lampe. <br>