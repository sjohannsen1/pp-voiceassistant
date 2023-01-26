---
title: Anleitung
permalink: /docs/installation/instructions.md
---

## Einrichtung des Raspberry Pis

Zunächst kann der Installationsanleitung von [Finn Wehn](https://fwehn.github.io/pp-voiceassistant/docs/installation/) gefolgt werden. Allerdings müssen dabei ein paar Dinge beachtet werden. 
Es wird mit einer SD-Karte mit der 32 Bit version des Raspberry Pi OS gestartet. Falls bei der Installation des Betriebsystems der Standardnutzer `pi` geändert wurde, müssen bei der weitergehenden Installation ein paar Dinge angepasst werden. Diese sind markiert.
Diese wird in den Raspberry Pi gesteckt und dieser dann gestartet. Ist dieser mit einem Netzwerk verbunden, kann sich nun mit einem Computer per SSH verbunden werden. [SSH](https://www.ssh.com/academy/ssh#the-ssh-protocol), oder auch Secure Shell, ist ein Netzwerkprotokoll, mit welchem auf das Terminal des Pis zugegriffen werden kann. Alternativ kann auch ein Bildschirm, eine Maus und eine Tastatur angeschlossen werden und ein Terminal direkt auf dem Pi geöffnet werden. <br>
Darüber müssen auf dem Pi ein MQTT-Broker, in diesem Fall [Mosquitto](https://mosquitto.org/), eine Rhasspy-Instanz, die Laufzeit-Umgebung [NodeJS](https://nodejs.org/de/) und [Git](https://git-scm.com/download/linux) installiert werden. 

## Rhasspy

Falls der Standardnutzer des Raspberry Pi geändert wurde, muss der Nutzer zur "audio" Gruppe hinzugefügt werden. Dazu kann dieser Befehl in einem Terminal eingegeben werden: `sudo usermod -a -G audio NUTZERNAME` <br>
Bei der Installation der [Rhasspy-Instanz](https://rhasspy.readthedocs.io/en/latest/installation/) muss beachtet werden, dass diese in der richtigen Sprache, in diesem Fall deutsch, vorgenommen wird. Außerdem muss Zugriff auf den MQTT-Broker gewährleistet werden. [Von Rhasspy wird empfohlen](https://rhasspy.readthedocs.io/en/latest/tutorials/#simple-skill), dafür den Docker-Container im Host-Networking-Modus laufen zu lassen. Dadurch teilt sich der Docker-Container einen Namensraum mit dem restlichen System und kann so ohne weitere Konfiguration auf den MQTT-Broker via dessen Port zugreifen. Der Befehl zum Starten des Rhasspy Docker Images lautet somit:

````
 $ docker run -d -p 12101:12101 \
      --network host \
      --name rhasspy \
      --restart unless-stopped \
      -v "$HOME/.config/rhasspy/profiles:/profiles" \
      -v "/etc/localtime:/etc/localtime:ro" \
      --device /dev/snd:/dev/snd \
      rhasspy/rhasspy \
      --user-profiles /profiles \
      --profile de 
````
### Einstellungen von Rhasspy

Bei Rhasspy müssen einige Dinge eingestellt werden. Dazu wird die Weboberfläche auf Port 12101 aufgerufen.

1. MQTT: External &ensp; &ensp; - In den Einstellungen muss dann der Host und der Port des MQTT-Brokers angeben werden. Wenn nichts an dieser Anleitung geändert wurde sind das `localhost` und `1883`. <br>
2. Audio Recording: PyAudio
3. Wake Word: Porcupine   &ensp; &ensp; - Das genaue Wake Word kann frei aus einer Liste gewählt werden
4. Speech to Text: Kaldi
5. Intent Recognition: Fuzzywuzzy
6. Text to Speech: NanoTTS
7. Audio Playing: aplay
8. Dialogue Management: Rhasspy
9. Intent Handling: Local Command

## Installation des Skillverwaltungssystems 

Dann muss dieses Projekt installiert werden. Die einfachste Methode dafür ist, das Repository zu klonen. Wenn dies geklont ist, muss nur noch in den einzelnen Ordnern, also dem Discord Client, der Custom SDK, dem Client und, falls gewollt, dem Server, jeweils der Befehlt 'npm install' durchgeführt werden. 

Um die Skills zu installieren, müssen diese auf dem Pi hochgeladen und aktiviert werden. Dazu kann der Skillmanager entweder über die [Weboberfläche](https://fwehn.github.io/pp-voiceassistant/docs/client/webinterface/) oder über die [Befehlszeilenschnittstelle](https://fwehn.github.io/pp-voiceassistant/docs/client/cli/) verwendet werden. Alternativ kann dies auch [manuell](https://fwehn.github.io/pp-voiceassistant/docs/client/skillmanager/) direkt auf dem Pi vorgenommen werden. 

## Installation des Discord Clients

Zunächst muss eine neue [Anwendung erstellt](https://discord.com/developers) werden. Dazu wird ein Discord-Account benötigt. Durch einen Klick auf „New  Application“ öffnet sich ein Menü, in welchem die Applikation benannt wird. Wenn dort alles ausgefüllt ist, kann mit „Create“ bestätigt werden. Daraufhin öffnet sich eine neue Seite, auf der nichts eingegeben werden muss. Nun wird der Bot erstellt. Dafür wird im Menü links die Schaltfläche „Bot“ angeklickt.  Durch Auswahl von „Add Bot“ und anschließendem Bestätigen wird ein neuer Bot erstellt. Diese benötigt nun ein paar Berechtigungen. Diese befinden sich unten auf der Seite unter „Privileged Gateway Intents“. Nötig ist hier „Message Content Intent“. Ohne diese kann der Bot keine Nachrichten lesen. Um mit dem Bot nun interagieren zu können, muss dieser zu einem Server hinzugefügt werden. Zuerst wird der OAuth2 URL Generator genutzt um eine URL (Uniform Resource Locator) zu erzeugen. Hier müssen nun genauere Berechtigungen vergeben werden. Dazu zunächst unter „Scopes“ Bot auswählen. Dann die Berechtigungen „Send Messages“, „Create Private Threads“ und „Send Messages in Threads“  auswählen und die generierte URL kopieren.

### Server erstellen

Ein Server kann in der [Browserapplikation](https://discord.com/channels/@me) von Discord erzeugt werden. Dafür links auf den Kreis mit dem Plus klicken, dem Server einen Namen geben und schon existiert dieser Server. Um den Bot nun dort einzuladen, muss nur die URL aufgerufen werden und der Server ausgewählt und bestätigt werden. 

### Bot mit Code versehen

Auf der Seite des Bots [https://discord.com/developers/applications -> Applikation -> Bot] befindet sich die Schaltfläche „Reset Token“. Wenn auf diese geklickt und bestätigt wird erscheint das Token. Das ist das Passwort des Bots. Dieses nun kopieren und dann als Umgebungsvariable im Ordner des Bots in einer „.env“ Datei speichern.
Wenn nun mit 'npm start' der Bot Client gestartet wird, loggt sich der Bot ein und wartet auf Nachrichten. 

