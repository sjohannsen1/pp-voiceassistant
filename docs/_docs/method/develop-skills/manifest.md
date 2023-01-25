---
title: Manifest
permalink: /docs/method/develop-skill/manifest/
---

Der Aufbau einer Manifest Datei hat sich geändert. Wie erstellt werden, ist [hier von Finn Wehn erklärt](https://fwehn.github.io/pp-voiceassistant/docs/create-skills/manifest/). Hier werden lediglich die Änderungen festgehalten. <br>

## Beispiel: Zigbee2MQTT

```
{
  "version": "2.0",
  "dependencies": {
    "fs": "^0.0.1-security",
    "path": "^0.12.7",
    "mqtt": "^4.3.7"
  },
  "options": [
    {
      "name": "Zigbee2MQTT-Topic",
      "type": "String",
      "default": "zigbee2mqtt"
    }
  ],
  "custom_slots": ["zigbee_scenes","zigbee_devices", "zigbee_groups"]
}
```
[Aus: Zigbee2MQTT/manifest.json](../../../../src/client/skills/Zigbee2MQTT/2.0/manifest.json)

## Custom Slots

Benutzt ein Skill dynamische Slots, werden die Namen derer hier eingetragen.

