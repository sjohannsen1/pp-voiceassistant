---
title: Locales
permalink: /docs/locales/
---

````json
{
    "invocation": "[den:] Wetterfrosch",
    "utterances": [
        {
            "utterance": "wie [ist:] das Wetter heute [ist:]",
            "function": "getCurrentWeather",
            "args": [],
            "answer": "Heute werden es Temperaturen von rund # Grad Celsius."
        },
        {
            "utterance": "wie [wird:] das Wetter in (1..4){days} Tagen [wird:]",
            "function": "getForecast",
            "args": ["days"],
            "answer": "Das Wetter wird #"
        }
    ],
    "slots": {
    
    }
}
````

## Invocation


## Utterances
### Utterance
### Function
### Args
### Antwortsätze

## Slots