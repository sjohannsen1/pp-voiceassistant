const customSdk = require("@fwehn/custom_sdk")
const mqtt = require('mqtt')
const axios = require('axios')
var lat, long
var day = {}

var client, subscriptions = []

//function to initialize variables and connect to mqtt client
function init() {
    client = mqtt.connect(customSdk.getMQTT())
    client.on("connect", () => { console.log("Automation connected") })
    day.date = new Date()
}

//function to observe a washingmachine. Uses a smart plug to monitor energyconsumption and trigger "start" and "stop" events
function washingMachine(state) {
    customSdk.getVariable("washingmachine_name").then(washing_machine => {
        checkSubscription(state, washing_machine)

        if (state) customSdk.say(customSdk.generateAnswer([], index = 0))
        else customSdk.say(customSdk.generateAnswer([], index = 1))

        client.on('message', (topic, message) => {

            if (topic.includes(washing_machine)) {
                let formatted = JSON.parse(message)
                if (formatted.current && formatted.current >= 7)
                    customSdk.say(customSdk.generateAnswer([], index = 3))
                else if (formatted.current && formatted.current <= 0.03)
                    customSdk.say(customSdk.generateAnswer([], index = 4))
            }
        })
    })
}

//function to observe a door using a contact sensor. If door is opened for a prolonged time, a notification is triggered
function freezerDoor(state) {
    customSdk.getVariable("freezer_name").then(freezer_door => {
        checkSubscription(state, freezer_door)
        if (state) customSdk.say(customSdk.generateAnswer([], index = 0))
        else customSdk.say(customSdk.generateAnswer([], index = 1))
        let timer
        client.on('message', (topic, message) => {
            if (topic.includes(freezer_door)) {
                let formatted = JSON.parse(message)
                
                if (formatted.contact) {
                    clearTimeout(timer)
                } else
                    timer = setTimeout(() => { customSdk.say(customSdk.generateAnswer([], index = 2)) }, 60000)
            }
        })
    })
}

//function to turn a light on if a motion sensor detects motion at nighttime
function nightLight(state) {
    customSdk.getVariable("motionsensor_name").then(motion => {
        checkSubscription(state, motion)
    if (state) customSdk.say(customSdk.generateAnswer([], index = 0))
    else customSdk.say(customSdk.generateAnswer([], index = 1))

    client.on('message', (topic, message) => {
        if (topic.includes(motion)) {
            let formatted = JSON.parse(message)
            topic = topic.split("/")
            customSdk.getVariable("nightlight_name").then(night_light => {
            if (formatted.occupancy) {
                let timeNow = new Date()
                if (checkDate(timeNow)) {
                    if (timeNow.getTime() > day.sunset || timeNow.getTime() < day.sunrise)
                        customSdk.publishMQTT(`${topic[0]}/${night_light}/set`, { state: "ON" })
                } else {
                    getSunsetSunrise().then(res => {
                        if (timeNow > res.sunset || timeNow < res.sunrise) {
                            customSdk.publishMQTT(`${topic[0]}/${night_light}/set`, { state: "ON" })
                        }
                    })
                }

            } else
                customSdk.publishMQTT(`${topic[0]}/${night_light}/set`, { state: "OFF" })
            })

        }
    })
})

}

function silentBell(state){
    customSdk.getVariable("bell_name").then(bell => {
        checkSubscription(state, bell)
    })
    if (state) customSdk.say(customSdk.generateAnswer([], index = 0))
    else customSdk.say(customSdk.generateAnswer([], index = 1))

    client.on('message', (topic, message) => {
        if (topic.includes(bell)) {
            let formatted = JSON.parse(message)
            topic = topic.split("/")
            if(formatted.action == "single" || "click")
                customSdk.publishMQTT("bot", customSdk.generateAnswer([], index = 2))
        }
    })

}

function letterNotif(state){
    customSdk.getVariable("letter_box_name").then(box => {
        checkSubscription(state, box)
    })
    if (state) customSdk.say(customSdk.generateAnswer([], index = 0))
    else customSdk.say(customSdk.generateAnswer([], index = 1))

    client.on('message', (topic, message) => {
        if (topic.includes(box)) {
            let formatted = JSON.parse(message)
            topic = topic.split("/")
            if(!formatted.contact)
                customSdk.say(customSdk.generateAnswer([], index = 2))
        }
    })

}


//function to check if mqtt client is already subscribed to a topic
function checkSubscription(state, topic) {
    customSdk.getVariable("Zigbee2MQTT-Topic").then(zigbeeTopic => {
        if (state) {
            if (!subscriptions.includes(topic)) {
                client.subscribe(`${zigbeeTopic}/${topic}`)
                subscriptions.push(topic)
            }
        } else {
            if (subscriptions.includes(topic)) {
            client.unsubscribe(`${zigbeeTopic}/${topic}`)
            subscriptions = subscriptions.filter(item => { item !== topic })
            }
        }

    })
}

//function to get the coordinates of a city
function getLatLng() {
    return new Promise((resolve, reject) => {
        if (lat === undefined || lang === undefined) {
            customSdk.getAllVariables()
                .then(variables => {
                    resolve(`https://api.openweathermap.org/data/2.5/forecast?zip=${variables["city"]},${variables["country"]}&appid=${variables["APIKey"]}&lang=${variables["language"]}&units=${variables["units"]}`);
                }).then(axios.get)
                .then(res => {
                    lat = res.data.city.coord.lat
                    long = res.data.city.coord.long
                    resolve({ lat, long })
                }).catch(reject)
        } else resolve({ lat, long })
    })
}

//function to change the timezone of a timestamp
function recalculateTime(time) {
    let timeZoneOffset = new Date().getTimezoneOffset() * 60
    return (((new Date(time).valueOf()) / 1000) + (-1 * timeZoneOffset)) * 1000
}

//function to get sunrise and sunset times using coordinates
function getSunsetSunrise() {
    return new Promise((resolve, reject) => {
        getLatLng()
            .then(res => {
                axios(`https://api.sunrise-sunset.org/json?lat=${res.lat}&lng=${res.long}&formatted=0`)
                    .then(res => {
                        day.sunrise = recalculateTime(res.data.results.sunrise)
                        day.sunset = recalculateTime(res.data.results.sunset)
                        resolve({ sunrise: recalculateTime(res.data.results.sunrise), sunset: recalculateTime(res.data.results.sunset) })
                    }).catch(reject)
            })
    })
}


//function to check if the day object is outdated
function checkDate(newDate) {
    return !((day.date.getDate() < newDate.getDate()) || (day.date.getMonth() < newDate.getMonth() || (day.date.getFullYear() < newDate.getFullYear()) || !day.sunrise))
}

init()

module.exports = {
    washingMachine, freezerDoor, nightLight, silentBell, letterNotif
}