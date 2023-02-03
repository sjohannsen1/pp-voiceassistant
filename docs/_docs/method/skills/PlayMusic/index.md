---
title: Start
permalink: /docs/method/skills/PlayMusic/index/
---

Bei PlayMusic handelt es sich um einen Skill, welcher Musikdateien oder Radiosender abspielen kann. 

### Installation

Falls der Standardnutzer des Pis geändert wurde, muss der Nutzer zur "audio" Gruppe hinzugefügt werden. Dazu kann dieser Befehl in einem Terminal eingegeben werden: `sudo usermod -a -G audio NUTZERNAME` <br>
Bevor Musik oder Radio abgespielt werden muss, müssen diese eingerichtet werden. Für Musik muss der Titel, der Interpret und der Speicherort des Lieds in die Datei `configSongs` eingetragen werden. In die Datei `configRadio` müssen Name und die Streamurl des Senders eingetragen werden. Die Streamurl ist die Internetadresse, über welche die Tonspur des Radios zu finden ist. Wenn beides nicht eingerichtet wird, können weder Radio noch Musik abgespielt werden. Bei Aktivierung des Skills werden die Dateien dann leer erzeugt und können über die Schnittstelle des Bots befüllt werden. 

### Radio

Radiosender können ausgegeben und abgespielt werden. Es können außerdem Informationen über das Gehörte abgefragt werden und aus dem Stream ausgelesen werden. Die Wiedergabe kann gestoppt werden. 

### Sprachbefehle nur fürs Radio

... `start` [ Musikplayer ] [ und ] [ starte ] das Radio <br>
... `start` [ Musikplayer ] [ und ] mach das Radio an <br>
... `start` [ Musikplayer ] [ und ] [ nächster | anderer ] [ Sender | Radiosender ] <br>
... `start` [ Musikplayer ] [ und ] Welcher [ Sender | Radiosender ] spielt gerade <br>
... `start` [ Musikplayer ] [ und ] Spiele den [ Sender | Radiosender ] `radiostations` ab <br>
... `start` [ Musikplayer ] [ und ] Welche [ Sender | Radiosender ] gibt es <br>
... `start` [ Musikplayer ] [ und ] Was kann ich [im] Radio hören <br>

### Musikdateien

Lieder können ausgegeben und abgespielt werden. Es kann abgefragt werden, was momentan abgespielt wird. Die Wiedergabe kann gestoppt werden.

### Sprachbefehle für Musik

... `start` [ Musikplayer ] [ und ] Spiele [ das Lied | den Song ] `songs` ab <br>
... `start` [ Musikplayer ] [ und ] Welche [ Lieder | Songs ] gibt es <br>

### Sprachbefehle für Musik und Radio

... `start` [ Musikplayer ] [ und ] Was läuft gerade <br>
... `start` [ Musikplayer ] [ und ] Was wird gerade abgespielt <br>
... `start` [ Musikplayer ] [ und ] Mach [ das | die ] [ Radio | Musik ] aus <br>
... `start` [ Musikplayer ] [ und ] ( Stoppe | Stop ) [ die | das ] [ Musik | Radio | Wiedergabe ] <br>

### Slots

Die Slots `radiostations` und `songs` werden dynamisch befüllt. Zunächst liest der Skill bei Aktivierung die Konfigurationsdateien ein und sendet sie Sendernamen und den Interpreten und Liedtitel der Lieder an Rhasspy. Wenn über die Schnittstelle des Bots neue Sender oder Lieder hinzugefügt werden, sendet der Bot diese an Rhasspy. 

`radiostations` kann alle gespeicherten Radiosender annehmen
`songs` kann alle gespeicherten Lieder annehmen