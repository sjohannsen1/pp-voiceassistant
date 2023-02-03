---
title: Konfigurationsdateien
permalink: /docs/method/develop-skills/configs/
---

Sollen in einem Skill Konfigurationsdateien zur Personalisierung verwendet werde, so müssen diese im Ordner "savefiles" abgelegt werden.  
Wie diese genau aussehen sollen, ist abhängig von den Daten die darin gespeichert werden sollen. In den beiden Skills die diese verwenden, sind diese Dateien im JSON Format und können so nach dem Auslesen direkt in Listen umgewandelt und dann verwendet werden.  

Soll der Chatbot Einträge an diese Dateien anhängen können, muss die .env Datei des Bots um eine Umgebungsvariable mit dem Pfad zur Datei erweitert werden. Dann muss noch der "onMessageCreate" Eventlistener um eine Nachricht mit dem anzuhängenden Inhalt ergänzt werden. Nun muss die Funktion so eingerichtet werden, das bei einer eintreffenden Nachricht die Informationen aus dieser ausgelesen und in die Konfigurationsdatei geschrieben wird.