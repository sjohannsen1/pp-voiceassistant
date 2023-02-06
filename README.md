# Praxisprojekt zur Entwicklung eines Grundsets an Skills für einen Open Source Sprachassistenten


Bei Sprachassistenten handelt es sich um natürlichsprachliche Dialogsysteme. Sie erledigen Aufgaben für Nutzende durch Reaktion auf ihre Anfragen. Herkömmliche Sprachassistenten, wie Google Assistent, Alexa und Siri,  nehmen kontinuierlich Audiomitschnitte auf und werten diese aus. Wird das Aktivierungswort erkannt, wird der Audiomitschnitt an den Server gesendet. Das kann ein Datenschutzproblem darstellen. Als Alternative zu solchen Sprachassistenten existieren verschiedene Open Source Frameworks wie zum Beispiel Rhasspy. Der Unterschied besteht darin, dass die aufgenommenen Audiomitschnitte lokal ausgewertet werden können. Um die Open Source Lösungen zu verwenden ist eine Einrichtung des Assistenten nötig. Der Sprachassistent kann zunächst die Aufnahmen nur verstehen. Ihm fehlen die Funktionen, um die verstandenen Befehle auszuwerten und ausführen können.  Diese Funktionen werden Skills genannt. Das Erstellen von Skills kann besonders für fachfremde Personen eine große Hürde darstellen.  
Das Ziel dieses Praxisprojektes ist die Entwicklung eines Grundsets an Skills für den Open Source Sprachassistenten Rhasspy. Dabei soll auch ermittelt werden, ob es Best Practices zur Entwicklung der Skills gibt.   
Um dieses Ziel zu erreichen, wurde auf dem [Skillverwaltungssystem von Finn Wehn](https://github.com/fwehn/pp-voiceassistant) aufgebaut. Zur Ermittlung der zu entwickelnden Skills wurden Protokolle über den Tagesablauf mehrerer Personen ausgewertet. Wiederkehrende Abläufe wurden identifiziert und durch eine Anforderungsanalyse unterstützende Skills konzipiert. Daraufhin wurde das Skillverwaltungssystem von Finn Wehn mit Hinsicht auf die Umsetzbarkeit der ermittelten Skills evaluiert. Durch Iteration des Systems wurde versucht erkannte Probleme zu lösen. Falls das nicht möglich war, wurden diese Probleme festgehalten und der Skill angepasst. Schließlich wurden die Skills implementiert. 

# Nützliche Links

## Installation

[Anleitung](https://sjohannsen1.github.io/pp-voiceassistant/docs/installation/index/)

## Verlinkungen zu Teilen des Projekts

[Grundset an Skills](./src/client/skills/) <br>

[Chatbot](./src/discord_client/) <br>

[Dokumentation](https://sjohannsen1.github.io/pp-voiceassistant/) <br>
