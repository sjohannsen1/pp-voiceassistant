---
title: Home Assistant
permalink: /docs/evaluation/home-assistant/
---

- Python
- ``manifest.json`` beschreibt die Integration und gibt dependencies an
```json
{
  "domain": "hue",
  "name": "Philips Hue",
  "documentation": "https://www.home-assistant.io/components/hue",
  "issue_tracker": "https://github.com/balloob/hue/issues",
  "dependencies": ["mqtt"],
  "after_dependencies": ["http"],
  "codeowners": ["@balloob"],
  "requirements": ["aiohue==1.9.1"],
  "quality_scale": "platinum",
  "iot_class": "local_polling"
}
```

##
- Übernehmen tue ich:
  - simplifizierte Version der ``manifest.json``

## Quellen

[Home Assistant Docs](https://developers.home-assistant.io/docs/documenting)