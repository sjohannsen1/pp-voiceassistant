---
title: Konfigurationsdateien
permalink: /docs/method/develop-skill/configs/
---

Sollen in einem Skill Konfigurationsdateien zum personalisieren verwendet werde, müssen diese im Ordner "savefiles" abgelegt werden.  
Wie diese genau aussehen sollen, ist abhängig von den Daten die darin gespeichert werden sollen. In den beiden Skills (Lists und Playmusic) die diese verwenden, sind diese Dateien im JSON Format und können so nach dem Auslesen direkt in Listen umgewandelt und dann verwendet werden.  

Soll der Chatbot Einträge an diese Dateien anhängen können, muss die .env Datei des Bots um eine Umgebungsvariable mit dem Pfad zur Datei erweitert werden. Dann muss noch der "onMessageCreate" Eventlistener um eine Nachricht mit dem anzuhängenden Inhalt ergänzt werden. 