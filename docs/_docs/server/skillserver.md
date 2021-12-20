---
title: Skillserver
permalink: /docs/server/skillserver/
---



## Fileserver
Beim Skillserver handelt es sich in erster Linie um einen einfachen Fileserver.  
Mit verschiedenen HTTP-Anfragen kann man Informationen zu Skills und deren Versionen erfragen und dann den gewünschten Skill als ``.zip``-Datei herunterladen.  
Die ``.zip``-Datei wird dann vom [Skillmanager](./../client/skillmanager.md#online) entpackt und die Dateien an der richtigen Stelle abgelegt.  

## Versionen
- ``versions.json`` speichert alle verfügbaren versionen zu allen skills
- dadurch spätere auflösung in verzeichnisse
- ``latest``-Version immer 0. eintrag im jeweiligen Array

````json
{
  "GetTime": ["1.0"],
  "GetWeather": ["1.0"],
  "HelloWorld": ["3.0","2.0","1.0"]
}
````
*Aktuelles Beispiel*
- HelloWorld versionen lediglich ein test da es sich immer um die gleichen dateien handelt
- ``skills/HelloWorld/3.0``
- ``skills/HelloWorld/2.0``
- ``skills/HelloWorld/1.0``


## Upload
- Dateien als Zip hochladen
- Version und namen auswählen
- kein syntaxchecker -> man muss sicher sein, dass der skill funktioniert
- 
