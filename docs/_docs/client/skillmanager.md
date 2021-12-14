---
title: Skillmanager
permalink: /docs/client/skillmanager/
---

Der Skillmanager ist das Herzstück meines Skillsystems.   
Er stellt einige nützliche Funktionen bereit, unter anderem kümmert er sich um die Verbindung zum Skillserver und die Verwaltung der lokalen Skill Dateien.  

## Skills installieren

Um neue Skills zu installieren, gibt es zwei verschiedene Wege:  
[Online](#online) und [Offline](#offline)  

Für die Online-Variante benötigt man eine Instanz des Skillservers, unter welcher Adresse dieser erreichbar ist, kann man als Umgebungsvariable im Skillmanager speichern.  

### Online

Der Skillmanager sendet zunächst eine Anfrage an den Server und erhält als Antwort ein JSON-Objekt mit einigen Informationen, zu den jeweiligen Skills wie zum Beispiel die verfügbaren Versionen oder eine kleine Beschreibung des jeweiligen Skills.
Die Funktion ``getRemoteSkills`` sortiert diese Daten dann ein wenig und überprüft, ob der jeweilige Skill bereits installiert wurde.  
Diese Daten werden dann vom Webinterface und der CLI verwendet, um dem Nutzer zu zeigen, welche Skills es gibt und wozu diese benutzt werden können.  
  
Mit der Funktion ``downloadSkill`` kann man dann einen bestimmten Skill in einer bestimmten Version herunterladen.  
Dabei wird vom Server eine Zip-Datei heruntergeladen, die dann mit dem Package "adm-zip" entpackt und im entsprechendem Verzeichnis gespeichert werden.  
  
[//]: # (- Skills bei Rhasspy registrieren)

[//]: # (- active und version-flag setzen)


### Offline

#### Manuell
Hat man keine Möglichkeit eine Instanz des Skillservers zu betreiben oder zu erreichen, kann man Skills auch lokal installieren.  
Dazu muss man jedoch einige Sachen beachten.  
Zunächst muss man die Dateien des Skills inm Verzeichnis ``skills/<Name des Skills>/<Version des Skills>`` ablegen.  
Wie das auszusehen hat, habe ich [hier](./../skill/instruction.md#ordner-anlegen) beschrieben.  
Danach muss man in der Datei ``skillConfigs.json`` unter dem Schlüssel mit dem Namen des Skills ein neues Objekt anlegen.  
In diesem Objekt muss man noch das Feld ``version`` mit dem Namen des Unterordners definieren.  
````json
{
  "<Name des Skills>": {
    "version": "<Version des Skills>"
  }
}
````
*Ausschnitt aus der Datei ``skillConfigs.json``*  
  
Nach dem Anlegen der Dateien und der Angaben in der ``skillConfigs.json`` kann man den Skill dann entweder über das CLI oder das Webinterface aktivieren und löschen.  

#### Webinterface
Über das Webinterface kann man obigen Prozess sehr stark vereinfachen.  
Ich habe ein kleines [Upload-Tool](./webinterface.md#upload) erstellt, mit dem man sich die Dateien an der richtigen Position ablegen lassen kann und welches sich um die korrekte Konfiguration kümmert.  
Wichtig dabei ist nur, dass man die Zip-Datei, welche vom Upload-Tool verlangt wird, von den 2 Ordnern (``src`` und ``locales``) under der ``manifest.json`` erstellt wird und nicht vom Eltern-Pfad.  


## Skills aktivieren

Wenn man, wie oben beschrieben einen neuen Skill installiert hat, kann man diesen jedoch nicht sofort nutzen.  
Man muss ihn erst aktivieren.  
Das kann man entweder über die CLI oder über das Webinterface machen.  

Dabei werden einige für den Skillmanager wichtige Konfigurationen getroffen und die verschiedenen Sätze als [Intents](./rhasspy.md#neue-intents-hinzufgen) bei Rhasspy [registriert](./rhasspy.md#rhasspy-trainieren).  

[//]: # (TODO link zum rhasspy api docu von mir)
[//]: # (TODO links zur cli und zu webinterface)
[//]: # (TODO link zum Skillserver.md)
[//]: # (TODO damit gelb--------------------------------------------------------------------------------------------------------------------)

[//]: # (## Skills löschen)

[//]: # (- Skills bei Rhasspy abmelden)

[//]: # (- locale dateien löschen)

[//]: # (- skillConfigs.json bereinigen)

[//]: # ()
[//]: # (## Details auslesen)

[//]: # (- Manifest.json)

[//]: # (- locale files)

[//]: # (## Skills registrieren)

[//]: # (- Rhasspy API)

[//]: # (- Rhasspy Train)