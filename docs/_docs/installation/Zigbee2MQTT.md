---
title: Installation Zigbee2MQTT
permalink: /docs/installation/Zigbee2MQTT/
---

Um den Service Zigbee2MQTT zu installieren, kann dieser [Installationsanleitung](https://www.zigbee2mqtt.io/guide/installation/01_linux.html) gefolgt werden. Falls der Standarduser des Pis verändert wurde muss bei der Installation darauf geachtet werden. <br>

Die Geräte müssen mit Zigbee2MQTT verbunden werden, damit sie darüber gesteuert werden können. Um sie zu verbinden, müssen diese zurückgesetzt werden. Wie das genau funktioniert, ist von Hersteller zu Hersteller unterschiedlich und muss für jedes Gerät herausgefunden werden. 
Nun muss Zigbee2MQTT in den Pairing-Modus versetzt werden. Der einfachste Weg dies zu tun, ist die Benutzeroberfläche auf Port 8080 aufzurufen. Durch Auswählen der Schaltfläche "Anlernen aktivieren" beziehungsweise "Permit Join All" können sich knapp vier Minuten lang Geräte verbinden. 
<br>
Die Geräte müssen dann noch einen Namen erhalten. Ohne diesen werden sie über ihre IEEE Adresse adressiert. Um den Namen zu ändern, muss das Gerät ausgewählt werden und in dem Feld "friendly name" ein neuer Name eingegeben werden. Über diesen kann das Gerät dann sowohl mit dem Zigbee2MQTT- als auch dem Automatisierungsskill angesprochen werden.

