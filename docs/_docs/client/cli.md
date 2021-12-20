---
title: CLI
permalink: /docs/client/cli/
---

Bevor ich das Webinterface erstellt habe, konnte man Skills lediglich über disses CLI (**C**ommand **L**ine **I**nterface) installieren und verwalten.  
Die Bedienung über das Webinterface ist natürlich shr viel einfacher und bietet auch einige Extrafunktionen, allerdings wollte ich das CLI nicht unkommentiert lassen.  

[//]: # (TODO mach besser)

## Befehle

Mit dem CLI kann man verschiedene Funktionen des Skillmanagers nutzen.  
Dazu habe ich einige Befehle definiert.

[//]: #befehle (TODO mach besser)

Mit ``skills remote`` kann man sich alle auf dem Server verfügbaren Skills anzeigen lassen.  
Wohingegen man sich mit dem Befehl ``skills local`` anzeigen lassen kann, welche Skills in welcher Version derzeit installiert und aktiviert sind.  
``updates`` zeigt, ob es für einen lokal installierten Skill eine neue Version gibt.  
  
Hat man einen Skill gefunden, welchen man installieren möchte, so kann man mit dem Befehl ``download`` genau das tun.  
Dabei werden die Dateien heruntergeladen und einige Informationen in der ``skillConfigs.json`` gespeichert.  
Diesen Skill kan man jedoch noch nicht benutzen, dazu muss man den Skill erst mit ``register`` bei Rhasspy registrieren.  
  
Hat ein Skill "ausgedient" oder bringt unerwartete Probleme mit sich, kann man ihn mit ``delete`` löschen.  
Dabei werden auch alle Konfigurationen in der ``skillConfigs.json`` gelöscht.  

[//]: #befehle (TODO screenshots von befehl rückgaben)

[//]: # (## Umsetzung)
[//]: # ()
[//]: # (- primitiv)
[//]: # (- console log)
[//]: # (- console scan)